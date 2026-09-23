import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserInfo } from '../../../../core/models/user-data.interface';

@Component({
  selector: 'app-profile-header',
  imports: [],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent implements OnChanges {

  @Input() userData: UserInfo = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.userData = changes;
  }
}
