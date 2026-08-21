import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    "ERRO: A variável VITE_GEMINI_API_KEY não foi encontrada no .env.local",
  );
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function generateFinancialDiagnosis(data: {
  profession: string;
  avgMonthlyIncome: number;
  goodMonthIncome: number;
  badMonthIncome: number;
  personalExpenses: number;
  professionalExpenses: number;
  financialGoal: string;
}): Promise<string> {
  const prompt = `
    Atue como um Educador Financeiro Inteligente, profissional, estratégico, objetivo, prático e encorajador, especialista em autônomos, freelancers e MEIs.
    O usuário é um(a) ${data.profession}.
    Dados financeiros:
    - Renda Média Mensal: R$ ${data.avgMonthlyIncome}
    - Mês Bom: R$ ${data.goodMonthIncome}
    - Mês Fraco: R$ ${data.badMonthIncome}
    - Despesas Pessoais: R$ ${data.personalExpenses}
    - Despesas Profissionais: R$ ${data.professionalExpenses}
    - Meta Financeira: ${data.financialGoal}

    Elabore um diagnóstico personalizado contendo:
    1. Análise Clara da Instabilidade de Renda e separação de contas.
    2. Plano de Reserva para meses fracos (baseado nos números informados).
    3. Insights acionáveis no formato "Por que fazer" e "Como fazer".
    4. Linguagem simples, sem jargões complexos, direta ao ponto e motivadora.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return response.text || "Não foi possível gerar o diagnóstico no momento.";
  } catch (error) {
    console.error("Erro detalhado da API Gemini:", error);
    throw new Error(
      "Falha na comunicação com a IA. Verifique sua chave de API e conexão.",
    );
  }
}

export async function sendChatMessage(
  history: { sender: string; text: string }[],
  newMessage: string,
): Promise<string> {
  try {
    const formattedHistory = history.map((h) => ({
      role: h.sender === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    }));

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      history: formattedHistory,
    });

    const result = await chat.sendMessage({
      message: newMessage,
    });

    return result.text || "Sem resposta da IA.";
  } catch (error) {
    console.error("Erro detalhado no Chat Gemini:", error);
    throw new Error("Erro ao responder mensagem.");
  }
}
