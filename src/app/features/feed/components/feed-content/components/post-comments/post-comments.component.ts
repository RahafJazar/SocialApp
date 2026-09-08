import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { comment } from './models/comments-data.interface';

@Component({
  selector: 'app-post-comments',
  imports: [],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
})
export class PostCommentsComponent implements OnInit {

  private readonly commentsService = inject(CommentsService);
  commentList: comment[] = [];


  @Input({ required: true }) postId: string = '';
  ngOnInit(): void {
    this.getPostComments(this.postId);
  }


  getPostComments(postId: string): void {
    this.commentsService.getPostComments(postId).subscribe({
      next: (resp) => {
        if (resp.success) {
          console.log("comments are: ", resp.data.comments)
          this.commentList = resp.data.comments;
        }
      }
    })
  }
}
