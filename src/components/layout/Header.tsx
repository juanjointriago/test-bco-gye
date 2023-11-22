import {
  createStyles,
  Menu,
  Center,
  Header as HeaderMantine,
  Container,
  Group,
  Burger,
  rem,
  Image,
  ThemeIcon,
  useMantineTheme,
  Flex,
  Indicator,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconShoppingCart } from '@tabler/icons-react';
import { SideBar } from './SideBar';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
// import { IconChevronDown } from '@tabler/icons-react';
// import { MantineLogo } from '@mantine/ds';

const HEADER_HEIGHT = rem(70);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    '&:hover': {
      // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      backgroundColor: theme.colors.brand[7],
      color: 'white',
      transition: 'all 0.2s ease',
    },
  },

  linkActive: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    backgroundColor: theme.colors.brand[7],
    color: 'white',
    // '&:hover': {
    //   color: 'white',
    //   transition: 'all 0.2s ease',
    // },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderActionProps {
  links?: { link: string; label: string; links?: { link: string; label: string }[] }[];
}

export function Header({ links }: HeaderActionProps) {
  const { totalCartProducts } = useContext(CartContext);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links?.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                {/* <IconChevronDown size={rem(12)} stroke={1.5} /> */}
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <NavLink
        key={link.label}
        to={link.link}
        // className={classes.link}
        className={({ isActive }) => {
          if (isActive) {
            return `${classes.link} ${classes.linkActive}`;
          }
          return classes.link;
        }}
        end
      >
        {link.label}
      </NavLink>
    );
  });

  return (
    <Flex
      style={{
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        display: 'block',
        height: HEADER_HEIGHT,
        zIndex: 100,
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
      }}
      mb={'2rem'}
      pb={'2rem'}
    >
      <Container size={'xl'} sx={{ paddingBottom: '2rem' }}>
        <HeaderMantine height={HEADER_HEIGHT} pb={'2rem'}>
          <Container className={classes.inner} fluid>
            <Link to={'/'}>
              <Group>
                {/* <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" /> */}
                {/* <MantineLogo size={28} /> */}
                <Image src='/imgs/logo.png' height={50} alt='Test' />
              </Group>
            </Link>
            <Group spacing={5} className={classes.links}>
              {items}
            </Group>
            {/* <Button radius="xl" h={30}>
              Get early access
            </Button> */}
            {/* <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" /> */}


            <Group spacing={20}>
              <Link to={'/cart'}>
                <Indicator inline size={22} label={<Text sx={{
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                }} color='white'>{totalCartProducts > 9 ? '+9' : totalCartProducts}</Text>} offset={2} position='bottom-start' sx={{
                  cursor: 'pointer'
                }}>
                  <ThemeIcon size="lg" variant="outline" sx={{ border: 'none' }}>
                    <IconShoppingCart size={'1.8rem'} />
                  </ThemeIcon>
                </Indicator>
              </Link>
              
              <Burger opened={opened} onClick={toggle}
                color={theme.other.colors.primary}
                size="sm"
              />
            </Group>
          </Container>
        </HeaderMantine>

        <SideBar
          opened={opened}
          onClose={close}
        />
      </Container>
    </Flex>
  );
}