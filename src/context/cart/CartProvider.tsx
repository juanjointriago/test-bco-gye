import { FC, ReactNode, useEffect, useReducer } from "react";
import { ICartItem } from "../../interfaces/cart";
import { CartContext } from "./CartContext";
import { CartReducer } from "./CartReducer";
import { useLocalStorage } from "@mantine/hooks";

export interface CartState {
    cart: ICartItem[];
    totalCartProducts: number;
    isLoaded: boolean;
    numberOfItems: number;
    subTotal: number;
    tax: number;
    valueAddedTax: number;
    total: number;
}

const INITIAL_STATE: CartState = {
    cart: [],
    totalCartProducts: 0,
    isLoaded: false,
    numberOfItems: 0,
    subTotal: 0,
    tax: 12 / 100,
    valueAddedTax: 0,
    total: 0,
};

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
    const [value, setValue] = useLocalStorage({ key: 'cart', defaultValue: '[]' });

    useEffect(() => {
        try {
            const localStorageProducts = JSON.parse(value);
            dispatch({ type: '[Update - Cart Product]', payload: localStorageProducts });
        } catch (error) {
            dispatch({ type: '[Update - Cart Product]', payload: [] });
        }
    }, [value]);

    const addToCart = (item: ICartItem) => {
        const productInCart = state.cart.some((p:any) => p.id === item.id);
        if (!productInCart) {
            // Update local storage
            setValue(JSON.stringify([...state.cart, item]));

            dispatch({ type: '[Update - Cart Product]', payload: [...state.cart, item] });
            return;
        }

        const updatedCart = state.cart.map((p:any) => p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p);

        // Update local storage
        setValue(JSON.stringify(updatedCart));

        dispatch({ type: '[Update - Cart Product]', payload: updatedCart });
    };

    const updateQuantity = (item: ICartItem) => {
        const updatedCart = state.cart.map((p:any) => p.id === item.id ? { ...p, quantity: item.quantity } : p);

        // Update local storage
        setValue(JSON.stringify(updatedCart));

        dispatch({ type: '[Update - Cart Product]', payload: updatedCart });
    }

    const removeFromCart = (id: number) => {
        const updatedCart = state.cart.filter((p:any) => p.id !== id);

        // Update local storage
        setValue(JSON.stringify(updatedCart));

        dispatch({ type: '[Update - Cart Product]', payload: updatedCart });
    };

    const clearCart = () => {
        dispatch({ type: '[Clear - Cart Product]' });

        // Update local storage
        setValue(JSON.stringify([]));
    };

    return (
        <CartContext.Provider
            value={{
                ...state,

                // Methods
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
};