import { FC, PropsWithChildren } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const DismissKeyboardView: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  return (
    // SafeAreaView: Evita que o conteúdo fique escondido debaixo da barra de status (hora/bateria) no topo, ou da barra de navegação embaixo, especialmente em celulares com "notch" (recorte da câmera).
    <SafeAreaView className="flex-1 bg-background-primary">
      {/* TouchableWithoutFeedback: Envolve a tela para detectar cliques. Quando o usuário clica em qualquer espaço vazio (fora do teclado), nós podemos chamar a função "Keyboard.dismiss()" para esconder o teclado. */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {/* KeyboardAvoidingView: Empurra a tela para cima automaticamente quando o teclado do celular abre, garantindo que os inputs de texto não fiquem escondidos atrás do teclado. */}
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          {/* ScrollView: Permite que o usuário scroll na tela, se a tela for maior que a altura da tela. */}
          <ScrollView>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}