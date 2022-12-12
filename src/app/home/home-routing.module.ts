import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';



const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate : [AuthGuard]
    
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
