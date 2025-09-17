
import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../services/db';
import { FixedSizeList as List } from 'react-window';
import { Card } from '../../components/Card';
import { AddRefuelModal } from './components/AddRefuelModal';
import { AnalysisModal } from './components/AnalysisModal';

const RefuelHistoryPage = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isAnalysisModalOpen, setAnalysisModalOpen] = useState(false);
  
  const refuelRecords = useLiveQuery(
    () => db.refuelRecords.orderBy('timestamp').reverse().toArray(),
    []
  );

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const record = refuelRecords?.[index];
    if (!record) return null;
    return (
      <div style={style} className="flex items-center p-2 border-b border-slate-800">
        <div className="flex-grow">
          <p className="font-mono text-white">{new Date(record.timestamp).toLocaleString()}</p>
          <p className="text-xs text-slate-400">Odometer: {record.odometerKm.toFixed(1)} km</p>
        </div>
        <div className="font-mono text-lg text-neon-lime">
          + {record.litersAdded.toFixed(2)} L
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-200">Refuel History</h2>
          <div className="space-x-2">
            <button
              onClick={() => setAnalysisModalOpen(true)}
              className="font-mono text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-md transition-colors"
            >
              Analyze
            </button>
            <button
              onClick={() => setAddModalOpen(true)}
              className="font-mono text-sm bg-neon-cyan/80 hover:bg-neon-cyan text-slate-900 px-4 py-2 rounded-md transition-colors"
            >
              Add Record
            </button>
          </div>
        </div>
        <div className="flex-grow bg-slate-950 rounded-md p-2">
          {refuelRecords && refuelRecords.length > 0 ? (
            <List
              height={500} // This should be calculated based on container size
              itemCount={refuelRecords.length}
              itemSize={60}
              width="100%"
            >
              {Row}
            </List>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-500 font-mono">No refuel records yet.</p>
            </div>
          )}
        </div>
      </Card>
      <AddRefuelModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      {refuelRecords && <AnalysisModal isOpen={isAnalysisModalOpen} onClose={() => setAnalysisModalOpen(false)} records={refuelRecords} />}
    </>
  );
};

export default RefuelHistoryPage;
