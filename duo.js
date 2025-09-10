document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const adminForm = document.getElementById('adminForm');
    const driverForm = document.getElementById('driverForm');
    const modal = document.getElementById('alertModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModal = document.querySelector('.close-modal');
    const cancelButton = document.getElementById('cancelButton');

    // Cancel/back button
    if (cancelButton) {
        cancelButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
            setTimeout(() => {
                if (document.location.href === window.location.href) {
                    window.location.href = 'index.html';
                }
            }, 100);
        });
    }

    // Clear input values on load
    document.querySelectorAll('input[type="text"], input[type="password"]').forEach(i => i.value = '');

    // Password visibility toggles
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const el = document.getElementById(targetId);
            if (!el) return;
            if (el.type === 'password') {
                el.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                el.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Helper functions
    function showModal(msg) {
        if (!modal || !modalMessage) return;
        modalMessage.textContent = msg;
        modal.style.display = 'block';
    }
    function hideModal() { if (modal) modal.style.display = 'none'; }
    function clearForm(form) { if (!form) return; form.reset(); }

        // Login overlay helpers (reusable for admin and driver)
        function showLoginOverlay(label) {
                if (document.getElementById('loginLoaderOverlay')) return;
                const overlay = document.createElement('div');
                overlay.id = 'loginLoaderOverlay';
                overlay.innerHTML = `
                    <div class="login-overlay">
                        <div class="login-card">
                            <svg class="login-circle" viewBox="0 0 50 50" aria-hidden="true">
                                <circle class="lc-bg" cx="25" cy="25" r="20" fill="none" stroke="#eee" stroke-width="4"></circle>
                                <circle class="lc-fg" cx="25" cy="25" r="20" fill="none" stroke="#3f020b" stroke-width="4" stroke-linecap="round" stroke-dasharray="126" stroke-dashoffset="94"></circle>
                            </svg>
                            <div class="login-label">${label || 'Signing in…'}</div>
                        </div>
                    </div>
                `;
                document.body.appendChild(overlay);
                if (!document.getElementById('loginLoaderStyle')) {
                    const s = document.createElement('style');
                    s.id = 'loginLoaderStyle';
                    s.innerHTML = `
                        .login-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,8,12,0.5);z-index:100000}
                        .login-card{background:linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02));padding:22px 28px;border-radius:12px;display:flex;align-items:center;gap:14px;border:1px solid rgba(255,255,255,0.06);box-shadow:0 8px 30px rgba(0,0,0,0.6)}
                        .login-circle{width:56px;height:56px}
                        .lc-fg{transform-origin:center;animation:login-spin 1s linear infinite}
                        .login-label{color:#fff;font-weight:700;font-size:1rem}
                        .login-check{width:56px;height:56px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center}
                        @keyframes login-spin{to{transform:rotate(360deg)}}
                    `;
                    document.head.appendChild(s);
                }
        }
        function showLoginSuccess(callback) {
                const overlay = document.getElementById('loginLoaderOverlay');
                if (!overlay) { if (callback) callback(); return; }
                const card = overlay.querySelector('.login-card');
                if (!card) { overlay.remove(); if (callback) callback(); return; }
                // replace spinner with check
                card.innerHTML = `<div class="login-check"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#3f020b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="login-label">Signed in</div>`;
                // animate then callback
                setTimeout(() => { const ov = document.getElementById('loginLoaderOverlay'); if (ov) ov.remove(); if (callback) callback(); }, 700);
        }
        function hideLoginOverlay() { const ov = document.getElementById('loginLoaderOverlay'); if (ov) ov.remove(); }

    if (closeModal) closeModal.addEventListener('click', hideModal);
    window.addEventListener('click', function(e) { if (e.target === modal) hideModal(); });

    // --- Admin login (simple local credential) ---
    // Username: admin  Password: admin
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = (document.getElementById('adminUsername') || {}).value || '';
            const password = (document.getElementById('adminPassword') || {}).value || '';
            const btn = adminForm.querySelector('button[type="submit"]');
            const original = btn ? btn.textContent : '';

            if (!username || !password) {
                showModal('Enter username and password.');
                return;
            }

            if (btn) { btn.disabled = true; btn.textContent = 'Logging in...'; }
            // show overlay
            showLoginOverlay('Signing in as admin…');

            if (username === 'admin' && password === 'admin') {
                // set session login mode
                sessionStorage.setItem('isAdmin', 'true');
                sessionStorage.setItem('adminUsername', username);
                // also set a durable role marker used by the menu
                localStorage.setItem('userRole', 'admin');
                // show success animation then redirect
                showLoginSuccess(() => { window.location.href = 'index.html?mode=admin'; });
                return;
            }

            // fail
            showModal('Invalid admin credentials');
            if (btn) { btn.disabled = false; btn.textContent = original; }
            clearForm(adminForm);
        });
    }

    // --- Driver login (Firebase) ---
    if (driverForm && window.firebase && firebase.auth) {
        driverForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = (document.getElementById('driverUsername') || {}).value || '';
            const password = (document.getElementById('driverPassword') || {}).value || '';
            const btn = driverForm.querySelector('button[type="submit"]');
            if (!email || !password) { showModal('Enter email and password'); return; }
            if (btn) { btn.disabled = true; btn.textContent = 'Logging in...'; }
            showLoginOverlay('Signing in…');

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    // mark user role so the menu can show driver links
                    try { localStorage.setItem('userRole', 'driver'); } catch (e) { /* ignore storage issues */ }
                    // show success then redirect
                    showLoginSuccess(() => { window.location.href = 'index.html?mode=driver'; });
                })
                .catch(err => {
                    hideLoginOverlay();
                    showModal(err.message || 'Login failed');
                    if (btn) { btn.disabled = false; btn.textContent = 'Login as Driver'; }
                });
        });
    }
});
