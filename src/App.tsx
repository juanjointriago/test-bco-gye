import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/auth/AuthProvider";
import { ProductProvider } from "./context/products/ProductProvider";
import { CartProvider } from "./context/cart/CartProvider";
import { Router } from "./routes/Router";
import { theme } from "./theme";



export const App = () => {
  return (
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={theme}
    >
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Router/>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </MantineProvider>
  )
}
