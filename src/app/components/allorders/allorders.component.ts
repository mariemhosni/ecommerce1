import { Component, inject, OnInit } from '@angular/core';
import { ICart } from '../../core/interfaces/icart';
import { CartService } from '../../core/services/cart.service';
import { Allorders } from '../../core/interfaces/allorders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  allorders:Allorders[] = [];
private readonly _CartService = inject(CartService)

ngOnInit(): void {
   this._CartService.getUserOrders().subscribe({
      next:(res)=>{
        console.log(res);
        this.allorders = res
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}

 
   

