import { colors } from "@/constants";
import { MonthYear } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import DateBox from "./DateBox";
import DayOfWeeks from "./DayOfWeeks";

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
  selectedDate: number;
  onPressDate: (date: number) => void;
}

function Calendar({
  monthYear,
  onChangeMonth,
  selectedDate,
  onPressDate,
}: CalendarProps) {
  console.log("[렌더링] -> Calendar ");
  const { month, year, startDate, firstDOW, lastDate } = monthYear;

  return (
    <>
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
      {/* 요일 */}
      <DayOfWeeks />

      {/* 날짜 */}
      <View style={styles.bodyContainer}>
        <FlatList
          // 렌더링할 아이템 배열
          data={Array.from(
            { length: lastDate + firstDOW }, // 날짜는 마지막 날 + 요일. 날짜를 쉽게 표기하기 위해서이다.
            (_, idx) => ({
              id: idx,
              data: idx - firstDOW + 1,
            })
          )}
          renderItem={({ item }) => (
            <DateBox
              date={item.data}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
            />
          )}
          //각 아이템의 고유 키
          keyExtractor={(item) => String(item.id)}
          //열 수
          numColumns={7}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyContainer: {
    backgroundColor: colors.GRAY_100,
  },
});

export default Calendar;
