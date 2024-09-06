import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  
private readonly _BrandsService = inject(BrandsService)
brandsList:WritableSignal<Ibrands[]> = signal([])

ngOnInit(): void {
  this._BrandsService.getAllBrands().subscribe({
    next:(res)=>{
console.log(res.data);
this.brandsList.set(res.data ) 
    },
    error:(err)=>{
      console.log(err);
      
    }

  })
}

}
