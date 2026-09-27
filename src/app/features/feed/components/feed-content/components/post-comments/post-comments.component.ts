import { Component, contentChild, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { comment } from './models/comments-data.interface';
import { UserInfo } from '../../../../../../core/models/user-data.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { count } from 'rxjs';

@Component({
  selector: 'app-post-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
})
export class PostCommentsComponent implements OnInit {

  private readonly commentsService = inject(CommentsService);
  private fb = inject(FormBuilder);
  commentList: comment[] = [];
  userData: UserInfo = {} as UserInfo;
  commentForm: FormGroup = this.fb.nonNullable.group({
    content: [''],
    image: ['']
  })



  @Input({ required: true }) postId: string = '';
  ngOnInit(): void {
    this.getPostComments(this.postId);
    this.getUserData()
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

  getUserData(): void {
    if (localStorage.getItem('userData')) {
      this.userData = JSON.parse(localStorage.getItem('userData')!);

    }
  }



  sendComment(): void {
    if (this.commentForm.valid) {
      console.log("comment form ", this.commentForm.value)
    }
  }

  onImgSelected(event: Event): void {
    console.log("event : \n", event)
  }
}
