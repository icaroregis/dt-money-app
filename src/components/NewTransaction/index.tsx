import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

export const NewTransaction = () => {
  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
    description: '',
    typeId: 0,
    categoryId: 0,
    value: 0,
  });

  return (
    <View className="px-8 py-5">
      <TouchableOpacity className="w-full flex-row items-center justify-between">
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name='close' size={20} color={colors.gray['700']} />
      </TouchableOpacity>
    </View>
  );
};