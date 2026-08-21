import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SimulationData } from "../types/finance";
import { ChatWithEducator } from "../components/ChatWithEducator";
import { ArrowLeft, TrendingUp, TrendingDown, ShieldCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export const SimulationResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState<SimulationData | null>(null);

  useEffect(() => {
    const saved: SimulationData[] = JSON.parse(
      localStorage.getItem("planej_simulations") || "[]"
    );
    const found = saved.find((s) => s.id === id);
    if (found) setSimulation(found);
  }, [id]);

  const handleUpdateHistory = (newHistory: any[]) => {
    if (!simulation) return;
    const updated = { ...simulation, chatHistory: newHistory };
    setSimulation(updated);

    const saved: SimulationData[] = JSON.parse(
      localStorage.getItem("planej_simulations") || "[]"
    );
    const filtered = saved.map((s) => (s.id === simulation.id ? updated : s));
    localStorage.setItem("planej_simulations", JSON.stringify(filtered));
  };

  if (!simulation) {
    return (
      <main className="p-8 text-center text-muted-foreground">
        <p>Simulação não encontrada.</p>
      </main>
    );
  }

  const chartData = [
    { name: "Mês Bom", valor: simulation.goodMonthIncome },
    { name: "Mês Fraco", valor: simulation.badMonthIncome },
  ];

  const lineData = [
    { mes: "Jan", renda: simulation.avgMonthlyIncome },
    { mes: "Fev", renda: simulation.goodMonthIncome },
    { mes: "Mar", renda: simulation.badMonthIncome },
    { mes: "Abr", renda: simulation.avgMonthlyIncome },
    { mes: "Mai", renda: simulation.goodMonthIncome },
    { mes: "Jun", renda: simulation.badMonthIncome },
  ];

  const totalExpenses = simulation.personalExpenses + simulation.professionalExpenses;

  const fluxoData = [
    {
      mes: "Jan",
      entradas: simulation.goodMonthIncome,
      saidas: totalExpenses,
      saldo: simulation.goodMonthIncome - totalExpenses,
    },
    {
      mes: "Fev",
      entradas: simulation.avgMonthlyIncome,
      saidas: totalExpenses,
      saldo: simulation.avgMonthlyIncome - totalExpenses,
    },
    {
      mes: "Mar",
      entradas: simulation.badMonthIncome,
      saidas: totalExpenses,
      saldo: simulation.badMonthIncome - totalExpenses,
    },
  ];

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 space-y-6 bg-background text-foreground transition-colors">
      <nav aria-label="Navegação secundária">
        <button
          onClick={() => navigate("/historico")}
          aria-label="Voltar para o histórico de simulações"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Voltar para o Histórico
        </button>
      </nav>

      <section className="bg-card text-card-foreground rounded-2xl p-6 shadow-sm border border-border">
        <header className="flex justify-between items-start mb-6">
          <div>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-semibold">
              {simulation.profession}
            </span>
            <h1 className="text-2xl font-bold text-foreground mt-2">
              Diagnóstico Financeiro Personalizado
            </h1>
            <p className="text-muted-foreground text-sm">
              Meta: {simulation.financialGoal}
            </p>
          </div>
          <time className="text-xs text-muted-foreground" dateTime={simulation.createdAt}>
            {simulation.createdAt}
          </time>
        </header>

        {/* Cards Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-secondary/50 p-4 rounded-xl border border-border flex items-center gap-3">
            <TrendingUp className="text-emerald-500 w-8 h-8 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Mês Bom</p>
              <p className="font-bold text-foreground">R$ {simulation.goodMonthIncome}</p>
            </div>
          </div>
          <div className="bg-secondary/50 p-4 rounded-xl border border-border flex items-center gap-3">
            <TrendingDown className="text-amber-500 w-8 h-8 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Mês Fraco</p>
              <p className="font-bold text-foreground">R$ {simulation.badMonthIncome}</p>
            </div>
          </div>
          <div className="bg-secondary/50 p-4 rounded-xl border border-border flex items-center gap-3">
            <ShieldCheck className="text-primary w-8 h-8 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Despesas Totais</p>
              <p className="font-bold text-foreground">R$ {totalExpenses}</p>
            </div>
          </div>
        </div>

        {/* Gráfico 1: Mês Bom vs. Mês Fraco */}
        <section aria-label="Gráfico comparativo de rendas mensais" className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Comparativo: Mês Bom vs. Mês Fraco</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip formatter={(value: any) => [`R$ ${value}`, "Valor"]} />
                <Bar dataKey="valor" fill="#502993" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Gráfico 2: Evolução da Renda do Usuário */}
        <section aria-label="Gráfico de evolução da renda" className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Evolução da Renda ao Longo dos Meses</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="mes" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip formatter={(value: any) => [`R$ ${value}`, "Renda"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="renda"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Renda Simulada"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Gráfico 3: Fluxo de Caixa: entradas, saídas e saldo líquido*/}
        <section aria-label="Painel de fluxo de caixa" className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Fluxo de Caixa Mensal</h2>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={fluxoData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="mes" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip formatter={(value: any, name: any) => [`R$ ${value}`, name]} />
                <Legend />
                <Bar dataKey="entradas" fill="#10b981" name="Entradas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saidas" fill="#ef4444" name="Saídas" radius={[4, 4, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="saldo"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Saldo Líquido"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/*Diagnóstico Final*/}
        <article className="prose max-w-none text-foreground bg-secondary/30 p-6 rounded-2xl border border-border whitespace-pre-line text-sm">
          <ReactMarkdown>{simulation.diagnosis}</ReactMarkdown>
        </article>
      </section>

      <section aria-label="Chat com educador financeiro">
        <ChatWithEducator
          simulationId={simulation.id}
          initialHistory={simulation.chatHistory || []}
          onUpdateHistory={handleUpdateHistory}
        />
      </section>
    </main>
  );
};