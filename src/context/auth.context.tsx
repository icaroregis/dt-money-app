import { IUser } from "@/shared/interfaces/user-interface";
import { LoginFormValues } from "@/screens/Login/LoginForm";
import { RegisterFormValues } from "@/screens/Register/RegisterForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthService from "@/shared/services/dt-money/auth.service";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";
import { createContext, FC, PropsWithChildren, useState, useCallback, useMemo, useContext } from "react";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: LoginFormValues) => Promise<void>;
  handleRegister: (params: RegisterFormValues) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = useCallback(async (params: LoginFormValues) => {
    const { user, token } = await AuthService.authenticate(params);
    await AsyncStorage.setItem("dt-money-data", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
  }, []);

  const handleRegister = useCallback(async (params: RegisterFormValues) => {
    const { user, token } = await AuthService.registerUser(params);
    await AsyncStorage.setItem("dt-money-data", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
  }, []);

  const handleLogout = useCallback(() => { }, []);

  const restoreUserSession = useCallback(async () => {
    const data = await AsyncStorage.getItem("dt-money-data");
    if (data) {
      const { user, token } = JSON.parse(data) as IAuthenticateResponse;
      setUser(user);
      setToken(token);
    }
    return data;
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    handleAuthenticate,
    handleRegister,
    handleLogout,
    restoreUserSession
  }), [user, token, handleAuthenticate, handleRegister, handleLogout, restoreUserSession]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Esse hook dá acesso as todas as funções do contexto de autenticação
export const useAuthContext = () => useContext(AuthContext);