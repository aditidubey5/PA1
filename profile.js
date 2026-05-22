// ============================================
// PROFILE DASHBOARD & AI SUMMARY (profile.js)
// ============================================

async function renderProfilePage() {
    const section = document.getElementById("profile");
    if (!section) return;

    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) {
        section.innerHTML = `
            <div style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:40px;text-align:center;">
                <div style="font-size:3rem;">🔒</div>
                <h2 style="font-weight:800;">Sign in to view your profile</h2>
                <p style="color:#64748b;max-width:380px;">Your test history and AI-powered profile summary are waiting for you.</p>
                <button class="btn-primary" onclick="signInWithGoogle()">Sign in with Google</button>
            </div>`;
        return;
    }

    const userName = user.user_metadata?.full_name || "Learner";
    const userAvatar = user.user_metadata?.avatar_url || "";
    const userEmail = user.email || "";

    section.innerHTML = `<div style="text-align:center;padding:100px;"><div style="width:36px;height:36px;border:3px solid #6366f1;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 16px;"></div><p style="color:#64748b;font-weight:600;">Loading your profile…</p></div>
    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>`;

    const { data: results } = await _supabase
        .from('test_results')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false });

    const allResults = results || [];
    section.innerHTML = buildProfileHTML(user, userName, userAvatar, userEmail, allResults);

    if (allResults.length > 0) {
        loadAISummary(allResults, userName);
    } else {
        const el = document.getElementById("summary-content");
        if (el) el.innerHTML = `<p style="color:#64748b;text-align:center;padding:20px 0;">Take your first assessment to unlock your AI Profile Summary.</p>`;
    }
}

