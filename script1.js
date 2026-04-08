// WELCOME POPUP

const popup = document.getElementById("welcomePopup");
const card = document.getElementById("popupCard");

// SHOW ON LOAD (if not disabled)
window.addEventListener("load", () => {
  if (localStorage.getItem("yk_popup_closed")) return;

  setTimeout(() => {
    popup.classList.remove("opacity-0", "pointer-events-none");
    card.classList.remove("scale-95");
    card.classList.add("scale-100");
  }, 400);
});

// AUTO CLOSE AFTER 10s
setTimeout(() => {
  closePopup();
}, 10000);

// CLOSE FUNCTION
function closePopup() {
  popup.classList.add("opacity-0", "pointer-events-none");
  card.classList.add("scale-95");

  // SAVE PREF
  if (document.getElementById("dontShow").checked) {
    localStorage.setItem("yk_popup_closed", "true");
  }
}

// START BUTTON
function startNow() {
  closePopup();
  // optional redirect:
  // window.location.href = "#home";
}

//   MOBILE DROPDOWN
function toggleMobileDropdown() {
  const menu = document.getElementById("mobileDropdown");
  const arrow = document.getElementById("arrowIcon");

  if (menu.classList.contains("max-h-0")) {
    menu.classList.remove("max-h-0");
    menu.classList.add("max-h-40");
    arrow.classList.add("rotate-180");
  } else {
    menu.classList.add("max-h-0");
    menu.classList.remove("max-h-40");
    arrow.classList.remove("rotate-180");
  }
}

// QR CODE PANEL
const qrPanel = document.getElementById("qrPanel");
const qrIcon = document.getElementById("qrIcon");
const qrArrow = document.getElementById("qrArrow");
let isVisible = false;

function showQR() {
  qrPanel.classList.add("qr-open");
  qrIcon.classList.add("rotate-180");
  qrArrow.style.opacity = "0";
  isVisible = true;
}

function hideQR() {
  qrPanel.classList.remove("qr-open");
  qrIcon.classList.remove("rotate-180");
  qrArrow.style.opacity = "1";
  isVisible = false;
}

function toggleQR() {
  isVisible ? hideQR() : showQR();
}

// --- LOGIC: Page Load pe open, then 1 min baad repeat ---

// 1. Initial Launch (Page load ke 2 sec baad)
// 60,000ms = 1 Minute gap

//    setTimeout(() => {
//     showQR();
//     // 8 second tak dikhao, phir band kardo
//     setTimeout(hideQR, 8000);
//   }, 2000);

//   // 2. Continuous Loop (Every 1 Minute)
//   setInterval(() => {
//     showQR();
//     setTimeout(hideQR, 10000); // Har baar 10 sec ke liye show hoga
//   }, 60000);

// scroll to top function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Create Lucide icons
lucide.createIcons();

// FAQ LOGIC
const faqData = {
  q1: {
    title: "What is the purpose of the YK OFFICIAL website?",
    answer:
      "YK OFFICIAL is a professional portfolio platform created to showcase projects, digital solutions, and creative work in a modern and organized way.",
  },

  q2: {
    title: "What kind of projects are displayed on YK OFFICIAL?",
    answer:
      "The website highlights web development projects, UI design work, and innovative digital solutions designed to deliver modern user experiences.",
  },

  q3: {
    title: "Can businesses collaborate with YK OFFICIAL?",
    answer:
      "Yes. Businesses and individuals can collaborate by contacting through the website to discuss projects, services, or digital solutions.",
  },

  q4: {
    title: "How can visitors send inquiries or messages?",
    answer:
      "Visitors can easily send inquiries through the contact form available on the website. Messages are securely stored and reviewed promptly.",
  },

  q5: {
    title: "Is the YK OFFICIAL website regularly updated with new work?",
    answer:
      "Yes. The platform is designed to allow regular updates so new projects, services, and improvements can be added anytime.",
  },

  q6: {
    title: "Does the website ensure a smooth experience across devices?",
    answer:
      "Absolutely. YK OFFICIAL is fully optimized for mobile phones, tablets, and desktop devices.",
  },
};

