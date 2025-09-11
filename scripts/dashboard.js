// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyA9-SeBMqujxMleatSd23FM5vlLWdOVUPA",
        authDomain: "grandpa-523e1.firebaseapp.com",
        projectId: "grandpa-523e1",
        storageBucket: "grandpa-523e1.firebasestorage.app",
        messagingSenderId: "1049062266843",
        appId: "1:1049062266843:web:6f8b23c5a1f20a7836f9fe"
    };

    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Authentication state observer
    // Create a lightweight overlay while we wait for Firebase to restore auth state
    (function createAuthOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'auth-overlay';
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = 'rgba(3,6,10,0.85)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '2000';
        overlay.innerHTML = '<div style="text-align:center;color:#e6eef6;padding:20px;border-radius:8px"><strong style="font-size:1.05rem">Checking session...</strong><div style="height:8px"></div><small style="color:#9aa6b2">You will be redirected only if not signed in.</small></div>';
        document.body.appendChild(overlay);
    })();

    const MAX_WAIT_MS = 3000; // give Firebase up to 3s to restore persisted auth
    let _authResolved = false;

    function removeOverlay() {
        const o = document.getElementById('auth-overlay');
        if (o) o.remove();
    }

    function isLocalAdminMarker() {
        try {
            const storedRole = localStorage.getItem('userRole');
            if (storedRole === 'admin') return true;
        } catch (e) {
            /* ignore storage errors */
        }
        try {
            if (sessionStorage.getItem('isAdmin') === 'true') return true;
        } catch (e) {
            /* ignore storage errors */
        }
        return false;
    }

    // If Firebase not available for some reason, fall back to storage markers
    if (typeof firebase === 'undefined' || !firebase.auth) {
        if (isLocalAdminMarker()) {
            _authResolved = true;
            removeOverlay();
        } else {
            // No firebase and no markers -> redirect
            removeOverlay();
            window.location.href = 'duo.html';
        }
    } else {
        // Start a timer that will redirect if nothing authenticates within MAX_WAIT_MS
        const failTimer = setTimeout(() => {
            if (_authResolved) return;
            // Check Firebase currentUser & local markers one last time
            if (firebase.auth().currentUser || isLocalAdminMarker()) {
                _authResolved = true;
                removeOverlay();
                return;
            }
            removeOverlay();
            window.location.href = 'duo.html';
        }, MAX_WAIT_MS);

        firebase.auth().onAuthStateChanged(function(user) {
            console.log('auth state changed - user:', user);
            if (user) {
                _authResolved = true;
                clearTimeout(failTimer);
                removeOverlay();
                return; // stay on dashboard
            }

            // No user in this callback. If we've already completed the initial wait,
            // treat this as a real sign-out and redirect immediately.
            if (_authResolved) {
                removeOverlay();
                window.location.href = 'duo.html';
            }
            // Otherwise, allow failTimer to perform the redirect after MAX_WAIT_MS
        });
    }

    // Sidebar Toggle Functionality

    // Random Number Updates with Animation
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showIncrementAnimation(element, isIncrease) {
        const animationEl = document.createElement('span');
        animationEl.className = 'number-animation';
        animationEl.textContent = isIncrease ? '+1' : '-1';
        element.parentElement.appendChild(animationEl);

        setTimeout(() => {
            animationEl.remove();
        }, 1000);
    }

    function updateNumber(element) {
        const min = parseInt(element.dataset.min);
        const max = parseInt(element.dataset.max);
        
        // Extract just the number from status text (e.g., "20 Active" -> 20)
        const numericPart = element.textContent.split(' ')[0];
        const currentNumericValue = parseInt(numericPart);
        
        const newValue = getRandomNumber(min, max);
        
        // Only update if value changes
        if (newValue !== currentNumericValue) {
            // Find the card icon and add pulse animation
            const card = element.closest('.card');
            const icon = card?.querySelector('.card-icon');
            if (icon) {
                icon.classList.add('pulse');
                setTimeout(() => icon.classList.remove('pulse'), 500);
            }

            // Animate the number change
            showIncrementAnimation(element, newValue > currentNumericValue);
            
            // Update text with smooth transition
            element.style.transform = 'scale(0.8)';
            element.style.opacity = '0.5';
            
            setTimeout(() => {
                // If it's a status element, preserve the text part
                if (element.classList.contains('status')) {
                    const textPart = element.textContent.split(' ').slice(1).join(' ');
                    element.textContent = `${newValue} ${textPart}`;
                } else {
                    element.textContent = newValue;
                }
                
                // Scale back with smooth transition
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
                
                // Update color based on value range
                const ratio = (newValue - min) / (max - min);
                if (element.classList.contains('number')) {
                    element.style.color = ratio > 0.7 ? '#ff6b6b' : 
                                        ratio > 0.4 ? '#ffd93d' : 
                                        '#4ecdc4';
                }
            }, 150);
        }
    }

    function updateAllNumbers() {
        const numberElements = document.querySelectorAll('.number, .status');
        numberElements.forEach(element => {
            if (Math.random() < 0.3) { // 30% chance of updating each number
                updateNumber(element);
            }
        });
    }

    // More frequent but gentler updates
    setInterval(updateAllNumbers, 2000);  // Update every 2 seconds
    
    // Initial load animation
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // Stagger the animations
    });

    // Start number updates after initial animation
    setTimeout(updateAllNumbers, 1000);
    // Sidebar toggle is handled by the shared `sidebar-toggle.js` script included on all admin pages.
    // Initialize ARIA defaults in case the shared script expects them.
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        sidebar.setAttribute('aria-hidden', 'true');
    }

    // Charts Initialization
    initializeCharts();

    // Initialize Notifications
    initializeNotifications();
});

