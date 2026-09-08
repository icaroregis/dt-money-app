import { create, StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import * as transactionService from '@/shared/services/dt-money/transaction.service';
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response';
import { TransactionResponse } from '@/shared/interfaces/https/transaction-response';
import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request';
import {
  GetTransactionsQueryParams,
  TotalTransactionsSummary,
} from '@/shared/interfaces/https/get-transactions-response';


export interface TransactionState {
  categories: TransactionCategory[];
  transactions: TransactionResponse[];
  totalTransactions: TotalTransactionsSummary;
  pagination: {
    totalRows: number;
    totalPages: number;
    page: number;
    perPage: number;
  };
  fetchCategories: () => Promise<void>;
  fetchTransactions: (params?: GetTransactionsQueryParams) => Promise<void>;
  createTransaction: (payload: CreateTransactionRequest) => Promise<TransactionResponse>;
}

const initialTotals: TotalTransactionsSummary = { revenue: 0, expense: 0, total: 0 };
const initialPagination = { totalRows: 0, totalPages: 0, page: 0, perPage: 0 };

const storeApi: StateCreator<TransactionState> = (set, get) => ({
  categories: [],
  transactions: [],
  totalTransactions: initialTotals,
  pagination: initialPagination,

  fetchCategories: async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    set({ categories: categoriesResponse });
  },

  fetchTransactions: async (params?: GetTransactionsQueryParams) => {
    // Debug: descomente abaixo para confirmar que a action foi chamada e o que foi salvo no store
    // console.log('[store.fetchTransactions] chamou com params:', params);
    const response = await transactionService.getTransactions(params);
    // console.log('[store.fetchTransactions] salvar no estado:');
    // console.log('  • transactions.length:', response.data?.length ?? 0);
    // console.log('  • totalTransactions (revenue/expense/total):', response.totalTransactions);
    // console.log('  • pagination:', { page: response.page, totalPages: response.totalPages, totalRows: response.totalRows });
    set({
      transactions: response.data,
      totalTransactions: response.totalTransactions,
      pagination: {
        totalRows: response.totalRows,
        totalPages: response.totalPages,
        page: response.page,
        perPage: response.perPage,
      },
    });
  },

  createTransaction: async (payload: CreateTransactionRequest) => {
    const newTransaction =
      await transactionService.createTransaction(payload);
    // get() é uma API do Zustand que retorna a INSTÂNCIA ATUAL do store (state + actions).
    // Usamos aqui para chamar a action irmã `fetchTransactions` que está definida no
    // mesmo objeto retornado pela storeApi, e que não seria acessível diretamente
    // por closure nesse escopo. Assim a lista e os totais são atualizados do zero
    // após cada criação, garantindo sincronia com o backend.
    await get().fetchTransactions();
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