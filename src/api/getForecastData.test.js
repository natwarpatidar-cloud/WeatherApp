import { getForecastData } from './';
import axiosConfig from '../utils/axiosConfig';

jest.mock('../utils/axiosConfig');

describe('getForecastData', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch forecast data for a valid location', async () => {
        const mockData = { forecast: 'sample-forecast-data' };
        axiosConfig.get.mockResolvedValue({ data: mockData });

        const result = await getForecastData('London');

        expect(axiosConfig.get).toHaveBeenCalledWith(
            '/forecast.json?key=befd291c110d4c2caa2102755252209&q=London&days=4&aqi=no&alerts=no'
        );
        expect(result).toEqual(mockData);
    });

    it('should return undefined if location is empty string', async () => {
        const result = await getForecastData('');
        expect(result).toBeUndefined();
        expect(axiosConfig.get).not.toHaveBeenCalled();
    });

    it('should return undefined if location is null', async () => {
        const result = await getForecastData(null);
        expect(result).toBeUndefined();
        expect(axiosConfig.get).not.toHaveBeenCalled();
    });

    it('should return undefined if location is undefined', async () => {
        const result = await getForecastData(undefined);
        expect(result).toBeUndefined();
        expect(axiosConfig.get).not.toHaveBeenCalled();
    });

    it('should throw an error if the API call fails', async () => {
        const mockError = {
            response: {
                data: { message: 'City not found' }
            }
        };
        axiosConfig.get.mockRejectedValue(mockError);

        await expect(getForecastData('InvalidCity')).rejects.toEqual(mockError);
        expect(axiosConfig.get).toHaveBeenCalled();
    });
});
