
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { db } from '../services/db';
import { BikeStateSlice, createBikeStateSlice } from './bikeStateSlice';
import { SettingsSlice, createSettingsSlice } from './settingsSlice';
import { HistorySlice, createHistorySlice } from './historySlice';

export type AppState = BikeStateSlice & SettingsSlice & HistorySlice;

const dexieStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const item = await db.settings.where('key').equals(name).first();
    return item ? JSON.stringify(item.value) : null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await db.settings.put({ key: name, value: JSON.parse(value) });
  },
  removeItem: async (name: string): Promise<void> => {
    await db.settings.where('key').equals(name).delete();
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createBikeStateSlice(...a),
      ...createSettingsSlice(...a),
      ...createHistorySlice(...a),
    }),
    {
      name: 'smart-bike-storage',
      storage: createJSONStorage(() => dexieStorage),
      partialize: (state) => ({
        // only persist the settings slice
        bikeModel: state.bikeModel,
        tankCapacityL: state.tankCapacityL,
        fuelEconomyKmPerL: state.fuelEconomyKmPerL,
        reserveLiters: state.reserveLiters,
        lastServiceKm: state.lastServiceKm,
      }),
    }
  )
);
