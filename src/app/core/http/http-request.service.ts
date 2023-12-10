import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { _isDefined } from "../util/type-utils";
import { URLUtils } from "../util/url";
import * as FileSaver from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    private serverUrl = environment.APP_SERVER_URL;

    constructor(public http: HttpClient) { }

    /**
     * {@inheritdoc}
     */
    post(path: string, body: any, options?: any): Observable<any> {
        const url = URLUtils.isWebURL(path) ? `${path}` : `${this.serverUrl}${path}`;
        return this.http.post(url, body, options).pipe(
            // retry(1),
            catchError((err) => this.handleError(err))
        );
    }

    /**
     * {@inheritdoc}
     */
    get(path: string, params?: any): Observable<any> {
        const url = URLUtils.isWebURL(path) ? `${path}` : `${this.serverUrl}${path}`;
        const options = {params : params};
        return this.http.get(url, options).pipe(
            // retry(1),
            catchError((err) => this.handleError(err))
        );
    }

    /**
     * {@inheritdoc}
     */
    put(path: string, body: any, options?: any): Observable<any> {
        const url = URLUtils.isWebURL(path) ? `${path}` : `${this.serverUrl}${path}`;
        return this.http.put(url, body, options).pipe(
            // retry(1),
            catchError((err) => this.handleError(err))
        );
    }

    /**
     * {@inheritdoc}
     */
    delete(path: string, options?: any): Observable<any> {
        const url = URLUtils.isWebURL(path) ? `${path}` : `${this.serverUrl}${path}`;
        return this.http.delete(url, options).pipe(
            // retry(1),
            catchError((err) => this.handleError(err))
        );
    }

    /**
     * {@inheritdoc}
     */
    handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            //   this._errorState$.next({ status: +error.status, error: error.error, url: error.url });
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user friendly error message
        return throwError(error);
    }

    //   public defaultHttpHeaders(): HttpHeaders {
    //     const httpHeader = new HttpHeaders();
    //     httpHeader.append('Content-Type', 'application/json');
    //     return httpHeader;
    //   }

    /**
     * @description provide a file download functionnality to the application
     * @param url [[string]]
     */
    downloadFile(url: string, filename?: string, fileExtension?: string, params?: { [prop: string]: any }): Promise<any> {
        return new Promise((resolve, reject) => {
            this.loadServerFile(url, params)
                .then((res: HttpResponse<any>) => {
                    if (!_isDefined(filename)) {
                        filename = _isDefined(fileExtension) ? `${this.fileNameFromResponseHeaders(res.headers)}.${fileExtension}` : `${this.fileNameFromResponseHeaders(res.headers)}`;
                    }
                    let blob = new Blob([res.body], { type: "application/pdf" });
                    FileSaver.saveAs(blob, filename);
                    resolve({});
                });
        });
    }

    loadFile(url: string, filename?: string, fileExtension?: string, params?: { [prop: string]: any }): Promise<any> {
        return new Promise((resolve, reject) => {
            this.loadServerFile(url, params)
                .then((res: HttpResponse<any>) => {
                    if (!_isDefined(filename)) {
                        filename = _isDefined(fileExtension) ? `${this.fileNameFromResponseHeaders(res.headers)}.${fileExtension}` : `${this.fileNameFromResponseHeaders(res.headers)}`;
                    }
                    // console.log(res)
                    let blob = new Blob([res.body], { type: "application/pdf" });
                    // FileSaver.saveAs(blob, filename);
                    resolve(blob);
                });
        });
    }

    /**
     * @description Load a file from the backend server
     * @param url [[string]]
     */
    private loadServerFile(url: string, params?: { [prop: string]: any }): Promise<any> {
        const headers = new HttpHeaders();
        headers.append('Accept', 'text/plain');
        headers.append('Content-type', 'application/octet-stream');
        return new Promise((resolve, reject) => {
            lastValueFrom(this.http.get(url, { headers, responseType: 'blob', params, observe: 'response' }))
            .then((res: any) => {
                resolve(res)
            });
        });
    }

    private fileNameFromResponseHeaders(data: HttpHeaders) {
        return data?.get('filename') ?? '';
    }
}