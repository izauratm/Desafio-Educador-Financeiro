import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SimulationData } from "../types/finance";
import {
  Trash2,
  Eye,
  Calendar,
  Target,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

export const History: React.FC = () => {
  const [simulations, setSimulations] = useState<SimulationData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("planej_simulations") || "[]",
    );
    setSimulations(saved);
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = simulations.filter((s) => s.id !== id);
    setSimulations(updated);
    localStorage.setItem("planej_simulations", JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            📒 Histórico de Simulações
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Consulte diagnósticos anteriores ou tire novas dúvidas com a IA.
          </p>
        </div>
        <span className="text-xs font-semibold bg-secondary-button text-muted-foreground px-3 py-1.5 rounded-xl border border-border">
          {simulations.length} salva{simulations.length === 1 ? "" : "s"}
        </span>
      </div>

      {simulations.length === 0 ? (
        <div className="bg-card p-12 rounded-2xl text-center border border-border shadow-sm">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase size={24} />
          </div>
          <h3 className="font-semibold text-foreground mb-1">
            Nenhuma simulação encontrada
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Crie seu primeiro planejamento financeiro personalizado agora mesmo.
          </p>
          <button
            onClick={() => navigate("/nova-simulacao")}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-95 transition cursor-pointer shadow-sm"
          >
            Criar Primeira Simulação
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {simulations.map((sim) => (
            <div
              key={sim.id}
              onClick={() => navigate(`/resultado/${sim.id}`)}
              className="bg-card p-6 rounded-2xl border border-border shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary text-[11px] px-2.5 py-1 rounded-lg font-bold tracking-wide uppercase">
                    {sim.profession}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} /> {sim.createdAt}
                  </span>
                </div>

                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  <Target size={16} className="text-primary shrink-0" />
                  {sim.financialGoal}
                </h3>

                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span>
                    Média Mensal:{" "}
                    <strong className="text-foreground">
                      R$ {sim.avgMonthlyIncome.toLocaleString("pt-BR")}
                    </strong>
                  </span>
                  <span>•</span>
                  <span>
                    Mês Fraco:{" "}
                    <strong className="text-foreground">
                      R$ {sim.badMonthIncome.toLocaleString("pt-BR")}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-border">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/resultado/${sim.id}`);
                  }}
                  className="flex items-center gap-1.5 bg-secondary-button hover:bg-primary/10 text-foreground hover:text-primary px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  <Eye size={14} /> Ver Detalhes <ArrowUpRight size={14} />
                </button>
                <button
                  onClick={(e) => handleDelete(sim.id, e)}
                  className="p-2 bg-secondary-button hover:bg-red-50 text-muted-foreground hover:text-red-600 rounded-xl transition-all cursor-pointer"
                  title="Excluir simulação"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
