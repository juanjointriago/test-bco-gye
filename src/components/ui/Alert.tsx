import { Button, Alert as MantineAlert, ThemeIcon } from '@mantine/core';
import { IconAlertCircle, IconSquareX } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {
  title: string;
  body: React.ReactNode | string;
  onClose?: () => void;
}

export const Alert: FC<Props> = ({ body, title, onClose }) => {
  return (
    <MantineAlert icon={<IconAlertCircle size="1rem" />} title={title} color="red" variant="outline"
      sx={{
        marginTop: '1rem',
      }}
    >
      {body}

      {
        onClose &&
        <Button
          sx={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            ":hover": {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
            padding: 0,
            height: 'fit-content'
          }}
          onClick={onClose}
        >
          <IconSquareX
            size="1.2rem"
            color='red'
          />
        </Button>
      }
    </MantineAlert>
  );
}