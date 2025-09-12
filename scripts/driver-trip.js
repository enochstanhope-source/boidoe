document.addEventListener('DOMContentLoaded', ()=>{
  const startBtn = document.getElementById('startTrip');
  const endBtn = document.getElementById('endTrip');
  const status = document.getElementById('tripStatus');
  const timerEl = document.getElementById('tripTimer');
  let timer = null, seconds = 0;

  function format(s){
    const h = String(Math.floor(s/3600)).padStart(2,'0');
    const m = String(Math.floor((s%3600)/60)).padStart(2,'0');
    const sec = String(s%60).padStart(2,'0');
    return `${h}:${m}:${sec}`;
  }

  startBtn.addEventListener('click', ()=>{
    startBtn.disabled = true; endBtn.disabled = false; status.textContent = 'In Transit';
    seconds = 0; timerEl.textContent = format(seconds);
    timer = setInterval(()=>{ seconds++; timerEl.textContent = format(seconds); }, 1000);
  });

  endBtn.addEventListener('click', ()=>{
    if(timer) clearInterval(timer);
    startBtn.disabled = false; endBtn.disabled = true; status.textContent = 'Completed';
  });
});
