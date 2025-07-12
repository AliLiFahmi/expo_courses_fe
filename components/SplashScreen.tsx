import { View, ActivityIndicator } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <ActivityIndicator size="large" color="#6366F1" />
    </View>
  );
}
