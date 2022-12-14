import { CommonModule } from '@angular/common';

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CoreModule } from '../core/core.module';
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    
    AuthRoutingModule,
    FormsModule,
 
    CommonModule,
  
    

  ],
  providers: [AuthService],
  bootstrap: []
})
export class AuthModule { }
