import { SearchProducts } from './../../home/store/products.actions';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ProductsActions from '../../home/store/products.actions';
import { getLocaleFirstDayOfWeek } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit{
   isAuthenticated ;
   searchText ;
   cartItems;
 
   constructor(private store : Store<fromApp.AppState>
    , private _authService: AuthService , private router : Router) {
     
   }
  ngOnInit(): void {
    this.store.select("auth").subscribe(state => {
      this.isAuthenticated = state.user ? true : false;
    });
    this.isAuthenticated = this._authService.ValidateToken();

    this.store.select("products").subscribe(state => {
      this.searchText = state.searchText;
      this.cartItems = state.cartItems;
      
    });
  }

  OnLogout() {
    this._authService.Logout();
  }
  OnLogin() {
    this.router.navigate(["/auth"]);
  }
  OnHome(){
    this.router.navigate(["/home"]);

  }

  onSearch($event) {
    
    const value = $event.target.value;
    if (!value || value == "") {
      this.store.dispatch(new ProductsActions.ClearSearch());
    }else {
      this.store.dispatch(new ProductsActions.SearchProducts($event.target.value));
    }
        

  }

}
