import { useState } from 'react';
import { UnitsProvider } from './hooks/Unite-Content';
import Header from "./components/Header"
import MainHero from "./components/Main-Hero"
import Hero from "./components/Hero"

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

function App() {
  const [location, setLocation] = useState<Location>({
    latitude: 52.52,
    longitude: 13.41,
    name: 'Berlin, Germany'
  });

  const handleLocationSelect = (latitude: number, longitude: number, name: string) => {
    console.log(`Selected: ${name} at ${latitude}, ${longitude}`);
    setLocation({ latitude, longitude, name });
  };

  return (
    <UnitsProvider>
      <div 
        className="" 
        style={{ backgroundColor: 'hsl(243, 96%, 9%)' }}
      >
        <Header />
        <Hero onLocationSelect={handleLocationSelect} />
        <MainHero location={location} />
      </div>
    </UnitsProvider>
  )
}

export default App