import React from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  LayoutDashboard,
  PlusCircle,
  History as HistoryIcon,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar: React.FC = () => {
  return (
    <header className="bg-card text-foreground border-b border-border shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-emerald-500"
        >
          <Wallet className="w-6 h-6" />
          Planej.
          <span className="text-foreground">
            IA 💰 Educador Financeiro para Autônomos - MEI
          </span>
        </Link>

        {/* Links + ThemeToggle juntos */}
        <div className="flex items-center gap-6">
          <nav className="flex gap-4 sm:gap-6 items-center">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-emerald-500 transition text-sm font-medium"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>

            <Link
              to="/nova-simulacao"
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-medium transition text-sm"
            >
              <PlusCircle className="w-4 h-4" /> Nova Simulação
            </Link>

            <Link
              to="/historico"
              className="flex items-center gap-1 hover:text-emerald-500 transition text-sm font-medium"
            >
              <HistoryIcon className="w-4 h-4" /> Histórico
            </Link>
          </nav>

          <div className="border-l border-border pl-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
