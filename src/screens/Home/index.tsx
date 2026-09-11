import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { colors } from "@/shared/colors";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { EditTransaction } from "@/components/EditTransaction";
import { useTransactionStore } from "@/store/transaction.store";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { TransactionResponse } from "@/shared/interfaces/https/transaction-response";

const TRANSACTIONS_PER_PAGE = 10;

export const Home = () => {
  const [isDeletingTransaction, setIsDeletingTransaction] = useState(false);
  const [isRefreshingTransactions, setIsRefreshingTransactions] = useState(false);
  const [isLoadingMoreTransactions, setIsLoadingMoreTransactions] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<TransactionResponse | null>(null);
  const isLoadingMoreRef = useRef(false);
  const transactions = useTransactionStore((state) => state.transactions);
  const pagination = useTransactionStore((state) => state.pagination);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
  const { handleError } = useErrorHandler();
  const { openBottomSheet } = useBottomSheetContext();
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
      isDeletingTransaction ||
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
    isDeletingTransaction,
    isRefreshingTransactions,
    pagination.page,
    pagination.perPage,
    transactions.length,
  ]);

  const handleDeleteTransaction = useCallback((transaction: TransactionResponse) => {
    setTransactionToDelete(transaction);
  }, []);

  const confirmDeleteTransaction = useCallback(async () => {
    if (!transactionToDelete) return;

    try {
      setIsDeletingTransaction(true);
      await deleteTransaction(transactionToDelete.id);
      setTransactionToDelete(null);
    } catch (error) {
      handleError(error, "Erro ao excluir transação");
    } finally {
      setIsDeletingTransaction(false);
    }
  }, [deleteTransaction, handleError, transactionToDelete]);

  const handleEditTransaction = useCallback((transaction: TransactionResponse) => {
    openBottomSheet(<EditTransaction transaction={transaction} />, 0);
  }, [openBottomSheet]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={ListHeader}
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        )}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.2}
        ListFooterComponent={isLoadingMoreTransactions ? (
          <View className="items-center py-6">
            <ActivityIndicator color={colors.white} />
          </View>
        ) : null}
      />
      <DeleteTransactionModal
        visible={!!transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
        onConfirm={confirmDeleteTransaction}
        isLoading={isDeletingTransaction}
      />
    </SafeAreaView>
  );
};
