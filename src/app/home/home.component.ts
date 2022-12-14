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

  constructor(private _productsService : ProductsService 
    , private store : Store<fromApp.AppState> ) {
    
  }
  ngOnInit(): void {
     this._productsService.GetProducts();

     this.store.select("products")
     .subscribe(state => {
       this.productFilter = state.productFilter;
       this.searchText = state.searchText;
     })
  }

}
