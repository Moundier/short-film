import { Routes } from '@angular/router';
import { authGuard } from './app-state-manager/auth.guard';
import { TabsPage } from './tabs/tabs.page';
import { LoginPage } from './login/login.page';

export const routes: Routes = [
  
  // Define a default route here, e.g. redirect to 'login' when the path is empty
  {
    path: '', 
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [authGuard]
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
