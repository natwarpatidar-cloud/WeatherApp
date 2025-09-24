import {DayCard} from "../dayCard/DayCard";
import { useEffect, useState } from "react";
import { getForecastData, getFutureData } from "../../api";
import getDayName from "../../utils/getDayName";
import { Loader, Search, X } from 'lucide-react'
import { getMinMax } from "../../utils/getDate";

const minDate = getMinMax(14);
const maxDate = getMinMax(300);

export function HeroCard({ locationString }) {

    const [city, setCity] = useState("");
    const [futureCity, setFutureCity] = useState("");
    const [date, setDate] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [futureData, setFutureData] = useState(null);
    const [validationError, setValidationError] = useState("");

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);
        setValidationError("");
        if (!city.trim()) return;
        if(city.trim().toLowerCase() === weatherData?.location?.name.trim().toLowerCase()) {
            setValidationError("Please Enter a different city");
            return;
        }
        setFetching(true); 
        try {
            const res = await getForecastData(city);
            setWeatherData(res);
            setFutureData(null);
        } catch (error) {
            console.log(error?.response?.data?.error?.message);
            setError(error?.response?.data?.error?.message);
        } finally {
            setFetching(false);
            setValidationError("");
            setCity("");
        }
    };

    const handleDateSubmit = async(e) => {
        e.preventDefault();
        setValidationError("");
        setError(null);
        if (!futureCity.trim() || !date) return;
        if(futureCity.trim().toLowerCase() === futureData?.location?.name.trim().toLowerCase()) {
            setValidationError("Please enter a different city");
            return;
        }

        if(date === futureData?.forecast?.forecastday[0]?.date) {
            setValidationError("Please enter a different date");
            return;
        }

        setFetching(true); 
        try {
            const res = await getFutureData({ location: futureCity, date });
            setFutureData(res);
            setWeatherData(null);
        } catch (error) {
            console.log(error?.response?.data?.error?.message);
            setError(error?.response?.data?.error?.message);
        } finally {
            closeModal();
            setFetching(false);
            setValidationError("");
            setFutureCity("");
            setDate("");
        }
    }

    async function getData() {
        if(weatherData) return;
        setFetching(true); 
        setError(null);
        try {
            const res = await getForecastData(locationString);
            setWeatherData(res);
        } catch (error) {
            console.log("Error in fetching data", error);            
        }finally {
            setFetching(false);
        }
    }

    useEffect(() => {
        if(locationString) {
            getData();
        }
        return () => {}
    }, [locationString]);

    return (
        <>
            {/* Search Bar */}
            <div className='w-full flex justify-center'>
                <div>
                    <form onSubmit={handleSubmit} className="w-2/ flex gap-2 relative">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter a city..."
                            className="w-full py-3 px-5 text-2xl bg-white border-0 rounded-3xl outline-none"
                        />
                        <button type="submit" className="text-white cursor-pointer bg-black/10 p-4 rounded-3xl">
                            <Search className="text-white" />
                        </button>
                    </form>
                </div>
            </div>

            { validationError && (<p className="text-red-500">{validationError}</p>) }

            {/* Future weather */}
            <button className="border border-gray-500 bg-gray-200 py-3 px-4 rounded-2xl cursor-pointer" onClick={openModal}>
                Get Future Data
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Get Weather data by date</h2>
                        <button onClick={closeModal} className="text-gray-500 cursor-pointer hover:text-gray-700">
                            <X />
                        </button>
                    </div>

                    { validationError && (<p className="text-red-500">{validationError}</p>) }

                    <form onSubmit={handleDateSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={futureCity}
                            onChange={(e) => setFutureCity(e.target.value)}
                            placeholder="Enter a city..."
                            className="w-full py-3 px-5 text-2xl border-1 rounded-3xl outline-none"
                        />
                        <label htmlFor="date">
                            <p className="pl-4 text-xs">(Date between 14 days and 300 days from today)</p>
                            <input
                                name="date"
                                type="date"
                                min={minDate}
                                max={maxDate}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Enter a city..."
                                className="w-full py-3 px-5 text-2xl border-1 rounded-3xl outline-none"
                            />
                        </label>

                        <div className="flex justify-end mt-4">
                            <button type="submit" className="cursor-pointer px-4 py-2 bg-black text-white rounded-lg">
                                { fetching ? <Loader className="animate-spin" /> : "Get Weather"}
                            </button> 
                        </div>

                    </form>
                    </div>
                </div>
            )}

            { error && (<p className="text-red-500">{error}</p>) }
            { fetching && <p className="text-black/35 text-xl">Loading...</p> }

            {/* Weather card */}
            <div className="relative h-[400px] w-2/">
                <div className="rounded-3xl h-full shadow-2xl drop-shadow-2xl flex items-center justify-center md:p-8 lg:p-10" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'}}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-4 px-64">
                        {
                            futureData && (
                                <>
                                    <div className="flex-shrink-0">
                                        <img src={futureData?.forecast?.forecastday[0]?.day?.condition?.icon} className="w-[250px]" />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <div className="text-sm md:text-base text-gray-700">{futureData?.forecast?.forecastday[0]?.date}</div>
                                        <div className="text-3xl font-semibold md:text-4xl mb-1">{futureData?.location?.name}</div>
                                        <div className="text-sm md:text-base text-gray-700">Temperature: {futureData?.forecast?.forecastday[0]?.day?.avgtemp_c}°C</div>
                                        <div className="text-sm md:text-base text-gray-700 font-medium">{futureData?.forecast?.forecastday[0]?.day?.condition?.text}</div>
                                    </div>
                                </>
                            )
                        }

                        { 
                            weatherData && (
                                <>
                                    <div className="flex-shrink-0">
                                        <img src={weatherData?.current?.condition?.icon} className="w-[250px]" />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <div className="text-sm md:text-base text-gray-700">Today</div>
                                        <div className="text-3xl font-semibold md:text-4xl mb-1">{weatherData?.location?.name}</div>
                                        <div className="text-sm md:text-base text-gray-700">Temperature: {weatherData?.current?.temp_c}°C</div>
                                        <div className="text-sm md:text-base text-gray-700 font-medium">{weatherData?.current?.condition?.text}</div>
                                    </div>
                                </>
                            )
                        }                        
                    </div>
                </div>

                <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-full px-4">
                    <div className="flex justify-center gap-3 md:gap-4">
                        {
                            weatherData && (
                                weatherData?.forecast?.forecastday?.map((curr) => {
                                    const day = getDayName(curr?.date);
                                    return (
                                        <div key={Date.now()+Math.random()}>
                                            <DayCard temperature={curr?.day?.avgtemp_c} icon={curr?.day?.condition?.icon } day={day} />
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                </div>

            </div>
        </>
    )
}