let currentPage = "home";
let currentTest = null;
let currentQuestion = 0;
let answers = [];
let lastReportResult = null;
let userName = "";
let userEmail = "";


/* ============================================================
   PROFILE PAGE — MAIN RENDERER
   ============================================================ */
async function renderProfilePage() {
    const section = document.getElementById("profile");
    if (!section) return;

    // Auth check
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) {
        section.innerHTML = `
            <div style="min-height:60vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; padding:40px;">
                <div style="font-size:3rem;">🔒</div>
                <h2 style="font-weight:800; color:var(--text-primary);">Sign in to view your profile</h2>
                <p style="color:var(--text-muted); text-align:center; max-width:380px;">Your test history, reports, and AI-powered profile summary are waiting for you.</p>
                <button class="btn-primary" onclick="signInWithGoogle()">
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" style="width:18px; height:18px; vertical-align:middle; margin-right:8px;">
                    Sign in with Google
                </button>
            </div>
        `;
        return;
    }

    const userName = user.user_metadata?.full_name || "Learner";
    const userAvatar = user.user_metadata?.avatar_url || "";
    const userEmail = user.email || "";

    // Loading skeleton
    section.innerHTML = `
        <div class="container" style="padding-top:60px; padding-bottom:80px; max-width:960px;">
            <div style="text-align:center; padding:60px 0; color:var(--text-muted);">
                <div style="width:40px; height:40px; border:3px solid var(--brand-indigo); border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite; margin:0 auto 20px;"></div>
                <p style="font-weight:600;">Loading your profile…</p>
            </div>
        </div>
        <style>
            @keyframes spin { to { transform: rotate(360deg); } }
        </style>
    `;

    // Fetch all results for this user
    let results = [];
    try {
        const { data: { user: currentUser } } = await _supabase.auth.getUser();
        if (!currentUser) {
            section.innerHTML = `<div style="text-align:center;padding:80px 20px;">
                <p style="color:var(--text-muted);">Please sign in to view your profile.</p>
            </div>`;
            return;
        }
 
        const { data, error } = await _supabase
            .from('test_results')
            .select('*')
            .eq('email', currentUser.email)
            .order('created_at', { ascending: false });
 
        if (error) {
            console.error("Profile fetch error:", error);
        } else {
            results = data || [];
        }
    } catch (e) {
        console.error("Profile fetch exception:", e);
    }

    // Render full profile
    section.innerHTML = buildProfileHTML(user, userName, userAvatar, userEmail, results);

    // Inject spinner style
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(spinStyle);

    // Auto-generate AI summary if there are results
    if (results.length > 0) {
        generateProfileSummary(results, userName);
    }
}


/* ============================================================
   HTML BUILDER
   ============================================================ */
