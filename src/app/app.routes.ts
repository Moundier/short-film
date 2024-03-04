import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', /* set to be '' */
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login', /* set to be 'login' */
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
];
