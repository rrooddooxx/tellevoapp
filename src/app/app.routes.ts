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
    path: 'register',
    loadComponent: () =>
      import('./routes/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./routes/reset-password/reset-password.page').then(
        (m) => m.ResetPasswordPage
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./routes/dashboard/dashboard.page').then((m) => m.DashboardPage),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./routes/map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./routes/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'wallet',
        loadComponent: () =>
          import('./routes/dashboard/wallet/wallet.page').then(
            (m) => m.WalletPage
          ),
      },
      {
        path: 'trips',
        loadComponent: () =>
          import('./routes/dashboard/trips/trips.page').then(
            (m) => m.TripsPage
          ),
      },
      {
        path: 'help',
        loadComponent: () =>
          import('./routes/dashboard/help/help.page').then((m) => m.HelpPage),
      },
    ],
  },
  {
    path: 'driver',
    loadComponent: () =>
      import('./routes/driver/driver.page').then((m) => m.DriverPage),
      children: [
        
      ]
  },
];
