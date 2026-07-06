/* ============================================================
   weather.js — clima (DADOS SIMULADOS)
   ============================================================ */
const WeatherModule = (() => {
  const conditions = ['sol','nublado','chuva','tempestade','noite'];
  let currentCondition = 'sol';
  let currentData = null;

  function randomBetween(min,max){ return Math.round((Math.random()*(max-min)+min)); }

  function generateMock(){
    const hour = new Date().getHours();
    currentCondition = (hour >= 19 || hour < 5) ? 'noite' : conditions[Math.floor(Math.random()*4)];
    currentData = {
      temp: randomBetween(24,32),
      feelsLike: randomBetween(25,34),
      humidity: randomBetween(55,90),
      pressure: randomBetween(1005,1018),
      windSpeed: randomBetween(5,28),
      windDir: ['N','NE','E','SE','S','SO','O','NO'][randomBetween(0,7)],
      sunrise:'05:24', sunset:'17:38',
      uv: randomBetween(1,11),
      rainChance: randomBetween(5,90),
      rainAmount: (Math.random()*20).toFixed(1),
      condition: currentCondition
    };
    return currentData;
  }

  function conditionLabel(c){
    return { sol:'Ensolarado', nublado:'Nublado', chuva:'Chuva', tempestade:'Tempestade', noite:'Céu limpo (noite)' }[c] || 'Indefinido';
  }
  function conditionIcon(c){
    return { sol:'☀️', nublado:'☁️', chuva:'🌧️', tempestade:'⛈️', noite:'🌙' }[c] || '🌤️';
  }

  function generateForecast(days){
    const arr = [];
    const labels = ['Hoje','Amanhã','Ter','Qua','Qui','Sex','Sáb','Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    for(let i=0;i<days;i++){
      const c = conditions[Math.floor(Math.random()*4)];
      arr.push({
        label: labels[i] || `Dia ${i+1}`,
        condition:c,
        min: randomBetween(20,24),
        max: randomBetween(27,34),
        rain: randomBetween(0,95)
      });
    }
    return arr;
  }

  function getCurrent(){ return currentData || generateMock(); }
  function getConditionNow(){ return currentCondition; }

  return { generateMock, getCurrent, generateForecast, conditionLabel, conditionIcon, getConditionNow };
})();
