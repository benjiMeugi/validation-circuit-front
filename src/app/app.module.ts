import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { AuthModule } from './views/auth/auth.module';
import { apiRoutes } from './application/routing/api-routes';
import { environment } from 'src/environments/environment';
import { appRoutes } from './application/routing/app-routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptorService } from './core/http/http-request-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule.forRoot({
      loginUrl: apiRoutes.login,
      logoutUrl: environment.APP_SERVER_URL + 'logout',
      redirectUrl: appRoutes.dashboardModule.module + '/' + appRoutes.dashboardModule.home.path,
      userUrl: apiRoutes.user,
      responseHandler: (response) => {
        if (response && response.error) {
          return response.error.body.error_message;
        }
        return { 
          authToken: response.body.response_data.token, 
          user: {
            id: response.body.response_data.user.id,
            username: response.body.response_data.user.email,
            permissions: []
          },
        };
      }
    }),
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
