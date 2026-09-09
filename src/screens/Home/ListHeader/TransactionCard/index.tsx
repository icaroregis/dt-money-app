import { TransactionType } from "@/components/TransactionTypeSelector";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { Text, View } from "react-native";

type TransactionCardType = TransactionType | "total";

interface Props {
  type: TransactionCardType;
  amount: number;
  lastTransactionDate?: string;
}

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}
const ICONS: Record<TransactionCardType, IconsData> = {
  [TransactionType.REVENUE]: {
    color: colors["accent-brand-light"],
    name: "arrow-circle-up",
  },
  [TransactionType.EXPENSE]: {
    color: colors["accent-red"],
    name: "arrow-circle-down",
  },
  total: {
    color: colors.white,
    name: "attach-money",
  },
};

interface CardData {
  label: string;
  bgClass: string;
  prefixLabel: string;
}
const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionType.REVENUE]: {
    label: "Entradas",
    bgClass: "bg-background-tertiary",
    prefixLabel: "Última entrada em",
  },
  [TransactionType.EXPENSE]: {
    label: "Saídas",
    bgClass: "bg-background-tertiary",
    prefixLabel: "Última saída em",
  },
  total: {
    label: "Total",
    bgClass: "bg-accent-brand-background-primary",
    prefixLabel: "Última transação em",
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const formatDate = (isoDate?: string) => {
  if (!isoDate) return null;
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });
};

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
        <Text className="text-sm font-normal text-gray-700">
          {formattedDate
            ? `${cardData.prefixLabel} ${formattedDate}`
            : `${cardData.prefixLabel} --`}
        </Text>
      </View>
    </View>
  );
};
