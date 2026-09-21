import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { UserDataResponse, UserInfo } from '../../core/models/user-data.interface';
import { DatePipe } from '@angular/common';
import { FollowDataResponse, Suggestion } from '../../core/models/follow-data-response.interface';
import { BasePost } from '../../core/models/posts-data.interface';

type ProfileTab = 'Posts' | 'About' | 'Photos' | 'Friends';

interface MockPost {
    id: number;
    author: string;
    avatar: string;
    time: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
}

@Component({
    selector: 'app-profile',
    imports: [DatePipe],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
    private profileService = inject(ProfileService);
    suggestions: Suggestion[] = [];
    myPosts: BasePost[] = [];
    userData !: UserInfo;
    userId !: number;
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
                    this.getUserData();
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
    getUserData() {
        if (localStorage.getItem('userData')) {
            this.userData = JSON.parse(localStorage.getItem('userData')!);
            this.userId = JSON.parse(localStorage.getItem('userData')!)?._id;
        }
    }
}
