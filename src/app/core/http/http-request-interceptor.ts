import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { _isDefined } from "../util/type-utils";
import { AUTH_LOCAL_DATA } from "src/app/views/auth/constants/auth";

@Injectable()
export class HttpRequestInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("intercept");
    const authDataString = localStorage.getItem(AUTH_LOCAL_DATA);
    const authData: { authToken: string } = authDataString ? JSON.parse(authDataString) : { authToken: "" };
    const token = authData.authToken;

    if (token != "") {
      // If we have a token, we set it to the header
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('http response event--->>>', event);
        }

        if (event instanceof HttpErrorResponse) {
          // console.log('httpError response event--->>>', event);
          if (event.status === 401) {
            // redirect the user to login page
            // 401 unauthorised user
          }
        }
        return event;
      })
    )
    // throw new Error("Method not implemented.");
  }

}