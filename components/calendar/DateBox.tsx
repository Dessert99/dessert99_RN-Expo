import { colors } from "@/constants";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

interface DateBoxProps {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void; //TODO: 전역 상태로 변경
}

const deviceWidth = Dimensions.get("window").width;

function DateBox({ date, selectedDate, onPressDate }: DateBoxProps) {
  //TODO: 렌더링 최적화
  return (
    <Pressable
      style={styles.container}
      onPress={() => onPressDate(date)}>
      <View
        style={[
          styles.dateContainer,
          selectedDate === date && styles.selectedContainer,
        ]}>
        {date > 0 && (
          <Text
            style={[
              styles.dateText,
              selectedDate === date && styles.selectedText,
            ]}>
            {date}
          </Text>
        )}
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
  selectedContainer: {
    backgroundColor: colors.ORANGE_600,
  },
  selectedText: {
    color: colors.WHITE,
  },
});

export default DateBox;
