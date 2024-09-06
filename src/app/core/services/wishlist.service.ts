import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }

private readonly _HttpClient = inject(HttpClient)



addProductToWishlist(productId:string):Observable<any>{

return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,

{

 "productId": productId
}
)

}

getWishList():Observable<any>{

  return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
}


removeFromWishlist(productId:string):Observable<any>{

  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`)
}




}
