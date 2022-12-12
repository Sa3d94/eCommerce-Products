import { NotFoundComponent } from './../core/not-found/not-found.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate : [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
