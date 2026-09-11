import { FC, memo, useCallback, useRef } from "react";
import { cn } from "@/utils/cn";
import { colors } from "@/shared/colors";
import { LeftAction } from "./LeftAction";
import { Text, View } from "react-native";
import { RightAction } from "./RightAction";
import { MaterialIcons } from "@expo/vector-icons";
import { TransactionType } from "@/shared/enums/transaction-type";
import { formatCurrency, formatNumericDate } from "@/utils/format";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { TransactionResponse } from "@/shared/interfaces/https/transaction-response";

interface SwipeableRef {
  close: () => void;
  openLeft: () => void;
  openRight: () => void;
  reset: () => void
}

interface TransactionCardProps {
  transaction: TransactionResponse;
  onEdit?: (transaction: TransactionResponse) => void;
  onDelete?: (transaction: TransactionResponse) => void;
}

const TransactionCardComponent: FC<TransactionCardProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const swipeableRef = useRef<SwipeableRef | null>(null);
  const isExpense = transaction.typeId === TransactionType.EXPENSE;
  const formattedValue = formatCurrency(transaction.value);
  const displayValue = isExpense ? `- ${formattedValue}` : formattedValue;
  const formattedDate = formatNumericDate(transaction.createdAt);

  const handleEdit = useCallback(() => {
    swipeableRef.current?.close();
    onEdit?.(transaction);
  }, [onEdit, transaction]);

  const handleDelete = useCallback(() => {
    swipeableRef.current?.close();
    onDelete?.(transaction);
  }, [onDelete, transaction]);

  return (
    <Swipeable
      ref={swipeableRef}
      containerStyle={{
        alignSelf: "center",
        width: "92%",
        marginBottom: 12,
      }}
      friction={2}
      enableTrackpadTwoFingerGesture={false}
      renderLeftActions={() => <LeftAction onEdit={handleEdit} />}
      renderRightActions={() => <RightAction onDelete={handleDelete} />}
      overshootLeft={false}
      overshootRight={false}
    >
      <View className="bg-background-tertiary rounded-[6px] p-5 gap-3">
        <View className="gap-1">
          <Text className="text-base font-normal text-gray-400">
            {transaction.description}
          </Text>
          <Text
            className={cn(
              "text-xl font-bold",
              isExpense ? "text-accent-red" : "text-accent-brand-light"
            )}
          >
            {displayValue}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-1">
            <MaterialIcons
              name="label-outline"
              size={16}
              color={colors.gray["700"]}
            />
            <Text className="text-base font-normal text-gray-700">
              {transaction.category.name}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <MaterialIcons
              name="date-range"
              size={16}
              color={colors.gray["700"]}
            />
            <Text className="text-base font-normal text-gray-700">
              {formattedDate}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export const TransactionCard = memo(TransactionCardComponent);
