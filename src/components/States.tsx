import { Cloud, CloudRain, Wind } from 'lucide-react';

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

const States: React.FC<WeatherDataProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { current } = weatherData;

  const stats = [
    { label: 'Feels Like', value: `${Math.round(current.apparent_temperature)}°`, icon: Cloud },
    { label: 'Humidity', value: `${current.relative_humidity_2m}%`, icon: CloudRain },
    { label: 'Wind', value: `${Math.round(current.wind_speed_10m)} mph`, icon: Wind },
    { label: 'Precipitation', value: `${current.precipitation} mm`, icon: CloudRain }
  ];

  return (
     <div className="mt-6 grid grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          // const Icon = stat.icon;
          return (
            <div
              key={index}
              className="rounded-2xl py-3 px-3" style={{ backgroundColor: 'hsl(243, 23%, 30%)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">
                  {stat.label}
                </span>
                {/* <Icon size={20} className="text-gray-400" /> */}
              </div>
              <div className="text-3xl text-white">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>
  )
}

export default States