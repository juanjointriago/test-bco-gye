import { Carousel } from "@mantine/carousel";
import { Box, Button, Flex, Grid, Image, Loader, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import Autoplay from 'embla-carousel-autoplay'
import { IProductResponse } from "../interfaces/product";
import { useFetch } from "../hooks";
import { ProductCard } from "../components/products";
import { ServerError } from "./ServerError";


export const HomePage = () => {
  const { isLoading, data, error } = useFetch<IProductResponse>('/products?limit=5');
  const theme = useMantineTheme();
  const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const nav = useNavigate();

  if (error) return <ServerError />;


  return (
    <div>
      <h1>Bienvenido a Ali clone</h1>

      <Carousel
        maw={mobile ? '100%' : '80%'}
        slideSize="100%"
        height={mobile ? 300 : 400}
        slideGap="xl"
        loop
        withIndicators
        mt={50}
        mx={'auto'}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {
          data?.data.map(({ id, image }) => (
            <Carousel.Slide
              key={id}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}

              >
                <Image
                  fit="cover"
                  src={image.split(',')[0]}
                  height={mobile ? 300 : 400}
                  width="80%"
                  radius="md"
                  alt="Image"
                  styles={{
                    image: {
                      margin: '0 auto'
                    }
                  }}
                  sx={{
                    ':hover': {
                      cursor: 'pointer',
                    }
                  }}
                  onClick={() => nav(`/product/${id}`)}
                />
              </Box>
            </Carousel.Slide>
          ))
        }
      </Carousel>

      <Flex
        mt={100}
        direction={tablet ? 'column' : 'row'}
        align={tablet ? 'center' : 'flex-start'}
        w="100%"
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            fit="cover"
            src='/imgs/nuestraHistoria.jpeg'
            height={mobile ? 300 : 400}
            width="90%"
            radius="md"
            alt="Image"
            styles={{
              image: {
                margin: '0 auto'
              }
            }}
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            height: '70%',
          }}
        >
          <h2
            style={{
              marginTop: mobile ? '2rem' : '0',
              marginBottom: mobile ? '.5rem' : '0',
              fontSize: '2rem',
            }}
          >Nuestra Historia</h2>
          <Text
            size="lg"
            style={{
              textAlign: 'justify',
              padding: '1rem',
            }}
          >
            Lorem Ipsum
          </Text>
        </Box>
      </Flex>

      <Flex
        mt={100}
        direction={tablet ? 'column' : 'row'}
        align={tablet ? 'center' : 'flex-start'}
        w="100%"
      >
        <Box
          sx={{
            width: '100%',
            height: '70%',
            order: tablet ? 2 : 0,
          }}
        >
          <h2
            style={{
              marginTop: mobile ? '2rem' : '0',
              marginBottom: mobile ? '.5rem' : '0',
              fontSize: '2rem',
            }}
          >Nuestra Solución</h2>
          <Text
            size="lg"
            style={{
              textAlign: 'justify',
              padding: '1rem',
            }}
          >
            Lorem
          </Text>
        </Box>

        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            fit="cover"
            src='/imgs/nuestraSolucion.jpeg'
            height={mobile ? 300 : 400}
            width="90%"
            radius="md"
            alt="Image"
            styles={{
              image: {
                margin: '0 auto'
              }
            }}
          />
        </Box>
      </Flex>


      <Flex
        mt={100}
        direction={tablet ? 'column' : 'row'}
        align={tablet ? 'center' : 'center'}
        justify={tablet ? 'center' : 'space-between'}
      >
        <h2
          style={{
            fontSize: '2rem',
          }}
        >Últimos Productos</h2>

        <Link to={`/products`}>
          <Button
            variant="link"
            sx={{
              marginLeft: 'auto',
              marginRight: '1rem',
              ":hover": {
                textDecoration: 'underline',
              }
            }}
          >
            Ver más &rarr;
          </Button>
        </Link>
      </Flex>

      <Grid
        sx={{
          justifyContent: 'center',
        }}
      >
        {
          isLoading ? (
            <Loader
              size="xl"
              style={{
                margin: '2rem auto',
              }}
            />
          )
            :
            data?.data.map((product, index) => {
              if (index > 2) return null;
              return (
                <Grid.Col key={product.id} sm={5} lg={4}>
                  <ProductCard
                    product={product}
                  />
                </Grid.Col>
              )
            })
        }
      </Grid>
    </div>
  )
};
