import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {TOASTR_TOKEN, Toastr} from '../events/common/toastr.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup;
  
  private firstName =new FormControl();
  private lastName = new FormControl();
  constructor(private auth:AuthService, private router:Router,@Inject(TOASTR_TOKEN) private toastr:Toastr) { }

  ngOnInit(): void {
      this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required,
        Validators.pattern('[a-zA-Z].*')]);
      this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required);
      this.profileForm = new FormGroup({
        firstName: new FormControl(),
         lastName:new FormControl()
     });
    
    
  }
  validateFirstName(){
    return this.firstName.invalid ||  this.firstName.untouched;
  }

  validateLastName(){
    return this.lastName.valid ||  this.lastName.untouched
  }
  SaveProfile(formValues){
    if(this.profileForm.valid){
    this.auth.updateCurrentUser(formValues.firstName, formValues.lastName)
    .subscribe(() => {
      this.toastr.success('Profile saved')
    }) 
   }
  }
  cancel(){
   this.router.navigate(['events']);
  }
  logout(){
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    })
  }
}
