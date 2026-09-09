import { FC, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type AppButtonMode = "fill" | "outline"
type AppButtonTheme = "brand" | "danger"

interface AppButtonParams extends TouchableOpacityProps {
  mode?: AppButtonMode;
  theme?: AppButtonTheme;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export const AppButton: FC<PropsWithChildren<AppButtonParams>> = ({ mode = "fill", theme = "brand", iconName, children, ...rest }) => {
  const isFill = mode === "fill";
  const isBrand = theme === "brand";

  const getBgClass = () => {
    if (!isFill) return "bg-none border-[1px]";
    return isBrand ? "bg-accent-brand" : "bg-accent-red";
  };

  const getBorderClass = () => {
    if (isFill) return "";
    return isBrand ? "border-accent-brand" : "border-accent-red";
  };

  const getTextClass = () => {
    if (isFill) return "text-white";
    return isBrand ? "text-accent-brand" : "text-accent-red";
  };

  const getIconColor = () => {
    if (isFill) return colors.white;
    return isBrand ? colors["accent-brand"] : colors["accent-red"];
  };

  return (
    <TouchableOpacity 
      {...rest} 
      className={cn(
        "w-full rounded-xl px-5 flex-row items-center h-button", 
        iconName ? "justify-between" : "justify-center", 
        getBgClass(),
        getBorderClass()
      )}
    >
      {children && <Text className={cn("text-base font-bold", getTextClass())}>{children}</Text>}
      {iconName && <MaterialIcons name={iconName} size={24} color={getIconColor()} />}
    </TouchableOpacity>
  );
}