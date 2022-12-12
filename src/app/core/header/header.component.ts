import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit{
   isAuthenticated ;

 
   constructor(private store : Store<fromApp.AppState>
    , private _authService: AuthService) {
     
   }
  ngOnInit(): void {
    this.store.select("auth").subscribe(state => {
      this.isAuthenticated = state.user ? true : false;
    });
    this.isAuthenticated = this._authService.ValidateToken();

  }

  OnLogout() {
    this._authService.Logout();
  }

}
