import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { tick } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
 
  private readonly _TranslateService = inject(TranslateService)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null,null)

  constructor() {
    if(isPlatformBrowser(this._PLATFORM_ID)){

    this._TranslateService.setDefaultLang('en')

   this.setlang()
  }

    }

    setlang():void {
let savedLang = localStorage.getItem('lang');

if(savedLang !== null){
  this._TranslateService.use(savedLang!)
}
//change direction

  if(savedLang === 'en'){
//document.documentElement.dir = 'ltr';
this._Renderer2.setAttribute(document.documentElement,'dir' ,'ltr')
this._Renderer2.setAttribute(document.documentElement,'lang' ,'en')

}
else if(savedLang === 'ar'){
  //document.documentElement.dir = 'rtl';
this._Renderer2.setAttribute(document.documentElement , 'dir' ,'rtl')
this._Renderer2.setAttribute(document.documentElement,'lang' ,'ar')

}
 }

changeLang(lang:string):void{
if(isPlatformBrowser(this._PLATFORM_ID)){
  localStorage.setItem('lang' , lang);


this.setlang();

}

}
  
}
