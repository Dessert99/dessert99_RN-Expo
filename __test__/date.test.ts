import { getMonthYearDetails } from "@/utils/date";

describe("getMonthYearDetails", () => {
  it("2025-03-15", () => {
    const d = new Date(2025, 2, 15); // 0=Jan → 2=Mar
    const { month, year, firstDOW } = getMonthYearDetails(d);

    expect(month).toBe(3); // ← 1-based
    expect(year).toBe(2025);
    expect(firstDOW).toBe(new Date(2025, 2, 1).getDay());
  });

  it("윤년 2024-02-10", () => {
    const d = new Date(2024, 1, 10); // 2월
    const { month, year, firstDOW } = getMonthYearDetails(d);

    expect(month).toBe(2); // ← 1-based
    expect(year).toBe(2024);
    expect(firstDOW).toBe(new Date(2024, 1, 1).getDay());
  });
});
