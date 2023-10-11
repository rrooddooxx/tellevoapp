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
        path: 'find-trip',
        loadComponent: () =>
          import('./routes/dashboard/find-trip/find-trip.page').then(
            (m) => m.FindTripPage
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./routes/dashboard/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./routes/dashboard/my-profile/my-profile.page').then(
            (m) => m.MyProfilePage
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
];
