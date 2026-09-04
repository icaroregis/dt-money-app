import { useAuthContext } from "@/context/auth.context";
import { Text, TouchableOpacity, View } from "react-native";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}