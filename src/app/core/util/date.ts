import { DatePipe } from '@angular/common'
import { Injectable, Pipe, PipeTransform } from '@angular/core'
import { _countString } from './string-helper';

@Pipe({
    name: 'dateFormatPipe',
})
export class DateHelper implements PipeTransform {
    transform(value: string) {
        var datePipe = new DatePipe("en-US");
        value = datePipe.transform(this.convertFromStringToDate(value), 'yyyy-MM-dd') || "";
        return value;
    }

    convertFromStringToDate(responseDate: any) {
        let dateComponents = responseDate.split('T');
        let datePieces = dateComponents[0].split("/");
        return (new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]))
    }
}

export type DateFormatType = "DD/MM/YYYY" | "YYYY-MM-DD";
export type DateSeparatorType = "/" | "-";

@Injectable({
    providedIn: 'root'
})
export class DateService {
    formats = {
        fr: 'DD/MM/YYYY',
        en: 'YYYY-MM-DD'
    }

    private _getDate(param: Date, format: DateFormatType = "DD/MM/YYYY", separator: DateSeparatorType = '/'): string {
        let response = null;
        switch (format) {
            case this.formats.en:
                response = param.getFullYear() + separator + (param.getMonth() + 1) + separator + param.getDate();
                break;
            default:
                response = param.getDate() + separator + (param.getMonth() + 1) + separator + param.getFullYear();
                break;
        }
        return response;
    }

    public now(): string {
        return this._getDate(new Date());
    }

    public parseToFr(date: string) {
        return this._getDate(new Date(date), "DD/MM/YYYY", "/");
    }

    public parseToEn(date: string) {
        const arr = date.split('/');
        date = arr[2] + '-' + arr[1] + '-' + arr[0];
        return this._getDate(new Date(date), "YYYY-MM-DD", "-");
    }

    public time(date: string|Date = new Date()) {
        if (typeof date == 'string') {
            date = new Date(date);
        }
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }

    public isDate(date: string): boolean {
        if (typeof date == 'number') {
            return false;
        }

        if (typeof date == 'string') {
            if (_countString(date, '/') != 2 && _countString(date, '-') != 2) {
                return false;
            }
        }
        return new Date(date).toString() != "Invalid Date";
    }
}