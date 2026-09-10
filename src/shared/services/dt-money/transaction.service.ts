import qs from 'qs';
import { dtMoneyApi } from '@/shared/api/dt-money';
import { TransactionResponse } from '@/shared/interfaces/https/transaction-response';
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response';
import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request';

import {
  GetTransactionsQueryParams,
  GetTransactionsResponse,
} from '@/shared/interfaces/https/get-transactions-response';

export const getTransactionCategories = async (): Promise<TransactionCategory[]> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>('/transaction/categories');
  return data;
};

export const getTransactions = async (
  params: GetTransactionsQueryParams = {
    page: 1,
    perPage: 10,
  },
): Promise<GetTransactionsResponse> => {
  const { data } = await dtMoneyApi.get<GetTransactionsResponse>('/transaction', {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'comma' }),
  });
  return data;
};

export const createTransaction = async (payload: CreateTransactionRequest): Promise<TransactionResponse> => {
  const { data } = await dtMoneyApi.post<TransactionResponse>('/transaction', payload);
  return data;
};

export const updateTransaction = async (id: number, payload: Partial<CreateTransactionRequest>): Promise<TransactionResponse> => {
  const { data } = await dtMoneyApi.put<TransactionResponse>(`/transaction/${id}`, payload);
  return data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await dtMoneyApi.delete(`/transaction/${id}`);
};
