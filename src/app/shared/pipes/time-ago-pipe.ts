import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'timeAgo', pure: false })
export class TimeAgoPipe implements PipeTransform {
  private readonly translate = inject(TranslateService);
  private locale = '';
  private formatter!: Intl.RelativeTimeFormat;
  private cacheKey = '';
  private result = '';

  transform(createdAt: string | Date | null | undefined): string {
    if (!createdAt) return '';
    const timestamp = new Date(createdAt).getTime();
    if (!Number.isFinite(timestamp)) return '';
    const language = this.translate.getCurrentLang() === 'ar' ? 'ar' : 'en';
    if (language !== this.locale) {
      this.locale = language;
      this.formatter = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });
    }
    const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    let value = 0;
    let unit: Intl.RelativeTimeFormatUnit = 'second';
    if (seconds >= 31536000) { value = Math.floor(seconds / 31536000); unit = 'year'; }
    else if (seconds >= 86400) { value = Math.floor(seconds / 86400); unit = 'day'; }
    else if (seconds >= 3600) { value = Math.floor(seconds / 3600); unit = 'hour'; }
    else if (seconds >= 60) { value = Math.floor(seconds / 60); unit = 'minute'; }
    const key = `${language}:${unit}:${value}`;
    if (key !== this.cacheKey) {
      this.cacheKey = key;
      this.result = this.formatter.format(-value, unit);
    }
    return this.result;
  }
}
