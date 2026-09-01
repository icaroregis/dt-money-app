import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboardVisible = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardVisible = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const keyboardHidden = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      keyboardVisible.remove();
      keyboardHidden.remove();
    }
  }, []);

  return keyboardVisible
}