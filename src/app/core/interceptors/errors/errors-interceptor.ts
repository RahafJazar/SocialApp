import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const message = typeof err.error?.message === 'string'
        ? err.error.message
        : err.status === 0
          ? 'Could not reach the server. Please try again.'
          : 'The request failed. Please try again.';
      try {
        toastrService.error(message, 'Social App', {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
        });
      } catch {
        // A notification failure must not replace the original HTTP error.
      }
      return throwError(() => err);
    }),
  );
};
