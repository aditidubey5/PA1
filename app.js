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

  // GUARANTEED MENU CLOSE
  const drawer = document.getElementById("mobile-drawer");
  if (drawer) {
    drawer.classList.remove("open");
  }

  // Trigger Page-Specific Renders
  if (page === "tests") renderTestGrid();
  if (page === "coaching") renderCoachingPage();
  if (page === "profile" && typeof renderProfilePage === "function")
    renderProfilePage();
}

function initRouter() {
  // Handle ?page= query param (from blog.html links)
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get("page");
  if (pageParam) {
    window.history.replaceState(null, null, window.location.pathname);
    showPage(pageParam, null, false);
    return;
  }

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
      (t, index) => `
        <div class="card" style="animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: ${index * 0.08}s; opacity: 0;">
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

  const tooltip = document.getElementById("menu-tooltip");
  if (tooltip) {
    tooltip.style.display = "none";
  }
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

function downloadSectionAsPDF(elementId, filename) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const opt = {
    margin: 15,
    filename: filename + ".pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
}

async function shareSectionAsImage(elementId, filename) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const originalCursor = document.body.style.cursor;
  document.body.style.cursor = "wait";

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;
        const file = new File([blob], `${filename}.png`, { type: "image/png" });

        // Helper to force download
        const forceDownload = () => {
          const link = document.createElement("a");
          link.download = `${filename}.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
        };

        // Detect if user is on a mobile device
        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          );

        if (
          isMobile &&
          navigator.canShare &&
          navigator.canShare({ files: [file] })
        ) {
          // Mobile: Use Native Share Sheet
          try {
            await navigator.share({
              title: "People Assets Result",
              text: "Check out my behavioral insights profile!",
              files: [file],
            });
          } catch (e) {
            forceDownload(); // Fallback if they cancel or it fails
          }
        } else {
          // Desktop/Laptop: Copy to Clipboard + Download
          try {
            // Try to write the image directly to the clipboard
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
            alert(
              "✓ Image copied to clipboard!\n\nYou can now paste (CTRL+V) it directly into WhatsApp, LinkedIn, or Email. A backup file will also download.",
            );
            forceDownload();
          } catch (err) {
            // If clipboard fails (browser permissions), just download
            alert("Downloading your image so you can share it!");
            forceDownload();
          }
        }
      },
      "image/png",
      1.0,
    );
  } catch (error) {
    console.error("Error generating shareable image:", error);
  } finally {
    document.body.style.cursor = originalCursor;
  }
}

// Close mobile menu if the user taps anywhere outside of it
document.addEventListener("click", function (event) {
  const drawer = document.getElementById("mobile-drawer");
  const hamburger = document.getElementById("hamburger");

  // If the drawer is open, and they clicked outside both the drawer and the menu button
  if (drawer && drawer.classList.contains("open")) {
    if (
      !drawer.contains(event.target) &&
      hamburger &&
      !hamburger.contains(event.target)
    ) {
      drawer.classList.remove("open");
    }
  }
});

