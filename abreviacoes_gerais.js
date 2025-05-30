// Arquivo: abreviacoes_gerais.js
// Mapeia IDs das competenciasGeraisEstruturadas (index.html) para abreviações curtas para uso nos gráficos

const abreviacoesGerais = {
  cat01: {
    nome: 'Comunicação',
    subs: {
      'sub1.1': 'Clareza Expr.',
      'sub1.2': 'Escuta Ativa',
      'sub1.3': 'Adaptação',
    }
  },
  cat02: {
    nome: 'Colaboração e Trabalho em Equipe',
    subs: {
      'sub2.1': 'Ajuda/Compart.',
      'sub2.2': 'Relacionam.',
      'sub2.3': 'Obj. Comuns',
    }
  },
  cat03: {
    nome: 'Resolução de Problemas',
    subs: {
      'sub3.1': 'Análise',
      'sub3.2': 'Soluções',
      'sub3.3': 'Decisão',
    }
  },
  cat04: {
    nome: 'Adaptabilidade e Aprendizado',
    subs: {
      'sub4.1': 'Flexibilidade',
      'sub4.2': 'Abertura Aprend.',
      'sub4.3': 'Resiliência',
    }
  },
  cat05: {
    nome: 'Proatividade e Iniciativa',
    subs: {
      'sub5.1': 'Antecipação',
      'sub5.2': 'Autonomia',
      'sub5.3': 'Melhoria/Otim.',
    }
  },
};

// Mantém compatibilidade para quem já usa abreviacoesGerais['subX.Y']
Object.keys(abreviacoesGerais).forEach(cat => {
  const subs = abreviacoesGerais[cat].subs;
  Object.keys(subs).forEach(sub => {
    abreviacoesGerais[sub] = subs[sub];
  });
});


// Se não usar módulos, ficará global após inclusão no HTML
