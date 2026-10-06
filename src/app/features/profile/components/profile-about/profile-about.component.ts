import { TranslatePipe } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-about',
  imports: [TranslatePipe, ],
  templateUrl: './profile-about.component.html',
  styleUrl: './profile-about.component.css',
})
export class ProfileAboutComponent {

}
