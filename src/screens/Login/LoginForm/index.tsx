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
        label="Email"
        placeholder="mail@example.com"
      />
      <AppInput
        control={control}
        name="password"
        label="Password"
        secureTextEntry={true}
        placeholder="Enter your password"
      />
    </>
  );
}