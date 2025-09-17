
import React from 'react';
import { useAppStore } from '../../../store';
import { Card } from '../../../components/Card';

interface OdometerProps {
  type: 'trip' | 'total';
}

export const Odometer: React.FC<OdometerProps> = ({ type }) => {
  const distance = useAppStore((state) => 
    type === 'trip' ? state.tripKm : state.totalOdometerKm
  );

  const formattedDistance = distance.toFixed(1).padStart(6, '0');

  return (
    <Card className="text-center py-6">
      <div className="font-mono text-slate-400 text-sm uppercase mb-2">
        {type === 'trip' ? 'Trip Distance' : 'Total Odometer'}
      </div>
      <div className="font-mono text-4xl text-white bg-slate-950 p-2 rounded-md inline-block tracking-widest">
        {formattedDistance}
        <span className="text-lg ml-2 text-slate-500">km</span>
      </div>
    </Card>
  );
};
