export class ApiError {
  static fromJson(obj: any): ApiError {
    return new ApiError(obj['statusDescription'], obj['statusCode'], obj['message']);
  }

  constructor(public statusDescription: string, public statusCode: number, public message: string) {}
}

export class Api400Error extends ApiError {
  static override fromJson(obj: any): Api400Error {
    return new Api400Error(obj['statusDescription'], obj['statusCode'], obj['message'], obj['errors']);
  }

  constructor(
    statusDescription: string,
    statusCode: number,
    message: string,
    public errors: { [key: string]: string[] }
  ) {
    super(statusDescription, statusCode, message);
  }
}