function openFAQ(id) {
  document.getElementById("faqPopup").classList.remove("hidden");
  document.getElementById("faqPopup").classList.add("flex");

  document.getElementById("popupLoader").style.display = "flex";
  document.getElementById("faqTitle").style.display = "none";
  document.getElementById("faqAnswer").style.display = "none";

  setTimeout(() => {
    document.getElementById("popupLoader").style.display = "none";

    document.getElementById("faqTitle").style.display = "block";
    document.getElementById("faqAnswer").style.display = "block";

    document.getElementById("faqTitle").innerText = faqData[id].title;
    document.getElementById("faqAnswer").innerText = faqData[id].answer;
  }, 700);
}

function closeFAQ() {
  document.getElementById("faqPopup").classList.add("hidden");
}

// NOTIFICATIONS LOGIC
const API_URL =
  "https://script.google.com/macros/s/AKfycbyUXELsEUDhfZHs4yVXNuKPfoEGmniwLeKy-HcHvJz-yYFp2Wm-H1wyeoRlB6m1sldL5w/exec";

function toggleNotify() {
  let box = document.getElementById("notifyBox");

  box.classList.toggle("hidden");

  if (!box.classList.contains("hidden")) {
    showLoader();

    setTimeout(loadNotifications, 500);
  }
}

function showLoader() {
  document.getElementById("notifyLoader").classList.remove("hidden");

  document.getElementById("notifyList").innerHTML = "";
}

function loadNotifications() {
  let list = document.getElementById("notifyList");

  let loader = document.getElementById("notifyLoader");

  fetch(API_URL)
    .then((res) => res.json())

    .then((data) => {
      loader.classList.add("hidden");

      list.innerHTML = "";

      if (data.length == 0) {
        list.innerHTML =
          "<p class='text-gray-500 text-sm'>No notifications</p>";

        return;
      }

      data.reverse().forEach(function (n) {
        let div = document.createElement("div");

        div.className = "bg-white p-3 rounded-lg shadow";

        div.innerHTML = `

              <h3 class="font-semibold text-sm">${n.title}</h3>
              
              <p class="text-xs text-gray-600">${n.message}</p>
              
              <span class="text-[10px] text-gray-400">${n.date}</span>
              
              `;

        list.appendChild(div);
      });
    })

    .catch((err) => {
      loader.classList.add("hidden");

      list.innerHTML =
        "<p class='text-red-500 text-sm'>Error loading notifications</p>";
    });
}

// Notification Toggle Function
function toggleNotify() {
  let box = document.getElementById("notifyBox");

  if (box.classList.contains("hidden")) {
    box.classList.remove("hidden");
    showLoader();
    loadNotifications();
  } else {
    box.classList.add("hidden");
  }
}

// DRAGGABLE NOTIFICATION BOX
const box = document.getElementById("notifyBox");
const header = document.getElementById("notifyHeader");

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

// Mouse Drag

