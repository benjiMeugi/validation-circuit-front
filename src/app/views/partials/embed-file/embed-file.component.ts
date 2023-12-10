import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpRequestService } from 'src/app/core/http/http-request.service';

@Component({
  selector: 'app-embed-file',
  template: `
    <clr-spinner class="center-element" *ngIf="loading" [clrMedium]="true">Loading ...</clr-spinner>
    <!-- <iframe *ngIf="type && type == 'application/pdf' && data" [src]="data" width="100%" height="500px"></iframe> -->
    <!-- <iframe *ngIf="type && type == 'application/pdf' && data" [src]="data | safeRessourceContent" [type]="type" width="100%" height="500px"></iframe> -->
    <!-- <img *ngIf="type && type != 'application/pdf' && data" [src]="data | safeRessourceContent" [type]="type" width="100%" height="100%"> -->
    <!-- <img *ngIf="loading == false" [src]="data" width="100%" height="100%"> -->
    <!-- <object [data]="data" type="application/pdf" width="{{ width }}" height="{{ height }}">
      <p>Votre navigateur ne prend pas en charge l'affichage du document PDF.</p>
    </object> -->
    <span *ngIf="loading == false && data == null">Aucun fichier disponible</span>
    <embed  #document type="application/pdf" [width]="realWidth" [height]="realHeight">
    <!-- <ng-container *ngIf="loading == false && data != null">
      <embed #document type="application/pdf" [width]="width" [height]="height">
    </ng-container> -->
    

  `
})
export class EmbedFileComponent implements OnInit {

  @Input() url!: string;
  _destroy$ = new Subject();

  @ViewChild('document')
  document!: ElementRef;

  @Input() id!: number;
  @Input() maxWidth = '100%';
  @Input() maxHeight = '100%';
  @Input() width = "100%";
  @Input() height = "100%";
  @Input() name!: string;

  realWidth = '0';
  realHeight = '0';

  data: any = null;
  type: string = '';
  loading = true;

  constructor(private client: HttpRequestService) { }

  ngAfterViewInit() {
    let param = this.name ? '?name=' + this.name : '';
    this.client.loadFile(this.url + param).then((result: Blob) => {
      if (result.size > 0) {
        this.loading = false;
        this.data = URL.createObjectURL(result);
        this.document.nativeElement.src = this.data;
        this.realHeight = this.height;
        this.realWidth = this.width;
      } else {
        this.data = null;
      }
      this.loading = false;

    });
  }

  async ngOnInit() {
    
  }

}