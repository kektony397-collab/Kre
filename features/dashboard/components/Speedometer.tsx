
import React from 'react';
import { useAppStore } from '../../../store';
import { Card } from '../../../components/Card';

export const Speedometer: React.FC = () => {
  const speed = useAppStore((state) => state.currentSpeedKph);

  return (
    <Card className="flex flex-col items-center justify-center aspect-square text-center">
      <div className="font-mono text-slate-400 text-sm uppercase">Speed</div>
      <div className="font-sans text-6xl md:text-8xl font-bold text-neon-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
        {Math.round(speed)}
      </div>
      <div className="font-mono text-slate-400 text-lg">km/h</div>
    </Card>
  );
};
