import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Username : string = "";
  Password : string = "";
  errorMessage : any;
  isLogging = false;
  constructor(private _authService : AuthService,     private router: Router) {

  }

  ngOnInit(): void {
  }
  login(loginForm : NgForm) : void {
    
    if (loginForm.valid) {
      this.isLogging = true;
      this._authService.Login(this.Username,this.Password).subscribe((res: any) => {
        this.isLogging = false;

        sessionStorage.setItem("token", res.token);

        this.router.navigate(["/home"]);

        console.log(res);
        
      }, (error : any) => {
      this.errorMessage = error.error.message;
      this.isLogging = false; 

      // After 3 seconds, remove the show class from DIV
      setTimeout(() =>{ this.errorMessage = null }, 3000);
      })
      
    }

  }

}
