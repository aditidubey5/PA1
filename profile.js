// ============================================
// PROFILE PAGE — CLEAN VERSION
// Calls Gemini directly using config.js key
// ============================================

async function renderProfilePage() {
    const section = document.getElementById("profile");
    if (!section) return;

    // Get logged-in user
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) {
        section.innerHTML = `
            <div style="padding:100px 20px; text-align:center;">
                <h2>Please sign in to view your profile</h2>
            </div>`;
        return;
    }

    const userName = user.user_metadata?.full_name?.split(" ")[0] || "User";
    const userEmail = user.email;

    // Fetch all results for this user
    const { data: results, error } = await _supabase
        .from('test_results')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false });

    if (error) console.error("Profile fetch error:", error.message);

    const allResults = results || [];

    // Render the page HTML
    section.innerHTML = buildProfileHTML(userName, userEmail, allResults);

    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);

    // Load AI summary if results exist
    if (allResults.length > 0) {
        loadAISummary(allResults, userName);
    } else {
        const el = document.getElementById("summary-content");
        if (el) el.innerHTML = `<p style="color:#64748b;">Take your first assessment to unlock your AI Profile Summary.</p>`;
    }
}

// ============================================
// HTML BUILDER
// ============================================
function buildProfileHTML(userName, userEmail, results) {
    const totalTests = results.length;
    const uniqueTests = [...new Set(results.map(r => r.test_title))].length;
    const avgScore = totalTests > 0
        ? Math.round(results.reduce((sum, r) => sum + (r.overall_score || 0), 0) / totalTests)
        : 0;

    return `
    <div style="background:linear-gradient(135deg,#6366f1,#a855f7); padding:60px 20px 80px; text-align:center; color:white;">
        <h1 style="margin:0 0 8px; font-size:clamp(1.8rem,4vw,2.8rem); font-weight:900;">${userName}'s Profile</h1>
        <p style="margin:0; opacity:0.85; font-size:0.95rem;">${userEmail}</p>
        <div style="display:flex; justify-content:center; gap:24px; margin-top:32px; flex-wrap:wrap;">
            ${statBadge(totalTests, "Tests Taken")}
            ${statBadge(uniqueTests, "Unique Assessments")}
            ${statBadge(avgScore > 0 ? avgScore + "%" : "—", "Average Score")}
        </div>
    </div>

    <div style="max-width:900px; margin:-40px auto 0; padding:0 20px 80px; position:relative; z-index:2;">

        <!-- AI SUMMARY CARD -->
        <div style="background:white; border-radius:24px; padding:32px; margin-bottom:32px; box-shadow:0 20px 60px rgba(99,102,241,0.12); border:1px solid #e8e6ff;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
                <div style="width:40px; height:40px; background:linear-gradient(135deg,#6366f1,#a855f7); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">✨</div>
                <div>
                    <h2 style="margin:0; font-size:1.1rem; font-weight:800;">AI Profile Summary</h2>
                    <p style="margin:0; font-size:0.75rem; color:#64748b;">Synthesized from all your assessments</p>
                </div>
                ${results.length > 0 ? `
                <button onclick="loadAISummary(null, '${userName}')" style="margin-left:auto; background:linear-gradient(135deg,#6366f1,#a855f7); color:white; border:none; padding:8px 16px; border-radius:10px; font-size:0.75rem; font-weight:700; cursor:pointer;">↻ Refresh</button>` : ""}
            </div>
            <div id="summary-content">
                <div style="display:flex; align-items:center; gap:12px; color:#6366f1;">
                    <div style="width:20px; height:20px; border:2px solid #6366f1; border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite;"></div>
                    <span style="font-size:0.9rem; font-weight:600;">Generating your summary…</span>
                </div>
            </div>
        </div>

        <!-- TEST HISTORY -->
        <h2 style="font-size:0.85rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:#94a3b8; margin-bottom:16px;">Assessment History</h2>
        ${results.length === 0
            ? `<div style="background:white; border-radius:20px; padding:60px; text-align:center; color:#64748b;">
                <div style="font-size:3rem; margin-bottom:16px;">📭</div>
                <p>No tests taken yet. Start an assessment!</p>
               </div>`
            : results.map(r => buildTestCard(r)).join("")
        }
    </div>`;
}

function statBadge(value, label) {
    return `
    <div style="background:rgba(255,255,255,0.18); border:1px solid rgba(255,255,255,0.3); border-radius:16px; padding:16px 24px; min-width:120px;">
        <div style="font-size:1.8rem; font-weight:900;">${value}</div>
        <div style="font-size:0.7rem; font-weight:700; opacity:0.8; text-transform:uppercase; letter-spacing:0.06em;">${label}</div>
    </div>`;
}

