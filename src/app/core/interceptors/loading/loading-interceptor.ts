import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { SKIP_GLOBAL_LOADING } from './http-context-token/loading-context';

let activeRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService);

  // i18n files are not API calls — skip spinner
  if (req.url.includes('assets/i18n') || req.context.get(SKIP_GLOBAL_LOADING)) {
    return next(req);
  }

  activeRequests++;
  if (activeRequests === 1) {
    ngxSpinnerService.show('sample');
  }

  return next(req).pipe(
    finalize(() => {
      activeRequests = Math.max(0, activeRequests - 1);
      if (activeRequests === 0) {
        ngxSpinnerService.hide('sample');
      }
    })
  );
};
