<div align="center">

# 💰 Desafio Criativo: Planej-IA  
### Prototipação do Educador Financeiro Inteligente para Autônomos - MEIs

</div>


## Passo 1: Definação do papel do Educador Financeiro

Criação de um Educador Financeiro Inteligente voltado para **profissionais autônomos e freelancers e MEIs** proposto pela plataforma de estudos da [Dio.me](https://web.dio.me/). 
O principal problema das pessoas autônomas é **a instabilidade da renda mensal e dificuldade em separar despesas pessoais das profissionais, não sabendo lidar com a instabilidade de renda**. 
A solução deve ajudar o usuário a **organizar e separar as entradas e saídas de dinheiro, planejar reservas para meses de baixa demanda e estruturar metas de crescimento financeiro sustentável**. 
O sistema deve se comunicar de forma **profissional, estratégico, objetivo, prático e encorajador**, transmitindo segurança mesmo em cenários de renda variável.

---

## Passo 2: Adicionando recursos e experiências inteligentes

O Educador Financeiro Inteligente deve possuir os seguintes recursos:  
1. **Controle de fluxo de caixa com categorização de despesas pessoais e profissionais**  
2. **Simulação de cenários de renda variável (meses bons e meses fracos)**  
3. **Alertas e recomendações personalizadas para manter reservas financeiras**  

A IA deve adaptar as recomendações com base em **histórico de faturamento, sazonalidade da área de atuação e metas do usuário**. 
Evitar respostas como: **fórmulas matemáticas complexas, jargões genéricas ou excessivamente técnicos que não considerem a realidade dos autônomos**. 
As sugestões devem ser apresentadas no formato **listas curtas, comparações visuais e exemplos aplicados ao dia a dia do trabalho autônomo, insights acionáveis ("Por que fazer" e "Como fazer")**.

---

## Passo 3: Proposta Completa (Prompt Final)

Atuação como um especialista em educação financeira digital. 
Criação da proposta de um Educador Financeiro Inteligente para **profissionais autônomos e freelancers/MEIs**. O sistema deve ajudar o usuário a **equilibrar renda variável, separar gastos pessoais e profissionais e criar reservas para períodos de baixa demanda**.  

As principais funcionalidades devem incluir:  
- **Dashboard de fluxo de caixa com categorias personalizadas**  
- **Simulação de cenários de renda variável**  (meses bons vs. meses fracos)  
- **Alertas e recomendações para reservas financeiras e metas de crescimento**
- **Insights aplicados ao cotidiano dos autônomos**  

A comunicação deve ser **objetiva, prática e encorajadora**.  
As respostas devem seguir o formato **de listas claras e exemplos aplicados ao cotidiano dos autônomos**.  

Evite **respostas genéricas e termos técnicos complexos**.  

---
## 🗂️ Layout do Projeto
- Aplicação com formulário multi-step
- Sistema de temas (claro/escuro)
- Persistência de dados com localStorage
- Integração com IA generativa

---

## 💡 Sugestões criativas para frontend interativo: Experiência do Usuário

- Criação de um **painel dinâmico de fluxo de caixa** com cores diferentes para entradas e saídas.  
- Implementação de **gráficos comparativos de meses bons vs. meses fracos**.  
- Adição de um **sistema de metas gamificado**, onde o usuário desbloqueia conquistas ao manter reservas financeiras.  
- Disponibilização de **cards de dicas rápidas** voltadas para autônomos (ex: “Reserve 10% da renda deste mês para emergências”).  
- Sugestões de **plataformas de pagamento e bancos digitais** para controle financeiro e investimentos.  
---

## 🛠️ Tecnologias Utilizadas  

- **React.js** → frontend interativo  
- **IA Generativa** → recomendações personalizadas  
- **Styled Components / TailwindCSS** → design responsivo  
- **Chart.js / Recharts** → visualização de dados  
- **Node.js** → integração backend  

---

## 📂 Estrutura das Pastas  

```bash
📦 planej-ai
 ┣ 📂 .vscode              # Configurações do VSCode
 ┣ 📂 node_modules         # Dependências do projeto
 ┣ 📂 src                  # Código-fonte principal
 ┃ ┣ 📂 assets             # imagens, ícones e recursos visuais
 ┃ ┣ 📂 components         # Componentes reutilizáveis (botões, cards, gráficos)
 ┃ ┣ 📂 context            # Contextos globais (ex: finanças)
 ┃ ┣ 📂 pages              # Páginas principais (Dashboard, Metas, Configurações)
 ┃ ┣ 📂 services           # Serviços e integrações (APIs, IA, requisições)
 ┃ ┣ 📂 types              # Definições de tipos TypeScript
 ┃ ┣ 📜 App.tsx            # Componente raiz da aplicação
 ┃ ┣ 📜 global.d.ts        # Tipos globais
 ┃ ┣ 📜 index.css          # Estilos globais
 ┃ ┗ 📜 main.tsx           # Ponto de entrada da aplicação
 ┣ 📜 .env.local           # Variáveis de ambiente locais
 ┣ 📜 .gitignore           # Arquivos ignorados pelo Git
 ┣ 📜 index.html           # HTML principal
 ┣ 📜 LICENSE              # Licença do projeto
 ┣ 📜 package-lock.json    # Lock das dependências
 ┣ 📜 package.json         # Configuração do projeto e dependências
 ┣ 📜 README.md            # Documentação do projeto
 ┣ 📜 tsconfig.json        # Configuração do TypeScript
 ┗ 📜 vite.config.ts       # Configuração do Vite
```
---
## 🏷️ Estilos Utilizados  

### 🎨 Paleta de Cores  
- **Verde (#4CAF50)** → entradas de dinheiro  
- **Vermelho (#F44336)** → saídas de dinheiro  
- **Azul (#2196F3)** → metas e reservas  
- **Cinza (#9E9E9E)** → elementos neutros  

### ✍️ Tipografia  
- **Roboto / Open Sans** → foco em legibilidade  
- **Títulos em bold**  
- **Textos em regular**  
---

## 🖼️ Screenshots do Projeto

### 1. Dashboard de Fluxo de Caixa  
![Dashboard](./src/assets/img2.png)  
Visualização geral das entradas e saídas de dinheiro.   

---

### 2. Simulação de Cenários de Renda Variável  
![Simulação](./src/assets/img1.png)  
Comparativo entre meses de alta e baixa demanda, permitindo planejar reservas financeiras de forma estratégica.  

---
### 3. Gráfico de Reservas Financeiras  
![Reservas](./src/assets/img6.png)  
Exibição das reservas acumuladas ao longo dos meses, destacando a importância da disciplina financeira.  

---

### 4. Diagnóstico Financeiro  
![Relatório](./src/assets/img3.png)  
Resumo com indicadores de desempenho, insights acionáveis e recomendações personalizadas para o usuário.  

---
### 5. Chat Educador Financeiro  
![Relatório](./src/assets/img4.png)  
Resposta a dúvidas ou questionamentos do usuário. 

---

### 6. Histórico das Simulações
![Relatório](./src/assets/img5.png)  
Resposta a dúvidas, questionamentos ou perguntas sobre a simulação realizada pelo usuário.


---
📎 Link do curso: [DIO.me](https://web.dio.me/home) 
