// ============================================
// IDENTITY & AUTHENTICATION MODULE (auth.js)
// ============================================

_supabase.auth.onAuthStateChange(async (event, session) => {
    const user = session?.user;
    const authContainer = document.getElementById("auth-container");
    const authModal = document.getElementById("auth-modal");

    if (user) {
        // Hide the Welcome Modal
        if (authModal) authModal.style.display = "none";

        // Success Toast
        if (event === 'SIGNED_IN' && !sessionStorage.getItem('toast_shown')) {
            const toast = document.getElementById("login-toast");
            if (toast) {
                toast.classList.add("show");
                sessionStorage.setItem('toast_shown', 'true');
                setTimeout(() => { toast.classList.remove("show"); }, 4000);
            }
        }

        // Clean URL tokens
        if (window.location.hash) {
            window.history.replaceState(null, null, window.location.pathname);
        }

        // Show Profile Icon
        const userImage = user.user_metadata.avatar_url;
        const userName = user.user_metadata.full_name;
        
        if (authContainer) {
            authContainer.innerHTML = `
                <div class="user-profile-menu" onclick="toggleSignOut(event)" style="position:relative; cursor:pointer; display:flex; align-items:center; justify-content:center; margin-left:15px;">
                    <img src="${userImage}" style="width:36px; height:36px; border-radius:50%; border:2px solid var(--brand-indigo); display:block;" alt="Profile">
                    <div id="signout-dropdown" style="display:none; position:absolute; top:48px; right:0; background:white; padding:14px; border-radius:14px; box-shadow:var(--shadow-card); min-width:180px; z-index:10000;">
                        <p style="font-size:0.75rem; font-weight:800; color:var(--text-primary); margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:8px;">${userName}</p>
                        <button onclick="showPage('profile')" style="color:var(--brand-indigo); background:none; border:none; font-weight:700; cursor:pointer; width:100%; text-align:left; font-size:0.82rem; padding:4px 0; display:block;">👤 My Profile</button>
                        <button onclick="handleLogout()" style="color:#ef4444; background:none; border:none; font-weight:700; cursor:pointer; width:100%; text-align:left; font-size:0.82rem; padding:4px 0; display:block; margin-top:4px;">Sign Out</button>
                    </div>
                </div>
            `;
        }
    } else {
        sessionStorage.removeItem('toast_shown');
        if (authContainer) {
            authContainer.innerHTML = `
                <button class="login-google-btn" onclick="signInWithGoogle()">
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google">
                    Sign in
                </button>
            `;
        }
    }
});

async function signInWithGoogle() {
    await _supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
    });
}

async function handleLogout() {
    await _supabase.auth.signOut();
    sessionStorage.removeItem('login_notified');
    window.location.reload();
}

function toggleSignOut(event) {
    if (event) event.stopPropagation();
    const dd = document.getElementById("signout-dropdown");
    if (dd) dd.style.display = dd.style.display === "none" ? "block" : "none";
}

function closeAuthModal() {
    document.getElementById("auth-modal").style.display = "none";
    sessionStorage.setItem('auth_popup_closed', 'true');
}

// Global Click Listener: Close dropdown when clicking away
window.addEventListener('click', () => {
    const dropdown = document.getElementById("signout-dropdown");
    if (dropdown && dropdown.style.display === "block") {
        dropdown.style.display = "none";
    }
});