// ============================================
// PROFILE HTML
// ============================================
function buildProfileHTML(user, userName, userAvatar, userEmail, results) {
    const totalTests = results.length;
    const uniqueTests = [...new Set(results.map(r => r.test_title))].length;
    const avgScore = totalTests > 0
        ? Math.round(results.reduce((a, r) => a + (r.overall_score || 0), 0) / totalTests)
        : null;

    const firstName = userName.split(" ")[0];

    return `
    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>

    <!-- HERO BANNER -->
    <div style="background:linear-gradient(135deg,#6366f1 0%,#d946ef 60%,#f59e0b 100%);padding:60px 20px 100px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-60px;right:-60px;width:300px;height:300px;background:rgba(255,255,255,0.06);border-radius:50%;"></div>
        <div style="position:absolute;bottom:-80px;left:-40px;width:200px;height:200px;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
        <div class="container" style="max-width:960px;position:relative;z-index:1;">
            <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
                ${userAvatar
                    ? `<img src="${userAvatar}" alt="${userName}" style="width:80px;height:80px;border-radius:50%;border:4px solid rgba(255,255,255,0.6);box-shadow:0 8px 30px rgba(0,0,0,0.2);">`
                    : `<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:2rem;border:4px solid rgba(255,255,255,0.4);">👤</div>`}
                <div>
                    <p style="color:rgba(255,255,255,0.7);font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Your Growth Dashboard</p>
                    <h1 style="color:white;font-size:clamp(1.6rem,4vw,2.4rem);font-weight:900;margin:0 0 4px;">${userName}</h1>
                    <p style="color:rgba(255,255,255,0.6);font-size:0.85rem;margin:0;">${userEmail}</p>
                </div>
            </div>
            <div style="display:flex;gap:16px;margin-top:36px;flex-wrap:wrap;">
                ${heroBadge(totalTests, "Tests Taken", "📋")}
                ${heroBadge(uniqueTests, "Assessments", "🧩")}
                ${heroBadge(avgScore !== null ? avgScore + "%" : "—", "Avg Score", "📊")}
            </div>
        </div>
    </div>

    <!-- CONTENT AREA -->
    <div class="container" style="max-width:960px;margin-top:-44px;position:relative;z-index:2;padding-bottom:80px;">

        <!-- AI SUMMARY CARD -->
        <div style="background:white;border-radius:24px;box-shadow:0 20px 60px rgba(99,102,241,0.13);padding:36px;margin-bottom:32px;border:1px solid #ede9ff;">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap;">
                <div style="width:44px;height:44px;background:linear-gradient(135deg,#6366f1,#d946ef);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;">✨</div>
                <div style="flex:1;">
                    <h2 style="margin:0;font-size:1.1rem;font-weight:800;color:#1e293b;">AI Profile Summary</h2>
                    <p style="margin:0;font-size:0.75rem;color:#94a3b8;">Synthesized from all your assessments</p>
                </div>
                ${results.length > 0 ? `
                <button onclick="refreshSummary('${firstName}')"
                    style="background:linear-gradient(135deg,#6366f1,#d946ef);color:white;border:none;padding:9px 18px;border-radius:10px;font-size:0.78rem;font-weight:700;cursor:pointer;letter-spacing:0.02em;">
                    ↻ Refresh
                </button>` : ""}
            </div>
            <div id="summary-content">
                ${results.length === 0
                    ? `<p style="color:#94a3b8;text-align:center;padding:20px 0;">Take an assessment to generate your AI summary.</p>`
                    : `<div style="display:flex;align-items:center;gap:12px;color:#6366f1;">
                        <div style="width:20px;height:20px;border:2px solid #6366f1;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0;"></div>
                        <span style="font-size:0.9rem;font-weight:600;">Analyzing your assessments…</span>
                       </div>`}
            </div>
        </div>

        <!-- TEST HISTORY -->
        <h2 style="font-size:0.8rem;font-weight:800;text-transform:uppercase;letter-spacing:0.09em;color:#94a3b8;margin-bottom:18px;">Assessment History</h2>
        ${results.length === 0
            ? `<div style="background:white;border-radius:20px;padding:60px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.05);">
                <div style="font-size:3rem;margin-bottom:16px;">📭</div>
                <p style="color:#64748b;font-weight:600;">No tests taken yet.</p>
               </div>`
            : results.map((r, i) => buildTestResultCard(r, i)).join("")
        }
    </div>`;
}

function heroBadge(value, label, icon) {
    return `
    <div style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.25);border-radius:16px;padding:16px 22px;min-width:130px;">
        <div style="font-size:1.2rem;margin-bottom:2px;">${icon}</div>
        <div style="font-size:1.5rem;font-weight:900;color:white;">${value}</div>
        <div style="font-size:0.68rem;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.07em;">${label}</div>
    </div>`;
}

// ============================================
// TEST RESULT CARD
// ============================================
function buildTestResultCard(r, index) {
    const date = new Date(r.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
    const score = r.overall_score ?? null;
    const scoreColor = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : score !== null ? "#ef4444" : "#6366f1";
    const breakdown = Array.isArray(r.breakdown) ? r.breakdown : [];
    const detailId = `result-detail-${index}`;

    const icon = r.test_title?.includes("Mindset") ? "🌱"
        : r.test_title?.includes("Procrastin") ? "⏰"
        : r.test_title?.includes("DISC") ? "🎯"
        : r.test_title?.includes("Leadership") ? "🧭"
        : r.test_title?.includes("AI") ? "🤖"
        : r.test_title?.includes("Martyr") ? "🔥"
        : r.test_title?.includes("Emotion") ? "💡"
        : "📋";

    return `
    <div style="background:white;border-radius:20px;box-shadow:0 4px 20px rgba(0,0,0,0.06);margin-bottom:16px;border:1px solid #f0eeff;overflow:hidden;transition:box-shadow 0.2s;"
         onmouseenter="this.style.boxShadow='0 8px 32px rgba(99,102,241,0.15)'"
         onmouseleave="this.style.boxShadow='0 4px 20px rgba(0,0,0,0.06)'">

        <!-- CARD HEADER -->
        <div style="padding:22px 28px;display:flex;align-items:center;gap:16px;cursor:pointer;"
             onclick="toggleResultDetail('${detailId}','chevron-${index}')">
            <div style="font-size:1.8rem;flex-shrink:0;">${icon}</div>
            <div style="flex:1;min-width:0;">
                <div style="font-weight:800;font-size:1rem;color:#1e293b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.test_title}</div>
                <div style="display:flex;gap:10px;align-items:center;margin-top:4px;flex-wrap:wrap;">
                    <span style="font-size:0.74rem;color:#94a3b8;">📅 ${date}</span>
                    ${r.result_label ? `<span style="font-size:0.72rem;background:#f3f0ff;color:#6366f1;padding:2px 10px;border-radius:20px;font-weight:700;">${r.result_label}</span>` : ""}
                </div>
            </div>
            ${score !== null ? `
            <div style="width:54px;height:54px;border-radius:50%;border:3px solid ${scoreColor};display:flex;align-items:center;justify-content:center;flex-direction:column;flex-shrink:0;">
                <span style="font-size:0.95rem;font-weight:900;color:${scoreColor};line-height:1;">${score}</span>
                <span style="font-size:0.52rem;color:${scoreColor};font-weight:700;">%</span>
            </div>` : ""}
            ${breakdown.length > 0 ? `<div id="chevron-${index}" style="color:#94a3b8;font-size:1rem;transition:transform 0.25s;flex-shrink:0;">▾</div>` : ""}
        </div>

        <!-- EXPANDABLE BREAKDOWN -->
        ${breakdown.length > 0 ? `
        <div id="${detailId}" style="display:none;border-top:1px solid #f0eeff;padding:20px 28px 24px;background:#fafaff;">
            <p style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8;margin:0 0 16px;">Section Breakdown</p>
            ${breakdown.map(sec => {
                const s = sec.score ?? 0;
                const c = s >= 70 ? "#10b981" : s >= 40 ? "#f59e0b" : "#ef4444";
                return `
                <div style="margin-bottom:18px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                        <span style="font-size:0.87rem;font-weight:700;color:#334155;">${sec.name}</span>
                        <span style="font-size:0.87rem;font-weight:800;color:${c};">${s}%</span>
                    </div>
                    <div style="height:8px;background:#ede9ff;border-radius:99px;overflow:hidden;margin-bottom:7px;">
                        <div style="height:100%;width:${s}%;background:${c};border-radius:99px;transition:width 0.5s ease;"></div>
                    </div>
                    ${sec.description ? `<p style="margin:0;font-size:0.8rem;color:#64748b;line-height:1.65;">${sec.description}</p>` : ""}
                </div>`;
            }).join("")}
        </div>` : ""}
    </div>`;
}

function toggleResultDetail(detailId, chevronId) {
    const el = document.getElementById(detailId);
    const ch = document.getElementById(chevronId);
    if (!el) return;
    const open = el.style.display !== "none";
    el.style.display = open ? "none" : "block";
    if (ch) ch.style.transform = open ? "rotate(0deg)" : "rotate(180deg)";
}

// ============================================
// AI SUMMARY
// ============================================
async function loadAISummary(results, userName) {
    const summaryEl = document.getElementById("summary-content");
    if (!summaryEl) return;

    summaryEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;color:#6366f1;">
            <div style="width:20px;height:20px;border:2px solid #6366f1;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0;"></div>
            <span style="font-size:0.9rem;font-weight:600;">Analyzing your assessments…</span>
        </div>`;

    try {
        const { data, error } = await _supabase.functions.invoke('generate-profile-summary', {
            body: { results, userName },
            headers: { Authorization: '' }
        });

        if (error) throw error;

        const text = data.summary || "";
        const paragraphs = text.trim().split(/\n\n+/).filter(Boolean);

        // NEW SEMANTIC WAY
    const semanticHTML = formatSemanticSummary(data.summary);

    summaryEl.innerHTML = `
        <div class="ai-summary-content" style="line-height:1.8; color:#1e293b; margin-bottom: 20px; text-align:left;">
            ${semanticHTML}
        </div>
        <button onclick="loadAISummary(${JSON.stringify(results).replace(/"/g, '&quot;')}, '${userName}')" 
                style="background:none; border:1px solid var(--brand-indigo); color:var(--brand-indigo); padding:8px 16px; border-radius:8px; cursor:pointer; margin-top: 15px;">
            🔄 Refresh Summary
        </button>
            <p style="font-size:0.72rem;color:#94a3b8;margin:0;">
                Generated from ${results.length} assessment${results.length > 1 ? "s" : ""} · Retake tests to update
            </p>`;

    } catch (err) {
        console.error("Summary Error:", err);
        summaryEl.innerHTML = `<p style="color:#ef4444;font-size:0.9rem;">Could not load summary. Please try refreshing.</p>`;
    }
}

