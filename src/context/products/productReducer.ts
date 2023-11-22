import { Product } from "../../interfaces/product";
import { ProductState } from "./ProductProvider";


type ProductActionType =
    | { type: '[Products] - Start Load' }
    | { type: '[Products] - Load Success', payload: Product[] }
    | { type: '[Products] - Error', payload: string }
    | { type: '[Products] - Set Status Delete', payload: boolean }
    | { type: '[Products] - Delete', payload: number }



    export const ProductReducer = (state: ProductState, action: ProductActionType) =>{
        switch (action.type) {
            case '[Products] - Error':
              return {
                ...state,
                errorMsg: action.payload,
              };
        
            case '[Products] - Start Load':
              return {
                ...state,
                isLoadingProducts: true,
              };
        
            case '[Products] - Load Success':
              return {
                ...state,
                isLoadingProducts: false,
                products: action.payload,
                errorMsg: null
              };
        
            case '[Products] - Set Status Delete':
              return {
                ...state,
                isDeleting: action.payload,
              };
        
            case '[Products] - Delete':
              return {
                ...state,
                products: state.products.filter((product) => product.id !== action.payload),
                isDeleting: false,
              };
        
            default:
              return state;
          }
    }