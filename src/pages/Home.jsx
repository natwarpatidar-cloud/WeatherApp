import HeroCard from '../components/heroCard/HeroCard';
import weatherImage from '/background.jpeg';
import { useEffect, useState } from 'react';

export default function Home() {
    const [location, setLocation] = useState('');
    
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(`${latitude},${longitude}`);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLocation('Unable to retrieve location.');
                }
            );
        } else {
            setLocation('Geolocation is not supported on this browser.');
        }
    }, []);

    return (
        <div 
            className="min-h-screen w-full bg-cover bg-center p-4 md:p-8 lg:p-12 flex flex-col justify-start items-center gap-10"
            style={{
                backgroundImage: `url(${weatherImage})`, 
            }}
        >
            <HeroCard locationString={location} />
        </div>
    )
}