import { Text, View } from "react-native";
import { loginSchema } from "./schema";
import { useForm } from "react-hook-form";
import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  console.log(errors);
  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();
  const onSubmit = () => { }

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
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">Logar</AppButton>
        <View>
          <Text className="text-start text-base text-gray-300 mb-6">Ainda não tem uma conta?</Text>
          <AppButton iconName="arrow-forward" mode="outline" onPress={() => navigation.navigate("Register")}>Cadastrar</AppButton>
        </View>
      </View>
    </>
  );
}