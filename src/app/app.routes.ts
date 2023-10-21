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
      import('./routes/passenger/passenger.dashboard.page').then(
        (m) => m.PassengerDashboardPage
      ),
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
          import('./routes/passenger/wallet/wallet.page').then(
            (m) => m.WalletPage
          ),
      },
      {
        path: 'trips',
        loadComponent: () =>
          import('./routes/passenger/trips/trips.page').then(
            (m) => m.TripsPage
          ),
      },
      {
        path: 'help',
        loadComponent: () =>
          import('./routes/passenger/help/help.page').then((m) => m.HelpPage),
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
