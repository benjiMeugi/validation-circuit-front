import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClrDatagridFilter, ClrDatagridFilterInterface, ClrDateContainer, ClrDateInput } from '@clr/angular';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-datagrid-date-filter',
  templateUrl: './datagrid-date-filter.component.html',
  styleUrls: ['./datagrid-date-filter.component.scss']
})
export class DatagridDateFilterComponent implements OnInit, ClrDatagridFilterInterface<any>, AfterViewInit {

  @ViewChild('dateInput', { read: ClrDateInput }) dateInput: ClrDateInput;
  // @ViewChild('dateInput', { static: true }) dateInput: ElementRef;
  @ViewChild('dateInputContainer', { static: false }) dateInputContainer: ClrDateContainer;
  @ViewChild(ClrDateInput) datepicker: ClrDateInput;

  selectedDate = null;
  private _changes = new Observable<any>();
  startDate: string;
  endDate: string;

  formGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  constructor(private filterContainer: ClrDatagridFilter) { }

  onFocus(event) {
    console.log(event);
  }

  onBlur(event) {
    console.log(event);
  }
  ngAfterViewInit(): void {
    this.dateInput.dateChange.subscribe((e) => {
      console.log(e);
    })
    // this.datepicker.dateChange.subscribe((event: any) => {
    //   console.log(event);
    // });
    // setTimeout(() => {
    //   console.log(this.dateInput.dateChange);
    // }, 1000);


    // this.elementRef.nativeElement.querySelector('dateInput')
    //   .addEventListener('click', () => { console.log("oojmojni");
    //   });
    // this.dateInput.nativeElement.addEventListener('click', console.log("k nk"));

  }


  ngOnInit(): void {

    console.log(this.dateInput);

    // this.dateInput.setFocus();
    // (this.dateInput.nativeElement as HTMLInputElement).onchange((event) => {})
    // setTimeout(() => {
    //   console.log(this.dateInput.dateChange);
    // }, 10);
  }

  onDateChange(event: any) {
    this.filterContainer.open = true; // Keep the filter window open after selecting a date

    // this.dateInput.onValueChange()
    // this.dateInput.nativeElement.preventDefault();
    console.log('Selected date:', event);
    // console.log(this.dateInput);
    // console.log(this.datepicker.dateChange);

  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation(); // Prevent the filter window from closing when the filter button is clicked
  }

  onDateChange2(event) {
    console.log(event);
  }

  get changes(): Observable<any> {
    return this._changes;
  }

  isActive(): boolean {
    return this.startDate !== '' || this.endDate !== '';
  }

  accepts(item: any): boolean {
    if (this.startDate && item.date < this.startDate) {
      return false;
    }

    if (this.endDate && item.date > this.endDate) {
      return false;
    }

    return true;
  }

  onFilterChange() {

    // Emit an event to update the state of the datagrid
    // this._changes.next();
  }

  onDateSelectClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
