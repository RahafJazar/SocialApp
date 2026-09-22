import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TranslateService
} from "@ngx-translate/core";
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyTranslateService } from './core/services/my-translate.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
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
