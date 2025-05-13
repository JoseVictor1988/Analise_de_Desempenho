// Definindo constantes no escopo global
const COLORS = {
  forte: '#66BB6A', // Verde Suave (como sugerido anteriormente, ou ajuste conforme necessário)
  neutro: '#FFA000', // Laranja/Amarelo
  fraco: '#FF7043', // Vermelho/Laranja Suave (como sugerido anteriormente, ou ajuste conforme necessário)
  primario: '#1976D2', // Azul
  softskill_radar: 'rgba(52, 152, 219, 0.7)', // Azul claro para radar
  softskill_radar_fill: 'rgba(52, 152, 219, 0.2)'
};

const SCORE_THRESHOLDS = {
  fraco: 3.0, // Alterado para < 3.0
  forte: 3.0  // Alterado para >= 3.0
};

// --- generateFinalEvaluationText --- (MOVIDA PARA O TOPO)
function generateFinalEvaluationText(results) {
  if (!results) return "Não foi possível gerar a avaliação.";

  const overallScore = results.overall;
  let evaluationText = "";

  // 1. Avaliação Geral com base na nota
  evaluationText += `Desempenho Geral: ${overallScore.toFixed(1)}/5.0. `;
  if (overallScore >= 4.0) {
    evaluationText += "Desempenho excelente, consistentemente superando as expectativas.";
  } else if (overallScore >= 3.0) {
    evaluationText += "Desempenho bom, atende às expectativas da função.";
  } else if (overallScore >= 2.0) {
    evaluationText += "Desempenho regular, com necessidade de desenvolvimento em alguns pontos.";
  } else if (overallScore > 0) {
    evaluationText += "Desempenho abaixo do esperado, requer atenção e plano de desenvolvimento claros.";
  } else {
    evaluationText += "Não foi possível calcular uma avaliação final válida.";
    return evaluationText; // Retorna cedo se não houver nota válida
  }
  evaluationText += "\n\n";

  // 2. Pontos Fortes (Usando os mesmos dados da lista)
  const pontosFortes = results.strengthWeaknessData.filter(c => c.nota >= SCORE_THRESHOLDS.forte && c.nota > 0).sort((a, b) => b.nota - a.nota);
  if (pontosFortes.length > 0) {
    evaluationText += "Pontos Fortes Destacados:\n";
    pontosFortes.slice(0, 3).forEach(p => { // Lista os top 3, por exemplo
      evaluationText += `- ${p.nome} (Nota: ${p.nota.toFixed(1)})\n`;
    });
  } else {
    evaluationText += "Nenhum ponto forte específico destacado (nota >= 3.0).\n";
  }
  evaluationText += "\n";

  // 3. Pontos de Melhoria (Usando os mesmos dados da lista)
  const pontosFracos = results.strengthWeaknessData.filter(c => c.nota < SCORE_THRESHOLDS.fraco && c.nota > 0).sort((a, b) => a.nota - b.nota);
  if (pontosFracos.length > 0) {
    evaluationText += "Áreas para Desenvolvimento:\n";
    pontosFracos.slice(0, 3).forEach(p => { // Lista os top 3, por exemplo
      evaluationText += `- ${p.nome} (Nota: ${p.nota.toFixed(1)})\n`;
    });
  } else {
    evaluationText += "Nenhuma área principal para desenvolvimento identificada (nota < 3.0).\n";
  }

  return evaluationText;
}
// --- FIM generateFinalEvaluationText ---

// --- DEFINIÇÕES DE FUNÇÕES GLOBAIS ---

