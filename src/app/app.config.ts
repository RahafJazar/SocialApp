import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors-interceptor';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }), withHashLocation(), withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor, errorsInterceptor, loadingInterceptor])),
    provideToastr(),
    importProvidersFrom([NgxSpinnerModule]),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',//لو اللانجويش اللي عنا ما تطبقت بنستخدم هاي ال fallback 
      lang: 'en' //هاي اللانجويج اللي حتستخدم اول منفتح البرنامج 
    })
  ]
};
