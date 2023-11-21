import { IUser } from '../../../interfaces/auth';
export interface AuthState{
    user: IUser | null,
    isLogged: boolean;
    errorMsg: string;
    isLoading: boolean;
    loadingSession: boolean;
}

const INITIAL_STATE :AuthState = {
    user: null,
    isLogged: false,
    errorMsg: '',
    isLoading: false,
    loadingSession: true,
}

