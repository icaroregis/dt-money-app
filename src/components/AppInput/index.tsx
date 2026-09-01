import { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}

export const AppInput = <T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  ...rest
}: AppInputParams<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(rest.secureTextEntry);
  const inputRef = useRef<TextInput>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
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
              value={value}
              onChangeText={onChange}
              placeholderTextColor={colors.gray["700"]}
              className={cn(
                "flex-1 text-base text-white",
                rest.className
              )}
              {...rest}
              secureTextEntry={secureTextEntry}
              ref={inputRef}
              onFocus={checkFocus}
              onBlur={checkFocus}
            />
            {rest.secureTextEntry && (
              <TouchableOpacity
                className="flex-row items-center justify-between"
                activeOpacity={1}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <MaterialIcons
                  name={secureTextEntry ? "visibility-off" : "visibility"}
                  size={24}
                  color={isFocused ? colors['accent-brand'] : colors.gray["600"]}
                  className="ml-2"
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      )}
    />
  );
}