// --- calculateDynamicResults --- (Definição completa movida para cá)
function calculateDynamicResults() {
  console.log("Calculando resultados dinâmicos...");
  const evaluationMode = document.getElementById('evaluation-mode')?.value;
  const departmentId = document.getElementById('employee-department-select')?.value;

  let totalScores = { softskill: 0, tecnica: 0 };
  let counts = { softskill: 0, tecnica: 0 };
  let evaluatedScoresMap = new Map(); // Mapa para armazenar {competencyId: score}
  let allEvaluatedCompetencies = []; // Array de {id, nome, tipo, nota, categoryId (opcional)} para pontos fortes/fracos
  const competenciesContainer = document.getElementById('dynamic-competencies-area');

  // 1. Coleta as notas que FORAM EFETIVAMENTE marcadas no formulário
  const criteriaItems = competenciesContainer.querySelectorAll('.criteria-item');
  let anyAnswered = false;
  criteriaItems.forEach(item => {
    const ratingGroup = item.querySelector('.rating-group');
    const checkedRadio = ratingGroup ? ratingGroup.querySelector('input[type="radio"]:checked') : null;
    const competencyId = ratingGroup ? ratingGroup.getAttribute('data-competency-id') : null;
    const competencyType = ratingGroup ? ratingGroup.getAttribute('data-competency-type') : null;
    const competencyName = item.querySelector('.criteria-title')?.textContent.trim() || 'Competência Desconhecida'; // Pega o nome
    const categoryId = ratingGroup ? ratingGroup.getAttribute('data-category-id') : null; // Pega o ID da categoria (Modo Geral)

    if (checkedRadio && competencyId && competencyType) {
      const score = parseInt(checkedRadio.value, 10);
      if (!isNaN(score)) {
        evaluatedScoresMap.set(competencyId, score);
        allEvaluatedCompetencies.push({ id: competencyId, nome: competencyName, tipo: competencyType, nota: score, categoryId: categoryId });
        anyAnswered = true;
      } else {
        // Considera 'não avaliado' ou 0 se o valor não for número
        evaluatedScoresMap.set(competencyId, 0);
        allEvaluatedCompetencies.push({ id: competencyId, nome: competencyName, tipo: competencyType, nota: 0, categoryId: categoryId });
      }
    } else if (competencyId && competencyName && competencyType) {
      // Se o item existe mas não foi marcado
      if (!evaluatedScoresMap.has(competencyId)) {
        evaluatedScoresMap.set(competencyId, 0); // Considera 0 se não marcado
        allEvaluatedCompetencies.push({ id: competencyId, nome: competencyName, tipo: competencyType, nota: 0, categoryId: categoryId });
      }
    }
  });

  // Se absolutamente nada foi respondido, avisa e sai.
  if (!anyAnswered && !document.getElementById('pdf-form-template').contains(competenciesContainer)) { // Adicionada checagem para não alertar durante a geração do PDF
    alert("Nenhuma competência foi avaliada. Por favor, preencha o formulário.");
    console.log("Cálculo cancelado - nenhuma competência avaliada.");
    return null;
  }

  // 2. Prepara dados para Gráficos e Médias
  let radarLabels = [];
  let radarScores = [];
  let barLabels = [];   // 5 Gerais ou 6 Técnicas
  let barScores = [];
  let barCompetenciesData = []; // Array de {nome, nota} para gráfico de barras
  let categoryAverages = {}; // Armazena { categoryId: { total: x, count: y, average: z, name: n } } no Modo Geral
  let strengthWeaknessDataSource = []; // Dados base para Pts Fortes/Fracos (Médias de Cat. ou Notas Ind.)

  // Processa Soft Skills (para média comportamental, se necessário no futuro)
  const allSoftSkills = typeof softSkills !== 'undefined' && Array.isArray(softSkills) ? softSkills : [];
  allSoftSkills.forEach(comp => {
    const score = evaluatedScoresMap.get(comp.id) ?? 0;
    // radarLabels e radarScores são definidos abaixo dependendo do modo
    totalScores.softskill += score; // Acumula mesmo que não use a média agora
    if (score > 0) counts.softskill++;
  });

  // Processa Competências para Gráfico de Barras, Radar e Pontos Fortes/Fracos
  if (evaluationMode === 'technical') {
    // --- MODO TÉCNICO ---
    console.log("Calculando para Modo Técnico...");
    strengthWeaknessDataSource = []; // Reset
    radarLabels = []; // Reset
    radarScores = []; // Reset

    // 1. Adiciona Soft Skills ao Radar e Pontos F/F
    allSoftSkills.forEach(comp => {
      const score = evaluatedScoresMap.get(comp.id) ?? 0;
      radarLabels.push(comp.nome); // Nome da Soft Skill para o Radar
      radarScores.push(score);     // Nota da Soft Skill para o Radar
      if (score > 0) { // Só considera se avaliado para pontos F/F
        strengthWeaknessDataSource.push({ nome: comp.nome, nota: score });
      }
    });

    // 2. Adiciona Técnicas ao Gráfico de Barras, Radar e Pontos F/F
    if (departmentId && typeof competenciasTecnicasPorDepartamento !== 'undefined') {
      const tecnicasDepartamento = competenciasTecnicasPorDepartamento[departmentId] || [];
      tecnicasDepartamento.forEach(comp => {
        const score = evaluatedScoresMap.get(comp.id) ?? 0;
        barLabels.push(comp.nome);
        barScores.push(score);
        barCompetenciesData.push({ nome: comp.nome, nota: score });
        totalScores.tecnica += score;
        if (score > 0) counts.tecnica++;
        strengthWeaknessDataSource.push({ nome: comp.nome, nota: score });
        radarLabels.push(comp.nome); // Nome da Técnica para o Radar
        radarScores.push(score);     // Nota da Técnica para o Radar
      });
    }

  } else {
    // --- MODO GERAL ---
    console.log("Calculando para Modo Geral...");
    strengthWeaknessDataSource = []; // Reset
    categoryAverages = {}; // Reset
    radarLabels = []; // Reset - Radar terá as 5 categorias
    radarScores = []; // Reset - Radar terá as médias das 5 categorias

    // Inicializa médias das categorias
    if (typeof competenciasGeraisEstruturadas !== 'undefined') {
      competenciasGeraisEstruturadas.forEach(cat => {
        categoryAverages[cat.categoriaId] = { total: 0, count: 0, average: 0, name: cat.categoriaNome };
      });
    }

    // Gráfico de Barras: Usa as 15 sub-avaliações
    // Calcula médias das categorias ao mesmo tempo
    allEvaluatedCompetencies.filter(c => c.tipo === 'geral').forEach(comp => {
      barLabels.push(comp.nome); // Nome da sub-avaliação
      barScores.push(comp.nota);
      barCompetenciesData.push({ nome: comp.nome, nota: comp.nota });

      // Acumula para média da categoria
      if (comp.categoryId && categoryAverages[comp.categoryId]) {
        categoryAverages[comp.categoryId].total += comp.nota;
        if (comp.nota > 0) {
          categoryAverages[comp.categoryId].count++;
        }
      }
    });

    // Finaliza cálculo das médias das categorias e prepara para Pontos Fortes/Fracos e Radar
    Object.keys(categoryAverages).forEach(catId => {
      const cat = categoryAverages[catId];
      cat.average = cat.count > 0 ? parseFloat((cat.total / cat.count).toFixed(1)) : 0;
      // Usa a MÉDIA DA CATEGORIA para os pontos fortes/fracos no modo geral
      strengthWeaknessDataSource.push({ nome: cat.name, nota: cat.average });
      // Usa a MÉDIA DA CATEGORIA para o Radar no modo geral
      radarLabels.push(cat.name);
      radarScores.push(cat.average);
      console.log(`Categoria ${cat.name}: Média ${cat.average} (Total ${cat.total} / Count ${cat.count})`);
    });

  }

  // 3. Calcula a média GERAL (baseada em TODAS as sub-avaliações > 0 ou soft/tec > 0)
  // Recalcula validScoresForOverall com base nas notas REAIS coletadas
  const validScoresForOverall = allEvaluatedCompetencies.filter(c => c.nota > 0).map(c => c.nota);
  const overallAverage = validScoresForOverall.length > 0
    ? (validScoresForOverall.reduce((a, b) => a + b, 0) / validScoresForOverall.length).toFixed(1)
    : 0;

  const behavioralAverage = counts.softskill > 0 ? (totalScores.softskill / counts.softskill).toFixed(1) : 0;
  const technicalAverage = counts.tecnica > 0 ? (totalScores.tecnica / counts.tecnica).toFixed(1) : 0;

  console.log(`Resultados Calculados: Geral=${overallAverage}, Comp.=${behavioralAverage}, Téc.=${technicalAverage}`);
  console.log(`Radar Labels (${radarLabels.length}):`, radarLabels);
  console.log(`Radar Scores (${radarScores.length}):`, radarScores);
  console.log(`Bar Labels (${barLabels.length}):`, barLabels);
  console.log(`Bar Scores (${barScores.length}):`, barScores);

  return {
    overall: parseFloat(overallAverage),
    behavioral: parseFloat(behavioralAverage),
    technical: parseFloat(technicalAverage),
    categoryAverages: categoryAverages,
    labels: radarLabels,         // Labels para Radar (5 Cat no Geral, 7+6 no Técnico)
    scores: radarScores,         // Scores para Radar (Médias Cat no Geral, Notas Ind. no Técnico)
    barCompetencies: barCompetenciesData, // Dados para Gráfico de Barras (15 sub-avals ou 6 tecs)
    strengthWeaknessData: strengthWeaknessDataSource, // Dados para Pts Fortes/Fracos (médias cat ou notas ind.)
    counts: counts               // Contagem de notas > 0 por tipo
  };
}

