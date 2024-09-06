import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../core/services/products.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RangePricePipe } from '../../core/pipes/range-price.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TermTextPipe,RouterLink,FormsModule,SearchPipe,RangePricePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  max:number|undefined;
  min:number|undefined;

  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _WishlistService = inject(WishlistService)
  
 

 




  favorites: { [productId: string]: boolean } = {};

  toggleFavorite(productId: string) {
    this.favorites[productId] = !this.favorites[productId];
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  isFavorited(productId: string): boolean {
    return this.favorites[productId] || false;
  }


  productList:WritableSignal<IProduct[]> = signal([])
  Average:any; 

  remove(productId:string){
    this._WishlistService.removeFromWishlist(productId).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message , 'Fresh Cart')
    
      },
      error:(err)=>{
        console.log(err);
        
      }
    
    })
    }

  addToCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message , 'Fresh Cart')
        this._CartService.cartCount.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

ngOnInit(): void {
  const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  this._ProductsService.getAllProduct().subscribe({
next:(res)=>{
  console.log(res.data);
  this.productList.set(res.data);
  
},
error:(err)=>{
console.log(err);

}

  })
}


addWishlist(productId:string){
 
   this._WishlistService.addProductToWishlist(productId).subscribe({
     next:(res)=>{
       console.log(res);
       this._ToastrService.success(res.message , 'Fresh Cart')

     },
     error:(err)=>{
       console.log(err);
       
     }
   })
 }
 
  
}
