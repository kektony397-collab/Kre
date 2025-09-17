
import { useEffect, useRef } from 'react';
import { useAppStore } from '../store';

export const useFuelCalculator = () => {
  const tripKm = useAppStore((state) => state.tripKm);
  const fuelEconomyKmPerL = useAppStore((state) => state.fuelEconomyKmPerL);
  const consumeFuel = useAppStore((state) => state.consumeFuel);
  
  const lastTripKm = useRef(0);

  useEffect(() => {
    if (tripKm > lastTripKm.current && fuelEconomyKmPerL > 0) {
      const distanceDelta = tripKm - lastTripKm.current;
      const fuelConsumed = distanceDelta / fuelEconomyKmPerL;
      consumeFuel(fuelConsumed);
      lastTripKm.current = tripKm;
    } else if (tripKm === 0) {
      // Reset if tripKm is reset
      lastTripKm.current = 0;
    }
  }, [tripKm, fuelEconomyKmPerL, consumeFuel]);

  return null;
};
