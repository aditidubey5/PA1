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

  document.body.style.cursor = "wait";

  setTimeout(() => {
    const isMobile = window.innerWidth <= 768;
    const opt = {
      margin: 15,
      filename: filename + ".pdf",
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: { scale: isMobile ? 1 : 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    if (isMobile) {
      // Bypasses embedded app limitations by packaging the RAM data into an actual file stream
      html2pdf()
        .set(opt)
        .from(element)
        .output("blob")
        .then((pdfBlob) => {
          const file = new File([pdfBlob], filename + ".pdf", {
            type: "application/pdf",
          });

          // Triggers the universal iOS file sheet directly from the button click
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator
              .share({
                files: [file],
                title: "Your Assessment Report",
                text: "Here is your behavioral blueprint from People Assets.",
              })
              .then(() => {
                document.body.style.cursor = "default";
              })
              .catch(() => {
                document.body.style.cursor = "default";
              });
          } else {
            // Fallback if system level sharing fails
            html2pdf()
              .set(opt)
              .from(element)
              .save()
              .then(() => {
                document.body.style.cursor = "default";
              });
          }
        });
    } else {
      // Standard stable Desktop download mechanism
      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          document.body.style.cursor = "default";
        });
    }
  }, 50);
}

function showFallbackImageModal(dataUrl) {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.95);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;";

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "✕ Close";
  closeBtn.style.cssText =
    "position:absolute;top:20px;right:20px;background:#f1f5f9;color:#0f172a;border:none;padding:10px 20px;border-radius:20px;font-weight:800;cursor:pointer;font-family:inherit;";
  closeBtn.onclick = () => document.body.removeChild(overlay);

  const instruction = document.createElement("div");
  instruction.innerHTML =
    '<span style="font-size:1.8rem;display:block;margin-bottom:8px;">👆</span><strong>Tap and hold</strong> the image below to Share (AirDrop, WhatsApp, etc.) or Save to Photos.';
  instruction.style.cssText =
    "color:white;text-align:center;font-size:1.05rem;margin-bottom:24px;max-width:320px;line-height:1.5;font-family:inherit;";

  const img = document.createElement("img");
  img.src = dataUrl;
  img.style.cssText =
    "max-width:100%;max-height:65vh;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.5);";

  overlay.appendChild(closeBtn);
  overlay.appendChild(instruction);
  overlay.appendChild(img);
  document.body.appendChild(overlay);
}

