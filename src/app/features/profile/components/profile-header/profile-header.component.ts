import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserInfo } from '../../../../core/models/user-data.interface';

@Component({
  selector: 'app-profile-header',
  imports: [],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent {

  @Input() userData: UserInfo = {};


}
