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

    // iOS In-App Browser Bypass: Create a Blob and force it through the native Share Sheet
    html2pdf()
      .set(opt)
      .from(element)
      .outputPdf("blob")
      .then((pdfBlob) => {
        const file = new File([pdfBlob], filename + ".pdf", {
          type: "application/pdf",
        });

        if (
          isMobile &&
          navigator.canShare &&
          navigator.canShare({ files: [file] })
        ) {
          navigator
            .share({
              files: [file],
              title: "Assessment Report",
              text: "Here is my behavioral profile report.",
            })
            .catch(() => {
              // Fallback to standard download if user cancels the share sheet
              html2pdf().set(opt).from(element).save();
            });
        } else {
          // Standard Desktop/Android download
          html2pdf().set(opt).from(element).save();
        }
        document.body.style.cursor = "default";
      })
      .catch((err) => {
        console.error("PDF generation failed:", err);
        alert(
          "Could not generate PDF. Please open this site in Safari instead of the Google App.",
        );
        document.body.style.cursor = "default";
      });
  }, 100);
}

async function shareSectionAsImage(elementId, filename) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const originalCursor = document.body.style.cursor;
  document.body.style.cursor = "wait";

  try {
    var isMobile = window.innerWidth <= 768;
    const canvas = await html2canvas(element, {
      scale: isMobile ? 1.5 : 2,
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

  console.log("[ShareBtn] currentTest        =", currentTest);
  console.log(
    "[ShareBtn] currentTest.title  =",
    currentTest && currentTest.title,
  );
  console.log("[ShareBtn] userName           =", userName);
  console.log("[ShareBtn] lastReportResult   =", result);

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

  // One frame so the browser renders the new DOM before capture
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
              // Fallback if the user cancels or the browser blocks it
              if (e.name === "NotAllowedError") {
                var link = document.createElement("a");
                link.download =
                  testTitle.replace(/\s+/g, "-").toLowerCase() + "-profile.png";
                link.href = canvas.toDataURL("image/png");
                link.click();
                alert("Share card saved to your downloads folder.");
              }
            }
          } else {
            var link = document.createElement("a");
            link.download =
              testTitle.replace(/\s+/g, "-").toLowerCase() + "-profile.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
            alert("Share card saved to your downloads folder.");
          }
        } catch (err) {
          console.error("Share card error:", err);
          alert(
            "Could not generate the share card. Try opening the site in Safari.",
          );
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
    alert("Could not render the share card. Try opening the site in Safari.");
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
