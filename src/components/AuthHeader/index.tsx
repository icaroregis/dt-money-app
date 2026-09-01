import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisable";
import { Image, View } from "react-native";

export const AuthHeader = () => {
  const keyboardVisible = useKeyboardVisible();

  if (keyboardVisible) return null;

  return (
    <View className="flex-row items-center justify-center min-h-40 w-full gap-4">
      <Image source={require("@/assets/Logo.png")} className="h-[48px] w-[255px]" />
    </View>
  );
}