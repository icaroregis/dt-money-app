import { useCallback } from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo, View } from "react-native";
import { colors } from "@/shared/colors";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { EditTransaction } from "@/components/EditTransaction";
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import { useHomeTransactions } from "./hooks/useHomeTransactions";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { useDeleteTransactionFlow } from "./hooks/useDeleteTransactionFlow";
import { TransactionResponse } from "@/shared/interfaces/https/transaction-response";

export const Home = () => {
  const { openBottomSheet } = useBottomSheetContext();

  const {
    transactionToDelete,
    isDeletingTransaction,
    handleDeleteTransaction,
    closeDeleteTransactionModal,
    confirmDeleteTransaction,
  } = useDeleteTransactionFlow();

  const {
    transactions,
    isLoadingMoreTransactions,
    loadMoreTransactions,
  } = useHomeTransactions({
    shouldBlockLoadingMore: isDeletingTransaction,
  });

  const handleEditTransaction = useCallback((transaction: TransactionResponse) => {
    openBottomSheet(<EditTransaction transaction={transaction} />, 0);
  }, [openBottomSheet]);

  const renderTransactionItem = useCallback(
    ({ item }: ListRenderItemInfo<TransactionResponse>) => (
      <TransactionCard
        transaction={item}
        onDelete={handleDeleteTransaction}
        onEdit={handleEditTransaction}
      />
    ),
    [handleDeleteTransaction, handleEditTransaction],
  );

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={ListHeader}
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={renderTransactionItem}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.2}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListFooterComponent={isLoadingMoreTransactions ? (
          <View className="items-center py-6">
            <ActivityIndicator color={colors.white} />
          </View>
        ) : null}
      />
      <DeleteTransactionModal
        visible={!!transactionToDelete}
        onClose={closeDeleteTransactionModal}
        onConfirm={confirmDeleteTransaction}
        isLoading={isDeletingTransaction}
      />
    </SafeAreaView>
  );
};
