
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
  ContactService,
  ContactResponse
} from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private snackBar = inject(MatSnackBar);

  readonly email = 'maheshbsudi@gmail.com';
  readonly phone = '9740244018';
  readonly linkedinUrl =
    'https://www.linkedin.com/in/mahesh-sudi-545b03244/';
  readonly githubUrl = 'https://github.com/maheshbsudi';

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  contactForm = this.fb.nonNullable.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(254)
    ]],
    subject: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]],
    message: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(5000)
    ]]
  });

  get f() {
    return this.contactForm.controls;
  }

  // Green success snackbar
  showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  // Red error snackbar
  showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  onSubmit(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.isSubmitting) {
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = this.contactForm.getRawValue();

    const contactData = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      subject: payload.subject.trim(),
      message: payload.message.trim()
    };

    this.contactService.submitContact(contactData).subscribe({

      next: (response: ContactResponse) => {

        this.successMessage =
          response.message || 'Your message was sent successfully!';

        if (response.emailSent === false) {
          this.successMessage +=
            ' Your message was saved, but the email notification could not be sent.';
        }

        // Display green success snackbar
        this.showSuccessSnackbar(this.successMessage);

        this.contactForm.reset();

        this.isSubmitting = false;
      },

      error: (error: HttpErrorResponse) => {

        console.error('Contact API error:', error);

        this.errorMessage =
          error.error?.message ||
          'Unable to send your message. Please try again later.';

        // Display red error snackbar
        this.showErrorSnackbar(this.errorMessage);

        this.isSubmitting = false;
      }
    });
  }

  getErrorMessage(field: string): string {

    const control = this.contactForm.get(field);

    if (!control || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'This field is required.';
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email address.';
    }

    if (control.hasError('minlength')) {
      return `Please enter at least ${
        control.errors?.['minlength'].requiredLength
      } characters.`;
    }

    if (control.hasError('maxlength')) {
      return `Maximum ${
        control.errors?.['maxlength'].requiredLength
      } characters allowed.`;
    }

    return '';
  }
}
