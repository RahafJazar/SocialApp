import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bookmark } from '../../../../core/models/bookmarks-data.interface';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago-pipe';
import { PostCommentsComponent } from '../../../feed/components/feed-content/components/post-comments/post-comments.component';

@Component({
  selector: 'app-profile-bookmarks',
  imports: [TimeAgoPipe, RouterLink, PostCommentsComponent],
  templateUrl: './profile-bookmarks.component.html',
  styleUrl: './profile-bookmarks.component.css',
})
export class ProfileBookmarksComponent {
  @Input() bookmark: Bookmark = {} as Bookmark;

}
