import { ApplicationInitStatus, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, spinnerInterceptor, AuthInterceptor } from './app/app-state-manager/interceptor';
import { provideStore } from '@ngrx/store';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
    provideIonicAngular(),
    provideRouter(routes),
    provideStore(), // Info: ngrx store
    importProvidersFrom(HttpClientModule), // Info: httpclient
    provideHttpClient(
      withInterceptors([authInterceptor, spinnerInterceptor]),
    ),
    { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
});
