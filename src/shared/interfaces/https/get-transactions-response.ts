import { TransactionResponse } from './transaction-response';

export interface TotalTransactionsSummary {
  revenue: number;
  expense: number;
  total: number;
}

export interface GetTransactionsQueryParams {
  page?: number;
  perPage?: number;
  searchText?: string;
  typeId?: number;
  categoryIds?: number[];
  from?: string;
  to?: string;
  orderId?: 'ASC' | 'DESC' | 'asc' | 'desc';
}

export interface GetTransactionsResponse {
  data: TransactionResponse[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: TotalTransactionsSummary;
}
