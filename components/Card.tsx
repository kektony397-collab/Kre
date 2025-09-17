
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-slate-900/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};
