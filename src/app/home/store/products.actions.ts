import { Action } from "@ngrx/store";
import { Product } from "src/app/models/product.model";
export const GET_PRODUCTS_START = "[Products] Get Products Start";
export const SET_PRODUCTS = "[Products] Set Products";
export const GET_PRODUCTS_FAILED = "[Products] Get Products Failed";

// export const SET_CATEGORIES = "[Products] Set Categories";

export const ADD_PRODUCT_FILTER = "[Products] Add Product Filter";
export const CLEAR_PRODUCT_FILTER = "[Products] Clear Product Filter";

export const SEARCH_PRODUCTS = "[Products] Search Products";
export const CLEAR_SEARCH = "[Products] Clear Search";

export const CLEAR_ERROR = "[Products] Clear Error";

export const ADD_TO_CART = "[Products] Add To Cart";

export class GetProductsStart implements Action {
  readonly type = GET_PRODUCTS_START;
}

export class SetProducts implements Action {
    readonly type = SET_PRODUCTS;
    constructor(public payload: Product[]) {}
  }
  export class GetProductsFailed implements Action {
    readonly type = GET_PRODUCTS_FAILED;
    constructor(public payload: string) {}
  }
  export class AddProductFilter implements Action {
    readonly type = ADD_PRODUCT_FILTER;
    constructor(public payload: string) {}

  }
  export class ClearProductFilter implements Action {
    readonly type = CLEAR_PRODUCT_FILTER;
  }
  export class SearchProducts implements Action {
    readonly type = SEARCH_PRODUCTS;
    constructor(public payload: string) {}

  }
 
  export class ClearSearch implements Action {
    readonly type = CLEAR_SEARCH;
  }
  export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
  }
  export class AddToCart implements Action {
    readonly type = ADD_TO_CART;
    constructor(public payload: Product) {}

  }

  export type ProductsActions =
  | GetProductsStart
  | SetProducts
  | GetProductsFailed
  | AddProductFilter
  | ClearProductFilter
  | SearchProducts
  | ClearError
  | ClearSearch
  | AddToCart