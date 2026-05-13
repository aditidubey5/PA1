// ============================================
// PROFILE PAGE LOGIC
// ============================================

let userResults = [];

async function loadProfile() {
    const profileSection = document.getElementById("profile");
    if (!profileSection) return;

    const { data: { user } } = await _supabase.auth.getUser();
    
    if (!user) {
        profileSection.innerHTML = `
            <div class="container" style="text-align:center; padding:80px 20px;">
                <h2>Please sign in to view your profile</h2>
                <button class="btn-primary" onclick="signInWithGoogle()" style="margin-top:20px;">
                    Sign in with Google
                </button>
            </div>
        `;
        return;
    }

    // Fetch user's test results
    const { data, error } = await _supabase
        .from('test_results')
        .select('*')
        .eq('email', user.email)
        .order('completed_at', { ascending: false });

    if (error) {
        console.error("Profile fetch error:", error);
        profileSection.innerHTML = `<div class="container"><p>Error loading results. Please try again.</p></div>`;
        return;
    }

    userResults = data || [];

    renderProfilePage(user, userResults);
}

function renderProfilePage(user, results) {
    const section = document.getElementById("profile");
    
    let html = `
        <div class="container">
            <div style="text-align:center; margin-bottom:40px;">
                <img src="${user.user_metadata.avatar_url}" style="width:80px; height:80px; border-radius:50%; border:3px solid var(--brand-indigo);">
                <h1 style="margin:16px 0 8px 0;">${user.user_metadata.full_name || 'Your Profile'}</h1>
                <p style="color:var(--text-muted);">${user.email}</p>
            </div>

            <p class="section-label">YOUR GROWTH SUMMARY</p>
    `;

    if (results.length === 0) {
        html += `
            <div style="background:white; padding:60px 20px; border-radius:20px; text-align:center;">
                <h2>You haven't taken any assessments yet</h2>
                <button class="btn-primary" onclick="showPage('tests')" style="margin-top:20px;">
                    Start Your First Assessment →
                </button>
            </div>
        `;
    } else {
        // Overall Summary
        const avgScore = Math.round(results.reduce((sum, r) => sum + (r.overall_score || 0), 0) / results.length);
        
        html += `
            <div style="background:white; padding:32px; border-radius:20px; margin-bottom:40px; text-align:center;">
                <h2 style="margin:0 0 8px 0;">Average Score: <span style="color:var(--brand-indigo); font-size:2.2rem;">${avgScore}</span>/100</h2>
                <p style="color:var(--text-muted); max-width:500px; margin:0 auto;">
                    You've completed <strong>${results.length}</strong> assessments. Keep going!
                </p>
            </div>

            <p class="section-label">YOUR RESULTS</p>
            <div class="test-grid">
        `;

        results.forEach(result => {
            html += `
                <div class="card" onclick="viewPastReport('${result.test_id}')" style="cursor:pointer;">
                    <div style="font-size:2rem; margin-bottom:12px;">${getTestIcon(result.test_id)}</div>
                    <h3>${result.test_title}</h3>
                    <p style="margin:12px 0;"><strong style="color:${result.overall_score >= 70 ? '#10b981' : result.overall_score >= 45 ? '#f59e0b' : '#ef4444'}">
                        ${result.result_label}
                    </strong></p>
                    <p style="font-size:1.1rem; font-weight:800; color:var(--brand-indigo);">${result.overall_score}%</p>
                    <small style="color:var(--text-muted);">${new Date(result.completed_at).toLocaleDateString('en-IN')}</small>
                </div>
            `;
        });

        html += `</div>`;
    }

    html += `</div>`;
    section.innerHTML = html;
}

// Helper to show nice icons
function getTestIcon(testId) {
    const icons = {
        GrowthMindset: "🌱",
        AIusage: "💡",
        MartyrIndex: "⚖️",
        ProcrastinationBlueprint: "⏱️",
        SignalNoise: "📡",
        disc: "🎯",
        bigfive: "🧠",
        EmotionalIntelligence: "❤️",
        Hardworking: "🔨",
        loneliness: "🫂",
        listeningIntelligence: "👂",
        attachment: "❤️",
        leadershipMindset: "🧠",
        leadershipOrientation: "🧭",
        AmbitionMindset: "🔥",
        AmbitionOrientation: "🧭",
        StressResilience: "🌊",
        EgoProfile: "🛡️",
        HarmonyVsImpactQuotient: "🤝",
        PefectionismIndex: "📐",
    };
    return icons[testId] || "📊";
}

// View past report
window.viewPastReport = function(testId) {
    const result = userResults.find(r => r.test_id === testId);
    if (!result) return;

    // Store temporarily and go to report page
    window.lastReportResult = {
        overall: result.overall_score,
        overallLabel: result.result_label,
        sectionResults: result.section_breakdown || []
    };
    window.currentTest = { title: result.test_title, id: result.test_id };

    showPage('report');
    // Optional: auto-render the saved report
    setTimeout(() => {
        if (typeof renderSavedReport === 'function') renderSavedReport(result);
    }, 300);
};



window.loadProfile = loadProfile;