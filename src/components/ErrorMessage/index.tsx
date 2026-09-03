import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { FC, PropsWithChildren } from "react";

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View className="flex-row mt-2 items-center text-start text-base text-red-500">
      <MaterialIcons name="error-outline" size={16} color={colors["accent-red-background-primary"]} />
      <Text className="ml-2 text-accent-red-background-primary">{children}</Text>
    </View>
  );
};