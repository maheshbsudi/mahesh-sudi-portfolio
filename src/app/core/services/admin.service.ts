
import {
  Injectable,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  token: string;
  admin: {
    name: string;
    email: string;
  };
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'New' | 'Read';
  createdAt: string;
}

export interface ContactsResponse {
  success: boolean;
  count: number;
  data: ContactMessage[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private apiUrl = 'http://localhost:5000/api/admin';

  // Check whether code is running in browser
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(
      `${this.apiUrl}/login`,
      { email, password }
    );
  }

  getContacts(): Observable<ContactsResponse> {
    return this.http.get<ContactsResponse>(
      `${this.apiUrl}/contacts`
    );
  }

  markAsRead(id: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/contacts/${id}/read`,
      {}
    );
  }

  // Save JWT token
  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('admin_token', token);
    }
  }

  // Get JWT token
  getToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }

    return localStorage.getItem('admin_token');
  }

  // Remove JWT token
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('admin_token');
    }
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
