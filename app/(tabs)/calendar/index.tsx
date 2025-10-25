import Calendar from "@/components/calendar/Calendar";
import { colors } from "@/constants";
import { getMonthYearDetails, getNewMonthYear } from "@/utils/date";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function CalendarScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  // 월이 +1된 새로운 monthYear를 리턴하는 핸들러
  const handleUpdateMonth = (increment: number) => {
    setMonthYear((prev) => getNewMonthYear(prev, increment));
  };

  return (
    <View style={styles.container}>
      <Calendar
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
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
