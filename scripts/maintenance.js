document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('maintenance-root');
	if (!root) return;

	const reqs = [
		{ id: 'M-001', bus: 'BUS-002', desc: 'Engine check', status: 'Pending' },
		{ id: 'M-002', bus: 'BUS-005', desc: 'Tire replacement', status: 'In Progress' }
	];

	function render() {
		root.innerHTML = '';
		const list = document.createElement('div');
		reqs.forEach(r => {
			const el = document.createElement('div');
			el.className = 'maint-item';
			el.innerHTML = `<strong>${r.id}</strong> - ${r.bus} <div>${r.desc}</div><div>Status: <em>${r.status}</em></div>`;
			list.appendChild(el);
		});
		root.appendChild(list);
	}

	function simulate() {
		if (reqs.length === 0) return;
		const i = Math.floor(Math.random() * reqs.length);
		const states = ['Pending','In Progress','Completed'];
		reqs[i].status = states[Math.floor(Math.random() * states.length)];
		render();
	}

	render();
	setInterval(simulate, 12000);

	const newReqBtn = document.getElementById('new-request');
	const reqModal = document.getElementById('modal-request');
	const saveReq = document.getElementById('save-request');
	const cancelReq = document.getElementById('cancel-request');

	newReqBtn?.addEventListener('click', () => reqModal?.setAttribute('aria-hidden', 'false'));
	cancelReq?.addEventListener('click', () => reqModal?.setAttribute('aria-hidden', 'true'));

	saveReq?.addEventListener('click', () => {
		const bus = document.getElementById('req-bus').value || 'BUS-000';
		const desc = document.getElementById('req-desc').value || 'No description';
		const id = 'M-' + String(Math.floor(Math.random() * 900) + 100);
		reqs.unshift({ id, bus, desc, status: 'Pending' });
		render();
		reqModal?.setAttribute('aria-hidden', 'true');
	});
});

