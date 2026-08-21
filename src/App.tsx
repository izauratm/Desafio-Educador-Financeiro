import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';  
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { SimulationForm } from './pages/SimulationForm';
import { SimulationResult } from './pages/SimulationResult';
import { History } from './pages/History';

export const App: React.FC = () => {
  return (
     
    <FinanceProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nova-simulacao" element={<SimulationForm />} />
            <Route path="/resultado/:id" element={<SimulationResult />} />
            <Route path="/historico" element={<History />} />
          </Routes>
        </div>
      </BrowserRouter>
    </FinanceProvider>
  );
};