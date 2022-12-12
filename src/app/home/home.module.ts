import { ProductsComponent } from './products/products.component';

import { NgModule } from "@angular/core";
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    HomeRoutingModule,   

  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
