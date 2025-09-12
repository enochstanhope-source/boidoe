// Function to inject the mobile menu into any page
function injectMobileMenu() {
  const menuHTML = `
    <style>
      @media (max-width: 768px) {
        .main-header {
          position: fixed;
          width: 100vw;
          top: 0;
          left: 0;
          z-index: 10000;
           background: linear-gradient(to right, #898484, #000000);
        }
        .main-nav {
           background: linear-gradient(to right, #8984841f, #00000044);
        }
        .nav-links {
          position: fixed;
          top: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(to right, #898484, #000000);
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 80px;
          transform: translateX(100%);
          transition: transform 1.3s cubic-bezier(0.77,0,0.175,1), opacity 0.9s cubic-bezier(0.4,0,0.2,1), visibility 0s;
          opacity: 1;
          visibility: hidden;
        }
        .nav-links.active {
          visibility: visible;
          transform: translateX(0);
          opacity: 1;
          transition: transform 1.3s cubic-bezier(0.77,0,0.175,1), opacity 0.5s cubic-bezier(0.4,0,0.2,1), visibility 0s;
        }
        .nav-links.closing {
          visibility: hidden;
          transform: translateX(100%);
          opacity: 0;
          transition: transform 1.3s cubic-bezier(0.77,0,0.175,1), opacity 0.9s cubic-bezier(0.4,0,0.2,1), visibility 0s;
        }
        .nav-dropdown {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .account-btn {
         background: linear-gradient(to bottom, #000000ff, #8b7d7fff);
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px 37px;
          border-radius: 9px;
          line-height: 0.5;
          margin-bottom: 12px;
          box-shadow: 0 2px 12px -2px rgba(218, 218, 218, 0.81);
          
        
        }

        .account-btn1 {
          background: linear-gradient(to bottom, #d3d3d3ff, #ff1a1aff);
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px 15px;
          border-radius: 9px;
          line-height: 0.5;
          padding: 5px 59px;
          
          
        }
        .acc-admin {
          background: linear-gradient(to bottom, #041ca3ff, #8b7d7fff);
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px 37px;
          border-radius: 9px;
          line-height: 0.5;
          margin-bottom: 12px;
          box-shadow: 0 2px 12px -2px rgba(218, 218, 218, 0.81);
        }
        
        .nav-links li > a {
          display: none;
        }
        .nav-links li > button {
          display: block;
        }
        .dropdown {
          all: initial;
          position: static;
          display: block;
          background: none !important;
          margin: 0;
          padding: 0;
          z-index: 10001;
          
        }
        .dropdown li a {
            margin-top: 14px;
            
            color: #fff;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            text-decoration: none;
            border-radius: 22px;
            font-size: 0.75rem;
            letter-spacing: 0.04em;
            font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
            font-weight: 500;
            margin-bottom: 12px;
            background: linear-gradient(120deg, #736e6eff 0%, #776969ff 100%);
            box-shadow: 0 2px 12px -2px rgba(194, 190, 190, 0.81);
            border: 1px solid rgba(255, 255, 255, 0.66);
            transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
            position: relative;
            overflow: hidden;
          }
          .dropdown li a:hover, .dropdown li a:active {
            background: linear-gradient(120deg, #f8a9a9 0%, #410808 100%);
            color: #fff;
            transform: scale(1.04);
            box-shadow: 0 4px 24px -4px rgba(208, 255, 0, 0.22);
            border: 1px solid rgba(255,255,255,0.18);
        }
        .dropdown li a:active {
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
          color: #ffffff;
          transform: translateX(8px) scale(1.03);
          box-shadow: 0 4px 20px -4px rgba(255, 0, 76, 0.18),
                     inset 0 0 0 1px rgba(255,255,255,0.12);
          letter-spacing: 0.04em;
        }
      }
      @media (min-width: 769px) {
        .main-header {
          background: linear-gradient(to bottom, #000000ff, #3f020bff);
        }
        .nav-links li > button {
          display: none !important;
        }
        .nav-links li > a {
          display: block !important;
        }
        .dropdown {
          all: initial;
          position: absolute;
          display: block;
          top: 100%;
          left: 0;
          background: none !important;
          margin: 0;
          padding: 0;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-40px);
          transition: all 0.3s ease;
        }
        .nav-dropdown:hover > .dropdown, .nav-dropdown:focus-within > .dropdown {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .dropdown li a {
          color: #f8f8ff;
          padding: 20px 36px;
          display: flex;
          align-items: center;
          text-decoration: none;
          border-radius: 16px;
          font-size: 1.15rem;
          letter-spacing: 0.03em;
          font-family: inherit;
          font-weight: 450;
          margin-bottom: 12px;
          background: linear-gradient(to bottom, #000000ff, #3f020bff);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .dropdown li a:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
          color: #ffffff;
          transform: translateX(8px) scale(1.03);
          box-shadow: 0 4px 20px -4px rgba(80,15,35,0.18),
                     inset 0 0 0 1px rgba(255,255,255,0.12);
          letter-spacing: 0.04em;
        }
      }
    </style>
    <header class="main-header">
      <nav class="main-nav">
        <div class="nav-logo">
          <a href="index.html"><img src="images/polybay.png" alt="Logo" height="40"></a>
        </div>
        <button class="nav-hamburger" id="navHamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="navLinks">
          <li>
            <a href="index.html">Home</a>
            <button class="account-btn"><a href="index.html">Home</a></button>
          </li>
          <li class="nav-dropdown">
            <a href="#">Admin Dashboard</a>
            <button class="acc-admin"><a href="#">Admin Dashboard</a></button>
            <ul class="dropdown">
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="manage-buses.html">Manage Buses</a></li>
              <li><a href="manage-drivers.html">Manage Drivers</a></li>
              <li><a href="tracking.html">Trip & Ride Tracking</a></li>
              <li><a href="maintenance.html">Maintenance Requests</a></li>
              <li><a href="settings.html">Settings / Profile</a></li>
            </ul>
          </li>
          <li class="nav-dropdown driver-panel">
            <a href="#">Drivers Panel</a>
            <button class="account-btn"><a href="#">Driver panel</a></button>
            <ul class="dropdown">
              <li><a href="driver-bus-routes.html">My Bus & Routes</a></li>
              <li><a href="driver-bus-routes.html" id="driverDashboardLink">My Dashboard</a></li>
              <li><a href="driver-trip.html">Start / End Trip</a></li>
              <li><a href="driver-payments.html">Passengers Counts & Payments</a></li>
              <li><a href="driver-report.html">Report Vehicle issue</a></li>
              <li><a href="driver-history.html">Ride History</a></li>
              <li><a href="driver-profile.html">Profile</a></li>
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="#">Contact Us</a>
            <button class="account-btn"><a href="#">Support</a></button>
            <ul class="dropdown">
              <li><a href="support.html">Contact Support</a></li>
              
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="#">Account</a>
            <button class="account-btn1"><a href="#">Account</a></button>
            <ul class="dropdown">
              <li><a href="duo.html">Sign in</a></li>
             
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    `;

  // Insert the menu at the beginning of the body
  document.body.insertAdjacentHTML('afterbegin', menuHTML);

  // Add event listeners for mobile menu functionality
  const navHamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  let menuOpen = false;
  let isTransitioning = false;

  navHamburger.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    if (!menuOpen) {
      navLinks.classList.add('active');
      navLinks.classList.remove('closing');
      navHamburger.classList.add('active');
    } else {
      // Force reflow to ensure opacity transition always triggers
      navLinks.classList.remove('active');
      void navLinks.offsetWidth;
      navLinks.classList.add('closing');
      navHamburger.classList.remove('active');
    }
  });

  navLinks.addEventListener('transitionend', (e) => {
    // Only handle the main transform transition
    if (e.propertyName !== 'transform') return;
    if (navLinks.classList.contains('active')) {
      menuOpen = true;
    } else if (navLinks.classList.contains('closing')) {
      navLinks.classList.remove('closing');
      menuOpen = false;
      navHamburger.classList.remove('active');
    }
    isTransitioning = false;
  });

  // Add click event listeners to dropdown parent links only (mobile only)
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
    const parentLink = dropdown.querySelector('a[href="#"]');
    if (parentLink) {
      parentLink.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) { // Only for mobile view
          // If this is the driver panel and user is not signed in, redirect to login
          if (dropdown.classList && dropdown.classList.contains('driver-panel')) {
            let signedIn = false;
            try {
              const storedRole = localStorage.getItem('userRole');
              if (storedRole) signedIn = true;
            } catch (err) { /* ignore storage errors */ }
            if (!signedIn && typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
              signedIn = true;
            }
            if (!signedIn) {
              e.preventDefault();
              // Show overlay and allow short time for session to restore
              showSessionCheckOverlay(2000).then(isSigned => {
                if (!isSigned) {
                  // Prompt the user with a friendly message offering sign in
                  showSignInPromptOverlay().then(choseSignIn => {
                    if (choseSignIn) {
                      window.location.href = 'duo.html';
                    }
                    // else do nothing (user cancelled)
                  });
                } else {
                  // If session restored, open the dropdown
                  const dropdownContent = dropdown.querySelector('.dropdown');
                  if (dropdownContent) {
                    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
                  }
                }
              });
              return;
            }
          }

          const dropdownContent = dropdown.querySelector('.dropdown');
          dropdownContent.style.display =
            dropdownContent.style.display === 'block' ? 'none' : 'block';
          e.preventDefault(); // Only prevent default for parent link
        }
      });
    }
    
    // Attach click guards to dropdown inner links: if this is the driver panel
    // and the user is not signed in, redirect to duo.html (login) like admin pages.
    const innerLinks = dropdown.querySelectorAll('.dropdown a');
    if (innerLinks && innerLinks.length) {
      innerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          try {
            // If this is the driver-panel dropdown, ensure user is authenticated
            if (dropdown.classList && dropdown.classList.contains('driver-panel')) {
              let signedIn = false;
              try {
                const storedRole = localStorage.getItem('userRole');
                if (storedRole) signedIn = true;
              } catch (err) { /* ignore storage errors */ }

              // If firebase is available, consider currentUser as signed in
              if (!signedIn && typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                signedIn = true;
              }

              if (!signedIn) {
                e.preventDefault();
                // Show overlay and wait briefly; if session restores, navigate to the link,
                // otherwise redirect to sign-in page.
                showSessionCheckOverlay(2000).then(isSigned => {
                  if (isSigned) {
                    // navigate to the intended link
                    try { window.location.href = link.href; } catch (e) { console.error(e); }
                  } else {
                    // show prompt that explains why and let user choose to sign in
                    showSignInPromptOverlay().then(choseSignIn => {
                      if (choseSignIn) window.location.href = 'duo.html';
                    });
                  }
                });
                return;
              }
            }
          } catch (ex) {
            // on any error, be conservative and allow the click to proceed
            console.error('Dropdown link guard error', ex);
          }
        });
      });
    }
  });
}

