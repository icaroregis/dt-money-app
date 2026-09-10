import { FC } from "react";
import { View } from "react-native";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";

interface RightActionProps {
  onDelete?: () => void;
}

export const RightAction: FC<RightActionProps> = ({ onDelete }) => {
  if (!onDelete) return null;

  return (
    <Pressable
      onPress={onDelete}
    >
      <View className="h-full w-[81px] bg-accent-red-background-primary items-center justify-center rounded-r-[6px]">
        <MaterialIcons name="delete" size={24} color={colors.white} />
      </View>
    </Pressable>
  );
};
