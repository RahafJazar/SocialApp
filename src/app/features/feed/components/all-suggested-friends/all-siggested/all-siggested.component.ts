import { TranslatePipe } from '@ngx-translate/core';
import { Component, inject, OnInit } from '@angular/core';

import {
  FollowDataResponse,
  Suggestion
} from '../../../../../core/models/follow-data-response.interface';

import { ProfileService } from '../../../../../core/services/profile.service';
import { SearchPipe } from '../../../../../shared/pipes/search-pipe';

import { finalize, forkJoin } from 'rxjs';
import { ReturnPackComponent } from '../../../../../shared/ui/return-back/return-pack/return-pack.component';

@Component({
  selector: 'app-all-siggested',
  imports: [TranslatePipe, SearchPipe, ReturnPackComponent],
  templateUrl: './all-siggested.component.html',
  styleUrl: './all-siggested.component.css',
})
export class AllSiggestedComponent implements OnInit {

  private readonly profileService = inject(ProfileService);

  // Suggestions
  suggestions: Suggestion[] = [];

  // Pagination
  page: number = 1;
  currentPage: number = 0;
  limit: number = 10;
  hasMore: boolean = true;

  // Loading
  loading: boolean = false;
  followloading: boolean = false;
  followedUser: string = '';

  // Search
  searchVal: string = '';

  ngOnInit(): void {
    this.getFollowSuggestions();
  }

  // ==========================
  // 1. GET SUGGESTIONS
  // ==========================

  getFollowSuggestions(): void {

    if (this.loading || !this.hasMore || this.followloading) {
      return;
    }

    this.loading = true;

    this.profileService
      .getFollowProfileSuggestions(this.limit, this.page)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({

        next: (response: FollowDataResponse) => {

          if (!response.success) return;

          const newSuggestions =
            response.data.suggestions ?? [];

          // Prevent duplicate users
          const allSuggestions = [
            ...this.suggestions,
            ...newSuggestions
          ];

          this.suggestions = Array.from(
            new Map(
              allSuggestions.map(user => [
                user._id,
                user
              ])
            ).values()
          );

          // Update pagination
          const pagination = response.meta.pagination;

          this.currentPage = pagination.currentPage;

          this.page = pagination.currentPage + 1;

          this.hasMore =
            pagination.currentPage <
            pagination.numberOfPages;
        },

        error: (error) => {
          console.error('Failed to load suggestions:', error);
        }
      });
  }

  // ==========================
  // 2. REFRESH SUGGESTIONS
  // ==========================

  refreshSuggestions(): void {

    if (this.loading) return;

    // Save the last loaded page
    const lastPage = Math.max(1, this.currentPage);

    // Create requests from page 1 to lastPage
    const requests = Array.from(
      { length: lastPage },
      (_, index) =>
        this.profileService.getFollowProfileSuggestions(
          this.limit,
          index + 1
        )
    );

    this.loading = true;

    forkJoin(requests)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({

        next: (responses: FollowDataResponse[]) => {

          // Make sure all requests succeeded
          if (responses.some(res => !res.success)) {
            return;
          }

          // Combine suggestions
          const allSuggestions = responses.flatMap(
            res => res.data.suggestions ?? []
          );

          // Remove duplicate users
          this.suggestions = Array.from(
            new Map(
              allSuggestions.map(user => [
                user._id,
                user
              ])
            ).values()
          );

          // Update pagination
          const pagination =
            responses[responses.length - 1].meta.pagination;

          this.currentPage = pagination.currentPage;

          this.page = pagination.currentPage + 1;

          this.hasMore =
            pagination.currentPage <
            pagination.numberOfPages;
        },

        error: (error) => {
          console.error('Failed to refresh suggestions:', error);
        }
      });
  }

  // ==========================
  // 3. FOLLOW USER
  // ==========================

  followUser(userId: string): void {

    if (this.followloading || this.loading) return;

    this.followedUser = userId;
    this.followloading = true;

    this.profileService
      .followUser(userId)
      .pipe(
        finalize(() => {
          this.followloading = false;
          this.followedUser = '';
        })
      )
      .subscribe({

        next: (response) => {

          if (!response.success) return;

          // Remove followed user immediately
          this.suggestions = this.suggestions.filter(
            user => user._id !== userId
          );

          // Reload all previously visited pages
          this.refreshSuggestions();
        },

        error: (error) => {
          console.error('Follow failed:', error);
        }
      });
  }

  // ==========================
  // 4. SEARCH
  // ==========================

  SearchUser(event: Event): void {
    this.searchVal =
      (event.target as HTMLInputElement).value;
  }

  handleClickBack() {

  }
}