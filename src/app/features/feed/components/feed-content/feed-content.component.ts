import { UserInfo } from './../../../../core/models/user-data.interface';
import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { BasePost, Data, Post, PostsDataResponse, User } from '../../../../core/models/posts-data.interface';
import { Form, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago-pipe';


@Component({
  selector: 'app-feed-content',
  imports: [ReactiveFormsModule, PostCommentsComponent, RouterLink, DatePipe, TimeAgoPipe],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  userId: string = '';
  selectedFile!: File;
  posts: BasePost[] = [];
  postImgUrl: string | ArrayBuffer | null | undefined;
  userData: UserInfo = {} as UserInfo;
  //2 inputs only -> use FormControl instead of FormGroup
  contentControl: FormControl = new FormControl('', []);
  privacyControl: FormControl = new FormControl('public', null);
  showComments: Record<string, boolean> = {};



  ngOnInit(): void {
    this.getUserData();
    this.getAllPosts();
  }


  getAllPosts(): void {
    this.postsService.geAllPosts().subscribe({
      next: (resp: PostsDataResponse) => {
        if (resp.success) {
          this.posts = resp.data.posts;
          console.log(this.posts)
        }
      },

    })
  }

  getUserData() {
    if (localStorage.getItem('userData')) {
      this.userData = JSON.parse(localStorage.getItem('userData')!);
      this.userId = JSON.parse(localStorage.getItem('userData')!)?._id;
    }
  }

  changeFile(event: Event): void {
    debugger
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile)
    }


    //preview file to img
    this.previewImg();


  }

  previewImg(): void {
    const fileReader = new FileReader();
    console.log(fileReader.readAsDataURL(this.selectedFile));
    fileReader.addEventListener('load', (e) => {
      this.postImgUrl = e.target?.result;
    })
  }

  removeFile(): void {
    this.postImgUrl = '';
  }

  submitForm(submitEvent: SubmitEvent, form: HTMLFormElement): void {

    //prevent default behavior of submit in form (reload)
    submitEvent.preventDefault();
    //create form data (contains form data)
    const formData: FormData = new FormData();
    // call api 
    if (this.contentControl) {
      formData.append('body', this.contentControl.value);
    }
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    if (this.privacyControl) {
      formData.append('privacy', this.privacyControl.value);
    }

    for (const pair of formData.entries()) {
      console.log(pair[0], ':', pair[1])
    }

    //call api 
    this.postsService.createPost(formData).subscribe({
      next: (resp) => {
        if (resp.success) {
          console.log(resp);
          this.resetFormData(form);
          this.getAllPosts();
        }

      },

    })
  }

  resetFormData(form: HTMLFormElement): void {
    this.postImgUrl = '';
    form.reset();
  }


  //deletePost 
  deletePostItem(postId: string): void {
    this.postsService.deletePost(postId).subscribe(
      {
        next: (resp) => {
          if (resp.success) {
            this.getAllPosts();
          }
        }
      }
    )
  }

  //show user profile
  showProfile(userId: string): void {

  }
}
