import { AppHeader } from "@/components/AppHeader";
import { ScrollView, Text, View } from "react-native";

export const ListHeader = () => {
  return (
    <>
      <AppHeader />
      <View className="w-full h-[150]">
        <View className="h-[50] bg-background-primary" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="absolute pl-6 h-[141]">

        </ScrollView>
      </View>
    </>
  );
};