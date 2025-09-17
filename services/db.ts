import Dexie, { Table } from 'dexie';
import { Settings, RefuelRecord, TripLog } from '../types';

export class AppDB extends Dexie {
  settings!: Table<Settings>;
  refuelRecords!: Table<RefuelRecord>;
  tripLogs!: Table<TripLog>;

  constructor() {
    super('SmartBikeDB');
    // FIX: Cast `this` to `Dexie` to resolve a TypeScript error where the `version`
    // method is not found on the subclass type inside the constructor.
    (this as Dexie).version(1).stores({
      settings: '++id, key',
      refuelRecords: '++id, timestamp',
      tripLogs: '++id, startTimestamp',
    });
  }
}

export const db = new AppDB();
