import AuthRoute from "@/components/AuthRoute";
import { useAuth } from "@/hooks/queries/useAuth";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  const { logout } = useAuth();
  return (
    <AuthRoute>
      <SafeAreaView>
        <View>
          <Text onPress={logout}>로그아웃</Text>
        </View>
      </SafeAreaView>
    </AuthRoute>
  );
}
