import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'rangePrice',
  standalone: true
})
export class RangePricePipe implements PipeTransform {

  transform(products: IProduct[], minPrice: number|undefined, maxPrice: number |undefined):  IProduct[] {
    if (!products  || (minPrice == undefined && maxPrice == undefined)) {
      return products;
    }

    return products.filter((product) => {
      const price = product.price;                                                      
      return (!minPrice  || price <= minPrice) && (maxPrice == undefined || price >= maxPrice);
    });
  }
}


