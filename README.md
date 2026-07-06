# 🌊 Clima Família IA

Aplicativo web responsivo que reúne, em um só lugar, **previsão do tempo**, **marés**, **alertas meteorológicos**, **contatos da família** e um **assistente de IA** — pensado para o dia a dia de quem precisa de informação rápida e confiável para cuidar de quem ama.

> ⚠️ **Versão atual:** todos os dados de clima, maré e alertas são **simulados** (mock), gerados no navegador. O projeto já está estruturado para receber integrações reais de API (veja [Roadmap](#-roadmap)).

---

## ✨ Funcionalidades

| Tela | Descrição |
|---|---|
| 🏠 **Início** | Relógio em tempo real, data, saudação automática e fundo animado que muda conforme o clima (sol, nuvens, chuva, tempestade, noite) |
| 🌧️ **Clima** | Temperatura, sensação térmica, umidade, pressão, vento, índice UV, nascer/pôr do sol, previsão para hoje / amanhã / 7 dias / 14 dias e mapa de chuva simulado |
| 🌊 **Marés** | Maré alta/baixa atual, próximos horários, gráfico de maré e fase da lua |
| ⚠️ **Alertas** | Sistema de níveis 🟢 verde · 🟡 amarelo · 🟠 laranja · 🔴 vermelho, com animação e notificação automática em situações de perigo |
| 👨‍👩‍👧 **Família** | Agenda de contatos com foto/inicial, telefone, endereço e observações — ligar, abrir WhatsApp, editar, excluir e favoritar |
| 💬 **IA** | Chatbot com respostas simuladas sobre clima, maré, alertas e lembretes |
| ⚙️ **Configurações** | 5 temas (claro, escuro, azul, verde, vermelho), tamanho de fonte, som de alertas, notificações e atualização automática |

Outros detalhes:
- Botão flutuante de **WhatsApp** para contato rápido
- Design em **Glassmorphism**, com sombras suaves, cartões arredondados e microanimações
- Dados salvos localmente com **localStorage** (contatos e preferências persistem entre visitas)
- Totalmente **responsivo** (celular, tablet e desktop)

---

## 📁 Estrutura do projeto

```
clima-familia-ia/
├── index.html              # Estrutura HTML das telas
├── css/
│   ├── style.css           # Variáveis, componentes, animações
│   └── responsive.css      # Ajustes para telas maiores
└── js/
    ├── storage.js          # Persistência via localStorage
    ├── clock.js            # Hora, data e saudação
    ├── location.js         # Geolocalização (com fallback simulado)
    ├── weather.js          # Dados de clima (mock)
    ├── tides.js            # Dados de maré (mock)
    ├── alerts.js           # Níveis de alerta (mock)
    ├── contacts.js         # CRUD da agenda de família
    ├── chatbot.js          # Respostas do assistente IA (mock)
    └── app.js              # Navegação e ligação entre os módulos
```

Cada módulo JS é independente e exposto como um objeto (`WeatherModule`, `TidesModule`, `ContactsModule`, etc.), o que facilita trocar a lógica interna sem afetar o restante do app.

---

## 🚀 Demostração

<img width="1366" height="768" alt="Captura de tela 2026-07-05 221808" src="https://github.com/user-attachments/assets/103b7666-7333-48eb-a26a-27f977190950" />

<img width="1366" height="768" alt="Captura de tela 2026-07-05 221830" src="https://github.com/user-attachments/assets/d46cd7e1-f932-42ee-901b-bc67966f76e8" />

<img width="1366" height="768" alt="Captura de tela 2026-07-05 221839" src="https://github.com/user-attachments/assets/76162b94-c1ea-4927-8f30-f794a54c07a2" />

<img width="1366" height="768" alt="Captura de tela 2026-07-05 221857" src="https://github.com/user-attachments/assets/7b4704c6-dd25-4e02-9eb3-19e2e9b994ed" />

<img width="1366" height="768" alt="Captura de tela 2026-07-05 221905" src="https://github.com/user-attachments/assets/13c0b010-6fdd-4626-8fdd-aa250717a5b7" />

<img width="1366" height="768" alt="Captura de tela 2026-07-05 221916" src="https://github.com/user-attachments/assets/59adbe3d-0fee-4675-a533-c72114c19611" />

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (Glassmorphism, variáveis, animações, media queries)
- JavaScript ES6+ (módulos via IIFE, sem frameworks ou dependências externas)
- Web APIs do navegador: `localStorage`, `Geolocation`, `Canvas` (gráfico de maré)

---

## 🗺️ Roadmap

Próximos passos para evoluir o projeto:

- [ ] Integrar API real de previsão do tempo (ex: OpenWeatherMap)
- [ ] Integrar API real de marés
- [ ] Conectar alertas a uma fonte oficial (ex: Defesa Civil / INMET)
- [ ] Ativar geocodificação reversa (lat/lon → nome da cidade real)
- [ ] Conectar o chatbot a um modelo de IA real (ex: API da Meta AI ou outro modelo compatível)
- [ ] Transformar em PWA instalável (manifest + Service Worker + modo offline)
- [ ] Suporte a entrada por voz no chat
- [ ] Publicação como app nativo (React Native) para Play Store / App Store

---

## 👩‍💻 Autoria

Desenvolvido por **Roseane da Silva**.