function buildProfileHTML(user, userName, userAvatar, userEmail, results) {
    const firstName = userName.split(" ")[0];
    const totalTests = results.length;
    const uniqueTests = [...new Set(results.map(r => r.test_title))].length;
    const avgScore = totalTests > 0
        ? Math.round(results.reduce((a, r) => a + (r.overall_score || 0), 0) / totalTests)
        : null;

    // Group results by test title — keep latest per test for summary
    const latestByTest = {};
    results.forEach(r => {
        if (!latestByTest[r.test_title]) latestByTest[r.test_title] = r;
    });

    return `
    <div style="
        background: linear-gradient(135deg, #6366f1 0%, #d946ef 60%, #f59e0b 100%);
        padding: 60px 20px 100px;
        position: relative;
        overflow: hidden;
    ">
        <!-- Decorative blobs -->
        <div style="position:absolute;top:-60px;right:-60px;width:300px;height:300px;background:rgba(255,255,255,0.07);border-radius:50%;"></div>
        <div style="position:absolute;bottom:-80px;left:-40px;width:200px;height:200px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>

        <div class="container" style="max-width:960px; position:relative; z-index:1;">
            <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
                ${userAvatar
                    ? `<img src="${userAvatar}" alt="${userName}" style="width:80px;height:80px;border-radius:50%;border:4px solid rgba(255,255,255,0.6);box-shadow:0 8px 30px rgba(0,0,0,0.2);">`
                    : `<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:2rem;border:4px solid rgba(255,255,255,0.4);">👤</div>`
                }
                <div>
                    <p style="color:rgba(255,255,255,0.75);font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Your Growth Dashboard</p>
                    <h1 style="color:white;font-size:clamp(1.6rem,4vw,2.4rem);font-weight:900;margin:0 0 4px;">${userName}</h1>
                    <p style="color:rgba(255,255,255,0.65);font-size:0.85rem;margin:0;">${userEmail}</p>
                </div>
            </div>

            <!-- Stats strip -->
            <div style="display:flex;gap:20px;margin-top:36px;flex-wrap:wrap;">
                ${[
                    { label: "Tests Taken", value: totalTests, icon: "📋" },
                    { label: "Unique Assessments", value: uniqueTests, icon: "🧩" },
                    { label: "Avg Score", value: avgScore !== null ? avgScore + "%" : "—", icon: "📊" },
                ].map(s => `
                    <div style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.25);border-radius:16px;padding:18px 24px;min-width:140px;">
                        <div style="font-size:1.5rem;margin-bottom:4px;">${s.icon}</div>
                        <div style="font-size:1.6rem;font-weight:900;color:white;">${s.value}</div>
                        <div style="font-size:0.72rem;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.06em;">${s.label}</div>
                    </div>
                `).join("")}
            </div>
        </div>
    </div>

    <div class="container" style="max-width:960px; margin-top:-40px; position:relative; z-index:2; padding-bottom:80px;">

        <!-- AI PROFILE SUMMARY CARD -->
        <div id="profile-summary-card" style="
            background:white;
            border-radius:24px;
            box-shadow:0 20px 60px rgba(99,102,241,0.12);
            padding:36px;
            margin-bottom:32px;
            border:1px solid #e8e6ff;
        ">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
                <div style="width:40px;height:40px;background:linear-gradient(135deg,#6366f1,#d946ef);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">✨</div>
                <div>
                    <h2 style="margin:0;font-size:1.1rem;font-weight:800;color:var(--text-primary);">AI Profile Summary</h2>
                    <p style="margin:0;font-size:0.75rem;color:var(--text-muted);">Synthesized from all your assessments</p>
                </div>
                ${results.length > 0 ? `
                <button onclick="generateProfileSummary(null, '${userName}')" id="regen-summary-btn"
                    style="margin-left:auto;background:linear-gradient(135deg,#6366f1,#d946ef);color:white;border:none;padding:8px 16px;border-radius:10px;font-size:0.75rem;font-weight:700;cursor:pointer;">
                    ↻ Refresh
                </button>` : ""}
            </div>
            ${results.length === 0
                ? `<div style="text-align:center;padding:30px;color:var(--text-muted);">
                    <div style="font-size:2.5rem;margin-bottom:12px;">🌱</div>
                    <p style="font-weight:600;">Take your first assessment to unlock your AI Profile Summary.</p>
                    <button class="btn-primary" onclick="showPage('tests')" style="margin-top:16px;">Browse Assessments →</button>
                   </div>`
                : `<div id="summary-content">
                    <div style="display:flex;align-items:center;gap:12px;color:var(--brand-indigo);">
                        <div style="width:20px;height:20px;border:2px solid var(--brand-indigo);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0;"></div>
                        <span style="font-size:0.9rem;font-weight:600;">Generating your personalized summary…</span>
                    </div>
                   </div>`
            }
        </div>

        <!-- TEST HISTORY -->
        <h2 style="font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:20px;">Test History</h2>

        ${results.length === 0
            ? `<div style="background:white;border-radius:20px;padding:50px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.05);">
                <div style="font-size:3rem;margin-bottom:16px;">📭</div>
                <h3 style="color:var(--text-primary);">No tests taken yet</h3>
                <p style="color:var(--text-muted);margin-bottom:20px;">Your completed assessments will appear here.</p>
                <button class="btn-primary" onclick="showPage('tests')">Start an Assessment →</button>
               </div>`
            : results.map((r, i) => buildTestResultCard(r, i)).join("")
        }
    </div>
    `;
}


/* ============================================================
   INDIVIDUAL TEST RESULT CARD
   ============================================================ */
function buildTestResultCard(r, index) {
    const date = new Date(r.created_at);
    const dateStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const score = r.overall_score ?? null;
    const scoreColor = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : score !== null ? "#ef4444" : "#6366f1";
    const breakdown = r.breakdown || [];
    const hasBreakdown = Array.isArray(breakdown) && breakdown.length > 0;
    const cardId = `result-card-${index}`;
    const detailId = `result-detail-${index}`;

    // Find test icon
    const testDef = TESTS.find(t => t.title === r.test_title);
    const icon = testDef?.icon || "📋";

    return `
    <div id="${cardId}" style="
        background:white;
        border-radius:20px;
        box-shadow:0 4px 20px rgba(0,0,0,0.06);
        margin-bottom:16px;
        overflow:hidden;
        border:1px solid #f0eeff;
        transition: box-shadow 0.2s;
    " onmouseenter="this.style.boxShadow='0 8px 32px rgba(99,102,241,0.15)'" onmouseleave="this.style.boxShadow='0 4px 20px rgba(0,0,0,0.06)'">

        <!-- Card Header — always visible -->
        <div style="padding:24px 28px; display:flex; align-items:center; gap:16px; cursor:pointer;"
             onclick="toggleResultDetail('${detailId}', '${cardId}')">
            <div style="font-size:1.8rem;flex-shrink:0;">${icon}</div>
            <div style="flex:1;min-width:0;">
                <h3 style="margin:0 0 4px;font-size:1rem;font-weight:800;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.test_title}</h3>
                <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
                    <span style="font-size:0.75rem;color:var(--text-muted);">📅 ${dateStr}</span>
                    ${r.result_label ? `<span style="font-size:0.75rem;background:#f3f0ff;color:var(--brand-indigo);padding:2px 10px;border-radius:20px;font-weight:700;">${r.result_label}</span>` : ""}
                </div>
            </div>

            <!-- Score Badge -->
            ${score !== null ? `
            <div style="text-align:center;flex-shrink:0;">
                <div style="
                    width:56px;height:56px;
                    border-radius:50%;
                    border:3px solid ${scoreColor};
                    display:flex;align-items:center;justify-content:center;
                    flex-direction:column;
                ">
                    <span style="font-size:1rem;font-weight:900;color:${scoreColor};">${score}</span>
                    <span style="font-size:0.55rem;color:${scoreColor};font-weight:700;">%</span>
                </div>
            </div>` : ""}

            <!-- Chevron -->
            <div id="chevron-${index}" style="font-size:1.1rem;color:var(--text-muted);transition:transform 0.2s;flex-shrink:0;">▾</div>
        </div>

        <!-- Expandable Detail -->
        <div id="${detailId}" style="display:none; border-top:1px solid #f0eeff; padding:24px 28px; background:#faf9ff;">

            ${hasBreakdown ? `
            <h4 style="font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin-bottom:16px;">Section Scores</h4>
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
                ${breakdown.map(sec => {
                    const secScore = sec.score ?? 0;
                    const secColor = secScore >= 70 ? "#10b981" : secScore >= 40 ? "#f59e0b" : "#ef4444";
                    return `
                    <div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                            <span style="font-size:0.85rem;font-weight:700;color:var(--text-primary);">${sec.name}</span>
                            <span style="font-size:0.85rem;font-weight:800;color:${secColor};">${secScore}%</span>
                        </div>
                        <div style="height:8px;background:#ede9ff;border-radius:99px;overflow:hidden;">
                            <div style="height:100%;width:${secScore}%;background:${secColor};border-radius:99px;transition:width 0.6s ease;"></div>
                        </div>
                        ${sec.description ? `<p style="font-size:0.78rem;color:var(--text-muted);margin-top:5px;line-height:1.5;">${sec.description}</p>` : ""}
                    </div>`;
                }).join("")}
            </div>` : ""}

            <div style="display:flex;gap:12px;flex-wrap:wrap;">
                ${testDef ? `
                <button class="btn-secondary" onclick="openTestLanding('${testDef.id}')"
                    style="font-size:0.8rem;padding:8px 16px;">
                    Retake Test →
                </button>` : ""}
                <button onclick="showPage('coaching')"
                    style="background:linear-gradient(135deg,#6366f1,#d946ef);color:white;border:none;padding:8px 18px;border-radius:10px;font-size:0.8rem;font-weight:700;cursor:pointer;">
                    💬 Talk to a Coach
                </button>
            </div>
        </div>
    </div>
    `;
}


/* ============================================================
   TOGGLE CARD DETAIL
   ============================================================ */
function toggleResultDetail(detailId, cardId) {
    const detail = document.getElementById(detailId);
    const index = detailId.replace("result-detail-", "");
    const chevron = document.getElementById(`chevron-${index}`);
    if (!detail) return;

    const isOpen = detail.style.display !== "none";
    detail.style.display = isOpen ? "none" : "block";
    if (chevron) chevron.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
}


/* ============================================================
   AI PROFILE SUMMARY GENERATOR
   Uses Anthropic API (claude-sonnet-4-20250514)
   ============================================================ */
async function generateProfileSummary(results, userName) {
    const summaryEl = document.getElementById("summary-content");
    const regenBtn = document.getElementById("regen-summary-btn");
    if (!summaryEl) return;

    // If called from refresh button, re-fetch results
    if (!results) {
        const { data: { user } } = await _supabase.auth.getUser();
        if (!user) return;
        const { data } = await _supabase
            .from('test_results')
            .select('*')
            .eq('email', user.email)
            .order('created_at', { ascending: false });
        results = data || [];
    }

    if (results.length === 0) return;

    // Show loading state
    summaryEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;color:var(--brand-indigo);">
            <div style="width:20px;height:20px;border:2px solid var(--brand-indigo);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0;"></div>
            <span style="font-size:0.9rem;font-weight:600;">Analysing your assessments…</span>
        </div>
    `;
    if (regenBtn) regenBtn.disabled = true;

    // Build context for AI
    const latestByTest = {};
    results.forEach(r => {
        if (!latestByTest[r.test_title]) latestByTest[r.test_title] = r;
    });

    const testSummaries = Object.values(latestByTest).map(r => {
        const breakdown = Array.isArray(r.breakdown) && r.breakdown.length > 0
            ? r.breakdown.map(s => `  • ${s.name}: ${s.score ?? "N/A"}%${s.description ? " — " + s.description : ""}`).join("\n")
            : "  No section breakdown available.";
        return `
TEST: ${r.test_title}
Date: ${new Date(r.created_at).toLocaleDateString('en-IN')}
Overall Score: ${r.overall_score ?? "N/A"}%
Result Label: ${r.result_label || "N/A"}
Section Breakdown:
${breakdown}
        `.trim();
    }).join("\n\n---\n\n");

    const prompt = `You are an expert executive coach and organizational psychologist at People Assets, a professional development platform.

A user named ${userName} has completed the following assessments. Synthesize a rich, integrated profile summary that:
1. Identifies their KEY STRENGTHS (2-3 themes that emerge across multiple tests)
2. Highlights their PRIMARY GROWTH AREAS (2-3 patterns of development opportunity)
3. Provides a SHORT "Who You Are" paragraph — a confident, warm, accurate character sketch
4. Ends with one concrete, actionable NEXT STEP tailored to their profile

ASSESSMENT DATA:
${testSummaries}

IMPORTANT GUIDELINES:
- Be specific and reference actual test names and scores
- Be encouraging but honest — don't sugarcoat real development areas
- Write in second person ("You demonstrate...", "Your data shows...")
- Keep total length under 350 words
- Use plain text, no markdown headers or bullet symbols — use clean line breaks
- Start directly with the "Who You Are" paragraph, no preamble`;

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const text = data?.content?.[0]?.text || "";

        if (text) {
            // Parse into sections for nicer display
            const paragraphs = text.trim().split(/\n\n+/).filter(Boolean);

            summaryEl.innerHTML = `
                <div style="border-left:3px solid var(--brand-indigo);padding-left:20px;margin-bottom:20px;">
                    ${paragraphs.map((p, i) => `<p style="margin:0 0 ${i < paragraphs.length - 1 ? '16px' : '0'};font-size:0.95rem;line-height:1.75;color:var(--text-primary);">${p.replace(/\n/g, '<br>')}</p>`).join("")}
                </div>
                <p style="font-size:0.72rem;color:var(--text-muted);margin:0;">Generated from ${Object.keys(latestByTest).length} assessment${Object.keys(latestByTest).length > 1 ? "s" : ""} · Retake tests to update your summary</p>
            `;
        } else {
            summaryEl.innerHTML = `<p style="color:#ef4444;font-size:0.9rem;">Could not generate summary. Please try again.</p>`;
        }
    } catch (err) {
        console.error("Summary generation error:", err);
        summaryEl.innerHTML = `<p style="color:#ef4444;font-size:0.9rem;">Something went wrong. Please try again.</p>`;
    }

    if (regenBtn) regenBtn.disabled = false;
}


