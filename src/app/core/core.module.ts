import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {RouterModule} from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from '../auth/services/auth.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToastrComponent } from './toastr/toastr.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotFoundComponent, SpinnerComponent, ToastrComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent, FooterComponent,NotFoundComponent,SpinnerComponent, ToastrComponent
  ],
  providers : [AuthService]
})
export class CoreModule { }
