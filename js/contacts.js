/* ============================================================
   contacts.js — agenda da família
   ============================================================ */
const ContactsModule = (() => {
  function seedIfEmpty(){
    let list = StorageModule.get(StorageModule.KEYS.contacts, null);
    if(!list){
      list = [
        { id:cryptoId(), name:'Mãe', phone:'+55 81 90000-0001', address:'', notes:'Ligar todo domingo', favorite:true },
        { id:cryptoId(), name:'Pai', phone:'+55 81 90000-0002', address:'', notes:'', favorite:false },
        { id:cryptoId(), name:'Filho(a)', phone:'+55 81 90000-0003', address:'Escola Municipal', notes:'Buscar às 17h', favorite:true }
      ];
      StorageModule.set(StorageModule.KEYS.contacts, list);
    }
    return list;
  }
  function cryptoId(){ return 'c_' + Math.random().toString(36).slice(2,10); }
  function getAll(){ return StorageModule.get(StorageModule.KEYS.contacts, []); }
  function save(contact){
    let list = getAll();
    if(contact.id){
      list = list.map(c => c.id === contact.id ? { ...c, ...contact } : c);
    } else {
      contact.id = cryptoId();
      contact.favorite = false;
      list.push(contact);
    }
    StorageModule.set(StorageModule.KEYS.contacts, list);
    return list;
  }
  function remove(id){
    const list = getAll().filter(c => c.id !== id);
    StorageModule.set(StorageModule.KEYS.contacts, list);
    return list;
  }
  function toggleFavorite(id){
    const list = getAll().map(c => c.id === id ? { ...c, favorite: !c.favorite } : c);
    StorageModule.set(StorageModule.KEYS.contacts, list);
    return list;
  }
  return { seedIfEmpty, getAll, save, remove, toggleFavorite };
})();
