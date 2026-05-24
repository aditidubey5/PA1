// ============================================
// CORE ROUTER & UI (app.js)
// ============================================

let currentPage = "home";
let currentTest = null;
let userName = "";
let userEmail = "";
let lastReportResult = null;
let activeCategory = "all";

// 1. Core Router
function showPage(page, testId = null, shouldPush = true) {
  document.querySelectorAll(".page").forEach((p) => (p.style.display = "none"));
  const target = document.getElementById(page);
  if (target) target.style.display = "block";

  currentPage = page;
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (shouldPush) {
    const path =
      page === "test-landing" && testId
        ? `/${testId}`
        : page === "home"
          ? "/"
          : `/${page}`;
    window.history.pushState({ page, testId }, "", path);
  }

  // Trigger Page-Specific Renders
  if (page === "tests") renderTestGrid();
  if (page === "coaching") renderCoachingPage();
  if (page === "profile" && typeof renderProfilePage === "function")
    renderProfilePage();
}

function initRouter() {
  const path = window.location.pathname.replace(/\/$/, "").split("/").pop();
  const isTest = TESTS.find((t) => t.id === path);

  if (isTest) openTestLanding(path, false);
  else if (["tests", "coaching", "profile"].includes(path))
    showPage(path, null, false);
  else showPage("home", null, false);
}

// 2. Library & Grid
function filterTests(catId) {
  activeCategory = catId;
  renderTestGrid();
}

function renderTestGrid() {
  const grid = document.getElementById("test-grid-ui");
  if (!grid) return;

  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.classList.toggle(
      "active",
      pill.getAttribute("onclick").includes(`'${activeCategory}'`),
    );
  });

  const filteredTests =
    activeCategory === "all"
      ? TESTS
      : TESTS.filter((t) => t.category === activeCategory);

  grid.innerHTML = filteredTests
    .map(
      (t) => `
        <div class="card">
            <div style="font-size: 2rem; margin-bottom: 12px;">${t.icon}</div>
            <div style="font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--brand-indigo); margin-bottom: 8px;">${t.category}</div>
            <h3>${t.title}</h3>
            <p style="font-size:0.83rem; color:var(--text-muted); margin-bottom:18px; flex-grow:1;">${t.tagline}</p>
            <button class="btn-secondary" onclick="openTestLanding('${t.id}')">Know More</button>
            <button class="btn-primary btn-full" onclick="openTestLanding('${t.id}')">Start Analysis →</button>
        </div>
    `,
    )
    .join("");
}

function openTestLanding(testId, shouldPush = true) {
  const t = TESTS.find((x) => x.id === testId);
  if (!t) return showPage("tests", null, false);

  currentTest = t;
  showPage("test-landing", testId, shouldPush);

  document.getElementById("landing-content").innerHTML = `
        <div class="landing-card" style="background:white; padding:40px; border-radius:24px; box-shadow:var(--shadow-card); max-width:800px; margin:40px auto;">
            <button class="btn-secondary" style="margin-bottom:20px; width:auto;" onclick="showPage('tests')">← Back to Library</button>
            <div style="text-align:center; margin-bottom:30px; border-bottom:1px solid #eee; padding-bottom:20px;">
                <div style="font-size:4rem;">${t.icon}</div>
                <h1 class="text-gradient">${t.title}</h1>
                <p style="font-size:1.2rem; color:var(--brand-magenta); font-weight:700;">${t.tagline}</p>
            </div>
            <div style="text-align:center;">
                <p style="font-size:1.05rem; line-height:1.7; margin-bottom:20px;">${t.description}</p>
                <div style="background:#f8fafc; padding:20px; border-radius:12px; margin-bottom:20px; display:inline-block;">
                    <strong>${t.questions} Questions</strong> | <strong>${t.time}</strong>
                </div>
                <br>
                <button class="btn-primary" style="padding:15px 40px; font-size:1.1rem;" onclick="startTest('${t.id}')">Start Analysis →</button>
            </div>
        </div>
    `;
}

