import { createStyles, Container, Group, ActionIcon, rem, Image, Box, MediaQuery } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandTiktok, IconBrandFacebook } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
// import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(50),
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.fn.smallerThan('xs') ? theme.spacing.sm : theme.spacing.xl,
    paddingBottom: theme.fn.smallerThan('xs') ? theme.spacing.sm : theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer} style={{
      position: 'sticky',
      bottom: 0,
      backgroundColor: 'white',
    }}>
      <Container className={classes.inner}>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <a href='https://www.facebook.com/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <ActionIcon size="lg">
              <IconBrandFacebook size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </a>

          <a href='https://twitter.com/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <ActionIcon size="lg">
              <IconBrandTwitter size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </a>

          <a href='https://www.instagram.com/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <ActionIcon size="lg">
              <IconBrandInstagram size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </a>

          <a href='https://www.tiktok.com/' 
            target='_blank'
            rel='noreferrer noopener'
          >
            <ActionIcon size="lg">
              <IconBrandTiktok size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </a>
        </Group>

        <MediaQuery 
          smallerThan='xs'
          styles={{ display: 'none' }}
        >
          <Image src='/imgs/logo.png' height={40} width={30} alt='Test' />
        </MediaQuery>
      </Container>
    </div>
  );
}