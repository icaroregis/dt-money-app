import { TransactionType } from '@/shared/enums/transaction-type';
import { TransactionResponse } from '@/shared/interfaces/https/transaction-response';

export interface LastTransactionDates {
  lastRevenueDate?: string;
  lastExpenseDate?: string;
  lastTotalDate?: string;
}

export const getLastTransactionDates = (transactions: TransactionResponse[]): LastTransactionDates => {
  let lastRevenueDate: Date | undefined;
  let lastExpenseDate: Date | undefined;
  let lastTotalDate: Date | undefined;

  for (const transaction of transactions) {
    const currentDate = new Date(transaction.createdAt);

    if (!lastTotalDate || currentDate > lastTotalDate) {
      lastTotalDate = currentDate;
    }

    if (transaction.typeId === TransactionType.REVENUE) {
      if (!lastRevenueDate || currentDate > lastRevenueDate) {
        lastRevenueDate = currentDate;
      }
    } else if (transaction.typeId === TransactionType.EXPENSE) {
      if (!lastExpenseDate || currentDate > lastExpenseDate) {
        lastExpenseDate = currentDate;
      }
    }
  }

  return {
    lastRevenueDate: lastRevenueDate?.toISOString(),
    lastExpenseDate: lastExpenseDate?.toISOString(),
    lastTotalDate: lastTotalDate?.toISOString(),
  };
};
