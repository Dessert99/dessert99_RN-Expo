import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ImageZoomScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: inset.top + 10 }]}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}>
        <Feather
          name='arrow-left'
          size={30}
          color={"white"}
        />
      </Pressable>
      <Image
        source={{ uri }}
        resizeMode='contain'
        style={{ width: Dimensions.get("window").width, height: "100%" }} // Dimensions로 현재 기기의 너비를 알 수 있다.
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 15,
    zIndex: 1,
    backgroundColor: colors.BLACK,
    borderRadius: 20,
  },
});
