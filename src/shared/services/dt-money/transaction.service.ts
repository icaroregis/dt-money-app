import { dtMoneyApi } from '@/shared/api/dt-money';
import { TransactionResponse } from '@/shared/interfaces/https/transaction-response';
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response';
import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request';

export const getTransactionCategories = async (): Promise<TransactionCategory[]> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>('/transaction/categories');
  return data;
};

export const getTransactions = async (): Promise<TransactionResponse[]> => {
  const { data } = await dtMoneyApi.get<TransactionResponse[]>('/transaction');
  return data;
};

export const createTransaction = async (
  payload: CreateTransactionRequest,
): Promise<TransactionResponse> => {
  const { data } = await dtMoneyApi.post<TransactionResponse>('/transaction', payload);
  return data;
};
