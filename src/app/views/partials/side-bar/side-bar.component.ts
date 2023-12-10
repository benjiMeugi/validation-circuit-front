import { Component, OnInit } from '@angular/core';
import { appRoutes } from 'src/app/application/routing/app-routes';

interface RouteMap {
  label: string, 
  path?: string, 
  permissions?: string[],
  icon?: string,
  children?: RouteMap[]
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  routes: RouteMap[] = [
    // {
    //   label: "Ventes",
    //   permissions: [],
    //   icon: "shopping-cart",
    //   children: [
    //     {
    //       label: "Commandes",
    //       path: appRoutes.incoming_order.path,
    //       permissions: []
    //     },
       
    //   ]
    // },
   
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
