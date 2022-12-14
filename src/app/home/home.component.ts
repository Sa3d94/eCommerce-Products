import { ProductsService } from './services/products.service';
import { Component, OnInit } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productFilter = null;
  searchText =null;
  filterHeader;
  isProductsLoaded = false;
  constructor(private _productsService : ProductsService 
    , private store : Store<fromApp.AppState> ) {
    
  }
  ngOnInit(): void {
     this._productsService.GetProducts();

     this.store.select("products")
     .subscribe(state => {
       if (state.products) {
         this.isProductsLoaded = true;
       }
       this.productFilter = state.productFilter;
       this.searchText = state.searchText;

       // Setting the Header for the Component
       if (this.searchText && this.searchText != "") 
       {
         this.filterHeader = this.searchText;
       }
       else if (this.productFilter && this.productFilter) 
       {
        this.filterHeader = this.productFilter;
       } else {
        this.filterHeader = "Products"
       }
     })
  }

}
