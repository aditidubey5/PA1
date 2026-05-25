/**
 * PEOPLE ASSETS INSIGHTS PLATFORM ENGINE — ARCHITECTURE CORE
 * Unified Lifecycle Driver Framework
 */

let baseArticleCollection = [];
let operationalActiveCategory = "all";
let searchThrottleTimer = null;

// Target System Selectors Mapping
const DOM_UI = {
  searchField: document.getElementById("engine-search"),
  pillBox: document.getElementById("category-pill-box"),
  featuredSlot: document.getElementById("featured-placement-target"),
  articlesGrid: document.getElementById("main-articles-grid-target"),
  counterElement: document.getElementById("stream-total-count"),
  emptyFrame: document.getElementById("hub-empty-state-card"),
  resetTrigger: document.getElementById("empty-state-reset-trigger"),
};

document.addEventListener("DOMContentLoaded", () => {
  initializePlatformComponents();
  fetchPlatformArticles();
});

function initializePlatformComponents() {
  // Input Observer Binding
  if (DOM_UI.searchField) {
    DOM_UI.searchField.addEventListener("input", (e) => {
      clearTimeout(searchThrottleTimer);
      searchThrottleTimer = setTimeout(() => {
        evaluateLifecyclePipeline();
      }, 150);
    });
  }

  // Tab Group Delegated Controller Hook
  if (DOM_UI.pillBox) {
    DOM_UI.pillBox.addEventListener("click", (e) => {
      const structuralButton = e.target.closest(".filter-pill");
      if (!structuralButton) return;

      document
        .querySelectorAll(".filter-pill")
        .forEach((btn) => btn.classList.remove("active"));
      structuralButton.classList.add("active");

      operationalActiveCategory =
        structuralButton.getAttribute("data-category") || "all";
      evaluateLifecyclePipeline();
    });
  }

  // Resets Event Handlers
  if (DOM_UI.resetTrigger) {
    DOM_UI.resetTrigger.addEventListener("click", () => {
      if (DOM_UI.searchField) DOM_UI.searchField.value = "";
      operationalActiveCategory = "all";

      if (DOM_UI.pillBox) {
        document.querySelectorAll(".filter-pill").forEach((btn) => {
          btn.classList.toggle(
            "active",
            btn.getAttribute("data-category") === "all",
          );
        });
      }
      evaluateLifecyclePipeline();
    });
  }
}

async function fetchPlatformArticles() {
  try {
    // Query database table 'posts' sorting by publication date structural descending order
    const { data, error } = await window.supabaseClient
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) throw error;

    baseArticleCollection = data || [];
    evaluateLifecyclePipeline();
  } catch (criticalError) {
    console.error("Critical Platform Fetch Failure:", criticalError);
    renderFaultUIState();
  }
}

function evaluateLifecyclePipeline() {
  const rawSearchToken = DOM_UI.searchField
    ? DOM_UI.searchField.value.toLowerCase().trim()
    : "";

  // Core Pipeline Filter Matrix Logic
  const matchingOutput = baseArticleCollection.filter((article) => {
    const matchesCategory =
      operationalActiveCategory === "all" ||
      article.category === operationalActiveCategory;

    const matchesSearch =
      !rawSearchToken ||
      (article.title && article.title.toLowerCase().includes(rawSearchToken)) ||
      (article.excerpt &&
        article.excerpt.toLowerCase().includes(rawSearchToken)) ||
      (article.tags &&
        JSON.stringify(article.tags).toLowerCase().includes(rawSearchToken));

    return matchesCategory && matchesSearch;
  });

  renderPlatformViewport(matchingOutput);
}

