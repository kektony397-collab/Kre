
import { StateCreator } from 'zustand';
import { AppState } from './index';

export interface BikeStateSlice {
  currentFuelL: number;
  tripKm: number;
  totalOdometerKm: number;
  currentSpeedKph: number;
  isGpsAvailable: boolean;
  
  setCurrentFuelL: (fuel: number) => void;
  setTotalOdometerKm: (odometer: number) => void;
  addTripKm: (distance: number) => void;
  setCurrentSpeedKph: (speed: number) => void;
  setGpsAvailable: (isAvailable: boolean) => void;
  consumeFuel: (liters: number) => void;
  resetTrip: () => void;
}

export const createBikeStateSlice: StateCreator<AppState, [], [], BikeStateSlice> = (set, get) => ({
  currentFuelL: 0,
  tripKm: 0,
  totalOdometerKm: 0,
  currentSpeedKph: 0,
  isGpsAvailable: false,

  setCurrentFuelL: (fuel) => set({ currentFuelL: fuel }),
  setTotalOdometerKm: (odometer) => set({ totalOdometerKm: odometer }),
  addTripKm: (distance) => set((state) => ({ 
    tripKm: state.tripKm + distance,
    totalOdometerKm: state.totalOdometerKm + distance
  })),
  setCurrentSpeedKph: (speed) => set({ currentSpeedKph: speed }),
  setGpsAvailable: (isAvailable) => set({ isGpsAvailable: isAvailable }),
  consumeFuel: (liters) => set((state) => ({ currentFuelL: Math.max(0, state.currentFuelL - liters) })),
  resetTrip: () => set({ tripKm: 0 }),
});
