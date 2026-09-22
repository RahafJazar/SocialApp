import { numberAttribute, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(createdAt: string | Date): unknown {
    const now = new Date();
    const date = new Date(createdAt);


    //diff in seconds
    //divide on 1000 ->  because getTime() return milliseconds and 1000ms=1s
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) {
      //إذا مرّ أقل من دقيقة، اعرض just now.
      return 'just now';
    }

    const diffInMinutes = Math.floor((diffInSeconds / 60));
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
    }


    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
    }


    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays < 365) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
    }


    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`


  }

}
