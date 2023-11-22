import { ICartItem } from '../../interfaces/cart';
import { CartState } from './CartProvider';

type CartActionType =
  | { type: '[Cart] - LoadCart storage', payload: ICartItem[] }
  | { type: '[Update - Cart Product]', payload: ICartItem[] }
  | { type: '[Remove - Cart Product]', payload: ICartItem[] }
  | { type: '[Clear - Cart Product]' }

export const CartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case '[Update - Cart Product]':
      const subTotal = action.payload.reduce((acc, { quantity, price }) => (quantity * Number(price)) + acc, 0);
      const valueAddedTax = action.payload.reduce((acc, { quantity, price }) => ((quantity * Number(price)) * 0.12) + acc, 0);

      return {
        ...state,
        cart: [...action.payload],
        totalCartProducts: action.payload.reduce((acc, { quantity }) => quantity + acc, 0),
        subTotal,
        valueAddedTax,
        total: valueAddedTax + subTotal
      }

    // case '[Remove - Cart Product]':
    //   return {
    //     ...state,
    //     cart: [...action.payload],
    //     totalCartProducts: action.payload.reduce((acc, { quantity }) => quantity + acc, 0)
    //   }
    
    case '[Clear - Cart Product]':
      return {
        ...state,
        cart: []
      }

    default:
      return state;
  }
};
