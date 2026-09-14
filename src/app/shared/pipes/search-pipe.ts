import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProfileComponent } from '../../features/profile/profile.component';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], term: string): Product[] {
    return value.filter((product) => {
      return product.title.toLowerCase().includes(term.toLowerCase());
    })
  }
  //[{},{},{},{}]
  //pipe -. filteration  
}
