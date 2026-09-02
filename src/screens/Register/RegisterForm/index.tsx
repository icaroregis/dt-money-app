import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { registerSchema } from "./schema";
import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
  });
  console.log(errors);
  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();
  const onSubmit = () => { }

  return (
    <>
      <AppInput
        control={control}
        name="name"
        label="NOME"
        placeholder="Seu nome completo"
        leftIconName="person-outline"
        autoCapitalize="words"
      />
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@exemplo.br"
        leftIconName="mail-outline"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AppInput
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />
      <AppInput
        control={control}
        name="confirmPassword"
        label="SENHA"
        placeholder="Confirme sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />
      <View className="w-full flex-1 justify-between gap-4 mt-8 mb-6 min-h-[250px]">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward" >Cadastrar</AppButton>
        <View>
          <Text className="text-start text-base text-gray-300 mb-6">Já tem uma conta?</Text>
          <AppButton iconName="arrow-forward" mode="outline" onPress={() => navigation.goBack()}>Acessar</AppButton>
        </View>
      </View>
    </>
  );
}