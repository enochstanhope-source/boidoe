document.addEventListener('DOMContentLoaded', ()=>{
  const name = document.getElementById('driverName');
  const phone = document.getElementById('driverPhone');
  const license = document.getElementById('driverLicense');
  const save = document.getElementById('saveProfile');

  // load from localStorage if present
  try{
    const saved = JSON.parse(localStorage.getItem('driverProfile')||'{}');
    if(saved.name) name.value = saved.name || '';
    if(saved.phone) phone.value = saved.phone || '';
    if(saved.license) license.value = saved.license || '';
  }catch(e){}

  save.addEventListener('click', ()=>{
    const profile = { name: name.value.trim(), phone: phone.value.trim(), license: license.value.trim() };
    localStorage.setItem('driverProfile', JSON.stringify(profile));
    save.textContent = 'Saved'; setTimeout(()=>save.textContent='Save',900);
  });
});
