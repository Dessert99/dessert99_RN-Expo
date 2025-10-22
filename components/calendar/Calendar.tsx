import { colors } from "@/constants";
import { MonthYear } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}

function Calendar({ monthYear, onChangeMonth }: CalendarProps) {
  console.log("[렌더링] -> Calendar ");
  const { month, year } = monthYear;

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => onChangeMonth(-1)}>
        <Ionicons
          name='arrow-back'
          size={25}
          color={colors.BLACK}
        />
      </Pressable>
      <Pressable>
        <Text>
          {year}년 {month}월
        </Text>
      </Pressable>
      <Pressable onPress={() => onChangeMonth(1)}>
        <Ionicons
          name='arrow-forward'
          size={25}
          color={colors.BLACK}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Calendar;
