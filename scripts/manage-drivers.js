document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('manage-drivers-root');
	if (!root) return;

	const drivers = [
		{ id: 'D-001', name: 'John Doe', assigned: 'Route A' },
		{ id: 'D-002', name: 'Aisha Bello', assigned: 'Route B' },
		{ id: 'D-003', name: 'Samuel K', assigned: '' }
	];

	function render() {
		root.innerHTML = '';
		const list = document.createElement('div');
		list.className = 'driver-list';
		drivers.forEach((d, i) => {
			const el = document.createElement('div');
			el.className = 'driver-item';
			el.innerHTML = `<strong>${d.name}</strong> <small>${d.id}</small><div>Assigned: ${d.assigned || 'None'}</div>`;
			const btn = document.createElement('button');
			btn.textContent = 'Assign Random Route';
			btn.className = 'btn small';
			btn.addEventListener('click', () => {
				const routes = ['Route A','Route B','Route C','Route D'];
				d.assigned = routes[Math.floor(Math.random() * routes.length)];
				render();
			});
			el.appendChild(btn);
			list.appendChild(el);
		});
		root.appendChild(list);
	}

	render();

	// modal wiring
	const addDriverModal = document.getElementById('modal-add-driver');
	const saveDriverBtn = document.getElementById('save-driver');
	const cancelDriverBtn = document.getElementById('cancel-driver');
	const exportBtn = document.getElementById('export-drivers');

	const addBtn = document.querySelector('.header-controls .btn');
	addBtn?.addEventListener('click', () => addDriverModal?.setAttribute('aria-hidden', 'false'));
	cancelDriverBtn?.addEventListener('click', () => addDriverModal?.setAttribute('aria-hidden', 'true'));

	saveDriverBtn?.addEventListener('click', () => {
		const name = document.getElementById('driver-name').value || 'New Driver';
		const phone = document.getElementById('driver-phone').value || '';
		const id = 'D-' + String(Math.floor(Math.random() * 900) + 100);
		drivers.unshift({ id, name, assigned: '' });
		render();
		addDriverModal?.setAttribute('aria-hidden', 'true');
	});

	exportBtn?.addEventListener('click', () => {
		const csv = ['ID,Name,Assigned', ...drivers.map(d => `${d.id},${d.name},${d.assigned}`)].join('\n');
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a'); a.href = url; a.download = 'drivers.csv'; a.click(); URL.revokeObjectURL(url);
	});
});

