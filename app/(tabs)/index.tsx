import CustomButton from "@/components/CustomButton";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>홈 스크린</Text>
        <CustomButton label='버튼' />
      </View>
    </SafeAreaView>
  );
}
