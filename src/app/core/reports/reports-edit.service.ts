import { Injectable } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import * as writtenNumber from 'written-number';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DateService } from '../util/date';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface contentRow {
  text: string;
  fillColor?: string;
  bold?: boolean;
  alignment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsEditService {

  constructor(private dateService: DateService) { }

  /**
   * report header
   * @returns Array
   */
  private async header() {
    return [
      [{ image: await this.getBase64ImageFromURL("./assets/img/logo.png"), width: 170, alignment: 'left' }],
      [{ text: "Hello word", bold: true }]
    ]
  }

  /**
   * report sub-header
   * @param reference 
   * @param date 
   * @param person 
   * @returns Array
   */
  private sub_header(reference: string, date: string, person: string) {
    return [
      [{ text: reference }, { text: date }],
      [{ text: person ?? '' }]
    ]
  }

  /**
   * report middle
   * @param cols_width 
   * @param rows_height 
   * @param headers 
   * @param datas 
   * @returns Object
   */
  private middle(cols_width: any[], rows_height: any[], headers: contentRow[], datas: contentRow[]) {
    return {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: cols_width,
      heights: rows_height,
      body: [
        headers,
        datas
      ],
    }
  }

  /**
   * report total
   * @param amount 
   * @returns Object
   */
  private showTotal(amount: string) {
    return {
      text: `TOTAL = ${new CurrencyPipe('fr').transform(amount, 'XOF', 'FCFA')}`,
      bold: true,
      margin: [0, 20, 40, 20],
      alignment: 'right'
    }
  }

  /**
   * report footer
   * @param str 
   * @returns Array
   */
  private footer(str: string) {
    return [
      {
        text: [
          { text: "ARRETE LA PRESENTE FACTURE A LA SOMME DE: " },
          { text: this.amountToLetter(str), bold: true }
        ],
        margin: [0, 10]
      },
      { text: "Signature", alignment: 'right', margin: [0, 20, 40, 20] }
    ]
  }

  /**
   * encode image file to Base 64
   * @param url image file path
   * @returns Promise
   */
  private getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  /**
   * transform amount to letter
   * @param amount 
   * @returns strig
   */
  private amountToLetter(amount: string): string {
    writtenNumber.defaults.lang = 'fr';
    var str: string = writtenNumber(amount)
    return str.toUpperCase() + " FCFA";
  }

  /**
   * edit report
   * @param action action to perform: open|print|download
   * @param reference 
   * @param date 
   * @param person 
   * @param datas 
   * @param total 
   */
  async edit(action = 'open', reference: string, date: string, person: string, datas: any[], total: string = null) {
    const documentDefinition = {
      // pageOrientation: 'landscape',
      content: [
        { columns: await this.header(), alignment: 'right', fontSize: 11 },
        {
          columns: this.sub_header(reference, this.dateService.parseToFr(date), person),
          margin: [0, 50, 0, 50],
        },
        {
          table: this.middle(['*', '*'], [20], [{ text: 'a' }, { text: 'b' }], [{text: 'hello'}, { text: 'word'}]),
        },
        // this.showTotal(total),
        // this.footer(total)
      ]
    };
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }
}
