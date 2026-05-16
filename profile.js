// ============================================
// CLEAN PROFILE PAGE v2
// ============================================

async function renderProfilePage() {
    const section = document.getElementById("profile");
    if (!section) return;

    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) {
        section.innerHTML = `
            <div class="container" style="padding:100px 20px; text-align:center;">
                <h2>Sign in to view your profile</h2>
                <button class="btn-primary" onclick="signInWithGoogle()" style="margin-top:20px;">Sign in with Google</button>
            </div>`;
        return;
    }

    const userName = user.user_metadata?.full_name?.split(" ")[0] || "User";
    const userEmail = user.email;

    section.innerHTML = `<div class="container" style="padding:80px 20px;text-align:center;">Loading your profile...</div>`;

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
}

// HTML Builder
function buildProfileHTML(userName, userEmail, results) {
    const total = results.length;
    const avg = total ? Math.round(results.reduce((a, r) => a + (r.overall_score || 0), 0) / total) : 0;

    let historyHTML = results.map(r => `
        <div style="background:white; padding:20px; border-radius:16px; margin-bottom:16px; box-shadow:0 2px 10px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between;">
                <div>
                    <strong>${r.test_title}</strong><br>
                    <small style="color:#64748b;">${new Date(r.created_at).toLocaleDateString('en-IN')}</small>
                </div>
                <div style="text-align:right; font-size:1.4rem; font-weight:800; color:#10b981;">
                    ${r.overall_score || '-'}%
                </div>
            </div>
        </div>
    `).join('');

    if (total === 0) historyHTML = `<p style="text-align:center; padding:60px; color:#64748b;">No tests taken yet.</p>`;

    return `
    <div class="container" style="max-width:1000px; padding:40px 20px;">
        <h1 style="text-align:center; margin-bottom:8px;">Welcome back, ${userName}</h1>
        <p style="text-align:center; color:#64748b; margin-bottom:40px;">${userEmail}</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px,1fr)); gap:20px; margin-bottom:50px;">
            <div style="background:white; padding:28px; border-radius:20px; text-align:center; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
                <div style="font-size:2.8rem; font-weight:900;">${total}</div>
                <div style="color:#64748b;">Tests Taken</div>
            </div>
            <div style="background:white; padding:28px; border-radius:20px; text-align:center; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
                <div style="font-size:2.8rem; font-weight:900;">${avg}%</div>
                <div style="color:#64748b;">Average Score</div>
            </div>
        </div>

        <h2 style="margin-bottom:20px;">Your Assessment History</h2>
        <div style="display:flex; flex-direction:column; gap:12px;">
            ${historyHTML}
        </div>
    </div>`;
}

// Make available globally
window.renderProfilePage = renderProfilePage;