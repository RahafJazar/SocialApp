import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onSale',
  pure: true//default(pure) -> invoked when input only change 
  //pure:false -> impure (each change detection)

})
export class OnSalePipe implements PipeTransform {

  transform(value: string, onSale?: boolean): string {
    if (onSale) {
      return `onSale: ${value}`
    }
    else return value;
  }

}
