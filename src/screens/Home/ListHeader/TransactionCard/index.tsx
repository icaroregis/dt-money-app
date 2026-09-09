import { FC } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ICONS } from "./strategies/icon-strategy";
import { formatCurrency, formatDate } from "@/utils/format";
import { CARD_DATA } from "./strategies/card-data-strategy";
import { TransactionType } from "@/components/TransactionTypeSelector";

export type TransactionCardType = TransactionType | "total";
interface Props {
  type: TransactionCardType;
  amount: number;
  lastTransactionDate?: string;
}

export const TransactionCard: FC<Props> = ({
  type,
  amount,
  lastTransactionDate,
}) => {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];
  const formattedDate = formatDate(lastTransactionDate);

  return (
    <View
      className={`${cardData.bgClass} w-[280px] self-start rounded-[6px] overflow-hidden flex-col items-stretch gap-3 pt-6 pr-6 pb-6 pl-8`}
    >
      <View className="flex-row justify-between items-center self-stretch">
        <Text className="text-base font-normal text-white">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>

      <View className="flex-col self-stretch gap-[2px]">
        <Text className="text-2xl font-bold text-white">
          {formatCurrency(amount)}
        </Text>
        {type !== "total" && (
          <Text className="text-sm font-normal text-gray-700">
            {formattedDate
              ? `${cardData.prefixLabel} ${formattedDate}`
              : "Nenhuma transação encontrada"
            }
          </Text>
        )}
      </View>
    </View>
  );
};