/* ============================================================
   UPDATE AUTH DROPDOWN — call this inside onAuthStateChange
   to add a "My Profile" link in the dropdown.

   Replace the authContainer.innerHTML section in
   onAuthStateChange (around line 3944) with this:
   ============================================================ */
function buildAuthDropdownHTML(userImage, userName) {
    return `
        <div class="user-profile-menu" onclick="toggleSignOut(event)" style="position:relative; cursor:pointer; display:flex; align-items:center; margin-left:15px;">
            <img src="${userImage}" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--brand-indigo);" alt="Profile">
            <div id="signout-dropdown" style="display:none; position:absolute; top:45px; right:0; background:white; padding:12px; border-radius:12px; box-shadow:var(--shadow-card); min-width:170px; z-index:10000;">
                <p style="font-size:0.75rem; font-weight:800; color:var(--text-primary); margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">${userName}</p>
                <button onclick="showPage('profile')" style="color:var(--brand-indigo); background:none; border:none; font-weight:700; cursor:pointer; width:100%; text-align:left; font-size:0.8rem; margin-bottom:6px;">👤 My Profile</button>
                <button onclick="handleLogout()" style="color:#ef4444; background:none; border:none; font-weight:700; cursor:pointer; width:100%; text-align:left; font-size:0.8rem;">Sign Out</button>
            </div>
        </div>
    `;
}

/* ============================================================
   INTEGRATION CHECKLIST (see comments at top of file)
   ============================================================ */

// ============================================
// NAVIGATION
// ============================================



// 1. MODIFIED NAVIGATION: Updates the URL when you switch pages
function showPage(page, testId = null, shouldPush = true) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    const target = document.getElementById(page);
    if (target) target.style.display = "block";
    
    currentPage = page;

    // --- GOOGLE ANALYTICS TRACKING CODE ---
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: testId ? `${page}: ${testId}` : page,
            page_location: window.location.href,
            page_path: window.location.pathname + window.location.search
        });
    }
    // --------------------------------------

    if (shouldPush) {
        if (page === 'test-landing' && testId) {
            window.history.pushState({page, testId}, "", "/" + testId);
        } else if (page === 'home') {
            window.history.pushState({page}, "", "/");
        } else {
            window.history.pushState({page}, "", "/" + page);
        }
    }

    // TRIGGER RENDERING
    if (page === "tests") {
        renderTestGrid();
    }
    
    // CORRECTED FUNCTION NAME HERE:
    if (page === "coaching") {
        renderCoachingPage(); 
    }

    if (page === "profile") {
        if (typeof renderProfilePage === "function") {
            renderProfilePage();
        }
    }
}
    window.scrollTo({ top: 0, behavior: "smooth" });



