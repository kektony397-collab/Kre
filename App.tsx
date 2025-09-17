
import React, { useState, Suspense, lazy } from 'react';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { MaintenanceReminder } from './features/dashboard/components/MaintenanceReminder';

const RefuelHistoryPage = lazy(() => import('./features/refuelHistory/RefuelHistoryPage'));
const SettingsPage = lazy(() => import('./features/settings/SettingsPage'));

type Page = 'dashboard' | 'history' | 'settings';

function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'history':
        return <RefuelHistoryPage />;
      case 'settings':
        return <SettingsPage />;
      case 'dashboard':
      default:
        return <DashboardPage />;
    }
  };

  const NavButton = ({ page, label }: { page: Page; label: string }) => (
    <button
      onClick={() => setActivePage(page)}
      className={`font-mono px-4 py-2 text-sm uppercase transition-all duration-300 rounded-t-lg border-b-2
        ${activePage === page 
          ? 'bg-slate-800 border-neon-cyan text-neon-cyan' 
          : 'border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans p-4 flex flex-col antialiased">
      <header className="flex-shrink-0 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-neon-cyan tracking-widest uppercase animate-pulse-glow">
          Smart Bike Dashboard
        </h1>
        <MaintenanceReminder />
      </header>
      
      <nav className="flex-shrink-0 mt-4 border-b border-slate-700">
        <NavButton page="dashboard" label="Dashboard" />
        <NavButton page="history" label="History" />
        <NavButton page="settings" label="Settings" />
      </nav>

      <main className="flex-grow mt-4">
        <Suspense fallback={<div className="text-center p-8 font-mono text-neon-cyan">Loading Module...</div>}>
          {renderPage()}
        </Suspense>
      </main>

      <footer className="text-center text-xs text-slate-600 font-mono mt-4 flex-shrink-0">
        <p>&copy; {new Date().getFullYear()} - PWA Offline-First</p>
      </footer>
    </div>
  );
}

export default App;
