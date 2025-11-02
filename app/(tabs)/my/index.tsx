import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function MyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: "https://blog.naver.com/lsjh1234/223862185287",
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
