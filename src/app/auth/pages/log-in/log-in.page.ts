import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api400Error } from 'src/app/shared/errors/classes/api-error';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './log-in.page.html',
  styleUrls: ['../../styles/form-card.css', './log-in.page.css']
})
export class LogInPage implements OnInit {
  logInForm!: FormGroup;
  showPassword = false;

  error?: Api400Error;
  loading = false;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.logInForm = this.initForm();
  }
  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.authService.login(this.logInForm.value).subscribe({
      next: () => {
        this.error = undefined;
        this.loading = false;

        // TODO: navigate to main app page
        console.log('Login successful');
      },
      error: (error: any) => {
        this.error = undefined;
        if (error instanceof Api400Error) this.error = error;
        this.loading = false;
        throw error;
      }
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  emailErrorMessage() {
    if (this.email?.hasError('required')) return 'Email is required';
    if (this.email?.hasError('email')) return 'Please enter a valid email address';
    if (this.emailApiError) return this.emailApiError;
    return '';
  }

  passwordErrorMessage() {
    if (this.password?.hasError('required')) return 'Password is required';
    if (this.passwordApiError) return this.passwordApiError;
    return '';
  }

  get email() {
    return this.logInForm.get('email');
  }

  get password() {
    return this.logInForm.get('password');
  }

  get emailApiError() {
    return this.error && this.error.errors['Email']?.at(0);
  }

  get passwordApiError() {
    return this.error && this.error.errors['Password']?.at(0);
  }
}
