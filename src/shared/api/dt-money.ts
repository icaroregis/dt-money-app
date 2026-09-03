import axios from 'axios';
import { Platform } from 'react-native';

// Se estiver usando um DISPOSITIVO FÍSICO, substitua 'SEU_IP_AQUI' pelo IP local do seu computador na rede Wi-Fi.
// Exemplo: 'http://192.168.1.15:3001'
// Para achar seu IP no Linux, rode o comando `ip a` ou `hostname -I` no terminal.

const baseURL = 'http://SEU_IP_AQUI:3001';

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