async function shareSectionAsImage(elementId, filename) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const originalCursor = document.body.style.cursor;
  document.body.style.cursor = "wait";

  // Yield thread for UI update
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    var isMobile = window.innerWidth <= 768;
    const canvas = await html2canvas(element, {
      scale: isMobile ? 1.5 : 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      allowTaint: true,
    });

    const dataUrl = canvas.toDataURL("image/png");

    canvas.toBlob(
      async (blob) => {
        if (!blob) throw new Error("Canvas empty");
        const file = new File([blob], `${filename}.png`, { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: "My AI Profile Summary",
              files: [file],
            });
          } catch (e) {
            // Trigger fallback modal if Safari or Google App blocks it
            if (e.name === "NotAllowedError" || e.name === "AbortError") {
              showFallbackImageModal(dataUrl);
            }
          }
        } else {
          if (!isMobile) {
            const link = document.createElement("a");
            link.download = `${filename}.png`;
            link.href = dataUrl;
            link.click();
          } else {
            showFallbackImageModal(dataUrl);
          }
        }
        document.body.style.cursor = originalCursor;
      },
      "image/png",
      0.95,
    );
  } catch (error) {
    console.error("Error generating shareable image:", error);
    alert("Could not generate image. Please try again in Safari.");
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

// Builds the full share card DOM in JS each time Share is clicked.
// This means zero dependency on index.html card markup — only app.js
// needs to be updated when the card design changes.
function buildShareCard(
  testTitle,
  displayName,
  safeScore,
  bandText,
  bandBg,
  bandColor,
  gaugeColor,
  summaryText,
) {
  var vault = document.getElementById("share-card-vault");
  if (!vault) {
    console.error("[ShareCard] vault not found");
    return null;
  }

  vault.innerHTML =
    '<div id="share-card-container" style="' +
    "width:600px;height:auto;min-height:820px;background:#ffffff;" +
    "font-family:'Plus Jakarta Sans',system-ui,sans-serif;" +
    "box-sizing:border-box;display:flex;flex-direction:column;" +
    'position:relative;border:1px solid #e2e8f0;overflow:hidden;">' +
    // Rainbow top line
    '<div style="position:absolute;top:0;left:0;width:100%;height:6px;' +
    'background:linear-gradient(90deg,#6366f1 0%,#d946ef 50%,#f59e0b 100%);"></div>' +
    // Purple left stripe
    '<div style="position:absolute;top:0;left:0;width:6px;height:100%;' +
    'background:linear-gradient(180deg,#6366f1 0%,#d946ef 100%);"></div>' +
    // Main content
    '<div style="flex:1;display:flex;flex-direction:column;align-items:center;' +
    'text-align:center;padding:56px 52px 32px 58px;box-sizing:border-box;">' +
    // Kicker
    '<span style="font-size:0.72rem;font-weight:800;letter-spacing:0.18em;' +
    'text-transform:uppercase;color:#a855f7;display:block;margin-bottom:14px;">' +
    "Assessment Profile</span>" +
    // Test name
    '<h1 style="font-size:2.2rem;font-weight:800;color:#0f172a;line-height:1.2;' +
    'margin:0 0 8px;letter-spacing:-0.02em;">' +
    testTitle +
    "</h1>" +
    // User name
    '<p style="font-size:0.95rem;font-weight:600;color:#64748b;margin:0 0 28px;">' +
    displayName +
    "</p>" +
    // Score number
    '<div style="display:flex;align-items:baseline;justify-content:center;' +
    'gap:2px;margin-bottom:4px;">' +
    '<span style="font-size:7rem;font-weight:800;color:#0f172a;line-height:1;' +
    'letter-spacing:-0.04em;">' +
    safeScore +
    "</span>" +
    '<span style="font-size:2.8rem;font-weight:700;color:#94a3b8;' +
    'letter-spacing:-0.02em;">/100</span>' +
    "</div>" +
    // Gauge bar
    '<div style="width:320px;margin:8px 0 14px;">' +
    '<div style="height:12px;border-radius:50px;background:#e2e8f0;overflow:hidden;">' +
    '<div style="height:100%;border-radius:50px;width:' +
    safeScore +
    "%;" +
    "background:" +
    gaugeColor +
    ';"></div>' +
    "</div>" +
    "</div>" +
    // Band pill
    '<span style="display:inline-block;font-size:0.75rem;font-weight:800;' +
    "padding:6px 18px;border-radius:50px;margin-bottom:28px;letter-spacing:0.02em;" +
    "background:" +
    bandBg +
    ";color:" +
    bandColor +
    ';">' +
    bandText +
    "</span>" +
    // Summary box
    '<div style="width:100%;background:#f8fafc;border:1px solid #e2e8f0;' +
    'border-radius:20px;padding:22px 26px;box-sizing:border-box;">' +
    '<p style="font-size:0.93rem;line-height:1.65;color:#334155;' +
    'margin:0;font-weight:500;text-align:center;">' +
    summaryText +
    "</p>" +
    "</div>" +
    "</div>" + // end main content
    // Footer
    '<div style="width:100%;border-top:1px solid #e2e8f0;' +
    "padding:20px 32px 26px 46px;box-sizing:border-box;" +
    'display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">' +
    '<div style="height:38px;overflow:hidden;display:flex;align-items:center;">' +
    '<img src="logo.png" alt="People Assets" style="height:115px;max-width:none;' +
    'mix-blend-mode:multiply;margin-top:4px;margin-left:-6px;" />' +
    "</div>" +
    '<p style="font-size:0.9rem;font-weight:600;color:#64748b;margin:0;">' +
    "peopleassets.in</p>" +
    "</div>" +
    "</div>";

  return document.getElementById("share-card-container");
}

async function generateAndShareImage() {
  var shareBtn = document.getElementById("main-share-btn");
  if (!shareBtn) return;

  var originalText = shareBtn.innerHTML;
  shareBtn.textContent = "Generating Card...";
  shareBtn.disabled = true;

  var result = lastReportResult;
  var testTitle =
    currentTest && currentTest.title ? currentTest.title : "Assessment Profile";
  var rawName =
    typeof userName !== "undefined" && userName && userName !== "there"
      ? userName
      : "";
  var displayName = rawName ? rawName + "'s Result" : "";

  if (!result) {
    alert("No report found. Please complete an assessment first.");
    shareBtn.innerHTML = originalText;
    shareBtn.disabled = false;
    return;
  }

  var rawScore = Number(
    result.overall != null
      ? result.overall
      : result.score != null
        ? result.score
        : 0,
  );
  var safeScore = Math.max(0, Math.min(100, isNaN(rawScore) ? 0 : rawScore));

  var bandBg, bandColor, gaugeColor;
  if (safeScore >= 67) {
    bandBg = "#ede9fe";
    bandColor = "#5b21b6";
    gaugeColor = "linear-gradient(135deg,#6366f1 0%,#d946ef 100%)";
  } else if (safeScore >= 34) {
    bandBg = "#fef3c7";
    bandColor = "#92400e";
    gaugeColor = "linear-gradient(135deg,#f59e0b 0%,#fbbf24 100%)";
  } else {
    bandBg = "#fee2e2";
    bandColor = "#991b1b";
    gaugeColor = "linear-gradient(135deg,#f87171 0%,#fb923c 100%)";
  }

  var bandText = result.label || result.overallLabel || "";
  var summaryText = (
    result.description ||
    result.overallDescription ||
    ""
  ).trim();

  var cardElement = buildShareCard(
    testTitle,
    displayName,
    safeScore,
    bandText,
    bandBg,
    bandColor,
    gaugeColor,
    summaryText,
  );
  if (!cardElement) {
    alert("Share card could not be built. Please refresh and try again.");
    shareBtn.innerHTML = originalText;
    shareBtn.disabled = false;
    return;
  }

  // Wait 300ms to guarantee the DOM is fully rendered before snapping the picture.
  await new Promise(function (resolve) {
    setTimeout(resolve, 300);
  });

  try {
    var isMobile = window.innerWidth <= 768;
    var canvas = await html2canvas(cardElement, {
      scale: isMobile ? 1.5 : 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      allowTaint: true,
    });

    const dataUrl = canvas.toDataURL("image/png");

    canvas.toBlob(
      async function (blob) {
        try {
          if (!blob) throw new Error("Canvas produced no image data.");
          var file = new File([blob], "people-assets-profile.png", {
            type: "image/png",
          });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: "My " + testTitle + " Profile",
                text: "I just assessed my " + testTitle + " on People Assets!",
              });
            } catch (e) {
              // If Safari times out the request or the user cancels, deploy the fallback modal
              if (e.name === "NotAllowedError" || e.name === "AbortError") {
                showFallbackImageModal(dataUrl);
              }
            }
          } else {
            // IF DESKTOP: Auto-download. IF IN-APP BROWSER (Google/IG): Deploy the modal.
            if (!isMobile) {
              var link = document.createElement("a");
              link.download =
                testTitle.replace(/\s+/g, "-").toLowerCase() + "-profile.png";
              link.href = dataUrl;
              link.click();
              alert("Share card saved to your downloads folder.");
            } else {
              showFallbackImageModal(dataUrl);
            }
          }
        } catch (err) {
          console.error("Share card error:", err);
          showFallbackImageModal(dataUrl);
        } finally {
          shareBtn.innerHTML = originalText;
          shareBtn.disabled = false;
        }
      },
      "image/png",
      0.95,
    );
  } catch (err) {
    console.error("html2canvas failed:", err);
    alert(
      "Could not render the share card. Try opening the site directly in Safari.",
    );
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
