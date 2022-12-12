import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {catchError, map, tap} from 'rxjs/operators';
@Injectable()
export class AuthService {
  headers = new HttpHeaders().set(
    "Content-Type",
    "application/json"
  );
  apiAuthUrl = "https://dummyjson.com/auth";
  constructor(private http : HttpClient ) { }

  Login(email: string, password: string): any {
    return this.http.post(
      `${this.apiAuthUrl}/login`,
      {username: email,password : password },
      { headers: this.headers }
    )

    // .pipe(

    //   map((resData: any) => {
    //     debugger;
    //     return resData;
    //   }),
    //   catchError(this.handleError)
    // );
  }
   handleError = (error: any) => {
 
    return error.error.message;

  
  };

 

}
