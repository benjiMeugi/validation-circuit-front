import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './views/partials/top-bar/top-bar.component';
import { BottomBarComponent } from './views/partials/bottom-bar/bottom-bar.component';
import { SideBarComponent } from './views/partials/side-bar/side-bar.component';
import { TitleComponent } from './views/partials/title/title.component';
import { BreadcrumComponent } from './views/partials/breadcrum/breadcrum.component';
import { RouterModule } from '@angular/router';
import { EmbedFileComponent } from './views/partials/embed-file/embed-file.component';
import { UiNotificationComponent } from './views/partials/ui-notification/ui-notification.component';
import { ProgressBarComponent } from './views/partials/progress-bar/progress-bar.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TitleComponent,
    TopBarComponent,
    BottomBarComponent,
    SideBarComponent,
    BreadcrumComponent,
    EmbedFileComponent,
    UiNotificationComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    HttpClientModule
  ],
  exports: [
    ClarityModule,
    CommonModule,
    ReactiveFormsModule,
    
    TitleComponent,
    TopBarComponent,
    BottomBarComponent,
    SideBarComponent,
    BreadcrumComponent,
    EmbedFileComponent,
    UiNotificationComponent,
    ProgressBarComponent
  ]
})
export class SharedModule { }
