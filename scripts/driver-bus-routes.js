document.addEventListener('DOMContentLoaded', () => {
  // Sample data (replace with real API calls as needed)
  const sampleRoutes = [
    {id:1,name:'Route A - North Gate',bus:'Bus 23',stops:5,stopsList:['North Gate','Main Hall','Block A','Block B','Library']},
    {id:2,name:'Route B - South Loop',bus:'Bus 12',stops:8,stopsList:['South Gate','Market','Hostel 1','Hostel 2','Sports']},
    {id:3,name:'Route C - Library Run',bus:'Bus 07',stops:6,stopsList:['Bus Park','Library','Admin','Canteen','Tech Hub']}
  ];

  const list = document.getElementById('routesList');
  const filter = document.getElementById('routeFilter');
  const sortBtn = document.getElementById('sortBtn');
  const showMapBtn = document.getElementById('showMapBtn');
  const mapPlaceholder = document.getElementById('mapPlaceholder');

  let current = sampleRoutes.slice();
  let sortBy = 'name';

  function createCard(r){
    const li = document.createElement('li');
    li.setAttribute('data-id', r.id);
    li.innerHTML = `
      <strong>${r.name}</strong>
      <div>${r.bus}</div>
      <small>${r.stops} stops</small>
    `;

    const meta = document.createElement('div');
    meta.className = 'meta';

    const actions = document.createElement('div');
    actions.className = 'route-actions';

    const detailsBtn = document.createElement('button');
    detailsBtn.className = 'small-btn';
    detailsBtn.textContent = 'Details';
    detailsBtn.addEventListener('click', ()=> openDetails(r));

    const startBtn = document.createElement('button');
    startBtn.className = 'small-btn';
    startBtn.textContent = 'Start Trip';
    startBtn.addEventListener('click', ()=> toggleTrip(li, startBtn));

    actions.appendChild(detailsBtn);
    actions.appendChild(startBtn);
    meta.appendChild(actions);
    li.appendChild(meta);

    return li;
  }

  function render(items){
    list.innerHTML = '';
    if (!items.length){
      list.innerHTML = '<li class="empty">No routes match your search.</li>';
      return;
    }
    items.forEach(r=> list.appendChild(createCard(r)));
  }

  function openDetails(route){
    // build modal
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <h3>${route.name}</h3>
      <div><strong>Vehicle:</strong> ${route.bus}</div>
      <div><strong>Stops:</strong> ${route.stops}</div>
      <ul class="stops">${route.stopsList.map(s=>`<li>${s}</li>`).join('')}</ul>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="close" id="modalClose">Close</button>
      </div>
    `;
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    const close = document.getElementById('modalClose');
    close && close.addEventListener('click', ()=> backdrop.remove());
    backdrop.addEventListener('click', (e)=>{ if (e.target === backdrop) backdrop.remove(); });
  }

  function toggleTrip(li, btn){
    const active = li.classList.toggle('on-trip');
    btn.textContent = active ? 'End Trip' : 'Start Trip';
    // small visual cue
    if (active) li.style.boxShadow = '0 16px 36px rgba(0,140,50,0.14)'; else li.style.boxShadow = '';
  }

  function applySort(items){
    const copy = items.slice();
    if (sortBy === 'name') return copy.sort((a,b)=> a.name.localeCompare(b.name));
    if (sortBy === 'stops') return copy.sort((a,b)=> b.stops - a.stops);
    return copy;
  }

  // initial render
  current = applySort(current);
  render(current);

  if (filter) filter.addEventListener('input', (e)=>{
    const q = e.target.value.toLowerCase().trim();
    const filtered = sampleRoutes.filter(r=> r.name.toLowerCase().includes(q) || r.bus.toLowerCase().includes(q));
    current = applySort(filtered);
    render(current);
  });

  if (sortBtn){
    sortBtn.addEventListener('click', ()=>{
      sortBy = sortBy === 'name' ? 'stops' : 'name';
      sortBtn.textContent = `Sort: ${sortBy === 'name' ? 'Name' : 'Stops'}`;
      current = applySort(current);
      render(current);
    });
  }

  if (showMapBtn && mapPlaceholder){
    showMapBtn.addEventListener('click', ()=>{
      const showing = mapPlaceholder.hasAttribute('hidden');
      if (showing){
        mapPlaceholder.removeAttribute('hidden');
        showMapBtn.textContent = 'Hide Map';
      } else {
        mapPlaceholder.setAttribute('hidden', '');
        showMapBtn.textContent = 'Show Map';
      }
    });
  }

  // touch-friendly tweaks: double tap on card opens details
  list.addEventListener('dblclick', (e)=>{
    const li = e.target.closest('li');
    if (!li) return;
    const id = li.getAttribute('data-id');
    const route = sampleRoutes.find(r=> String(r.id) === String(id));
    if (route) openDetails(route);
  });

});
