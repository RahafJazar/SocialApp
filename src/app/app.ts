import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MyTranslateService } from './core/services/my-translate.service';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective
} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SocialApp');
  private translateService = inject(TranslateService);
  private myTranslateService = inject(MyTranslateService);
  saveLang = localStorage.getItem('language');
  constructor() {

    this.translateService.addLangs(['en', 'ar']);
    if (this.saveLang) {
      this.translateService.use(this.saveLang);
      this.myTranslateService.changeDirection();
    }

  }

}
