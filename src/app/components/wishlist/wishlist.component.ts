import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iwishlist } from '../../core/interfaces/iwishlist';


@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink,TermTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

  
  wishList:Iwishlist[] = []
  


  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishList = res.data
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

  removeFromWhishlist(id:string):void{

    this._WishlistService.removeFromWishlist(id).subscribe({
next:(res)=>{
  console.log(res.data);
  this._ToastrService.success(res.message , 'Fresh Cart')
    this.wishList = res.data
    
}

    })
  }



  }



  

