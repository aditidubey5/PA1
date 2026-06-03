// ==========================================================================
// PEOPLE ASSETS - COMPREHENSIVE BLOG HUB ENGINE
// ==========================================================================

// Global state
let allPosts = [];
let currentCategory = "all";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  fetchBlogPosts();
});

async function fetchBlogPosts() {
  try {
    const { data: posts, error } = await _supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    allPosts = posts || [];

    // Check if a category was passed in the URL (e.g., from the Report Page)
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("cat");

    if (catParam) {
      // Find the pill button that matches the category and activate it
      const buttons = document.querySelectorAll(".blog-pill");
      let matched = false;
      buttons.forEach((btn) => {
        if (btn.getAttribute("onclick").includes(catParam)) {
          btn.click(); // This will trigger filterByCategory automatically
          matched = true;
        }
      });

      // Fallback just in case the button text isn't a perfect match
      if (!matched) {
        currentCategory = catParam;
        updateDisplay();
      }
    } else {
      updateDisplay();
    }
  } catch (err) {
    console.error("Error fetching blog posts:", err.message);
    document.getElementById("featured-section").innerHTML =
      `<p style="text-align:center; padding: 40px; color: #ef4444;">Failed to load insights. Please refresh the page.</p>`;
    document.getElementById("blog-grid").innerHTML = "";
  }
}

// Triggered by the onclick="" in your HTML pills
function filterByCategory(category, btnElement) {
  currentCategory = category;

  // Update active visual class on buttons
  const buttons = document.querySelectorAll(".blog-pill");
  buttons.forEach((btn) => btn.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  }

  updateDisplay();
}

// Triggered by the oninput="" in your HTML search bar
function searchPosts(query) {
  searchQuery = query.toLowerCase();
  updateDisplay();
}

// Core rendering engine
function updateDisplay() {
  // 1. Filter by category
  let filtered = allPosts;
  if (currentCategory.toLowerCase() !== "all") {
    filtered = filtered.filter(
      (post) =>
        post.category &&
        post.category.toLowerCase() === currentCategory.toLowerCase(),
    );
  }

  // 2. Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(
      (post) =>
        (post.title && post.title.toLowerCase().includes(searchQuery)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery)),
    );
  }

  // 3. Get layout containers (Matching your new HTML exactly)
  const featuredContainer = document.getElementById("featured-section");
  const gridContainer = document.getElementById("blog-grid");
  const emptyState = document.getElementById("empty-state");
  const gridHeader = document.getElementById("grid-header");
  const postCount = document.getElementById("post-count");

  if (!featuredContainer || !gridContainer) return;

  // 4. Handle Empty States
  if (filtered.length === 0) {
    featuredContainer.style.display = "none";
    gridContainer.style.display = "none";
    gridHeader.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  // 5. Show containers
  featuredContainer.style.display = "block";
  gridContainer.style.display = "grid";
  gridHeader.style.display = "flex";
  emptyState.style.display = "none";

  // 6. Update dynamic count
  postCount.textContent = `${filtered.length} Article${filtered.length !== 1 ? "s" : ""}`;

  // 7. Render Featured (first item in the filtered array)
  const featuredPost = filtered[0];
  renderFeaturedPost(featuredPost, featuredContainer);

  // 8. Render Grid (all remaining items)
  const remainingPosts = filtered.slice(1);
  renderGridPosts(remainingPosts, gridContainer);
}

function renderFeaturedPost(post, container) {
  const targetImage =
    post.image_url ||
    post.cover_image ||
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80";
  const date = new Date(
    post.created_at || post.published_at,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Outputs the exact DOM structure from your blog_3.html design
  container.innerHTML = `
        <a href="/blog-single.html?id=${post.id}" class="blog-featured">
            <div class="blog-featured-img">
                <div class="blog-featured-badge">Featured</div>
                <img src="${targetImage}" alt="${post.title}">
            </div>
            <div class="blog-featured-body">
                <div class="blog-featured-cat">${post.category || "Uncategorized"}</div>
                <h2 class="blog-featured-title">${post.title}</h2>
                <p class="blog-featured-excerpt">${post.excerpt}</p>
                <div class="blog-featured-meta">
                    <span>📅 ${date}</span>
                    <span style="margin: 0 8px; color: #cbd5e1;">•</span>
                    <span>⏱ ${post.read_time || "5 min read"}</span>
                </div>
                <div class="blog-read-btn">Read Article →</div>
            </div>
        </a>
    `;
}

function renderGridPosts(posts, container) {
  if (posts.length === 0) {
    container.innerHTML = "";
    return;
  }

  // Outputs the exact grid cards from your blog_3.html design
  container.innerHTML = posts
    .map((post) => {
      const targetImage =
        post.image_url ||
        post.cover_image ||
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80";
      const date = new Date(
        post.created_at || post.published_at,
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return `
            <a href="/blog-single.html?id=${post.id}" class="blog-card">
                <div class="blog-card-img-wrap">
                    <img src="${targetImage}" alt="${post.title}" class="blog-card-img">
                </div>
                <div class="blog-card-body">
                    <div class="blog-card-cat">${post.category || "Uncategorized"}</div>
                    <h3 class="blog-card-title">${post.title}</h3>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-footer">
                        <div>
                            <span>${date}</span>
                            <span style="margin: 0 6px; color: #cbd5e1;">•</span>
                            <span>${post.read_time || "5 min read"}</span>
                        </div>
                        <div class="blog-card-arrow">→</div>
                    </div>
                </div>
            </a>
        `;
    })
    .join("");
}
