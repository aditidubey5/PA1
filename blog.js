// ==========================================================================
// PEOPLE ASSETS - COMPREHENSIVE BLOG HUB ENGINE
// ==========================================================================

// Global variable to hold our data so we don't have to re-fetch from Supabase
let allPosts = [];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize event listeners for category clicks
  setupCategoryFilters();

  // 2. Pull down records and process optional incoming report category routes
  fetchBlogPosts().then(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("cat");

    if (catParam) {
      // Find the button that matches the incoming category text strings
      const filterButtons = document.querySelectorAll(
        ".category-btn, .filter-pill",
      );
      let matchingButton = null;

      filterButtons.forEach((btn) => {
        if (btn.textContent.trim().toLowerCase() === catParam.toLowerCase()) {
          matchingButton = btn;
        }
      });

      if (matchingButton) {
        // Clear active styles from all buttons, highlight the matched one
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        matchingButton.classList.add("active");

        // Filter array data locally
        const filteredPosts = allPosts.filter(
          (post) => post.category.toLowerCase() === catParam.toLowerCase(),
        );
        renderPosts(filteredPosts);
      }
    }
  });
});

async function fetchBlogPosts() {
  try {
    // Connects using your global instance client token
    const { data: posts, error } = await _supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    allPosts = posts || [];
    renderPosts(allPosts);
  } catch (err) {
    console.error("Error fetching blog assets:", err.message);
  }
}

function renderPosts(postsToRender) {
  // Target class selector match fallbacks
  const featuredContainer =
    document.querySelector(".featured-section") ||
    document.getElementById("featured-post-slot");
  const gridContainer =
    document.querySelector(".article-grid") ||
    document.getElementById("blog-grid");
  const sectionTitle =
    document.querySelector(".section-title") ||
    document.querySelector(".stream-heading");

  if (!featuredContainer || !gridContainer) {
    console.error(
      "Required layout container targets missing from structural DOM layer.",
    );
    return;
  }

  // Handle empty states cleanly if category collections contain 0 records
  if (!postsToRender || postsToRender.length === 0) {
    featuredContainer.innerHTML = `
        <div style="text-align:center; padding: 60px 20px; width: 100%; grid-column: 1 / -1; color: var(--text-muted); border: 2px dashed #e2e8f0; border-radius: 24px; background: #ffffff;">
            <span style="font-size: 2rem;">🌱</span>
            <h3 style="margin-top: 15px; color: var(--text-primary); font-weight: 800;">No insights in this category yet</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Check back soon. We are continually curating new explorations.</p>
        </div>`;
    gridContainer.innerHTML = "";
    if (sectionTitle) sectionTitle.style.display = "none";
    return;
  }

  if (sectionTitle) sectionTitle.style.display = "block";

  // Newest element assigned directly to primary hero canvas showcase panel
  const featuredPost = postsToRender[0];
  renderFeaturedPost(featuredPost, featuredContainer);

  // Subsequent index ranges stream down cleanly inside the grid panels
  const remainingPosts = postsToRender.slice(1);
  renderGridPosts(remainingPosts, gridContainer);
}

function setupCategoryFilters() {
  const filterButtons = document.querySelectorAll(
    ".category-btn, .filter-pill",
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      const clickedBtn = e.currentTarget;
      clickedBtn.classList.add("active");

      const selectedCategory = clickedBtn.textContent.trim();

      if (
        selectedCategory === "All Explorations" ||
        selectedCategory === "All"
      ) {
        renderPosts(allPosts);
      } else {
        const filteredPosts = allPosts.filter(
          (post) => post.category === selectedCategory,
        );
        renderPosts(filteredPosts);
      }
    });
  });
}

function renderFeaturedPost(post, container) {
  const targetImage =
    post.image_url ||
    post.cover_image ||
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773";

  // NOTE: Links mapped to post.slug to align with your database
  container.innerHTML = `
        <article class="featured-card" onclick="window.location.href='/blog-single.html?id=${post.slug}'" style="cursor: pointer; display: grid; grid-template-columns: 1.2fr 1fr; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-card); margin-bottom: 40px; border: 1px solid rgba(255, 255, 255, 0.7);">
            <div class="featured-image" style="height: 380px; overflow: hidden;">
                <img src="${targetImage}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="featured-content" style="padding: 40px; display: flex; flex-direction: column; justify-content: center;">
                <span class="post-category" style="font-size: 0.75rem; font-weight: 700; color: var(--brand-indigo); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; display: block;">${post.category}</span>
                <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 16px; line-height: 1.25;">${post.title}</h2>
                <p class="post-excerpt" style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">${post.excerpt}</p>
                <div class="post-meta" style="display: flex; gap: 10px; font-size: 0.8rem; color: var(--text-light); font-weight: 600; align-items: center; margin-top: auto;">
                    <span class="post-date">${new Date(post.created_at || post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span class="meta-divider">•</span>
                    <span class="read-time">${post.read_time}</span>
                </div>
            </div>
        </article>
    `;
}

function renderGridPosts(posts, container) {
  container.innerHTML = posts
    .map((post) => {
      const targetImage =
        post.image_url ||
        post.cover_image ||
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843";

      return `
        <article class="article-card insight-card" onclick="window.location.href='/blog-single.html?id=${post.slug}'" style="cursor: pointer; background: #ffffff; border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; box-shadow: var(--shadow-card); border: 1px solid rgba(255,255,255,0.7); height: 100%;">
            <div class="card-image" style="height: 200px; overflow: hidden;">
                <img src="${targetImage}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="card-content" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                <span class="post-category" style="font-size: 0.75rem; font-weight: 700; color: var(--brand-indigo); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; display: block;">${post.category}</span>
                <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; line-height: 1.35;">${post.title}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px;">${post.excerpt}</p>
                <div class="post-meta" style="display: flex; gap: 8px; font-size: 0.8rem; color: var(--text-light); font-weight: 600; margin-top: auto; align-items: center;">
                    <span>${new Date(post.created_at || post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span class="meta-divider">•</span>
                    <span>${post.read_time}</span>
                </div>
            </div>
        </article>
      `;
    })
    .join("");
}
