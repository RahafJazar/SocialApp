import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService)
  //request -> show loading screen 
  ngxSpinnerService.show('sample');
  return next(req).pipe(finalize(() => {
    //نفذ باي حالة سواء بفشل او بنجاح نفذ: 
    ngxSpinnerService.hide('sample');
  }));
};
