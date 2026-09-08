import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';
import { TransactionType } from '@/shared/enums/transaction-type';
import { Text, TouchableOpacity, View } from 'react-native';
import { cn } from '@/utils/cn';
import { ErrorMessage } from '../ErrorMessage';

interface TransactionTypeSelectorParams<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export { TransactionType };

export const TransactionTypeSelector = <T extends FieldValues>({
  control,
  name,
  label,
}: TransactionTypeSelectorParams<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const isRevenue = value === TransactionType.REVENUE;
        const isExpense = value === TransactionType.EXPENSE;
        return (
          <View className="w-full mt-4">
            {label && <Text className="mb-2 mt-3 text-base text-gray-500">{label}</Text>}
            <View className="w-full flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onChange(TransactionType.REVENUE)}
                className={cn(
                  "flex-1 flex-row items-center justify-center gap-3 rounded-xl h-button border-[1px]",
                  isRevenue
                    ? "bg-accent-brand/10 border-accent-brand"
                    : "bg-background-tertiary border-transparent"
                )}
              >
                <MaterialIcons
                  name="arrow-upward"
                  size={24}
                  color={isRevenue ? colors['accent-brand'] : colors.gray['700']}
                />
                <Text className={cn("text-base", isRevenue ? "text-accent-brand" : "text-gray-700")}>Entrada</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onChange(TransactionType.EXPENSE)}
                className={cn(
                  "flex-1 flex-row items-center justify-center gap-3 rounded-xl h-button border-[1px]",
                  isExpense
                    ? "bg-accent-red/10 border-accent-red"
                    : "bg-background-tertiary border-transparent"
                )}
              >
                <MaterialIcons
                  name="arrow-downward"
                  size={24}
                  color={isExpense ? colors['accent-red'] : colors.gray['700']}
                />
                <Text className={cn("text-base", isExpense ? "text-accent-red" : "text-gray-700")}>Saída</Text>
              </TouchableOpacity>
            </View>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </View>
        );
      }}
    />
  );
};
