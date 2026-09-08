import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosInstance } from 'axios';
import { IAuthenticateResponse } from '../interfaces/https/authenticate-response';

const AUTH_STORAGE_KEY = process.env.EXPO_PUBLIC_AUTH_STORAGE_KEY;

export const addTokenToRequest = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const userData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (userData) {
          const { token } = JSON.parse(userData) as IAuthenticateResponse;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      } catch (storageError) {
        console.error('Erro ao ler token do AsyncStorage:', storageError);
        return config;
      }
    },
    (error) => Promise.reject(error),
  );
};
