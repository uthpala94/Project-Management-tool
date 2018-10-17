import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../services/auth.service';
import{Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user={
      email:this.email,
      password:this.password
    }
    this.authService.loginUser(user).subscribe(data =>{
      if(data.message ="Authentication successful"){
        console.log(data)
        this.authService.storeUserData(data.token,data.user);
        Swal('Now you are logged in!');
        this.router.navigate(['/home']);
      }
      else{
        Swal({
          type: 'error',
          title: 'Login failed'
        })
        this.router.navigate(['/login']);
      }
    },err=>{
      Swal({
        type: 'error',
        title: 'Login failed'
      })
        this.router.navigate(['/login']);
    });
    
  }

}
