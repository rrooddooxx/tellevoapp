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
        (m) => m.DashboardPage
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'find-trip',
        loadComponent: () =>
          import('./routes/passenger/find-trip/find-trip.page').then(
            (m) => m.FindTripPage
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./routes/passenger/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./routes/passenger/my-profile/my-profile.page').then(
            (m) => m.MyProfilePage
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
];
