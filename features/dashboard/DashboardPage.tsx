
import React, { useEffect } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useFuelCalculator } from '../../hooks/useFuelCalculator';
import { useAppStore } from '../../store';
import { Speedometer } from './components/Speedometer';
import { FuelGauge } from './components/FuelGauge';
import { Odometer } from './components/Odometer';
import { RangeEstimator } from './components/RangeEstimator';
import { Card } from '../../components/Card';

export const DashboardPage: React.FC = () => {
  const location = useGeolocation();
  useFuelCalculator();

  const { isGpsAvailable, resetTrip, setTotalOdometerKm, setCurrentFuelL, tankCapacityL } = useAppStore();

  useEffect(() => {
    // This would typically be loaded from persistent storage or a server.
    // For this example, we'll initialize it.
    // In a real app, you might fetch last known odometer from db.
    setTotalOdometerKm(12345);
    setCurrentFuelL(tankCapacityL); // Start with a full tank for demo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      {!isGpsAvailable && (
        <Card className="bg-red-900/50 border-red-500 text-center">
          <p className="font-mono text-red-300">GPS not available. Please enable location services.</p>
        </Card>
      )}
      {location.error && (
        <Card className="bg-yellow-900/50 border-yellow-500 text-center">
          <p className="font-mono text-yellow-300">GPS Error: {location.error}</p>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Speedometer />
        <FuelGauge />
        <RangeEstimator />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Odometer type="trip" />
        <Odometer type="total" />
      </div>
       <div className="mt-auto pt-4 flex justify-center">
        <button 
          onClick={resetTrip}
          className="font-mono bg-red-800/50 hover:bg-red-700/50 border border-red-600 text-red-300 px-6 py-2 rounded-lg transition-all"
        >
          RESET TRIP
        </button>
      </div>
    </div>
  );
};