// Function to update account menu based on auth state
function updateAccountMenu(user) {
  const accountDropdown = document.querySelector('.nav-dropdown:last-child .dropdown');
  const adminPanel = document.querySelector('.nav-dropdown:nth-child(2)'); // About Us/Admin Dashboard
  const driverPanel = document.querySelector('.nav-dropdown:nth-child(3)'); // Programs/Driver Panel

  if (!accountDropdown) return;

  // Use stored role if present (set by duo.js), otherwise if firebase user exists assume driver
  const storedRole = localStorage.getItem('userRole');
  const role = storedRole || (user ? 'driver' : null);
  const isSignedIn = !!role;

  if (isSignedIn) {
    // Show/hide panels based on role
    if (role === 'admin') {
      if (adminPanel) adminPanel.style.display = 'block';
      if (driverPanel) driverPanel.style.display = 'none';
    } else {
      if (adminPanel) adminPanel.style.display = 'none';
      if (driverPanel) driverPanel.style.display = 'block';
    }

    accountDropdown.innerHTML = `
      <li><a href="duo.html">Access Dashboard</a></li>
      <li><a href="#" id="signOutBtn"><span id="signOutText">Sign Out</span></a></li>
    `;
    // Add sign out functionality
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
            signOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Create progress overlay (clean, professional circular spinner + label)
        let loaderOverlay = document.createElement('div');
        loaderOverlay.id = 'loaderOverlay';
        loaderOverlay.innerHTML = `
          <div class="progressbar-overlay">
            <div class="progressbar-container">
              <div class="pb-top">
                <svg class="pb-circle" viewBox="0 0 50 50" aria-hidden="true">
                  <defs>
                    <linearGradient id="pbGrad" x1="0" x2="1">
                      <stop offset="0%" stop-color="#ff1a1a"/>
                      <stop offset="100%" stop-color="#3f020b"/>
                    </linearGradient>
                  </defs>
                  <circle class="pb-bg" cx="25" cy="25" r="20" fill="none" stroke="#efeef0" stroke-width="4"></circle>
                  <circle class="pb-fg" cx="25" cy="25" r="20" fill="none" stroke="url(#pbGrad)" stroke-width="4" stroke-linecap="round" stroke-dasharray="126" stroke-dashoffset="126"></circle>
                </svg>
                <div class="progressbar-label">Signing out…</div>
              </div>
              <div class="progressbar-sub">Saving session and signing out securely</div>
            </div>
          </div>
        `;
        document.body.appendChild(loaderOverlay);
        // Add progress bar styles
        if (!document.getElementById('progressBarStyle')) {
          const style = document.createElement('style');
          style.id = 'progressBarStyle';
          style.innerHTML = `
            .progressbar-overlay {
              position: fixed;
              top: 0; left: 0;
              width: 100vw; height: 100vh;
              background: rgba(20,20,30,0.55);
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(6px) saturate(150%);
            }
            .progressbar-container {
              background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
              border-radius: 16px;
              box-shadow: 0 12px 40px rgba(31,9,11,0.6);
              padding: 28px 36px;
              min-width: 280px;
              display: flex;
              flex-direction: column;
              align-items: center;
              border: 1px solid rgba(255,255,255,0.06);
            }
            .pb-top{display:flex;align-items:center;gap:18px}
            .pb-circle{width:64px;height:64px}
            .pb-bg{opacity:0.9}
            .pb-fg{transition:stroke-dashoffset 0.2s linear}
            .progressbar-label{font-size:1.05rem;font-weight:700;color:#fff;margin:0}
            .progressbar-sub{font-size:0.9rem;color:rgba(255,255,255,0.8);margin-top:10px}
            .progressbar-check{margin-top:16px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:50%;box-shadow:0 6px 18px rgba(0,0,0,0.12);transform:scale(0);opacity:0;transition:transform .2s ease,opacity .2s ease}
            .progressbar-check.show{transform:scale(1);opacity:1}
          `;
          document.head.appendChild(style);
        }
        // Animate progress bar for 5 seconds
        // Support either the old linear progress element (div) or the new circular SVG (.pb-fg)
        let progressBar = document.getElementById('signOutProgressBar') || document.querySelector('.pb-fg');
        let progress = 0;
        const duration = 5000; // 5 seconds
        const interval = 50;
        const step = 100 / (duration / interval);
            const progressInterval = setInterval(() => {
          progress += step;
          if (progressBar) {
            // If SVG circle, animate stroke-dashoffset
            if (typeof progressBar.getTotalLength === 'function') {
              const circumference = progressBar.getTotalLength();
              const offset = Math.max(circumference - (progress / 100) * circumference, 0);
              progressBar.style.strokeDashoffset = offset;
            } else {
              // fallback for linear div
              progressBar.style.width = Math.min(progress, 100) + '%';
            }
          }
          if (progress >= 100) {
            clearInterval(progressInterval);
            // Show checkmark animation before redirect
            const container = loaderOverlay.querySelector('.progressbar-container');
            if (container) {
              const checkDiv = document.createElement('div');
              checkDiv.className = 'progressbar-check';
              checkDiv.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="15" stroke="#3f020b" stroke-width="2" fill="#fff"/><path d="M10 17.5L15 22L22 13" stroke="#3f020b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
              container.appendChild(checkDiv);
            }
            setTimeout(() => {
              // clear local role markers before signing out
              try { localStorage.removeItem('userRole'); } catch (e) {}
              try { sessionStorage.removeItem('isAdmin'); sessionStorage.removeItem('adminUsername'); } catch (e) {}
              // sign out if firebase available, else just redirect
              if (typeof firebase !== 'undefined' && firebase.auth) {
                firebase.auth().signOut().then(() => {
                  window.location.href = 'index.html';
                }).catch((error) => {
                  console.error('Sign Out Error', error);
                  if (loaderOverlay) loaderOverlay.remove();
                  const signOutText = document.getElementById('signOutText');
                  if (signOutText) signOutText.textContent = 'Sign Out';
                });
              } else {
                if (loaderOverlay) loaderOverlay.remove();
                window.location.href = 'index.html';
              }
            }, 700); // show checkmark for 0.7s
          }
        }, interval);
        // Change button text to a small, professional inline spinner + label
        const signOutText = document.getElementById('signOutText');
        if (signOutText) {
          // Inject lightweight styles once
          if (!document.getElementById('signOutInlineStyle')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'signOutInlineStyle';
            styleEl.innerHTML = `
              .signout-inline{display:inline-flex;align-items:center;gap:10px}
              .signout-spinner{width:16px;height:16px;border-radius:50%;border:2px solid rgba(63,2,11,0.12);border-top-color:#3f020b;box-sizing:border-box;animation:signout-spin 0.8s linear infinite}
              .signout-text{color:#3f020b;font-weight:600;font-size:0.95rem}
              @keyframes signout-spin{to{transform:rotate(360deg)}}
            `;
            document.head.appendChild(styleEl);
          }
          signOutText.innerHTML = '<span class="signout-inline" aria-live="polite"><span class="signout-spinner" aria-hidden="true"></span><span class="signout-text">Signing out…</span></span>';
        }
      });
    }
  } else {
    // User is signed out
    // Show both admin and driver panels
    if (adminPanel) adminPanel.style.display = 'block';
    if (driverPanel) driverPanel.style.display = 'block';
    
    accountDropdown.innerHTML = `
      <li><a href="duo.html">Sign in</a></li>
    `;
  }
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  injectMobileMenu();
  
  // Add Firebase auth state observer
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged((user) => {
      updateAccountMenu(user);
    });
  }
});

