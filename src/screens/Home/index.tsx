import { useCallback, useEffect, useState } from "react";
import { FlatList, Alert } from "react-native";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionStore } from "@/store/transaction.store";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { DeleteTransactionModal } from "./TransactionCard/DeleteTransactionModal";
import { TransactionResponse } from "@/shared/interfaces/https/transaction-response";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<TransactionResponse | null>(null);
  const transactions = useTransactionStore((state) => state.transactions);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
  const { handleError } = useErrorHandler();

  const loadTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetchTransactions({ page: 1, perPage: 20 });
    } catch (error) {
      handleError(error, "Erro ao carregar transações");
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, handleError]);

  const handleDeleteTransaction = useCallback((transaction: TransactionResponse) => {
    setTransactionToDelete(transaction);
  }, []);

  const confirmDeleteTransaction = useCallback(async () => {
    if (!transactionToDelete) return;

    try {
      setIsLoading(true);
      await deleteTransaction(transactionToDelete.id);
      setTransactionToDelete(null);
    } catch (error) {
      handleError(error, "Erro ao excluir transação");
    } finally {
      setIsLoading(false);
    }
  }, [deleteTransaction, handleError, transactionToDelete]);

  const handleEditTransaction = useCallback((transaction: TransactionResponse) => {
    // Navigate to edit screen or open modal
    console.log("Edit transaction:", transaction.id);
  }, []);

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
      />
      <DeleteTransactionModal
        visible={!!transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
        onConfirm={confirmDeleteTransaction}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};
