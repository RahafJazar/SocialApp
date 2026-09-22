import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { FollowDataResponse, Suggestion } from '../../core/models/follow-data-response.interface';
import { BasePost } from '../../core/models/posts-data.interface';
import { UserDataResponse, UserInfo } from '../../core/models/user-data.interface';
import { PostsService } from '../../core/services/posts.service';
import { ProfileService } from '../../core/services/profile.service';
import { TimeAgoPipe } from '../../shared/pipes/time-ago-pipe';
import { PostCommentsComponent } from '../feed/components/feed-content/components/post-comments/post-comments.component';


@Component({
    selector: 'app-profile',
    imports: [DatePipe, TimeAgoPipe, PostCommentsComponent, RouterLink, RouterLinkActive],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
    private profileService = inject(ProfileService);
    private postsService = inject(PostsService);
    suggestions: Suggestion[] = [];
    myPosts: BasePost[] = [];
    userData: UserInfo = {} as UserInfo
    userId !: string | undefined;

    ngOnInit(): void {
        this.getMyProfile()
    }


    getMyProfile(): void {
        this.profileService.getMyProfile().subscribe({
            next: (data: UserDataResponse) => {
                if (data.success) {
                    console.log(`profile data : \n`, data)
                    this.userData = data.data.user;
                    this.getFollowSuggestions();
                    this.userData = data.data.user;
                    this.userId = data.data.user._id;
                    this.getMyPosts();
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