// --- setTextContent --- (Definição completa movida para cá)
function setTextContent(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = text;
  }
}

// --- populateStrengthWeaknessList --- (Definição completa movida para cá)
function populateStrengthWeaknessList(listSelector, items, baseColor) {
  const listElement = document.querySelector(listSelector);
  if (!listElement) return;

  listElement.innerHTML = ''; // Limpa lista anterior

  if (items.length === 0) {
    listElement.innerHTML = `<li class="italic" style="color: var(--text-color); opacity: 0.7;">Nenhum item nesta categoria.</li>`;
    return;
  }

  items.forEach(item => {
    const li = document.createElement('li');
    // Adapte classes CSS conforme necessário, usando flex para alinhar itens
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.padding = '4px 0'; // Espaçamento vertical pequeno

    const itemName = document.createElement('span');
    itemName.textContent = item.nome;
    itemName.style.fontWeight = '500'; // Fonte um pouco mais forte para o nome

    const itemNote = document.createElement('span');
    itemNote.textContent = item.nota.toFixed(1);
    itemNote.style.fontWeight = 'bold';
    itemNote.style.padding = '3px 6px'; // Padding interno da "caixa" da nota
    itemNote.style.borderRadius = 'var(--border-radius)';
    itemNote.style.border = `2px solid ${baseColor}`;
    itemNote.style.color = 'var(--text-color)'; // Cor do texto da nota igual ao texto normal
    itemNote.style.backgroundColor = 'transparent'; // Fundo transparente
    itemNote.style.minWidth = '30px'; // Largura mínima para alinhar
    itemNote.style.textAlign = 'center';

    li.appendChild(itemName);
    li.appendChild(itemNote);
    listElement.appendChild(li);
  });
}

