import DayCard from "../dayCard/DayCard";
import { useEffect, useState } from "react";
import { getForecastData } from "../../api";
import getDayName from "../../utils/getDayName";


export default function HeroCard({ locationString }) {

    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setFetching(true)
        if (!city.trim()) return; 
        try {
            const res = await getForecastData(city);
            setWeatherData(res);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setFetching(false);
        }
    };

    async function getData() {
        try {
            const res = await getForecastData(locationString);
            setWeatherData(res);
        } catch (error) {
            console.log("Error in fetching data", error);            
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
                    <form onSubmit={handleSubmit} className="w-2/">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter a City..."
                            className="w-full py-3 px-5 text-2xl bg-white border-0 rounded-3xl outline-none"
                        />
                    </form>
                </div>
            </div>

            {/* Weather card */}
            <div className="relative h-[400px] w-2/">
            
                <div className="rounded-3xl h-full shadow-2xl drop-shadow-2xl flex items-center justify-center md:p-8 lg:p-10" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'}}>
                
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-4 px-64">
                        { error && (<p className="text-red-500">{error}</p>) }
                        { fetching && <p className="text-black/35">Loading...</p> }
                        { 
                            weatherData && (
                                <>
                                    <div className="flex-shrink-0">
                                        <img src={weatherData?.current?.condition?.icon} className="w-[250px]" />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <div className="text-sm md:text-base text-gray-700">Today</div>
                                        <div className="text-3xl font-semibold md:text-4xl mb-1">{weatherData?.location?.name}</div>
                                        <div className="text-sm md:text-base text-gray-700">Temperature: {weatherData?.current?.temp_c}&deg;C</div>
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