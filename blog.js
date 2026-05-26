// ============================================
// BLOG ENGINE (blog.js)
// ============================================

let allPosts = [];
let activeCategory = "all";

const categoryImages = {
  "Personality Patterns":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "Mindset & Motivation":
    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
  Leadership:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  "Understanding Your Scores":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "Personal Growth":
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
  Workplace:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  default:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
};

function getImage(post) {
  if (post.image_url) return post.image_url.replace(/\[|\]/g, "");
  return categoryImages[post.category] || categoryImages["default"];
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

document.addEventListener("DOMContentLoaded", fetchBlogPosts);

async function fetchBlogPosts() {
  try {
    const { data: posts, error } = await _supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    allPosts = posts || [];
    renderAll(allPosts);
  } catch (err) {
    console.error("Blog fetch error:", err.message);
    document.getElementById("blog-grid").innerHTML =
      `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#64748b;"><p>Could not load articles. Please refresh.</p></div>`;
    document.getElementById("featured-section").innerHTML = "";
  }
}

function renderAll(posts) {
  if (!posts || posts.length === 0) {
    document.getElementById("featured-section").innerHTML = "";
    document.getElementById("blog-grid").innerHTML = "";
    document.getElementById("grid-header").style.display = "none";
    document.getElementById("empty-state").style.display = "block";
    document.getElementById("post-count").textContent = "";
    return;
  }

  document.getElementById("empty-state").style.display = "none";
  document.getElementById("grid-header").style.display = "flex";
  renderFeatured(posts[0]);
  renderGrid(posts.slice(1));
  document.getElementById("post-count").textContent =
    posts.length + " article" + (posts.length !== 1 ? "s" : "");
}

function renderFeatured(post) {
  document.getElementById("featured-section").innerHTML = `
    <a href="blog-single.html?id=${post.id}" class="blog-featured">
        <div class="blog-featured-img">
            <img src="${getImage(post)}" alt="${post.title}" loading="lazy">
            <span class="blog-featured-badge">✦ Featured</span>
        </div>
        <div class="blog-featured-body">
            <div class="blog-featured-cat">${post.category}</div>
            <h2 class="blog-featured-title">${post.title}</h2>
            <p class="blog-featured-excerpt">${post.excerpt}</p>
            <div class="blog-featured-meta">📅 ${formatDate(post.created_at)} &nbsp;·&nbsp; ⏱ ${post.read_time}</div>
            <span class="blog-read-btn">Read Article →</span>
        </div>
    </a>`;
}

function renderGrid(posts) {
  if (posts.length === 0) {
    document.getElementById("blog-grid").innerHTML = "";
    return;
  }
  document.getElementById("blog-grid").innerHTML = posts
    .map(
      (post) => `
    <a href="blog-single.html?id=${post.id}" class="blog-card">
        <div class="blog-card-img-wrap">
            <img class="blog-card-img" src="${getImage(post)}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-card-body">
            <div class="blog-card-cat">${post.category}</div>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <div class="blog-card-footer">
                <span>${formatDate(post.created_at)} · ${post.read_time}</span>
                <span class="blog-card-arrow">→</span>
            </div>
        </div>
    </a>`,
    )
    .join("");
}

function filterByCategory(cat, btn) {
  activeCategory = cat;
  document
    .querySelectorAll(".blog-pill")
    .forEach((p) => p.classList.remove("active"));
  if (btn) btn.classList.add("active");
  document.getElementById("blog-search").value = "";
  const filtered =
    cat === "all" ? allPosts : allPosts.filter((p) => p.category === cat);
  document.getElementById("grid-title").textContent =
    cat === "all" ? "Latest Insights" : cat;
  renderAll(filtered);
}

function searchPosts(query) {
  if (!query.trim()) {
    filterByCategory(activeCategory, null);
    return;
  }
  const q = query.toLowerCase();
  const filtered = allPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q),
  );
  document.getElementById("grid-title").textContent = `Results for "${query}"`;
  renderAll(filtered);
}

window.filterByCategory = filterByCategory;
window.searchPosts = searchPosts;
