import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MyTranslateService } from '../../../core/services/my-translate.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-btn-language',
  imports: [TranslatePipe],
  templateUrl: './btn-language.component.html',
  styleUrl: './btn-language.component.css',
})
export class BtnLanguageComponent {

  private myTranslateService = inject(MyTranslateService);
  readonly translateService = inject(TranslateService)
  change(lang: string) {

    this.myTranslateService.changeLang(lang);

  }
}
