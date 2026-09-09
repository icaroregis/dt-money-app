import { useCallback, useEffect, useState } from "react";
import { colors } from "@/shared/colors";
import { ListHeader } from "./ListHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionStore } from "@/store/transaction.store";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const transactions = useTransactionStore((state) => state.transactions);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);
  const { handleError } = useErrorHandler();

  console.log("transactions", transactions);

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

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={ListHeader}
        className="bg-background-secondary"
      />
    </SafeAreaView>
  );
};