function initRouter() {
    // Check if there is a redirect path from our 404 page (Step 2)
    const sessionPath = sessionStorage.getItem('redirect_path');
    if (sessionPath) {
        sessionStorage.removeItem('redirect_path');
        processPath(sessionPath);
        return;
    }

    // Otherwise, process the current location
    processPath(window.location.pathname);
}

// Helper to parse the path string
function processPath(fullPath) {
    const path = fullPath.replace(/\/$/, "").split("/").pop();
    
    // Check if the path is a valid test ID
    const isTest = TESTS.find(t => t.id === path);
    
    if (isTest) {
        openTestLanding(path, false);
    } else if (path === "tests" || path === "coaching" || path === "profile") {
    showPage(path, null, false);
    } else {
        showPage('home', null, false);
    }
}

// 4. Update the card button in renderTestGrid:
// Change the "Start Analysis" button to call openTestLanding(t.id)

function toggleMobileNav() {
  const drawer = document.getElementById("mobile-drawer");
  drawer.classList.toggle("open");
}

function openTestLanding(testId, shouldPush = true) {
    const t = TESTS.find(x => x.id === testId);
    if (!t) {
        showPage('tests', null, false);
        return;
    }
    
    currentTest = t;
    const landingContainer = document.getElementById("landing-content");
    
    showPage('test-landing', testId, shouldPush);

    const measurementList = t.sections 
        ? t.sections.map(s => `<li>${s.name}</li>`).join('')
        : "<li>Core Insights</li><li>Behavioral Mapping</li>";

    landingContainer.innerHTML = `
        <div class="landing-card" style="background:white; padding:40px; border-radius:24px; box-shadow:var(--shadow-card); max-width:800px; margin:40px auto; text-align:left;">
            <button class="btn-secondary" style="margin-bottom:20px;" onclick="showPage('tests')">← Back to Library</button>
            <div style="text-align:center; margin-bottom:30px; border-bottom:1px solid #eee; padding-bottom:20px;">
                <div style="font-size:4rem; margin-bottom:10px;">${t.icon}</div>
                <h1 class="text-gradient" style="margin-bottom:10px;">${t.title}</h1>
                <p style="font-size:1.2rem; color:var(--brand-magenta); font-weight:700;">${t.tagline}</p>
            </div>
            <div style="display:grid; grid-template-columns: 1.4fr 1fr; gap:30px;">
                <div>
                    <h3 style="text-transform:uppercase; font-size:0.8rem; color:var(--text-muted); margin-bottom:10px;">Overview</h3>
                    <p style="font-size:1.05rem; line-height:1.7;">${t.description}</p>
                    <h3 style="text-transform:uppercase; font-size:0.8rem; color:var(--text-muted); margin-top:25px; margin-bottom:10px;">What we analyze</h3>
                    <ul style="list-style:none; padding:0; font-weight:600; color:var(--brand-indigo);">
                        ${measurementList}
                    </ul>
                </div>
                <div style="background:#f8fafc; padding:25px; border-radius:20px; text-align:center; height:fit-content; border:1px solid #e2e8f0;">
                    <div style="margin-bottom:15px;"><strong>${t.questions}</strong> Questions</div>
                    <div style="margin-bottom:20px;"><strong>${t.time}</strong> Est. Time</div>
                    <button class="btn-primary btn-full" onclick="startTest('${t.id}')">Start Analysis →</button>
                </div>
            </div>
        </div>
    `;
}

function filterTests(catId) {
    activeCategory = catId;
    renderTestGrid();
}

function renderTestGrid() {
    const grid = document.getElementById("test-grid-ui");
    if (!grid) return;

    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.classList.remove('active');
        if (pill.getAttribute('onclick').includes(`'${activeCategory}'`)) {
            pill.classList.add('active');
        }
    });

    const filteredTests = activeCategory === "all" 
        ? TESTS 
        : TESTS.filter(t => t.category === activeCategory);

    grid.innerHTML = filteredTests.map(t => `
        <div class="card">
            <div style="font-size: 2rem; margin-bottom: 12px;">${t.icon}</div>
            <div style="font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--brand-indigo); margin-bottom: 8px;">${t.category}</div>
            <h3>${t.title}</h3>
            <p style="font-size:0.83rem; color:var(--text-muted); margin-bottom:18px; flex-grow:1;">${t.tagline}</p>
            <button class="btn-secondary" onclick="openTestLanding('${t.id}')">Know More</button>
            <button class="btn-primary btn-full" onclick="openTestLanding('${t.id}')">Start Analysis →</button>
        </div>
    `).join("");
}


