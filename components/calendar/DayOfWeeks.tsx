import { colors } from "@/constants";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const deviceWidth = Dimensions.get("window").width; // 기기 너비를 구할 수 있다.

function DayOfWeeks() {
  return (
    <View style={styles.container}>
      {["일", "월", "화", "수", "목", "금", "토"].map((dayOfWeek, idx) => {
        return (
          <View
            key={idx}
            style={styles.item}>
            <Text
              style={[
                styles.text,
                dayOfWeek === "토" && styles.satturdayText,
                dayOfWeek === "일" && styles.sundayText,
              ]}>
              {dayOfWeek}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  item: {
    width: deviceWidth / 7,
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: colors.BLACK,
  },
  satturdayText: {
    color: colors.BLUE_500,
  },
  sundayText: {
    color: colors.RED_500,
  },
});

export default DayOfWeeks;
