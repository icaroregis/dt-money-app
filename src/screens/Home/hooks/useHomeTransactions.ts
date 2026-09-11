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
  const { transactions, pagination, fetchTransactions } = useTransactionStore(
    useShallow((state) => ({
      transactions: state.transactions,
      pagination: state.pagination,
      fetchTransactions: state.fetchTransactions,
    })),
  );
  const { handleError } = useErrorHandler();
  const hasMoreTransactions = pagination.page < pagination.totalPages;
  const stateRef = useRef({
    isLoadingMore: false,
    isRefreshing: false,
    hasMore: false,
    page: 0,
    perPage: TRANSACTIONS_PER_PAGE,
    shouldBlock: false,
    hasTransactions: false,
  });

  useEffect(() => {
    stateRef.current = {
      isLoadingMore: isLoadingMoreTransactions,
      isRefreshing: isRefreshingTransactions,
      hasMore: hasMoreTransactions,
      page: pagination.page,
      perPage: pagination.perPage || TRANSACTIONS_PER_PAGE,
      shouldBlock: shouldBlockLoadingMore,
      hasTransactions: transactions.length > 0,
    };
  }, [
    hasMoreTransactions,
    isLoadingMoreTransactions,
    isRefreshingTransactions,
    pagination.page,
    pagination.perPage,
    shouldBlockLoadingMore,
    transactions.length,
  ]);

  const loadTransactions = useCallback(async () => {
    try {
      stateRef.current.isRefreshing = true;
      setIsRefreshingTransactions(true);
      await fetchTransactions({ page: 1, perPage: TRANSACTIONS_PER_PAGE });
    } catch (error) {
      handleError(error, "Erro ao carregar transações");
    } finally {
      stateRef.current.isRefreshing = false;
      setIsRefreshingTransactions(false);
    }
  }, [fetchTransactions, handleError]);

  const loadMoreTransactions = useCallback(async () => {
    const state = stateRef.current;

    if (
      state.isLoadingMore ||
      state.isRefreshing ||
      state.shouldBlock ||
      !state.hasTransactions ||
      !state.hasMore
    ) {
      return;
    }

    try {
      stateRef.current.isLoadingMore = true;
      setIsLoadingMoreTransactions(true);
      await fetchTransactions({
        page: state.page + 1,
        perPage: state.perPage,
      });
    } catch (error) {
      handleError(error, "Erro ao carregar mais transações");
    } finally {
      stateRef.current.isLoadingMore = false;
      setIsLoadingMoreTransactions(false);
    }
  }, [fetchTransactions, handleError]);

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