// Charts Initialization Function
function initializeCharts() {
    // Helper to generate random integer between min and max
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Bus Utilization Chart (doughnut)
    const busUtilizationCtx = document.getElementById('busUtilizationChart');
    let busUtilChart = null;
    if (busUtilizationCtx) {
        busUtilChart = new Chart(busUtilizationCtx, {
            type: 'doughnut',
            data: {
                labels: ['In Service', 'Maintenance', 'Available', 'Out of Service'],
                datasets: [{
                    data: [15, 3, 4, 2],
                    backgroundColor: ['#4ecdc4', '#ff6b6b', '#45b7d1', '#96ceb4'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                animation: { duration: 800, easing: 'easeInOutCubic' },
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Route Performance Chart (bar)
    const routePerformanceCtx = document.getElementById('routePerformanceChart');
    let routePerfChart = null;
    if (routePerformanceCtx) {
        routePerfChart = new Chart(routePerformanceCtx, {
            type: 'bar',
            data: {
                labels: ['Route A', 'Route B', 'Route C', 'Route D'],
                datasets: [{
                    label: 'Daily Trips',
                    data: [25, 18, 30, 22],
                    backgroundColor: ['#45b7d1', '#45b7d1', '#45b7d1', '#45b7d1'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                animation: { duration: 800, easing: 'easeInOutCubic' },
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Function to produce new synthetic data and update charts smoothly
    function updateCharts() {
        // Bus Utilization: keep total roughly constant but vary slices
        if (busUtilChart) {
            const total = 24; // keep total similar to initial
            const inService = rand(10, 18);
            const maintenance = rand(1, 6);
            const available = rand(2, 8);
            let outOfService = total - (inService + maintenance + available);
            if (outOfService < 0) outOfService = rand(0, 3);
            const newData = [inService, maintenance, available, outOfService];
            busUtilChart.data.datasets[0].data = newData;
            busUtilChart.update({ duration: 1000, easing: 'easeInOutCubic' });

            // small pulse on container
            const container = busUtilizationCtx.closest('.chart-container');
            if (container) {
                container.classList.add('pulse');
                setTimeout(() => container.classList.remove('pulse'), 900);
            }
        }

        // Route Performance: update bars with smooth transitions
        if (routePerfChart) {
            routePerfChart.data.datasets[0].data = [rand(12, 36), rand(8, 30), rand(15, 40), rand(10, 34)];
            routePerfChart.update({ duration: 1000, easing: 'easeInOutCubic' });

            const container = routePerformanceCtx.closest('.chart-container');
            if (container) {
                container.classList.add('pulse');
                setTimeout(() => container.classList.remove('pulse'), 900);
            }
        }
    }

    // Start periodic updates so charts are reactive (every 5s)
    setInterval(updateCharts, 5000);

    // Initial gentle update after a moment so the UI feels live
    setTimeout(updateCharts, 800);
}

// Notifications System
function initializeNotifications() {
    const notificationBell = document.querySelector('.notifications');
    if (notificationBell) {
        notificationBell.addEventListener('click', () => {
            // Here you would typically show a notifications dropdown
            // For now, we'll just log to console
            console.log('Notifications clicked');
        });
    }
}

// Notification counter loop: increment from 3 up to 45, then reset to 3; runs every 5s
function startNotificationCounter() {
    const badge = document.getElementById('notification-badge');
    if (!badge) return;

    const MIN = 3;
    const MAX = 45;
    let current = parseInt(badge.textContent) || MIN;

    function step() {
        current++;
        if (current > MAX) current = MIN;
        // simple fade animation
        badge.style.transition = 'transform 250ms ease, opacity 250ms ease';
        badge.style.transform = 'scale(0.6)';
        badge.style.opacity = '0.4';
        setTimeout(() => {
            badge.textContent = current;
            badge.style.transform = 'scale(1)';
            badge.style.opacity = '1';
        }, 250);
    }

    // Start stepping every 5 seconds
    step(); // run once immediately to advance from initial value
    return setInterval(step, 5000);
}

// Tooltip accessibility: show tooltip on focus and hide on blur
function wireNotificationTooltip() {
    const container = document.querySelector('.notifications');
    const tooltip = container ? container.querySelector('.tooltip-text') : null;
    if (!container || !tooltip) return;

    container.addEventListener('focus', () => tooltip.classList.add('visible'));
    container.addEventListener('blur', () => tooltip.classList.remove('visible'));
    container.addEventListener('mouseenter', () => tooltip.classList.add('visible'));
    container.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
}

// Kick off the notification counter and tooltip wiring when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // small timeout so DOM elements from header are ready
    setTimeout(() => {
        startNotificationCounter();
        wireNotificationTooltip();
    }, 50);
});

// Real-time Updates (Mock Implementation)
function initializeRealTimeUpdates() {
    // Simulated real-time updates
    setInterval(() => {
        updateBusLocations();
        updateDriverStatus();
        updateMaintenanceRequests();
    }, 30000); // Updates every 30 seconds
}

// Mock update functions
function updateBusLocations() {
    // In a real implementation, this would fetch data from Firebase
    console.log('Updating bus locations...');
}

function updateDriverStatus() {
    // In a real implementation, this would fetch data from Firebase
    console.log('Updating driver status...');
}

function updateMaintenanceRequests() {
    // In a real implementation, this would fetch data from Firebase
    console.log('Updating maintenance requests...');
}

// Handle Search Functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Implement search functionality here
        console.log('Searching for:', searchTerm);
    });
}

// Add Error Handling
window.addEventListener('error', function(e) {
    console.error('Global error handler:', e.error);
    // Implement error reporting/logging here
});

// Initialize everything when the page loads
initializeRealTimeUpdates();

/* Recent Activities: dynamic generator */
(() => {
    const activityListEl = document.querySelector('.activity-list');
    if (!activityListEl) return;

    const templates = [
        { icon: 'fa-bus', title: 'Bus {id} Started Route', desc: 'Campus Gate to Engineering Block' },
        { icon: 'fa-wrench', title: 'Maintenance Request', desc: 'Bus {id} scheduled for maintenance' },
        { icon: 'fa-user-tie', title: 'Driver Assignment', desc: '{driver} assigned to {route}' },
        { icon: 'fa-route', title: 'Route Deviation', desc: 'Bus {id} took an alternate path' },
        { icon: 'fa-clock', title: 'Delay Reported', desc: 'Bus {id} delayed by {mins} mins' }
    ];

    // helper random
    function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

    // generate a new activity object
    function makeActivity(index) {
        const tpl = templates[rand(0, templates.length - 1)];
        const id = 'BUS-' + String(rand(1, 120)).padStart(3, '0');
        const driverNames = ['John Doe','Aisha Bello','Samuel K','Grace N','Michael O'];
        const driver = driverNames[rand(0, driverNames.length - 1)];
        const route = ['Route A','Route B','Route C','Route D'][rand(0,3)];
        const mins = rand(1,45);

        let title = tpl.title.replace('{id}', id).replace('{driver}', driver).replace('{route}', route);
        let desc = tpl.desc.replace('{id}', id).replace('{driver}', driver).replace('{route}', route).replace('{mins}', mins);

        return {
            icon: tpl.icon,
            title,
            desc,
            ts: Date.now() - rand(0, 60 * 60 * 1000) // between now and 1 hour ago
        };
    }

    // render one activity DOM node
    function renderActivity(act) {
        const item = document.createElement('div');
        item.className = 'activity-item new';
        item.innerHTML = `
            <div class="activity-icon"><i class="fas ${act.icon}"></i></div>
            <div class="activity-details">
                <h4>${act.title}</h4>
                <p>${act.desc}</p>
                <span class="time" data-ts="${act.ts}">just now</span>
            </div>
        `;
        return item;
    }

    // update time labels live (e.g., '3 minutes ago')
    function refreshTimes() {
        const times = activityListEl.querySelectorAll('.time');
        times.forEach(span => {
            const ts = parseInt(span.dataset.ts, 10);
            const diffMs = Date.now() - ts;
            const mins = Math.floor(diffMs / 60000);
            if (mins < 1) span.textContent = 'just now';
            else if (mins === 1) span.textContent = '1 minute ago';
            else if (mins < 60) span.textContent = `${mins} minutes ago`;
            else {
                const hrs = Math.floor(mins / 60);
                span.textContent = hrs === 1 ? '1 hour ago' : `${hrs} hours ago`;
            }
        });
    }

    // maintain up to 20 items; insert a new one every 15s
    let entries = Array.from(activityListEl.querySelectorAll('.activity-item')).map(el => {
        const timeSpan = el.querySelector('.time');
        return { el, ts: parseInt(timeSpan?.dataset?.ts || Date.now(), 10) };
    });

    // If existing items don't have data-ts, assign them approximate times based on their displayed text
    activityListEl.querySelectorAll('.activity-item').forEach((el, i) => {
        const span = el.querySelector('.time');
        if (!span.dataset.ts) {
            // create a timestamp from displayed minutes (best-effort)
            const text = span.textContent || '';
            let ts = Date.now();
            const m = text.match(/(\d+)\s+minute/);
            const h = text.match(/(\d+)\s+hour/);
            if (m) ts = Date.now() - parseInt(m[1],10) * 60000;
            else if (h) ts = Date.now() - parseInt(h[1],10) * 3600000;
            span.dataset.ts = ts;
        }
    });

    // initial refresh
    refreshTimes();

    function addNewActivity() {
        const act = makeActivity();
        const node = renderActivity(act);

        // insert at top
        activityListEl.insertBefore(node, activityListEl.firstChild);

        // animate in
        setTimeout(() => node.classList.remove('new'), 60);

        // trim to 20
        const items = activityListEl.querySelectorAll('.activity-item');
        if (items.length > 20) {
            for (let i = items.length - 1; i >= 20; i--) {
                items[i].remove();
            }
        }
    }

    // start periodic insertion every 15 seconds
    addNewActivity();
    const activityInterval = setInterval(() => {
        addNewActivity();
    }, 15000);

    // refresh relative times every 20 seconds so labels stay current
    setInterval(refreshTimes, 20000);

})();
