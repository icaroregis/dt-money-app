import Routes from '@/routes';
import './src/styles/global.css';
import { AuthContextProvider } from '@/context/auth.context';

export default function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}