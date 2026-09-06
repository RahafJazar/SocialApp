import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { BasePost, Data, Post, PostsDataResponse, User } from '../../../../core/models/posts-data.interface';

@Component({
  selector: 'app-feed-content',
  imports: [],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  userId: string = '';
  selectedFile!: File;
  posts: BasePost[] = [];
  postImgUrl: string | ArrayBuffer | null | undefined;
  ngOnInit(): void {
    this.getUserID();
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

  getUserID() {
    if (localStorage.getItem('userData')) {
      this.userId = JSON.parse(localStorage.getItem('userData')!)?._id;
    }
  }

  changeFile(event: Event): void {
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
}
