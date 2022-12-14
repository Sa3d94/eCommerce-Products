import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import * as fromApp from '../../store/app.reducer';
import * as ProductsActions from '../store/products.actions'
@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {
  categoriesCount;
  categories : string[];
  constructor(private store : Store<fromApp.AppState>) {
    

  }
  ngOnInit(): void {
    this.store.select("products")
    .subscribe(state => {
        this.categories = state.categories;
        const counts = {};
       
        // Counting the Products for every Category
        state.products?.forEach((p : Product) => {
          counts[p.category] = counts[p.category] + 1 || 1;
        });
        counts["All"] = state.products?.length
    
        this.categoriesCount = counts;
    });
   
  }

  onRadioButtonChange(category) {
    if (category == "All") {
      this.store.dispatch(new ProductsActions.ClearSearch());
      this.store.dispatch(new ProductsActions.ClearProductFilter());

    } else {
      this.store.dispatch(new ProductsActions.AddProductFilter(category));

    }
    
  }

}