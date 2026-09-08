import { useCallback, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
} from 'react-hook-form';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';
import { cn } from '@/utils/cn';
import { ErrorMessage } from '../ErrorMessage';
import { AppModal } from '../AppModal';
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response';
import { useTransactionStore } from '@/store/transaction.store';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

interface CategorySelectParams<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
}

export const CategorySelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Selecione uma categoria',
}: CategorySelectParams<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { categories, fetchCategories } = useTransactionStore();
  const { handleError } = useErrorHandler();

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetchCategories();
    } catch (error) {
      handleError(error, 'Erro ao carregar categorias');
    } finally {
      setIsLoading(false);
    }
  }, [fetchCategories, handleError]);

  useEffect(() => {
    if (categories.length === 0) {
      loadCategories();
    }
  }, [categories.length, loadCategories]);

  const getSelectedCategory = (
    selectedId: number | undefined | null,
  ): TransactionCategory | undefined => {
    if (!selectedId) return undefined;
    return categories.find((c) => c.id === selectedId);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selected = getSelectedCategory(value as number);
        return (
          <View className="w-full mt-4">
            {label && (
              <Text
                className={cn(
                  'mb-2 mt-3 text-base',
                  isOpen ? 'text-accent-brand' : 'text-gray-500',
                )}
              >
                {label}
              </Text>
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsOpen(true)}
              className={cn(
                'flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2 h-16',
                isOpen && 'border-accent-brand',
              )}
            >
              <View className="flex-row items-center flex-1">
                <MaterialIcons
                  name="category"
                  size={24}
                  color={isOpen ? colors['accent-brand'] : colors.gray['600']}
                  className="mr-2"
                />
                <Text
                  className={cn(
                    'flex-1 text-base',
                    selected ? 'text-white' : 'text-gray-700',
                  )}
                >
                  {selected ? selected.name : placeholder}
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color={isOpen ? colors['accent-brand'] : colors.gray['600']}
              />
            </TouchableOpacity>

            {error && <ErrorMessage>{error.message}</ErrorMessage>}

            <AppModal
              visible={isOpen}
              onClose={() => setIsOpen(false)}
              title="Categorias"
            >
              <FlatList
                data={categories}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  flexGrow: 1,
                }}
                ItemSeparatorComponent={() => (
                  <View className="h-2" />
                )}
                ListEmptyComponent={
                  <View className="py-12 items-center px-4">
                    <MaterialIcons
                      name={isLoading ? 'hourglass-empty' : 'error-outline'}
                      size={40}
                      color={colors.gray['700']}
                    />
                    <Text className="text-gray-700 mt-3 text-base text-center">
                      {isLoading
                        ? 'Carregando categorias...'
                        : 'Não foi possível carregar as categorias'}
                    </Text>
                    {!isLoading && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={loadCategories}
                        className="mt-6 px-5 py-3 rounded-xl bg-accent-brand/10 border-[1px] border-accent-brand"
                      >
                        <Text className="text-accent-brand font-bold text-base">
                          Tentar novamente
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                }
                renderItem={({ item }) => {
                  const isSelected = selected?.id === item.id;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        onChange(item.id);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'flex-row items-center justify-between px-5 py-4 rounded-xl border-[1px]',
                        isSelected
                          ? 'bg-accent-brand/10 border-accent-brand'
                          : 'bg-background-tertiary border-transparent',
                      )}
                    >
                      <Text
                        className={cn(
                          'text-base',
                          isSelected
                            ? 'text-accent-brand font-bold'
                            : 'text-gray-500',
                        )}
                      >
                        {item.name}
                      </Text>
                      {isSelected && (
                        <MaterialIcons
                          name="check"
                          size={20}
                          color={colors['accent-brand']}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </AppModal>
          </View>
        );
      }}
    />
  );
};
