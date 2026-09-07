import {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { colors } from '@/shared/colors';
import { TouchableWithoutFeedback, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface BottomSheetContextType {
  openBottomSheet: (content: ReactNode, index: number) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext<BottomSheetContextType>({} as BottomSheetContextType);

export const BottomSheetContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [index, setIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["70%", "80%"];

  const openBottomSheet = useCallback((newContent: ReactNode, index: number) => {
    setIsOpen(true);
    setIndex(index);
    setContent(newContent);
    requestAnimationFrame(() => {
      bottomSheetRef.current?.snapToIndex(index);
    });
  }, []);

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
    setIndex(-1);
    setContent(null);
    bottomSheetRef.current?.snapToIndex(-1);
  }, []);

  const contextValue = useMemo(
    () => ({ openBottomSheet, closeBottomSheet }),
    [openBottomSheet, closeBottomSheet],
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsOpen(false);
    }
    setIndex(index);
  }, []);

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}

      {isOpen && (
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View className='absolute inset-0 bg-black/70 z-1' />
        </TouchableWithoutFeedback>
      )}

      {content && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          style={{ zIndex: 2 }}
          index={index}
          enablePanDownToClose
          onChange={handleSheetChanges}
          backgroundStyle={{
            backgroundColor: colors['background-secondary'],
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            elevation: 9,
          }}
        >
          <BottomSheetScrollView>{content}</BottomSheetScrollView>
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
}

export const useBottomSheetContext = () => useContext(BottomSheetContext);  
