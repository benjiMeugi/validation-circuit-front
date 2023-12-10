import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared.module';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { FormModuleModule } from 'src/app/core/form-module/form-module.module';
import { DataDetailComponent } from './data/data-detail/data-detail.component';
import { _response } from 'src/app/application/response/response';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    DataComponent,
    DataDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    FormModuleModule.forRoot({
      responseHandler: (response) => { return _response.getResponseData(response); }
    }),
  ],
  providers: [

  ]
})
export class DashboardModule { }
