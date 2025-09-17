
import React from 'react';
import { useAppStore } from '../../../store';
import { Card } from '../../../components/Card';

export const RangeEstimator: React.FC = () => {
  const { currentFuelL, fuelEconomyKmPerL, reserveLiters } = useAppStore((state) => ({
    currentFuelL: state.currentFuelL,
    fuelEconomyKmPerL: state.fuelEconomyKmPerL,
    reserveLiters: state.reserveLiters,
  }));

  const usableFuel = Math.max(0, currentFuelL - reserveLiters);
  const range = usableFuel * fuelEconomyKmPerL;

  return (
    <Card className="flex flex-col items-center justify-center aspect-square text-center">
      <div className="font-mono text-slate-400 text-sm uppercase">Est. Range</div>
      <div className="font-sans text-6xl md:text-8xl font-bold text-neon-lime drop-shadow-[0_0_10px_rgba(57,255,20,0.7)]">
        {Math.round(range)}
      </div>
      <div className="font-mono text-slate-400 text-lg">km</div>
    </Card>
  );
};
