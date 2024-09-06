import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-specific-brand',
  standalone: true,
  imports: [],
  templateUrl: './specific-brand.component.html',
  styleUrl: './specific-brand.component.scss'
})
export class SpecificBrandComponent implements OnInit{

private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly _BrandsService = inject(BrandsService)
brandDetails:Ibrands | null = null ;


ngOnInit(): void {
  
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
console.log(p.get('id'));
let brandId = p.get('id');
this._BrandsService.getSpecificBrand(brandId!).subscribe({
next:(res)=>{
console.log(res.data);
this.brandDetails = res.data;
},
error:(err)=>{
  console.log(err);
}

})
    }
  })
}


}
