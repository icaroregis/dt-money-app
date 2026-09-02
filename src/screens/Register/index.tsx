import { RegisterForm } from "./RegisterForm";
import { View, ScrollView } from "react-native";
import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";

export const Register = () => {
  return (
    <DismissKeyboardView>
      <ScrollView className="flex-1 w-full" contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 32, paddingVertical: 48, justifyContent: 'center', gap: 64 }}>
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
      </ScrollView>
    </DismissKeyboardView>
  );
};