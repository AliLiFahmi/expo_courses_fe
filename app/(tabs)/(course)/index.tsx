import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Second</Text>
      <Pressable
        onPress={() => router.push("/(course)/nested")}
        style={{
          marginTop: 10,
          backgroundColor: "#007AFF",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Pergi ke Halaman Nested</Text>
      </Pressable>
    </View>
  );
}
