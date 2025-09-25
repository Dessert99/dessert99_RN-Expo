import { colors } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "./CustomButton";

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

function FixedBottomCTA({ label, onPress }: FixedBottomCTAProps) {
  const inset = useSafeAreaInsets(); // 짤리는 영역 높이 구하기
  return (
    <View style={[styles.fixed, { paddingBottom: inset.bottom }]}>
      <CustomButton
        label={label}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fixed: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderWidth: StyleSheet.hairlineWidth, // 얇게 테두리
    borderTopColor: colors.GRAY_300,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
});

export default FixedBottomCTA;
