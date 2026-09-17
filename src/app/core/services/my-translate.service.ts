import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  changeDirection(): void {
    //if language =='en' -> dir=ltr & lang attribute= 'en'
    if (localStorage.getItem('language') === 'en') {
      //to access <html> </html> tag use doccument
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
    else if (localStorage.getItem('language') === 'ar') {
      //ele language ==='er' -> dir =rtl && lang attribute ='ar
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');

    }
  }
}
