import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'src/app/bloc/services/storage.service';
import { STORE_DATA_KEYS } from 'src/app/bloc/stored-data/stored-data-keys';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private storageService: StorageService) { }

  ngOnInit(): void {
    // this.router.events.subscribe(event => {
      
    //   if (event instanceof NavigationEnd) {
    //     if (event.url == '/' + appCompanyModuleRoutes.module + '/' + appCompanyModuleRoutes.company) {
    //       this.storageService.remove([STORE_DATA_KEYS.company, STORE_DATA_KEYS.companyDossier]);
    //     }
    //   }

    // });
  }

}
