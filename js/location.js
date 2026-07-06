/* ============================================================
   location.js — geolocalização (com fallback simulado)
   ============================================================ */
const LocationModule = (() => {
  let current = { city:'Recife', state:'PE', country:'Brasil', lat:-8.05, lon:-34.90, source:'padrão' };

  function detect(onDone){
    if(!navigator.geolocation){
      onDone(current); return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        current = { ...current, lat:pos.coords.latitude, lon:pos.coords.longitude, source:'GPS do dispositivo' };
        onDone(current);
      },
      () => onDone(current),
      { timeout:5000 }
    );
  }
  function get(){ return current; }
  return { detect, get };
})();
