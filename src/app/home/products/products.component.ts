import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { categoryFilter } from 'src/app/filters/category.filter';
import { searchFilter } from 'src/app/filters/search.filter';
import { Product } from 'src/app/models/product.model';
import * as fromApp from '../../store/app.reducer';
import * as ProductsActions from '../store/products.actions'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

products : Product[]

perPage = 9;
currentPage = 1;
pagesToShow = 3;

  constructor(private store : Store<fromApp.AppState>) {  }
  
  ngOnInit(): void {
      this.store.select("products")
      .subscribe(state => {
        const categories = state.productFilter;
        const searchText = state.searchText ;

        // Filter the products by The Selected category
        const filterByProductArr = categoryFilter(state.products, categories);

        // Filter the products by the Search text
        const filterBySearchArr = searchFilter(filterByProductArr, searchText);
  
  
        this.products = filterBySearchArr;
      })
  }

  addToCart(product) {
  this.store.dispatch(new ProductsActions.AddToCart(product) );
  }


  //------- Pagination ------ //

  next() {
    this.currentPage++;
  }

  prev() {
    if (this.currentPage === 1) return;
    this.currentPage--;
  }

  goToPage(loc: number): void {
    this.currentPage = loc;
  }



}
