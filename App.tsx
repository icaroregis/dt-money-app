import Routes from '@/routes';
import './src/styles/global.css';
import { AuthContextProvider } from '@/context/auth.context';
import { SnackbarContextProvider } from '@/context/snackbar.context';

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}