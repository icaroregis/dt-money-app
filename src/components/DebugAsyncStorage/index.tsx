import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DebugAsyncStorageProps {
  enabled?: boolean;
}

export const DebugAsyncStorage = ({ enabled = false }: DebugAsyncStorageProps) => {
  useEffect(() => {
    if (!enabled) return;

    const debugStorage = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const allItems = await AsyncStorage.multiGet(allKeys);

        console.log('========================================');
        console.log('📦 AsyncStorage - Debug');
        console.log('========================================');
        console.log(`🔑 Total de chaves: ${allKeys.length}`);
        console.log('📋 Lista de chaves:', allKeys);
        console.log('----------------------------------------');

        for (const [key, value] of allItems) {
          let parsedValue = value;
          try {
            if (value) parsedValue = JSON.stringify(JSON.parse(value), null, 2);
          } catch {
            // mantém o valor original se não for JSON
          }
          console.log(`\n🔑 Chave: ${key}`);
          console.log(`📝 Valor:\n${parsedValue ?? '(vazio)'}`);
          console.log('----------------------------------------');
        }

        console.log('✅ Debug AsyncStorage concluído');
        console.log('========================================');
      } catch (error) {
        console.error('❌ Erro ao ler AsyncStorage:', error);
      }
    };

    debugStorage();
  }, [enabled]);

  return null;
};

export default DebugAsyncStorage;
