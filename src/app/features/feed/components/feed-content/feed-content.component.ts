import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { BasePost, Data, Post, PostsDataResponse } from '../../../../core/models/posts-data.interface';

@Component({
  selector: 'app-feed-content',
  imports: [],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  posts: BasePost[] = [];

  ngOnInit(): void {
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
      error: () => {
        console.log("No Posts Yet");
      }
    })
  }
}
