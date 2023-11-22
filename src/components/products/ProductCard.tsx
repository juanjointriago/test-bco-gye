import { Card, Image, Text, Button, Group, Flex, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Product } from '../../interfaces/product';

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card padding="lg" radius="md" withBorder
      h={420}
      sx={{
        '&:hover': {
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
        },
      }}
    >

      <Card.Section>
        <Carousel
          maw={'100%'}
          slideSize="100%"
          height={190}
          slideGap="xl"
          loop
          withIndicators
          mt={20}
          mx={'auto'}
        >
          {
            product.image.split(',').map(image => (
              <Carousel.Slide
                key={image}
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
                    src={image}
                    height={190}
                    width="90%"
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
                  />
                </Box>
              </Carousel.Slide>
            ))
          }
        </Carousel>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}
          sx={{ textTransform: 'capitalize' }}
        >{product.description}</Text>
        {/* <Badge color="pink" variant="light">
          {product.discount}%
        </Badge> */}
      </Group>

      <Text size="sm" color="dimmed"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.description}
      </Text>

      <Flex justify={'flex-end'}>
        <Text size="xl" weight={500} mt="md">
          ${product.price}
        </Text>
      </Flex>

      <Link
        to={`/product/${product.id}`}
        style={{
          textDecoration: 'none',
        }}
      >
        <Button variant="subtle" fullWidth radius="md"
          sx={{
            '&:hover': {
              backgroundColor: '#55372B',
              color: '#fff',
              transition: 'all 0.2s ease',
            },
            marginTop: '10px',
          }}
          // href={`/product/${product.id}`}
          size='lg'
        >
          Ver Producto
        </Button>
      </Link>
    </Card>
  );
}