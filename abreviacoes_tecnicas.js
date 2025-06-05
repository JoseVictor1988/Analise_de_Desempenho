// Arquivo: abreviacoes_tecnicas.js
// Mapeia IDs das competências técnicas para abreviações curtas para uso nos gráficos

const abreviacoesTecnicas = {
  // Motoristas
  mt01: 'Pont. Rotas',
  mt02: 'Entregas Seguras',
  mt03: 'Conf. Carga/NF',
  mt04: 'Atend. Cliente',
  mt05: 'Cons. Veículo',
  mt06: 'Uso EPIs',
  mt07: 'Integ. Materiais',
  mt08: 'Reg. Ocorrências',
  mt09: 'Doc. Transp. Org.',
  mt10: 'Colab. Equipe Log.',
  mt11: 'Cump. POPs/Seg.',
  mt12: 'Foco/Equil. Pressão',

  // Separadores
  sp01: 'Sep. Correta Prod.',
  sp02: 'Uso ERP Sep.',
  sp03: 'Verif. Val./Integ.',
  sp04: 'Identif. Diverg.',
  sp05: 'Org. Prod. Sep.',
  sp06: 'Amb. Limpo/Seguro',
  sp07: 'Uso EPIs (Sep.)',
  sp08: 'Ordem/Prior. Sist.',
  sp09: 'Prazo/Agil. Sep.',
  sp10: 'Evita Danos/Desp.',
  sp11: 'Colab. Conf./Set.',
  sp12: 'Foco/Resp. Pressão',

  // Conferentes
  cf01: 'Conf. Detalhes',
  cf02: 'Uso Sist./Coletor',
  cf03: 'Identif. Com. Diverg.',
  cf04: 'Conf. Val./Integ.',
  cf05: 'Preench. Checklists',
  cf06: 'Org. Prod. Conf.',
  cf07: 'Acurac. Estoque',
  cf08: 'Colab. Equipe Log.',
  cf09: 'Uso EPIs (Conf.)',
  cf10: 'Prazos Operac.',
  cf11: 'Segue POPs',
  cf12: 'Inic./Resp. Probl.',

  // Compras (Atualizado)
  cp01: 'Conhec. Proc. Compras',
  cp02: 'Negoc. Fornec.',
  cp03: 'Comp. Fornec./Anál. Merc.',
  cp04: 'Aval. Pedidos Qual./Prazo',
  cp05: 'Estrat. Red. Custos',
  cp06: 'Negoc. Desc./Cond.',
  cp07: 'Proat. Sol. Probl./Otimiz.',
  cp08: 'Cap. Anál. Tom. Decisão',
  cp09: 'Propõe Melhorias Proc.',
  cp10: 'Cap. Decisão Sit. Comp.',
  cp11: 'Gar. Pedidos Corretos',
  cp12: 'Lida Urg./Imprev.',

  // Geral Administrativo (Adm, Fiscal, Faturamento, Contas a Pagar e a Receber, RH)
  ga01: 'Prazos/Org.',
  ga02: 'Conhec. Técn. Função',
  ga03: 'Atenção Det./Evita Erros',
  ga04: 'Comun. Clara/Eficaz',
  ga05: 'Comprom. Objetivos',
  ga06: 'Proat. Res. Probl.',
  ga07: 'Lida Pressão/Advers.',
  ga08: 'Bom Relac. Equipe',
  ga09: 'Recebe Feedbacks/Aplica',
  ga10: 'Evol. Profissional',
  ga11: 'Comport. Ético',
  ga12: 'Responsab. Entregas',

   // Comercial
  cm01: 'Prosp. Clientes',
  cm02: 'Vend./Negoc.',
  cm03: 'Prod./Serv.',
  cm04: 'CRM',
  cm05: 'Merc./Concorr.',
  cm06: 'Prop. Comerc.',
  cm07: 'Proat. Cap. Clientes',
  cm08: 'Assert. Cad. Clientes',
  cm09: 'Foco/Ating. Metas',
  cm10: 'Sug. Ideias Vendas/Equipe',
  cm11: 'Conquista/Fideliz. Cliente',

  // Plano de Cargos e Salários (Competências Comportamentais)
  // Assiduidade
  pc_as01: 'Assiduidade e Cumprimento de Horário',
  pc_as02: 'Comunicação de Ausências/Atrasos',
  pc_as03: 'Impacto da Presença na Equipe',
  
  // Proatividade
  pc_pr01: 'Antecipação e Busca de Soluções',
  pc_pr02: 'Iniciativa e Contribuição de Ideias',
  pc_pr03: 'Autonomia na Resolução de Desafios',

  // Assertividade
  pc_at01: 'Comunicação Clara e Respeitosa',
  pc_at02: 'Escuta Ativa e Diálogo Profissional',
  pc_at03: 'Segurança e Responsabilidade',
 
  // Desenvolvimento
  pc_ds01: 'Evolução e Aprimoramento Contínuo',
  pc_ds02: 'Abertura a Novas Demandas e Adaptação',
  pc_ds03: 'Aplicação de Feedbacks para Melhoria',
 

  // As abreviações de faturamento, fiscal, contas a pagar, contas a receber, RH e comercial
  // que já existiam e não foram substituídas pelas novas categorias,
  // permanecem inalteradas se não houver instrução para removê-las.
  // Para este pedido, as categorias existentes de faturamento, fiscal, contas a pagar, contas a receber, RH e comercial
  // foram mantidas como estavam no arquivo original, e as novas foram adicionadas ou substituídas.
  // A categoria 'compras' foi completamente substituída.
  ft01: 'Emissão NF',
  ft02: 'Cálc. Imp.',
  ft03: 'Conf. Pedidos',
  ft04: 'ERP Fatur.',
  ft05: 'Pend. Fiscal',
  ft06: 'Org. Doc.',
  // Fiscal
  fs01: 'Apur. Imp.',
  fs02: 'Obr. Acess.',
  fs03: 'Leg. Trib.',
  fs04: 'Class. Fiscal',
  fs05: 'Anál. Doc.',
  fs06: 'Plan. Trib.',
  // Contas a Pagar
  pg01: 'Lanç. Contas',
  pg02: 'Agend. Pagto',
  pg03: 'Conc. Bancária',
  pg04: 'Rel. Fornec.',
  pg05: 'ERP Fin.',
  pg06: 'Fluxo Caixa',
  // Contas a Receber
  rc01: 'Emiss. Boletos',
  rc02: 'Acomp. Receb.',
  rc03: 'Conc. Bancária',
  rc04: 'Cobrança',
  rc05: 'Anál. Crédito',
  rc06: 'ERP Fin.',
  // RH
  rh01: 'Recrut. Sel.',
  rh02: 'Adm. Pessoal',
  rh03: 'Leg. Trab.',
  rh04: 'Trein. Desenv.',
  rh05: 'Com. Interna',
  rh06: 'Gest. Clima',
  // Comercial
  cm01: 'Prosp. Clientes',
  cm02: 'Vend./Negoc.',
  cm03: 'Prod./Serv.',
  cm04: 'CRM',
  cm05: 'Merc./Concorr.',
  cm06: 'Prop. Comerc.'
};

// Se não usar módulos, ficará global após inclusão no HTML