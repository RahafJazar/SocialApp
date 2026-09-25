import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../../core/services/profile.service';
import { FollowDataResponse, Suggestion } from '../../../../core/models/follow-data-response.interface';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-suggested-friends',
  imports: [SlicePipe],
  templateUrl: './suggested-friends.component.html',
  styleUrl: './suggested-friends.component.css',
})
export class SuggestedFriendsComponent implements OnInit {

  private profileService = inject(ProfileService);
  suggestions: Suggestion[] = [];
  visibleCounts: number = 3;


  ngOnInit(): void {
    this.getFollowSuggestions();
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


  showMoreOrLess(): void {
    if (this.visibleCounts > this.suggestions.length) {
      this.visibleCounts -= 3;
    }
    this.visibleCounts += 3;
  }
}
