import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from './services/comments.service';

@Component({
  selector: 'app-post-comments',
  imports: [],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
})
export class PostCommentsComponent implements OnInit {

  private readonly commentsService = inject(CommentsService);
  @Input({ required: true }) postId: string = '';
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  getPostComments(postId: string): void {
    this.commentsService.getPostComments(postId).subscribe({
      next: () => {

      }
    })
  }
}
