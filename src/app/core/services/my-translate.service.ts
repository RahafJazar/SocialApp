import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class MyTranslateService {
  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  initialize(): void {
    this.translateService.addLangs(['en', 'ar']);
    let language = 'en';
    try { language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en'; } catch { }
    this.changeLang(language);
  }

  changeDirection(): void {
    const language = this.translateService.getCurrentLang() === 'ar' ? 'ar' : 'en';
    this.document.documentElement.lang = language;
    this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }

  changeLang(language: string): void {
    const supported = language === 'ar' ? 'ar' : 'en';
    this.translateService.use(supported).subscribe(() => {

      console.log('Language:', this.translateService.getCurrentLang());
      console.log('Translation:', this.translateService.instant('NAV.FEED'));
      if (supported === 'en') {
        this.checkEnglish();
      }

      try { localStorage.setItem('language', supported); } catch { }
      this.changeDirection();
    });
  }
  checkEnglish(): void {
    this.translateService.reloadLang('en').subscribe({
      next: (data) => {
        console.log('English NAV:', data['NAV']);
        console.log(
          'English result:',
          this.translateService.instant('NAV.FEED')
        );
      },
      error: (err) => console.error('English load failed:', err)
    });
  }
}