function renderPlatformViewport(processedArticles) {
  // Total Count Badge Update
  if (DOM_UI.counterElement) {
    DOM_UI.counterElement.textContent = `${processedArticles.length} ${processedArticles.length === 1 ? "Article" : "Articles"}`;
  }

  // Viewport Empty State Assertions
  if (processedArticles.length === 0) {
    if (DOM_UI.featuredSlot) DOM_UI.featuredSlot.style.display = "none";
    if (DOM_UI.articlesGrid) DOM_UI.articlesGrid.innerHTML = "";
    if (DOM_UI.emptyFrame) DOM_UI.emptyFrame.style.display = "block";
    return;
  }

  if (DOM_UI.emptyFrame) DOM_UI.emptyFrame.style.display = "none";

  // Segment Collection: Isolate primary element for layout position mapping
  const trackingFeaturedItem = processedArticles[0];
  const structuralGridGroup = processedArticles.slice(1);

  // Render Featured Display Block Only If Searching / Filtering System State is Default
  if (operationalActiveCategory === "all" && !DOM_UI.searchField.value.trim()) {
    if (DOM_UI.featuredSlot) {
      DOM_UI.featuredSlot.style.display = "block";
      DOM_UI.featuredSlot.innerHTML =
        generateFeaturedMarkupTemplate(trackingFeaturedItem);
    }
    renderGridSystemContent(structuralGridGroup);
  } else {
    if (DOM_UI.featuredSlot) DOM_UI.featuredSlot.style.display = "none";
    renderGridSystemContent(processedArticles);
  }
}

function renderGridSystemContent(groupCollection) {
  if (!DOM_UI.articlesGrid) return;

  if (groupCollection.length === 0) {
    DOM_UI.articlesGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--color-slate-body); font-weight: 500;">Viewing filtered primary selection framework.</div>`;
    return;
  }

  DOM_UI.articlesGrid.innerHTML = groupCollection
    .map((article) => generateGridCardMarkupTemplate(article))
    .join("");
}

function generateFeaturedMarkupTemplate(item) {
  const visualBannerAsset =
    item.cover_image || "assets/placeholder-fallback.jpg";
  const computedTimestamp = item.published_at
    ? new Date(item.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recent Perspective";

  return `
        <a href="blog-single.html?id=${item.id}" class="showcase-anchor">
            <article class="featured-card-wrapper">
                <div class="featured-canvas">
                    <img src="${visualBannerAsset}" alt="Featured Illustration: ${item.title || ""}" loading="eager">
                </div>
                <div class="featured-text-wrapper">
                    <span class="meta-category-tag">${item.category || "Insight"}</span>
                    <h2>${item.title || "Untitled Professional Insight"}</h2>
                    <p>${item.excerpt || "Explore advanced research analysis data points and professional strategic execution modules within this development overview."}</p>
                    <div class="meta-timestamp">Published ${computedTimestamp}</div>
                </div>
            </article>
        </a>
    `;
}

function generateGridCardMarkupTemplate(item) {
  const visualThumbAsset =
    item.cover_image || "assets/placeholder-fallback.jpg";
  const computedTimestamp = item.published_at
    ? new Date(item.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent Update";

  return `
        <a href="blog-single.html?id=${item.id}" class="item-card-anchor">
            <article class="editorial-card-wrapper">
                <div class="card-canvas">
                    <img src="${visualThumbAsset}" alt="Article Thumbnail: ${item.title || ""}" loading="lazy">
                </div>
                <div class="card-text-wrapper">
                    <span class="meta-category-tag">${item.category || "Perspective"}</span>
                    <h3>${item.title || "Untitled Context Resource"}</h3>
                    <p>${item.excerpt || "Review structural concept documentation details mapping core metrics inside our framework ecosystem."}</p>
                    <div class="meta-timestamp">${computedTimestamp}</div>
                </div>
            </article>
        </a>
    `;
}

function renderFaultUIState() {
  if (DOM_UI.articlesGrid) {
    DOM_UI.articlesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 24px; background: #ffffff; border-radius: 16px; border: 1px solid rgba(239,68,68,0.2);">
                <div style="font-size: 2rem; margin-bottom: 12px;">⚠️</div>
                <h4 style="color: var(--color-slate-headline); font-size: 1.15rem; margin-bottom: 6px;">Connection Sync Interrupted</h4>
                <p style="color: var(--color-slate-body); font-size: 0.9rem;">Unable to process database resource allocations at this time. Please verify cloud routing structures or reload workspace portals.</p>
            </div>
        `;
  }
}
