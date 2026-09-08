import { useState } from "react";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext();
  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
    description: '',
    typeId: 0,
    categoryId: 0,
    value: 0,
  });

  const setTransactionData = (key: keyof CreateTransactionRequest, value: CreateTransactionRequest[keyof CreateTransactionRequest]) => {
    setTransaction({ ...transaction, [key]: value });
  }

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name='close' size={20} color={colors.gray['700']} />
      </TouchableOpacity>
      <View>
        <TextInput
          className="text-white h-[50px] text-lg bg-background-primary my-2 rounded-[6px] pl-4"
          placeholder="Descrição"
          placeholderTextColor={colors.gray['700']}
          value={transaction.description}
          onChangeText={(text) => setTransactionData("description", text)}
        />
      </View>
    </View>
  );
};