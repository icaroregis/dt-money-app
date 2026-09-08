import { useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { colors } from '@/shared/colors';
import { ErrorMessage } from '../ErrorMessage';
import { MaterialIcons } from '@expo/vector-icons';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface AppCurrencyInputParams<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}

const toCurrencyString = (valueInCents: number) => {
  const value = Number.isFinite(valueInCents) ? valueInCents / 100 : 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
};

const parseCurrencyToCents = (raw: string) => {
  const digits = raw.replace(/\D+/g, '');
  if (!digits) return 0;
  return Number(digits);
};

const parseCurrencyToReais = (raw: string) => {
  const cents = parseCurrencyToCents(raw);
  return Number((cents / 100).toFixed(2));
};

export const AppCurrencyInput = <T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  ...rest
}: AppCurrencyInputParams<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const numericValue = typeof value === 'number' && Number.isFinite(value) ? Math.round(value * 100) : 0;
        const displayed = toCurrencyString(numericValue);
        return (
          <View className="w-full mt-4">
            {label && <Text className={cn("mb-2 mt-3 text-base", isFocused ? "text-accent-brand" : "text-gray-500")}>{label}</Text>}
            <TouchableOpacity
              className={cn(
                "flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2 h-16",
                isFocused && "border-accent-brand"
              )}
              activeOpacity={1}
              onPress={() => inputRef.current?.focus()}
            >
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  size={24}
                  color={isFocused ? colors['accent-brand'] : colors.gray["600"]}
                  className="mr-2"
                />
              )}
              <TextInput
                value={displayed}
                onChangeText={(next) => onChange(parseCurrencyToReais(next))}
                placeholderTextColor={colors.gray["700"]}
                className={cn(
                  "flex-1 text-base text-white",
                  rest.className
                )}
                {...rest}
                keyboardType="decimal-pad"
                ref={inputRef}
                onFocus={checkFocus}
                onBlur={checkFocus}
              />
            </TouchableOpacity>
            {error && (
              <ErrorMessage>
                {error.message}
              </ErrorMessage>
            )}
          </View>
        );
      }}
    />
  );
};
