import AuthRoute from "@/components/AuthRoute";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <View>
          <Text>캘린더</Text>
        </View>
      </SafeAreaView>
    </AuthRoute>
  );
}
