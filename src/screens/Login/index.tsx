
import { View } from "react-native";
import { LoginForm } from "./LoginForm";
import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";

export const Login = () => {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-full px-8 py-12 justify-center gap-16">
        {/* Logo Placeholder */}
        <View className="flex-row items-center justify-center gap-4">
          <AuthHeader />
        </View>

        {/* Form Container */}
        <View className="w-full gap-[42px]">
          {/* Inputs Container */}
          <View className="w-full gap-5">
            <LoginForm />
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
};