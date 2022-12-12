import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {RouterModule} from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from '../auth/services/auth.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent, FooterComponent,NotFoundComponent
  ],
  providers : [AuthService]
})
export class CoreModule { }
