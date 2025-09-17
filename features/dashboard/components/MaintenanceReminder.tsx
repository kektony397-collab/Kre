
import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../../store';

export const MaintenanceReminder: React.FC = () => {
    const { totalOdometerKm, lastServiceKm, bikeModel } = useAppStore(state => ({
        totalOdometerKm: state.totalOdometerKm,
        lastServiceKm: state.lastServiceKm,
        bikeModel: state.bikeModel,
    }));
    
    const [reminder, setReminder] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const SERVICE_INTERVAL_KM = 4000;
    const isServiceDue = totalOdometerKm > lastServiceKm + SERVICE_INTERVAL_KM;

    useEffect(() => {
        const fetchReminder = async () => {
            if (!isServiceDue || isLoading || reminder) return;

            setIsLoading(true);
            try {
                const response = await fetch('/api/generate-reminder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ totalOdometerKm, lastServiceKm, bikeModel }),
                });
                if (!response.ok) throw new Error('Failed to fetch reminder');
                const data = await response.json();
                setReminder(data.reminder);
            } catch (error) {
                console.error("Error fetching maintenance reminder:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReminder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isServiceDue, totalOdometerKm, lastServiceKm, bikeModel]);

    if (!isServiceDue || !reminder) {
        return null;
    }

    return (
        <div className="hidden md:block bg-yellow-900/50 border border-yellow-500 text-yellow-200 text-xs font-mono p-2 rounded-md animate-pulse">
            {reminder}
        </div>
    );
};
