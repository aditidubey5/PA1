// ============================================
// IDENTITY & AUTHENTICATION MODULE (auth.js)
// ============================================

_supabase.auth.onAuthStateChange(async (event, session) => {
  // 1. SAFEGUARD: If the URL contains an authentication error, clean it instantly
  if (
    window.location.hash &&
    (window.location.hash.includes("error") ||
      window.location.hash.includes("unsupported_otp"))
  ) {
    window.history.replaceState(
      null,
      null,
      window.location.origin + window.location.pathname,
    );
    window.location.reload();
    return;
  }

  const user = session?.user;
  const authContainer = document.getElementById("auth-container");
  const authModal = document.getElementById("auth-modal");
  if (user) {
    // Hide the Welcome Modal
    if (authModal) authModal.style.display = "none";

    // Success Toast
    if (event === "SIGNED_IN" && !sessionStorage.getItem("toast_shown")) {
      const toast = document.getElementById("login-toast");
      if (toast) {
        toast.classList.add("show");
        sessionStorage.setItem("toast_shown", "true");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 4000);
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
                <div class="user-profile-menu" onclick="toggleSignOut(event)" style="position:relative; cursor:pointer; display:flex; align-items:center; gap:8px;">
                    <img src="${userImage}" alt="${userName}" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--primary);">
                    <div id="signout-dropdown" style="display:none; position:absolute; top:40px; right:0; background:white; box-shadow:var(--shadow-card); border-radius:8px; padding:8px; min-width:120px; z-index:100;">
                        <button onclick="handleLogout()" style="background:none; border:none; color:red; width:100%; text-align:left; padding:4px 0; display:block; margin-top:4px; cursor:pointer;">Sign Out</button>
                    </div>
                </div>
            `;
    }
  } else {
    // Safely clear your toast indicator
    sessionStorage.removeItem("toast_shown");
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
    provider: "google",
    options: { redirectTo: window.location.origin },
  });
}

async function handleLogout() {
  await _supabase.auth.signOut();
  sessionStorage.removeItem("login_notified");
  window.location.reload();
}

function toggleSignOut(event) {
  if (event) event.stopPropagation();
  const dd = document.getElementById("signout-dropdown");
  if (dd) dd.style.display = dd.style.display === "none" ? "block" : "none";
}

function closeAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
  sessionStorage.setItem("auth_popup_closed", "true");
}

// Global Click Listener: Close dropdown when clicking away
window.addEventListener("click", () => {
  const dropdown = document.getElementById("signout-dropdown");
  if (dropdown && dropdown.style.display === "block") {
    dropdown.style.display = "none";
  }
});
