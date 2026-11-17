
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  AdminService,
  ContactMessage,
  ContactsResponse
} from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  private adminService = inject(AdminService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  contacts: ContactMessage[] = [];

  selectedContact: ContactMessage | null = null;

  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.adminService.getContacts().subscribe({

      next: (response: ContactsResponse) => {

        console.log('Complete API response:', response);
        console.log('Response data:', response.data);

        this.contacts = Array.isArray(response.data)
          ? response.data
          : [];

        console.log('Dashboard contacts:', this.contacts);
        console.log('Total contacts:', this.contacts.length);

        this.isLoading = false;

        // Notify Angular to update the dashboard
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Get contacts API error:', error);

        this.isLoading = false;

        if (error.status === 401) {
          this.logout();
          return;
        }

        this.errorMessage =
          error.error?.message ||
          'Unable to load messages. Please try again.';

        this.cdr.detectChanges();
      }
    });
  }

  openMessage(contact: ContactMessage): void {

    this.selectedContact = contact;

    if (contact.status === 'New') {

      this.adminService.markAsRead(contact._id).subscribe({

        next: () => {

          contact.status = 'Read';

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error('Mark as read error:', error);

          this.errorMessage =
            'Unable to update message status.';

        }
      });
    }
  }

  closeMessage(): void {
    this.selectedContact = null;
  }

  logout(): void {
    this.adminService.logout();
    this.router.navigate(['/admin/login']);
  }
}
