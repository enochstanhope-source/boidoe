// Shared sidebar toggle used by all admin pages
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    if (!toggleBtn || !sidebar) return;

    // Reuse global container if available
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    window.__dashboard = window.__dashboard || {};

    window.__dashboard.openSidebar = function() {
        sidebar.classList.add('active');
        overlay.classList.add('visible');
        sidebar.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
    };

    window.__dashboard.closeSidebar = function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('visible');
        sidebar.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
    };

    toggleBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) window.__dashboard.closeSidebar();
        else window.__dashboard.openSidebar();
    });

    overlay.addEventListener('click', window.__dashboard.closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) window.__dashboard.closeSidebar();
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            if (window.innerWidth <= 768) window.__dashboard.closeSidebar();
        });
    });

    const sidebarCloseBtn = document.querySelector('.sidebar-close');
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', window.__dashboard.closeSidebar);
});
