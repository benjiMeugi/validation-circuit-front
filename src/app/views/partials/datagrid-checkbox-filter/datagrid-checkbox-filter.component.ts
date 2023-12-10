import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datagrid-checkbox-filter',
  templateUrl: './datagrid-checkbox-filter.component.html',
  styleUrls: ['./datagrid-checkbox-filter.component.scss']
})
export class DatagridCheckboxFilterComponent implements OnInit, ClrDatagridFilterInterface<any> {

  formGroup = new FormGroup({
    option1: new FormControl(false),
    option2: new FormControl(false),
  });

  constructor() { }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value: any) => {
      this.changes.next(this.formGroup.value);
    });
  }
  changes = new Subject<any>();

  isActive(): boolean {
    let response = false;
    Object.keys(this.formGroup.value).forEach((key: string) => {
      if (this.formGroup.value[key] == true) {
        response = true;
      }
    })
    return response;
  }

  accepts(user: any): boolean {
    return true;
  }
}
