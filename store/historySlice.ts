
import { StateCreator } from 'zustand';
import { AppState } from './index';
import { RefuelRecord, TripLog } from '../types';
import { db } from '../services/db';

export interface HistorySlice {
  addRefuelRecord: (record: Omit<RefuelRecord, 'id'>) => Promise<void>;
  addTripLog: (log: Omit<TripLog, 'id'>) => Promise<void>;
}

export const createHistorySlice: StateCreator<AppState, [], [], HistorySlice> = () => ({
  addRefuelRecord: async (record) => {
    await db.refuelRecords.add(record as RefuelRecord);
  },
  addTripLog: async (log) => {
    await db.tripLogs.add(log as TripLog);
  },
});
