import axiosConfig from '../utils/axiosConfig';

export const getForecastData = async(location) => {    
    try {
        if(!location || location == '' || location == null || location == undefined) return;
        const res = await axiosConfig.get(`/forecast.json?key=befd291c110d4c2caa2102755252209&q=${location}&days=4&aqi=no&alerts=no`);
        console.log("Response getForecastData: ", res);
        return res.data;
    } catch (error) {
        console.log("Error in getForecastData: ", error?.response?.data); 
        throw error; 
    }
};

export const getFutureData = async function ({ location, date }) {
    try {
        if(!location || location == '' || location == null || location == undefined || !date) return;
        const res = await axiosConfig.get(`/future.json?key=befd291c110d4c2caa2102755252209&q=${location}&dt=${date}`);
        console.log("Response getFutureData: ", res);
        return res.data;
    } catch (error) {
        console.log("Error in getFutureData: ", error?.response?.data); 
        throw error;
    }
}