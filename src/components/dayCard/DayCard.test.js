import { DayCard } from "./DayCard";
import { render, screen } from '@testing-library/react';

test("Renders day, icon and temperature", () => {
    render(<DayCard day={"Monday"} temperature={35} icon={"test-icon.png"} />);
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Temperature: 35°C")).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute("src", "test-icon.png");
});