// --- generateRadarChart --- (Definição completa movida para cá)
let radarChartInstance = null;
function generateRadarChart(labels, dataScores) {
  const ctx = document.getElementById('skills-radar-chart')?.getContext('2d');
  if (!ctx) {
    console.error("Contexto do gráfico Radar não encontrado.");
    return;
  }

  // Verifica se temos dados válidos
  if (!labels || !dataScores || labels.length === 0 || labels.length !== dataScores.length) {
    console.warn("Dados inválidos ou insuficientes para o gráfico Radar.");
    // Limpa gráfico anterior se existir
    if (radarChartInstance) {
      radarChartInstance.destroy();
      radarChartInstance = null;
    }
    // Poderia exibir uma mensagem no lugar do canvas
    return;
  }

  if (radarChartInstance) {
    radarChartInstance.destroy(); // Destroi gráfico anterior se existir
  }

  // Verifica se Chart está definido (Chart.js carregado?)
  if (typeof Chart === 'undefined') {
    console.error("Chart.js não está carregado. Não é possível criar o gráfico Radar.");
    return;
  }

  try {
    radarChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pontuação',
          data: dataScores,
          fill: true,
          backgroundColor: COLORS.softskill_radar_fill, // Usando cor definida
          borderColor: COLORS.softskill_radar,         // Usando cor definida
          pointBackgroundColor: COLORS.softskill_radar,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: COLORS.softskill_radar
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 3 // Linha mais grossa
          },
          point: { // Estilo dos pontos nos vértices
            radius: 4,
            hoverRadius: 6,
            pointStyle: 'rectRounded'
          }
        },
        scales: {
          r: { // Configuração do eixo radial (notas)
            beginAtZero: true,
            min: 0,
            max: 5,
            stepSize: 1,
            angleLines: { display: true, lineWidth: 1.5, color: '#000000' }, // Mais grossa e preta
            grid: { // Linhas da grade circular
              lineWidth: 1.5, // Mais grossa
              color: '#000000' // Preta
            },
            pointLabels: { // Labels das competências nos eixos
              font: {
                size: 14,
                weight: '500'
              },
              color: '#000000'
            },
            ticks: { // Labels das notas (1, 2, 3, 4, 5)
              color: '#000000',
              font: {
                weight: 'bold',
                size: 12 // Adicionado/Aumentado para melhor legibilidade
              }
            }
          }
        },
        plugins: {
          legend: { display: false }, // O label no dataset já é suficiente
          title: {
            display: true,
            text: 'Distribuição das Competências'
          },
          tooltip: { // Configuração dos tooltips
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                // context.label tem o nome da competência (label do eixo)
                // context.parsed.r tem o valor numérico (score)
                if (context.parsed.r !== null) {
                  label += `${context.parsed.r.toFixed(1)}`; // Exibe a nota com 1 decimal
                }
                return label;
              },
              title: function (context) {
                // context[0].label tem o nome da competência (label do eixo)
                return context[0].label;
              }
            }
          }
        }
      }
    });
    console.log("Gráfico Radar gerado/atualizado.");
  } catch (error) {
    console.error("Erro ao criar gráfico Radar:", error);
  }
}

// --- generateBarChart --- (Definição completa movida para cá)
let barChartInstance = null;
function generateBarChart(competenciesData) {
  const ctx = document.getElementById('category-bar-chart')?.getContext('2d');
  if (!ctx) {
    console.error("Contexto do gráfico de Barras não encontrado.");
    return;
  }

  const labels = competenciesData.map(c => c.nome);
  const dataValues = competenciesData.map(c => c.nota);

  // Determina a cor de cada barra
  const backgroundColors = competenciesData.map(c =>
    c.nota < SCORE_THRESHOLDS.fraco ? COLORS.fraco :
      c.nota >= SCORE_THRESHOLDS.forte ? COLORS.forte :
        COLORS.neutro
  );
  const borderColors = backgroundColors; // Usar a mesma cor para borda

  if (barChartInstance) {
    barChartInstance.destroy();
  }

  // Verifica se Chart está definido
  if (typeof Chart === 'undefined') {
    console.error("Chart.js não está carregado. Não é possível criar o gráfico de Barras.");
    return;
  }

  try {
    barChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nota', // Label do dataset
          data: dataValues,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { // Eixo das categorias/competências
            ticks: { font: { size: 10 } } // Ajustar tamanho da fonte se necessário
          },
          y: { // Eixo das notas
            beginAtZero: true,
            max: 5
          }
        },
        plugins: {
          legend: { display: false }, // Legenda geralmente desnecessária para poucas barras
          title: {
            display: true,
            text: 'Notas por Competência' // Título mais específico
          }
        }
      }
    });
    console.log("Gráfico de Barras gerado/atualizado.");
  } catch (error) {
    console.error("Erro ao criar gráfico de Barras:", error);
  }
}

