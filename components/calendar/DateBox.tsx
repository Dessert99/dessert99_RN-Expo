import { colors } from "@/constants";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

interface DateBoxProps {
  date: number;
}

const deviceWidth = Dimensions.get("window").width;

function DateBox({ date }: DateBoxProps) {
  return (
    <Pressable style={styles.container}>
      <View style={styles.dateContainer}>
        {date > 0 && <Text style={styles.dateText}>{date}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    backgroundColor: colors.GRAY_200,
    width: 28,
    height: 28,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  dateText: {
    fontSize: 16,
    color: colors.BLACK,
  },
});

export default DateBox;
