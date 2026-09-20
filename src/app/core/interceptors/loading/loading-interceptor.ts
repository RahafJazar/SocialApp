import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService);
  //if en is not API -> it is   page loader not http loader 
  if (req.url.includes('assets/i18n')) {
    return next(req);
  }
  //request -> show loading screen 
  ngxSpinnerService.show('sample');
  console.log('REQUEST START:', req.url);
  return next(req).pipe(finalize(() => {
    //نفذ باي حالة سواء بفشل او بنجاح نفذ:  
    ngxSpinnerService.hide('sample');
  }));
};
