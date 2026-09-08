import { create, StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import * as transactionService from '@/shared/services/dt-money/transaction.service';
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response';


export interface TransactionState {
  categories: TransactionCategory[];
  fetchCategories: () => Promise<void>;
}

const storeApi: StateCreator<TransactionState> = (set) => ({
  categories: [],

  fetchCategories: async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    set({ categories: categoriesResponse });
  },
});

export const useTransactionStore = create<TransactionState>()(
  devtools(
    persist(storeApi, {
      name: 'transaction-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }),
  ),
);