// --- displayResults --- (Definição completa movida para cá)
function displayResults(results) {
  if (!results) return;

  // --- Preencher Cabeçalho do Dashboard ---
  const nomeFunc = document.getElementById('employee-name')?.value || 'Não informado';
  const deptoSelect = document.getElementById('employee-department-select');
  const deptoNome = deptoSelect?.options[deptoSelect?.selectedIndex]?.text || 'Não informado';
  const dataAvalInput = document.getElementById('evaluation-date'); // Pegar o input
  let dataAval = dataAvalInput?.value || 'Não informado'; // Pegar o valor

  // Formatar data para DD/MM/YYYY (igual ao PDF detalhado)
  if (dataAval !== 'Não informado' && dataAval.match(/^\d{4}-\d{2}-\d{2}$/)) {
    try {
      const [year, month, day] = dataAval.split('-');
      dataAval = `${day}/${month}/${year}`;
    } catch (e) {
      console.error("Erro ao formatar data para dashboard:", e);
      dataAval = dataAvalInput?.value || 'Não informado'; // Mantém original em caso de erro
    }
  }

  setTextContent('#dashboard-employee-name', nomeFunc);
  setTextContent('#dashboard-department', deptoNome);
  setTextContent('#dashboard-eval-date', dataAval); // Usar a data formatada

  // --- Preencher Nota Geral ---
  setTextContent('#dashboard-overall-score', results.overall.toFixed(1));
  const progressBar = document.getElementById('dashboard-overall-progress');
  if (progressBar) {
    progressBar.style.width = `${(results.overall / 5) * 100}%`;
    // Opcional: Mudar cor da barra baseado na nota
    progressBar.style.backgroundColor = results.overall < SCORE_THRESHOLDS.fraco ? COLORS.fraco :
      results.overall > SCORE_THRESHOLDS.forte ? COLORS.forte :
        COLORS.neutro;
  }

  // --- Gerar Gráficos ---
  // Gráfico Radar: Sempre com as 7 Soft Skills
  generateRadarChart(results.labels, results.scores);

  // Gráfico de Barras: 5 Gerais ou 6 Técnicas
  generateBarChart(results.barCompetencies); // Passa o array {nome, nota}

  // --- Identificar e Listar Pontos Fortes e Fracos ---
  const pontosFortes = results.strengthWeaknessData.filter(c => c.nota >= SCORE_THRESHOLDS.forte && c.nota > 0).sort((a, b) => b.nota - a.nota);
  const pontosFracos = results.strengthWeaknessData.filter(c => c.nota < SCORE_THRESHOLDS.fraco && c.nota > 0).sort((a, b) => a.nota - b.nota);

  populateStrengthWeaknessList('#dashboard-strengths-list', pontosFortes, COLORS.forte);
  populateStrengthWeaknessList('#dashboard-weaknesses-list', pontosFracos, COLORS.fraco);

  // --- Preencher Comentários ---
  const strengthsComment = document.getElementById('strengths')?.value || 'Nenhum comentário.';
  const improvementsComment = document.getElementById('improvements')?.value || 'Nenhum comentário.';
  const actionPlanComment = document.getElementById('action-plan')?.value || 'Nenhum comentário.';
  const generalComment = document.getElementById('general-comments')?.value || 'Nenhum comentário.';

  // Usaremos os comentários gerais aqui, mas poderíamos ter campos específicos no dashboard
  setTextContent('#dashboard-comments-text', `${generalComment}\n\nPontos Fortes Comentados:\n${strengthsComment}\n\nPontos de Melhoria Comentados:\n${improvementsComment}\n\nPlano de Ação Comentado:\n${actionPlanComment}`);

  // --- Gerar e exibir avaliação final automática --- NOVO
  const finalEvaluationText = generateFinalEvaluationText(results);
  setTextContent('#dashboard-final-evaluation-text', finalEvaluationText);

  // Exibir a aba de resultados
  activateTab('results');
}

// --- activateTab --- (Definição completa movida para cá)
function activateTab(tabId) {
  console.log(`Ativando tab: ${tabId}`);
  const tabs = document.querySelectorAll('.tabs .tab'); // Precisa buscar dentro da função
  const tabContents = document.querySelectorAll('.tab-content'); // Precisa buscar dentro da função
  tabs.forEach(t => t.classList.remove('active'));
  tabContents.forEach(tc => tc.classList.remove('active'));

  const activeTab = document.querySelector(`.tabs .tab[data-tab="${tabId}"]`);
  const activeContent = document.getElementById(`${tabId}-tab`);

  if (activeTab) activeTab.classList.add('active');
  if (activeContent) {
    activeContent.classList.add('active');
  } else {
    console.error(`Conteúdo da tab #${tabId}-tab não encontrado.`);
  }
}

// --- resetEvaluationForm --- (Definição completa movida para cá)
function resetEvaluationForm() {
  console.log("Limpando formulário...");
  let element;
  element = document.getElementById('employee-name');
  if (element) element.value = '';
  element = document.getElementById('employee-department-select');
  if (element) element.value = '';
  element = document.getElementById('evaluation-mode');
  if (element) element.value = 'general';
  element = document.getElementById('evaluation-date');
  if (element) element.value = '';
  element = document.getElementById('evaluator-name');
  if (element) element.value = '';

  const competenciesContainer = document.getElementById('dynamic-competencies-area');
  if (competenciesContainer) competenciesContainer.innerHTML = '';
  if (typeof renderizarCompetencias === 'function') {
    try { renderizarCompetencias(); } catch (e) { console.error("Erro ao re-renderizar competências:", e); }
  } else {
    document.querySelectorAll('#dynamic-competencies-area input[type="radio"]').forEach(radio => {
      radio.checked = false;
    });
  }

  element = document.getElementById('strengths');
  if (element) element.value = '';
  element = document.getElementById('improvements');
  if (element) element.value = '';
  element = document.getElementById('action-plan');
  if (element) element.value = '';
  element = document.getElementById('general-comments');
  if (element) element.value = '';

  if (radarChartInstance) radarChartInstance.destroy();
  if (barChartInstance) barChartInstance.destroy();
  radarChartInstance = null;
  barChartInstance = null;

  activateTab('form');
  console.log("Formulário limpo.");
}

