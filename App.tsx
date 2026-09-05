import Routes from '@/routes';
import './src/styles/global.css';
import { Snackbar } from '@/components/Snackbar';
import { AuthContextProvider } from '@/context/auth.context';
import { SnackbarContextProvider } from '@/context/snackbar.context';

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <Routes />
        <Snackbar />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
