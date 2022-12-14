import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';

import { NgModule } from "@angular/core";
import { HomeRoutingModule } from './home-routing.module';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { HomeComponent } from './home.component';
import { PaginationModule } from '../pagination/pagination.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsFilterComponent,
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    PaginationModule,
   

  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
