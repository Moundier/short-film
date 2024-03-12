import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, } from './app/app-state-manager/interceptor';
import { provideStore } from '@ngrx/store';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
    importProvidersFrom(HttpClientModule),
    provideIonicAngular(),
    provideRouter(routes),
    provideStore(),
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
  ],
});
