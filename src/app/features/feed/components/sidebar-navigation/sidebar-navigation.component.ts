import { TranslatePipe } from '@ngx-translate/core';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [TranslatePipe, ],
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.css',
})
export class SidebarNavigationComponent {
  @Output() feedChanged = new EventEmitter<'following' | 'me' | 'all' | 'saved'>();

  selectedFeed: 'following' | 'me' | 'all' | 'saved' = 'following';

  selectFeed(only: 'following' | 'me' | 'all'): void {
    this.selectedFeed = only;
    this.feedChanged.emit(only);
  }

  showSavedPosts() {
    this.selectedFeed = 'saved';
    this.feedChanged.emit('saved')

  }
}
