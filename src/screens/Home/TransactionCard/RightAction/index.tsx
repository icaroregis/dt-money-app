import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { TransactionResponse } from "@/shared/interfaces/https/transaction-response";

interface RightActionProps {
  transaction: TransactionResponse;
  onDelete?: (transaction: TransactionResponse) => void;
}

export const RightAction: FC<RightActionProps> = ({ transaction, onDelete }) => {
  if (!onDelete) return null;

  return (
    <TouchableOpacity
      className="h-full w-[81px] bg-accent-red-background-primary items-center justify-center rounded-r-[6px]"
      onPress={() => onDelete(transaction)}
      activeOpacity={0.7}
    >
      <MaterialIcons name="delete" size={24} color={colors.white} />
    </TouchableOpacity>
  );
};