// ============================================
// MODAL
// ============================================
function closeModal() {
  document.getElementById("method-modal").style.display = "none";
}
function handleModalBackdropClick(e) {
  if (e.target === document.getElementById("method-modal")) closeModal();
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ============================================
// RENDER TEST GRID
// ============================================

let activeCategory = "all"; // Ensure this is at the top of your file

function filterTests(catId) {
  activeCategory = catId;
  renderTestGrid();
}

function renderTestGrid() {
  const grid = document.getElementById("test-grid-ui");
  if (!grid) return;

  // 1. Sync the Category Buttons (Pills)
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.classList.remove('active');
    if (pill.getAttribute('onclick').includes(`'${activeCategory}'`)) {
      pill.classList.add('active');
    }
  });

  // 2. Filter the data
  const filteredTests = activeCategory === "all" 
    ? TESTS 
    : TESTS.filter(t => t.category === activeCategory);

  // 3. Render cards (Both buttons now go to the Landing Page)
  grid.innerHTML = filteredTests.map(t => `
    <div class="card">
      <div style="font-size: 2rem; margin-bottom: 12px;">${t.icon}</div>
      <div style="font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--brand-indigo); letter-spacing: 0.1em; margin-bottom: 8px;">${t.category}</div>
      <h3>${t.title}</h3>
      <p style="font-size:0.83rem; color:var(--text-muted); margin-bottom:18px; flex-grow:1;">${t.tagline}</p>
      
      <button class="btn-secondary" onclick="openTestLanding('${t.id}')">Know More</button>
      <button class="btn-primary btn-full" onclick="openTestLanding('${t.id}')">Start Analysis →</button>
      
      <div class="card-meta">
        <span><strong>${t.questions}</strong> Questions</span>
        <span><strong>${t.time}</strong></span>
      </div>
    </div>
  `).join("");
}
// ============================================
// KNOW MORE MODAL
// ============================================
function openKnowMore(testId) {
  const t = TESTS.find(x => x.id === testId);
  if (!t) return;

  let modal = document.getElementById("know-more-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "know-more-modal";
    modal.className = "modal-overlay";
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal" onclick="document.getElementById('know-more-modal').style.display='none'">&#x2715;</span>
      <div style="font-size:2.5rem; margin-bottom:12px;">${t.icon}</div>
      <h2 class="text-gradient" style="font-size: clamp(1.4rem, 3.5vw, 2rem); margin-bottom:10px;">${t.title}</h2>
      <p style="color:var(--text-muted); margin-bottom:24px; font-size:0.95rem; line-height:1.7;">${t.description}</p>
      <div style="background:#f8fafc; border-radius:14px; padding:18px; margin-bottom:24px;">
        <div style="display:flex; gap:24px; justify-content:center;">
          <div style="text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--brand-indigo);">${t.questions}</div>
            <div style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Questions</div>
          </div>
          <div style="width:1px; background:#e2e8f0;"></div>
          <div style="text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--brand-magenta);">${t.time}</div>
            <div style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Est. Time</div>
          </div>
        </div>
      </div>
      <button class="btn-primary btn-full" onclick="document.getElementById('know-more-modal').style.display='none'; startTest('${t.id}')">
        Begin ${t.title} →
      </button>
    </div>
  `;

  modal.style.display = "block";
}

// ============================================
// QUESTION ENGINE
// ============================================
function startTest(testId) {
  currentTest = TESTS.find(t => t.id === testId);
  if (!currentTest) return;
  document.querySelector(".engine-nav").style.display = "flex";
  gtag('event', 'begin_test', {
        'test_id': testId,
        'test_name': currentTest.title
    });
  currentQuestion = 0;
  answers = new Array(currentTest.questions_data.length).fill(null);
  showPage("engine");
  renderQuestion();
}

function renderQuestion() {
  const t = currentTest;
  const q = t.questions_data[currentQuestion];
  const total = t.questions_data.length;

  document.getElementById("test-title").textContent = t.title;

  // Build progress bar
  let progressBarHtml = "";
  if (t.sections && t.sections.length) {
    const sectionsHtml = t.sections.map((sec, i) => {
      const isActive = currentQuestion >= sec.start && currentQuestion <= sec.end;
      const isComplete = currentQuestion > sec.end;
      const segProgress = isComplete ? 100 :
        isActive ? Math.round(((currentQuestion - sec.start) / (sec.end - sec.start + 1)) * 100) : 0;

      return `
        <div style="flex:1; padding: 0 3px;">
          <div style="font-size:0.62rem; font-weight:700; text-transform:uppercase; letter-spacing:0.07em;
            color:${isActive ? "var(--brand-indigo)" : isComplete ? "#10b981" : "var(--text-light)"};
            margin-bottom:5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${isComplete ? "✓ " : ""}${sec.name}
          </div>
          <div style="background:#e2e8f0; border-radius:50px; height:5px; overflow:hidden;">
            <div style="height:100%; width:${segProgress}%;
              background:${isComplete ? "#10b981" : "var(--brand-grad)"};
              border-radius:50px; transition:width 0.4s ease;"></div>
          </div>
        </div>
      `;
    }).join("");

    progressBarHtml = `
      <div style="display:flex; gap:0; width:100%; max-width:580px; margin:0 auto 20px;">
        ${sectionsHtml}
      </div>
    `;
  } else {
    const progress = (currentQuestion / total) * 100;
    progressBarHtml = `
      <div class="progress-bar-wrap" style="max-width:520px; margin:0 auto 8px;">
        <div class="progress-bar-fill" style="width:${progress}%"></div>
      </div>
    `;
  }

  document.getElementById("question-area").innerHTML = `
    ${progressBarHtml}
    <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:28px; font-weight:600;">
      Question ${currentQuestion + 1} of ${total}
      ${t.sections && q.section ? `&nbsp;·&nbsp;<span style="color:var(--brand-indigo);">${q.section}</span>` : ""}
    </p>
    <div style="background:white; border-radius:20px; padding: clamp(24px,4vw,40px); box-shadow: var(--shadow-card); max-width:580px; margin:0 auto 24px; text-align:left;">
      <p style="font-size: clamp(1rem, 2.5vw, 1.2rem); font-weight:700; color:var(--text-primary); margin-bottom:24px; line-height:1.5;">
        ${q.q}
      </p>
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${q.options.map((opt, i) => `
          <label class="answer-option ${answers[currentQuestion] === i ? 'selected' : ''}" onclick="selectAnswer(${i})">
            <span class="answer-letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `;

  document.getElementById("back-btn").style.display = currentQuestion === 0 ? "none" : "inline-block";
  document.getElementById("next-btn").textContent =
    currentQuestion === total - 1 ? "View My Results →" : "Next →";
}

function selectAnswer(index) {
  answers[currentQuestion] = index;
  document.querySelectorAll(".answer-option").forEach((el, i) => {
    el.classList.toggle("selected", i === index);
  });
}

async function showNameInputScreen() {
    // 1. Check if user is logged in via Google
    const { data: { user } } = await _supabase.auth.getUser();
    
    if (user) {
        // If logged in, skip the screen and use their Google name
        userName = user.user_metadata.full_name.split(' ')[0]; // Take first name
        generateReport();
        return;
    }

    // 2. If Guest, show the input UI
    const area = document.getElementById("question-area");
    area.innerHTML = `
        <div style="background:white; border-radius:24px; padding: 40px; box-shadow:var(--shadow-card); max-width:500px; margin:40px auto; text-align:center;">
            <div style="font-size:3rem; margin-bottom:20px;">✍️</div>
            <h2 class="text-gradient" style="margin-bottom:15px;">One Last Step...</h2>
            <p style="color:var(--text-muted); margin-bottom:30px;">Tell us your name and we'll generate a customized report for you.</p>
            
            <input type="text" id="user-name-field" placeholder="Enter your first name" 
                style="width:100%; padding:15px; border-radius:12px; border:2px solid #e2e8f0; font-size:1.1rem; margin-bottom:20px; text-align:center;">
            
            <button class="btn-primary btn-full" onclick="saveNameAndGenerate()">Generate My Report →</button>
        </div>
    `;
    
    // Hide the back/next buttons of the engine
    document.querySelector(".engine-nav").style.display = "none";
}

function saveNameAndGenerate() {
    const input = document.getElementById("user-name-field");
    userName = input.value.trim() || "there"; // Fallback to "there" if empty
    generateReport();
}

function changeQuestion(direction) {
  if (direction === 1) {
    if (answers[currentQuestion] === null) {
      shakeNextButton();
      return;
    }
    if (currentQuestion === currentTest.questions_data.length - 1) {
      showNameInputScreen();
      return;
    }
    currentQuestion++;
  } else {
    if (currentQuestion === 0) return;
    currentQuestion--;
  }
  renderQuestion();
}

function shakeNextButton() {
  const btn = document.getElementById("next-btn");
  btn.style.animation = "none";
  btn.offsetHeight;
  btn.style.animation = "shake 0.4s ease";
  btn.style.background = "#ef4444";
  setTimeout(() => {
    btn.style.background = "";
    btn.style.animation = "";
  }, 600);
}

const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
  .answer-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-primary);
    background: #f8fafc;
    transition: all 0.2s ease;
    user-select: none;
  }
  .answer-option:hover {
    border-color: var(--brand-magenta);
    background: #fdf8ff;
  }
  .answer-option.selected {
    border-color: var(--brand-indigo);
    background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
    color: var(--brand-indigo);
  }
  .answer-letter {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: white;
    border: 2px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 800;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }
  .answer-option.selected .answer-letter {
    background: var(--brand-indigo);
    border-color: var(--brand-indigo);
    color: white;
  }
`;
document.head.appendChild(shakeStyle);

// ============================================
// EMAILJS CONFIG
// ============================================
const EMAILJS_PUBLIC_KEY  = "zs8EuLqOZPjTVHF0M";
const EMAILJS_SERVICE_ID  = "service_u11zlzf";
const EMAILJS_TEMPLATE_ID = "template_zpcklyu";

// Initialise EmailJS
(function() {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// People Assets logo (base64) — used in report header & email
const PA_LOGO_BASE64 = "data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z";



// ============================================
// COACHING PAGE
// ============================================
function renderCoachingPage() {
  const section = document.getElementById("coaching");
  section.innerHTML = `
    <div class="container">
      <div class="coaching-wrap">
        <p class="section-label">1-on-1 Expert Coaching</p>
        <h1>Work With <span class="text-gradient">A Coach</span></h1>
        <p>You have the data. Now let's turn it into a plan. Our coaches specialize in translating your assessment results into tangible career and leadership growth.</p>

        <div class="coaching-card">
          <form onsubmit="submitCoachingForm(event)">
            <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px; letter-spacing:0.05em;">FULL NAME</label>
            <input class="main-input" type="text" id="coach-name" placeholder="Your full name" required>

            <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px; letter-spacing:0.05em;">EMAIL ADDRESS</label>
            <input class="main-input" type="email" id="coach-email" placeholder="your@email.com" required>

            <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px; letter-spacing:0.05em;">WHAT WOULD YOU LIKE TO WORK ON?</label>
            <textarea class="main-input" id="coach-goal" rows="4" placeholder="e.g. I want to understand my DISC results and improve how I lead my team..." required></textarea>

            <button class="btn-primary btn-full" type="submit" style="margin-top:8px;">
              Request My Coaching Session →
            </button>
          </form>
          <p id="form-status" style="text-align:center; margin-top:16px; font-size:0.85rem; font-weight:600; color:var(--brand-magenta); display:none;"></p>
        </div>

        <div style="margin-top:36px; display:grid; grid-template-columns:repeat(3,1fr); gap:16px; text-align:center;">
          ${[
            { icon:"🎯", label:"Assessment-Led", desc:"Coaching grounded in your actual data" },
            { icon:"🔒", label:"Confidential", desc:"Private 1-on-1 sessions, always" },
            { icon:"⚡", label:"Action-Focused", desc:"Leave every session with a clear next step" }
          ].map(f => `
            <div style="background:white; border-radius:16px; padding:20px; box-shadow:var(--shadow-card);">
              <div style="font-size:1.8rem; margin-bottom:8px;">${f.icon}</div>
              <div style="font-size:0.85rem; font-weight:800; margin-bottom:4px;">${f.label}</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${f.desc}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// ============================================
// EMAIL REPORT SECTION BUILDER
// ============================================


// 1. Function to close the Auth Modal
function closeAuthModal() {
    document.getElementById("auth-modal").style.display = "none";
}

// 2. Logic to trigger the popup on load
window.addEventListener('DOMContentLoaded', () => {
    // We wait 1.5 seconds so the user sees the home page first (feels less like an ad)
    /*setTimeout(() => {
        // Only show if the user hasn't already closed it in this session
        if (!sessionStorage.getItem('auth_popup_closed')) {
            document.getElementById("auth-modal").style.display = "flex";
        }
    }, 1500);*/
});

// 3. Update the close function to remember the choice for this session
function closeAuthModal() {
    document.getElementById("auth-modal").style.display = "none";
    sessionStorage.setItem('auth_popup_closed', 'true');
}

// 4. Ensure clicking outside the modal closes it too
// Add this inside your existing handleModalBackdropClick or update it:
function handleModalBackdropClick(e) {
    if (e.target.id === "method-modal") closeModal();
    if (e.target.id === "auth-modal") closeAuthModal();
}

async function syncToDatabase(testResult) {
    let email = userEmail;
    if (!email) {
        const { data: { user } } = await _supabase.auth.getUser();
        email = user?.email;
    }
    if (!email) {
        console.warn("⚠️ Cannot sync: No email found");
        return;
    }

    const payload = {
        email: email,
        user_name: userName || "Anonymous",
        test_id: currentTest?.id,
        test_title: currentTest?.title,
        overall_score: testResult.overall || testResult.score || 0,
        result_label: testResult.overallLabel || testResult.label || "Unknown",
        section_breakdown: testResult.sectionResults || [],
    };

    console.log("Saving to Supabase:", payload);

    try {
        const { error } = await _supabase
            .from('test_results')
            .upsert(payload, { onConflict: 'email,test_id' });

        if (error) console.error("Supabase Error:", error);
        else console.log("✅ Result saved successfully");
    } catch (err) {
        console.error("Sync failed:", err);
    }
}


// ============================================
// SEND REPORT EMAIL
// ============================================
async function sendReportEmail() {
  const emailInput = document.getElementById("report-email-input");
  const statusEl   = document.getElementById("email-report-status");
  const sendBtn    = document.getElementById("send-report-btn");
  const email      = emailInput ? emailInput.value.trim() : "";

  if (!email || !email.includes("@")) {
    statusEl.style.display = "block";
    statusEl.style.color = "#ef4444";
    statusEl.textContent = "⚠ Please enter a valid email address.";
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Optimizing for Email...";
  statusEl.style.display = "none";

  try {
    // 1. CLONE & CLEAN
    const originalReport = document.getElementById("report-page-content");
    const reportClone = originalReport.cloneNode(true);

    // Remove buttons and signup boxes
    const selectorsToRemove = ['.report-actions', '#email-report-box', 'button', '.coaching-card'];
    selectorsToRemove.forEach(s => reportClone.querySelectorAll(s).forEach(el => el.remove()));

    // 2. CONVERT MODERN CSS TO EMAIL-SAFE CSS
    // Gmail hates 'position: absolute', 'clamp', and 'vh'. We must force standard units.
    const header = reportClone.querySelector('div[style*="background: var(--brand-grad)"]');
    if (header) {
      header.style.position = "static";
      header.style.padding = "40px 20px";
      header.style.height = "auto";
      header.style.borderRadius = "16px";
      // Manually set colors because variables often fail in Gmail
      header.style.background = "linear-gradient(135deg, #6366f1 0%, #d946ef 100%)";
      
      // Clean up inner titles (Replace clamp with fixed pixels)
      const titles = header.querySelectorAll('h1, div, p');
      titles.forEach(t => {
        if (t.tagName === 'H1') t.style.fontSize = "28px";
        if (t.style.fontSize.includes('clamp')) t.style.fontSize = "40px";
        t.style.position = "static"; // Remove absolute positioning from decorative circles
      });
      
      // Hide the decorative background circles in the email version as they cause layout shifts
      header.querySelectorAll('div[style*="position:absolute"]').forEach(circle => circle.remove());
    }

    const cleanHTML = reportClone.innerHTML;
    syncToDatabase(lastReportResult);

    // 3. PREPARE PARAMETERS
    const templateParams = {
      to_email: email,
      user_name: userName,
      test_name: currentTest.title,
      report_html: `
        <div style="background-color: #f3f4f6; padding: 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
            <div style="padding: 20px;">
              ${cleanHTML}
            </div>
            <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                Generated by <strong>People Assets</strong> • aditidubey5.github.io/PA1
              </p>
            </div>
          </div>
        </div>
      `
    };

    // 4. SEND
    await emailjs.send("service_u11zlzf", "template_zpcklyu", templateParams);

    statusEl.style.display = "block";
    statusEl.style.color = "#10b981";
    statusEl.textContent = "✓ Professional report sent to " + email;
    sendBtn.textContent = "Sent ✓";
    emailInput.value = "";
    
    alert("Report Sent! We've optimized the layout for your email provider.");

  } catch (error) {
    console.error("Email Error:", error);
    statusEl.style.display = "block";
    statusEl.style.color = "#ef4444";
    statusEl.textContent = "⚠ Failed to send. Please try again.";
    sendBtn.disabled = false;
    sendBtn.textContent = "Email My Report →";
  }
}

async function signInWithGoogle() {
    await _supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin // Automatically detects https://peopleassets.in
        }
    });
} 


// ============================================
// COACHING PAGE
// ============================================
function renderCoachingPage() {
  const section = document.getElementById("coaching");
  section.innerHTML = `
    <div class="container">
      <div class="coaching-wrap">
        <p class="section-label">1-on-1 Expert Coaching</p>
        <h1>Work With <span class="text-gradient">A Coach</span></h1>
        <p>You have the data. Now let's turn it into a plan. Our coaches specialize in translating your assessment results into tangible career and leadership growth.</p>

        <div class="coaching-card">
          <form onsubmit="submitCoachingForm(event)">
            <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px; letter-spacing:0.05em;">FULL NAME</label>
            <input class="main-input" type="text" id="coach-name" placeholder="Your full name" required>

            <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px; letter-spacing:0.05em;">EMAIL ADDRESS</label>
            <input class="main-input" type="email" id="coach-email" placeholder="your@email.com" required>

            <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px; letter-spacing:0.05em;">WHAT WOULD YOU LIKE TO WORK ON?</label>
            <textarea class="main-input" id="coach-goal" rows="4" placeholder="e.g. I want to understand my DISC results and improve how I lead my team..." required></textarea>

            <button class="btn-primary btn-full" type="submit" style="margin-top:8px;">
              Request My Coaching Session →
            </button>
          </form>
          <p id="form-status" style="text-align:center; margin-top:16px; font-size:0.85rem; font-weight:600; color:var(--brand-magenta); display:none;"></p>
        </div>

        <div style="margin-top:36px; display:grid; grid-template-columns:repeat(3,1fr); gap:16px; text-align:center;">
          ${[
            { icon:"🎯", label:"Assessment-Led", desc:"Coaching grounded in your actual data" },
            { icon:"🔒", label:"Confidential", desc:"Private 1-on-1 sessions, always" },
            { icon:"⚡", label:"Action-Focused", desc:"Leave every session with a clear next step" }
          ].map(f => `
            <div style="background:white; border-radius:16px; padding:20px; box-shadow:var(--shadow-card);">
              <div style="font-size:1.8rem; margin-bottom:8px;">${f.icon}</div>
              <div style="font-size:0.85rem; font-weight:800; margin-bottom:4px;">${f.label}</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${f.desc}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function submitCoachingForm(e) {
  e.preventDefault();
  const name  = document.getElementById("coach-name").value;
  const email = document.getElementById("coach-email").value;
  const goal  = document.getElementById("coach-goal").value;
  const status = document.getElementById("form-status");

  status.style.display = "block";
  status.textContent = `✓ Thanks ${name}! We'll reach out to ${email} within 24 hours.`;
  e.target.reset();
}
function submitCoachingForm(e) {
  e.preventDefault();
  const name    = document.getElementById("coach-name").value;
  const email   = document.getElementById("coach-email").value;
  const goal    = document.getElementById("coach-goal").value;
  const status  = document.getElementById("form-status");
  const btn     = e.target.querySelector("button[type=submit]");

  btn.disabled    = true;
  btn.textContent = "Sending...";
  status.style.display  = "none";

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    to_email:            email,
    test_name:           "Coaching Request",
    overall_score:       "N/A",
    overall_label:       `Coaching enquiry from ${name}`,
    overall_description: goal,
    section_breakdown:   `Name: ${name}\nEmail: ${email}\n\nMessage:\n${goal}`
  }).then(() => {
    status.style.display = "block";
    status.style.color   = "var(--brand-magenta)";
    status.textContent   = `✓ Thanks ${name}! We'll reach out to ${email} shortly.`;
    e.target.reset();
    btn.disabled    = false;
    btn.textContent = "Request My Coaching Session →";
  }).catch((err) => {
    console.error("EmailJS coaching error:", err);
    status.style.display = "block";
    status.style.color   = "#ef4444";
    status.textContent   = "⚠ Something went wrong. Please try again or email us directly.";
    btn.disabled    = false;
    btn.textContent = "Request My Coaching Session →";
  });
}

// HELPER STYLES
const s = document.createElement('style');
s.textContent = `.answer-option { display:flex; align-items:center; gap:16px; padding:18px; border:2px solid #e2e8f0; border-radius:14px; cursor:pointer; transition:0.2s; background:#fcfcfc; }.answer-option.selected { border-color:var(--brand-indigo); color:var(--brand-indigo); }.answer-letter { width:28px; height:28px; border-radius:50%; background:white; border:2px solid #e2e8f0; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:800; }.answer-option.selected .answer-letter { background:var(--brand-indigo); color:white; }`;
document.head.appendChild(s);

function toggleMobileNav() { document.getElementById("mobile-drawer").classList.toggle("open"); }
function closeModal() { document.getElementById("method-modal").style.display = "none"; }

async function checkUser() {
    const { data: { user } } = await _supabase.auth.getUser();
    const authContainer = document.getElementById("auth-container");

    if (user) {
        // 1. Show the success banner
        if (!sessionStorage.getItem('login_notified')) {
            const banner = document.getElementById("login-success-banner");
            banner.style.display = "block";
            setTimeout(() => { banner.style.display = "none"; }, 4000);
            sessionStorage.setItem('login_notified', 'true');
        }

        // 2. Replace button with Profile Image
        const userImage = user.user_metadata.avatar_url;
        const userName = user.user_metadata.full_name;
        
        authContainer.innerHTML = `
            <div class="user-profile-menu" onclick="toggleSignOut()" style="position:relative; cursor:pointer; display:flex; align-items:center; margin-left:15px;">
                <img src="${userImage}" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--brand-indigo);" alt="Profile">
                <div id="signout-dropdown" style="display:none; position:absolute; top:40px; right:0; background:white; padding:12px; border-radius:12px; box-shadow:var(--shadow-card); min-width:150px; z-index:100;">
                    <p style="font-size:0.75rem; font-weight:800; color:var(--text-primary); margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">${userName}</p>
                    <button onclick="handleLogout()" style="color:#ef4444; background:none; border:none; font-weight:700; cursor:pointer; width:100%; text-align:left; font-size:0.8rem;">Sign Out</button>
                </div>
            </div>
        `;
    }
}

function toggleSignOut() {
    const dd = document.getElementById("signout-dropdown");
    if(dd) dd.style.display = dd.style.display === "none" ? "block" : "none";
}

async function handleLogout() {
    await _supabase.auth.signOut();
    sessionStorage.removeItem('login_notified');
    window.location.reload();
}

// Run this every time the site opens
window.addEventListener('DOMContentLoaded', async () => {
    // 1. Check if user is already logged in
    const { data: { user } } = await _supabase.auth.getUser();

    // 2. Only show the popup if there is NO user AND they haven't closed it this session
    /*setTimeout(() => {
        if (!user && !sessionStorage.getItem('auth_popup_closed')) {
            const authModal = document.getElementById("auth-modal");
            if (authModal) authModal.style.display = "flex";
        }
    }, 1500);*/
});

/* ============================================
   IDENTITY & AUTHENTICATION MODULE
   ============================================ */

// 1. Live Auth Listener: Reacts to Login/Logout instantly
_supabase.auth.onAuthStateChange(async (event, session) => {
    const user = session?.user;
    const authContainer = document.getElementById("auth-container");
    const authModal = document.getElementById("auth-modal");

    if (user) {
        // --- LOGGED IN STATE ---
        console.log("✅ User logged in:", user.email);
        // A. Hide the Welcome Modal
        if (authModal) authModal.style.display = "none";

        // B. TRIGGER SUCCESS TOAST (The Popup)
        if (event === 'SIGNED_IN' && !sessionStorage.getItem('toast_shown')) {
            const toast = document.getElementById("login-toast");
            if (toast) {
                toast.classList.add("show");
                sessionStorage.setItem('toast_shown', 'true');
                setTimeout(() => { toast.classList.remove("show"); }, 4000);
            }
        }

        // C. Clean URL tokens (stops the 'Stale URL' error)
        if (window.location.hash) {
            window.history.replaceState(null, null, window.location.pathname);
        }

        // D. Show Profile Icon
        const userImage = user.user_metadata.avatar_url;
        const userName = user.user_metadata.full_name;
        const displayName = userName.split(" ")[0];
        authContainer.innerHTML = buildAuthDropdownHTML(userImage, userName);
        
        if (authContainer) {
           if (authContainer) {
            authContainer.innerHTML = `
                <div class="user-profile-menu" onclick="toggleSignOut(event)" style="position:relative; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                    <img src="${userImage}" style="width:36px; height:36px; border-radius:50%; border:2px solid var(--brand-indigo); display:block;" alt="Profile">
                    <div id="signout-dropdown" style="display:none; position:absolute; top:48px; right:0; background:white; padding:14px; border-radius:14px; box-shadow:var(--shadow-card); min-width:180px; z-index:10000;">
                        <p style="font-size:0.75rem; font-weight:800; color:var(--text-primary); margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:8px;">${userName}</p>
                        <button onclick="showPage('profile')" style="color:var(--brand-indigo); background:none; border:none; font-weight:700; cursor:pointer; width:100%; text-align:left; font-size:0.82rem; padding:4px 0; display:block;">👤 My Profile</button>
                        <button onclick="handleLogout()" style="color:#ef4444; background:none; border:none; font-weight:700; cursor:pointer; width:100%; text-align:left; font-size:0.82rem; padding:4px 0; display:block; margin-top:4px;">Sign Out</button>
                    </div>
                </div>
            `;
        }
      }
    } else {
        // --- LOGGED OUT STATE ---
        sessionStorage.removeItem('toast_shown'); // Reset for next login
        
        // Show Sign In button
        if (authContainer) {
            authContainer.innerHTML = `
                <button class="login-google-btn" onclick="signInWithGoogle()">
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google">
                    Sign in
                </button>
            `;
        }

        
}});

// 2. Action: Sign In
async function signInWithGoogle() {
    await _supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
    });
}

// 3. Action: Log Out
async function handleLogout() {
    await _supabase.auth.signOut();
    window.location.reload();
}

// 4. Action: Toggle Dropdown
function toggleSignOut(event) {
    if (event) event.stopPropagation();
    const dd = document.getElementById("signout-dropdown");
    if (dd) dd.style.display = dd.style.display === "none" ? "block" : "none";
}

// 5. Global Click Listener: Close dropdown when clicking away
window.addEventListener('click', () => {
    const dropdown = document.getElementById("signout-dropdown");
    if (dropdown && dropdown.style.display === "block") {
        dropdown.style.display = "none";
    }
});
// ============================================
// INIT
// ============================================



// Start the app using the router instead of just showPage('home')
initRouter();

// Ensure the back/forward buttons work
window.onpopstate = function() {
    initRouter();
    window.showPage = showPage;
window.toggleMobileNav = toggleMobileNav;
window.closeModal = closeModal;
window.signInWithGoogle = signInWithGoogle;
window.handleLogout = handleLogout;
window.renderProfilePage = renderProfilePage;
window.generateProfileSummary = generateProfileSummary;
};