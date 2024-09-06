import { Category } from './../../core/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ICategories } from '../../core/interfaces/icategories';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent implements OnInit {


private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly _CategoriesService = inject(CategoriesService)

CategoryDetails:ICategories | null = null;


ngOnInit(): void {
  
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
   console.log(p.get('id'));
  let CategoryId = p.get('id');
this._CategoriesService.getSpecificCategory(CategoryId!).subscribe({
  next:(res)=>{
console.log("cat",res.data);
this.CategoryDetails = res.data ;

  },
  error:(err)=>{ 
    console.log(err);
    
  }
})


    }
  })


}


}
