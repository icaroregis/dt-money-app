import { FC } from "react";
import { Text, View } from "react-native";
import { AppModal } from "@/components/AppModal";
import { AppButton } from "@/components/AppButton";

interface DeleteTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeleteTransactionModal: FC<DeleteTransactionModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <AppModal
      visible={visible}
      onClose={onClose}
      title="Excluir transação"
      showCloseButton
      animationType="fade"
    >
      <View className="gap-6">
        <Text className="text-gray-300 text-base font-normal">
          Tem certeza que deseja excluir esta transação? Essa ação não poderá ser desfeita.
        </Text>

        <View className="flex-row gap-4">
          <View className="flex-1">
            <AppButton
              mode="outline"
              theme="brand"
              onPress={onClose}
              disabled={isLoading}
            >
              Cancelar
            </AppButton>
          </View>
          <View className="flex-1">
            <AppButton
              mode="fill"
              theme="danger"
              onPress={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Excluindo..." : "Excluir"}
            </AppButton>
          </View>
        </View>
      </View>
    </AppModal>
  );
};
