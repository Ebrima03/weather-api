import { useState, useEffect } from 'react';
import { Search } from "lucide-react";

interface SearchResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

interface HeroProps {
  onLocationSelect?: (latitude: number, longitude: number, name: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      if (searchQuery.length > 2) {
        searchPlaces(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const searchPlaces = async (query: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      if (data.results) {
        setSearchResults(data.results);
        setShowDropdown(true);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (result: SearchResult) => {
    const displayName = result.admin1 
      ? `${result.name}, ${result.admin1}, ${result.country}`
      : `${result.name}, ${result.country}`;
    
    setSearchQuery(displayName);
    setShowDropdown(false);
    
    if (onLocationSelect) {
      onLocationSelect(result.latitude, result.longitude, displayName);
    }
  };

  const handleSearch = () => {
    if (searchResults.length > 0) {
      handleSelectLocation(searchResults[0]);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h1 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12" 
          style={{ color: 'hsl(0, 0%, 100%)' }}>
          How's the sky looking today?
        </h1>
        
        {/* Search Section */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Search Input with Dropdown */}
            <div className="flex-1 relative">
              <Search 
                size={18} 
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 sm:w-5 sm:h-5" 
                style={{ color: 'hsl(240, 6%, 70%)' }} 
              />
              <input
                type="text"
                placeholder="Search for a place..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(e.target.value.length > 0);
                }}
                onFocus={() => searchQuery && setShowDropdown(true)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-lg text-sm sm:text-base focus:outline-none"
                style={{ 
                  backgroundColor: 'hsl(243, 27%, 20%)', 
                  color: 'hsl(0, 0%, 100%)',
                  border: 'none'
                }}
              />
              
              {/* Dropdown Results */}
              {showDropdown && searchQuery.length > 2 && (
                <div 
                  className="absolute w-full mt-2 rounded-lg overflow-hidden z-10"
                  style={{ backgroundColor: 'hsl(243, 27%, 20%)' }}>
                  {isSearching ? (
                    <div className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-base" style={{ color: 'hsl(240, 6%, 70%)' }}>
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition-colors hover:bg-white/5"
                        style={{ 
                          color: 'hsl(0, 0%, 100%)',
                          borderBottom: index < searchResults.length - 1 ? '1px solid hsl(243, 23%, 30%)' : 'none'
                        }}
                        onClick={() => handleSelectLocation(result)}>
                        <div className="font-medium text-xs sm:text-base">
                          {result.name}
                          {result.admin1 && `, ${result.admin1}`}
                        </div>
                        <div className="text-xs sm:text-sm" style={{ color: 'hsl(240, 6%, 70%)' }}>
                          {result.country}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-base" style={{ color: 'hsl(240, 6%, 70%)' }}>
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ 
                backgroundColor: 'hsl(233, 67%, 56%)', 
                color: 'hsl(0, 0%, 100%)' 
              }}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;