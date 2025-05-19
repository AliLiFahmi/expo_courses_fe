import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Course", headerShown: false }}
      />
      <Stack.Screen name="[id]" options={{ title: "ID", headerShown: false }} />
    </Stack>
  );
}
