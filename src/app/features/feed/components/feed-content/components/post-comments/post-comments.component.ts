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

  @Input({ required: true }) postId: string = '';
  private readonly commentsService = inject(CommentsService);
  private fb = inject(FormBuilder);
  selectedFile !: File;
  commentList: comment[] = [];
  userData: UserInfo = {} as UserInfo;
  commentImgUrl: string | ArrayBuffer | null | undefined;
  commentForm: FormGroup = this.fb.nonNullable.group({
    content: ['']
  })



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
    const content = this.commentForm.controls['content'].value.trim();

    if (!content && !this.selectedFile) return;
    const formData = new FormData();
    formData.append('content', content);
    if (this.selectedFile) {

      formData.append('image', this.selectedFile);
    }
    console.log("comment form ", formData);
    this.commentsService.createComment(formData, this.postId).subscribe((resp) => {
      console.log(resp);
      //resetFormData 
      this.commentForm.reset();
      this.getPostComments(this.postId)
    })

  }

  changeFile(event: Event): void {
    debugger
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);

    }

    //preview file to img
    this.previewImg();
  }

  previewImg(): void {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedFile);
    fileReader.addEventListener('load', (e) => {
      this.commentImgUrl = e.target?.result;
      console.log('commentImgUrl', this.commentImgUrl)
    })


  }

  removeFile(): void {
    this.commentImgUrl = '';
  }
}
