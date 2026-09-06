import { useAuthContext } from "@/context/auth.context";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

type AppHeaderProps = {
  onNewTransactionPress?: () => void;
};

export const AppHeader = ({ onNewTransactionPress }: AppHeaderProps) => {
  const { handleLogout } = useAuthContext();
  const isNewTransactionDisabled = !onNewTransactionPress;

  return (
    <View className="w-full flex-row items-center justify-between gap-4 px-4 py-6">
      <View className="flex-1 gap-2">
        <Image
          source={require("@/assets/Logo.png")}
          className="h-[30px] w-[130px]"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          className="self-start flex-row items-center gap-1"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={16} color={colors.gray["700"]} />
          <Text className="font-roboto text-[12px] font-normal leading-[19px] text-gray-700">
            Sair da conta
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        accessibilityRole="button"
        className="h-10 shrink-0 items-center justify-center rounded-[6px] bg-accent-brand px-4 disabled:opacity-60"
        disabled={isNewTransactionDisabled}
        onPress={onNewTransactionPress}
      >
        <Text className="font-roboto text-[14px] font-bold leading-[22px] text-white">
          Nova transação
        </Text>
      </TouchableOpacity>
    </View>
  );
};
