import { createContext } from "react";
import { Product } from "../../interfaces/product";

interface ProductContextProps {
  products: Product[];
  isLoadingProducts: boolean;
  isDeleting: boolean;
  errorMsg: string | null;
  getAllProducts: () => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  // getProductById: (id: string) => Promise<void>;
}

export const ProductContext = createContext({} as ProductContextProps);