// --- populateFormPdfTemplate --- (Definição completa movida para cá)
function populateFormPdfTemplate() {
  console.log("Populando template PDF do formulário...");

  // 1. Dados do Funcionário e Avaliação
  const employeeName = document.getElementById('employee-name')?.value || 'Não informado';
  const departmentSelect = document.getElementById('employee-department-select');
  const departmentName = departmentSelect?.options[departmentSelect.selectedIndex]?.text || 'Não informado';
  const evaluationModeSelect = document.getElementById('evaluation-mode');
  const evaluationModeName = evaluationModeSelect?.options[evaluationModeSelect.selectedIndex]?.text || 'Não informado';
  const evaluationDateInput = document.getElementById('evaluation-date');
  let evaluationDate = evaluationDateInput?.value || 'Não informado';

  // Formatar data para DD/MM/YYYY
  if (evaluationDate !== 'Não informado' && evaluationDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    try {
      const [year, month, day] = evaluationDate.split('-');
      evaluationDate = `${day}/${month}/${year}`;
    } catch (e) {
      console.error("Erro ao formatar data:", e);
      evaluationDate = evaluationDateInput?.value || 'Não informado'; // Mantém original em caso de erro
    }
  }

  const evaluatorName = document.getElementById('evaluator-name')?.value || 'Não informado';

  document.getElementById('pdf-form-employee-name').textContent = employeeName;
  document.getElementById('pdf-form-department').textContent = departmentName;
  document.getElementById('pdf-form-eval-mode').textContent = evaluationModeName;
  document.getElementById('pdf-form-eval-date').textContent = evaluationDate;
  document.getElementById('pdf-form-evaluator').textContent = evaluatorName;

  // 2. Competências Avaliadas
  const competenciesArea = document.getElementById('pdf-form-competencies-area');
  competenciesArea.innerHTML = ''; // Limpa área anterior

  const evaluationMode = evaluationModeSelect?.value;
  const departmentId = departmentSelect?.value;
  const formCompetenciesContainer = document.getElementById('dynamic-competencies-area');

  // Cria uma única tabela para todas as competências no PDF
  const mainTable = document.createElement('table');
  mainTable.className = 'pdf-table pdf-notes-table';
  const tbody = document.createElement('tbody');
  const headerRow = tbody.insertRow();
  headerRow.innerHTML = '<th>Competência / Sub-avaliação</th><th>Nota</th>';
  mainTable.appendChild(tbody);

  if (evaluationMode === 'general') {
    if (typeof competenciasGeraisEstruturadas !== 'undefined' && Array.isArray(competenciasGeraisEstruturadas)) {
      competenciasGeraisEstruturadas.forEach(categoria => {
        // Não adiciona mais o título da categoria
        categoria.avaliacoes.forEach(avaliacao => {
          const radioName = `aval-${avaliacao.id}`;
          const checkedRadio = formCompetenciesContainer.querySelector(`input[name="${radioName}"]:checked`);
          const score = checkedRadio ? checkedRadio.value : 'N/A';

          const row = tbody.insertRow();
          row.insertCell().textContent = avaliacao.nome; // Apenas o nome da sub-avaliação
          const scoreCell = row.insertCell();
          scoreCell.textContent = score;
          scoreCell.style.textAlign = 'center';
        });
      });
      competenciesArea.appendChild(mainTable); // Adiciona a tabela única ao final
    } else {
      competenciesArea.innerHTML = '<p>Erro ao carregar estrutura de avaliação geral para o PDF.</p>';
    }
  } else if (evaluationMode === 'technical') {
    let addedSoftSkills = false;
    // Soft Skills
    if (typeof softSkills !== 'undefined' && Array.isArray(softSkills)) {
      // Adiciona um título simples antes das soft skills, se houver
      const softSkillsHeaderRow = tbody.insertRow();
      const softSkillsHeaderCell = softSkillsHeaderRow.insertCell();
      softSkillsHeaderCell.colSpan = 2;
      softSkillsHeaderCell.innerHTML = '<strong style="font-size: 9pt;">Competências Comportamentais (Soft Skills)</strong>';
      softSkillsHeaderCell.style.backgroundColor = '#f0f0f0';
      softSkillsHeaderCell.style.padding = '4px 6px';

      softSkills.forEach(comp => {
        const radioName = `softskill-${comp.id}`;
        const checkedRadio = formCompetenciesContainer.querySelector(`input[name="${radioName}"]:checked`);
        const score = checkedRadio ? checkedRadio.value : 'N/A';
        const row = tbody.insertRow();
        row.insertCell().textContent = comp.nome;
        const scoreCell = row.insertCell();
        scoreCell.textContent = score;
        scoreCell.style.textAlign = 'center';
      });
      addedSoftSkills = true;
    }

    // Technical Skills
    if (departmentId && typeof competenciasTecnicasPorDepartamento !== 'undefined') {
      const tecnicasDepartamento = competenciasTecnicasPorDepartamento[departmentId];
      if (tecnicasDepartamento && Array.isArray(tecnicasDepartamento) && tecnicasDepartamento.length > 0) {
        // Adiciona um título simples antes das técnicas, se houver
        const techSkillsHeaderRow = tbody.insertRow();
        const techSkillsHeaderCell = techSkillsHeaderRow.insertCell();
        techSkillsHeaderCell.colSpan = 2;
        techSkillsHeaderCell.innerHTML = '<strong style="font-size: 9pt;">Competências Técnicas</strong>';
        techSkillsHeaderCell.style.backgroundColor = '#f0f0f0';
        techSkillsHeaderCell.style.padding = '4px 6px';
        if (addedSoftSkills) techSkillsHeaderRow.style.marginTop = '5px'; // Pequena margem se veio depois das soft

        tecnicasDepartamento.forEach(comp => {
          const radioName = `tecnica-${comp.id}`;
          const checkedRadio = formCompetenciesContainer.querySelector(`input[name="${radioName}"]:checked`);
          const score = checkedRadio ? checkedRadio.value : 'N/A';
          const row = tbody.insertRow();
          row.insertCell().textContent = comp.nome;
          const scoreCell = row.insertCell();
          scoreCell.textContent = score;
          scoreCell.style.textAlign = 'center';
        });
      }
    }
    competenciesArea.appendChild(mainTable); // Adiciona a tabela única ao final
  } else {
    competenciesArea.innerHTML = '<p>Modo de avaliação não selecionado ou inválido.</p>';
  }

  // 3. Comentários e Feedback
  document.getElementById('pdf-form-strengths').textContent = document.getElementById('strengths')?.value || '';
  document.getElementById('pdf-form-improvements').textContent = document.getElementById('improvements')?.value || '';
  document.getElementById('pdf-form-action-plan').textContent = document.getElementById('action-plan')?.value || '';
  document.getElementById('pdf-form-general-comments').textContent = document.getElementById('general-comments')?.value || '';
  // document.getElementById('pdf-form-final-evaluation').textContent = document.getElementById('final-evaluation')?.value || ''; // CAMPO REMOVIDO

  // --- Gerar e preencher avaliação final automática para PDF --- NOVO
  // Precisamos dos resultados aqui. Ou passamos como argumento, ou recalculamos partes.
  // Para simplificar, vamos chamar calculateDynamicResults() novamente aqui, mas o ideal seria passar o objeto 'results'.
  const currentResults = calculateDynamicResults(); // Re-calcula para ter os dados necessários
  let finalEvaluationTextPdf = "Erro ao gerar avaliação automática."; // Valor Padrão
  if (currentResults) {
    finalEvaluationTextPdf = generateFinalEvaluationText(currentResults);
  }
  // Tentativa de definir o texto APÓS garantir que o elemento existe
  const pdfEvalElement = document.getElementById('pdf-final-evaluation-text');
  if (pdfEvalElement) {
    pdfEvalElement.textContent = finalEvaluationTextPdf;
  } else {
    console.error("Elemento #pdf-final-evaluation-text NÃO encontrado no template PDF!");
    // Se o elemento não existe, não podemos definir textContent
  }
  // --- FIM NOVO ---

  console.log("Template PDF do formulário populado.");
}

