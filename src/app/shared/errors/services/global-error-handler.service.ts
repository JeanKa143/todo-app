import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiError } from '../classes/api-error';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(error: any): void {
    if (isDevMode()) console.error('💥 Error from GlobalErrorHandler: ', error);

    if (error instanceof HttpErrorResponse && error.status === 0) return this.handleHttpErrorResponse(error);
    if (error instanceof HttpErrorResponse) error = ApiError.fromJson(error.error);
    if (error instanceof ApiError) return this.handleApiError(error);
    return this.handleUnknownError(error);
  }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  private handleApiError(error: ApiError): void {
    this.toastrService.error(error.message, error.statusDescription, { onActivateTick: true });
  }

  private handleHttpErrorResponse(error: HttpErrorResponse): void {
    this.toastrService.error(error.message, error.statusText, { onActivateTick: true });
  }

  private handleUnknownError(error: Error): void {
    this.toastrService.error(error.message, 'Unknown error', { onActivateTick: true });
  }
}
