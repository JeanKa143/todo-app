import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differentValueAs } from 'src/app/shared/validators/different-value-as';

@Component({
  templateUrl: './sing-up.page.html',
  styleUrls: ['../../styles/form-card.css', './sing-up.page.css']
})
export class SingUpPage implements OnInit {
  singUpForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private readonly fb: FormBuilder) {}
  ngOnInit(): void {
    this.singUpForm = this.initForm();
  }

  onSubmit(): void {
    console.log('submit form');
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
    return '';
  }

  passwordErrorMessage(): string {
    if (this.password?.hasError('required')) return 'Password is required';
    return '';
  }

  confirmPasswordErrorMessage(): string {
    if (this.confirmPassword?.hasError('required')) return 'Confirm password is required';
    if (this.confirmPassword?.hasError('differentValueAs')) return 'Password and confirm password must be the same';
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
}
