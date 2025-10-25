import Calendar from "@/components/calendar/Calendar";
import { colors } from "@/constants";
import { getMonthYearDetails, getNewMonthYear } from "@/utils/date";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CalendarScreen() {
  const navigation = useNavigation();
  const currentMonthYear = getMonthYearDetails(new Date());
  const [selectedDate, setSelectedDate] = useState(-10);
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  //현재 날짜로 이동
  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  // 월이 +1된 새로운 monthYear를 리턴하는 핸들러
  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(-10); // 달을 바꾸면 초기화
    setMonthYear((prev) => getNewMonthYear(prev, increment));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={moveToToday}>
          <Text>오늘</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Calendar
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={(date: number) => setSelectedDate(date)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
