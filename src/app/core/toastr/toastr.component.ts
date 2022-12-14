import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit{
  errorMessage : any;

  constructor(private store: Store<fromApp.AppState>) {

  }
  ngOnInit(): void {
    this.store.select("auth").subscribe(state => {

        this.errorMessage = state.authError;


    })

    this.store.select("products").subscribe(state => {
  
        this.errorMessage = state.errorMessage;

      
    })
    }
}
