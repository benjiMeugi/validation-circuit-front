import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/application/routing/app-routes';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { DataDetailComponent } from './data/data-detail/data-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: appRoutes.dashboardModule.home.path,
        component: HomeComponent
      },
      {
        path: appRoutes.dashboardModule.data.path,
        component: DataComponent
      },
      {
        path: appRoutes.dashboardModule.data_detail.path + '/:id',
        component: DataDetailComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
