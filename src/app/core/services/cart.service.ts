import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private _HttpClient : HttpClient) {

  effect( ()=>{

    localStorage.setItem('cartItem', this.cartCount().toString())

  })
 }

cartCount:WritableSignal<number> = signal(0);

 userOrders:any = jwtDecode(localStorage.getItem('userToken') ! )


myHeaders:any = {token :localStorage.getItem('userToken')}

addProductToCart(id:string):Observable<any>{

  return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
    "productId":id
  }

 )
}

getProductsCart():Observable<any>{

return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)

}

deleteSpecificCartItem(id:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
}


updateProductQuantity(id:string , newCount:number):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
  {
        "count": newCount
  }
)
}


clearUserCart():Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
}


getUserOrders():Observable<any>{

  return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this.userOrders.id}`)
 
 
 
   }
 
}
