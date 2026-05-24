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

    const userImage = user.user_metadata?.avatar_url || "";
    const userName = user.user_metadata?.full_name || "User";

    // Inject the profile menu into EVERY container found
    authContainers.forEach((container) => {
      container.innerHTML = `
        <div class="user-profile-menu" onclick="toggleSignOut(event)" style="position:relative; cursor:pointer; display:flex; align-items:center; gap:8px;">
            <img src="${userImage}" alt="${userName}" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--primary);">
            <div class="signout-dropdown" style="display:none; position:absolute; top:40px; right:0; background:white; box-shadow:var(--shadow-card); border-radius:8px; padding:8px; min-width:120px; z-index:100;">
                <button onclick="handleLogout()" style="background:none; border:none; color:red; width:100%; text-align:left; padding:4px 0; display:block; margin-top:4px; cursor:pointer;">Sign Out</button>
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
