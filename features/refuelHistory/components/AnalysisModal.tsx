
import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RefuelRecord } from '../../../types';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: RefuelRecord[];
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, records }) => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (isOpen && records.length > 1 && !analysis) {
                setIsLoading(true);
                setError('');
                try {
                    const response = await fetch('/api/analyze-economy', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ records }),
                    });
                    if (!response.ok) throw new Error('Failed to get analysis from AI');
                    const data = await response.json();
                    setAnalysis(data.analysis);
                } catch (err) {
                    setError('An error occurred while analyzing your data.');
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchAnalysis();
    }, [isOpen, records, analysis]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={onClose}>
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
    
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all border border-slate-700">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-neon-cyan font-mono">
                      AI Fuel Economy Analysis
                    </Dialog.Title>
                    <div className="mt-4 prose prose-invert prose-sm text-slate-300 max-w-none">
                      {isLoading && <p>Analyzing your riding habits...</p>}
                      {error && <p className="text-red-400">{error}</p>}
                      {analysis && <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />}
                      {!isLoading && !analysis && !error && <p>Not enough data to perform analysis. Add more refuel records.</p>}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600">Close</button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
    );
};
