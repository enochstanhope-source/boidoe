document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('reportForm');
  const file = document.getElementById('issueFile');
  const preview = document.getElementById('preview');

  file && file.addEventListener('change', (e)=>{
    preview.innerHTML = '';
    const f = e.target.files && e.target.files[0];
    if(!f) return;
    const img = document.createElement('img');
    img.src = URL.createObjectURL(f);
    img.onload = ()=>URL.revokeObjectURL(img.src);
    preview.appendChild(img);
  });

  form && form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = document.getElementById('issueTitle').value.trim();
    const desc = document.getElementById('issueDesc').value.trim();
    if(!title || !desc){ alert('Please provide a short title and description.'); return; }
    // Simulate submission
    const btn = form.querySelector('button'); btn.disabled = true; btn.textContent = 'Submitting…';
    setTimeout(()=>{ btn.disabled = false; btn.textContent = 'Submit Report'; alert('Report submitted — maintenance will follow up.'); form.reset(); preview.innerHTML=''; }, 900);
  });
});
