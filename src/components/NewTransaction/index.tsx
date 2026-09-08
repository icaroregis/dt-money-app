import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/shared/colors";
import { useForm } from "react-hook-form";
import { newTransactionSchema } from "./schema";
import { AppInput } from "@/components/AppInput";
import { MaterialIcons } from "@expo/vector-icons";
import { AppButton } from "@/components/AppButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategorySelect } from "@/components/CategorySelect";
import { useTransactionStore } from "@/store/transaction.store";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { AppCurrencyInput } from "@/components/AppCurrencyInput";
import { TransactionType } from "@/shared/enums/transaction-type";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { TransactionTypeSelector } from "@/components/TransactionTypeSelector";
import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";

export type NewTransactionFormValues = CreateTransactionRequest;

export const NewTransaction = () => {
  const createTransaction = useTransactionStore((state) => state.createTransaction);
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<NewTransactionFormValues>({
    defaultValues: {
      description: '',
      typeId: undefined as unknown as TransactionType,
      categoryId: undefined as unknown as number,
      value: undefined as unknown as number,
    },
    resolver: yupResolver(newTransactionSchema),
  });

  const { closeBottomSheet } = useBottomSheetContext();
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const onSubmit = async (data: NewTransactionFormValues) => {
    try {
      await createTransaction({
        description: data.description.trim(),
        typeId: data.typeId,
        categoryId: data.categoryId,
        value: data.value,
      });
      notify({ messageType: "SUCCESS", message: "Transação criada com sucesso!" });
      reset();
      setTimeout(() => {
        closeBottomSheet();
      }, 600);
    } catch (error) {
      handleError(error, "Erro ao criar a transação");
    }
  };

  return (
    <View className="px-8 py-5">
      <View className="w-full flex-row items-center justify-between mb-2">
        <Text className="text-white text-xl font-bold">Nova transação</Text>
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
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : "Cadastrar"}
        </AppButton>
      </View>
    </View>
  );
};
