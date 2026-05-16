// ============================================
// PROFILE PAGE - CLEAN REBUILD
// ============================================

async function renderProfilePage() {
    const section = document.getElementById("profile");
    if (!section) return;

    // Check if user is logged in
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) {
        section.innerHTML = `
            <div class="container" style="padding:80px 20px; text-align:center;">
                <h2>Sign in to view your profile</h2>
                <p style="margin:20px 0; color:var(--text-muted);">Your test history and AI profile summary will appear here.</p>
                <button class="btn-primary" onclick="signInWithGoogle()">Sign in with Google</button>
            </div>
        `;
        return;
    }

    const userName = user.user_metadata?.full_name?.split(" ")[0] || "User";
    const userEmail = user.email;

    // Loading state
    section.innerHTML = `
        <div class="container" style="padding:60px 20px; text-align:center;">
            <p>Loading your profile...</p>
        </div>
    `;

    let results = [];
    try {
        const { data, error } = await _supabase
            .from('test_results')
            .select('*')
            .eq('email', userEmail)
            .order('created_at', { ascending: false });

        if (error) console.error("Fetch error:", error);
        else results = data || [];
    } catch (e) {
        console.error("Profile fetch failed:", e);
    }

    section.innerHTML = buildProfileHTML(userName, userEmail, results);

    // Generate / Update AI Summary
    if (results.length > 0) {
        generateProfileSummary(results, userName);
    }
}

// ====================== HTML BUILDER ======================
function buildProfileHTML(userName, userEmail, results) {
    const totalTests = results.length;
    const avgScore = totalTests > 0 
        ? Math.round(results.reduce((sum, r) => sum + (r.overall_score || 0), 0) / totalTests) 
        : 0;

    const uniqueTests = [...new Set(results.map(r => r.test_title))].length;

    return `
    <div class="container" style="max-width:1000px; padding:20px;">
        
        <!-- Hero -->
        <div style="background: linear-gradient(135deg, #6366f1, #a855f7); color:white; border-radius:24px; padding:50px 30px; margin-bottom:40px; text-align:center;">
            <h1 style="margin:0 0 8px 0; font-size:2.4rem;">Welcome back, ${userName}</h1>
            <p style="margin:0; opacity:0.9;">${userEmail}</p>
        </div>

        <!-- Stats -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px,1fr)); gap:20px; margin-bottom:40px;">
            <div style="background:white; padding:24px; border-radius:20px; box-shadow:0 4px 20px rgba(0,0,0,0.06); text-align:center;">
                <div style="font-size:2.5rem; font-weight:900;">${totalTests}</div>
                <div style="color:var(--text-muted);">Tests Taken</div>
            </div>
            <div style="background:white; padding:24px; border-radius:20px; box-shadow:0 4px 20px rgba(0,0,0,0.06); text-align:center;">
                <div style="font-size:2.5rem; font-weight:900;">${uniqueTests}</div>
                <div style="color:var(--text-muted);">Unique Assessments</div>
            </div>
            <div style="background:white; padding:24px; border-radius:20px; box-shadow:0 4px 20px rgba(0,0,0,0.06); text-align:center;">
                <div style="font-size:2.5rem; font-weight:900;">${avgScore}</div>
                <div style="color:var(--text-muted);">Average Score</div>
            </div>
        </div>

        <!-- AI Summary -->
        <div id="ai-summary-card" style="background:white; border-radius:24px; padding:32px; margin-bottom:40px; box-shadow:0 10px 30px rgba(99,102,241,0.1);">
            <h2 style="margin-top:0;">Your AI Profile Summary</h2>
            <div id="summary-content" style="min-height:120px;">
                <p style="color:var(--text-muted);">Analyzing your assessment data...</p>
            </div>
        </div>

        <!-- Test History -->
        <h2 style="margin-bottom:20px;">Your Assessment History</h2>
        <div id="test-history" style="display:flex; flex-direction:column; gap:16px;">
            ${results.length === 0 
                ? `<p style="text-align:center; padding:60px; background:white; border-radius:20px;">No tests taken yet. Start your first assessment!</p>`
                : results.map((r, i) => buildTestResultCard(r, i)).join('')}
        </div>
    </div>`;
}

// Individual Test Card
function buildTestResultCard(r, index) {
    const date = new Date(r.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
    const score = r.overall_score || 0;
    const color = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";

    return `
    <div style="background:white; border-radius:20px; padding:24px; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <h3 style="margin:0 0 6px 0;">${r.test_title}</h3>
                <p style="margin:0; color:var(--text-muted); font-size:0.9rem;">${date}</p>
            </div>
            <div style="text-align:center;">
                <div style="font-size:2rem; font-weight:900; color:${color};">${score}</div>
                <div style="font-size:0.75rem; color:${color};">Score</div>
            </div>
        </div>
    </div>`;
}

// Make functions global
window.renderProfilePage = renderProfilePage;