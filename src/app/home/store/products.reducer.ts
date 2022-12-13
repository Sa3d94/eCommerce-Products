import { Product } from "src/app/models/product.model"
import * as ProductsActions from './products.actions';


const initialState: State = {
    products: null,
    categories : null,
    productFilter : null,
    searchText: null,
    cartItems : 0
  };
  
  export interface State {
    products: Product[];
    categories : string[];
    productFilter : string;
    searchText: string;
    cartItems : number;
  }
  export function ProductsReducer(
    state  = initialState,
    action: ProductsActions.ProductsActions
  ) {
    switch (action.type) {
        case ProductsActions.SET_PRODUCTS:
            // Retrieve the categories from The products array
            const categories = [...new Set(action.payload.map(s => s.category))] ;
          return {
            ...state,
            products : action.payload,
            categories : categories
          };

        case ProductsActions.ADD_PRODUCT_FILTER :
            return {
                ...state,
                productFilter : action.payload
            } 

         case ProductsActions.CLEAR_PRODUCT_FILTER :
            return {
                ...state,
                productFilter : null
            } 

        case ProductsActions.SEARCH_PRODUCTS :
            return {
                ...state,
                searchText : action.payload
            }
         case ProductsActions.CLEAR_SEARCH :
           return {
                ...state,
                searchText : null
             }
             
        case ProductsActions.ADD_TO_CART :
            // If there are no available items, then don't change the state
            if (action.payload.stock == 0 ) {
                return state;
            }

            //Get The Product From The State
            //We can't directly change the object in the state
            const product = state.products.find(s => s.id == action.payload.id);

            //Decrement the Number of Available items in Stock
            action.payload.stock--;

            // Update the Product
            const updatedProduct = {
                ...product,
                ...action.payload,
            };
            const updatedProducts = [...state.products];
        
            let productToBeUpdated = updatedProducts.find(s => s.id == action.payload.id); 
            // Assigning the value since it's Object Refrenced
            productToBeUpdated =  updatedProduct;

            return {
                ...state,
                products : updatedProducts,
                cartItems : state.cartItems++
               } 

          default:
            return state;
            }
  }