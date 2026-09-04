import { FC, useEffect } from "react";
import { colors } from "@/shared/colors";
import { useAuthContext } from "@/context/auth.context";
import { ActivityIndicator, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ILoadingProps {
  setLoading: (loading: boolean) => void;
}

export const Loading: FC<ILoadingProps> = ({ setLoading }) => {
  const { restoreUserSession, handleLogout } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const user = await restoreUserSession();
        if (!user) {
          void handleLogout();
        }
      } catch (error) {
        void handleLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, [restoreUserSession, setLoading]);
  return (
    <SafeAreaView className="bg-background-primary items-center justify-center flex-1">
      <>
        <Image className="h-[48px] w-[255px]" source={require("@/assets/Logo.png")} />
        <ActivityIndicator className="mt-20" color={colors.white} />
      </>
    </SafeAreaView>
  );
}