/* ============================================================
   tides.js — marés (DADOS SIMULADOS)
   ============================================================ */
const TidesModule = (() => {
  function generateMock(){
    const now = new Date();
    const events = [];
    let h = 2;
    const types = ['baixa','alta','baixa','alta'];
    types.forEach((t,i) => {
      h += 5 + Math.random()*1.5;
      const hour = Math.floor(h % 24);
      const min = Math.floor((h % 1) * 60);
      events.push({ type:t, time:`${String(hour).padStart(2,'0')}:${String(min).padStart(2,'0')}`, height:(t==='alta'? (1.8+Math.random()*0.6) : (0.2+Math.random()*0.4)).toFixed(1) });
    });
    const phases = ['🌑 Nova','🌒 Crescente','🌓 Quarto Crescente','🌔 Gibosa Crescente','🌕 Cheia','🌖 Gibosa Minguante','🌗 Quarto Minguante','🌘 Minguante'];
    const phaseIndex = new Date().getDate() % phases.length;
    return {
      current: events[0].type === 'alta' ? 'baixa' : 'alta',
      currentHeight:(1.0+Math.random()*0.8).toFixed(1),
      events,
      moonPhase: phases[phaseIndex],
      moonrise:'18:12', moonset:'06:04'
    };
  }
  return { generateMock };
})();
