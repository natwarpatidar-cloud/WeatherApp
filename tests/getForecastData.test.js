import { getForecastData } from '../src/api';
import axiosConfig from '../src/utils/axiosConfig';

jest.mock('../src/utils/axiosConfig');

describe('getForecastData', () => {
  const mockData = {
    location: { name: 'Indore' },
    forecast: { forecastday: [] },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return weather data when called with a valid location', async () => {
    axiosConfig.get.mockResolvedValue({
      status: 200,
      data: mockData,
    });

    const response = await getForecastData('Indore');

    expect(axiosConfig.get).toHaveBeenCalledWith(expect.stringContaining('Indore'));
    expect(response).toEqual(mockData);
  });

  it('should not call API if location is empty', async () => {
    const response = await getForecastData('');

    expect(axiosConfig.get).not.toHaveBeenCalled(); // ✅ This should now pass
    expect(response).toBeUndefined();
  });
});
