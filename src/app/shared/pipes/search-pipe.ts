import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], ...args: unknown[]): unknown {
    return null;
  }
  //[{},{},{},{}]
  //pipe -. filteration  
}
