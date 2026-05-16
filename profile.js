// ============================================
// PROFILE PAGE - LONG-TERM CLEAN VERSION
// ============================================

async function renderProfilePage() {
    const section = document.getElementById("profile");
    if (!section) return;

    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) {
        section.innerHTML = `
            <div class="container" style="padding:100px 20px; text-align:center;">
                <h2>Sign in to view your Growth Dashboard</h2>
                <button class="btn-primary" onclick="signInWithGoogle()" style="margin-top:20px;">Sign in with Google</button>
            </div>`;
        return;
    }

    const userName = user.user_metadata?.full_name?.split(" ")[0] || "User";
    const userEmail = user.email;

    section.innerHTML = `<div class="container" style="padding:80px 20px;text-align:center;">Loading your profile...</div>`;

    // Fetch test results
    let results = [];
    try {
        const { data, error } = await _supabase
            .from('test_results')
            .select('*')
            .eq('email', userEmail)
            .order('created_at', { ascending: false });

        if (error) console.error(error);
        else results = data || [];
    } catch (e) {
        console.error(e);
    }

    section.innerHTML = buildProfileHTML(userName, userEmail, results);

    // Load AI Summary
    if (results.length > 0) {
        loadAISummary(userEmail, userName);
    }
}

// ====================== MAIN HTML BUILDER ======================
function buildProfileHTML(userName, userEmail, results) {
    const totalTests = results.length;
    const avgScore = totalTests > 0 
        ? Math.round(results.reduce((sum, r) => sum + (r.overall_score || 0), 0) / totalTests) 
        : 0;

    return `
    <div class="container" style="max-width:1100px; padding:30px 20px;">
        <!-- Header -->
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
        <div id="ai-summary-card" style="background:white; border-radius:24px; padding:32px; margin-bottom:50px; box-shadow:0 10px 30px rgba(99,102,241,0.1); min-height:180px;">
            <h2 style="margin-top:0;">Your AI Profile Summary</h2>
            <div id="summary-content">
                <p style="color:#64748b;">Analyzing your assessment data...</p>
            </div>
        </div>

        <!-- Test History -->
        <h2 style="margin-bottom:20px;">Assessment History</h2>
        <div style="display:flex; flex-direction:column; gap:16px;">
            ${results.length === 0 
                ? `<p style="text-align:center; padding:80px; background:white; border-radius:20px; color:#64748b;">No tests taken yet. Start your first assessment!</p>`
                : results.map(r => buildTestCard(r)).join('')}
        </div>
    </div>`;
}

function buildTestCard(r) {
    const date = new Date(r.created_at).toLocaleDateString('en-IN');
    return `
    <div style="background:white; padding:24px; border-radius:20px; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <strong>${r.test_title}</strong><br>
                <small style="color:#64748b;">${date}</small>
            </div>
            <div style="font-size:2rem; font-weight:900; color:#10b981;">${r.overall_score || '-'}</div>
        </div>
    </div>`;
}

// Load AI Summary
async function loadAISummary(email, userName) {
    const summaryEl = document.getElementById("summary-content");
    if (!summaryEl) return;

    try {
        const { data } = await _supabase
            .from('user_profiles')
            .select('ai_summary')
            .eq('email', email)
            .single();

        if (data && data.ai_summary) {
            summaryEl.innerHTML = `<p style="line-height:1.8; color:#1e293b;">${data.ai_summary}</p>`;
        } else {
            summaryEl.innerHTML = `<p style="color:#64748b;">Generating your personalized summary...</p>`;
            // Trigger generation
            if (typeof updateAIProfileSummary === "function") updateAIProfileSummary();
        }
    } catch (e) {
        console.error(e);
    }
}

// Make global
window.renderProfilePage = renderProfilePage;