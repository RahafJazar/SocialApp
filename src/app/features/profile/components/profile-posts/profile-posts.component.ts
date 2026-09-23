import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../../core/models/posts-data.interface';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago-pipe';
import { PostCommentsComponent } from '../../../feed/components/feed-content/components/post-comments/post-comments.component';

@Component({
  selector: 'app-profile-posts',
  imports: [TimeAgoPipe, RouterLink, PostCommentsComponent],
  templateUrl: './profile-posts.component.html',
  styleUrl: './profile-posts.component.css',
})
export class ProfilePostsComponent {
  @Input({ required: true }) post!: Post;
  @Input() userId?: string;
  @Output() postDeleted = new EventEmitter<string>();

  deletePostItem(postId: string): void {
    this.postDeleted.emit(postId);
  }
}
