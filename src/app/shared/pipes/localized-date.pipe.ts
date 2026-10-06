import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'localizedDate', pure: false })
export class LocalizedDatePipe implements PipeTransform {
  private readonly translate = inject(TranslateService);
  private key = '';
  private result = '';

  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    // Preserve calendar-only birthdays without timezone conversion.
    const date = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(value + 'T12:00:00') : new Date(value);
    if (!Number.isFinite(date.getTime())) return '';
    const language = this.translate.getCurrentLang() === 'ar' ? 'ar' : 'en';
    const key = `${language}:${date.getTime()}`;
    if (key !== this.key) {
      this.key = key;
      this.result = new Intl.DateTimeFormat(language, {
        year: 'numeric', month: 'long', day: 'numeric', calendar: 'gregory'
      }).format(date);
    }
    return this.result;
  }
}
