import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const translate = inject(TranslateService);
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    const keys: Record<number, string> = {
      0: 'ERRORS.NETWORK', 401: 'ERRORS.UNAUTHORIZED', 403: 'ERRORS.FORBIDDEN',
      404: 'ERRORS.NOT_FOUND', 409: 'ERRORS.CONFLICT', 429: 'ERRORS.RATE_LIMIT'
    };
    // Authentication forms show their own localized messages.
    if (!req.url.includes('/users/signin') && !req.url.includes('/users/signup') && !req.url.includes('/assets/i18n/')) {
      try {
        toastr.error(translate.instant(keys[error.status] ?? 'ERRORS.REQUEST'), translate.instant('BRAND.NAME'), {
          timeOut: 3000, closeButton: true, progressBar: true
        });
      } catch { /* Preserve the original HTTP error if notification rendering fails. */ }
    }
    return throwError(() => error);
  }));
};
