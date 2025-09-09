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
            <a href="#">About Us</a>
            <button class="acc-admin"><a href="#">Admin Dashboard</a></button>
            <ul class="dropdown">
              <li><a href="ourstory.html">Dashboard</a></li>
              <li><a href="ourteam.html">Manage Buses</a></li>
              <li><a href="press.html">Manage Drivers</a></li>
              <li><a href="ourstory.html">Trip & Ride Tracking</a></li>
              <li><a href="ourteam.html">Maintenance Requests</a></li>
              <li><a href="press.html">Settings / Profilee</a></li>
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="#">Programs</a>
            <button class="account-btn"><a href="#">Driver panel</a></button>
            <ul class="dropdown">
              <li><a href="digital.html">My Bus & Routes</a></li>
              <li><a href="business.html">Start / End Trip</a></li>
              <li><a href="vocational.html">Passengers Counts & Payments</a></li>
              <li><a href="soft.html">Report Vehicle issue</a></li>
               <li><a href="soft.html">Ride History</a></li>
                <li><a href="soft.html">Profile</a></li>

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
          const dropdownContent = dropdown.querySelector('.dropdown');
          dropdownContent.style.display =
            dropdownContent.style.display === 'block' ? 'none' : 'block';
          e.preventDefault(); // Only prevent default for parent link
        }
      });
    }
  });
}

// Function to update account menu based on auth state
function updateAccountMenu(user) {
  const accountDropdown = document.querySelector('.nav-dropdown:last-child .dropdown');
  if (!accountDropdown) return;

  if (user) {
    // User is signed in
    accountDropdown.innerHTML = `
      <li><a href="duo.html">Access Dashboard</a></li>
      <li><a href="#" id="signOutBtn"><span id="signOutText">Sign Out</span></a></li>
    `;
    // Add sign out functionality
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Create progress bar overlay
        let loaderOverlay = document.createElement('div');
        loaderOverlay.id = 'loaderOverlay';
        loaderOverlay.innerHTML = `
          <div class="progressbar-overlay">
            <div class="progressbar-container">
              <div class="progressbar-label">Signing Out...</div>
              <div class="progressbar-bg">
                <div class="progressbar-fill" id="signOutProgressBar"></div>
              </div>
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
              background: rgba(30, 30, 60, 0.45);
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(8px) saturate(180%);
            }
            .progressbar-container {
              background: rgba(255,255,255,0.18);
              border-radius: 24px;
              box-shadow: 0 8px 32px #3f020b44;
              padding: 44px 56px;
              min-width: 340px;
              display: flex;
              flex-direction: column;
              align-items: center;
              border: 1.5px solid rgba(255,255,255,0.25);
            }
            .progressbar-label {
              font-size: 1.35rem;
              font-weight: 700;
              color: #3f020b;
              margin-bottom: 28px;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 12px #fff8, 0 1px 0 #fff;
            }
            .progressbar-bg {
              width: 100%;
              height: 22px;
              background: rgba(255,255,255,0.35);
              border-radius: 11px;
              overflow: hidden;
              box-shadow: 0 2px 12px #3f020b22;
              border: 1px solid #fff3;
            }
            .progressbar-fill {
              height: 100%;
              width: 0%;
              background: linear-gradient(270deg, #ff1a1a, #3f020b, #ffb347, #3f020b);
              background-size: 400% 400%;
              border-radius: 11px;
              transition: width 0.2s linear;
              animation: gradientMove 2s ease-in-out infinite;
            }
            @keyframes gradientMove {
              0% {background-position:0% 50%;}
              50% {background-position:100% 50%;}
              100% {background-position:0% 50%;}
            }
            .progressbar-check {
              margin-top: 24px;
              width: 48px;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255,255,255,0.7);
              border-radius: 50%;
              box-shadow: 0 2px 8px #3f020b22;
              animation: popCheck 0.5s ease;
            }
            @keyframes popCheck {
              0% {transform: scale(0.5); opacity:0;}
              80% {transform: scale(1.1); opacity:1;}
              100% {transform: scale(1); opacity:1;}
            }
          `;
          document.head.appendChild(style);
        }
        // Animate progress bar for 5 seconds
        const progressBar = document.getElementById('signOutProgressBar');
        let progress = 0;
        const duration = 5000; // 5 seconds
        const interval = 50;
        const step = 100 / (duration / interval);
        const progressInterval = setInterval(() => {
          progress += step;
          if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';
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
              firebase.auth().signOut().then(() => {
                window.location.href = 'index.html';
              }).catch((error) => {
                console.error('Sign Out Error', error);
                if (loaderOverlay) loaderOverlay.remove();
                const signOutText = document.getElementById('signOutText');
                if (signOutText) signOutText.textContent = 'Sign Out';
              });
            }, 700); // show checkmark for 0.7s
          }
        }, interval);
        // Change button text to progress bar
        const signOutText = document.getElementById('signOutText');
        if (signOutText) {
          signOutText.innerHTML = '<span style="display:inline-block;vertical-align:middle;color:#3f020b;font-weight:600;">Signing Out...</span>';
        }
      });
    }
  } else {
    // User is signed out
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