header.addEventListener("mousedown", (e) => {
  isDragging = true;

  offsetX = e.clientX - box.offsetLeft;
  offsetY = e.clientY - box.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  box.style.left = e.clientX - offsetX + "px";
  box.style.top = e.clientY - offsetY + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Touch Drag (Mobile)

header.addEventListener("touchstart", (e) => {
  let touch = e.touches[0];

  isDragging = true;

  offsetX = touch.clientX - box.offsetLeft;
  offsetY = touch.clientY - box.offsetTop;
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  let touch = e.touches[0];

  box.style.left = touch.clientX - offsetX + "px";
  box.style.top = touch.clientY - offsetY + "px";
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

// SUPPORT CHAT BOT LOGIC

(function () {
  emailjs.init("MjC-JZctQdQadbLo4");
})();

let formSubmitted = false;

function toggleChat() {
  let box = document.getElementById("chatBox");

  box.classList.toggle("hidden");

  if (!box.classList.contains("hidden")) {
    if (!formSubmitted) {
      addBotMessage(
        "👋 Welcome to YK Official Support. Please fill the form below.",
      );
    }
  }
}

function addBotMessage(text) {
  let div = document.createElement("div");

  div.className = "bg-white p-3 rounded-xl shadow text-sm";

  div.innerText = text;

  document.getElementById("messages").appendChild(div);

  scrollBottom();
}

function addUserMessage(text) {
  let div = document.createElement("div");

  div.className = "bg-green-50 p-3 rounded-xl shadow text-sm ml-auto";

  div.innerHTML = text;

  document.getElementById("messages").appendChild(div);

  scrollBottom();
}

function addFormButton() {
  let div = document.createElement("div");

  div.innerHTML = `
         <button
         onclick="openForm()"
         class="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700 transition">
         Fill Form Again
         </button>
         `;

  document.getElementById("messages").appendChild(div);

  scrollBottom();
}

function openForm() {
  document.getElementById("chatForm").style.display = "block";
}

function generateID() {
  return "YK-" + Math.floor(Math.random() * 1000000);
}

function sendMail() {
  let name = document.getElementById("name").value.trim();

  let email = document.getElementById("email").value.trim();

  let phone = document.getElementById("phone").value.trim();

  let message = document.getElementById("message").value.trim();

  if (!name || !email || !phone || !message) {
    addBotMessage("⚠️ Please fill all fields.");

    return;
  }

  addUserMessage(
    "<b>Name:</b> " +
      name.toUpperCase() +
      "<br><b>Message:</b> " +
      message.toUpperCase(),
  );

  let userID = generateID();

  let templateParams = {
    name: name,

    email: email,

    phone: phone,

    message: message,

    user_id: userID,
  };

  emailjs
    .send("service_zyg352n", "template_s2su8xr", templateParams)

    .then(function () {
      addBotMessage("✅ Successfully Sent!\nYour Request ID: " + userID);

      document.getElementById("chatForm").style.display = "none";

      formSubmitted = true;

      addBotMessage("If you want to submit another request:");

      addFormButton();

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
    })

    .catch(function () {
      addBotMessage("❌ Mail Failed. Please check EmailJS settings.");
    });
}

function scrollBottom() {
  let box = document.getElementById("messages");

  box.scrollTop = box.scrollHeight;
}

//   VIDEO PLAYER LOGIC

const video = document.getElementById("video");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const speedBtn = document.getElementById("speedBtn");
const fullBtn = document.getElementById("fullBtn");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");
const time = document.getElementById("time");

let speeds = [1, 1.5, 2];
let speedIndex = 0;

// PLAY PAUSE

playBtn.onclick = () => {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = "⏸";
  } else {
    video.pause();
    playBtn.innerHTML = "▶";
  }
};

// MUTE

muteBtn.onclick = () => {
  video.muted = !video.muted;
  muteBtn.innerHTML = video.muted ? "🔇" : "🔊";
};

// SPEED

speedBtn.onclick = () => {
  speedIndex = (speedIndex + 1) % speeds.length;
  video.playbackRate = speeds[speedIndex];
  speedBtn.innerText = speeds[speedIndex] + "x";
};

// FULLSCREEN

fullBtn.onclick = () => {
  video.requestFullscreen();
};

// PROGRESS UPDATE

video.ontimeupdate = () => {
  let percent = (video.currentTime / video.duration) * 100;
  progressFill.style.width = percent + "%";

  let current = format(video.currentTime);
  let total = format(video.duration);

  time.innerText = current + " / " + total;
};

// SEEK

progress.onclick = (e) => {
  let rect = progress.getBoundingClientRect();

  let pos = (e.clientX - rect.left) / rect.width;

  video.currentTime = pos * video.duration;
};

// FORMAT TIME

function format(sec) {
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60);

  if (s < 10) s = "0" + s;

  return m + ":" + s;
}

//  LOADER LOGIC
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("yk-loader");

    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.6s ease";

    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }, 2500);
});

//   MAIN WEBSITE LOGIC (e.g. theme toggle, mobile menu, etc.) can be added here

// Date and time update
function updateDateTime() {
  const now = new Date();

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = now.toLocaleDateString("en-US", options);
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("currentDateTime").textContent = `${date} | ${time}`;
}

// Update every second
setInterval(updateDateTime, 1000);

// Run once immediately
updateDateTime();

