import Routes from '@/routes';
import './src/styles/global.css';
import { Snackbar } from '@/components/Snackbar';
import { AuthContextProvider } from '@/context/auth.context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SnackbarContextProvider } from '@/context/snackbar.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetContextProvider } from '@/context/bottomSheet.context';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <SnackbarContextProvider>
          <AuthContextProvider>
            <BottomSheetContextProvider>
              <Routes />
              <Snackbar />
            </BottomSheetContextProvider>
          </AuthContextProvider>
        </SnackbarContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
