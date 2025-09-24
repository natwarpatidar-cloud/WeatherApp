import getDayName from "../src/utils/getDayName";


it("Returns the name of the day according to the input date string", () => {
    expect(getDayName("2025-09-23")).toBe("Tuesday");
});