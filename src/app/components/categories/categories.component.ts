import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ICategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TranslateModule,CarouselModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  
  categoriesList:ICategories[] = [];
 private readonly _CategoriesService = inject(CategoriesService)


ngOnInit(): void {
 
  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
console.log(res.data);
this.categoriesList = res.data
    },
    error:(err)=>{
      console.log(err);
      
    }

  })
  

}

showSpecificCategories(id:string):void{

  this._CategoriesService.getSpecificCategory(id).subscribe({
    next:(res)=>{
      console.log(res.data);
      
      this.categoriesList = res.data
    }
  })
}



  
}
