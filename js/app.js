/* ============================================================
   app.js — navegação, inicialização e ligação dos módulos
   ============================================================ */
const AppModule = (() => {
  const screens = ['home','weather','tides','alerts','family','chat','settings'];
  let dayTabIndex = 0;
  let forecastData = [];

  function goto(screen){
    screens.forEach(s => {
      document.getElementById('screen-'+s).classList.toggle('active', s===screen);
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.screen === screen);
    });
    if(screen === 'weather') renderWeather();
    if(screen === 'tides') renderTides();
    if(screen === 'alerts') renderAlerts();
    if(screen === 'family') renderContacts();
    if(screen === 'chat') renderChatIfEmpty();
  }

  /* ---------- animated background ---------- */
  function renderBackground(condition){
    const bg = document.getElementById('weather-bg');
    bg.innerHTML = '';
    const app = document.getElementById('app');
    const themeMap = {
      sol:['#3FA9F5','#00D4C4'], nublado:['#7f97ad','#a9bcc9'], chuva:['#3a5877','#1b2a4a'],
      tempestade:['#232946','#0f1626'], noite:['#0b1030','#1c2340']
    };
    const colors = themeMap[condition] || themeMap.sol;
    if(app.getAttribute('data-theme') === 'light' || !app.getAttribute('data-theme')){
      app.style.setProperty('--bg-1', colors[0]);
      app.style.setProperty('--bg-2', colors[1]);
    }
    if(condition === 'sol'){
      const sun = document.createElement('div'); sun.className='sun'; bg.appendChild(sun);
      bg.insertAdjacentHTML('beforeend', '<div class="cloud cloud2"></div>');
    } else if(condition === 'nublado'){
      bg.insertAdjacentHTML('beforeend', '<div class="cloud cloud1"></div><div class="cloud cloud2"></div>');
    } else if(condition === 'chuva' || condition === 'tempestade'){
      bg.insertAdjacentHTML('beforeend', '<div class="cloud cloud1" style="opacity:.85"></div>');
      for(let i=0;i<26;i++){
        const drop = document.createElement('div');
        drop.className='rain-drop';
        drop.style.left = Math.random()*100+'%';
        drop.style.height = (10+Math.random()*16)+'px';
        drop.style.animationDuration = (0.6+Math.random()*0.6)+'s';
        drop.style.animationDelay = (Math.random()*2)+'s';
        bg.appendChild(drop);
      }
      if(condition === 'tempestade'){
        const bolt = document.createElement('div'); bolt.className='bolt'; bolt.textContent='⚡';
        bolt.style.top='20%'; bolt.style.left='40%';
        bg.appendChild(bolt);
      }
    } else if(condition === 'noite'){
      const moon = document.createElement('div'); moon.className='moon'; bg.appendChild(moon);
      for(let i=0;i<40;i++){
        const star = document.createElement('div');
        star.className='star';
        star.style.left = Math.random()*100+'%';
        star.style.top = Math.random()*70+'%';
        star.style.animationDelay = (Math.random()*2)+'s';
        bg.appendChild(star);
      }
    }
  }

  /* ---------- HOME preview ---------- */
  function renderHomePreview(){
    const loc = LocationModule.get();
    document.getElementById('home-city').textContent = `${loc.city}, ${loc.state}`;
    const w = WeatherModule.generateMock();
    renderBackground(w.condition);
    document.getElementById('home-weather-preview').innerHTML = `
      <div class="section-title">${WeatherModule.conditionIcon(w.condition)} Agora em ${loc.city}</div>
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div class="big-temp" style="font-size:2.4rem; font-weight:800;">${w.temp}°</div>
        <div style="text-align:right;">
          <div style="color:var(--text-soft); font-size:.85rem;">${WeatherModule.conditionLabel(w.condition)}</div>
          <div style="color:var(--accent); font-size:.8rem;">☔ ${w.rainChance}% de chance de chuva</div>
        </div>
      </div>`;

    const tide = TidesModule.generateMock();
    const next = tide.events[0];
    document.getElementById('home-tide-preview').innerHTML = `
      <div class="section-title">🌊 Próxima maré</div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span>Maré <b>${next.type}</b> às <b>${next.time}</b></span>
        <span class="tide-badge ${next.type}">${next.height}m</span>
      </div>`;

    const alert = AlertsModule.generateMock().active;
    document.getElementById('home-alert-preview').innerHTML = `
      <div class="section-title">⚠️ Status de alerta</div>
      <div class="alert-item alert-${alert.key}" style="margin:0;">
        <div class="alert-dot"></div>
        <div><div class="alert-title">${alert.label}</div><div class="alert-desc">${alert.desc}</div></div>
      </div>`;
  }

  /* ---------- WEATHER screen ---------- */
  function renderWeather(){
    const loc = LocationModule.get();
    document.getElementById('weather-loc').textContent = `${loc.city}, ${loc.state} · ${loc.source}`;
    const w = WeatherModule.getCurrent();
    renderBackground(w.condition);
    document.getElementById('w-temp').textContent = `${w.temp}°`;
    document.getElementById('w-cond').textContent = `${WeatherModule.conditionIcon(w.condition)} ${WeatherModule.conditionLabel(w.condition)} · Sensação ${w.feelsLike}°`;
    document.getElementById('w-metrics').innerHTML = `
      <div class="metric"><div class="m-label">Umidade</div><div class="m-value">${w.humidity}%</div></div>
      <div class="metric"><div class="m-label">Pressão</div><div class="m-value">${w.pressure} hPa</div></div>
      <div class="metric"><div class="m-label">Vento</div><div class="m-value">${w.windSpeed} km/h ${w.windDir}</div></div>
      <div class="metric"><div class="m-label">Índice UV</div><div class="m-value">${w.uv}</div></div>
      <div class="metric"><div class="m-label">Nascer do sol</div><div class="m-value">🌅 ${w.sunrise}</div></div>
      <div class="metric"><div class="m-label">Pôr do sol</div><div class="m-value">🌇 ${w.sunset}</div></div>
      <div class="metric"><div class="m-label">Chance de chuva</div><div class="m-value">${w.rainChance}%</div></div>
      <div class="metric"><div class="m-label">Vol. de chuva</div><div class="m-value">${w.rainAmount} mm</div></div>`;

    forecastData = WeatherModule.generateForecast(14);
    const tabs = ['Hoje','Amanhã','7 dias','14 dias'];
    document.getElementById('day-tabs').innerHTML = tabs.map((t,i) =>
      `<div class="day-tab ${i===dayTabIndex?'active':''}" data-tab="${i}">${t}</div>`).join('');
    renderForecastList();
    document.querySelectorAll('.day-tab').forEach(tab => {
      tab.onclick = () => { dayTabIndex = +tab.dataset.tab; renderWeather(); };
    });

    const map = document.getElementById('rain-map');
    map.innerHTML = '';
    for(let i=0;i<8;i++){
      const blob = document.createElement('div');
      blob.style.position='absolute';
      blob.style.width = (40+Math.random()*60)+'px';
      blob.style.height = blob.style.width;
      blob.style.borderRadius='50%';
      blob.style.background='rgba(255,255,255,.18)';
      blob.style.left = Math.random()*90+'%';
      blob.style.top = Math.random()*80+'%';
      blob.style.filter='blur(6px)';
      blob.style.animation = `driftCloud ${10+Math.random()*10}s linear infinite`;
      map.appendChild(blob);
    }
  }
  function renderForecastList(){
    const counts = [1,2,7,14];
    const days = forecastData.slice(0, counts[dayTabIndex]);
    document.getElementById('forecast-list').innerHTML = days.map(d => `
      <div class="forecast-row">
        <div class="forecast-day">${d.label}</div>
        <div class="forecast-icon">${WeatherModule.conditionIcon(d.condition)}</div>
        <div class="forecast-rain">☔ ${d.rain}%</div>
        <div class="forecast-temps">${d.max}° / ${d.min}°</div>
      </div>`).join('');
  }

  /* ---------- TIDES screen ---------- */
  function renderTides(){
    const loc = LocationModule.get();
    document.getElementById('tides-loc').textContent = `${loc.city}, ${loc.state}`;
    const tide = TidesModule.generateMock();
    document.getElementById('tide-current-height').textContent = `${tide.currentHeight} m`;
    const badge = document.getElementById('tide-badge');
    badge.textContent = tide.current === 'alta' ? 'Maré Alta' : 'Maré Baixa';
    badge.className = `tide-badge ${tide.current}`;
    document.getElementById('tide-list').innerHTML = tide.events.map(e => `
      <div class="tide-item"><span>Maré ${e.type} — ${e.time}</span><b>${e.height} m</b></div>`).join('');
    document.getElementById('moon-phase').textContent = tide.moonPhase;
    document.getElementById('moon-times').textContent = `Nascer ${tide.moonrise} · Pôr ${tide.moonset}`;
    document.getElementById('moon-icon').textContent = tide.moonPhase.split(' ')[0];
    drawTideChart(tide);
  }
  function drawTideChart(tide){
    const canvas = document.getElementById('tide-chart');
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height;
    ctx.clearRect(0,0,w,h);
    const heights = tide.events.map(e => parseFloat(e.height));
    const max = Math.max(...heights, 2.5), min = 0;
    const stepX = w / (heights.length - 1);
    ctx.beginPath();
    heights.forEach((val,i) => {
      const x = i*stepX;
      const y = h - ((val-min)/(max-min)) * (h-16) - 8;
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.lineWidth = 3;
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#3FA9F5';
    ctx.stroke();
    heights.forEach((val,i) => {
      const x = i*stepX;
      const y = h - ((val-min)/(max-min)) * (h-16) - 8;
      ctx.beginPath();
      ctx.arc(x,y,4,0,Math.PI*2);
      ctx.fillStyle = '#3FA9F5';
      ctx.fill();
    });
  }

  /* ---------- ALERTS screen ---------- */
  function renderAlerts(){
    const data = AlertsModule.generateMock();
    const all = [...AlertsModule.levels];
    document.getElementById('alerts-list').innerHTML = all.map(lvl => {
      const isActive = lvl.key === data.active.key;
      return `<div class="alert-item alert-${lvl.key}">
        <div class="alert-dot"></div>
        <div><div class="alert-title">${lvl.label} ${isActive ? '· Atual' : ''}</div><div class="alert-desc">${lvl.desc}</div></div>
      </div>`;
    }).join('');
    if(data.active.key === 'red'){
      showToast('🔴 Alerta vermelho emitido — grande perigo na sua região!');
    }
  }

  /* ---------- FAMILY / CONTACTS screen ---------- */
  function renderContacts(filter=''){
    const list = ContactsModule.getAll()
      .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a,b) => (b.favorite - a.favorite));
    document.getElementById('contacts-list').innerHTML = list.length ? list.map(c => `
      <div class="card contact-row" data-id="${c.id}">
        <div class="avatar">${c.name.charAt(0).toUpperCase()}</div>
        <div class="contact-info">
          <div class="contact-name">${c.name} <span class="fav-star" data-fav="${c.id}">${c.favorite ? '⭐' : '☆'}</span></div>
          <div class="contact-phone">${c.phone || 'sem telefone'}</div>
        </div>
        <div class="contact-actions">
          <button class="icon-btn call" data-call="${c.phone}">📞</button>
          <button class="icon-btn wpp" data-wpp="${c.phone}">💬</button>
          <button class="icon-btn edit" data-edit="${c.id}">✏️</button>
          <button class="icon-btn del" data-del="${c.id}">🗑️</button>
        </div>
      </div>`).join('') : `<p style="text-align:center; color:var(--text-soft); margin-top:30px;">Nenhum contato encontrado.</p>`;
  }

  function openContactModal(contact=null){
    document.getElementById('contact-modal-title').textContent = contact ? 'Editar contato' : 'Novo contato';
    document.getElementById('contact-id').value = contact ? contact.id : '';
    document.getElementById('c-name').value = contact ? contact.name : '';
    document.getElementById('c-phone').value = contact ? contact.phone : '';
    document.getElementById('c-address').value = contact ? contact.address : '';
    document.getElementById('c-notes').value = contact ? contact.notes : '';
    document.getElementById('contact-modal').classList.add('show');
  }
  function closeContactModal(){ document.getElementById('contact-modal').classList.remove('show'); }

  /* ---------- CHAT screen ---------- */
  function renderChatIfEmpty(){
    const log = document.getElementById('chat-log');
    if(log.children.length === 0){
      addChatBubble('bot', 'Oi! Eu sou a assistente do Clima Família IA 💙 Pergunte sobre clima, maré, alertas ou peça um lembrete.');
    }
  }
  function addChatBubble(role, text){
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }
  function sendChatMessage(){
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if(!text) return;
    addChatBubble('user', text);
    input.value = '';
    const log = document.getElementById('chat-log');
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot';
    typing.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
    log.appendChild(typing);
    log.scrollTop = log.scrollHeight;
    setTimeout(() => {
      typing.remove();
      addChatBubble('bot', ChatbotModule.reply(text));
    }, 700 + Math.random()*500);
  }

  /* ---------- TOAST / notifications ---------- */
  function showToast(msg){
    const stack = document.getElementById('toast-stack');
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    stack.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  /* ---------- SETTINGS ---------- */
  function applySettings(){
    const s = StorageModule.get(StorageModule.KEYS.settings, { theme:'light', fontScale:1, sound:true, notif:true, auto:true });
    document.getElementById('app').setAttribute('data-theme', s.theme);
    document.documentElement.style.setProperty('--font-scale', s.fontScale);
    document.querySelectorAll('.theme-dot').forEach(d => d.classList.toggle('active', d.dataset.themeChoice === s.theme));
    document.getElementById('toggle-sound').classList.toggle('on', s.sound);
    document.getElementById('toggle-notif').classList.toggle('on', s.notif);
    document.getElementById('toggle-auto').classList.toggle('on', s.auto);
    return s;
  }
  function saveSettings(patch){
    const s = { ...StorageModule.get(StorageModule.KEYS.settings, { theme:'light', fontScale:1, sound:true, notif:true, auto:true }), ...patch };
    StorageModule.set(StorageModule.KEYS.settings, s);
    applySettings();
  }

  /* ---------- EVENT BINDINGS ---------- */
  function bindEvents(){
    document.querySelectorAll('.nav-btn').forEach(btn => btn.addEventListener('click', () => goto(btn.dataset.screen)));
    document.querySelectorAll('.quick-tile').forEach(t => t.addEventListener('click', () => goto(t.dataset.goto)));
    document.getElementById('refresh-weather').addEventListener('click', () => { WeatherModule.generateMock(); renderWeather(); showToast('Clima atualizado ✅'); });

    // WhatsApp floating button
    document.getElementById('fab-whatsapp').addEventListener('click', () => {
      window.open('https://wa.me/', '_blank');
    });

    // Contacts
    document.getElementById('fab-add-contact').addEventListener('click', () => openContactModal());
    document.getElementById('cancel-contact').addEventListener('click', closeContactModal);
    document.getElementById('save-contact').addEventListener('click', () => {
      const id = document.getElementById('contact-id').value;
      const name = document.getElementById('c-name').value.trim();
      const phone = document.getElementById('c-phone').value.trim();
      if(!name){ showToast('Digite um nome para o contato'); return; }
      ContactsModule.save({
        id: id || null,
        name, phone,
        address: document.getElementById('c-address').value.trim(),
        notes: document.getElementById('c-notes').value.trim()
      });
      closeContactModal();
      renderContacts(document.getElementById('contact-search').value);
      showToast('Contato salvo ✅');
    });
    document.getElementById('contact-search').addEventListener('input', e => renderContacts(e.target.value));
    document.getElementById('contacts-list').addEventListener('click', e => {
      const call = e.target.closest('[data-call]');
      const wpp = e.target.closest('[data-wpp]');
      const edit = e.target.closest('[data-edit]');
      const del = e.target.closest('[data-del]');
      const fav = e.target.closest('[data-fav]');
      if(call) window.open(`tel:${call.dataset.call}`);
      if(wpp) window.open(`https://wa.me/${wpp.dataset.wpp.replace(/\D/g,'')}`, '_blank');
      if(edit){ const c = ContactsModule.getAll().find(c => c.id === edit.dataset.edit); openContactModal(c); }
      if(del){ ContactsModule.remove(del.dataset.del); renderContacts(document.getElementById('contact-search').value); showToast('Contato removido'); }
      if(fav){ ContactsModule.toggleFavorite(fav.dataset.fav); renderContacts(document.getElementById('contact-search').value); }
    });

    // Chat
    document.getElementById('chat-send').addEventListener('click', sendChatMessage);
    document.getElementById('chat-input').addEventListener('keydown', e => { if(e.key === 'Enter') sendChatMessage(); });
    document.getElementById('chat-mic').addEventListener('click', () => showToast('🎙️ Entrada por voz — em breve nesta versão'));

    // Settings
    document.querySelectorAll('.theme-dot').forEach(dot => dot.addEventListener('click', () => saveSettings({ theme: dot.dataset.themeChoice })));
    document.getElementById('font-inc').addEventListener('click', () => { const s = applySettings(); saveSettings({ fontScale: Math.min(1.3, s.fontScale + 0.1) }); });
    document.getElementById('font-dec').addEventListener('click', () => { const s = applySettings(); saveSettings({ fontScale: Math.max(0.85, s.fontScale - 0.1) }); });
    ['sound','notif','auto'].forEach(key => {
      document.getElementById('toggle-'+key).addEventListener('click', () => {
        const s = applySettings();
        saveSettings({ [key]: !s[key] });
      });
    });
    document.getElementById('btn-detect-location').addEventListener('click', () => {
      LocationModule.detect(loc => {
        document.getElementById('settings-location-info').textContent = `${loc.city}, ${loc.state} — ${loc.source} (lat ${loc.lat.toFixed(2)}, lon ${loc.lon.toFixed(2)})`;
        showToast('Localização atualizada 📍');
      });
    });
  }

  /* ---------- INIT ---------- */
  function init(){
    ContactsModule.seedIfEmpty();
    applySettings();
    ClockModule.init();
    bindEvents();
    LocationModule.detect(loc => {
      document.getElementById('settings-location-info').textContent = `${loc.city}, ${loc.state} — ${loc.source}`;
      renderHomePreview();
    });
    // Notificações simuladas periódicas
    setTimeout(() => showToast('☔ Vai chover em 20 minutos'), 6000);
    setInterval(() => {
      const s = StorageModule.get(StorageModule.KEYS.settings, { notif:true });
      if(s.notif) showToast('🔔 Painel atualizado com novos dados simulados');
    }, 90000);
  }

  return { init, goto };
})();

document.addEventListener('DOMContentLoaded', AppModule.init);
