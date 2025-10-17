import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function PostWriteFooter() {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable
        style={styles.footerIcon}
        onPress={{}}>
        <Ionicons
          name={"camera"}
          size={20}
          color={colors.BLACK}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    flexDirection: "row",
  },
  footerIcon: {
    backgroundColor: colors.GRAY_200,
    padding: 10,
    borderRadius: 5,
  },
});

export default PostWriteFooter;
