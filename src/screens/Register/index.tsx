import { View } from "react-native";
import { RegisterForm } from "./RegisterForm";
import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";

export const Register = () => {
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
            <RegisterForm />
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
};