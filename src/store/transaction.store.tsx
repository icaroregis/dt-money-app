import { create, StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import * as transactionService from '@/shared/services/dt-money/transaction.service';
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response';
import { TransactionResponse } from '@/shared/interfaces/https/transaction-response';
import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request';


export interface TransactionState {
  categories: TransactionCategory[];
  transactions: TransactionResponse[];
  fetchCategories: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  createTransaction: (payload: CreateTransactionRequest) => Promise<TransactionResponse>;
}

const storeApi: StateCreator<TransactionState> = (set) => ({
  categories: [],
  transactions: [],

  fetchCategories: async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    set({ categories: categoriesResponse });
  },

  fetchTransactions: async () => {
    const transactionsResponse =
      await transactionService.getTransactions();
    set({ transactions: transactionsResponse });
  },

  createTransaction: async (payload: CreateTransactionRequest) => {
    const newTransaction =
      await transactionService.createTransaction(payload);
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
    return newTransaction;
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