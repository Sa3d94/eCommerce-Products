import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import jwt_decode from "jwt-decode";
// import {catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  headers = new HttpHeaders().set(
    "Content-Type",
    "application/json"
  );
  apiAuthUrl = "https://dummyjson.com/auth";
  constructor(private http : HttpClient,
     private store: Store<fromApp.AppState>,
     private router: Router ) { }

 async Login(email: string, password: string) {

    // Dispatch Login Start Action
    this.store.dispatch(new AuthActions.LoginStart());

    await this.http.post(
      `${this.apiAuthUrl}/login`,
      {username: email,password : password },
      { headers: this.headers }
    )
    .subscribe((resData : any) => {

      this.store.dispatch(new AuthActions.AuthenticateSuccess(
        { 
          email: resData.email,
          userId: resData.username
        }
        ));
      sessionStorage.setItem("token", resData.token);
      this.router.navigate(["/home"]);
      }, 
      error => {
        this.store.dispatch(new AuthActions.AuthenticateFail(error.error.message));
        // After 3 seconds, Clear the error
        setTimeout(() =>{   this.store.dispatch(new AuthActions.ClearError())}, 3000);
      })
      // catchError(this.handleError)
   
  }
  //  handleError = (error: any) => { };


  ValidateToken() : boolean {
    let tokenInfo : any;
    try {
      tokenInfo  = jwt_decode(sessionStorage.getItem("token")); // decode token
      const expireDate = tokenInfo.exp;
      if (!expireDate || Date.now() >= (expireDate*1000) ) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  
  }

 

}
