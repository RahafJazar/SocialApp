import { TranslatePipe } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  imports: [TranslatePipe, ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {

}
