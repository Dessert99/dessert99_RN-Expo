export type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  firstDOW: number;
  lastDate: number;
};

// 현재 날짜를 기반으로 연/월 을 반환하는 함수
export function getMonthYearDetails(initialDate: Date): MonthYear {
  const month = initialDate.getMonth() + 1; // 월 추출
  const year = initialDate.getFullYear(); // 년도 추출
  const startDate = new Date(`${year}-${month}`); // 해당 월 시작일이 몇 요일인지 파악하기 위해
  const firstDOW = startDate.getDay(); // 0(일요일) ~ 6(토요일)
  const lastDate = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 1,
    0
  ).getDate(); // 해당 월이 몇 일까지 있는지
  return { month, year, startDate, firstDOW, lastDate };
}

/*
const startDate = new Date("2025-10");
console.log(startDate); -> 2025년 10월 1일 00:00:00 UTC 객체 파싱된다.

new Date(2025, 10, 0)은 로컬 시간(한국/KST 가정) 기준 2025-11-31 00:00:00을 가리키는 Date 객체이다.
세 번째 인자로 0을 넣으면 해당 월의 마지막 일로 계산된다.
*/

//증감을 인자로 받고 +1 혹은 -1하여 새로운 날짜를 반환한다.
export function getNewMonthYear(prevData: MonthYear, increment: number) {
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment)
  );

  return getMonthYearDetails(newMonthYear);
}
