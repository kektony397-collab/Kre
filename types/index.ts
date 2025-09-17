
export interface Settings {
  id?: number;
  key: string;
  value: any;
}

export interface RefuelRecord {
  id?: number;
  timestamp: number;
  litersAdded: number;
  odometerKm: number;
}

export interface TripLog {
  id?: number;
  startTimestamp: number;
  endTimestamp: number;
  distanceKm: number;
  fuelConsumedL: number;
}
