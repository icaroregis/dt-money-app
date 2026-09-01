
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export const Login = () => {
  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();
  return (
    <View className="flex-1 items-center justify-center flex-center">
      <Text className="text-3xl font-bold text-white">Ola brasil Login</Text>

      <TouchableOpacity
        className="bg-#007AFF text-white px-4 py-2 rounded-md"
        activeOpacity={0.8}
        onPress={() => navigation?.navigate('Register')}>
        <Text className="text-2xl font-bold text-white">Register</Text>
      </TouchableOpacity>
    </View>
  );
};