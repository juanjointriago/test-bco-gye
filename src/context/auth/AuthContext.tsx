import { createContext } from "react";
import { IUser } from "../../interfaces/auth";

interface AuthContextData {
  user: IUser | null;
  isLogged: boolean;
  errorMsg: string;
  isLoading: boolean;

  login: (user: any) => void;
  register: (user: any) => void;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext({} as AuthContextData);