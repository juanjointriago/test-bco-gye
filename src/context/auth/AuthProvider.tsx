import { FC, ReactNode, useEffect, useReducer } from 'react';
import axios from 'axios';
import { IUser } from '../../interfaces/auth';
import { AuthReducer } from './authReducer';
import { testAPI } from '../../api';
import { AuthContext } from './AuthContext';
export interface AuthState {
    user: IUser | null,
    isLogged: boolean;
    errorMsg: string;
    isLoading: boolean;
    loadingSession: boolean;
}

const INITIAL_STATE: AuthState = {
    user: null,
    isLogged: false,
    errorMsg: '',
    isLoading: false,
    loadingSession: true,
}


export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        revalidateToken();
    }, []);

    const login = async (userData: any) => {
        try {
            dispatch({ type: '[Auth] - Load Login' });

            const { data } = await testAPI.post<IUser>('/auth/signin', userData);

            // save in local storage
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            dispatch({
                type: '[Auth] - Login Success',
                payload: data,
            });
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError<IUser>(error)) {
                dispatch({
                    type: '[Auth] - Set Error',
                    payload: error.response?.data.mensajeRetorno || 'Error desconocido, por favor intente más tarde',
                })
            }
        }
    };

    const register = async (userData: any) => {
        dispatch({ type: '[Auth] - Load Login' });
        try {
            const { data } = await testAPI.post<IUser>('/auth/signup', userData);

            // save in local storage
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            dispatch({
                type: '[Auth] - Login Success',
                payload: data,
            })
        } catch (error) {
            if (axios.isAxiosError<IUser>(error)) {
                dispatch({
                    type: '[Auth] - Set Error',
                    payload: error.response?.data.mensajeRetorno || 'Error desconocido, por favor intente más tarde',
                })
            }
        }
    }

    const logout = () => {
        // localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        dispatch({ type: '[Auth] - Logout' });

        window.location.reload();
        window.location.href = '/auth/login';
    };
    
    const revalidateToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) throw new Error('No hay token');

            const { data } = await testAPI.post<IUser>('/auth/refresh-token', { refreshToken });

            // save in local storage
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            dispatch({
                type: '[Auth] - Login Success',
                payload: data,
            })
        } catch (error) {
            console.warn(error);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch({ type: '[Auth] - Logout' });
        }
    };
    const clearError = () => {
        dispatch({ type: '[Auth] - Clear Error' });
    };

    if (state.loadingSession) return <></>;

    return (
        <AuthContext.Provider
            value={{
                ...state,

                // methods
                login,
                logout,
                register,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}