import { Link } from 'react-router-dom';
import { PasswordInput, Box, TextInput, Button, Flex, Text } from '@mantine/core';
import { useForm, isEmail } from "@mantine/form";
import { isValidCI } from '@/utils';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context';
import { Alert } from '../ui';

export const RegisterForm = () => {
  const { register, isLoading, errorMsg, clearError } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      ci: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    },
    validate: {
      ci: (value) => {
        if (!isValidCI(value)) return 'Cédula no válida';
      },
      userName: (value) => {
        if (!value) return 'Este campo es requerido';
      },
      email: (value) => isEmail('Email no valido')(value),
      password: (value, values) => {
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        if (value !== values.confirmPassword) return 'Las contraseñas no coinciden';
      },
      confirmPassword: (value, values) => {
        if (!value) return 'Este campo es requerido';
        if (value !== values.password) return 'Las contraseñas no coinciden';
      },
      phone: (value) => {
        if (!value) return 'Este campo es requerido';
      },
      address: (value) => {
        if (!value) return 'Este campo es requerido';
      }
    }
  });
  
  useEffect(() => clearError(), []);

  const handleSubmit = (values: any) => {
    const { confirmPassword, ...rest } = values;
    register(rest);
  };


  return (
    <Box
      mt={'2rem'}
    >
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        noValidate
      >
        <Flex
          justify={'space-between'}
          gap={'1rem'}
        >
          <TextInput
            mt="sm"
            label="Cédula"
            placeholder="Cédula de Identidad"
            type='text'
            styles={{
              label: {
                color: 'black',
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }
            }}
            style={{
              flex: 1
            }}
            {...form.getInputProps('ci')}
          />

          <TextInput
            mt="sm"
            label="Usuario"
            placeholder="Nombre de Usuario"
            type='text'
            styles={{
              label: {
                color: 'black',
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }
            }}
            style={{
              flex: 1
            }}
            {...form.getInputProps('userName')}
          />
        </Flex>

        <Flex
          gap={'1rem'}
          justify={'space-between'}
        >
          <TextInput
            mt="sm"
            label="Dirección"
            placeholder="Dirección"
            type='text'
            styles={{
              label: {
                color: 'black',
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }
            }}
            style={{
              flex: 1
            }}
            {...form.getInputProps('address')}
          />

          <TextInput
            mt="sm"
            label="Teléfono"
            placeholder="Teléfono"
            type='tel'
            styles={{
              label: {
                color: 'black',
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }
            }}
            style={{
              flex: 1
            }}
            {...form.getInputProps('phone')}
          />
        </Flex>

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

        <PasswordInput
          mt="xl"
          label="Confirmar Contraseña"
          placeholder="*****"
          styles={{
            label: {
              color: 'black',
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }
          }}
          {...form.getInputProps('confirmPassword')}
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
            Crear Cuenta
          </Button>
        </Flex>
      </form>

      <Flex
        justify={'flex-end'}
        mt={'2rem'}
      >
        <Link
          to='/auth/login'
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
          >Iniciar Sesión</Text>
        </Link>
      </Flex>
    </Box>
  )
};
