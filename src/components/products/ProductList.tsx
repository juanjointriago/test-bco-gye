import { useContext, useEffect, useState } from 'react';
import { Flex, Grid, Loader, Select } from "@mantine/core";
import { ProductCard } from "./ProductCard";
import { ProductContext } from '../../context/products/ProductContext';
import { Product } from '../../interfaces/product';


export const ProductList = () => {
  const { getAllProducts, products, isLoadingProducts, errorMsg } = useContext(ProductContext);
  const [productData, setProductData] = useState([] as Product[]);

  useEffect(() => {
    getAllProducts();
  }, []);


  if (errorMsg) return (
    <Flex
      justify="center"
      align="center"
      mih={'40vh'}
    >
      <p>{errorMsg}</p>
    </Flex>
  );

  return (
    <>


      <Grid justify="space-evenly">
        {
          isLoadingProducts
            ? (
              <Flex
                justify="center"
                align="center"
                mih={'40vh'}
              >
                <Loader
                  size={'xl'}
                />
              </Flex>
            )
            :
              productData.map((product) => (
                <Grid.Col key={product.id} sm={5} lg={4}>
                  <ProductCard
                    product={product}
                  />
                </Grid.Col>
              ))
        }
      </Grid>
    </>
  )
};

