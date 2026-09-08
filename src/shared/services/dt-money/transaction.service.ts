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
  params: GetTransactionsQueryParams = {},
): Promise<GetTransactionsResponse> => {
  const { data } = await dtMoneyApi.get<GetTransactionsResponse>('/transaction', {
    params: {
      ...params,
      categoryIds: params.categoryIds?.join(','),
    },
  });
  return data;
};

export const createTransaction = async (
  payload: CreateTransactionRequest,
): Promise<TransactionResponse> => {
  const { data } = await dtMoneyApi.post<TransactionResponse>('/transaction', payload);
  return data;
};
