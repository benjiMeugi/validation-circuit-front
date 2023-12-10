import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './application/routing/app-routes';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: appRoutes.loginModule.module,
    // component: AppComponent,
    // canActivate: []
  },
  { 
    path: appRoutes.loginModule.module, 
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)},
    
  { 
    path: appRoutes.dashboardModule.module, 
    loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: []
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
