import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useForm } from "react-hook-form";
import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";
import { newTransactionSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";

export type NewTransactionFormValues = CreateTransactionRequest;

export const NewTransaction = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewTransactionFormValues>({
    defaultValues: {
      description: '',
      typeId: 0,
      categoryId: 0,
      value: 0,
    },
    resolver: yupResolver(newTransactionSchema),
  });

  const { closeBottomSheet } = useBottomSheetContext();
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const onSubmit = async (data: NewTransactionFormValues) => {
    try {
      console.log("new transaction data", data);
      notify({ messageType: "SUCCESS", message: "Transação criada com sucesso!" });
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
      <AppInput
        control={control}
        name="typeId"
        label="TIPO (1 - RECEITA / 2 - DESPESA)"
        placeholder="Informe o tipo"
        leftIconName="swap-horiz"
        keyboardType="number-pad"
      />
      <AppInput
        control={control}
        name="categoryId"
        label="CATEGORIA"
        placeholder="Informe o código da categoria"
        leftIconName="category"
        keyboardType="number-pad"
      />
      <AppInput
        control={control}
        name="value"
        label="VALOR"
        placeholder="0,00"
        leftIconName="payments"
        keyboardType="decimal-pad"
      />

      <View className="w-full mt-8 mb-6">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : "Criar transação"}
        </AppButton>
      </View>
    </View>
  );
};
