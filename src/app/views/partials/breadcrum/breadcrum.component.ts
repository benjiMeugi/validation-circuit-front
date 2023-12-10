import { Component, Input, OnInit } from '@angular/core';

export interface IBreadcrum {
  label: string;
  route: string;
}

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent implements OnInit {

  @Input() separator = ">";
  @Input() items: IBreadcrum[] = [];
  // {
  //   label: "Label 1",
  //   route: "",
  // },
  // {
  //   label: "Label 2",
  //   route: "",
  // }
  constructor() { }

  ngOnInit(): void {
  }

}
