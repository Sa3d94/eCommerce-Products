import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent  implements OnInit{
  isLoading = false;
  constructor(private store: Store<fromApp.AppState>) {

  }
  ngOnInit(): void {

    this.store.select("auth").subscribe(state => {

      this.isLoading = state.loading;


  })

  this.store.select("products").subscribe(state => {

      this.isLoading = state.loading;

    
  })
  }

}
