import { Component, Inject } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, homeIcon, logoutIcon, userIcon, cogIcon } from '@cds/core/icon';
import { AuthService } from '../auth/auth.service';
import { ILinks } from '../partials/top-bar/top-bar.component';
import { appRoutes } from 'src/app/application/routing/app-routes';

ClarityIcons.addIcons(homeIcon, logoutIcon, userIcon, cogIcon);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {


  username = this.authService.getUser().username;
  links: ILinks[] = [
    { routerLink: appRoutes.dashboardModule.home.path, name: appRoutes.dashboardModule.home.label },
    { routerLink: appRoutes.dashboardModule.data.path, name: appRoutes.dashboardModule.data.label },
  ];
  constructor(private authService: AuthService) { }


  ngOnInit(): void {

  }

  onLogOut($event: any) {
    this.authService.logout();
  }
}
