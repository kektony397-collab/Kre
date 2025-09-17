
import { useState, useEffect, useRef } from 'react';
import KalmanFilter from 'kalman-filter';
import haversine from 'haversine-distance';
import { useAppStore } from '../store';

interface GeolocationState {
  lat: number | null;
  lng: number | null;
  speed: number | null; // in m/s
  error: string | null;
}

export const useGeolocation = () => {
  const { addTripKm, setCurrentSpeedKph, setGpsAvailable } = useAppStore();
  const [location, setLocation] = useState<GeolocationState>({ lat: null, lng: null, speed: null, error: null });
  const kf = useRef<KalmanFilter | null>(null);
  const lastPosition = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, error: "Geolocation is not supported by your browser." }));
      setGpsAvailable(false);
      return;
    }

    setGpsAvailable(true);
    
    // Initialize Kalman Filter
    kf.current = new KalmanFilter({
      observation: {
        dimension: 2,
        stateProjection: [
          [1, 0, 1, 0],
          [0, 1, 0, 1]
        ]
      },
      dynamic: {
        dimension: 4,
        init: {
          mean: [[0], [0], [0], [0]],
          covariance: 1
        }
      }
    });

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude, speed } = position.coords;

      const corrected = kf.current?.filter({
        previousCorrected: kf.current.getCorrected(),
        observation: [[latitude], [longitude]],
      });
      
      const smoothedLat = corrected.mean[0][0];
      const smoothedLng = corrected.mean[1][0];

      if (lastPosition.current) {
        const distanceMeters = haversine(lastPosition.current, { lat: smoothedLat, lng: smoothedLng });
        // Only add distance if it's a meaningful movement to filter out jitter
        if (distanceMeters > 2) {
            addTripKm(distanceMeters / 1000);
        }
      }
      
      lastPosition.current = { lat: smoothedLat, lng: smoothedLng };
      
      const speedKph = speed ? speed * 3.6 : 0;
      setCurrentSpeedKph(speedKph);
      setLocation({ lat: smoothedLat, lng: smoothedLng, speed: speed, error: null });
    };

    const handleError = (error: GeolocationPositionError) => {
      setLocation(prev => ({ ...prev, error: error.message }));
    };

    const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };
    const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError, options);

    return () => navigator.geolocation.clearWatch(watcher);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  return location;
};
