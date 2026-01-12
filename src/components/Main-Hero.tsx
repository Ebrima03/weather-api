import { useWeatherData } from '../hooks/useWeatherData';
import CitiesInfo from "./Cities-info";
import CitiesDaysInfo from "./Cities-Days-info";

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

interface MainHeroProps {
  location: Location;
}

const MainHero: React.FC<MainHeroProps> = ({ location }) => {
  const { weatherData, loading, error } = useWeatherData(location.latitude, location.longitude);

  if (loading) {
    return (
      <div className='container mx-auto flex flex-col gap-4 sm:gap-6 py-4 sm:py-8 px-4 sm:px-0'>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white text-lg sm:text-xl">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 py-4 sm:py-8 px-4 sm:px-0'>
      {error && (
        <div className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-900 border border-yellow-700 rounded-lg px-4 py-2 z-50'>
          <p className="text-yellow-200 text-xs sm:text-sm">{error}</p>
        </div>
      )}
      
      <CitiesInfo weatherData={weatherData} locationName={location.name} />
      <div className='w-full lg:w-auto order-2 lg:order-1'>
        <CitiesDaysInfo weatherData={weatherData} />
      </div>
    </div>
  )
}

export default MainHero;