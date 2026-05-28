// ============================================
// IDENTITY & AUTHENTICATION MODULE (auth.js)
// ============================================

_supabase.auth.onAuthStateChange(async (event, session) => {
  // 1. Catch BOTH query parameters (?) and hashes (#) to stop the infinite loop
  const url = new URL(window.location.href);
  if (url.searchParams.has("error") || window.location.hash.includes("error")) {
    window.history.replaceState(
      null,
      null,
      window.location.origin + window.location.pathname,
    );
    // We wipe the URL cleanly, but DO NOT return/reload so the buttons still render below!
  }

  const user = session?.user;
  const authContainers = document.querySelectorAll(".auth-container");
  const authModal = document.getElementById("auth-modal");

  if (user) {
    if (authModal) authModal.style.display = "none";

    if (event === "SIGNED_IN" && !sessionStorage.getItem("toast_shown")) {
      const toast = document.getElementById("login-toast");
      if (toast) {
        toast.classList.add("show");
        sessionStorage.setItem("toast_shown", "true");
        setTimeout(() => toast.classList.remove("show"), 4000);
      }
    }

    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }

    const userImage =
      user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=User";
    const userName = user.user_metadata?.full_name || "User";

    authContainers.forEach((container) => {
      container.innerHTML = `
        <div class="user-profile-menu" onclick="toggleSignOut(event)" style="position:relative; cursor:pointer; display:flex; align-items:center; justify-content:center;">
            <img src="${userImage}" alt="${userName}" style="width:36px; height:36px; border-radius:50%; border:2px solid #6366f1; display:block; object-fit:cover;">
            <div class="signout-dropdown" style="display:none; position:absolute; top:48px; right:0; background:white; box-shadow:0 8px 32px rgba(0,0,0,0.12); border-radius:14px; padding:14px; min-width:180px; z-index:10000; border:1px solid #f0eeff;">
                <p style="font-size:0.75rem; font-weight:800; color:#1e293b; margin:0 0 10px; padding-bottom:8px; border-bottom:1px solid #eee;">${userName}</p>
                <button onclick="goToProfile()" style="color:#6366f1; background:none; border:none; font-weight:700; cursor:pointer; width:100%; text-align:left; font-size:0.82rem; padding:5px 0; display:block;">👤 My Profile</button>
                <button onclick="handleLogout()" style="color:#ef4444; background:none; border:none; font-weight:700; cursor:pointer; width:100%; text-align:left; font-size:0.82rem; padding:5px 0; display:block; margin-top:4px;">Sign Out</button>
            </div>
        </div>
      `;
    });
  } else {
    sessionStorage.removeItem("toast_shown");

    // Inject the Google Sign-In button into EVERY container found
    authContainers.forEach((container) => {
      container.innerHTML = `
        <button class="login-google-btn" onclick="signInWithGoogle()">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google">
            Sign in
        </button>
      `;
    });
  }
});

// Update the toggle function to handle multiple dropdowns cleanly

// Works on both index.html (SPA) and blog.html (separate page)
function goToProfile() {
  if (typeof showPage === "function") {
    showPage("profile");
  } else {
    window.location.href = "/?page=profile";
  }
}

async function signInWithGoogle() {
  console.log("📍 1. Google Sign-In button was clicked!");

  const { data, error } = await _supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin },
  });

  if (error) {
    console.error("🚨 2. Supabase threw an error:", error.message);
  } else {
    console.log(
      "✅ 2. Supabase sign-in triggered successfully. Redirecting...",
      data,
    );
  }
}

async function handleLogout() {
  await _supabase.auth.signOut();
  sessionStorage.removeItem("login_notified");
  window.location.reload();
}

function toggleSignOut(event) {
  if (event) event.stopPropagation();
  const clickedMenu = event.currentTarget;
  const dd = clickedMenu.querySelector(".signout-dropdown");
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
