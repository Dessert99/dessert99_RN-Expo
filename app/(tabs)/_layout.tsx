import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
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
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"} // 포커스 유무에 따라 아이콘 변경
                size={24}
                color={color} // 이러면 tabBarActiveTintColor 적용
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name='my' // 경로
        options={{
          title: "내 프로필",
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name='setting'
        options={{
          title: "설정",
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "settings-sharp" : "settings-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
