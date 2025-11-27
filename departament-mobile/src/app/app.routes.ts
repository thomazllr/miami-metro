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
    path: 'killer-gallery',
    loadComponent: () => import('./pages/killer-gallery/killer-gallery.page').then(m => m.KillerGalleryPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'case-list',
    loadComponent: () => import('./pages/case-list/case-list.page').then(m => m.CaseListPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'case-detail/:id',
    loadComponent: () => import('./pages/case-detail/case-detail.page').then(m => m.CaseDetailPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'case-create',
    loadComponent: () => import('./pages/case-form/case-form.page').then(m => m.CaseFormPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'case-edit/:id',
    loadComponent: () => import('./pages/case-form/case-form.page').then(m => m.CaseFormPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'police-create',
    loadComponent: () => import('./pages/police-form/police-form.page').then(m => m.PoliceFormPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'police-edit/:id',
    loadComponent: () => import('./pages/police-form/police-form.page').then(m => m.PoliceFormPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'police-detail/:id',
    loadComponent: () => import('./pages/police-detail/police-detail.page').then(m => m.PoliceDetailPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'killer-create',
    loadComponent: () => import('./pages/killer-form/killer-form.page').then(m => m.KillerFormPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'killer-edit/:id',
    loadComponent: () => import('./pages/killer-form/killer-form.page').then(m => m.KillerFormPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'killer-detail/:id',
    loadComponent: () => import('./pages/killer-detail/killer-detail.page').then(m => m.KillerDetailPage),
    canActivate: [AuthGuard]
  },
];
