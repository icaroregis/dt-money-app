import { dtMoneyApi } from '@/shared/api/dt-money';
import { LoginFormValues } from '@/screens/Login/LoginForm';
import { IAuthenticateResponse } from '@/shared/interfaces/https/authenticate-response';

export const authenticate = async (userData: LoginFormValues): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>('/auth/login', userData);
  return data;
};

export const registerUser = async (userData: LoginFormValues): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>('/auth/register', userData);
  console.log(data);
  return data;
};
