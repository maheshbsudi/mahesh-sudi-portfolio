
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';

import { AdminService } from '../services/admin.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);
  const adminService = inject(AdminService);

  // Prevent localStorage access during SSR
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  // Get token from AdminService
  const token = adminService.getToken();

  console.log('Auth interceptor token available:', !!token);
  console.log('Request URL:', req.url);

  // Attach JWT token to admin API requests
  if (token && req.url.includes('/api/admin/')) {

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  }

  return next(req);
};
