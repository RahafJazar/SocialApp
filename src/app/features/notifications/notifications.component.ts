import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Notification } from '../../core/models/notifications-data.interface';
import { ProfileService } from '../../core/services/profile.service';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { NotificationType } from '../../core/enums/notification-type.enum';
import { TimeAgoPipe } from '../../shared/pipes/time-ago-pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notifications',
  imports: [NgxPaginationModule, TimeAgoPipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  private profileService = inject(ProfileService);
  private router = inject(Router);
  limit: number = 2;
  unread: boolean = false;
  page: number = 1;
  notifications: Notification[] = [];
  NotificationType = NotificationType;
  selectedNotification: Notification | undefined;

  itemsPer_Page: WritableSignal<number> = signal<number>(2);
  current_page: WritableSignal<number> = signal<number>(1);
  total_items: WritableSignal<number> = signal<number>(0);


  ngOnInit(): void {
    this.getNotifications()
  }

  getNotifications(): void {
    this.profileService.getNotifications(this.limit, this.page, this.unread).subscribe({
      next: (resp) => {
        if (resp.success) {
          console.log("notifictions : \n", resp);
          this.notifications = [...this.notifications,

          ...resp.data.notifications];

        }
      }
    })
  }
  showNotification(id: string) {
    console.log('selected')
    this.selectedNotification = this.notifications.find((notification) => {
      return notification._id === id;
    })
    if (this.selectedNotification) {
      this.selectedNotification.isRead = true;
    }
  }

  loadMore(): void {

    this.page++;
    this.getNotifications();
  }

  markAllAsRead() {
    this.notifications.map(n => {
      n.isRead = true;
    })
  }

  viewPost(postId: string): void {
    this.router.navigate(['/details', postId])
  }
}


//#region  html commented
/*<!-- Notification 1: Selected -->
   <div
       class="relative cursor-pointer border-b border-slate-100 bg-blue-50 px-4 py-5 transition hover:bg-blue-50/80">

       <div class="flex items-start gap-3">

           <!-- Avatar -->
           <div class="relative shrink-0">

               <img src="https://i.pravatar.cc/100?img=47" alt="Sara"
                   class="h-12 w-12 rounded-full object-cover">

               <span
                   class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-white">

                   <i class="fa-solid fa-heart text-[10px]"></i>

               </span>

           </div>

           <!-- Content -->
           <div class="min-w-0 flex-1">

               <p class="text-sm leading-6 text-slate-800">

                   <span class="font-bold">
                       Sara
                   </span>

                   liked your post

               </p>

               <p class="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                   Exploring new places 🏔️
               </p>

               <p class="mt-2 text-xs font-medium text-main-color">
                   2 minutes ago
               </p>

           </div>

           <!-- Unread Indicator -->
           <span class="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600"></span>

       </div>

   </div>


 <!-- Notification 4: Multiple Likes -->
               <div class="cursor-pointer border-b border-slate-100 px-4 py-5 transition hover:bg-slate-50">

                   <div class="flex items-start gap-3">

                       <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">

                           <i class="fa-solid fa-heart text-xl text-red-500"></i>

                       </div>

                       <div class="min-w-0 flex-1">

                           <p class="text-sm leading-6 text-slate-800">

                               <span class="font-bold">
                                   3 people
                               </span>

                               liked your post

                           </p>

                           <p class="mt-2 text-xs text-slate-400">
                               3 hours ago
                           </p>

                       </div>

                   </div>

               </div>


               <!-- Notification 5: Bookmark -->
               <div class="cursor-pointer border-b border-slate-100 px-4 py-5 transition hover:bg-slate-50">

                   <div class="flex items-start gap-3">

                       <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">

                           <i class="fa-solid fa-bookmark text-xl text-purple-600"></i>

                       </div>

                       <div class="min-w-0 flex-1">

                           <p class="text-sm leading-6 text-slate-800">

                               Your post was

                               <span class="font-bold">
                                   saved
                               </span>

                           </p>

                           <p class="mt-2 text-xs text-slate-400">
                               5 hours ago
                           </p>

                       </div>

                   </div>

               </div>


               <!-- Notification 6: Mention -->
               <div class="cursor-pointer border-b border-slate-100 px-4 py-5 transition hover:bg-slate-50">

                   <div class="flex items-start gap-3">

                       <div class="relative shrink-0">

                           <img src="https://i.pravatar.cc/100?img=45" alt="Rana"
                               class="h-12 w-12 rounded-full object-cover">

                           <span
                               class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-amber-500 text-white">

                               <i class="fa-solid fa-at text-[10px]"></i>

                           </span>

                       </div>

                       <div class="min-w-0 flex-1">

                           <p class="text-sm leading-6 text-slate-800">

                               <span class="font-bold">
                                   Rana
                               </span>

                               mentioned you in a comment

                           </p>

                           <p class="mt-1 text-xs text-slate-500">
                               @tala_1 check this out!
                           </p>

                           <p class="mt-2 text-xs text-slate-400">
                               1 day ago
                           </p>

                       </div>

                   </div>

               </div>


               <!-- Notification 7: New Follower -->
               <div class="cursor-pointer px-4 py-5 transition hover:bg-slate-50">

                   <div class="flex items-start gap-3">

                       <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">

                           <i class="fa-solid fa-users text-xl text-green-600"></i>

                       </div>

                       <div class="min-w-0 flex-1">

                           <p class="text-sm leading-6 text-slate-800">

                               You have a

                               <span class="font-bold">
                                   new follower
                               </span>

                           </p>

                           <p class="mt-2 text-xs text-slate-400">
                               2 days ago
                           </p>

                       </div>

                   </div>

               </div>*/
//#endregion