export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: 'personal' | 'professional';
  description: string;
  amount: number;
  date: string;
}

export interface SimulationData {
  id: string;
  createdAt: string;
  profession: string;
  avgMonthlyIncome: number;
  goodMonthIncome: number;
  badMonthIncome: number;
  personalExpenses: number;
  professionalExpenses: number;
  financialGoal: string;
  diagnosis?: string;
  chatHistory?: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}