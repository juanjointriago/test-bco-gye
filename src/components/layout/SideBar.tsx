import { FC, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Box, Divider, Drawer, Flex, Space, Text } from "@mantine/core";
import { IconShoppingCart, IconHome, IconUser, IconCertificate, IconBuildingStore, IconUsersGroup, IconChartBar, IconListDetails, IconLogout, IconPackage, IconChartLine, IconListSearch, IconGenderMale, IconGenderFemale } from '@tabler/icons-react';
import { SidebarItem } from "./SidebarItem";
import { AuthContext } from "../../context/auth/AuthContext";

const items = [
  { label: 'Inicio', url: '/', Icon: IconHome },
  { label: 'Productos', url: '/products', Icon: IconBuildingStore },
  { label: 'Hombre', url: '/products/man', Icon: IconGenderMale },
  { label: 'Mujer', url: '/products/women', Icon: IconGenderFemale },
  { label: 'Carrito', url: '/cart', Icon: IconShoppingCart },
  { label: 'Mis Pedidos', url: '/myorders', Icon: IconPackage },
];

const adminItems = [
  // { label: 'Panel', url: '/admin/dashboard', Icon: IconChartLine },
  { label: 'Productos', url: '/admin/products', Icon: IconListSearch },
  { label: 'Pedidos', url: '/admin/orders', Icon: IconListDetails },
  { label: 'Usuarios', url: '/admin/users', Icon: IconUsersGroup },
]

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const SideBar: FC<Props> = ({ opened, onClose }) => {
  const { isLogged, logout, user } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    onClose();
  }, [pathname]);
  
  return (
    <Drawer opened={opened} onClose={onClose} title="Menu" position="right" size={'xs'}
      styles={{
        title: {
          fontSize: '1.4rem',
          color: 'black',
          fontWeight: 'bold',
        },
        body: {
          paddingRight: 0,
          paddingLeft: 0,
          height: '100%',
        }
      }}
    >
      {/* Drawer content */}

      <Flex direction={'column'} style={{ paddingTop: 20 }} justify={'space-between'} h={'95%'}>
        <Box>
          {
            items.map(({ label, url, Icon }) => (
              <SidebarItem
                key={url}
                label={label}
                url={url}
                Icon={Icon}
              />
            ))
          }

          {
            isLogged && ((user!.user.role === 'Admin') || (user?.user.role as any) === 1) && (
              <>
                <Divider my="sm" />

                <Text
                  style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.5)' }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginLeft: 20,
                    cursor: 'default'
                  }}
                >
                  <IconCertificate />
                  Admin
                </Text>

                <Space h="sm" />

                {
                  adminItems.map(({ label, url, Icon }) => (
                    <SidebarItem
                      key={url}
                      label={label}
                      url={url}
                      Icon={Icon}
                    />
                  ))
                }
              </>
            )
          }
        </Box>

        {
          !isLogged ? (
            <SidebarItem
              label="Iniciar sesión"
              url="/auth/login"
              Icon={IconUser}
            />
          )
            :
            (
              <SidebarItem
                label="Cerrar sesión"
                url=""
                Icon={IconLogout}
                onClick={logout}
              />
            )
        }
      </Flex>
    </Drawer>
  )
};
