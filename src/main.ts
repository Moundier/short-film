import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, } from './app/blueprint/interceptor';
import { UserStore } from './app/blueprint/user.store.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
    { provide: UserStore, useClass: UserStore, },
    importProvidersFrom(HttpClientModule),
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
  ],
});
