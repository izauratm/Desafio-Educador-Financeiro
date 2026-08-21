import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Lightbulb,
  Wallet,
  PlusCircle,
} from "lucide-react";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8 animate-fade-in">
      <div className="relative overflow-hidden bg-primary text-primary-foreground p-8 md:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-xl z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs px-3.5 py-1 rounded-full font-medium">
            <Sparkles size={14} className="text-amber-300" /> Educador
            Financeiro IA
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Domine a instabilidade da sua renda com inteligência.
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Separe contas pessoais e profissionais, simule meses fracos e
            construa uma reserva sólida sem jargões complexos.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/nova-simulacao")}
              className="bg-white text-primary font-semibold px-6 py-3 rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <PlusCircle size={18} /> Iniciar Nova Simulação
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => navigate("/historico")}
              className="bg-primary/40 backdrop-blur-sm border border-white/20 text-white font-medium px-5 py-3 rounded-xl hover:bg-primary/50 transition-all cursor-pointer"
            >
              Ver Histórico
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="bg-card text-foreground p-6 rounded-2xl shadow-lg border border-border w-full md:w-72 shrink-0 z-10">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Wallet size={20} />
          </div>
          <h3 className="font-bold text-sm text-foreground">
            Planejamento Ágil
          </h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Baseado na sua realidade de autônomo, freelancer ou MEI.
          </p>
          <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
            ● IA em Tempo Real
          </div>
        </div>
      </div>

      {/*Grid Recursos e Vantagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] flex gap-4 items-start transition hover:border-primary/40">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground mb-1">
              Reserva para Meses Fracos
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Descubra quanto guardar exatamente nos meses de alta para blindar
              suas finanças quando a demanda baixar.
            </p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] flex gap-4 items-start transition hover:border-primary/40">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
            <Lightbulb size={22} />
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground mb-1">
              Insights Acionáveis
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Orientações diretas no formato "Por que fazer" e "Como fazer",
              adaptadas ao seu cotidiano profissional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
