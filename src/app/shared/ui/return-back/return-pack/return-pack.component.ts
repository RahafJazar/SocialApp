import { TranslatePipe } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, outputBinding } from '@angular/core';

@Component({
  selector: 'app-return-pack',
  imports: [TranslatePipe, ],
  templateUrl: './return-pack.component.html',
  styleUrl: './return-pack.component.css',
})
export class ReturnPackComponent {
  private location = inject(Location);
  @Output() out: EventEmitter<void> = new EventEmitter();
  @Input() pageName: string = '';

  returnBack(): void {
    this.location.back();
    this.out.emit();
  }
}
