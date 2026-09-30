import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FollowDataResponse, Suggestion } from '../../core/models/follow-data-response.interface';
import { Post } from '../../core/models/posts-data.interface';
import { UserDataResponse, UserInfo } from '../../core/models/user-data.interface';
import { PostsService } from '../../core/services/posts.service';
import { ProfileService } from '../../core/services/profile.service';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { Bookmark } from '../../core/models/bookmarks-data.interface';
import { ProfileBookmarksComponent } from "./components/profile-bookmarks/profile-bookmarks.component";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  imports: [DatePipe, ProfileHeaderComponent, ProfilePostsComponent, ProfileBookmarksComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private postsService = inject(PostsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  suggestions: Suggestion[] = [];
  posts: Post[] = [];
  userData: UserInfo = {} as UserInfo
  userId: string = '';
  activeTab: 'Posts' | 'Bookmarks' = 'Posts';
  bookmarks: Bookmark[] = [];
  isMyProfile: boolean = false;


  ngOnInit(): void {
    this.getUserID();
    this.getProfile(this.userId);
  }
  getUserID() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.userId = param.get('userId')!;
      this.isMyProfile = (this.userId == JSON.parse(localStorage.getItem('userData') ?? '')._id!);
    })
  }
  getProfile(userId: string): void {
    if (this.isMyProfile) {
      this.getMyProfile();
    } else {
      this.getUserProfile(userId)
    }

  }


  getFollowSuggestions(): void {
    this.profileService.getFollowProfileSuggestions().subscribe({
      next: (data: FollowDataResponse) => {
        if (data.success) {
          console.log(`profile data : \n`, data)
          this.suggestions = data.data.suggestions
        }
      }
    })
  }
  getMyProfile(): void {
    this.profileService.getMyProfile().subscribe({
      next: (data: UserDataResponse) => {
        if (data.success) {
          console.log(`profile data : \n`, data)
          this.userData = data.data.user;
          this.getFollowSuggestions();
          this.getMyPosts();
          this.getBookmarks();
        }
      }
    })
  }
  getUserProfile(userId: string): void {
    this.profileService.getUserProfile(userId).subscribe({
      next: (data: UserDataResponse) => {
        if (data.success) {
          console.log(`profile data : \n`, data)
          this.userData = data.data.user;
          this.getFollowSuggestions();
          this.getUserPosts(userId);
        }
      }
    })
  }
  getMyPosts(): void {
    this.postsService.getMyPosts(this.userId).subscribe({
      next: (resp) => {
        this.posts = resp.data.posts;
      }
    })
  }
  getUserPosts(userId: string): void {
    this.postsService.getUserPosts(this.userId).subscribe({
      next: (resp) => {
        this.posts = resp.data.posts;
      }
    })
  }

  getBookmarks(): void {
    this.profileService.getBookmarks().subscribe({
      next: (resp) => {
        this.bookmarks = resp.data.bookmarks;
      }
    })
  }

  //deletePost 
  deletePostItem(postId: string): void {
    this.postsService.deletePost(postId).subscribe(
      {
        next: (resp) => {
          if (resp.success) {
            this.getMyPosts();
          }
        }
      }
    )
  }

}