async function refreshSummary(userName) {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return;
    const { data: results } = await _supabase
        .from('test_results')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false });
    loadAISummary(results || [], userName);
}

function formatSemanticSummary(rawText) {
    let formattedText = rawText;

    // 1. Array of the exact headings we instructed Gemini to generate
    const targetHeadings = [
        "Who You Are", 
        "Strengths", 
        "Growth Areas", 
        "Your Next Step"
    ];

    // 2. Loop through each heading and wrap it in an <h3> tag
    targetHeadings.forEach(heading => {
        // This regex looks for the heading on its own line (case-insensitive, multiline)
        const regex = new RegExp(`^${heading}:?\\s*$`, 'gim');
        formattedText = formattedText.replace(regex, `<h3 class="profile-heading">${heading}</h3>`);
    });

    // 3. Clean up the spacing and wrap paragraphs
    // Split the text by double line breaks (which Gemini uses to separate sections)
    const blocks = formattedText.split(/\n\s*\n/);
    
    const htmlBlocks = blocks.map(block => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return '';
        
        // If the block already contains our injected <h3>, return it as-is
        if (trimmedBlock.startsWith('<h3')) {
            return trimmedBlock;
        }
        
        // If the block contains our "→" bullets, replace single newlines with <br> 
        // so the bullets stack neatly inside the paragraph
        if (trimmedBlock.includes('→')) {
            return `<p class="profile-text">${trimmedBlock.replace(/\n/g, '<br>')}</p>`;
        }
        
        // Otherwise, it's a standard paragraph
        return `<p class="profile-text">${trimmedBlock}</p>`;
    });

    // Join everything back together into a single HTML string
    return htmlBlocks.join('\n');
}

// ============================================
// GLOBALS
// ============================================
window.renderProfilePage = renderProfilePage;
window.loadAISummary = loadAISummary;
window.refreshSummary = refreshSummary;
window.toggleResultDetail = toggleResultDetail;