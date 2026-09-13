import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitText',
  pure: true
})
export class SplitTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return value.split(' ', limit).join(' ');
  }

}
