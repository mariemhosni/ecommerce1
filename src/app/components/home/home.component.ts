import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import {  NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink , TermTextPipe , SearchPipe,FormsModule ,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent  implements OnInit , OnDestroy{

  favorites: { [productId: string]: boolean } = {};

  toggleFavorite(productId: string) {
    this.favorites[productId] = !this.favorites[productId];
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  isFavorited(productId: string): boolean {
    return this.favorites[productId] || false;
  }


  text:string = "";
 private readonly _ProductsService = inject(ProductsService)
 private readonly _CategoriesService = inject(CategoriesService)
 private readonly _CartService = inject(CartService)
 private readonly _ToastrService = inject(ToastrService)
 readonly _TranslateService = inject(TranslateService);


 private readonly _WishlistService = inject(WishlistService)

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
 






 categoriesList:WritableSignal<ICategories[]> = signal([])
productList:WritableSignal<IProduct[]> = signal([])
productsub!:Subscription;

customOptionsCategoryMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  rtl:true,
  dots: false,
  autoplay:true,
  autoplayTimeout:1000,
  autoplayHoverPause:true,
  navSpeed: 900,
  navText: ['', ''],
 items:1,
  nav: true
}

customOptionsCategory: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  rtl:true,
  dots: false,
  autoplay:true,
  autoplayTimeout:1000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 7
    }
  },
  nav: true
}


ngOnInit(): void {
this._CategoriesService.getAllCategories().subscribe({
  next:(res)=>{
    console.log(res.data);
    this.categoriesList.set(res.data)  ;

  },
  error:(err)=>{
console.log(err);

  }
})

const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }


 this.productsub = this._ProductsService.getAllProduct().subscribe({
next:(res)=>{
console.log(res.data);
this.productList.set (res.data) ;
},
error:(err)=>{
console.log(err);

}
  })
}

ngOnDestroy(): void {
  this.productsub?.unsubscribe()
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





}
