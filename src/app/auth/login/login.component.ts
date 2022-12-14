import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Username : string = "";
  Password : string = "";
  isLogging = false;
  constructor(private _authService : AuthService,
    private router: Router, 
     private store: Store<fromApp.AppState>) {

  }

  ngOnInit(): void {
  this.store.select("auth").subscribe(state => {
   
    this.isLogging = state.loading;
  })
  }
  async login(loginForm : NgForm) {
    
    if (loginForm.valid) {
      await this._authService.Login(this.Username,this.Password);
      
    }

  }

}
