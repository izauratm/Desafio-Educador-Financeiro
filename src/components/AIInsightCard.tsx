import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  content?: string;
  loading?: boolean;
}

export const AIInsightCard: React.FC<Props> = ({ content, loading }) => {
  return (
    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Sparkles size={18} />
        </div>
        <h2 className="font-bold text-foreground">Diagnóstico do Educador</h2>
      </div>

      {loading ? (
        <div className="space-y-2">
         
          <Skeleton 
            count={5} 
            baseColor="var(--color-input, #e2e8f0)" 
            highlightColor="var(--color-border, #f1f5f9)" 
          />
        </div>
      ) : content ? (
        <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
          {content}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary-button p-4 rounded-xl">
          <Info size={16} />
          <p>Nenhum insight gerado ainda. Preencha o formulário para começar.</p>
        </div>
      )}
    </div>
  );
};