/* Helper: show a lightweight auth-check overlay and resolve when Firebase
   restores user or timeout expires. Returns a promise that resolves to true
   if a user is signed in, false otherwise. */
function showSessionCheckOverlay(timeoutMs = 2000) {
  return new Promise((resolve) => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'menu-auth-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(3,6,10,0.75)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '20000';
  overlay.style.padding = 'env(safe-area-inset-top,16px) env(safe-area-inset-right,16px) env(safe-area-inset-bottom,16px) env(safe-area-inset-left,16px)';
  overlay.innerHTML = '<div style="max-width:420px;width:92%;margin:0 auto;text-align:center;color:#e6eef6;padding:18px;border-radius:10px;background:linear-gradient(180deg,#0b0b0b,#101010);border:1px solid rgba(255,255,255,0.03)"><strong style="font-size:1.05rem">Checking session...</strong><div style="height:8px"></div><small style="color:#9aa6b2">You will be redirected to sign in if not signed.</small></div>';
    document.body.appendChild(overlay);

    let resolved = false;

    function cleanAndResolve(val) {
      if (resolved) return;
      resolved = true;
      try { overlay.remove(); } catch (e) {}
      resolve(val);
    }

    // If firebase isn't available, just wait a short time and resolve based on local markers
    if (typeof firebase === 'undefined' || !firebase.auth) {
      setTimeout(() => {
        let signedIn = false;
        try { if (localStorage.getItem('userRole')) signedIn = true; } catch (e) {}
        cleanAndResolve(!!signedIn);
      }, timeoutMs);
      return;
    }

    // If firebase exists, listen for auth state; also set a timeout
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (typeof unsub === 'function') unsub();
        cleanAndResolve(true);
      }
    });

    setTimeout(() => {
      // After timeout, if firebase.currentUser or local markers present, treat as signed in
      let signedIn = false;
      try { if (firebase.auth().currentUser) signedIn = true; } catch (e) {}
      try { if (localStorage.getItem('userRole')) signedIn = true; } catch (e) {}
      if (typeof unsub === 'function') unsub();
      cleanAndResolve(!!signedIn);
    }, timeoutMs);
  });
}

