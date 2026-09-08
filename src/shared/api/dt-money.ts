import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '../helpers/AppError';
import { IAuthenticateResponse } from '../interfaces/https/authenticate-response';
// import { Platform } from 'react-native';

// Se estiver usando um DISPOSITIVO FÍSICO, substitua 'SEU_IP_AQUI' pelo IP local do seu computador na rede Wi-Fi.
// Exemplo: 'http://192.168.1.15:3001'
// Para achar seu IP no Linux, rode o comando `ip a` ou `hostname -I` no terminal.

const baseURL = process.env.EXPO_PUBLIC_API_URL;

// Caso volte a usar emuladores, você pode descomentar o código abaixo:
/*
const baseURL = Platform.select({
  ios: 'http://localhost:3001',
  android: 'http://10.0.2.2:3001',
  default: 'http://localhost:3001',
});
*/

export const dtMoneyApi = axios.create({
  baseURL,
});

const AUTH_STORAGE_KEY = process.env.EXPO_PUBLIC_AUTH_STORAGE_KEY;

dtMoneyApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const storedData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedData) {
        const { token } = JSON.parse(storedData) as IAuthenticateResponse;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // ignora erros de leitura do storage
    }
    return config;
  },
  (error) => Promise.reject(error),
);

dtMoneyApi.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response && error.response.data.message) {
      return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject(new AppError('Falha na requisição.'));
  },
);
