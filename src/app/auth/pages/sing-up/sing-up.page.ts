import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differentValueAs } from 'src/app/shared/validators/different-value-as';
import { AuthService } from '../../services/auth.service';
import { UserSingup } from '../../interfaces/user-auth';
import { ToastrService } from 'ngx-toastr';
import { Api400Error } from 'src/app/shared/errors/classes/api-error';
import { Router } from '@angular/router';

@Component({
  templateUrl: './sing-up.page.html',
  styleUrls: ['../../styles/form-card.css', './sing-up.page.css']
})
export class SingUpPage implements OnInit {
  singUpForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  error?: Api400Error;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.singUpForm = this.initForm();
  }

  addNewUser(userLogin: UserSingup): void {
    this.loading = true;
    this.authService.singup(userLogin).subscribe({
      next: () => {
        this.error = undefined;
        this.toastrService.success('User created successfully');
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      error: (error: any) => {
        this.error = undefined;
        if (error instanceof Api400Error) this.error = error;
        this.loading = false;
        throw error;
      }
    });
  }

  onSubmit(): void {
    this.addNewUser(this.singUpForm.value);
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, differentValueAs('password')]]
    });
  }

  emailErrorMessage(): string {
    if (this.email?.hasError('required')) return 'Email is required';
    if (this.email?.hasError('email')) return 'Please enter a valid email address';
    if (this.emailApiError) return this.emailApiError;
    return '';
  }

  passwordErrorMessage(): string {
    if (this.password?.hasError('required')) return 'Password is required';
    if (this.passwordApiError) return this.passwordApiError;
    return '';
  }

  confirmPasswordErrorMessage(): string {
    if (this.confirmPassword?.hasError('required')) return 'Confirm password is required';
    if (this.confirmPassword?.hasError('differentValueAs')) return 'Password and confirm password must be the same';
    if (this.confirmPasswordApiError) return this.confirmPasswordApiError;
    return '';
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get email() {
    return this.singUpForm.get('email');
  }

  get password() {
    return this.singUpForm.get('password');
  }

  get confirmPassword() {
    return this.singUpForm.get('confirmPassword');
  }

  get emailApiError() {
    return this.error && this.error.errors['Email']?.at(0);
  }

  get confirmPasswordApiError() {
    return this.error && this.error.errors['ConfirmPassword']?.at(0);
  }

  get passwordApiError() {
    return this.error && this.error.errors['Password']?.at(0);
  }
}
