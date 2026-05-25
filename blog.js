// 1. Global variable to hold our data so we don't have to re-fetch from Supabase
let allPosts = [];

// Change this at the top of your blog.js file
document.addEventListener("DOMContentLoaded", () => {
  // Safe initialization of category filters
  if (typeof setupCategoryFilters === "function") {
    setupCategoryFilters();
  }

  // Safe execution of data fetching
  // Instead of checking 'currentPage', check if the blog sections exist on the page
  const featuredContainer = document.querySelector(".featured-section");
  const gridContainer = document.querySelector(".article-grid");

  if (featuredContainer || gridContainer) {
    fetchBlogPosts();
  }
});

async function fetchBlogPosts() {
  try {
    // Fetch all blog posts from Supabase ordered by newest first
    const { data: posts, error } = await _supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Save the posts into our global variable
    allPosts = posts || [];

    // Run the initial render to show everything
    renderPosts(allPosts);
  } catch (err) {
    console.error("Error fetching blog assets:", err.message);
  }
}

// 2. New Master Render Function to handle UI updates cleanly
function renderPosts(postsToRender) {
  const featuredContainer = document.querySelector(".featured-section");
  const gridContainer = document.querySelector(".article-grid");
  const sectionTitle = document.querySelector(".section-title");

  // Clear the current layout
  featuredContainer.innerHTML = "";
  gridContainer.innerHTML = "";

  // Handle empty states (if a category has no posts yet)
  if (!postsToRender || postsToRender.length === 0) {
    featuredContainer.innerHTML = `
            <div style="text-align:center; padding: 60px 20px; width: 100%; color: var(--slate-gray); border: 1px dashed var(--border-color); border-radius: 16px;">
                <span style="font-size: 2rem;">🌱</span>
                <h3 style="margin-top: 15px; color: var(--slate-dark);">No insights in this category yet</h3>
                <p>Check back soon. We are continually curating new explorations.</p>
            </div>`;
    gridContainer.style.display = "none";
    sectionTitle.style.display = "none";
    return;
  }

  // Ensure the grid is visible in case it was previously hidden by an empty state
  gridContainer.style.display = "grid";
  sectionTitle.style.display = "block";

  // Separate the newest post for the Featured Spot
  const featuredPost = postsToRender[0];
  renderFeaturedPost(featuredPost, featuredContainer);

  // Render the rest into the Grid
  const remainingPosts = postsToRender.slice(1);
  renderGridPosts(remainingPosts, gridContainer);
}

// 3. The Filter Logic
function setupCategoryFilters() {
  const filterButtons = document.querySelectorAll(".category-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // A. Remove the 'active' indigo styling from ALL buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // B. Add the 'active' styling to the exact button the user just clicked
      const clickedBtn = e.target;
      clickedBtn.classList.add("active");

      // C. Read the text on the button (e.g., "Personality Patterns")
      const selectedCategory = clickedBtn.textContent.trim();

      // D. Filter our data
      if (selectedCategory === "All Explorations") {
        // If they clicked "All", pass the entire saved array
        renderPosts(allPosts);
      } else {
        // Otherwise, create a new array with only posts matching that category
        const filteredPosts = allPosts.filter(
          (post) => post.category === selectedCategory,
        );
        renderPosts(filteredPosts);
      }
    });
  });
}

// --- Keep your existing renderFeaturedPost and renderGridPosts below ---
function renderFeaturedPost(post, container) {
  container.innerHTML = `
        <article class="featured-card" onclick="window.location.href='/blog-single.html?id=${post.id}'" style="cursor: pointer;">
            <div class="featured-image">
            <img src="${(post.image_url ? post.image_url.replace(/\[|\]/g, "") : null) || "https://images.unsplash.com/photo-1506126613408-eca07ce68773"}" alt="${post.title}">
                </div>
            <div class="featured-content">
                <span class="post-category">${post.category}</span>
                <h2>${post.title}</h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span class="meta-divider">•</span>
                    <span class="read-time">${post.read_time}</span>
                </div>
                <a href="/blog-single.html?id=${post.id}" class="read-more-btn">Explore Article →</a>
            </div>
        </article>
    `;
}

function renderGridPosts(posts, container) {
  if (posts.length === 0) {
    container.style.display = "none";
    document.querySelector(".section-title").style.display = "none";
    return;
  }

  container.innerHTML = posts
    .map(
      (post) => `
        <article class="article-card" onclick="window.location.href='/blog-single.html?id=${post.id}'">
            <div class="card-image">
            <img src="${(post.image_url ? post.image_url.replace(/\[|\]/g, "") : null) || "https://images.unsplash.com/photo-1518495973542-4542c06a5843"}" alt="${post.title}">
                </div>
            <div class="card-content">
                <span class="post-category">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-meta">
                    <span>${new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span class="meta-divider">•</span>
                    <span>${post.read_time}</span>
                </div>
            </div>
        </article>
    `,
    )
    .join("");
}