// Skills data dynamicaly rendering with animation
const skills = [
  { name: "HTML/CSS", level: 85, color: "bg-indigo-500" },
  { name: "JavaScript", level: 90, color: "bg-indigo-500" },
  { name: "Talwind", level: 75, color: "bg-indigo-500" },
  { name: "AWS", level: 80, color: "bg-indigo-500" },
  { name: "Python", level: 75, color: "bg-indigo-500" },
  { name: "C/C++", level: 70, color: "bg-indigo-500" },
  { name: "VN Video Editor", level: 85, color: "bg-indigo-500" },
];

function renderSkills() {
  const container = document.getElementById("skillsContainer");
  container.innerHTML = skills
    .map(
      (skill) => `
        <div class="bg-red-500 z-10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-xl font-bold text-gray-800">${skill.name}</h3>
            <span class="text-purple-600 font-bold">${skill.level}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div class="skill-bar ${skill.color} h-full rounded-full" style="width: 0%" data-width="${skill.level}%"></div>
          </div>
        </div>
      `,
    )
    .join("");

  setTimeout(() => {
    document.querySelectorAll(".skill-bar").forEach((bar) => {
      bar.style.width = bar.dataset.width;
    });
  }, 100);
}

// ===== PROJECT DATA =====
const projects = [
  {
    title: "FeastHive Restaurant",
    description:
      "Modern restaurant website with online ordering and reservation system",
    image: "https://i.ibb.co/cc8Yd1kc/reshome.png",
    demo_link: " https://yegneshkamble72.github.io/FeastHiveRestaurant/",
  },
  {
    title: "Netflix Home Clone",
    description: "Pixel-perfect Netflix homepage replica with dynamic content",
    image: "https://i.ibb.co/fYWPQ9QY/nethome.png",
    demo_link: "https://yegneshkamble72.github.io/Netflix/",
  },
  {
    title: "Weather App",
    description: "Real-time weather application with location-based forecasts",
    image: "https://i.ibb.co/rRXgLbD4/wether.png",
    demo_link: "https://yegneshkamble72.github.io/Weather/",
  },
  {
    title: "Portfolio Builder AI",
    description:
      "AI-powered website builder for creating professional portfolios",
    image: "https://i.ibb.co/mW0M5sB/porthome.png",
    demo_link: "https://go.screenpal.com/watch/cTXQ1YnFgoW",
  },
  {
    title: "Auction Platform",
    description: "Real-time bidding platform with secure payment integration",
    image:
      "https://i.ibb.co/8kJyB0h/Chat-GPT-Image-Mar-14-2026-09-27-25-AM.png",
    demo_link: "https://yegneshkamble72.github.io/autionplatform/",
  },
  {
    title: "Fake News Detector",
    description: "ML-powered tool to identify and classify fake news articles",
    image: "https://i.ibb.co/GfJBfnsz/Screenshot-2026-03-27-220640.png",
    demo_link: "https://yegneshkamble72.github.io/fake-news-detect/",
  },
  {
    title: "Priyanshu bentex jewellery",
    description:
      "Priyanshu bentex jewellery has been creating exquisite handcrafted jewellery for over a decade. ",
    image: "https://i.ibb.co/1GWW563v/pkbetjwhome.png",
    demo_link: "https://yegneshkamble72.github.io/Priyanshu-bentex-jewellery/",
  },
  {
    title: "Smart Grocery List App",
    description:
      "Start building your grocery list with this smart app that categorizes items and suggests recipes.",
    image: "https://i.ibb.co/Z6tRtzj3/gloseryhome.png",
    demo_link: "https://yegneshkamble72.github.io/kirana-list-maker/",
  },
  {
    title: "Gopshila Enterprises",
    description:
      "GOPSHILA ENTERPRISES is a trusted company led by Owner Priyanshu Kamble, providing reliable and quality business services.",
    image: "https://i.ibb.co/21DcJJRK/Screenshot-2026-02-17-200811.png",
    demo_link: "https://gopshilaenterprises.github.io/Gopshila-Enterprises/",
  },

  {
    title: "Iron Forge Gym",
    description:
      "Where steel meets will. Transform your body, ignite your spirit, and forge your legacy.",
    image:
      "https://i.ibb.co/p6qks9kF/Chat-GPT-Image-Mar-18-2026-11-39-13-PM.png",
    demo_link: "https://yegneshkamble72.github.io/IRON-FORGE-GYM/",
  },
  {
    title: "UPI QR Generator",
    description:
      "Secure and smart UPI QR generator for fast, seamless digital payments.",
    image: "https://i.ibb.co/xKw2S1mk/Screenshot-2026-03-28-130859.png",
    demo_link: "https://yegneshkamble72.github.io/upiqrgenerator/",
  },
];

