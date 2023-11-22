import { Text } from "@mantine/core";
import { ProductList } from "../components/products";

export const ProductsPage = () => {

    return (
        <>
            <Text
                weight={700}
                mb={20}
                sx={{ fontSize: '2rem' }}
            >Nuestros Productos</Text>
            <ProductList/>
        </>
    );
}
