import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { NewTransaction } from "../NewTransaction";
import { useAuthContext } from "@/context/auth.context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useBottomSheetContext } from "@/context/bottomSheet.context";

export const AppHeader = () => {
  const { handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <View className="w-full flex-row items-center justify-between gap-4 px-4 py-6 bg-background-primary">
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
        className="bg-accent-brand w-[130px] items-center justify-center rounded-xl h-[50px]"
        onPress={() => {
          openBottomSheet(<NewTransaction />, 0);
        }}
      >
        <Text className="text-white font-bold text-sm">Nova transação</Text>
      </TouchableOpacity>
    </View>
  );
};
