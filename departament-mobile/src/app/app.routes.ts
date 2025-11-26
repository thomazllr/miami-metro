import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'police-list',
    loadComponent: () => import('./pages/police-list/police-list.page').then(m => m.PoliceListPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'killer-list',
    loadComponent: () => import('./pages/killer-list/killer-list.page').then(m => m.KillerListPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'case-list',
    loadComponent: () => import('./pages/case-list/case-list.page').then(m => m.CaseListPage),
    canActivate: [AuthGuard]
  },
];
