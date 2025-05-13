# Manual do Usuário: Sistema de Avaliação de Desempenho

## 1. Introdução

Bem-vindo ao Sistema de Avaliação de Desempenho! Esta aplicação foi desenvolvida para facilitar e padronizar o processo de avaliação de desempenho dos colaboradores, oferecendo flexibilidade e recursos de análise visual dos resultados.

O sistema permite a avaliação de competências comportamentais (Soft Skills) e, dependendo do modo escolhido, competências técnicas específicas por departamento, além de gerar um feedback estruturado.

## 2. Visão Geral das Funcionalidades

*   **Dois Modos de Avaliação:**
    *   **Geral (Padrão):** Avalia um conjunto de 5 categorias de competências gerais, cada uma com 3 sub-avaliações (total de 15 itens). Ideal para uma visão global do desempenho.
    *   **Técnico (Por Estrutura):** Avalia um conjunto fixo de 7 Soft Skills e adiciona 6 competências técnicas específicas do departamento selecionado.
*   **Seleção de Departamento:** No modo "Técnico", é necessário selecionar o departamento do colaborador para carregar as competências técnicas relevantes.
*   **Renderização Dinâmica de Competências:** O formulário exibe as competências a serem avaliadas de acordo com o Modo de Avaliação e o Departamento (no modo Técnico) selecionados.
*   **Tooltips Informativos:** Cada competência/sub-avaliação possui um ícone de interrogação (?) que, ao passar o mouse, exibe uma breve descrição do que está sendo avaliado.
*   **Cálculo de Resultados e Dashboard Visual:**
    *   Calcula a nota geral do colaborador.
    *   No modo "Geral", calcula a média por categoria de competência.
    *   Exibe um dashboard com:
        *   Nota geral e barra de progresso.
        *   Gráfico de Radar: Visualiza a distribuição das notas (5 categorias no modo Geral; 7 Soft Skills + 6 Técnicas no modo Técnico).
        *   Gráfico de Barras/Colunas: Detalha as notas de cada sub-avaliação (modo Geral) ou das 6 competências técnicas (modo Técnico).
        *   Listas de Pontos Fortes (notas >= 3.0) e Pontos de Melhoria (notas < 3.0).
        *   Texto de Avaliação Final Gerada Automaticamente: Um resumo textual baseado na nota geral e nos principais pontos fortes e de melhoria.
*   **Exportação para PDF:**
    *   **PDF do Dashboard:** Gera um PDF visualmente idêntico à aba de resultados, ideal para arquivamento ou compartilhamento rápido.
    *   **PDF do Formulário (Detalhado):** Gera um PDF formatado da ficha de avaliação preenchida, incluindo todos os dados do colaborador, competências avaliadas com suas notas, comentários de feedback e a avaliação final gerada, pronto para impressão e assinatura.
*   **Tema Claro/Escuro:** Botão para alternar o tema da interface, com preferência salva no navegador.
*   **Responsividade Básica:** A interface se adapta a diferentes tamanhos de tela.

## 3. Como Usar a Aplicação

### 3.1. Preenchendo o Formulário de Avaliação (Aba "Formulário")

1.  **Dados do Funcionário e Avaliação:**
    *   **Nome do Funcionário:** Digite o nome completo do colaborador.
    *   **Departamento:** Selecione o departamento ao qual o colaborador pertence. (Obrigatório)
    *   **Modo de Avaliação:**
        *   Escolha "Geral (Padrão)" para avaliar as 15 sub-avaliações gerais.
        *   Escolha "Técnico (Por Estrutura)" para avaliar as 7 Soft Skills e as 6 competências técnicas do departamento selecionado.
    *   **Data da Avaliação:** Selecione a data em que a avaliação está sendo realizada. (Obrigatório)
    *   **Avaliador:** Digite o nome do avaliador. (Obrigatório)

2.  **Avaliação das Competências:**
    *   Com base no "Modo de Avaliação" (e "Departamento", se modo Técnico), a seção "Competências" será preenchida dinamicamente.
    *   Para cada competência ou sub-avaliação listada, selecione uma nota de 1 a 5, onde:
        *   1: Muito Abaixo do Esperado
        *   2: Abaixo do Esperado
        *   3: Atende às Expectativas
        *   4: Supera as Expectativas
        *   5: Excepcional / Supera Consistentemente
    *   Utilize os tooltips (?) ao lado de cada item para entender melhor o critério.

3.  **Comentários e Feedback:**
    *   **Pontos Fortes:** Descreva os pontos fortes observados no colaborador.
    *   **Pontos de Melhoria:** Indique as áreas onde o colaborador pode se desenvolver.
    *   **Plano de Ação:** Sugira ações concretas para o desenvolvimento do colaborador.
    *   **Comentários Adicionais:** Espaço para quaisquer outras observações relevantes.

### 3.2. Calculando e Visualizando os Resultados

1.  Após preencher todos os campos obrigatórios e avaliar as competências, clique no botão **"Calcular Resultados"**.
2.  O sistema processará os dados e automaticamente mudará para a aba **"Resultados"**.
3.  Nesta aba, você verá o dashboard completo com:
    *   Dados do funcionário e da avaliação.
    *   Nota Geral.
    *   Gráfico de Radar.
    *   Gráfico de Barras/Colunas.
    *   Listas de Pontos Fortes e Pontos de Melhoria.
    *   Avaliação Final Gerada automaticamente.
    *   Os comentários que você inseriu no formulário NÃO são exibidos diretamente aqui, mas são usados no "PDF do Formulário".

### 3.3. Exportando os Resultados para PDF

Na aba "Resultados", você encontrará dois botões para exportação:

1.  **"Download Dashboard PDF":**
    *   Clique neste botão para gerar um arquivo PDF da visualização atual do dashboard.
    *   Este PDF é ideal para uma visão geral e rápida dos resultados.

2.  **"Download Formulário PDF":**
    *   Clique neste botão para gerar um PDF detalhado e formatado do formulário de avaliação preenchido.
    *   Este PDF inclui:
        *   Dados do colaborador e da avaliação.
        *   Lista de todas as competências avaliadas com suas respectivas notas.
        *   Os campos de "Pontos Fortes", "Pontos de Melhoria", "Plano de Ação" e "Comentários Adicionais" preenchidos.
        *   A "Avaliação Final Gerada" automaticamente.
        *   Espaços para assinatura do avaliador e do funcionário.
    *   Este PDF é formatado para impressão em A4 e é o documento oficial para registro.

### 3.4. Outras Ações

*   **"Limpar" (na aba Formulário):** Clique para apagar todos os dados inseridos no formulário e redefinir as seleções.
*   **"Voltar ao Formulário" (na aba Resultados):** Clique para retornar à aba "Formulário" e fazer ajustes ou iniciar uma nova avaliação.
*   **Alternar Tema (Ícone 🌙/☀️ no cabeçalho):** Clique para mudar entre o tema claro e escuro da interface.

## 4. Dicas e Observações

*   Certifique-se de que todas as competências foram avaliadas antes de calcular os resultados para uma análise mais precisa.
*   Os campos "Nome do Funcionário", "Departamento", "Data da Avaliação" e "Avaliador" são essenciais para a correta identificação nos PDFs.
*   Os gráficos são gerados com base nas notas fornecidas. Uma maior quantidade de notas válidas (acima de 0) leva a resultados mais representativos.
*   A "Avaliação Final Gerada" é um auxílio e pode ser complementada pelos comentários detalhados fornecidos pelo avaliador.

--- 