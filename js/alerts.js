/* ============================================================
   alerts.js — alertas meteorológicos (DADOS SIMULADOS)
   ============================================================ */
const AlertsModule = (() => {
  const levels = [
    { key:'green', label:'Situação normal', desc:'Nenhum risco identificado nas próximas horas.' },
    { key:'yellow', label:'Atenção', desc:'Possibilidade de chuva forte isolada nas próximas 6 horas.' },
    { key:'orange', label:'Perigo', desc:'Risco de alagamentos em áreas baixas e ventos fortes.' },
    { key:'red', label:'Grande perigo', desc:'Risco severo de temporais, raios e deslizamentos. Evite áreas de risco.' }
  ];
  function generateMock(){
    // Pondera para a maioria das vezes ser verde/amarelo, ocasionalmente laranja/vermelho
    const roll = Math.random();
    let idx = 0;
    if(roll > 0.93) idx = 3; else if(roll > 0.8) idx = 2; else if(roll > 0.55) idx = 1;
    const active = levels[idx];
    return { active, history:[levels[0], levels[1]].concat(idx>1?[active]:[]) };
  }
  return { generateMock, levels };
})();
