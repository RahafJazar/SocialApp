import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-dialog',
  imports: [AvatarModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() title: string = '';
  @Input() width: string = '25rem'
  show() {
    this.visible = true;
    this.visibleChange.emit(true);
  }
  hide() {
    this.visible = false;
    this.visibleChange.emit(false)
  }
}
