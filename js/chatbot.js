/* ============================================================
   chatbot.js — assistente IA (respostas simuladas por regras)
   ============================================================ */
const ChatbotModule = (() => {
  function reply(userText){
    const t = userText.toLowerCase();
    if(t.includes('chuva') || t.includes('clima') || t.includes('tempo')){
      const w = WeatherModule.getCurrent();
      return `Agora está ${WeatherModule.conditionLabel(w.condition).toLowerCase()}, ${w.temp}°C, com ${w.rainChance}% de chance de chuva. Quer que eu te avise se a previsão mudar?`;
    }
    if(t.includes('maré')){
      const tide = TidesModule.generateMock();
      const next = tide.events[0];
      return `A próxima maré é ${next.type} às ${next.time}, com altura estimada de ${next.height}m.`;
    }
    if(t.includes('alerta')){
      const a = AlertsModule.generateMock().active;
      return `O nível de alerta atual é "${a.label}". ${a.desc}`;
    }
    if(t.includes('lembrete') || t.includes('lembrar')){
      return 'Consegui anotar! (Nesta versão os lembretes ainda são simulados — em breve vou te avisar automaticamente por notificação.)';
    }
    if(t.includes('oi') || t.includes('olá') || t.includes('ola')){
      return 'Oi! Eu sou a assistente do Clima Família IA 💙 Posso te ajudar com clima, marés, alertas ou lembretes. O que você precisa?';
    }
    if(t.includes('ajuda')){
      return 'Você pode me perguntar coisas como: "vai chover hoje?", "quando é a próxima maré?", "tem algum alerta?" ou pedir para eu anotar um lembrete.';
    }
    return 'Entendi! Ainda estou aprendendo (esta é uma versão simulada), mas já posso te ajudar com clima, marés, alertas e lembretes rápidos.';
  }
  return { reply };
})();