// 3. UI Helpers
function toggleMobileNav() {
  document.getElementById("mobile-drawer").classList.toggle("open");
}
function closeModal() {
  document.getElementById("method-modal").style.display = "none";
}
function handleModalBackdropClick(e) {
  if (e.target.id === "method-modal") closeModal();
}

// 4. Coaching Page
function renderCoachingPage() {
  document.getElementById("coaching").innerHTML = `
        <div class="container" style="max-width:600px; text-align:center;">
            <h1>Work With <span class="text-gradient">A Coach</span></h1>
            <div class="coaching-card" style="background:white; padding:40px; border-radius:20px; box-shadow:var(--shadow-card); text-align:left; margin-top:20px;">
                <form onsubmit="submitCoachingForm(event)">
                    <input class="main-input" type="text" id="coach-name" placeholder="Your full name" required>
                    <input class="main-input" type="email" id="coach-email" placeholder="your@email.com" required>
                    <textarea class="main-input" id="coach-goal" rows="4" placeholder="What do you want to work on?" required></textarea>
                    <button class="btn-primary btn-full" type="submit">Request Coaching</button>
                </form>
                <p id="form-status" style="text-align:center; display:none; margin-top:15px;"></p>
            </div>
        </div>
    `;
}

function submitCoachingForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button");
  const status = document.getElementById("form-status");
  btn.disabled = true;
  btn.textContent = "Sending...";

  emailjs
    .send("service_u11zlzf", "template_zpcklyu", {
      to_email: document.getElementById("coach-email").value,
      test_name: "Coaching Request",
      overall_label: `Inquiry from ${document.getElementById("coach-name").value}`,
      section_breakdown: document.getElementById("coach-goal").value,
    })
    .then(() => {
      status.style.display = "block";
      status.style.color = "green";
      status.textContent = "Request sent!";
      btn.textContent = "Sent";
    })
    .catch(() => {
      status.style.display = "block";
      status.style.color = "red";
      status.textContent = "Failed to send.";
      btn.disabled = false;
      btn.textContent = "Request Coaching";
    });
}

document.addEventListener("DOMContentLoaded", async () => {
  // Check if the user is signed in via Supabase
  const {
    data: { session },
  } = await _supabase.auth.getSession();

  // If they are NOT signed in, inject and show your styled pop-up
  if (!session) {
    const popup = document.createElement("div");
    popup.id = "cta-popup-nudge";

    // Uses your exact styling from the HTML template
    Object.assign(popup.style, {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      maxWidth: "320px",
      background: "white",
      borderRadius: "16px",
      padding: "20px",
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f1f5f9",
      zIndex: "9999",
      animation: "slideUpIn 0.4s ease-out",
    });

    // Uses your exact layout, including the close button and modal trigger
    popup.innerHTML = `
            <button onclick="this.parentElement.style.display='none'" style="position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 0.9rem; cursor: pointer; color: #94a3b8;">✕</button>
            <p style="margin: 0 0 12px 0; font-size: 0.95rem; font-weight: 600; color: #1e293b; line-height: 1.4;">
                Sign in and take a test to unlock your professional AI development summary!
            </p>
            <button class="btn-primary" style="padding: 8px 16px; font-size: 0.85rem; width: 100%;">
                Get Started
            </button>
        `;

    document.body.appendChild(popup);

    // Triggers your exact auth modal when clicked
    popup.querySelector(".btn-primary").onclick = function () {
      const authModal = document.getElementById("auth-modal");
      if (authModal) authModal.style.display = "flex";
      popup.style.display = "none";
    };
  }
});

// 5. Initialize
window.onpopstate = initRouter;
window.addEventListener("DOMContentLoaded", initRouter);

// Bind globals for HTML onclicks
window.showPage = showPage;
window.openTestLanding = openTestLanding;
window.filterTests = filterTests;
window.startTest = startTest; // From engine.js
