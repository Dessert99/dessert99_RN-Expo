import CustomButton from "@/components/CustomButton";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomButton label='바텀 시트 열기' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
