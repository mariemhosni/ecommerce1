
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,TermTextPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
private readonly _CartService = inject(CartService);

private readonly _ToastrService = inject(ToastrService)

cartDetails:ICart = {} as ICart ;



ngOnInit(): void {
  this._CartService.getProductsCart().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.cartDetails = res.data ;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })


}




removeProduct(id:string):void{
  
this._CartService.deleteSpecificCartItem(id).subscribe({
  
  next:(res)=>{
    console.log(res);
    
    this.cartDetails = res.data
    this._ToastrService.success('Product Removed' ,'Fresh Cart')
this._CartService.cartCount.set(res.numOfCartItems)
    
  },
  error:(err)=>{
    console.log(err);
    
  }
})

}










updateCount(id:string , count:number):void{
  if(count > 0 ){ 

    this._CartService.updateProductQuantity( id , count).subscribe({
      next:(res)=>{
      console.log(res);  

      this.cartDetails = res.data

      } ,
      error:(err)=>{
      console.log(err);
      
      }
      
        })
  }
  
}

clearCart():void{
  this._CartService.clearUserCart().subscribe({
    next:(res)=>{
      console.log(res);
     if(res.message === 'success'){
      this.cartDetails = {} as ICart
      this._ToastrService.success('Cart empty' ,'Fresh Cart')
      this._CartService.cartCount.set(res.numOfCartItems)

     }
    },
    error:(err)=>{
      console.log(err);
    }
  })
}




}




