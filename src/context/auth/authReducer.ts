import { IUser } from "../../../interfaces/auth";
import { AuthState } from "./AuthProvider";

type AuthActionType = 
| {type: '[Auth] - Login Success', payload: IUser}
| {type: '[Auth] - Set Error', payload: string}
| {type: '[Auth] - Logout', payload: string}
| {type: '[Auth] - Load Login', payload: string}
| {type: '[Auth] - Clear Error', payload: string}



export const AuthReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
      case '[Auth] - Load Login':
        return {
          ...state,
          isLoading: true,
        }
  
      case '[Auth] - Login Success':
        return {
          ...state,
          user: action.payload,
          isLogged: true,
          isLoading: false,
          errorMsg: '',
          loadingSession: false,
        };
  
      case '[Auth] - Set Error':
        return {
          ...state,
          user: null,
          isLogged: false,
          errorMsg: action.payload,
          isLoading: false
        };
  
      case '[Auth] - Logout':
        return {
          ...state,
          user: null,
          isLogged: false,
          isLoading: false,
          loadingSession: false,
        }
  
      case '[Auth] - Clear Error':
        return {
          ...state,
          errorMsg: '',
        }
  
      default:
        return state;
    }
  };