import AuthRoute from "@/components/AuthRoute";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <View>
          <Text>내 정보 스크린</Text>
        </View>
      </SafeAreaView>
    </AuthRoute>
  );
}
