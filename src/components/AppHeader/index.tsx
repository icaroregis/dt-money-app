import { Image } from "react-native";
import { Text, View } from "react-native";

export const AppHeader = () => {
  return (
    <View className="w-full flex justify-between items-center px-4 py-2">
      <Image source={require("@/assets/Logo.png")} className="h-[48px] w-[255px]" />
    </View>
  );
}