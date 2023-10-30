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
    path: 'error',
    loadComponent: () =>
      import('./routes/error/error.page').then((m) => m.ErrorPage),
  },
  {
    path: 'passenger',
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
        path: 'logout',
        redirectTo: '/logout',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'driver',
    loadComponent: () =>
      import('./routes/driver/driver.dashboard.page').then(
        (m) => m.DriverDashboardPage
      ),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./routes/driver/home/driver.home.page').then(
            (m) => m.DriverHomePage
          ),
      },
      {
        path: 'history',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'active-trip',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'my-trips',
        loadComponent: () =>
          import('./routes/driver/my-trips/my-trips.page').then(
            (m) => m.DriverTripsPage
          ),
      },
      /* {
        path: 'my-profile',
        loadComponent: () =>
          import('./routes/driver/my-profile/my-profile.page').then((m) => m.DriverProfilePage),
      }, */
      {
        path: 'logout',
        redirectTo: '/logout',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./routes/logout/log-out.page').then((m) => m.LogOutPage),
  },
];
