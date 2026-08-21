import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateFinancialDiagnosis } from '../services/geminiService';
import { SimulationData } from '../types/finance';
import { Loader2, Sparkles } from 'lucide-react';

export const SimulationForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    profession: '',
    avgMonthlyIncome: '',
    goodMonthIncome: '',
    badMonthIncome: '',
    personalExpenses: '',
    professionalExpenses: '',
    financialGoal: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        profession: form.profession,
        avgMonthlyIncome: Number(form.avgMonthlyIncome),
        goodMonthIncome: Number(form.goodMonthIncome),
        badMonthIncome: Number(form.badMonthIncome),
        personalExpenses: Number(form.personalExpenses),
        professionalExpenses: Number(form.professionalExpenses),
        financialGoal: form.financialGoal
      };

      const diagnosis = await generateFinancialDiagnosis(payload);

      const newSimulation: SimulationData = {
        id: Date.now().toString(),
        createdAt: new Date().toLocaleDateString('pt-BR'),
        ...payload,
        diagnosis,
        chatHistory: []
      };

      const saved = JSON.parse(localStorage.getItem('planej_simulations') || '[]');
      localStorage.setItem('planej_simulations', JSON.stringify([newSimulation, ...saved]));

      navigate(`/resultado/${newSimulation.id}`);
    } catch (err) {
      alert('Erro ao gerar diagnóstico. Verifique sua chave de API ou tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    "w-full bg-input text-foreground border border-border rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground/60";

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <section className="bg-card text-card-foreground p-8 rounded-2xl shadow-sm border border-border transition-colors">
        <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Sparkles className="text-primary" /> Planejador para Autônomos - MEI
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          Preencha seus dados para receber um plano financeiro estratégico sob medida.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-foreground mb-1">
              Qual sua profissão / área de atuação?
            </label>
            <input
              id="profession"
              name="profession"
              required
              type="text"
              placeholder="Ex: Designer Freelancer, Motorista de App, MEI..."
              value={form.profession}
              onChange={e => setForm({ ...form, profession: e.target.value })}
              className={inputStyles}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="avgMonthlyIncome" className="block text-sm font-medium text-foreground mb-1">
                Renda Média (R$)
              </label>
              <input
                id="avgMonthlyIncome"
                name="avgMonthlyIncome"
                required
                type="number"
                placeholder="4000"
                value={form.avgMonthlyIncome}
                onChange={e => setForm({ ...form, avgMonthlyIncome: e.target.value })}
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="goodMonthIncome" className="block text-sm font-medium text-foreground mb-1">
                Mês Bom (R$)
              </label>
              <input
                id="goodMonthIncome"
                name="goodMonthIncome"
                required
                type="number"
                placeholder="7000"
                value={form.goodMonthIncome}
                onChange={e => setForm({ ...form, goodMonthIncome: e.target.value })}
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="badMonthIncome" className="block text-sm font-medium text-foreground mb-1">
                Mês Fraco (R$)
              </label>
              <input
                id="badMonthIncome"
                name="badMonthIncome"
                required
                type="number"
                placeholder="2000"
                value={form.badMonthIncome}
                onChange={e => setForm({ ...form, badMonthIncome: e.target.value })}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="personalExpenses" className="block text-sm font-medium text-foreground mb-1">
                Despesas Pessoais (R$)
              </label>
              <input
                id="personalExpenses"
                name="personalExpenses"
                required
                type="number"
                placeholder="2500"
                value={form.personalExpenses}
                onChange={e => setForm({ ...form, personalExpenses: e.target.value })}
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="professionalExpenses" className="block text-sm font-medium text-foreground mb-1">
                Despesas Profissionais (R$)
              </label>
              <input
                id="professionalExpenses"
                name="professionalExpenses"
                required
                type="number"
                placeholder="800"
                value={form.professionalExpenses}
                onChange={e => setForm({ ...form, professionalExpenses: e.target.value })}
                className={inputStyles}
              />
            </div>
          </div>

          <div>
            <label htmlFor="financialGoal" className="block text-sm font-medium text-foreground mb-1">
              Qual sua meta financeira principal?
            </label>
            <input
              id="financialGoal"
              name="financialGoal"
              required
              type="text"
              placeholder="Ex: Criar reserva de emergência de 3 meses ou comprar equipamento novo"
              value={form.financialGoal}
              onChange={e => setForm({ ...form, financialGoal: e.target.value })}
              className={inputStyles}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-[var(--color-primary-hover)] text-primary-foreground font-medium py-3 rounded-xl transition flex justify-center items-center gap-2 mt-6 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Analisando cenários...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Gerar Diagnóstico Inteligente
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  );
};
