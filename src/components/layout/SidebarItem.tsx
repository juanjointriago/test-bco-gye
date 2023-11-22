import { Flex } from "@mantine/core";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  label: string;
  url: string;
  Icon: any;
  onClick?: () => void;
}

export const SidebarItem: FC<Props> = ({ Icon, label, url, onClick }) => {
  return (
    <NavLink to={url} key={url}
      style={{ textDecoration: 'none', color: 'primary' }}
      onClick={e => {
        if(onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <Flex
        justify={'flex-start'}
        align={'center'}
        style={{ width: '100%' }}
        gap={20}
        sx={(theme) => ({
          ":hover": {
            backgroundColor: 'rgba(183, 135, 76, 0.2)',
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
          },
          padding: '10px 30px',
          borderRadius: '5px',
          marginBottom: '10px',
          color: theme.other.colors.primary,
        })}
      >
        <Icon size={'2rem'} />

        <span style={{ marginLeft: 10, fontSize: '1.5rem' }}>{label}</span>
      </Flex>
    </NavLink>
  )
};
