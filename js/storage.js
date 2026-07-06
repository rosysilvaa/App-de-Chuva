/* ============================================================
   storage.js — persistência local
   ============================================================ */
const StorageModule = (() => {
  const KEYS = { contacts:'cf_contacts', settings:'cf_settings', chat:'cf_chat_history', favorites:'cf_favorites' };
  const get = (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch(e){ return fallback; } };
  const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
  return { KEYS, get, set };
})();
