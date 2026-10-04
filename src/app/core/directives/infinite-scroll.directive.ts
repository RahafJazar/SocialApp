import { Observable } from 'rxjs';
import { loadingInterceptor } from './../interceptors/loading/loading-interceptor';
import { Directive, ElementRef, inject, OnDestroy, OnInit, output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);

  loadMore = output<void>();

  private observer?: IntersectionObserver;
  constructor() { }

  ngOnInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.loadMore.emit();
      }
    },
      {
        rootMargin: '200px'
      }
    );

    this.observer.observe(this.elementRef.nativeElement)
  }
  ngOnDestroy(): void {
    this.observer?.disconnect()
  }
}
