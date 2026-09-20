import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {

  private readonly translateService = inject(TranslateService);
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

  changeLang(savedLang: string): void {
    localStorage.setItem("language", savedLang);
    this.translateService.use(savedLang);
    this.changeDirection();
  }
}
