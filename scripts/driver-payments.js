document.addEventListener('DOMContentLoaded', ()=>{
  const countEl = document.getElementById('passengerCount');
  const recordBtn = document.getElementById('recordPayment');
  const log = document.getElementById('paymentsLog');

  recordBtn.addEventListener('click', ()=>{
    const c = Number(countEl.value) || 0;
    const item = document.createElement('li');
    const now = new Date().toLocaleString();
    item.textContent = `${now} — ${c} passenger(s) recorded`;
    log.prepend(item);
    // small visual effect
    item.style.opacity = '0'; setTimeout(()=>item.style.opacity='1',10);
  });
});
