import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
successMsg:boolean = false;
errMsg:string ="";
isLoading:boolean = false;
private readonly _AuthService = inject(AuthService);
private readonly _FormBuilder = inject(FormBuilder);
private readonly _Router = inject(Router);



registerForm:FormGroup = this._FormBuilder.group({
  name:[null , [ Validators.required , Validators.minLength(3) , Validators.maxLength(25)]],
  email:[null ,[ Validators.required , Validators.email]],
  password:[null , [ Validators.required , Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],
  phone:[null ,[Validators.required ,  Validators.pattern(/^01[0125][0-9]{8}$/)]]

}, { validators: this.confirmPassword })

/* registerForm:FormGroup = new FormGroup({
name:new FormControl(null , [ Validators.required , Validators.minLength(3) , Validators.maxLength(25)]),
email: new FormControl(null ,[ Validators.required , Validators.email]),
password: new FormControl(null , [ Validators.required , Validators.pattern(/^\w{6,}$/)]),
rePassword: new FormControl(null),
phone: new FormControl(null ,[Validators.required ,  Validators.pattern(/^01[0125][0-9]{8}$/)]),

} , this.confirmPassword)
  */
registerSubmit():void{
if(this.registerForm.valid){

  this.isLoading = true ;
 //console.log(this.registerForm.value);
this._AuthService.setRegisterForm( this.registerForm.value ).subscribe({
  next:(res)=>{
    console.log("res",res)
    this.isLoading = false ;
    this.successMsg = res.message;
    if(res.message == 'success'){
     this.successMsg =true;
setTimeout(() => {
          this._Router.navigate(['/login'])

}, 2000);
    }

  },
  error:(err:HttpErrorResponse)=>{
    console.log("error",err);
    this.errMsg = err.error.message;
    this.isLoading = false ;

  }
})

}

else{
  this.registerForm.setErrors({mismatch:true})
  this.registerForm.markAllAsTouched()
}
}
confirmPassword(g:AbstractControl){
if(g.get('password')?.value == g.get('rePassword') ?.value){

  return null ;
}
else{
  return {mismatch:true}
}
}


}
