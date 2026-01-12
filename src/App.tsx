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
    latitude: 13.4549,
    longitude: -16.5790,
    name: 'Banjul, The Gambia'
  });

  const handleLocationSelect = (latitude: number, longitude: number, name: string) => {
    console.log(`Selected: ${name} at ${latitude}, ${longitude}`);
    setLocation({ latitude, longitude, name });
  };

  return (
    <UnitsProvider>
      <div 
        className="h-screen w-screen" 
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