// ===== RENDER PROJECTS =====
function renderProjects() {
  const container = document.getElementById("projectsContainer");
  container.innerHTML = projects
    .map(
      (p, index) => `
    <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div class="h-48 overflow-hidden">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transform hover:scale-105 transition duration-300" />
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-2">${p.title}</h3>
        <p class="text-gray-600 mb-4 text-sm line-clamp-2">${p.description}</p>
        
        <div class="flex flex-col gap-3 mt-6">
  <button onclick="openProjectModal(${index})" 
          class="group relative w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 px-4 py-3 rounded-xl border border-slate-200 hover:bg-white hover:border-purple-400 hover:text-purple-600 hover:shadow-md transition-all duration-300">
    <i class="fa-solid fa-arrow-up-right-from-square text-xs group-hover:scale-110 transition-transform"></i>
    <span class="text-sm font-bold tracking-tight">Live Preview</span>
  </button>

  <button onclick="openPaymentModal('${p.title}', ${p.price})" 
          class="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_15px_25px_-5px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]"></div>
    
    <i class="fa-solid fa-bag-shopping text-sm"></i>
    <span class="tracking-wide">Purchase License</span>
  </button>
</div>
      </div>
    </div>`,
    )
    .join("");
}

// ===== PROJECT MODAL LOGIC =====
function openProjectModal(index) {
  const project = projects[index];
  document.getElementById("projectModalTitle").innerText = project.title;
  document.getElementById("projectIframe").src = project.demo_link;
  document.getElementById("projectModal").style.display = "flex";
}

function closeProjectModal() {
  document.getElementById("projectIframe").src = "";
  document.getElementById("projectModal").style.display = "none";
}

// ===== PAYMENT MODAL LOGIC (New) =====
function openPaymentModal(projectName) {
  document.getElementById("buyingProjectName").innerText =
    "Item: " + projectName;
  document.getElementById("paymentIframe").src = "payment.html"; // Aapki payment file
  document.getElementById("paymentModal").style.display = "flex";
}

function closePaymentModal() {
  document.getElementById("paymentIframe").src = "";
  document.getElementById("paymentModal").style.display = "none";
}

// Initialize
renderProjects();

// ===== MODAL FUNCTIONS =====
function openProjectModal(index) {
  const project = projects[index];
  document.getElementById("projectModalTitle").textContent = project.title;
  document.getElementById("projectIframe").src = project.demo_link;
  document.getElementById("projectModal").classList.add("active");
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  const iframe = document.getElementById("projectIframe");

  iframe.src = ""; // Stop iframe loading when closed
  modal.classList.remove("active");
}

// ===== DROPDOWN RENDER =====
function renderProjectDropdown() {
  const desktopList = document.getElementById("projectDropdownList");
  const mobileList = document.getElementById("mobileProjectList");

  const items = projects
    .map(
      (p, i) => `
    <button onclick="openProjectModal(${i})"
      class="w-full text-left px-4 py-3 hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition">
      ${p.title}
    </button>
  `,
    )
    .join("");

  desktopList.innerHTML = items;
  mobileList.innerHTML = items;
}

renderProjectDropdown();

// ===== MOBILE TOGGLE =====
function toggleMobileProjects() {
  const el = document.getElementById("mobileProjectList");
  el.classList.toggle("hidden");
}

function openResumeModal() {
  document.getElementById("resumeModal").classList.add("active");
}

function closeResumeModal() {
  document.getElementById("resumeModal").classList.remove("active");
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("mobileMenuOverlay");
  const hamburger = document.getElementById("mobileMenuBtn");

  menu.classList.toggle("active");
  overlay.classList.toggle("active");
  hamburger.classList.toggle("active");
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("mobileMenuOverlay");
  const hamburger = document.getElementById("mobileMenuBtn");

  menu.classList.remove("active");
  overlay.classList.remove("active");
  hamburger.classList.remove("active");
}

