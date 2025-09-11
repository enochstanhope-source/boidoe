document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('manage-buses-root');
	if (!root) return;

	const buses = [
		{ id: 'BUS-001', plate: 'ABC-123', route: 'Route A', status: 'In Service' },
		{ id: 'BUS-002', plate: 'DEF-456', route: 'Route B', status: 'Maintenance' },
		{ id: 'BUS-003', plate: 'GHI-789', route: 'Route C', status: 'In Service' }
	];

	function render() {
		root.innerHTML = '';
		const table = document.createElement('table');
		table.className = 'simple-table';
		table.innerHTML = `
			<thead><tr><th>ID</th><th>Plate</th><th>Route</th><th>Status</th><th>Actions</th></tr></thead>
			<tbody></tbody>
		`;
		const tbody = table.querySelector('tbody');

		buses.forEach((b, idx) => {
			const tr = document.createElement('tr');
			tr.innerHTML = `
				<td>${b.id}</td>
				<td>${b.plate}</td>
				<td>${b.route}</td>
				<td class="status-cell">${b.status}</td>
				<td>
					<button class="btn small edit">Edit</button>
					<button class="btn small remove">Remove</button>
				</td>
			`;
			tbody.appendChild(tr);

			tr.querySelector('.edit').addEventListener('click', () => alert('Edit ' + b.id));
			tr.querySelector('.remove').addEventListener('click', () => {
				if (!confirm('Remove ' + b.id + '?')) return;
				buses.splice(idx, 1);
				render();
			});
		});

		root.appendChild(table);
	}

	// small simulated updates to make the page reactive
	function randomUpdate() {
		if (buses.length === 0) return;
		const i = Math.floor(Math.random() * buses.length);
		const statuses = ['In Service','Maintenance','Available','Out of Service'];
		buses[i].status = statuses[Math.floor(Math.random() * statuses.length)];
		render();
	}

	// initial render
	render();
	setInterval(randomUpdate, 10000);

	// Modal and controls wiring
	const addBtn = document.getElementById('add-bus-btn');
	const modal = document.getElementById('modal-add-bus');
	const saveBtn = document.getElementById('save-new-bus');
	const cancelBtn = document.getElementById('cancel-new-bus');
	const exportBtn = document.getElementById('export-buses');

	if (addBtn && modal) {
		addBtn.addEventListener('click', () => modal.setAttribute('aria-hidden', 'false'));
		cancelBtn?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
		saveBtn?.addEventListener('click', () => {
			const plate = document.getElementById('new-plate').value || 'NEW-PLATE';
			const route = document.getElementById('new-route').value || 'Route A';
			const status = document.getElementById('new-status').value || 'In Service';
			const id = 'BUS-' + String(Math.floor(Math.random() * 900) + 100);
			buses.unshift({ id, plate, route, status });
			render();
			modal.setAttribute('aria-hidden', 'true');
		});

		exportBtn?.addEventListener('click', () => {
			const csv = ['ID,Plate,Route,Status', ...buses.map(b => `${b.id},${b.plate},${b.route},${b.status}`)].join('\n');
			const blob = new Blob([csv], { type: 'text/csv' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'buses.csv';
			a.click();
			URL.revokeObjectURL(url);
		});
	}
});

