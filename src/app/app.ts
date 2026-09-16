import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MyTranslateService } from './core/services/my-translate.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SocialApp');
  private x = inject(MyTranslateService);
  constructor() {
    const language = localStorage.getItem('language');

  }

}