document
  .getElementById("mobileMenuBtn")
  .addEventListener("click", toggleMobileMenu);
document
  .getElementById("mobileMenuOverlay")
  .addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

// Form submission

// EmailJS Init
(function () {
  emailjs.init("MjC-JZctQdQadbLo4");
})();

// Unique 6 Digit ID Generator
function generateID() {
  const number = Math.floor(100000 + Math.random() * 900000);
  return "YK" + number;
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userName = document.getElementById("name").value.trim();
  const userEmail = document.getElementById("email").value.trim();
  const userMessage = document.getElementById("message").value.trim();

  const uniqueID = generateID();

  // Hidden input me ID set
  document.getElementById("request_id").value = uniqueID;

  // EmailJS Send
  emailjs.sendForm("service_vdvjq06", "template_8zo34mz", this).then(
    function () {
      // Google Sheet Send
      fetch(
        "https://script.google.com/macros/s/AKfycby8zdl1bJX3nnCG8WGu6bD95ojgPr2mj2rLnx3fSMB8ruGVgNAH7h82rbvEC--wtOWJ5Q/exec",
        {
          method: "POST",
          body: JSON.stringify({
            id: uniqueID,
            name: userName,
            email: userEmail,
            message: userMessage,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      showPopup(userName, uniqueID);
      document.getElementById("contactForm").reset();
    },
    function (error) {
      showPopup("Error", "Something went wrong!");
      console.log("EmailJS Error:", error);
    },
  );
});

// Popup Function
function showPopup(name, id) {
  const popup = document.createElement("div");

  popup.innerHTML = `
         <div style="
         position:fixed;
         top:0;
         left:0;
         width:100%;
         height:100%;
         background:rgba(0,0,0,0.6);
         display:flex;
         justify-content:center;
         align-items:center;
         z-index:9999;">
         
         <div style="
         background:#fff;
         padding:30px;
         border-radius:15px;
         text-align:center;
         width:90%;
         max-width:420px;
         box-shadow:0 10px 30px rgba(0,0,0,0.2);">
         
         <h2 style="margin-bottom:10px;color:#6d28d9;">
         Thank You, ${name}!
         </h2>
       
         <p style="color:#333;margin-bottom:10px;">
         Your message has been sent successfully.
         </p>
       
         <p style="font-weight:bold;margin-bottom:20px;">
         Request ID : ${id}
         </p>
       
         <button onclick="this.closest('.popup-container').remove()" 
         style="
         background:#6d28d9;
         color:white;
         padding:10px 25px;
         border:none;
         border-radius:6px;
         cursor:pointer;">
         Close
         </button>
       
         </div>
         </div>
         `;

  popup.classList.add("popup-container");
  document.body.appendChild(popup);
}
// Language change
let currentLang = "en";

function changeLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Update navigation
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks[0].textContent = t.home;
  navLinks[1].textContent = t.about;
  navLinks[2].textContent = t.skills;
  navLinks[3].textContent = t.projects;
  navLinks[4].textContent = t.contact;

  // Update mobile menu
  const mobileLinks = document.querySelectorAll("#mobileMenu a");
  mobileLinks[0].textContent = t.home;
  mobileLinks[1].textContent = t.about;
  mobileLinks[2].textContent = t.skills;
  mobileLinks[3].textContent = t.projects;
  mobileLinks[4].textContent = t.contact;

  // Update hero section buttons
  document.querySelector(
    "button[onclick=\"scrollToSection('projects')\"]",
  ).textContent = t.viewProjects;
  document.querySelector('button[onclick="openResumeModal()"]').textContent =
    t.downloadResume;

  // Update section titles
  document.querySelectorAll("section h2 span")[0].textContent = t.aboutMe;
  document.querySelectorAll("section h2 span")[1].textContent = t.mySkills;
  document.querySelectorAll("section h2 span")[2].textContent = t.myProjects;
  document.querySelectorAll("section h2 span")[3].textContent = t.getInTouch;

  // Update contact section
  document.querySelector("#contact h3").textContent = t.contactInfo;
  document.querySelectorAll("#contact h3")[1].textContent = t.followMe;
  document.querySelector('#contactForm button[type="submit"]').textContent =
    t.sendMessage;

  // Update footer
  document.querySelectorAll("footer h3")[0].textContent = t.quickLinks;
  document.querySelectorAll("footer h3")[1].textContent = t.more;
  document.querySelectorAll("footer h3")[2].textContent = t.connect;
  document.querySelector('button[onclick="scrollToTop()"]').textContent =
    t.backToTop;

  showToast(
    `Language changed to ${
      lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "मराठी"
    }`,
  );
}

document.getElementById("languageSelect").addEventListener("change", (e) => {
  changeLanguage(e.target.value);
});

// Element SDK implementation
async function onConfigChange(newConfig) {
  config = { ...config, ...newConfig };

  document.getElementById("navName").textContent =
    config.full_name || defaultConfig.full_name;
  document.getElementById("heroName").textContent =
    config.full_name || defaultConfig.full_name;
  document.getElementById("heroDesignation").textContent =
    config.designation || defaultConfig.designation;
  document.getElementById("aboutTitle").textContent =
    config.about_title || defaultConfig.about_title;
  document.getElementById("aboutDescription").textContent =
    config.about_description || defaultConfig.about_description;
  document.getElementById("contactEmail").textContent =
    config.contact_email || defaultConfig.contact_email;
  document.getElementById("contactPhone").textContent =
    config.contact_phone || defaultConfig.contact_phone;
  document.getElementById("footerText").textContent =
    config.footer_text || defaultConfig.footer_text;
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities: (config) => ({
      recolorables: [],
      borderables: [],
      fontEditable: undefined,
      fontSizeable: undefined,
    }),
    mapToEditPanelValues: (config) =>
      new Map([
        ["full_name", config.full_name || defaultConfig.full_name],
        ["designation", config.designation || defaultConfig.designation],
        ["about_title", config.about_title || defaultConfig.about_title],
        [
          "about_description",
          config.about_description || defaultConfig.about_description,
        ],
        ["contact_email", config.contact_email || defaultConfig.contact_email],
        ["contact_phone", config.contact_phone || defaultConfig.contact_phone],
        ["footer_text", config.footer_text || defaultConfig.footer_text],
      ]),
  });
}

