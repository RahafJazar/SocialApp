import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('socialToken');
  const isAppApi = req.url.startsWith(`${environment.base_url}/`);
  const isAuthRequest = req.url.includes('/users/signin') || req.url.includes('/users/signup');
  console.log(req) //{url,statu}

  if (token && isAppApi && !isAuthRequest) {
    //if there's a token
    req = req.clone({
      setHeaders: {
        'AUTHORIZATION': `Bearer ${token}`,
        // 'lang': localStorage.getItem('lang')!
      }
    }) //copy the object with new configuration


  }
  return next(req)
}





