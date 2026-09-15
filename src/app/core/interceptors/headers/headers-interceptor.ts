import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  console.log(req) //{url,statu}
  if (req.url.includes('posts') || req.url.includes('cooments')) {
    const token = localStorage.getItem('socialToken');
    if (token) {
      //if there's a token
      req = req.clone({
        setHeaders: {
          'AUTHORIZATION': `Bearer ${localStorage.getItem('socialToken')}`,
          'lang': localStorage.getItem('lang')!
        }
      }) //copy the object with new configuration


    }

  }


  return next(req);

};
