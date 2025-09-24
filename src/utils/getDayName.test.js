import getDayName from "./getDayName";


test("Returns the name of the day according to the input date string", () => {
    expect(getDayName("2025-09-23")).toBe("Tuesday");
});