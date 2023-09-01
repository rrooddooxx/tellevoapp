import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./routes/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./routes/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./routes/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./routes/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
];
