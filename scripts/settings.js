document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('settings-root');
	if (!root) return;

	root.innerHTML = '';
	const el = document.createElement('div');
	el.className = 'settings-panel';
	el.innerHTML = `
		<label><input type="checkbox" id="auto-refresh" checked> Auto-refresh dashboard</label><br>
		<label><input type="checkbox" id="show-notifs" checked> Show notifications</label><br>
		<button id="save-settings" class="btn">Save Settings</button>
		<div id="save-msg" style="margin-top:8px;color:#9aa6b2"></div>
	`;
	root.appendChild(el);

	document.getElementById('save-settings').addEventListener('click', () => {
		document.getElementById('save-msg').textContent = 'Settings saved locally.';
		setTimeout(() => document.getElementById('save-msg').textContent = '', 3000);
	});
});

