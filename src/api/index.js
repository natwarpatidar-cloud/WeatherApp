import axiosConfig from '../utils/axiosConfig';

export const getForecastData = async(location) => {    
    try {
        console.log("called");
        const res = await axiosConfig.get(`/forecast.json?key=befd291c110d4c2caa2102755252209&q=${location}&days=4&aqi=no&alerts=no`);
        console.log("Response getForecastData: " + res);
        return res.data;
    } catch (error) {
        console.log("Error in getForecastData: " + error); 
        throw error; 
    }
}