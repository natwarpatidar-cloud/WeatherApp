import { render, waitFor } from '@testing-library/react';
import { Home } from './Home'

beforeAll(() => {
    navigator.geolocation = {
        getCurrentPosition: jest.fn(success => {
            success({ coords: { latitude: 23.3242534, longitude: 28.373234 } });
        })
    }
})

test("Should render the home properly", async() => {
    render(<Home />);
});