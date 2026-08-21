import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { ChatMessage } from "../types/finance";
import { sendChatMessage } from "../services/geminiService";
import ReactMarkdown from "react-markdown";

interface ChatProps {
  simulationId: string;
  initialHistory?: ChatMessage[];
  onUpdateHistory: (newHistory: ChatMessage[]) => void;
}

export const ChatWithEducator: React.FC<ChatProps> = ({
  initialHistory = [],
  onUpdateHistory,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const formattedHistory = updatedMessages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));
      const aiResponseText = await sendChatMessage(
        formattedHistory.slice(0, -1),
        userMsg.text,
      );

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const finalMessages = [...updatedMessages, aiMsg];
      setMessages(finalMessages);
      onUpdateHistory(finalMessages);
    } catch {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Desculpe, ocorreu um erro ao processar sua dúvida. Tente novamente.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
      <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50 rounded-t-2xl">
        <Bot className="w-5 h-5 text-emerald-600" />
        <h3 className="font-bold text-slate-800">
          Conversando com o Educador Financeiro
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-slate-400 text-center text-sm my-auto">
            Tem dúvidas sobre o seu planejamento ou como lidar com um mês fraco?
            Pergunte ao Educador Financeiro!
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Bot size={16} />
              </div>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-2xl text-sm prose prose-sm ${
                msg.sender === "user"
                  ? "bg-emerald-600 text-white rounded-tr-none"
                  : "bg-slate-100 text-slate-800 rounded-tl-none"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
              <span
                className={`block text-[10px] mt-1 text-right ${
                  msg.sender === "user" ? "text-emerald-200" : "text-slate-400"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white shrink-0">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 items-center text-slate-400 text-sm">
            <Bot size={16} className="text-emerald-600 animate-pulse" />
            <Loader2 className="w-4 h-4 animate-spin" /> O educador está
            digitando...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-3 border-t border-slate-100 flex gap-2 bg-white rounded-b-2xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: Como posso cortar R$ 500 sem afetar meu trabalho?"
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
