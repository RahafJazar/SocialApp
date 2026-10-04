import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProfileComponent } from '../../features/profile/profile.component';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], term: string, searchElem: string): any[] {
    return value.filter((product) => {
      return product[searchElem].toLowerCase().includes(term.toLowerCase());
    })
  }
  //[{},{},{},{}]
  //pipe -. filteration  
}
