import { colors } from "@/constants";
import { Stack } from "expo-router";

export default function CalendarLayout() {
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
          headerShown: true,
          title: "캘린더",
        }}
      />
    </Stack>
  );
}
