import { FC, PropsWithChildren } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { cn } from "@/utils/cn";
import { colors } from "@/shared/colors";

type AppButtonMode = "fill" | "outline"

interface AppButtonParams extends TouchableOpacityProps {
  mode?: AppButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export const AppButton: FC<PropsWithChildren<AppButtonParams>> = ({ mode = "fill", iconName, children, ...rest }) => {
  const isFill = mode === "fill";
  return (
    <TouchableOpacity {...rest} className={cn("w-full rounded-xl px-5 flex-row items-center h-button", iconName ? "justify-between" : "justify-center", isFill ? "bg-accent-brand" : "bg-none border-[1px] border-accent-brand")}>
      {children && <Text className={cn("text-base", isFill ? "text-white" : "text-accent-brand")}>{children}</Text>}
      {iconName && <MaterialIcons name={iconName} size={24} color={isFill ? colors.white : colors["accent-brand"]} />}
    </TouchableOpacity>
  );
}