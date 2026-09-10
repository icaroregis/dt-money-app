import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/shared/colors";
import { useForm } from "react-hook-form";
import { editTransactionSchema } from "./schema";
import { AppInput } from "@/components/AppInput";
import { MaterialIcons } from "@expo/vector-icons";
import { AppButton } from "@/components/AppButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategorySelect } from "@/components/CategorySelect";
import { useTransactionStore } from "@/store/transaction.store";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { AppCurrencyInput } from "@/components/AppCurrencyInput";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { TransactionTypeSelector } from "@/components/TransactionTypeSelector";
import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { TransactionResponse } from "@/shared/interfaces/https/transaction-response";

export type EditTransactionFormValues = CreateTransactionRequest;

interface EditTransactionProps {
  transaction: TransactionResponse;
}

export const EditTransaction = ({ transaction }: EditTransactionProps) => {
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<EditTransactionFormValues>({
    defaultValues: {
      description: transaction.description,
      typeId: transaction.typeId,
      categoryId: transaction.categoryId,
      value: transaction.value,
    },
    resolver: yupResolver(editTransactionSchema),
  });

  const { closeBottomSheet } = useBottomSheetContext();
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const onSubmit = async (data: EditTransactionFormValues) => {
    try {
      await updateTransaction(transaction.id, {
        description: data.description.trim(),
        typeId: data.typeId,
        categoryId: data.categoryId,
        value: data.value,
      });
      notify({ messageType: "SUCCESS", message: "Transação atualizada com sucesso!" });
      setTimeout(() => {
        closeBottomSheet();
      }, 600);
    } catch (error) {
      handleError(error, "Erro ao atualizar a transação");
    }
  };

  return (
    <View className="px-8 py-5">
      <View className="w-full flex-row items-center justify-between mb-2">
        <Text className="text-white text-xl font-bold">Editar transação</Text>
        <TouchableOpacity onPress={closeBottomSheet} activeOpacity={0.7} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <MaterialIcons name='close' size={20} color={colors.gray['700']} />
        </TouchableOpacity>
      </View>

      <AppInput
        control={control}
        name="description"
        label="DESCRIÇÃO"
        placeholder="Ex: Almoço no restaurante"
        leftIconName="description"
      />
      <AppCurrencyInput
        control={control}
        name="value"
        label="PREÇO"
        placeholder="R$ 0,00"
        leftIconName="payments"
      />
      <CategorySelect
        control={control}
        name="categoryId"
        label="CATEGORIA"
        placeholder="Selecione uma categoria"
      />
      <TransactionTypeSelector
        control={control}
        name="typeId"
        label="TIPO"
      />

      <View className="w-full mt-8 mb-6">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="save">
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : "Salvar alterações"}
        </AppButton>
      </View>
    </View>
  );
};
