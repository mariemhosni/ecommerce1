import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly _ProductsService = inject(ProductsService)
private readonly _ToastrService = inject(ToastrService)

private _CartService= inject(CartService)
productDetails:IProduct | null = null;


addto(id:string):void{
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


customOptionsDetaials: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:1000,
  autoplayHoverPause:true,
  navSpeed: 900,
  navText: ['', ''],
 items:1,
  nav: false
}



ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
console.log(p.get('id'));
let productId = p.get('id');
 this._ProductsService.getSpecificProduct(productId).subscribe({
  next:(res)=>{
console.log(res.data);
this.productDetails = res.data ;
  },
  error:(err)=>{ 
    console.log(err);
    
  }
 })

    }
  })
}





}
