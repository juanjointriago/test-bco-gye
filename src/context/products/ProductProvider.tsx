import { FC, ReactNode, useReducer } from 'react'
import { testAPI } from '../../api';
import axios from 'axios';
import { ProductReducer } from './productReducer';
import { toast } from "sonner";
import { ProductContext } from './ProductContext';
import { IProductResponse, Product } from '../../interfaces/product';


export interface ProductState {
    products: Product[];
    isLoadingProducts: boolean;
    errorMsg: string | null;
    isDeleting: boolean;
}
const INITIAL_STATE: ProductState = {
    products: [],
    isLoadingProducts: false,
    errorMsg: null,
    isDeleting: false,
};


export const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE);

    const getAllProducts = async () => {
        dispatch({ type: '[Products] - Start Load' });
        try {
            const { data } = await testAPI.get<IProductResponse>('/products');
            console.log({ data })
            dispatch({ type: '[Products] - Load Success', payload: data.data });
        } catch (error) {
            console.error(error)
            if (axios.isAxiosError<IProductResponse>(error)) {
                dispatch({
                    type: '[Products] - Error',
                    payload: error.response?.data.mensajeRetorno || 'Error desconocido, por favor intente más tarde',
                });
            }
        }
    }

    const deleteProduct = async (id: number) => {
        dispatch({ type: '[Products] - Set Status Delete', payload: true });
        try {
            const { data } = await testAPI.delete(`/products/${id}`);

            dispatch({ type: '[Products] - Delete', payload: id });

            toast.success(data.msg);
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError<IProductResponse>(error)) {
                toast.error(error.response?.data.mensajeRetorno || 'Error desconocido, por favor intente más tarde');
            }

            dispatch({ type: '[Products] - Set Status Delete', payload: false });
        }
    };

    return (
        <ProductContext.Provider
            value={{
                ...state,

                // Methods
                getAllProducts,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
