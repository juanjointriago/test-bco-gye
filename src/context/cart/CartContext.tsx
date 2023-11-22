import { createContext } from "react";
import { ICartItem } from "../../interfaces/cart";

interface CartContextProps {
  cart: ICartItem[];
  totalCartProducts: number;
  // isLoaded: boolean,
  // numberOfItems: number;
  subTotal: number;
  tax: number;
  valueAddedTax: number;
  total: number;
  addToCart: (item: ICartItem) => void;
  updateQuantity: (item: ICartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>( {} as CartContextProps );
