import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Contact } from './features/contact/contact';
import { About } from './features/about/about';
import { Skills } from './features/skills/skills';
import { Projects } from './features/projects/projects';
import { Experience } from './features/experience/experience';
import { adminGuard } from './core/gaurds/admin.guard';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { AdminLogin } from './features/admin/admin-login/admin-login';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'skills',
    component: Skills
  },
  {
    path: 'experience',
    component: Experience
  },
  {
    path: 'projects',
    component: Projects
  },
  {
    path: 'contact',
    component: Contact
  },
  {
    path: 'admin/login',
    component: AdminLogin
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboard,
    // canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
 ];
