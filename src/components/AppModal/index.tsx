import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';
import { cn } from '@/utils/cn';
import { FC, PropsWithChildren } from 'react';

interface AppModalProps extends PropsWithChildren {
  visible: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  animationType?: ModalProps['animationType'];
  containerClassName?: string;
  contentClassName?: string;
}

export const AppModal: FC<AppModalProps> = ({
  visible,
  onClose,
  title,
  showCloseButton = true,
  animationType = 'fade',
  containerClassName,
  contentClassName,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className={cn(
          'flex-1 bg-black/70 items-center justify-center px-6',
          containerClassName,
        )}
      >
        <View
                  className={cn(
                    'w-full max-h-[80%] bg-background-secondary rounded-2xl overflow-hidden',
                    contentClassName,
                  )}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={(e) => e.stopPropagation()}
                    className="w-full h-full flex-col"
                  >
                    {(title || showCloseButton) && (
                      <View className="px-6 py-5 flex-row items-center justify-between border-b-[1px] border-gray-600 flex-shrink-0">
                        <View className="flex-row items-center gap-2 flex-1 pr-3">
                          {title ? (
                            <Text className="text-white text-xl font-bold flex-1">
                              {title}
                            </Text>
                          ) : (
                            <View className="flex-1" />
                          )}
                        </View>
                        {showCloseButton && (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            hitSlop={{
                              top: 12,
                              bottom: 12,
                              left: 12,
                              right: 12,
                            }}
                            onPress={onClose}
                            className="w-9 h-9 items-center justify-center rounded-full bg-background-tertiary flex-shrink-0"
                          >
                            <MaterialIcons
                              name="close"
                              size={20}
                              color={colors.gray['500']}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                    <View className="flex-shrink min-h-0">
                      {children}
                    </View>
                  </TouchableOpacity>
                </View>
      </TouchableOpacity>
    </Modal>
  );
};
