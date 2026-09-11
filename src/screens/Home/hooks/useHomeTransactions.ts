import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTransactionStore } from "@/store/transaction.store";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

const TRANSACTIONS_PER_PAGE = 10;

interface UseHomeTransactionsParams {
  shouldBlockLoadingMore?: boolean;
}

export const useHomeTransactions = ({
  shouldBlockLoadingMore = false,
}: UseHomeTransactionsParams = {}) => {
  const [isRefreshingTransactions, setIsRefreshingTransactions] = useState(false);
  const [isLoadingMoreTransactions, setIsLoadingMoreTransactions] = useState(false);
  const isLoadingMoreRef = useRef(false);
  const { transactions, pagination, fetchTransactions } = useTransactionStore(
    useShallow((state) => ({
      transactions: state.transactions,
      pagination: state.pagination,
      fetchTransactions: state.fetchTransactions,
    })),
  );
  const { handleError } = useErrorHandler();
  const hasMoreTransactions = pagination.page < pagination.totalPages;

  const loadTransactions = useCallback(async () => {
    try {
      setIsRefreshingTransactions(true);
      await fetchTransactions({ page: 1, perPage: TRANSACTIONS_PER_PAGE });
    } catch (error) {
      handleError(error, "Erro ao carregar transações");
    } finally {
      setIsRefreshingTransactions(false);
    }
  }, [fetchTransactions, handleError]);

  const loadMoreTransactions = useCallback(async () => {
    if (
      isLoadingMoreRef.current ||
      isRefreshingTransactions ||
      shouldBlockLoadingMore ||
      !transactions.length ||
      !hasMoreTransactions
    ) {
      return;
    }

    try {
      isLoadingMoreRef.current = true;
      setIsLoadingMoreTransactions(true);
      await fetchTransactions({
        page: pagination.page + 1,
        perPage: pagination.perPage || TRANSACTIONS_PER_PAGE,
      });
    } catch (error) {
      handleError(error, "Erro ao carregar mais transações");
    } finally {
      isLoadingMoreRef.current = false;
      setIsLoadingMoreTransactions(false);
    }
  }, [
    fetchTransactions,
    handleError,
    hasMoreTransactions,
    isRefreshingTransactions,
    pagination.page,
    pagination.perPage,
    shouldBlockLoadingMore,
    transactions.length,
  ]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return {
    transactions,
    isRefreshingTransactions,
    isLoadingMoreTransactions,
    loadTransactions,
    loadMoreTransactions,
  };
};
