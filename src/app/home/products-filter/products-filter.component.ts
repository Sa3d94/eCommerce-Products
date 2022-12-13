import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {
  productsCount;
  products = ["Smart Phones" , "Laptops" , "Smart Watches"];
  constructor() {
    

  }
  ngOnInit(): void {
    const counts = {};
    this.products.forEach(p => {
      counts[p] = counts[p] + 1 || 1;
    });
    this.productsCount = counts;
  }

  onRadioButtonChange(event) {

  }

}