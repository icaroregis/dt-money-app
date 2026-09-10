import { FC } from "react";
import { View } from "react-native";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";

interface LeftActionProps {
  onEdit?: () => void;
}

export const LeftAction: FC<LeftActionProps> = ({ onEdit }) => {
  if (!onEdit) return null;

  return (
    <Pressable
      onPress={onEdit}
    >
      <View className="h-full w-[82px] bg-accent-blue-dark items-center justify-center rounded-l-[6px]">
        <MaterialIcons name="edit" size={24} color={colors.white} />
      </View>
    </Pressable>
  );
};
