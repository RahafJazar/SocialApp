import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, model, ValueProvider } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InfiniteScrollDirective } from '../../../../core/directives/infinite-scroll.directive';
import { BasePost, PostsDataResponse } from '../../../../core/models/posts-data.interface';
import { PostsService } from '../../../../core/services/posts.service';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago-pipe';
import { DialogComponent } from '../../../../shared/ui/dialog/dialog.component';
import { UserInfo } from './../../../../core/models/user-data.interface';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { finalize, forkJoin } from 'rxjs';
import { ProfileService } from '../../../../core/services/profile.service';

@Component({
  selector: 'app-feed-content',
  imports: [TranslatePipe, ReactiveFormsModule, PostCommentsComponent, RouterLink, DatePipe, TimeAgoPipe, InfiniteScrollDirective, DialogComponent, DialogModule, FormsModule],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  userId: string = '';
  selectedFile!: File;
  posts: BasePost[] = [];
  postImgUrl: string | ArrayBuffer | null | undefined;
  userData: UserInfo = {} as UserInfo;
  //2 inputs only -> use FormControl instead of FormGroup
  contentControl: FormControl = new FormControl('', []);
  privacyControl: FormControl = new FormControl('public', null);
  showComments: Record<string, boolean> = {};
  limit: number = 20;
  page: number = 1;
  only: string = 'following';
  hasMore: boolean = true;
  isLodaing: boolean = false;

  // ضيفي DialogModule إلى imports
  shareDialogvisible: boolean = false;
  selectedPost: BasePost | null = null;


  ngOnInit(): void {
    this.getUserData();
    this.getFeedPosts(this.only, this.limit, this.page);
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
  getFeedPosts(only: string, limit: number, page: number): void {
    if (!this.hasMore || this.isLodaing) {
      return
    }
    this.isLodaing = true;
    this.postsService.getHomeFeed(only, limit, page).subscribe((resp) => {
      if (resp.success) {
        this.posts = [...this.posts, ...resp.data.posts];
        this.hasMore = this.posts.length < resp.meta?.pagination.total!;
        this.page++;
        this.isLodaing = false;
      }

    })
  }
  getBookmarks(): void {
    if (!this.hasMore || this.isLodaing) {
      return
    }
    this.isLodaing = true;
    this.profileService.getBookmarks().subscribe({
      next: (resp) => {
        if (resp.success) {
          this.posts = [...this.posts, ...resp.data.bookmarks];
          this.hasMore = this.posts.length < resp.meta?.pagination.total!;
          this.page++;
          this.isLodaing = false;
        }
      }
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
  showProfile(userId: string | undefined): void {
    this.router.navigate(['/profile', userId])
  }

  //select post you want to share 
  openShare(post: BasePost): void {
    this.selectedPost = post;
    this.shareDialogvisible = true;
    if (!post) return;
  }

  sharePost(postId: string, textarea: HTMLTextAreaElement): void {
    const payload = {
      body: textarea.value.trim()
    };
    this.postsService.sharePost(postId, payload).subscribe(
      {
        next: (resp) => {
          if (resp.success) {
            this.shareDialogvisible = false;
            this.selectedPost = null;
            this.refreshPosts();
            textarea.value = ''
          }
        }
      }
    )
  }

  // ==========================
  //  REFRESH POSTS
  // ==========================

  refreshPosts(): void {
    if (this.isLodaing) return;

    // page هو رقم الصفحة القادمة، لذلك آخر صفحة محملة هي page - 1
    const lastPage = Math.max(1, this.page - 1);

    const requests = Array.from(
      { length: lastPage },
      (_, index) =>
        this.postsService.getHomeFeed(
          this.only,
          this.limit,
          index + 1
        )
    );

    this.isLodaing = true;

    forkJoin(requests)
      .pipe(
        finalize(() => {
          this.isLodaing = false;
        })
      )
      .subscribe({
        next: (responses) => {
          if (responses.some(response => !response.success)) return;

          const allPosts = responses.flatMap(
            response => response.data.posts
          );

          this.posts = Array.from(
            new Map(
              allPosts.map(post => [post._id, post])
            ).values()
          );

          const lastResponse = responses[responses.length - 1];
          const total = lastResponse.meta?.pagination?.total;

          this.page = lastPage + 1;

          this.hasMore =
            total != null
              ? allPosts.length < total
              : lastResponse.data.posts.length === this.limit;
        },

        error: (error) => {
          console.error('Failed to refresh posts:', error);
        }
      });
  }
  // ==========================
  //  Like Posts 
  // ==========================
  likePost(post: BasePost): void {
    this.postsService.likePost(post._id).subscribe({
      next: (resp) => {
        if (resp.success) {
          post.likesCount = resp.data.likesCount;

          // احذفي المستخدم أولًا لتجنب التكرار
          const likes = (post.likes ?? []).filter(
            id => id !== this.userId
          );

          post.likes = resp.data.liked
            ? [...likes, this.userId]
            : likes;

        }
      }
    })
  }

  changeFeed(only: 'following' | 'me' | 'all' | 'saved'): void {
    if (this.only === only || this.isLodaing) return;

    this.only = only;
    this.posts = [];
    this.page = 1;
    this.hasMore = true;



    if (only === 'saved') {
      this.getBookmarks();
    } else {
      this.getFeedPosts(this.only, this.limit, this.page);
    }

  }
}
