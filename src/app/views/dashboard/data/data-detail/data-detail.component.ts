import { Component } from '@angular/core';
import { Data } from 'src/app/application/models/data';
import { _response } from 'src/app/application/response/response';
import { apiRoutes } from 'src/app/application/routing/api-routes';
import { FormService } from 'src/app/core/form-module/services/form.service';
import { HttpRequestService } from 'src/app/core/http/http-request.service';
import { AuthService } from 'src/app/views/auth/auth.service';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss']
})
export class DataDetailComponent {
  data!: Data;
  constructor(private client: HttpRequestService, private formService: FormService, private authService: AuthService) { }

  ngOnInit(): void {
    // this.getData();
  }

  getData() {
    // const data: IQuery = {
    //   with: ["addresse.country", "addresse.city", "addresse.district"],
    // };
    // this.client.get(this.url, _datagrid.wrapQuery(param, true, data))
    
    this.client.get(apiRoutes.data,)
      .subscribe(response => {
        console.log(response);
        this.data = _response.getResponseData(response);
      });
  }
}
