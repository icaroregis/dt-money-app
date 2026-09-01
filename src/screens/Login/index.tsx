
import { LoginForm } from "./LoginForm";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";

export const Login = () => {
  const navigation = useNavigation<any>();

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-full px-8 py-12 justify-center gap-16">
        {/* Logo Placeholder */}
        <View className="flex-row items-center justify-center gap-4">
          <Text className="text-white text-3xl font-bold">DT Money</Text>
        </View>

        {/* Form Container */}
        <View className="w-full gap-[42px]">
          {/* Inputs Container */}
          <View className="w-full gap-5">
            <LoginForm />
          </View>

          {/* Button Logar */}
          <TouchableOpacity
            className="h-[57px] w-full bg-accent-brand rounded-md flex-row items-center justify-center"
            activeOpacity={0.8}
            onPress={() => console.log('Logar')}
          >
            <Text className="text-white text-base font-medium">Logar</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Container */}
        <View className="w-full gap-5 items-center mt-4">
          <Text className="text-gray-300 text-base">Ainda não tem uma conta?</Text>

          <TouchableOpacity
            className="h-[57px] w-full border border-accent-brand rounded-md flex-row items-center justify-center"
            activeOpacity={0.8}
            onPress={() => navigation?.navigate('Register')}
          >
            <Text className="text-accent-brand text-base font-medium">Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboardView>
  );
};