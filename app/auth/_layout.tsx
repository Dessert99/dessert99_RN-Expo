import { colors } from "@/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Stack } from "expo-router";

export default function AuthLaytout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK, // 로그인 스택 헤더 텍스트 색상 통일
        contentStyle: {
          backgroundColor: colors.WHITE, // 로그인 스택 스크린 배경색 통일
        },
      }}>
      <Stack.Screen
        name='index'
        options={{
          title: "로그인",
          headerShown: true,
          headerLeft: () => (
            //Link로 경로 이동, replace로 스크린이 쌓이는게 아니라 대체되도록
            <Link
              href={"/"}
              replace>
              <MaterialCommunityIcons
                name='home-group'
                size={28}
                color='black'
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name='login'
        options={{
          title: "이메일 로그인",
          headerShown: true,
          headerBackButtonDisplayMode: "minimal", // 헤더 백버튼 없애기
        }}
      />
      <Stack.Screen
        name='signup'
        options={{
          title: "회원가입",
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
