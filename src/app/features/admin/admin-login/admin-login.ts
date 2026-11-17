import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css'
})
export class AdminLogin {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private router = inject(Router);

  isSubmitting = false;
  errorMessage = '';

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(254)
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(128)
      ]
    ]
  });

  onLogin(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const { email, password } = this.loginForm.getRawValue();
    console.log("Entered values:", this.loginForm.getRawValue());
    this.adminService.login(email!.trim(), password!).subscribe({
      next: (response) => {
        this.adminService.saveToken(response.token);

        this.router.navigate(['/admin/dashboard'])
          .then(() => {
            this.isSubmitting = false;
          })
          .catch(() => {
            this.errorMessage = 'Unable to open dashboard. Please try again.';
            this.isSubmitting = false;
          });
      },

      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Login failed. Please try again.';

        this.isSubmitting = false;
      }
    });
  }
}