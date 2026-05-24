document.addEventListener("DOMContentLoaded", () => {
  // --- NEW LOGIN LOGIC ---
  async function loginAdmin() {
    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;
    const loginBtn = document.getElementById("login-btn");
    const errorMsg = document.getElementById("login-error");

    loginBtn.textContent = "Verifying...";
    errorMsg.style.display = "none";

    // Call Supabase to authenticate
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      errorMsg.textContent = error.message;
      errorMsg.style.display = "block";
      loginBtn.textContent = "Log In";
    } else {
      // Success! Hide login, show the publishing form
      document.getElementById("login-section").style.display = "none";
      document.getElementById("publish-form").style.display = "block";
    }
  }

  // --- EXISTING SESSION CHECK ---
  // Optional but recommended: Check if already logged in when page loads
  document.addEventListener("DOMContentLoaded", async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // If already logged in from a previous visit, skip the login screen
      document.getElementById("login-section").style.display = "none";
      document.getElementById("publish-form").style.display = "block";
    }

    const publishForm = document.getElementById("publish-form");
    publishForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Stop the page from reloading

      const submitBtn = document.getElementById("submit-btn");
      const statusMsg = document.getElementById("status-message");

      // Put the button in a loading state
      submitBtn.textContent = "Publishing...";
      submitBtn.disabled = true;

      // 1. Gather all data from the form
      const title = document.getElementById("title").value;
      const category = document.getElementById("category").value;
      const read_time = document.getElementById("read_time").value;
      const image_url = document.getElementById("image_url").value;
      const excerpt = document.getElementById("excerpt").value;
      const content = document.getElementById("content").value;

      // 2. Automatically generate a URL-friendly slug from the title
      // "The Blind Spots!" -> "the-blind-spots"
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      try {
        // 3. Send the data payload directly to the Supabase 'blogs' table
        const { data, error } = await supabase.from("blogs").insert([
          {
            title: title,
            slug: slug,
            category: category,
            read_time: read_time,
            image_url: image_url,
            excerpt: excerpt,
            content: content,
          },
        ]);

        if (error) throw error;

        // 4. Show success and reset form
        showStatus(
          "Successfully published! View it on your blog page.",
          "success",
        );
        publishForm.reset();
      } catch (error) {
        console.error("Publishing error:", error.message);

        // Check if it's a duplicate slug error (someone already used this title)
        if (error.code === "23505") {
          showStatus(
            "Error: A post with a similar title already exists.",
            "error",
          );
        } else {
          showStatus(`Error: ${error.message}`, "error");
        }
      } finally {
        // Restore button state
        submitBtn.textContent = "Publish to Blog ✨";
        submitBtn.disabled = false;
      }
    });
  });
});

// Helper function to show clean status banners
function showStatus(message, type) {
  const statusMsg = document.getElementById("status-message");
  statusMsg.textContent = message;
  statusMsg.className = type; // Applies the .success or .error CSS classes
  statusMsg.style.display = "block";

  // Auto-hide the message after 5 seconds
  setTimeout(() => {
    statusMsg.style.display = "none";
  }, 5000);
}
