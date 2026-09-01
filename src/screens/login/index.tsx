
import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const Login = () => {
  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();
  return (
    <DismissKeyboardView>
      <Text className="text-3xl font-bold text-white">Ola brasil Login</Text>
      <TextInput className="w-96 h-12 bg-gray-500 text-center rounded-md" placeholder="Email" />
      <TextInput className="w-96 h-12 bg-gray-500 text-center rounded-md" placeholder="Password" />
      <TouchableOpacity
        className="bg-#007AFF text-white px-4 py-2 rounded-md"
        activeOpacity={0.8}
        onPress={() => navigation?.navigate('Register')}>
        <Text className="text-2xl font-bold text-white">Register</Text>
      </TouchableOpacity>
    </DismissKeyboardView>
  );
};