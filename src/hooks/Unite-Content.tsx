import { createContext, useContext, useState, type ReactNode } from 'react';


interface UnitsContextType {
  tempUnit: 'celsius' | 'fahrenheit';
  windUnit: 'kmh' | 'mph';
  precipUnit: 'mm' | 'inch';
  setTempUnit: (unit: 'celsius' | 'fahrenheit') => void;
  setWindUnit: (unit: 'kmh' | 'mph') => void;
  setPrecipUnit: (unit: 'mm' | 'inch') => void;
  convertTemp: (temp: number) => number;
  convertWind: (speed: number) => number;
  convertPrecip: (precip: number) => number;
  getTempUnit: () => string;
  getWindUnit: () => string;
  getPrecipUnit: () => string;
}

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export const UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [tempUnit, setTempUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [windUnit, setWindUnit] = useState<'kmh' | 'mph'>('kmh');
  const [precipUnit, setPrecipUnit] = useState<'mm' | 'inch'>('mm');

  const convertTemp = (temp: number): number => {
    if (tempUnit === 'fahrenheit') {
      return (temp * 9/5) + 32;
    }
    return temp;
  };

  const convertWind = (speed: number): number => {
    if (windUnit === 'mph') {
      return speed * 0.621371;
    }
    return speed;
  };

  const convertPrecip = (precip: number): number => {
    if (precipUnit === 'inch') {
      return precip * 0.0393701;
    }
    return precip;
  };

  const getTempUnit = (): string => {
    return tempUnit === 'celsius' ? '°C' : '°F';
  };

  const getWindUnit = (): string => {
    return windUnit === 'kmh' ? 'km/h' : 'mph';
  };

  const getPrecipUnit = (): string => {
    return precipUnit === 'mm' ? 'mm' : 'in';
  };

  return (
    <UnitsContext.Provider value={{
      tempUnit,
      windUnit,
      precipUnit,
      setTempUnit,
      setWindUnit,
      setPrecipUnit,
      convertTemp,
      convertWind,
      convertPrecip,
      getTempUnit,
      getWindUnit,
      getPrecipUnit
    }}>
      {children}
    </UnitsContext.Provider>
  );
};

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error('useUnits must be used within UnitsProvider');
  }
  return context;
};