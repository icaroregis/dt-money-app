import { useCallback, useState } from "react";
import { TransactionResponse } from "@/shared/interfaces/https/transaction-response";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useTransactionStore } from "@/store/transaction.store";

export const useDeleteTransactionFlow = () => {
  const [isDeletingTransaction, setIsDeletingTransaction] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<TransactionResponse | null>(null);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
  const { handleError } = useErrorHandler();

  const handleDeleteTransaction = useCallback((transaction: TransactionResponse) => {
    setTransactionToDelete(transaction);
  }, []);

  const closeDeleteTransactionModal = useCallback(() => {
    setTransactionToDelete(null);
  }, []);

  const confirmDeleteTransaction = useCallback(async () => {
    if (!transactionToDelete) return;

    try {
      setIsDeletingTransaction(true);
      await deleteTransaction(transactionToDelete.id);
      closeDeleteTransactionModal();
    } catch (error) {
      handleError(error, "Erro ao excluir transação");
    } finally {
      setIsDeletingTransaction(false);
    }
  }, [closeDeleteTransactionModal, deleteTransaction, handleError, transactionToDelete]);

  return {
    transactionToDelete,
    isDeletingTransaction,
    handleDeleteTransaction,
    closeDeleteTransactionModal,
    confirmDeleteTransaction,
  };
};
