import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form";

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
      <AppButton iconName="arrow-forward">Login</AppButton>
    </>
  );
}