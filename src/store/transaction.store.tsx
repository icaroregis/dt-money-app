import { create, StateCreator } from 'zustand';
import { getLastTransactionDates } from '@/utils/getMaxDates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import * as transactionService from '@/shared/services/dt-money/transaction.service';
import { TransactionResponse } from '@/shared/interfaces/https/transaction-response';
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response';
import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request';
import {
  ApiTotalTransactionsSummary,
  GetTransactionsQueryParams,
  TotalTransactionsSummary,
} from '@/shared/interfaces/https/get-transactions-response';

const calculateTransactionSummary = (
  apiSummary: ApiTotalTransactionsSummary,
  transactions: TransactionResponse[]
): TotalTransactionsSummary => ({
  ...apiSummary,
  ...getLastTransactionDates(transactions),
});

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

const initialTotals: TotalTransactionsSummary = {
  revenue: 0,
  expense: 0,
  total: 0,
  lastRevenueDate: undefined,
  lastExpenseDate: undefined,
  lastTotalDate: undefined,
};
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
    const response = await transactionService.getTransactions(params);
    const totalTransactions = calculateTransactionSummary(
      response.totalTransactions,
      response.data
    );
    set({
      transactions: response.data,
      totalTransactions,
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