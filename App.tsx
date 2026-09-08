// import { useEffect } from 'react';
import Routes from '@/routes';
import './src/styles/global.css';
import { Snackbar } from '@/components/Snackbar';
import { AuthContextProvider } from '@/context/auth.context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SnackbarContextProvider } from '@/context/snackbar.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetContextProvider } from '@/context/bottomSheet.context';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // Debug AsyncStorage — quando precisar inspecionar os dados salvos, descomente as linhas abaixo:
  // 1. Descomente o import do useEffect no topo do arquivo
  // 2. Descomente o import do AsyncStorage no topo do arquivo
  // 3. Descomente o useEffect abaixo
  //
  // useEffect(() => {
  //   const debugStorage = async () => {
  //     const allKeys = await AsyncStorage.getAllKeys();
  //     const allItems = await AsyncStorage.multiGet(allKeys);
  //     console.log('📦 AsyncStorage completo:', JSON.stringify(allItems, null, 2));
  //   };
  //   debugStorage();
  // }, []);

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
