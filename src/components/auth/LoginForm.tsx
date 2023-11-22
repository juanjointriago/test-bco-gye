import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, isEmail } from "@mantine/form";
import { PasswordInput, Box, TextInput, Button, Flex, Text } from '@mantine/core';
import { AuthContext } from '../../context/auth/AuthContext';
import { Alert } from '../ui';

export const LoginForm = () => {
  const { login, errorMsg, isLoading, clearError } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: import.meta.env.DEV ? 'juanintriagovillarreal@hotmail.com' : '',
      password: import.meta.env.DEV ? 'Admin*1992' : ''
    },
    validate: {
      email: (value) => isEmail('Email no valido')(value),
      password: (value: string) => {
        if (value.length < 4) return 'La contraseña debe tener al menos 4 caracteres';
      }
    }
  });

  useEffect(() => clearError(), []);

  return (
    <Box
      mt={'2rem'}
    >
      <form
        onSubmit={form.onSubmit(login)}
        noValidate
      >
        <TextInput
          mt="sm"
          label="Email"
          placeholder="Email"
          type='email'
          styles={{
            label: {
              color: 'black',
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }
          }}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          mt="xl"
          label="Contraseña"
          placeholder="*****"
          styles={{
            label: {
              color: 'black',
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }
          }}
          {...form.getInputProps('password')}
        />

        {
          errorMsg &&
          <Alert
            title='Error'
            body={<Text
              sx={(theme) => ({
                color: theme.colors.red[5],
              })}
            >{errorMsg}</Text>}
            onClose={clearError}
          />
        }

        <Flex
          justify={'center'}
          mt={'2rem'}
          sx={{
            ":hover": {
              transition: 'all 0.3s ease-in-out'
            }
          }}
        >
          <Button size='md'
            type='submit'
            loading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </Flex>
      </form>

      <Flex
        justify={'flex-end'}
        mt={'2rem'}
      >
        <Link
          to='/auth/register'
          style={{
            textDecoration: 'none'
          }}
        >
          <Text
            align='end'
            sx={(theme) => ({
              color: theme.other.colors.primary,
              fontSize: '1rem',
              cursor: 'pointer',
              ":hover": {
                textDecoration: 'underline'
              }
            })}
          >Registrarse</Text>
        </Link>
      </Flex>
    </Box>
  )
};
