import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

products : Product[]

  constructor(private store : Store<fromApp.AppState>) {  }
  
  ngOnInit(): void {
      this.store.select("products")
      .subscribe(state => {
        this.products = state.products;
      })
  }



}
