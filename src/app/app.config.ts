import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([MatSnackBarModule]),
    provideRouter(routes),
    provideAnimationsAsync()]
};