// --- generateFormattedFormPdf --- (Definição completa movida para cá)
async function generateFormattedFormPdf() {
  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;

  if (!jsPDF || !html2canvas) {
    alert("Erro: Bibliotecas jsPDF ou html2canvas não encontradas.");
    console.error("jsPDF ou html2canvas não carregadas.");
    return;
  }

  // 1. Popula o template com os dados mais recentes do formulário
  populateFormPdfTemplate();

  const templateElement = document.getElementById('pdf-form-template');
  if (!templateElement) {
    alert("Erro: Template PDF do formulário não encontrado (ID: pdf-form-template).");
    console.error("Elemento #pdf-form-template não encontrado.");
    return;
  }

  const employeeName = document.getElementById('employee-name')?.value || 'Funcionario';
  const filename = `Formulario_Avaliacao_${employeeName.replace(/\s+/g, '_')}.pdf`;

  console.log("Iniciando geração de PDF formatado do formulário...");

  // Salva o display original e torna visível (necessário para html2canvas calcular layout)
  const originalDisplay = templateElement.style.display;
  templateElement.style.display = 'block'; // Temporariamente visível

  try {
    // Pequeno delay para garantir renderização completa do template
    await new Promise(resolve => setTimeout(resolve, 200));

    const canvas = await html2canvas(templateElement, {
      scale: 2, // Boa qualidade
      useCORS: true,
      logging: true,
      width: templateElement.offsetWidth, // Usa a largura renderizada do template
      height: templateElement.offsetHeight, // Usa a altura renderizada
      windowWidth: templateElement.scrollWidth,
      windowHeight: templateElement.scrollHeight
    });

    console.log("Template capturado pelo html2canvas.");

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10; // mm
    const usableWidth = pdfWidth - 2 * margin;

    // Proporção da imagem do canvas
    const imgProps = pdf.getImageProperties(imgData);
    const canvasRatio = imgProps.height / imgProps.width;
    const imgWidth = usableWidth;
    const imgHeight = imgWidth * canvasRatio;

    let heightLeft = imgHeight;
    let position = margin; // Posição Y inicial para a imagem no PDF

    // Adiciona a primeira página/parte da imagem
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - 2 * margin); // Subtrai a altura útil da primeira página

    // Adiciona páginas extras se o conteúdo for maior que A4
    while (heightLeft > 0) {
      position = margin - (imgHeight - heightLeft); // Ajusta a posição Y no source para a próxima fatia
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 2 * margin);
    }

    pdf.save(filename);
    console.log(`PDF formatado "${filename}" salvo.`);
    alert(`PDF "${filename}" gerado com sucesso!`);

  } catch (error) {
    console.error("Erro ao gerar PDF formatado do formulário:", error);
    alert(`Erro ao gerar PDF formatado: ${error.message}`);
  } finally {
    // Restaura o display original do template
    templateElement.style.display = originalDisplay;
  }
}

