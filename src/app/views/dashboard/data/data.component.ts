import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';
import { formIds } from 'src/app/application/forms/forms';
import { PaginateResponse, _response } from 'src/app/application/response/response';
import { apiRoutes } from 'src/app/application/routing/api-routes';
import { Iform } from 'src/app/core/form-module/dynamic-form/dynamic-form.component';
import { FormService } from 'src/app/core/form-module/services/form.service';
import { HttpRequestService } from 'src/app/core/http/http-request.service';
import { _datagrid } from 'src/app/core/util/datagrid-util';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/application/routing/app-routes';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy{

  loading = false;
  paginatedData: PaginateResponse = new PaginateResponse({});
  form: Iform | undefined = undefined;
  formGroup!: FormGroup;
  initialGridState: ClrDatagridStateInterface = { page: { current: 1, size: 10 } };
  openModal = false;
  $destroy = new Subject();

  fileUrl = apiRoutes.file;
  constructor(
    private client: HttpRequestService, 
    private formService: FormService, 
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    // this.getData();
    this.buildForm();
  }

  getData(param: ClrDatagridStateInterface = this.initialGridState) {
    this.loading = true;
    // const data: IQuery = {
    //   with: ["addresse.country", "addresse.city", "addresse.district"],
    // };
    // this.client.get(this.url, _datagrid.wrapQuery(param, true, data))
    
    this.client.get(apiRoutes.data, _datagrid.wrapQuery(param, true))
      .subscribe(response => {
        console.log(response);
        this.loading = false;
        this.paginatedData = _response.getResponseData(response);
      });
  }

  async buildForm() {
    this.form = await this.formService.getForm(formIds.data);
    this.formGroup = this.formService.getFormGroup(this.form?.controls ?? []);
    console.log(this.formGroup)
  }

  onDgRefresh(event: any) {
    this.getData();
  }

  onSubmit() {
    const submitData = {
      user_id: this.authService.getUser().id,
      label: this.formGroup.get('label')?.value,
      description: this.formGroup.get('description')?.value,
      validators: this.formGroup.get('validators')?.value,
      doc: this.formGroup.get('doc')?.value,
    };
    // console.log(submitData);
    // console.log(this.formGroup.value);
    this.client.post(apiRoutes.data, submitData)
    .pipe(takeUntil(this.$destroy))
    .subscribe(response => {
      this.formGroup.reset();
      this.getData();
    });
  }

  onNew() {
    this.openModal = true;
    this.buildForm();
  }

  onDetail(id: number) {
    this.router.navigate([appRoutes.dashboardModule.module,appRoutes.dashboardModule.data_detail.path, id]);
  }

  ngOnDestroy(): void {
    this.$destroy.next(1);
  }
}
