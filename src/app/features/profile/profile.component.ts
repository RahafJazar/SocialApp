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


@Component({
  selector: 'app-profile',
  imports: [DatePipe, ProfileHeaderComponent, ProfilePostsComponent, ProfileBookmarksComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private postsService = inject(PostsService);
  suggestions: Suggestion[] = [];
  myPosts: Post[] = [];
  userData: UserInfo = {} as UserInfo
  userId !: string | undefined;
  activeTab: 'Posts' | 'Bookmarks' = 'Posts';
  bookmarks: Bookmark[] = [];



  ngOnInit(): void {
    this.getMyProfile()
  }


  getMyProfile(): void {
    this.profileService.getMyProfile().subscribe({
      next: (data: UserDataResponse) => {
        if (data.success) {
          console.log(`profile data : \n`, data)
          this.userData = data.data.user;
          this.userId = this.userData._id ?? this.userData.id;
          this.getFollowSuggestions();
          this.getMyPosts();
          this.getBookmarks();
        }
      }
    })
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

  getMyPosts(): void {
    this.profileService.getMyPosts(this.userId).subscribe({
      next: (resp) => {
        this.myPosts = resp.data.posts;
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
