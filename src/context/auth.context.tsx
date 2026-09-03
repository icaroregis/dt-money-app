import { IUser } from "@/shared/interfaces/user-interface";
import { LoginFormValues } from "@/screens/Login/LoginForm";
import { RegisterFormValues } from "@/screens/Register/RegisterForm";
import * as AuthService from "@/shared/services/dt-money/auth.service";
import { createContext, FC, PropsWithChildren, useState, useCallback, useMemo, useContext } from "react";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: LoginFormValues) => Promise<void>;
  handleRegister: (params: RegisterFormValues) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = useCallback(async (params: LoginFormValues) => {
    const { user, token } = await AuthService.authenticate(params);
    setUser(user);
    setToken(token);
  }, []);

  const handleRegister = useCallback(async (params: RegisterFormValues) => { }, []);
  const handleLogout = useCallback(() => { }, []);

  const value = useMemo(() => ({
    user,
    token,
    handleAuthenticate,
    handleRegister,
    handleLogout
  }), [user, token, handleAuthenticate, handleRegister, handleLogout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Esse hook dá acesso as todas as funções do contexto de autenticação
export const useAuthContext = () => useContext(AuthContext);