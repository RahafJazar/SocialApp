import { Component, ContentChild, contentChild, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
@Component({
  selector: 'app-popover',
  imports: [PopoverModule, ButtonModule, InputTextModule],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.css',
})
export class PopoverComponent {
  @ContentChild("op") private popover !: Popover;

  toggle(event: Event): void {
    this.popover.toggle(event)
  }

  hide(): void {
    this.popover.hide()
  }

}
