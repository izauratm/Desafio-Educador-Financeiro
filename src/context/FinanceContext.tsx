import React, { createContext, useContext, useState, useEffect } from 'react';
import { SimulationData } from '../types/finance';

interface FinanceContextType {
  simulations: SimulationData[];
  addSimulation: (sim: SimulationData) => void;
  deleteSimulation: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simulations, setSimulations] = useState<SimulationData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('planej_simulations');
    if (saved) setSimulations(JSON.parse(saved));
  }, []);

  const addSimulation = (sim: SimulationData) => {
    const updated = [sim, ...simulations];
    setSimulations(updated);
    localStorage.setItem('planej_simulations', JSON.stringify(updated));
  };

  const deleteSimulation = (id: string) => {
    const updated = simulations.filter(s => s.id !== id);
    setSimulations(updated);
    localStorage.setItem('planej_simulations', JSON.stringify(updated));
  };

  return (
    <FinanceContext.Provider value={{ simulations, addSimulation, deleteSimulation }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance deve ser usado dentro de FinanceProvider');
  return context;
};