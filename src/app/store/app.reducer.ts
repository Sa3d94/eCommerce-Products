// import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  auth: fromAuth.State;
  // products: fromproducts.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth : fromAuth.AuthReducer
  // products: fromproducts.productsReducer,
};
