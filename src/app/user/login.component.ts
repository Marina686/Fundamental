import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

@Component({
  templateUrl: './login.component.html',
  styles:[`
  em{ float:right; color:#e05c65; padding-left:10px;} 
   .cancelBtn{
    color: white;
    background-color: #4E5D6C;
    margin-left: 1em;
}
.saveBtn{
    color: #fff;
    background-color: #f97924;
}
input {
  margin-bottom: 1em;
}
 `]
})

export class LoginComponent{
userName
password
mouseoverLogin;
loginInvalid = false;
    /**
     *
     */
    constructor(private auth:AuthService, private router:Router) { 
        
    }
    login(formValues){
      this.auth.loginUser(formValues.userName, formValues.password)
      .subscribe(resp => {
        if(!resp){
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events'])
        }
      })
      
    }
    cancel(){
        this.router.navigate(['events'])
    }

}