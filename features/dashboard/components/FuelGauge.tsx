
import React from 'react';
import { useAppStore } from '../../../store';
import { Card } from '../../../components/Card';

export const FuelGauge: React.FC = () => {
  const { currentFuelL, tankCapacityL } = useAppStore((state) => ({
    currentFuelL: state.currentFuelL,
    tankCapacityL: state.tankCapacityL,
  }));

  const fuelPercentage = tankCapacityL > 0 ? (currentFuelL / tankCapacityL) * 100 : 0;
  
  const barColor = fuelPercentage > 50 ? 'bg-neon-cyan' : fuelPercentage > 20 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <Card className="flex flex-col items-center justify-center aspect-square text-center">
      <div className="font-mono text-slate-400 text-sm uppercase">Fuel Level</div>
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        <div className="font-sans text-5xl md:text-6xl font-bold text-white mb-2">
          {fuelPercentage.toFixed(0)}<span className="text-2xl">%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4">
          <div 
            className={`${barColor} h-4 rounded-full transition-all duration-500`} 
            style={{ width: `${fuelPercentage}%` }}
          ></div>
        </div>
        <div className="font-mono text-slate-400 text-sm mt-2">
          {currentFuelL.toFixed(2)}L / {tankCapacityL}L
        </div>
      </div>
    </Card>
  );
};