// 5. Executive White Share Card Engine
async function generateAndShareImage() {
  const shareBtn = document.getElementById("main-share-btn");
  if (!shareBtn) return;

  const originalText = shareBtn.innerHTML;
  shareBtn.textContent = "Generating Card...";
  shareBtn.disabled = true;

  const result = window.lastReportResult;

  // Use the test's actual title (e.g. "Growth Mindset Diagnostic"),
  // NOT result.label (e.g. "Fixed Mindset Tendencies") — the label goes
  // in the band pill below the score, not in the headline.
  const testTitle = window.currentTest?.title || "Assessment Profile";

  if (!result) {
    alert("No report found. Please complete an assessment first.");
    shareBtn.innerHTML = originalText;
    shareBtn.disabled = false;
    return;
  }

  // Score — clamped to 0-100, safe against NaN/undefined
  const rawScore = Number(result.overall ?? result.score ?? 0);
  const safeScore = Math.max(0, Math.min(100, isNaN(rawScore) ? 0 : rawScore));

  // Band label + colours — 3-tier scale
  // (does not assume which direction is "good" for a given test —
  //  that per-test inversion can be added later if needed)
  let bandBg, bandColor, gaugeColor;
  if (safeScore >= 67) {
    bandBg = "#ede9fe";
    bandColor = "#5b21b6";
    gaugeColor = "linear-gradient(135deg, #6366f1 0%, #d946ef 100%)";
  } else if (safeScore >= 34) {
    bandBg = "#fef3c7";
    bandColor = "#92400e";
    gaugeColor = "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)";
  } else {
    bandBg = "#fee2e2";
    bandColor = "#991b1b";
    gaugeColor = "linear-gradient(135deg, #f87171 0%, #fb923c 100%)";
  }

  // Populate the card DOM before capture
  document.getElementById("share-card-title").textContent = testTitle;

  // Name line: "Sarah's Result" if we have a first name, else blank
  const nameEl = document.getElementById("share-card-name");
  if (nameEl) {
    const name =
      typeof window.userName !== "undefined" && window.userName
        ? window.userName
        : "";
    nameEl.textContent = name ? `${name}'s Result` : "";
  }

  document.getElementById("share-card-score").textContent = safeScore;

  const gaugeEl = document.getElementById("share-card-gauge-fill");
  if (gaugeEl) {
    gaugeEl.style.width = safeScore + "%";
    gaugeEl.style.background = gaugeColor;
  }

  const bandEl = document.getElementById("share-card-band");
  if (bandEl) {
    // Band pill shows the qualitative label (e.g. "Fixed Mindset Tendencies")
    bandEl.textContent = result.label || result.overallLabel || "";
    bandEl.style.background = bandBg;
    bandEl.style.color = bandColor;
  }

  const summaryText =
    result.description ||
    result.overallDescription ||
    "Explore your custom behavioral profile dynamics.";
  document.getElementById("share-card-summary").textContent =
    summaryText.trim();

  const cardElement = document.getElementById("share-card-container");

  try {
    const canvas = await html2canvas(cardElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      allowTaint: true,
    });

    canvas.toBlob(
      async (blob) => {
        try {
          if (!blob) {
            throw new Error("Canvas produced no image data.");
          }

          const file = new File([blob], "people-assets-profile.png", {
            type: "image/png",
          });

          // Mobile: native share sheet (WhatsApp, Instagram, etc.)
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: `My ${testTitle} Profile`,
                text: `I just assessed my ${testTitle} on People Assets. Take a look!`,
              });
            } catch (shareError) {
              // User cancelled the share sheet — no alert needed
              console.log("Share sheet closed.", shareError?.message);
            }
          } else {
            // Desktop: download the image file
            const link = document.createElement("a");
            link.download = `${testTitle.replace(/\s+/g, "-").toLowerCase()}-profile.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
            alert(
              "Your share card has been saved to your downloads folder.\n\nYou can now attach it to a LinkedIn post, WhatsApp message, or email.",
            );
          }
        } catch (blobError) {
          console.error("Share card generation failed:", blobError);
          alert(
            "Could not generate the share card on this device. Try taking a screenshot instead.",
          );
        } finally {
          // Always reset the button — even if share/download failed
          shareBtn.innerHTML = originalText;
          shareBtn.disabled = false;
        }
      },
      "image/png",
      0.95,
    );
  } catch (error) {
    console.error("html2canvas failed:", error);
    alert("Could not render the share card. Try taking a screenshot instead.");
    shareBtn.innerHTML = originalText;
    shareBtn.disabled = false;
  }
}

// ============================================
// UI EXPERIENCES: TOOLTIP TEMPORARY LIFE-CYCLE
// ============================================
window.addEventListener("DOMContentLoaded", () => {
  // Sets a 4-second delay before hiding the landing tooltip nudge element
  setTimeout(() => {
    const tooltip = document.getElementById("menu-tooltip");
    if (tooltip) {
      tooltip.style.transition =
        "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s ease";
      tooltip.style.opacity = "0";
      tooltip.style.transform = "translateY(-8px)";

      // Completely wipes the layout footprint from interaction trees after transition wraps up
      setTimeout(() => {
        tooltip.style.display = "none";
      }, 600);
    }
  }, 4000);
});

// Ensure the buttons in your HTML can "see" these functions
window.downloadSectionAsPDF = downloadSectionAsPDF;
window.shareSectionAsImage = shareSectionAsImage;
window.generateAndShareImage = generateAndShareImage;

// 6. Initialize
window.onpopstate = initRouter;
window.addEventListener("DOMContentLoaded", initRouter);

// Bind globals for HTML onclicks
window.showPage = showPage;
window.openTestLanding = openTestLanding;
window.filterTests = filterTests;
window.startTest = startTest; // From engine.js