// --- generatePdfFromElement --- (Definição completa movida para cá)
async function generatePdfFromElement(elementId, filenamePrefix) {
  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;

  if (!jsPDF || !html2canvas) {
    alert("Erro: Bibliotecas jsPDF ou html2canvas não encontradas. Verifique a inclusão no HTML.");
    return;
  }

  const elementToCapture = document.getElementById(elementId);
  if (!elementToCapture) {
    alert(`Erro: Elemento com ID '${elementId}' não encontrado para gerar PDF.`);
    return;
  }

  let buttonsToHide = [];
  if (elementId === 'results-tab') {
    buttonsToHide = elementToCapture.querySelectorAll('.btn-group .btn');
    buttonsToHide.forEach(btn => btn.classList.add('hide-for-pdf'));
    console.log("Botões da aba de resultados ocultados para PDF.");

    // --- NOVO: Forçar redimensionamento dos gráficos para PDF do Dashboard ---
    if (radarChartInstance) {
      console.log("Redimensionando Radar Chart para PDF...");
      radarChartInstance.resize();
    }
    if (barChartInstance) {
      console.log("Redimensionando Bar Chart para PDF...");
      barChartInstance.resize();
    }
    await new Promise(resolve => setTimeout(resolve, 250)); // Aumentar delay para dar tempo de redimensionar
    // --- FIM NOVO ---
  }

  console.log(`Iniciando captura de ${elementId} para PDF...`);

  try {
    // Salva o display original e torna visível (necessário para html2canvas)
    const originalDisplay = elementToCapture.style.display;
    const originalVisibility = elementToCapture.style.visibility;
    elementToCapture.style.display = 'block';
    elementToCapture.style.visibility = 'visible';

    // Pequeno delay para garantir renderização completa
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(elementToCapture, {
      scale: 2, // Aumentar escala para melhor qualidade
      useCORS: true, // Se houver imagens externas
      logging: true
    });

    // Restaura display original
    elementToCapture.style.display = originalDisplay;
    elementToCapture.style.visibility = originalVisibility;

    console.log(`Captura de ${elementId} concluída.`);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p', // portrait
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10; // Margem em mm
    const usableWidth = pdfWidth - 2 * margin;
    const usableHeight = pdfHeight - 2 * margin;

    const imgWidth = usableWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = margin; // Posição vertical inicial

    // Adiciona a primeira página/parte da imagem
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= usableHeight;

    // Adiciona páginas extras se o conteúdo for maior que a área útil
    while (heightLeft > 0) {
      position = margin - heightLeft; // Ajusta a posição Y no source para a próxima fatia
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= usableHeight;
    }

    const filename = `${filenamePrefix.replace(/\s+/g, '_')}.pdf`;
    pdf.save(filename);
    console.log(`PDF ${filename} salvo.`);
    alert(`PDF "${filename}" gerado com sucesso!`);

  } catch (error) {
    console.error(`Erro ao gerar PDF para ${elementId}:`, error);
    alert(`Erro ao gerar PDF: ${error.message}`);
  } finally {
    // --- NOVO: Restaurar botões após gerar PDF ---
    if (buttonsToHide.length > 0) {
      buttonsToHide.forEach(btn => btn.classList.remove('hide-for-pdf'));
      console.log("Botões da aba de resultados restaurados.");
    }
    // --- FIM NOVO ---
    // Esconder spinner/loading?
    // hideSpinner();
  }
}

// --- FIM DEFINIÇÕES DE FUNÇÕES GLOBAIS ---

// --- CÓDIGO EXECUTADO APÓS O DOM CARREGAR ---

document.addEventListener('DOMContentLoaded', () => {

  // --- Seletores e Variáveis Globais (se necessárias DENTRO dos listeners) ---
  // Nenhuma variável de instância de gráfico aqui, elas já são globais

  // --- Event Listeners --- 
  const calculateBtn = document.getElementById('calculate-results');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      const employeeName = document.getElementById('employee-name')?.value.trim();
      const department = document.getElementById('employee-department-select')?.value;
      const evalDate = document.getElementById('evaluation-date')?.value;
      const evaluator = document.getElementById('evaluator-name')?.value.trim();
      const evalMode = document.getElementById('evaluation-mode')?.value;

      if (!employeeName || !evalDate || !evaluator) {
        alert("Por favor, preencha Nome do Funcionário, Data da Avaliação e Avaliador.");
        return;
      }
      if (!department) {
        alert("Por favor, selecione o Departamento.");
        return;
      }

      const results = calculateDynamicResults();

      if (results) {
        displayResults(results);
      }
    });
  }

  const backToFormBtn = document.getElementById('back-to-form');
  if (backToFormBtn) {
    backToFormBtn.addEventListener('click', () => {
      activateTab('form');
    });
  }

  const resetFormBtn = document.getElementById('reset-form');
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', resetEvaluationForm);
  }

  const downloadDashboardBtn = document.getElementById('download-dashboard-pdf');
  const downloadFormBtn = document.getElementById('download-form-pdf');

  if (downloadDashboardBtn) {
    downloadDashboardBtn.addEventListener('click', () => {
      generatePdfFromElement('results-tab', 'Dashboard_Avaliacao');
    });
  }

  if (downloadFormBtn) {
    downloadFormBtn.addEventListener('click', () => {
      generateFormattedFormPdf();
    });
  }

  // Inicializar a aba correta (se não for feito pelo script inline)
  // activateTab('form'); 

}); // Fim do DOMContentLoaded
