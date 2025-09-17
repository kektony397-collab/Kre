
import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Card } from '../../components/Card';

const SettingsPage = () => {
  const { 
    bikeModel, setBikeModel,
    tankCapacityL, setTankCapacityL,
    fuelEconomyKmPerL, setFuelEconomyKmPerL,
    reserveLiters, setReserveLiters,
    lastServiceKm, setLastServiceKm
  } = useAppStore();
  
  const [model, setModel] = useState(bikeModel);
  const [capacity, setCapacity] = useState(tankCapacityL);
  const [economy, setEconomy] = useState(fuelEconomyKmPerL);
  const [reserve, setReserve] = useState(reserveLiters);
  const [serviceKm, setServiceKm] = useState(lastServiceKm);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setBikeModel(model);
    setTankCapacityL(capacity);
    setFuelEconomyKmPerL(economy);
    setReserveLiters(reserve);
    setLastServiceKm(serviceKm);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const InputField = ({ label, type, value, onChange }: { label: string, type: string, value: any, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
      <div>
          <label className="block text-sm font-mono text-slate-400">{label}</label>
          <input
              type={type}
              value={value}
              onChange={onChange}
              className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white focus:ring-neon-cyan focus:border-neon-cyan"
          />
      </div>
  );

  return (
    <Card>
      <h2 className="text-xl font-bold text-slate-200 mb-4">Settings</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <InputField label="Bike Model" type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        <InputField label="Tank Capacity (Liters)" type="number" value={capacity} onChange={(e) => setCapacity(parseFloat(e.target.value))} />
        <InputField label="Average Fuel Economy (km/L)" type="number" value={economy} onChange={(e) => setEconomy(parseFloat(e.target.value))} />
        <InputField label="Reserve Fuel (Liters)" type="number" value={reserve} onChange={(e) => setReserve(parseFloat(e.target.value))} />
        <InputField label="Last Service (Odometer km)" type="number" value={serviceKm} onChange={(e) => setServiceKm(parseFloat(e.target.value))} />

        <div className="flex items-center justify-end pt-4">
          {saved && <p className="text-neon-lime text-sm mr-4">Settings Saved!</p>}
          <button type="submit" className="font-mono text-sm bg-neon-cyan/80 hover:bg-neon-cyan text-slate-900 px-6 py-2 rounded-md transition-colors">
            Save Settings
          </button>
        </div>
      </form>
    </Card>
  );
};

export default SettingsPage;