/* Show a nicer prompt when user is not signed in and attempts to access driver features.
   Returns a promise that resolves to true if user chose to sign in or is signed in, false otherwise.
*/
function showSignInPromptOverlay() {
  return new Promise((resolve) => {
    // Build overlay
    const overlay = document.createElement('div');
    overlay.id = 'sign-in-prompt-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '21000';
    overlay.style.padding = 'env(safe-area-inset-top,16px) env(safe-area-inset-right,16px) env(safe-area-inset-bottom,16px) env(safe-area-inset-left,16px)';

    overlay.innerHTML = `
      <div style="max-width:420px;width:94%;margin:0 auto;background:linear-gradient(180deg,#0b0b0b,#141414);padding:18px;border-radius:12px;border:1px solid rgba(255,255,255,0.04);color:#fff;text-align:center;font-family:inherit">
        <h3 style="margin:0 0 8px">Sign in required</h3>
        <p style="margin:0 0 14px;color:rgba(255,255,255,0.8)">You need to sign in to access Drivers Panel features. Sign in now to continue.</p>
        <div style="display:flex;gap:12px;justify-content:center">
          <button id="sipSignInBtn" style="background:#3f020b;color:#fff;padding:10px 14px;border-radius:10px;border:none;cursor:pointer">Sign in</button>
          <button id="sipCancelBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.08);color:#fff;padding:10px 14px;border-radius:10px;cursor:pointer">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const cleanup = (val) => {
      try { overlay.remove(); } catch (e) {}
      resolve(val);
    };

    const signInBtn = document.getElementById('sipSignInBtn');
    const cancelBtn = document.getElementById('sipCancelBtn');

    if (signInBtn) signInBtn.addEventListener('click', () => cleanup(true));
    if (cancelBtn) cancelBtn.addEventListener('click', () => cleanup(false));

    // Also allow clicking outside the dialog to cancel
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cleanup(false);
    });
  });
}

