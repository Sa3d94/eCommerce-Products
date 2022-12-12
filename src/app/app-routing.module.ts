import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [

  { path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {path: '',  pathMatch: 'full', redirectTo: '/home'},

  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
