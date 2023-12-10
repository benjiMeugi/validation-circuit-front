import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/application/routing/app-routes';

export interface ILinks {
  routerLink: string;
  name: string;

}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  dashboardPath = `/${appRoutes.dashboardModule.module}/${appRoutes.dashboardModule.dashboard.path}`;
  profilRoute = appRoutes.profil.path;

  @Input() links: ILinks[] = [];
  @Input() logo!: string;
  @Input() logoutUrl!: string;
  @Input() profilUrl!: string;
  @Input() username!: string;

  @Output() onLogOutEvent = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onLogOut() {
    this.onLogOutEvent.emit(true);
  }

}
