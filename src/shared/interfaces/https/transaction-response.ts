import { TransactionType } from '../../enums/transaction-type';
import { TransactionCategory } from './transaction-category-response';

export interface TransactionResponse {
  id: number;
  value: number;
  description: string;
  categoryId: number;
  typeId: TransactionType;
  type: {
    id: TransactionType;
    name: string;
  };
  category: TransactionCategory;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
