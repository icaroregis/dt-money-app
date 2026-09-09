import { AppHeader } from "@/components/AppHeader";
import { TransactionCard } from "./TransactionCard";
import { ScrollView, Text, View } from "react-native";
import { useTransactionStore } from "@/store/transaction.store";
import { TransactionType } from "@/components/TransactionTypeSelector";

export const ListHeader = () => {
  const {
    revenue,
    expense,
    total,
    lastRevenueDate,
    lastExpenseDate,
    lastTotalDate,
  } = useTransactionStore((state) => state.totalTransactions);

  return (
    <>
      <AppHeader />
      <View className="w-full h-[150]">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute h-[141]"
          contentContainerClassName="px-4 gap-3"
        >
          <TransactionCard
            type={TransactionType.REVENUE}
            amount={revenue}
            lastTransactionDate={lastRevenueDate}
          />
          <TransactionCard
            type={"total"}
            amount={total}
            lastTransactionDate={lastTotalDate}
          />
          <TransactionCard
            type={TransactionType.EXPENSE}
            amount={expense}
            lastTransactionDate={lastExpenseDate}
          />
        </ScrollView>
      </View>
    </>
  );
};