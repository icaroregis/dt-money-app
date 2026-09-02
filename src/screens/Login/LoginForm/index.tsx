import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginFormValues>();

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@example.com"
        leftIconName="mail-outline"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AppInput
        control={control}
        name="password"
        label="SENHA"
        placeholder="Enter your password"
        leftIconName="lock-outline"
        secureTextEntry
      />
      <View className="w-full flex-1 justify-between gap-4 mt-8 mb-6 min-h-[250px]">
        <AppButton iconName="arrow-forward">Logar</AppButton>
        <View>
          <Text className="text-start text-base text-gray-300 mb-6">Ainda não tem uma conta?</Text>
          <AppButton iconName="arrow-forward" mode="outline">Cadastrar</AppButton>
        </View>
      </View>
    </>
  );
}