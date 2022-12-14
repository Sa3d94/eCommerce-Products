import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ProductsActions from '../store/products.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  headers = new HttpHeaders().set(
    "Content-Type",
    "application/json"
  );
  params  = new HttpParams().set("limit","100");
  // TODO: Should be an Environment Variable
  apiUrl = "https://dummyjson.com";

  constructor(private http : HttpClient,
    private store: Store<fromApp.AppState>) { }


    async GetProducts() {
      this.store.dispatch(new ProductsActions.GetProductsStart());

      await this.http.get(
        `${this.apiUrl}/products`,
        { headers: this.headers, 
          params :  this.params },
        
      )
      .subscribe((resData : any) => {

        this.store.dispatch(new ProductsActions.SetProducts(resData.products));

  
        }, 
        error => {
    
        this.store.dispatch(new ProductsActions.GetProductsFailed(error.error.message));

          // After 3 seconds, Clear the error
              setTimeout(() =>{   this.store.dispatch(new ProductsActions.ClearError())}, 3000);
       
        })

    }
}
