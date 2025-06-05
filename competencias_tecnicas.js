// Arquivo: competencias_tecnicas.js
// Armazena as competências técnicas, agrupadas por DEPARTAMENTO.
// A estrutura é um objeto onde cada chave é o ID/nome de um departamento,
// e o valor é um array de objetos representando as competências técnicas para aquele departamento.

const competenciasTecnicasPorDepartamento = {
  "motoristas": [
    { id: "mt01", nome: "Pontualidade Rotas", descricao: "Cumpre os horários de saída e retorno das rotas com pontualidade e responsabilidade." },
    { id: "mt02", nome: "Entregas Seguras", descricao: "Realiza as entregas de forma segura, respeitando as leis de trânsito e as normas da empresa." },
    { id: "mt03", nome: "Conferência Carga/NF", descricao: "Confere corretamente os volumes carregados e os dados da nota fiscal antes de sair para a entrega." },
    { id: "mt04", nome: "Atendimento Cliente", descricao: "Trata os clientes com cordialidade e profissionalismo no momento da entrega." },
    { id: "mt05", nome: "Conservação Veículo", descricao: "Cuida da conservação do veículo, informando a liderança sobre eventuais problemas ou manutenções necessárias." },
    { id: "mt06", nome: "Uso EPIs", descricao: "Utiliza corretamente os EPIs durante carga, descarga e em outras atividades externas." },
    { id: "mt07", nome: "Integridade Materiais", descricao: "Zela pela integridade dos materiais transportados, evitando avarias e perdas." },
    { id: "mt08", nome: "Registro Ocorrências", descricao: "Registra e informa imediatamente qualquer ocorrência durante o trajeto (ex: avaria, recusa de material, acidente, atraso)." },
    { id: "mt09", nome: "Documentação de Transporte Organizada.", descricao: "Mantém a documentação de transporte organizada (NF, CTE, canhotos, manifestos, etc.)." },
    { id: "mt10", nome: "Colababoração com Equipe Logística.", descricao: "Colabora com a equipe de separação e conferência, quando necessário, com bom relacionamento." },
    { id: "mt11", nome: "Cumprimento POPs/Segurança.", descricao: "Cumpre os procedimentos operacionais da empresa, incluindo orientações de segurança e POPs." },
    { id: "mt12", nome: "Foco/Equilíbrio Pressão", descricao: "Demonstra atenção, foco e equilíbrio emocional mesmo sob pressão ou em situações adversas." }
  ],
  "separadores": [
    { id: "sp01", nome: "Separação Correta Produtos.", descricao: "Separa corretamente os produtos de acordo com o pedido, sem trocas ou omissões." },
    { id: "sp02", nome: "Uso do sistema ERP durante a separação", descricao: "Utiliza corretamente o sistema ERP durante a separação." },
    { id: "sp03", nome: "Verificação validade/integridade de produtos.", descricao: "Verifica validade, integridade e condição dos produtos antes da separação." },
    { id: "sp04", nome: "Identifica Divergências de Estoque", descricao: "Identifica e sinaliza divergências ou rupturas no estoque." },
    { id: "sp05", nome: "Organização Produtos.", descricao: "Organiza os produtos separados de forma padronizada e lógica." },
    { id: "sp06", nome: "Ambiente Limpo/Seguro", descricao: "Mantém o ambiente limpo, organizado e seguro durante a separação." },
    { id: "sp07", nome: "Uso EPIs (Separação)", descricao: "Usa corretamente os EPIs exigidos pela empresa." },
    { id: "sp08", nome: "Segue Ordem/Prioridade do Sistema.", descricao: "Segue rigorosamente a ordem e prioridades do sistema (não escolhe pedidos)." },
    { id: "sp09", nome: "Prazo/Agilidade.", descricao: "Separa os produtos dentro do prazo estipulado, com agilidade e atenção." },
    { id: "sp10", nome: "Evita Danos/Desperdícios.", descricao: "Atua com cuidado, evitando danos aos itens e desperdícios." },
    { id: "sp11", nome: "Colabora com a equipe.", descricao: "Trabalha de forma colaborativa com conferentes e outros setores." },
    { id: "sp12", nome: "Foco/Responsabilidade sob Pressão", descricao: "Mantém foco e responsabilidade, mesmo sob pressão ou em alta demanda." }
  ],
  "conferentes": [
    { id: "cf01", nome: "Conferência aos Detalhes", descricao: "Confere os pedidos com atenção aos detalhes, evitando falhas e retrabalho." },
    { id: "cf02", nome: "Uso de Sistema/Coletor de dados na conferência", descricao: "Utiliza corretamente o sistema e/ou coletor de dados na conferência." },
    { id: "cf03", nome: "Identifica e Comunica Divergências.", descricao: "Identifica e comunica rapidamente itens divergentes, danificados ou faltantes." },
    { id: "cf04", nome: "Confirma Validade/Integridade.", descricao: "Confirma validade e integridade dos produtos antes da liberação." },
    { id: "cf05", nome: "Preenchimento Checklists", descricao: "Preenche corretamente checklists, registros e atualiza o sistema com precisão." },
    { id: "cf06", nome: "Organização Produtos Conferidos", descricao: "Organiza os produtos conferidos de forma que facilite o fluxo logístico." },
    { id: "cf07", nome: "Acuracidade de Estoque", descricao: "Garante a acuracidade do estoque com conferência precisa e disciplinada." },
    { id: "cf08", nome: "Colabora com Equipe Logística.", descricao: "Trabalha de maneira colaborativa com separadores, motoristas e equipe." },
    { id: "cf09", nome: "Uso EPIs (Conferência)", descricao: "Usa corretamente os EPIs e mantém a segurança no local de trabalho." },
    { id: "cf10", nome: "Cumpre Prazos Operacionais", descricao: "Cumpre os prazos operacionais de conferência sem comprometer a qualidade." },
    { id: "cf11", nome: "Segue POPs", descricao: "Segue os POPs estabelecidos para garantir conformidade e padrão." },
    { id: "cf12", nome: "Iniciativa/Responsabilidade ao Problemas.", descricao: "Demonstra iniciativa e responsabilidade ao resolver problemas e dúvidas." }
  ],
  "compras": [
    { id: "cp01", nome: "Conhece Processos de Compras", descricao: "Possui conhecimento no processos de compras?" },
    { id: "cp02", nome: "Negociação com Fornecedores", descricao: "Habilidade em negociação com fornecedores?" },
    { id: "cp03", nome: "Comparação Fornecedores e Análise de Mercado", descricao: "Habilidade em comparação de fornecedores e análise de mercado interno?" },
    { id: "cp04", nome: "Avaliação de Pedidos", descricao: "Avaliação de pedidos considerando qualidade e prazo?" },
    { id: "cp05", nome: "Redução de Custos", descricao: "Estratégias para Redução de Custos?" },
    { id: "cp06", nome: "Descontos/Condições", descricao: "Consegue negociar descontos ou melhores condições com os fornecedores?" },
    { id: "cp07", nome: "Solução Problemas e Otimizações.", descricao: "Proatividade na solução de problemas e otimização de processos?" },
    { id: "cp08", nome: "Análise e Tomada de Decisão", descricao: "Capacidade de análise e tomada de decisão?" },
    { id: "cp09", nome: "Propõe Melhorias nos Processos", descricao: "O colaborador propõe soluções para melhorar os processos?" },
    { id: "cp10", nome: "Decisão em Situações Complexas", descricao: "Qual sua capacidade de decisão diante de situações complexas?" },
    { id: "cp11", nome: "Garante Pedidos Corretos", descricao: "Garante que os pedidos sejam feitos de forma correta, evitando erros e retrabalho?" },
    { id: "cp12", nome: "Lida com Urgências/Imprevistos", descricao: "Como lida com urgências e imprevistos no processo de aquisição de produtos?" },
  ],
    "comercial": [
    { id: "cm01", nome: "Prospecção de Clientes", descricao: "Identificação e abordagem de potenciais clientes para geração de novas oportunidades de negócio." },
    { id: "cm02", nome: "Técnicas de Vendas e Negociação", descricao: "Domínio de abordagens de vendas, contorno de objeções e fechamento de negócios." },
    { id: "cm03", nome: "Conhecimento do Produto/Serviço", descricao: "Profundo entendimento das características, benefícios e diferenciais do que é vendido." },
    { id: "cm04", nome: "Gestão de Relacionamento com Cliente (CRM)", descricao: "Uso de ferramentas e técnicas para manter um relacionamento duradouro e positivo com os clientes." },
    { id: "cm05", nome: "Análise de Mercado e Concorrência", descricao: "Monitoramento das tendências de mercado e ações dos concorrentes para embasar estratégias." },
    { id: "cm06", nome: "Elaboração de Propostas Comerciais", descricao: "Capacidade de criar propostas claras, persuasivas e adequadas às necessidades do cliente." },
    { id: "cm07", nome: "Proatividade na Captação de Clientes", descricao: "Demonstra proatividade e comprometimento na prospecção e captação de novos clientes, buscando ativamente novas oportunidades." },
    { id: "cm08", nome: "Assertividade no Cadastro de Clientes", descricao: "Realiza o cadastro de clientes com assertividade e precisão, garantindo a integridade e correção dos dados." },
    { id: "cm09", nome: "Foco e Atingimento de Metas", descricao: "Busca consistentemente o atingimento de suas metas individuais e contribui para as metas gerais da empresa." },
    { id: "cm10", nome: "Sugestão de Ideias (Vendas e Equipe)", descricao: "Sugere ativamente ideias inovadoras para impulsionar a captação de clientes, aumentar vendas e aprimorar o desempenho da equipe." },
    { id: "cm11", nome: "Habilidade na Conquista e Fidelização do Cliente", descricao: "Desenvolve e aplica abordagens eficazes para conquistar e fidelizar clientes, demonstrando excelência no relacionamento e na tratativa." }
  ],
  "administrativo": [ // Inclui adm, fiscal, faturamento, contas a pagar e a receber, RH
    { id: "ga01", nome: "Prazos/Organização", descricao: "Cumpre prazos estabelecidos com autonomia e organização." },
    { id: "ga02", nome: "Conhecimento Técnico da Função", descricao: "Demonstra conhecimento técnico necessário para a função." },
    { id: "ga03", nome: "Atenção Detalhes/Evita Erros", descricao: "Tem atenção aos detalhes e evita erros recorrentes." },
    { id: "ga04", nome: "Comunicação Clara/Eficaz", descricao: "Comunica-se de forma clara e eficaz com colegas e liderança." },
    { id: "ga05", nome: "Compromisso Objetivos", descricao: "É comprometido com os objetivos da empresa." },
    { id: "ga06", nome: "Proatividade Resolução de Problemas", descricao: "Demonstra proatividade na resolução de problemas." },
    { id: "ga07", nome: "Pressão/Adversidades", descricao: "Lida bem com pressão e situações adversas." },
    { id: "ga08", nome: "Relacionamento Equipe", descricao: "Mantém bom relacionamento com a equipe." },
    { id: "ga09", nome: "Recebe Feedbacks", descricao: "Recebe feedbacks com maturidade e aplica as orientações." },
    { id: "ga10", nome: "Evolução Profissional", descricao: "Demonstra evolução profissional ao longo do tempo." },
    { id: "ga11", nome: "Comportamento Ético", descricao: "Apresenta comportamento ético e conduta adequada." },
    { id: "ga12", nome: "Responsabilidade com Entregas", descricao: "Demonstra responsabilidade com as entregas." }
  ],
  "rondonia_estrutural": [ // Competências comportamentais do questionário de avaliação
 // Assiduidade
    { id: "pc_as01", nome: "Assiduidade e Cumprimento de Horário", descricao: "O colaborador cumpre regularmente o horário estabelecido e mantém uma frequência estável no trabalho, demonstrando responsabilidade com a carga horária?" },
    { id: "pc_as02", nome: "Comunicação de Ausências/Atrasos", descricao: "Comunica de forma adequada e proativa suas ausências ou atrasos, minimizando impactos na equipe?" },
    { id: "pc_as03", nome: "Impacto da Presença na Equipe", descricao: "Sua presença contribui positivamente para a organização e o fluxo de trabalho da equipe?" },
    // Proatividade
    { id: "pc_pr01", nome: "Antecipação e Busca de Soluções", descricao: "Antecipadamente, busca soluções para possíveis problemas e propõe melhorias nos processos internos?" },
    { id: "pc_pr02", nome: "Iniciativa e Contribuição de Ideias", descricao: "Demonstra iniciativa em aprender novas habilidades ou métodos de trabalho e contribui ativamente com ideias que agregam valor à equipe?" },
    { id: "pc_pr03", nome: "Autonomia na Resolução de Desafios", descricao: "Participa ativamente da resolução de desafios e assume responsabilidades sem depender de orientações constantes?" },
    // Assertividade
    { id: "pc_at01", nome: "Comunicação Clara e Respeitosa", descricao: "Comunica-se de forma clara, objetiva e respeitosa, expressando suas opiniões de forma construtiva?" },
    { id: "pc_at02", nome: "Escuta Ativa e Diálogo Profissional", descricao: "Escuta com atenção e responde de forma adequada e colaborativa, mantendo um diálogo profissional mesmo diante de opiniões divergentes?" },
    { id: "pc_at03", nome: "Segurança e Responsabilidade na Tomada de Decisões", descricao: "Demonstra segurança e responsabilidade ao tomar decisões, sem gerar conflitos desnecessários?" },
    // Desenvolvimento
    { id: "pc_ds01", nome: "Evolução e Aprimoramento Contínuo", descricao: "Apresenta evolução no desempenho de suas atividades e busca constantemente o próprio aprimoramento profissional?" },
    { id: "pc_ds02", nome: "Abertura a Novas Demandas e Adaptação", descricao: "Mostra abertura e disposição para se adaptar a novas demandas e desafios, refletindo progresso em seu desempenho?" },
    { id: "pc_ds03", nome: "Aplicação de Feedbacks para Melhoria", descricao: "Solicita e aplica feedbacks de forma construtiva para melhorar seu rendimento e desempenho?" }

  ]
  // As competências de faturamento, fiscal, contas a pagar, contas a receber, RH e comercial
  // que já existiam e não foram substituídas pelas novas categorias,
  // permanecem inalteradas se não houver instrução para removê-las.
  // Para este pedido, as categorias existentes de faturamento, fiscal, contas a pagar, contas a receber, RH e comercial
  // foram mantidas como estavam no arquivo original, e as novas foram adicionadas ou substituídas.
  // A categoria 'compras' foi completamente substituída.
};

// Exporta o objeto (se usando módulos ES6)
// export { competenciasTecnicasPorDepartamento };

// Se não estiver usando módulos, estará disponível globalmente.