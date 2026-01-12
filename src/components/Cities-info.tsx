import { Cloud, CloudRain, Sun, Wind, CloudSnow, CloudDrizzle, CloudFog } from 'lucide-react';
import { useUnits } from '../hooks/Unite-Content';
import BgToday from '../assets/images/bg-today-large.svg';
import SmToday from '../assets/images/bg-today-small.svg';

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];              
  };
}

interface WeatherDataProps {
  weatherData: WeatherData | null;
  locationName?: string;
}

// Weather code to icon mapping
const getWeatherIcon = (code: number) => {
  if (code === 0) return Sun;
  if (code >= 1 && code <= 3) return Cloud;
  if (code >= 45 && code <= 48) return CloudFog;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 71 && code <= 77) return CloudSnow;
  if (code >= 80 && code <= 99) return CloudDrizzle;
  return Cloud;
};

const CitiesInfo: React.FC<WeatherDataProps> = ({ weatherData, locationName }) => {
  const { convertTemp, convertWind, convertPrecip, getWindUnit, getPrecipUnit } = useUnits();
  
  if (!weatherData) {
    return (
      <div className="w-full md:w-[60%] lg:flex-[3] px-4 sm:px-0">
        <div className="flex items-center justify-center h-64">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  const { current } = weatherData;
  const WeatherIcon = getWeatherIcon(current.weather_code);

  return (
    <div className="w-full md:w-[60%] lg:flex-[3] px-4 sm:px-0">
      
      {/* TOP: Gradient Section - Mobile Background */}
      <div
        className="block sm:hidden rounded-xl p-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${SmToday})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Decorative Sun */}
        <div className="flex flex-col-reverse justify-center items-center gap-3 mb-4">
        <div className="flex flex-col items-center gap-2">
          <WeatherIcon size={60} style={{ color: 'hsl(28, 100%, 52%)' }} />
          <h1 className="text-6xl font-bold text-white">
            {Math.round(convertTemp(current.temperature_2m))}°
          </h1>
        </div>

        {/* Temperature */}
        <div className="text-center">
          <div className="mt-0">
            <h2 className="text-xl font-bold text-white mb-1">
              {locationName || 'Banjul, The Gambia'}
            </h2>
            <p className="text-xs text-gray-300">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* TOP: Gradient Section - Desktop Background */}
      <div
        className="hidden sm:block rounded-2xl lg:rounded-3xl p-6 lg:p-8 relative overflow-hidden"
        style={{
          backgroundImage: `url(${BgToday})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Decorative Sun */}
        <div className="flex flex-row-reverse justify-center items-center gap-4 lg:gap-8 mb-6 lg:mb-8">
        <div className="flex flex-row gap-4 lg:gap-0">
          <WeatherIcon size={60} className="sm:w-20 lg:w-20" style={{ color: 'hsl(28, 100%, 52%)' }} />
          <h1 className="text-7xl lg:text-9xl font-bold text-white">
            {Math.round(convertTemp(current.temperature_2m))}°
          </h1>
        </div>

        {/* Temperature */}
        <div className="text-left">
          <div className="mt-4 lg:mt-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              {locationName || 'Berlin, Germany'}
            </h2>
            <p className="text-base lg:text-lg text-gray-300">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* BOTTOM: Stats Grid (NOT on gradient) */}
      <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {[
          { label: 'Feels Like', value: `${Math.round(convertTemp(current.apparent_temperature))}°`, icon: Cloud },
          { label: 'Humidity', value: `${current.relative_humidity_2m}%`, icon: CloudRain },
          { label: 'Wind', value: `${Math.round(convertWind(current.wind_speed_10m))} ${getWindUnit()}`, icon: Wind },
          { label: 'Precipitation', value: `${convertPrecip(current.precipitation).toFixed(1)} ${getPrecipUnit()}`, icon: CloudRain }
        ].map((stat, index) => (
          <div
            key={index}
            className="rounded-lg sm:rounded-2xl py-2 sm:py-3 px-2 sm:px-3" 
            style={{ backgroundColor: 'hsl(243, 23%, 30%)' }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm text-gray-400">
                {stat.label}
              </span>
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl text-white">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Daily Forecast Section */}
      <div className='mt-4 sm:mt-6'>
        <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'hsl(0, 0%, 100%)' }}>
          Daily forecast
        </h3>

        <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 rounded-2xl mt-3'>
          {weatherData?.daily?.time?.slice(0, 7).map((date, index) => {
            const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
            const DayIcon = getWeatherIcon(weatherData.daily.weather_code[index]);
            return (
              <div 
                key={index}
                className='flex flex-col items-center gap-1 sm:gap-2 lg:gap-3 py-2 sm:py-3 px-2 sm:px-3 rounded-lg sm:rounded-xl transition-all hover:scale-105 cursor-pointer'
                style={{ 
                  backgroundColor: index === 0 ? 'hsl(243, 23%, 30%)' : 'hsl(243, 23%, 25%)'
                }}>
                <span className="text-xs sm:text-sm font-semibold" style={{ color: index === 0 ? 'hsl(0, 0%, 100%)' : 'hsl(240, 6%, 70%)' }}>
                  {dayName}
                </span>
                <DayIcon size={24} className="sm:w-8 lg:w-9" style={{ color: 'hsl(0, 0%, 100%)' }} />
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-base" style={{ color: 'hsl(0, 0%, 100%)' }}>
                    {Math.round(convertTemp(weatherData.daily.temperature_2m_max[index]))}°
                  </span>
                  <span className="text-xs sm:text-base text-gray-400">
                    {Math.round(convertTemp(weatherData.daily.temperature_2m_min[index]))}°
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default CitiesInfo;