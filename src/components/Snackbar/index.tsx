import { useSnackbarContext } from "@/context/snackbar.context";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Snackbar = () => {
  const { messageType, message } = useSnackbarContext();

  if (!messageType || !message) {
    return <></>;
  }

  const bgColor = messageType === "SUCCESS" ? "bg-accent-brand-background-primary" : "bg-accent-red-background-primary";

  return (
    <SafeAreaView
      edges={["bottom"]}
      className="absolute inset-x-0 bottom-0 items-center px-4 pb-4"
    >
      <View className={`w-full min-h-[50px] justify-center overflow-hidden rounded-2xl ${bgColor} px-4 py-3`}>
        <Text className="text-base font-bold text-white">{message}</Text>
      </View>
    </SafeAreaView>
  );
};
