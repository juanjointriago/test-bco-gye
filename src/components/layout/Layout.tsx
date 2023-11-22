import { Container } from "@mantine/core";
import { FC } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";


export const Layout: FC = () => {
  return (
    <>
      <Header 
        links={[
          {
            label: 'Todos los productos',
            link: '/products',
          }
        ]}
      />

      <Container size={'lg'} mih={'80vh'}>
        <Outlet />
      </Container>

      <Footer />
    </>
  )
};