function buildTestCard(r) {
    const date = new Date(r.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
    const score = r.overall_score;
    const scoreColor = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
    const breakdown = Array.isArray(r.breakdown) ? r.breakdown : [];

    return `
    <div style="background:white; border-radius:20px; padding:24px 28px; margin-bottom:14px; box-shadow:0 4px 20px rgba(0,0,0,0.06); border:1px solid #f0eeff;">
        <div style="display:flex; align-items:center; gap:16px;">
            <div style="flex:1;">
                <div style="font-weight:800; font-size:1rem; color:#1e293b;">${r.test_title}</div>
                <div style="font-size:0.78rem; color:#94a3b8; margin-top:3px;">📅 ${date} ${r.result_label ? `· <span style="background:#f3f0ff; color:#6366f1; padding:2px 10px; border-radius:20px; font-weight:700;">${r.result_label}</span>` : ""}</div>
            </div>
            ${score != null ? `
            <div style="width:52px; height:52px; border-radius:50%; border:3px solid ${scoreColor}; display:flex; align-items:center; justify-content:center; flex-direction:column; flex-shrink:0;">
                <span style="font-size:0.95rem; font-weight:900; color:${scoreColor};">${score}</span>
                <span style="font-size:0.5rem; color:${scoreColor}; font-weight:700;">%</span>
            </div>` : ""}
        </div>
        ${breakdown.length > 0 ? `
        <div style="margin-top:16px; padding-top:16px; border-top:1px solid #f0eeff;">
            ${breakdown.map(s => `
            <div style="margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
                    <span style="font-weight:600; color:#334155;">${s.name}</span>
                    <span style="font-weight:700; color:${(s.score||0) >= 70 ? "#10b981" : (s.score||0) >= 40 ? "#f59e0b" : "#ef4444"};">${s.score || 0}%</span>
                </div>
                <div style="height:7px; background:#ede9ff; border-radius:99px; overflow:hidden;">
                    <div style="height:100%; width:${s.score||0}%; background:${(s.score||0) >= 70 ? "#10b981" : (s.score||0) >= 40 ? "#f59e0b" : "#ef4444"}; border-radius:99px;"></div>
                </div>
            </div>`).join("")}
        </div>` : ""}
    </div>`;
}

// ============================================
// AI SUMMARY — CALLS GEMINI DIRECTLY
// ============================================
// ====================== AI SUMMARY - DIRECT GEMINI CALL ======================
async function callGeminiForSummary(results, userName) {
    if (!window.GEMINI_API_KEY) {
        return "AI summary configuration is missing. Check config.js";
    }

    const testData = results.map(r => `• ${r.test_title}: ${r.overall_score || "N/A"}% (${r.result_label || "Completed"})`).join("\n");

    const prompt = `You are an expert executive coach at People Assets.

User: ${userName}

Recent Assessments:
${testData}

Write a warm, professional summary in second person. Include strengths, growth areas, and one actionable next step. Keep under 280 words.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${window.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Summary is being generated...";
    } catch (err) {
        console.error("Gemini Error:", err);
        return "Your personalized AI summary is being prepared based on your assessments.";
    }
}

// ====================== UPDATED AI SUMMARY LOADER ======================
async function loadAISummary(email, userName) {
    const summaryEl = document.getElementById("summary-content");
    if (!summaryEl) return;

    summaryEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;color:var(--brand-indigo);">
            <div style="width:20px;height:20px;border:2px solid var(--brand-indigo);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
            <span>Generating your personalized summary...</span>
        </div>
    `;

    try {
        const { data: results } = await _supabase
            .from('test_results')
            .select('*')
            .eq('email', email)
            .order('created_at', { ascending: false });

        if (!results || results.length === 0) {
            summaryEl.innerHTML = `<p>No assessments found yet.</p>`;
            return;
        }

        const summaryText = await callGeminiForSummary(results, userName);

        summaryEl.innerHTML = `
            <div style="line-height:1.85; color:#1e293b; font-size:0.98rem;">
                ${summaryText.replace(/\n/g, '<br><br>')}
            </div>
            <p style="margin-top:24px; font-size:0.8rem; color:#64748b;">
                Generated from ${results.length} assessments • Updated just now
            </p>
        `;

    } catch (e) {
        console.error(e);
        summaryEl.innerHTML = `<p style="color:#ef4444;">Failed to generate summary. Please refresh.</p>`;
    }
}

// Make global
window.loadAISummary = loadAISummary;
window.renderProfilePage = renderProfilePage;