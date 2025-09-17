
import { StateCreator } from 'zustand';
import { AppState } from './index';

export interface SettingsSlice {
  bikeModel: string;
  tankCapacityL: number;
  fuelEconomyKmPerL: number; // User-set average
  reserveLiters: number;
  lastServiceKm: number;

  setBikeModel: (model: string) => void;
  setTankCapacityL: (capacity: number) => void;
  setFuelEconomyKmPerL: (economy: number) => void;
  setReserveLiters: (liters: number) => void;
  setLastServiceKm: (km: number) => void;
}

export const createSettingsSlice: StateCreator<AppState, [], [], SettingsSlice> = (set) => ({
  bikeModel: '2014 Honda Dream Yuga',
  tankCapacityL: 8,
  fuelEconomyKmPerL: 55,
  reserveLiters: 1.5,
  lastServiceKm: 10000,

  setBikeModel: (model) => set({ bikeModel: model }),
  setTankCapacityL: (capacity) => set({ tankCapacityL: capacity }),
  setFuelEconomyKmPerL: (economy) => set({ fuelEconomyKmPerL: economy }),
  setReserveLiters: (liters) => set({ reserveLiters: liters }),
  setLastServiceKm: (km) => set({ lastServiceKm: km }),
});