// Initialize
generateCaptcha();
updateDateTime();
setInterval(updateDateTime, 60000);
renderSkills();
renderProjects();

// Captcha input enter key
document.getElementById("captchaInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    verifyCaptcha();
  }
});

//    CLOUDFLARE BOT PROTECTION
(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'99aac093828f8ef4',t:'MTc2MjQ5NjcxNS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();

//   Cookies Consent Logic

const cookieBox = document.getElementById("cookieBox");
const settingsBox = document.getElementById("cookieSettings");
const settingsContent = document.getElementById("settingsContent");

window.onload = () => {
  if (!localStorage.getItem("yk_cookie_consent")) {
    setTimeout(() => {
      cookieBox.classList.remove("hidden");
      // Trigger animation after removing hidden
      requestAnimationFrame(() => {
        cookieBox.classList.remove("opacity-0", "translate-y-10");
      });
    }, 1000);
  }
};

function hideBanner() {
  cookieBox.classList.add("opacity-0", "translate-y-10");
  setTimeout(() => cookieBox.classList.add("hidden"), 500);
}

function acceptCookies() {
  localStorage.setItem("yk_cookie_consent", "all");
  hideBanner();
}

function rejectCookies() {
  localStorage.setItem("yk_cookie_consent", "rejected");
  hideBanner();
}

function openSettings() {
  settingsBox.classList.remove("hidden");
  setTimeout(() => {
    settingsContent.classList.remove("scale-95", "opacity-0");
  }, 10);
}

function closeSettings() {
  settingsContent.classList.add("scale-95", "opacity-0");
  setTimeout(() => settingsBox.classList.add("hidden"), 300);
}

function savePreferences() {
  const prefs = {
    analytics: document.getElementById("analytics").checked,
    marketing: document.getElementById("marketing").checked,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem("yk_cookie_consent", JSON.stringify(prefs));
  closeSettings();
  hideBanner();
}

function closeCookies() {
  hideBanner();
}
