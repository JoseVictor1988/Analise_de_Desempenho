// Arquivo: competencias_tecnicas.js
// Armazena as competências técnicas, agrupadas por DEPARTAMENTO.
// A estrutura é um objeto onde cada chave é o ID/nome de um departamento,
// e o valor é um array de objetos representando as competências técnicas para aquele departamento.

const competenciasTecnicasPorDepartamento = {
  "compras": [
    { id: "cp01", nome: "Negociação com Fornecedores", descricao: "Habilidade em conduzir negociações para obter melhores preços, prazos e condições comerciais." },
    { id: "cp02", nome: "Análise de Custo e Qualidade", descricao: "Capacidade de avaliar propostas considerando custo-benefício, qualidade dos produtos/serviços e reputação do fornecedor." },
    { id: "cp03", nome: "Gestão de Contratos", descricao: "Conhecimento em elaboração, análise e acompanhamento de contratos de fornecimento." },
    { id: "cp04", nome: "Conhecimento de Mercado", descricao: "Entendimento das tendências, principais players e dinâmica de preços do mercado fornecedor." },
    { id: "cp05", nome: "Uso de Sistema ERP (Módulo Compras)", descricao: "Proficiência na utilização do sistema ERP para registro de pedidos, cotações e acompanhamento." },
    { id: "cp06", nome: "Planejamento de Demanda", descricao: "Capacidade de analisar histórico e prever necessidades futuras para otimizar o estoque." }
  ],
  "faturamento": [
    { id: "ft01", nome: "Emissão de Notas Fiscais", descricao: "Conhecimento dos procedimentos e legislação para emissão correta de NF-e e NFS-e." },
    { id: "ft02", nome: "Cálculo de Impostos (ICMS, IPI, PIS/COFINS)", descricao: "Capacidade de calcular e conferir os impostos incidentes nas operações de venda." },
    { id: "ft03", nome: "Conferência de Pedidos", descricao: "Atenção aos detalhes para garantir que os dados do pedido e da nota fiscal estejam consistentes." },
    { id: "ft04", nome: "Uso de Sistema ERP (Módulo Faturamento)", descricao: "Proficiência na operação do sistema para emissão e gerenciamento de documentos fiscais." },
    { id: "ft05", nome: "Resolução de Pendências Fiscais", descricao: "Habilidade em identificar e corrigir erros ou inconsistências em notas fiscais emitidas." },
    { id: "ft06", nome: "Organização de Documentos", descricao: "Manutenção de arquivos digitais e físicos de forma organizada e acessível." }
  ],
  "fiscal": [
    { id: "fs01", nome: "Apuração de Impostos (ICMS, IPI, ISS, PIS/COFINS)", descricao: "Domínio do cálculo e apuração dos tributos diretos e indiretos." },
    { id: "fs02", nome: "Entrega de Obrigações Acessórias (SPED, DCTF)", descricao: "Conhecimento dos prazos e procedimentos para entrega das declarações fiscais." },
    { id: "fs03", nome: "Legislação Tributária", descricao: "Atualização constante sobre as leis e normas fiscais federais, estaduais e municipais." },
    { id: "fs04", nome: "Classificação Fiscal (NCM/CFOP)", descricao: "Habilidade em classificar corretamente produtos e operações fiscais." },
    { id: "fs05", nome: "Análise de Documentos Fiscais", descricao: "Capacidade de verificar a conformidade e correção dos documentos fiscais recebidos e emitidos." },
    { id: "fs06", nome: "Planejamento Tributário Básico", descricao: "Identificação de oportunidades legais para otimização da carga tributária." }
  ],
  "contas_pagar": [
    { id: "pg01", nome: "Lançamento e Conferência de Contas", descricao: "Registro e verificação de documentos (notas, boletos) para pagamento." },
    { id: "pg02", nome: "Agendamento de Pagamentos", descricao: "Organização e controle dos vencimentos para garantir pagamentos pontuais." },
    { id: "pg03", nome: "Conciliação Bancária (Pagamentos)", descricao: "Conferência dos pagamentos realizados com os extratos bancários." },
    { id: "pg04", nome: "Relacionamento com Fornecedores (Financeiro)", descricao: "Comunicação clara sobre pagamentos, pendências e negociação de prazos." },
    { id: "pg05", nome: "Uso de Sistema ERP (Módulo Financeiro)", descricao: "Proficiência na operação do sistema para controle de contas a pagar." },
    { id: "pg06", nome: "Fluxo de Caixa (Previsão de Pagamentos)", descricao: "Capacidade de fornecer informações precisas sobre os desembolsos futuros." }
  ],
  "contas_receber": [
    { id: "rc01", nome: "Emissão e Envio de Boletos/Cobranças", descricao: "Geração e controle do envio de documentos de cobrança aos clientes." },
    { id: "rc02", nome: "Acompanhamento de Recebimentos", descricao: "Monitoramento dos pagamentos recebidos e identificação de pendências." },
    { id: "rc03", nome: "Conciliação Bancária (Recebimentos)", descricao: "Conferência dos recebimentos nos extratos bancários com os registros do sistema." },
    { id: "rc04", nome: "Ações de Cobrança", descricao: "Contato com clientes inadimplentes para negociação e recuperação de crédito." },
    { id: "rc05", nome: "Análise de Crédito (Básica)", descricao: "Avaliação inicial do risco de crédito de novos clientes." },
    { id: "rc06", nome: "Uso de Sistema ERP (Módulo Financeiro)", descricao: "Proficiência na operação do sistema para controle de contas a receber." }
  ],
  "rh": [
    { id: "rh01", nome: "Processo de Recrutamento e Seleção", descricao: "Condução de etapas como divulgação de vagas, triagem de currículos, entrevistas e seleção de candidatos." },
    { id: "rh02", nome: "Administração de Pessoal (Folha, Férias, Benefícios)", descricao: "Conhecimento dos processos de admissão, demissão, controle de ponto, cálculo de folha e gestão de benefícios." },
    { id: "rh03", nome: "Legislação Trabalhista e Previdenciária", descricao: "Entendimento das leis e normas que regem as relações de trabalho." },
    { id: "rh04", nome: "Treinamento e Desenvolvimento", descricao: "Identificação de necessidades, planejamento e execução de ações de treinamento." },
    { id: "rh05", nome: "Comunicação Interna e Endomarketing", descricao: "Habilidade em comunicar informações relevantes aos colaboradores e promover o engajamento." },
    { id: "rh06", nome: "Gestão de Clima Organizacional", descricao: "Aplicação de pesquisas e ações para manter um ambiente de trabalho positivo." }
  ],
  "comercial": [
    { id: "cm01", nome: "Prospecção de Clientes", descricao: "Identificação e abordagem de potenciais clientes para geração de novas oportunidades de negócio." },
    { id: "cm02", nome: "Técnicas de Vendas e Negociação", descricao: "Domínio de abordagens de vendas, contorno de objeções e fechamento de negócios." },
    { id: "cm03", nome: "Conhecimento do Produto/Serviço", descricao: "Profundo entendimento das características, benefícios e diferenciais do que é vendido." },
    { id: "cm04", nome: "Gestão de Relacionamento com Cliente (CRM)", descricao: "Uso de ferramentas e técnicas para manter um relacionamento duradouro e positivo com os clientes." },
    { id: "cm05", nome: "Análise de Mercado e Concorrência", descricao: "Monitoramento das tendências de mercado e ações dos concorrentes para embasar estratégias." },
    { id: "cm06", nome: "Elaboração de Propostas Comerciais", descricao: "Capacidade de criar propostas claras, persuasivas e adequadas às necessidades do cliente." }
  ],
  "logistica": [
    { id: "lg01", nome: "Gestão de Estoque (Armazenagem e Controle)", descricao: "Organização do armazém, controle de entradas/saídas e acuracidade de inventário." },
    { id: "lg02", nome: "Planejamento e Roteirização de Entregas", descricao: "Otimização das rotas e agendamento de entregas para eficiência e redução de custos." },
    { id: "lg03", nome: "Contratação e Negociação de Fretes", descricao: "Busca e negociação com transportadoras para garantir as melhores condições de transporte." },
    { id: "lg04", nome: "Conferência e Expedição de Mercadorias", descricao: "Verificação da conformidade dos produtos separados e organização da expedição." },
    { id: "lg05", nome: "Uso de Sistema WMS/TMS (se aplicável)", descricao: "Proficiência em sistemas de gerenciamento de armazém e/ou transporte." },
    { id: "lg06", nome: "Resolução de Problemas de Transporte", descricao: "Habilidade em lidar com imprevistos como atrasos, avarias ou devoluções." }
  ]
  // Adicione outros departamentos e suas competências se necessário
};

// Renomeado para competenciasTecnicasPorDepartamento para clareza
// Exporta o objeto (se usando módulos ES6)
// export { competenciasTecnicasPorDepartamento };

// Se não estiver usando módulos, estará disponível globalmente. 