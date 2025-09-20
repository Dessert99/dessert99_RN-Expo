import { colors } from "@/constants";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.ORANGE_600, // 탭 버튼 색
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "홈",
        }}
      />
      <Tabs.Screen
        name='my' // 경로
        options={{
          title: "내 프로필",
        }}
      />
      <Tabs.Screen
        name='setting'
        options={{
          title: "설정",
        }}
      />
    </Tabs>
  );
}
