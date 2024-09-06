import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive ,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{

   readonly _AuthService = inject(AuthService);
   private readonly _MytranslateService = inject(MytranslateService);
    readonly _TranslateService = inject(TranslateService);
    private readonly _CartService = inject(CartService);

cartNumber:Signal<number> = computed(()=> this._CartService.cartCount() )  ;


ngOnInit(): void {

this._CartService.getProductsCart().subscribe({
  next:(res)=>{
    console.log(res);
  this._CartService.cartCount.set(res.numOfCartItems)
  }
})
 

}

change(lang:string):void{
this._MytranslateService.changeLang(lang)

}

}
