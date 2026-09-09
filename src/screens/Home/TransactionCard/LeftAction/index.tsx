import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { TransactionResponse } from "@/shared/interfaces/https/transaction-response";

interface LeftActionProps {
  transaction: TransactionResponse;
  onEdit?: (transaction: TransactionResponse) => void;
}

export const LeftAction: FC<LeftActionProps> = ({ transaction, onEdit }) => {
  if (!onEdit) return null;

  return (
    <TouchableOpacity
      className="h-full w-[82px] bg-accent-blue-dark items-center justify-center rounded-l-[6px]"
      onPress={() => onEdit(transaction)}
      activeOpacity={0.7}
    >
      <MaterialIcons name="edit" size={24} color={colors.white} />
    </TouchableOpacity>
  );
};
