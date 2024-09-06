import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  step:number = 1 ;


  verifyEmail:FormGroup = new FormGroup({
    email: new FormControl( null,[Validators.required , Validators.email] )
  })

  verifyCode:FormGroup = new FormGroup({
    resetCode: new FormControl( null,[Validators.required , Validators.pattern(/^\w{6}$/)] )
      })

      resetPassword:FormGroup = new FormGroup({
        email: new FormControl( null,[Validators.required , Validators.email]),
        newPassword:new FormControl (null, [ Validators.required , Validators.pattern(/^\w{6,}$/)])

          })

verifyEmailSubmit():void{

  let emailValue = this.verifyEmail.get('email')?.value ;
this.resetPassword.get('email')?.patchValue(emailValue)


  this._AuthService.setEmailverify(this.verifyEmail.value ).subscribe({
    next:(res)=>{
      console.log(res);
      if( res.statusMsg === 'success'){
this.step = 2 ;
      }
    },
    error:(err)=>{
      console.log((err));

    }
  })
}

verifyCodeSubmit():void{
  this._AuthService.setCodeVerify(this.verifyCode.value ).subscribe({
    next:(res)=>{
      console.log(res);
      if( res.status === 'Success'){
this.step = 3 ;
      }
    },
    error:(err)=>{
      console.log((err));

    }
  })
}

resetPassSubmit():void{
  this._AuthService.setResetPass(this.resetPassword.value ).subscribe({
    next:(res)=>{
      console.log(res);
      localStorage.setItem('userToken', res.token);
      this._AuthService.saveUserData()
      this._Router.navigate(['/home'])
    },
    error:(err:HttpErrorResponse)=>{
      console.log(err);

    }
  })
}

}
