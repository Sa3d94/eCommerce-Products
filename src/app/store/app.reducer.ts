import * as fromAuth from "../auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store";
import * as fromProducts from '../home/store/products.reducer';

export interface AppState {
  auth: fromAuth.State;
  products: fromProducts.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth : fromAuth.AuthReducer,
  products: fromProducts.ProductsReducer,
};
