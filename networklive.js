let toastTimer;
let progressTimer;

function updateNetworkStatus() {
    const visualContainer = document.getElementById('networkVisual');
    const statusDot = document.getElementById('statusDot');
    
    if (navigator.onLine) {
        // 1. Visual Changes (Header)
        if(visualContainer) visualContainer.classList.remove('is-offline');
        if(statusDot) {
            statusDot.innerHTML = "● LIVE";
            statusDot.className = "text-[10px] text-green-400 font-bold animate-pulse";
        }
        // 2. Trigger Toast
        triggerToast('online');
    } else {
        // 1. Visual Changes (Header)
        if(visualContainer) visualContainer.classList.add('is-offline');
        if(statusDot) {
            statusDot.innerHTML = "● DISCONNECTED";
            statusDot.className = "text-[10px] text-red-500 font-bold";
        }
        // 2. Trigger Toast
        triggerToast('offline');
    }
}

function triggerToast(type) {
    const toast = document.getElementById('networkToast');
    const msg = document.getElementById('toastMessage');
    const progress = document.getElementById('toastProgress');
    const content = document.getElementById('toastContent');

    if (!toast) {
        console.error("Popup element 'networkToast' nahi mila!");
        return;
    }

    // Reset state
    clearTimeout(toastTimer);
    clearInterval(progressTimer);
    toast.classList.remove('toast-active');

    // Small delay to re-trigger animation
    setTimeout(() => {
        if (type === 'online') {
            toast.className = "toast-active"; // Basic class
            content.className = "flex items-center gap-3 px-5 py-4 rounded-2xl backdrop-blur-xl shadow-2xl toast-online";
            msg.innerText = "Connection Restored";
            console.log("Toast: Online Mode");
        } else {
            toast.className = "toast-active";
            content.className = "flex items-center gap-3 px-5 py-4 rounded-2xl backdrop-blur-xl shadow-2xl toast-offline";
            msg.innerText = "Connection Interrupted";
            console.log("Toast: Offline Mode");
        }

        // Progress Bar
        let width = 100;
        if(progress) {
            progress.style.width = '100%';
            progressTimer = setInterval(() => {
                width -= 2;
                progress.style.width = width + '%';
                if (width <= 0) clearInterval(progressTimer);
            }, 80); 
        }

        // Hide after 4s
        toastTimer = setTimeout(() => {
            toast.classList.remove('toast-active');
        }, 4000);
    }, 100);
}

// Network Listeners
window.addEventListener('online', () => {
    document.getElementById('networkVisual').classList.remove('is-offline');
    document.getElementById('statusDot').innerHTML = "● LIVE";
    document.getElementById('statusDot').className = "text-[10px] text-green-400 font-bold animate-pulse";
    triggerToast('online');
});

window.addEventListener('offline', () => {
    document.getElementById('networkVisual').classList.add('is-offline');
    document.getElementById('statusDot').innerHTML = "● DISCONNECTED";
    document.getElementById('statusDot').className = "text-[10px] text-red-500 font-bold";
    triggerToast('offline');
});

// Page load hone par check karein (Initial check without showing toast if already online)
window.addEventListener('load', () => {
    const visualContainer = document.getElementById('networkVisual');
    const statusDot = document.getElementById('statusDot');
    
    if (!navigator.onLine) {
        updateNetworkStatus(); // Sirf offline ho tabhi trigger karein
    } else {
        // Default online state setup without toast
        if(visualContainer) visualContainer.classList.remove('is-offline');
        if(statusDot) {
            statusDot.innerHTML = "● LIVE";
            statusDot.className = "text-[10px] text-green-400 font-bold animate-pulse";
        }
    }
});

// bar update function using Network Information API (if supported)
function updateNetworkBars() {
  const container = document.getElementById("networkVisual");

  // Reset classes
  container.classList.remove("signal-1","signal-2","signal-3","signal-4","is-offline");

  if (!navigator.onLine) {
    container.classList.add("is-offline");
    return;
  }

  // Approx strength using Network Information API
  let level = 4; // default strong

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (connection) {
    const downlink = connection.downlink;

    if (downlink < 1) level = 1;
    else if (downlink < 3) level = 2;
    else if (downlink < 5) level = 3;
    else level = 4;
  }

  container.classList.add("signal-" + level);
}

// Run on load
updateNetworkBars();

// Listen changes
window.addEventListener("online", updateNetworkBars);
window.addEventListener("offline", updateNetworkBars);

if (navigator.connection) {
  navigator.connection.addEventListener("change", updateNetworkBars);
}








