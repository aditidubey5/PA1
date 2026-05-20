// ============================================
// PROFILE PAGE - FINAL CLEAN VERSION
// ============================================

async function renderProfilePage() {
    const section = document.getElementById("profile");
    if (!section) return;

    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) {
        section.innerHTML = `<div style="padding:100px;text-align:center;"><h2>Please sign in</h2></div>`;
        return;
    }

    const userName = user.user_metadata?.full_name?.split(" ")[0] || "User";
    const userEmail = user.email;

    // Fetch results
    const { data: results = [] } = await _supabase
        .from('test_results')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false });

    section.innerHTML = buildProfileHTML(userName, userEmail, results);

    // Generate AI Summary
    if (results.length > 0) {
        loadAISummary(userEmail, userName);
    }
}

function buildProfileHTML(userName, userEmail, results) {
    const totalTests = results.length;
    const avgScore = totalTests > 0 
        ? Math.round(results.reduce((sum, r) => sum + (r.overall_score || 0), 0) / totalTests) 
        : 0;

    return `
    <div class="container" style="max-width:1100px; padding:30px 20px;">
        <div style="background: linear-gradient(135deg, #6366f1, #a855f7); color:white; border-radius:24px; padding:50px 30px; margin-bottom:40px; text-align:center;">
            <h1 style="margin:0 0 8px 0; font-size:2.5rem;">Welcome back, ${userName}</h1>
            <p style="margin:0; opacity:0.9;">${userEmail}</p>
        </div>

        <!-- Stats -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px,1fr)); gap:20px; margin-bottom:50px;">
            <div style="background:white; padding:28px; border-radius:20px; text-align:center; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
                <div style="font-size:3rem; font-weight:900;">${totalTests}</div>
                <div style="color:#64748b;">Tests Taken</div>
            </div>
            <div style="background:white; padding:28px; border-radius:20px; text-align:center; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
                <div style="font-size:3rem; font-weight:900;">${avgScore}</div>
                <div style="color:#64748b;">Average Score</div>
            </div>
        </div>

        <!-- AI Summary -->
        <div style="background:white; border-radius:24px; padding:32px; margin-bottom:50px; box-shadow:0 10px 30px rgba(99,102,241,0.1);">
            <h2>Your AI Profile Summary</h2>
            <div id="summary-content">
                <p style="color:#64748b;">Analyzing your assessments…</p>
            </div>
        </div>

        <!-- Test History - Detailed Version -->
        <h2 style="margin-bottom:20px;">Assessment History</h2>
        <div style="display:flex; flex-direction:column; gap:16px;">
            ${results.length === 0 
                ? `<p style="text-align:center; padding:80px; background:white; border-radius:20px; color:#64748b;">No tests taken yet.</p>`
                : results.map((r, i) => buildTestResultCard(r, i)).join('')}
        </div>
    </div>`;
}

// Detailed Test Card with Breakdown (the one you liked)
function buildTestResultCard(r, index) {
    const date = new Date(r.created_at).toLocaleDateString('en-IN');
    const score = r.overall_score ?? null;
    const breakdown = r.breakdown || [];

    return `
    <div style="background:white; padding:24px; border-radius:20px; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
                <strong>${r.test_title}</strong><br>
                <small style="color:#64748b;">${date}</small>
            </div>
            <div style="font-size:2.2rem; font-weight:900; color:#10b981;">${score || '-'}</div>
        </div>
        
        ${breakdown.length > 0 ? `
        <div style="margin-top:12px;">
            ${breakdown.map(sec => `
                <div style="margin-bottom:10px;">
                    <div style="display:flex;justify-content:space-between;font-size:0.9rem;">
                        <span>${sec.name}</span>
                        <span style="font-weight:700;">${sec.score}%</span>
                    </div>
                </div>
            `).join('')}
        </div>` : ''}
    </div>`;
}

// Direct Gemini Call
async function loadAISummary(email, userName) {
    const summaryEl = document.getElementById("summary-content");
    if (!summaryEl) return;

    summaryEl.innerHTML = `<p style="color:var(--brand-indigo);">Generating your personalized summary...</p>`;

    try {
        const { data: results } = await _supabase
            .from('test_results')
            .select('*')
            .eq('email', email)
            .order('created_at', { ascending: false });

        const summaryText = await callGeminiForSummary(results, userName);

        summaryEl.innerHTML = `
            <div style="line-height:1.8; color:#1e293b;">
                ${summaryText.replace(/\n/g, '<br><br>')}
            </div>
        `;
    } catch (e) {
        console.error(e);
        summaryEl.innerHTML = `<p style="color:#ef4444;">Failed to generate summary.</p>`;
    }
}

window.renderProfilePage = renderProfilePage;
window.loadAISummary = loadAISummary;