import { colors } from "@/constants";
import { Stack } from "expo-router";

export default function MyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.WHITE, // 배경색
        },
      }}>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
          title: "내 프로필",
        }}
      />
    </Stack>
  );
}
