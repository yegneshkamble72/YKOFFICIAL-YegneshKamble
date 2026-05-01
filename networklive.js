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
            statusDot.className = "text-[9px] text-green-400 font-medium animate-pulse";
        }
        // 2. Trigger Toast
        triggerToast('online');
    } else {
        // 1. Visual Changes (Header)
        if(visualContainer) visualContainer.classList.add('is-offline');
        if(statusDot) {
            statusDot.innerHTML = "● DISCONNECTED";
            statusDot.className = "text-[9px] text-red-500 font-medium";
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
    document.getElementById('statusDot').className = "text-[9px] text-green-400 font-medium animate-pulse";
    triggerToast('online');
});

window.addEventListener('offline', () => {
    document.getElementById('networkVisual').classList.add('is-offline');
    document.getElementById('statusDot').innerHTML = "● DISCONNECTED";
    document.getElementById('statusDot').className = "text-[9px] text-red-500 font-medium";
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
            statusDot.className = "text-[9px] text-green-400 font-medium animate-pulse";
        }
    }
});









function openNetworkModal() {
    const modal = document.getElementById('networkModal');
    const content = document.getElementById('modalContent');
    
    // Update Modal Data before showing
    const statusText = navigator.onLine ? "CONNECTED" : "OFFLINE";
    const statusColor = navigator.onLine ? "#22c55e" : "#ef4444";
    const speed = navigator.connection ? navigator.connection.downlink + " Mbps" : "N/A";

    document.getElementById('modalStatus').innerText = statusText;
    document.getElementById('modalStatus').style.color = statusColor;
    document.getElementById('modalSpeed').innerText = speed;

    // Show Modal with Animation
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeNetworkModal() {
    const modal = document.getElementById('networkModal');
    const content = document.getElementById('modalContent');

    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}