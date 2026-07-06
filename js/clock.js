/* ============================================================
   clock.js — hora, data, saudação
   ============================================================ */
const ClockModule = (() => {
  const dias = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
  const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

  function tick(){
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    document.getElementById('clock-time').textContent = `${hh}:${mm}`;
    document.getElementById('clock-date').textContent = `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]}`;
    updateGreeting(now.getHours());
  }
  function updateGreeting(hour){
    let text, emoji;
    if(hour < 6){ text='Boa madrugada'; emoji='🌙'; }
    else if(hour < 12){ text='Bom dia'; emoji='☀️'; }
    else if(hour < 18){ text='Boa tarde'; emoji='🌤️'; }
    else { text='Boa noite'; emoji='🌙'; }
    document.getElementById('greeting-text').textContent = `${text}! ${emoji}`;
    document.getElementById('greeting-sub').textContent = 'Aqui está o resumo do seu dia.';
  }
  function init(){ tick(); setInterval(tick, 15000); }
  return { init };
})();
