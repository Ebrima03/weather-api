import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, CloudDrizzle, CloudFog } from 'lucide-react';
import { useUnits } from '../hooks/Unite-Content';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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

const CitiesDaysInfo: React.FC<WeatherDataProps> = ({ weatherData }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAllHours, setShowAllHours] = useState(false);
  const hourlyLimit = 8;
  const { convertTemp } = useUnits();

  useEffect(() => {
    setShowAllHours(false);
  }, [selectedDay]);
  
  if (!weatherData) {
    return (
      <div className='flex flex-col gap-4 sm:gap-6 w-full lg:w-[40%]'>
        <div className="flex items-center justify-center h-64">
          <p className="text-white text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    );
  }

  const { hourly } = weatherData;
  
  // Calculate which hours to show based on selected day
  const hoursPerDay = 24;
  const startHour = selectedDay * hoursPerDay;
  const endHour = startHour + hoursPerDay;
  
  const hourlyForecast = hourly.time.slice(startHour, endHour).map((time, index) => {
    const hour = new Date(time).getHours();
    const displayHour = hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : hour === 0 ? '12 AM' : `${hour} AM`;
    
    return {
      time: displayHour,
      icon: getWeatherIcon(hourly.weather_code[startHour + index]),
      temp: `${Math.round(convertTemp(hourly.temperature_2m[startHour + index]))}°`
    };
  });

  const visibleHours = showAllHours ? hourlyForecast : hourlyForecast.slice(0, hourlyLimit);

  // Get day names for the dropdown
  const getDayName = (dayIndex: number) => {
    const date = new Date();
    date.setDate(date.getDate() + dayIndex);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className='flex flex-col gap-4 sm:gap-6 w-full px-4 sm:px-0 '>
      {/* Hourly Forecast */}
      <div 
        className='rounded-lg sm:rounded-2xl p-4 sm:p-6'
        style={{ backgroundColor: 'hsl(243, 27%, 20%)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'hsl(0, 0%, 100%)' }}>
            Hourly forecast
          </h3>
          
          {/* Day Selector */}
          <Select defaultValue="0" onValueChange={(value) => setSelectedDay(parseInt(value))}>
            <SelectTrigger 
              className="w-full sm:w-32 text-sm sm:text-base transition-colors duration-200 hover:bg-[hsl(243,23%,25%)]"
              style={{ 
                backgroundColor: 'hsl(243, 23%, 30%)', 
                color: 'hsl(0, 0%, 100%)',
                border: 'none'
              }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent 
              className="transition-all duration-200 hover:shadow-xl hover:bg-gradient-to-r hover:from-[hsl(243,23%,45%)] hover:to-[hsl(243,23%,35%)] rounded-md ring-0 hover:ring-1 hover:ring-[hsl(233,67%,56%)/15]"
              style={{ 
                backgroundColor: 'hsl(243, 24%, 22%)', 
                border: '1px solid hsl(243, 23%, 30%)'
              }}>
              {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                <SelectItem
                  key={dayIndex}
                  value={dayIndex.toString()}
                  className="rounded-sm cursor-pointer transition-transform duration-200 ease-in-out hover:bg-gradient-to-r hover:from-[hsl(243,23%,50%)] hover:to-[hsl(243,23%,38%)] hover:text-[hsl(0,0%,100%)] hover:shadow-lg hover:pl-4 hover:-translate-x-0.5 active:scale-99"
                  style={{ color: 'hsl(0, 0%, 100%)' }}>
                  {getDayName(dayIndex)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hourly List */}
        <div className='flex flex-col gap-1 sm:gap-2'>
          {visibleHours.map((hour, index) => {
            const Icon = hour.icon;
            return (
              <div 
                key={index}
                className='flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base'
                style={{ 
                  backgroundColor: 'hsl(243, 23%, 25%)'
                }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Icon size={20} className="sm:w-6 sm:h-6" style={{ color: 'hsl(0, 0%, 100%)' }} />
                  <span className="text-xs sm:text-sm font-medium" style={{ color: 'hsl(0, 0%, 100%)' }}>
                    {hour.time}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold" style={{ color: 'hsl(0, 0%, 100%)' }}>
                  {hour.temp}
                </span>
              </div>
            );
          })}

          {/* See more / See less button */}
          {hourlyForecast.length > hourlyLimit && (
            <div className="flex justify-center mt-2 sm:mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllHours((s) => !s)}
                className="text-xs sm:text-sm"
                style={{ backgroundColor: 'hsl(243, 23%, 30%)', color: 'hsl(0, 0%, 100%)' }}
              >
                {showAllHours ? 'See less' : 'See more'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitiesDaysInfo;