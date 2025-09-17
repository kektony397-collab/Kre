
import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAppStore } from '../../../store';

interface AddRefuelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRefuelModal: React.FC<AddRefuelModalProps> = ({ isOpen, onClose }) => {
  const { addRefuelRecord, totalOdometerKm, tankCapacityL, setTotalOdometerKm, setCurrentFuelL } = useAppStore();
  const [liters, setLiters] = useState('');
  const [naturalInput, setNaturalInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNaturalInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNaturalInput(e.target.value);
    if (e.target.value.length > 3) {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('/api/parse-refuel-entry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: e.target.value, tankCapacity: tankCapacityL }),
        });
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        if (data.litersAdded) {
          setLiters(data.litersAdded.toString());
        }
      } catch (err) {
        setError('Could not parse input.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const litersAdded = parseFloat(liters);
    if (!isNaN(litersAdded) && litersAdded > 0) {
      await addRefuelRecord({
        timestamp: Date.now(),
        litersAdded,
        odometerKm: totalOdometerKm,
      });
      // Update bike state
      setCurrentFuelL(litersAdded);
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setLiters('');
    setNaturalInput('');
    setError('');
    setIsLoading(false);
  }

  const handleClose = () => {
    resetForm();
    onClose();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all border border-slate-700">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                  Add Refuel Record
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4 font-mono">
                   <div>
                      <label htmlFor="naturalInput" className="block text-sm font-medium text-slate-400">
                        Describe your refuel (e.g., "filled up", "added 5.5 liters")
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="text"
                          id="naturalInput"
                          value={naturalInput}
                          onChange={handleNaturalInputChange}
                          className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white focus:ring-neon-cyan focus:border-neon-cyan"
                          placeholder="Type here..."
                        />
                         {isLoading && <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-400">Parsing...</div>}
                      </div>
                      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                    </div>

                  <div>
                    <label htmlFor="liters" className="block text-sm font-medium text-slate-400">Liters Added</label>
                    <input
                      type="number"
                      id="liters"
                      step="0.01"
                      value={liters}
                      onChange={(e) => setLiters(e.target.value)}
                      required
                      className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white focus:ring-neon-cyan focus:border-neon-cyan"
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-2">
                    <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-slate-900 bg-neon-cyan rounded-md hover:bg-neon-cyan/80">Save</button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
