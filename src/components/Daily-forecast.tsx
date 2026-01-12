import { Cloud, CloudRain, Sun, CloudSnow, CloudDrizzle, CloudFog } from 'lucide-react';

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

const DailyForecast: React.FC<WeatherDataProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { daily } = weatherData;

  const dailyForecast = daily.time.slice(0, 7).map((date, index) => {
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    return {
      day: dayName,
      icon: getWeatherIcon(daily.weather_code[index]),
      high: `${Math.round(daily.temperature_2m_max[index])}°`,
      low: `${Math.round(daily.temperature_2m_min[index])}°`
    };
  });

  return (
    <div 
        className='mt-4 sm:mt-6 px-4 sm:px-0'>

          <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'hsl(0, 0%, 100%)' }}>
            Daily forecast
          </h3>
        {/* <div className="flex items-center justify-between mb-6">
          
        </div> */}

        {/* Days List - 7 Cards in a Row */}
        <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 rounded-2xl mt-3 '>
          {dailyForecast.map((day, index) => {
            const Icon = day.icon;
            return (
              <div 
                key={index}
                className='flex flex-col items-center gap-1 sm:gap-2 lg:gap-3 py-2 sm:py-3 px-2 sm:px-3 rounded-lg sm:rounded-xl transition-all hover:scale-105 cursor-pointer'
                style={{ 
                  backgroundColor: index === 0 ? 'hsl(243, 23%, 30%)' : 'hsl(243, 23%, 25%)'
                }}>
                <span className="text-xs sm:text-sm font-semibold" style={{ color: index === 0 ? 'hsl(0, 0%, 100%)' : 'hsl(240, 6%, 70%)' }}>
                  {day.day}
                </span>
                <Icon size={24} className="sm:w-8 lg:w-9" style={{ color: 'hsl(0, 0%, 100%)' }} />
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <span className="text-xs sm:text-base" style={{ color: 'hsl(0, 0%, 100%)' }}>
                    {day.high}
                  </span>
                  <span className="text-xs sm:text-base text-gray-400">
                    {day.low}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  )
}

export default DailyForecast