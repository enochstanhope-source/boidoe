document.addEventListener('DOMContentLoaded', ()=>{
  const sample = [
    {when:'2025-09-08 07:12',from:'North Gate',to:'Library',pts:12},
    {when:'2025-09-09 08:02',from:'Hostel',to:'Main Gate',pts:8}
  ];
  const list = document.getElementById('historyList');
  const exportBtn = document.getElementById('exportCsv');

  function render(){
    list.innerHTML = '';
    sample.forEach(s=>{
      const li = document.createElement('li');
      li.textContent = `${s.when} — ${s.from} → ${s.to} (${s.pts} pax)`;
      list.appendChild(li);
    });
  }
  render();

  exportBtn.addEventListener('click', ()=>{
    const rows = [['when','from','to','pax'],...sample.map(r=>[r.when,r.from,r.to,r.pts])];
    const csv = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv],{type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'ride-history.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  });
});
