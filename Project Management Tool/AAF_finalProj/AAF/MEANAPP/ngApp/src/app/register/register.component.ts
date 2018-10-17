import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  password: String;
   
  constructor(
    private validateService:ValidateService,
    private authService : AuthService,
    private router :Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
   
   const user = {
    name:this.name,
    email:this.email,
    password:this.password

   }
   
   if(!this.validateService.validateRegister(user)){
    Swal({
      type: 'error',
      title: 'Please fill all the field!'
    })
    return false;
  }
  if(!this.validateService.validateEmail(user.email)){
    Swal({
      type: 'error',
      title: 'Please enter valid email'
    })
    return false;
  }
  
  
  this.authService.registerUser(user).subscribe(data => {
    //console.log(data)
    if(data.message="User Created...")
    {
      Swal('Now you are registered!');
      this.router.navigate(['/login']);
    }
    else
    {
      Swal('Registration failed');
      this.router.navigate(['/register']);
    }
  });

  }
}
