import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const toastrService = inject(ToastrService);


  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    //logic 
    /* 1- display toast */
    toastrService.error(err.error.message, 'Social App', {
      timeOut: 2000,
      closeButton: true,
      progressBar: true
    })
    return throwError(() => err)
  }));

  //pipe->rxjs operators
};
