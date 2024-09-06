import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errMsg:string ="";
  successMsg:boolean = false ;
  isLoading:boolean = false;
private readonly _FormBuilder  = inject(FormBuilder)
private readonly _AuthService  = inject(AuthService)
private readonly _Router  = inject(Router)


loginForm:FormGroup = this._FormBuilder.group({
email:[null, [ Validators.required , Validators.email]],
password:[null, [ Validators.required , Validators.pattern(/^\w{6,}$/)]]
})


loginSubmit(){
if(this.loginForm.valid){
this._AuthService.setLoginForm(this.loginForm.value).subscribe({
next:(res)=>{
  console.log(res);
  if(res.message == 'success'){
    this.successMsg =true;
setTimeout(() => {
//save Token
localStorage.setItem('userToken' , res.token)
// de-code Token

this._AuthService.saveUserData()
//navigate to home
    this._Router.navigate(['/home'])

}, 2000);
   }
},
error:(err:HttpErrorResponse)=>{
console.log(err);
this.errMsg = err.error.message;

}

})


}

}






}
