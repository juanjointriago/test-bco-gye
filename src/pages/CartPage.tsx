import { useContext, useState } from 'react';
import { Box, Button, Flex, Grid, Loader, Text } from "@mantine/core";
import { IconShoppingCartX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { Carousel } from "@mantine/carousel";
import { CartContext } from '../context/cart/CartContext';
import { IProductResponse } from '../interfaces/product';
import { useFetch } from '../hooks';
import { AuthContext } from '../context/auth/AuthContext';
import { ServerError } from './ServerError';
import { ICreateOrder } from '../interfaces/orders';
import { testAPI } from '../api';
import { CartItem } from '../components/cart';
import { ProductCard } from '../components/products';

export const CartPage = () => {
  const { cart, totalCartProducts, tax, subTotal, total, valueAddedTax, clearCart } = useContext(CartContext);
  const { isLoading: isLoadingProducts, data, error } = useFetch<IProductResponse>('/products');
  const { user, isLogged } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  if (error) return <ServerError />;

  const handleConfirmOrder = async () => {
    if (!isLogged) return nav('/auth/login');

    setIsLoading(true);
    try {
      const body: ICreateOrder = {
        userId: user!.user.id,
        status: 'pending',
        tax: tax * 100,
        subtotal: subTotal,
        discount: 0,
        total,
        notes: '',
        isActive: 1,
        details: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          discount: 0,
          subtotal: item.price * item.quantity,
          unitPrice: item.price
        }))
      };
      const { data } = await testAPI.post('/orders', body);
      clearCart();
      toast.success(data.msg || 'Orden creada con éxito');
      nav('/myorders');

    } catch (error) {
      console.error(error);
      toast.error((error as any).response?.data.msg || 'Error desconocido, por favor intente más tarde');
    }
    setIsLoading(false);
  }

  return (
    <>
      <Box mih={cart.length < 3 ? '20vh' : 'auto'}
        sx={(theme) => ({
          height: 'auto',
          margin: '0 auto',
          marginBottom: '4rem',
          [theme.fn.smallerThan('md')]: {
            width: '80%',
          },
          [theme.fn.smallerThan('sm')]: {
            width: '100%',
          }
        })}
      >
        {
          cart.length ? (
            <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
              <Grid.Col span={12} md={6}>
                <h2>Carrito</h2>
                <Box
                  sx={(theme) => ({
                    height: cart.length < 3 ? 'auto' : '50vh',
                    overflowY: 'auto',
                    padding: '1rem',
                    [theme.fn.smallerThan('md')]: {
                      display: 'none',
                    }
                  })}
                >
                  {
                    cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                      />
                    ))
                  }
                </Box>

                <Carousel
                  loop
                  mx="auto"
                  slideGap="sm"
                  orientation="horizontal"
                  withIndicators
                >
                  {
                    cart.map((item) => (
                      <Carousel.Slide key={item.id}

                      >
                        <CartItem item={item} />
                      </Carousel.Slide>
                    ))
                  }
                </Carousel>

              </Grid.Col>

              <Grid.Col span={12} md={6}>
                <h2>Confirmar Orden</h2>

                <Box
                  sx={{
                    border: '2px solid #83583C',
                    padding: '1rem',
                    borderRadius: '5px',
                  }}
                >
                  <Flex
                    justify={'space-between'}
                  >
                    <Box>
                      <Text size={'1.2rem'} weight={600} mt={10}>No. de productos:</Text>
                      <Text size={'1.2rem'} weight={600} mt={10}>SubTotal:</Text>
                      <Text size={'1.2rem'} weight={600} mt={10}>Impuestos (12%):</Text>
                      <Text mt={100} weight={'bold'} size={'1.5rem'}>Total:</Text>
                    </Box>

                    <Box>
                      <Text size={'1.2rem'} weight={600} align="right" mt={10}>{totalCartProducts}</Text>
                      <Text size={'1.2rem'} weight={600} align="right" mt={10}>$ {subTotal.toFixed(2)}</Text>
                      <Text size={'1.2rem'} weight={600} align="right" mt={10}>$ {valueAddedTax.toFixed(2)}</Text>
                      <Text align="right" mt={100} weight={'bold'} size={'1.5rem'}>$ {total.toFixed(2)}</Text>
                    </Box>
                  </Flex>

                  <Button
                    sx={{
                      marginTop: '1rem',
                      width: '100%',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      backgroundColor: '#83583C',
                      ':hover': {
                        backgroundColor: '#55372B'
                      }
                    }}
                    size="lg"
                    loading={isLoading}
                    onClick={handleConfirmOrder}
                  >
                    Confirmar Orden
                  </Button>
                </Box>
              </Grid.Col>
            </Grid>
          )
            :
            (
              <Flex
                justify={'center'}
                align={'center'}
                direction={'column'}
                gap={40}
              >
                <Flex
                  justify={'center'}
                  align={'center'}
                >
                  <Text
                    sx={{
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >Carrito Vacío</Text>


                  <IconShoppingCartX
                    size={40}
                    color="rgba(0, 0, 0, 0.5)"
                  />
                </Flex>

                <Link to={'/products'}>
                  <Button
                    sx={{
                      // fontSize: '1.2rem',
                      fontWeight: 700,
                    }}
                    size="lg"
                  >
                    Ir a la tienda
                  </Button>
                </Link>
              </Flex>
            )
        }
      </Box>

      {
        !!cart.length && (
          <>
            <h2>Productos Sugeridos</h2>
            <Grid
              sx={{
                justifyContent: 'center',
              }}
            >
              {
                isLoadingProducts ? (
                  <Loader
                    size="xl"
                    style={{
                      margin: '2rem auto',
                    }}
                  />
                )
                  :
                  data!.data.filter((product) => {
                    const cartIds = cart.map((item) => item.id);
                    return !cartIds.includes(product.id);
                  }).slice(0, 3).map((product) => (
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
      }
    </>
  )
};
