import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from './models/post-details-data.interface';
import { UserInfo } from '../../core/models/user-data.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {

  private readonly postsService = inject(PostsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  postId: string = '';
  postData: Post = {} as Post;
  userData: UserInfo = {} as UserInfo;
  userId: string = '';



  ngOnInit(): void {
    this.getPostId();
    this.getUserData();
    this.getSignlePostData(this.postId);
  }

  getPostId(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.postId = param.get('id')!;
    })
  }

  getSignlePostData(id: string) {

    this.postsService.getsinglePost(id).subscribe({
      next: (resp) => {
        if (resp.success) {
          if (resp.data.post.isShare) {
            this.postData = resp.data.post.sharedPost;
          } else {
            this.postData = resp.data.post;
          }

          console.log('post details :', this.postData)
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

  //deletePost 
  deletePostItem(postId: string): void {
    this.postsService.deletePost(postId).subscribe(
      {
        next: (resp) => {
          if (resp.success) {
            this.router.navigate(['/feed'])
          }
        }
      }
    )
  }
}
