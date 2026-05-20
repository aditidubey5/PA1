// ============================================
// PROFILE DASHBOARD & AI SUMMARY (profile.js)
// ============================================

async function renderProfilePage() {
    const section = document.getElementById("profile");
    if (!section) return;

    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) {
        section.innerHTML = `
            <div style="min-height:60vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; padding:40px;">
                <div style="font-size:3rem;">🔒</div>
                <h2 style="font-weight:800; color:var(--text-primary);">Sign in to view your profile</h2>
                <p style="color:var(--text-muted); text-align:center; max-width:380px;">Your test history, reports, and AI-powered profile summary are waiting for you.</p>
                <button class="btn-primary" onclick="signInWithGoogle()">Sign in with Google</button>
            </div>
        `;
        return;
    }

    const userName = user.user_metadata?.full_name || "Learner";
    const userAvatar = user.user_metadata?.avatar_url || "";
    const userEmail = user.email || "";

    section.innerHTML = `<div style="text-align:center; padding:100px;"><p>Loading profile...</p></div>`;

    const { data: results = [] } = await _supabase
        .from('test_results')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false });

    section.innerHTML = buildProfileHTML(user, userName, userAvatar, userEmail, results);

    if (results.length > 0) {
        loadAISummary(results, userName);
    }
}

function buildProfileHTML(user, userName, userAvatar, userEmail, results) {
    const totalTests = results.length;
    const uniqueTests = [...new Set(results.map(r => r.test_title))].length;
    const avgScore = totalTests > 0 ? Math.round(results.reduce((a, r) => a + (r.overall_score || 0), 0) / totalTests) : "—";

    return `
    <div style="background: linear-gradient(135deg, #6366f1 0%, #d946ef 60%, #f59e0b 100%); padding: 60px 20px 100px; position: relative;">
        <div class="container" style="max-width:960px; position:relative; z-index:1;">
            <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
                ${userAvatar ? `<img src="${userAvatar}" style="width:80px;height:80px;border-radius:50%;border:4px solid rgba(255,255,255,0.6);">` : `<div>👤</div>`}
                <div>
                    <h1 style="color:white;font-size:clamp(1.6rem,4vw,2.4rem);font-weight:900;margin:0 0 4px;">${userName}</h1>
                    <p style="color:rgba(255,255,255,0.65);font-size:0.85rem;margin:0;">${userEmail}</p>
                </div>
            </div>
            <div style="display:flex;gap:20px;margin-top:36px;flex-wrap:wrap;">
                <div style="background:rgba(255,255,255,0.15); backdrop-filter:blur(10px); border-radius:16px; padding:18px 24px; min-width:140px; color:white;">
                    <div style="font-size:1.6rem;font-weight:900;">${totalTests}</div>
                    <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;">Tests Taken</div>
                </div>
                <div style="background:rgba(255,255,255,0.15); backdrop-filter:blur(10px); border-radius:16px; padding:18px 24px; min-width:140px; color:white;">
                    <div style="font-size:1.6rem;font-weight:900;">${avgScore}${avgScore !== "—" ? "%" : ""}</div>
                    <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;">Avg Score</div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" style="max-width:960px; margin-top:-40px; position:relative; z-index:2; padding-bottom:80px;">
        <div style="background:white; border-radius:24px; box-shadow:0 20px 60px rgba(99,102,241,0.12); padding:36px; margin-bottom:32px;">
            <h2 style="font-size:1.1rem;font-weight:800;color:var(--text-primary);margin-bottom:20px;">✨ AI Profile Summary</h2>
            <div id="summary-content">
                ${results.length === 0 ? `<p style="color:var(--text-muted);">Take an assessment to generate your AI summary.</p>` : `<p style="color:var(--brand-indigo);">Analyzing your assessments...</p>`}
            </div>
        </div>

        <h2 style="font-size:1rem;font-weight:800;text-transform:uppercase;color:var(--text-muted);margin-bottom:20px;">Test History</h2>
        ${results.length === 0 ? `<div style="text-align:center;padding:50px;background:white;border-radius:20px;"><p>No tests taken yet.</p></div>` : results.map((r, i) => buildTestResultCard(r, i)).join("")}
    </div>
    `;
}

function buildTestResultCard(r, index) {
    const date = new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const score = r.overall_score ?? null;
    const breakdown = r.breakdown || [];
    const detailId = `result-detail-${index}`;

    return `
    <div style="background:white; border-radius:20px; box-shadow:0 4px 20px rgba(0,0,0,0.06); margin-bottom:16px; border:1px solid #f0eeff;">
        <div style="padding:24px 28px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="toggleResultDetail('${detailId}')">
            <div>
                <h3 style="margin:0 0 4px;font-size:1rem;font-weight:800;">${r.test_title}</h3>
                <span style="font-size:0.75rem;color:var(--text-muted);">📅 ${date}</span>
            </div>
            <div style="font-size:1.5rem;font-weight:900;color:var(--brand-indigo);">${score !== null ? score + '%' : ''} ▾</div>
        </div>
        <div id="${detailId}" style="display:none; border-top:1px solid #f0eeff; padding:24px 28px; background:#faf9ff;">
            ${breakdown.map(sec => `
                <div style="margin-bottom:12px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:0.85rem;font-weight:700;">
                        <span>${sec.name}</span><span>${sec.score}%</span>
                    </div>
                    <div style="height:8px;background:#ede9ff;border-radius:99px;overflow:hidden;">
                        <div style="height:100%;width:${sec.score}%;background:var(--brand-indigo);"></div>
                    </div>
                </div>
            `).join("")}
        </div>
    </div>
    `;
}

function toggleResultDetail(detailId) {
    const el = document.getElementById(detailId);
    if (el) el.style.display = el.style.display === "none" ? "block" : "none";
}

async function loadAISummary(results, userName) {
    const summaryEl = document.getElementById("summary-content");
    if (!window.GEMINI_API_KEY) {
        summaryEl.innerHTML = `<p style="color:#ef4444;">API Key missing in config.js.</p>`;
        return;
    }

    const testData = results.map(r => `• ${r.test_title}: ${r.overall_score || "N/A"}%`).join("\n");
    const prompt = `You are an expert executive coach. User: ${userName}. Assessments: ${testData}. Write a warm, professional summary in second person. Include 2 key strengths, 1 growth area, and 1 actionable next step. Keep under 200 words.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${window.GEMINI_API_KEY}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate.";
        summaryEl.innerHTML = `<div style="line-height:1.8; color:#1e293b;">${text.replace(/\n/g, '<br>')}</div>`;
    } catch (err) {
        summaryEl.innerHTML = `<p style="color:#ef4444;">Failed to fetch AI summary.</p>`;
    }
}