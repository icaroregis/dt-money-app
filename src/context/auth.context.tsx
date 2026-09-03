import { LoginFormValues } from "@/screens/Login/LoginForm";
import { RegisterFormValues } from "@/screens/Register/RegisterForm";
import { createContext, FC, PropsWithChildren, useState, useCallback, useMemo, useContext } from "react";

type AuthContextType = {
  user: null;
  token: string | null;
  handleAuthenticate: (params: LoginFormValues) => Promise<void>;
  handleRegister: (params: RegisterFormValues) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleAuthenticate = useCallback(async (params: LoginFormValues) => { }, []);
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