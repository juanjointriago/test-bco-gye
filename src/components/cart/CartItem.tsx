import { FC, useContext, useEffect } from "react";
import { Card, Box, Flex, Button, ThemeIcon, Image, Text, useMantineTheme } from "@mantine/core";
import { useCounter, useMediaQuery } from "@mantine/hooks";
import { IconSquareMinus, IconSquarePlus, IconTrash } from "@tabler/icons-react";
import { CartContext } from "../../context/cart/CartContext";
import { ICartItem } from "../../interfaces/cart";

interface Props {
  item: ICartItem
}

export const CartItem: FC<Props> = ({ item }) => {
  const theme = useMantineTheme();
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const [count, handlers] = useCounter(item.quantity, { min: 0 });

  useEffect(() => {
    updateQuantity({ ...item, quantity: count });
  }, [count]);


  return (
    <Card
      key={item.id}
      sx={(theme) => ({
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        [theme.fn.smallerThan('md')]: {
          height: '25rem',
          flexDirection: 'column',
        }
      })}
    >

      <Card.Section
        sx={(theme) => ({
          display: 'none',
          [theme.fn.smallerThan('md')]: {
            display: 'block'
          }
        })}
      >
        <Image
          src={item.image}
          // width={200}
          height={tablet ? 200 : 150}
          sx={(theme) => ({
            [theme.fn.smallerThan('md')]: {
              width: '100%',
              height: '100%',
            }
            // objectFit: 'contain',
          })}
          alt="Norway"
        />
      </Card.Section>

      <Image
        src={item.image.split(',')[0]}
        alt={item.name}
        radius={10}
        width={150}
        height={150}
        sx={(theme) => ({
          [theme.fn.smallerThan('md')]: {
            display: 'none'
          }
        })}
      />

      <Box>
        <Text
          component="h3"
          style={{
            margin: 0,
            fontSize: '1.3rem',
          }}
        >{item.name}</Text>

        <Box
          mt={15}
        >
          <Text
            sx={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#b7874c',
              marginBottom: '1rem',
            }}
          >Cantidad:</Text>
          <Flex sx={{ gap: '1rem', alignItems: 'center', marginLeft: '2rem' }}>
            <Button variant="outline" sx={{
              border: 'none',
              padding: 0,
              height: 'fit-content',
            }}
              onClick={() => {
                if (count === 1) return removeFromCart(item.id);
                handlers.decrement();
              }}
            >
              <ThemeIcon variant="outline" sx={{
                border: 'none', cursor: 'pointer', ":hover": {
                  backgroundColor: 'rgba(183, 135, 76, 0.2)'
                }
              }}>
                <IconSquareMinus />
              </ThemeIcon>
            </Button>

            <Text>{count}</Text>

            <Button variant="outline" sx={{
              border: 'none',
              padding: 0,
              height: 'fit-content',
            }}
              onClick={handlers.increment}
            >
              <IconSquarePlus />
            </Button>
          </Flex>
        </Box>

        <Text
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#b7874c',
            marginBottom: '1rem',
            position: 'absolute',
            bottom: 5,
            right: 20,
          }}
        >${Number(item.price) * count}</Text>


        <Button variant="outline" sx={{
          border: 'none',
          padding: 0,
          height: 'fit-content',
          position: 'absolute',
          top: 10,
          right: 20,
        }}
          onClick={() => removeFromCart(item.id)}
        >
          <ThemeIcon variant="outline" sx={{
            border: 'none', cursor: 'pointer', ":hover": {
              backgroundColor: 'rgba(183, 135, 76, 0.2)'
            }
          }}>
            <IconTrash />
          </ThemeIcon>
        </Button>
      </Box>
    </Card>
  )
};
