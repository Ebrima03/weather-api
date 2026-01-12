import { Settings, Check } from 'lucide-react';
import Logo from '../assets/images/logo.svg';
import { useUnits } from '../hooks/Unite-Content';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const { tempUnit, windUnit, precipUnit, setTempUnit, setWindUnit, setPrecipUnit } = useUnits();

  return (
    <header className="container mx-auto px-4 sm:px-6 py-4 sm:py-6" style={{ backgroundColor: 'hsl(243, 96%, 9%)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <img src={Logo} alt="Weather Now Logo" className="h-8 sm:h-10 w-auto" />

        {/* Units Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base transition-all duration-200 hover:bg-gradient-to-r hover:from-[hsl(243,23%,45%)] hover:to-[hsl(243,23%,35%)] hover:shadow-xl hover:ring-2 hover:ring-[hsl(233,67%,56%)/20] focus-visible:ring-2 focus-visible:ring-[hsl(233,67%,56%)/30]" 
                                style={{ backgroundColor: 'hsl(243, 24%, 24%)', color: 'hsl(0, 0%, 100%)', border: '1px solid hsl(243, 23%, 30%)' }}>
            <Settings size={16} className="sm:w-5 sm:h-5" />
            <span>Units</span>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            className="w-48 sm:w-56 p-2 transition-all duration-200 hover:shadow-xl hover:bg-gradient-to-r hover:from-[hsl(243,23%,45%)] hover:to-[hsl(243,23%,35%)] rounded-md ring-0 hover:ring-1 hover:ring-[hsl(233,67%,56%)/15]" 
            align="end"
            style={{ backgroundColor: 'hsl(243, 24%, 22%)', border: '1px solid hsl(243, 23%, 30%)' }}>
            
            <DropdownMenuLabel className="text-xs sm:text-sm" style={{ color: 'hsl(0, 0%, 100%)' }}>
              Switch Units
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator style={{ backgroundColor: 'hsl(243, 23%, 30%)' }} />
            
            {/* Temperature Section */}
            <div className="px-2 py-1.5" style={{ color: 'hsl(240, 6%, 70%)' }}>
              <div className="text-xs sm:text-sm font-medium mb-2">Temperature</div>
              
              <DropdownMenuItem 
                className="flex items-center justify-between cursor-pointer rounded px-2 py-1 sm:py-1.5 text-xs sm:text-sm transition-transform duration-200 ease-in-out hover:bg-gradient-to-r hover:from-[hsl(243,23%,50%)] hover:to-[hsl(243,23%,38%)] hover:text-[hsl(0,0%,100%)] hover:shadow-lg hover:pl-4 hover:-translate-x-0.5 active:scale-99"
                style={{ color: 'hsl(0, 0%, 100%)' }}
                onSelect={() => setTempUnit('celsius')}>
                <span>Celsius (°C)</span>
                {tempUnit === 'celsius' && <Check size={14} className="sm:w-4 sm:h-4" style={{ color: 'hsl(233, 67%, 56%)' }} />}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="flex items-center justify-between cursor-pointer rounded px-2 py-1 sm:py-1.5 text-xs sm:text-sm transition-transform duration-200 ease-in-out hover:bg-gradient-to-r hover:from-[hsl(243,23%,50%)] hover:to-[hsl(243,23%,38%)] hover:text-[hsl(0,0%,100%)] hover:shadow-lg hover:pl-4 hover:-translate-x-0.5 active:scale-99"
                style={{ color: 'hsl(0, 0%, 100%)' }}
                onSelect={() => setTempUnit('fahrenheit')}>
                <span>Fahrenheit (°F)</span>
                {tempUnit === 'fahrenheit' && <Check size={14} className="sm:w-4 sm:h-4" style={{ color: 'hsl(233, 67%, 56%)' }} />}
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator style={{ backgroundColor: 'hsl(243, 23%, 30%)' }} />
            
            {/* Wind Speed Section */}
            <div className="px-2 py-1.5" style={{ color: 'hsl(240, 6%, 70%)' }}>
              <div className="text-xs sm:text-sm font-medium mb-2">Wind Speed</div>
              
              <DropdownMenuItem 
                className="flex items-center justify-between cursor-pointer rounded px-2 py-1 sm:py-1.5 text-xs sm:text-sm transition-transform duration-200 ease-in-out hover:bg-gradient-to-r hover:from-[hsl(243,23%,50%)] hover:to-[hsl(243,23%,38%)] hover:text-[hsl(0,0%,100%)] hover:shadow-lg hover:pl-4 hover:-translate-x-0.5 active:scale-99"
                style={{ color: 'hsl(0, 0%, 100%)' }}
                onSelect={() => setWindUnit('kmh')}>
                <span>km/h</span>
                {windUnit === 'kmh' && <Check size={14} className="sm:w-4 sm:h-4" style={{ color: 'hsl(233, 67%, 56%)' }} />}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="flex items-center justify-between cursor-pointer rounded px-2 py-1 sm:py-1.5 text-xs sm:text-sm transition-transform duration-200 ease-in-out hover:bg-gradient-to-r hover:from-[hsl(243,23%,50%)] hover:to-[hsl(243,23%,38%)] hover:text-[hsl(0,0%,100%)] hover:shadow-lg hover:pl-4 hover:-translate-x-0.5 active:scale-99"
                style={{ color: 'hsl(0, 0%, 100%)' }}
                onSelect={() => setWindUnit('mph')}>
                <span>mph</span>
                {windUnit === 'mph' && <Check size={14} className="sm:w-4 sm:h-4" style={{ color: 'hsl(233, 67%, 56%)' }} />}
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator style={{ backgroundColor: 'hsl(243, 23%, 30%)' }} />
            
            {/* Precipitation Section */}
            <div className="px-2 py-1.5" style={{ color: 'hsl(240, 6%, 70%)' }}>
              <div className="text-xs sm:text-sm font-medium mb-2">Precipitation</div>
              
              <DropdownMenuItem 
                className="flex items-center justify-between cursor-pointer rounded px-2 py-1 sm:py-1.5 text-xs sm:text-sm transition-transform duration-200 ease-in-out hover:bg-gradient-to-r hover:from-[hsl(243,23%,50%)] hover:to-[hsl(243,23%,38%)] hover:text-[hsl(0,0%,100%)] hover:shadow-lg hover:pl-4 hover:-translate-x-0.5 active:scale-99"
                style={{ color: 'hsl(0, 0%, 100%)' }}
                onSelect={() => setPrecipUnit('mm')}>
                <span>Millimeters (mm)</span>
                {precipUnit === 'mm' && <Check size={14} className="sm:w-4 sm:h-4" style={{ color: 'hsl(233, 67%, 56%)' }} />}
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="flex items-center justify-between cursor-pointer rounded px-2 py-1 sm:py-1.5 text-xs sm:text-sm transition-transform duration-200 ease-in-out hover:bg-gradient-to-r hover:from-[hsl(243,23%,50%)] hover:to-[hsl(243,23%,38%)] hover:text-[hsl(0,0%,100%)] hover:shadow-lg hover:pl-4 hover:-translate-x-0.5 active:scale-99"
                style={{ color: 'hsl(0, 0%, 100%)' }}
                onSelect={() => setPrecipUnit('inch')}>
                <span>Inches (in)</span>
                {precipUnit === 'inch' && <Check size={14} className="sm:w-4 sm:h-4" style={{ color: 'hsl(233, 67%, 56%)' }} />}
              </DropdownMenuItem>
            </div>


          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;