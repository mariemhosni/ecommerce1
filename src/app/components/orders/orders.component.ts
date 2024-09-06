import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

private readonly _FormBuilder = inject(FormBuilder)
private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly _OrderService = inject(OrderService)



cartId:string | null = "";
  orders:FormGroup = this._FormBuilder.group({

    details:[null],
    phone:[null,[Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null],

  })

  orderSubmit():void{
console.log(this.orders.value);
this._OrderService.checkout( this.cartId , this.orders.value ).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.status === 'success'){
window.open(res.session.url , '_self')
    }
  },
  error:(err)=>{
console.log(err);

  }
})
  }

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
this.cartId = p.get('id')
    }
  })
}

}







