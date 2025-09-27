import { router, useFocusEffect } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  //화면이 포커스 되었을 때 작업 수행
  useFocusEffect(() => {
    router.replace("/auth");
  });
  return (
    <SafeAreaView>
      <View>
        <Text>내 정보 스크린</Text>
      </View>
    </SafeAreaView>
  );
}
