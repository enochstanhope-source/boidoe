document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('tracking-root');
	if (!root) return;

	// Bus demo data
	const buses = [
		{ id: 'BUS-001', lat: 6.5244, lng: 3.3792, speed: 32 },
		{ id: 'BUS-002', lat: 6.5270, lng: 3.3800, speed: 28 },
		{ id: 'BUS-003', lat: 6.5200, lng: 3.3750, speed: 24 }
	];

	// initialize Leaflet map
	const L = window.L; // assume Leaflet script is loaded via CDN
	const map = L.map(root).setView([6.5244, 3.3792], 14);

	// use OpenStreetMap tiles
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; OpenStreetMap contributors'
	}).addTo(map);

	// marker storage
	const markers = {};

	function createOrUpdateMarkers() {
		buses.forEach(b => {
			if (markers[b.id]) {
				markers[b.id].setLatLng([b.lat, b.lng]);
			} else {
				const marker = L.marker([b.lat, b.lng]).addTo(map).bindPopup(`${b.id}`);
				marker.on('click', () => openTripModal(b));
				markers[b.id] = marker;
			}
		});
	}

	createOrUpdateMarkers();

	function jitter() {
		buses.forEach(b => {
			b.lat += (Math.random() - 0.5) * 0.0015;
			b.lng += (Math.random() - 0.5) * 0.0015;
			// vary speed slightly
			b.speed = Math.max(0, b.speed + (Math.random() - 0.5) * 4);
		});
		createOrUpdateMarkers();
	}

	let jitterInterval = setInterval(jitter, 4000);


	// controls
	const toggleBtn = document.getElementById('toggle-tracking');
	const tripModal = document.getElementById('modal-trip');
	const closeTrip = document.getElementById('close-trip');

	toggleBtn?.addEventListener('click', () => {
		if (jitterInterval) { clearInterval(jitterInterval); jitterInterval = null; toggleBtn.textContent = 'Resume'; }
		else { jitterInterval = setInterval(jitter, 4000); toggleBtn.textContent = 'Pause'; }
	});

	function openTripModal(bus) {
		const details = document.getElementById('trip-details');
		details.innerHTML = `<strong>${bus.id}</strong><br/>Coordinates: ${bus.lat.toFixed(5)}, ${bus.lng.toFixed(5)}<br/>Speed: ${Math.round(bus.speed)} km/h`;
		tripModal?.setAttribute('aria-hidden', 'false');
	}

	closeTrip?.addEventListener('click', () => tripModal?.setAttribute('aria-hidden', 'true'));

	// when modal is closed by clicking outside, hide it
	tripModal?.addEventListener('click', (e) => {
		if (e.target === tripModal) tripModal.setAttribute('aria-hidden', 'true');
	});
});

