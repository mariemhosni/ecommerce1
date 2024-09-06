import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {


// Global object Browser (window - docoument - localStorage - location - navigation )(SSR)
// Guard or life cycle component ==> ERROR (to safe use it in function)
// check type Global object !== undefined


const _Router = inject(Router);

if(typeof localStorage !== 'undefined'){
 if(localStorage.getItem('userToken') !== null){
 return true;
  }
 
  else{
        _Router.navigate(['/login']);

    return false ;
  }
}
else{
  return false ;
}

 
};
