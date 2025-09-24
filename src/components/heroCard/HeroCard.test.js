import { fireEvent, render, screen } from '@testing-library/react';
import * as api from "../../api";
import { HeroCard } from './HeroCard';
import { act } from 'react';

jest.mock('../../api');

const mockWeatherData = {
    location: { name: "Indore" },
    current: {
        condition: { text: 'Cloudy' },
        temp_c: 20
    },
    forecast: { 
        forecastday: [
            { date: "2025-09-23", day: { avgtemp_c: 20, condition: { icon: "icon.png" } } }
        ]
    }
};

test("Fetches and renders the weather data", async () => {
    api.getForecastData.mockResolvedValue(mockWeatherData);

    render(<HeroCard locationString={"Indore"} />);

    expect(await screen.findByText("Indore")).toBeInTheDocument();
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
});

test("Changes the input", async() => {
    render(<HeroCard locationString={" "} />);

    const cityInput = screen.getByPlaceholderText("Enter a city...");

    await act( async () => {
        fireEvent.change(cityInput, { target: { value: "Paris" } });
    })

    expect(cityInput.value).toBe("Paris");
});
