/**
 * PEOPLE ASSETS INSIGHTS PLATFORM ENGINE — SINGLE READ VIEW DRIVER
 * Rebuilt lifecycle sync router mapping core records down to rich layouts
 */

document.addEventListener("DOMContentLoaded", () => {
  executeArticleLifecycleRetrieval();
});

async function executeArticleLifecycleRetrieval() {
  const renderLoadingState = document.getElementById(
    "article-loading-container",
  );
  const renderProductionState = document.getElementById(
    "article-production-content",
  );

  try {
    // Parse current platform routing variables safely via query parameters
    const windowSearchSchema = new URLSearchParams(window.location.search);
    const articleIdentificationToken = windowSearchSchema.get("id");

    if (!articleIdentificationToken) {
      throw new Error(
        "Invalid cloud query signature sequence missing reference ID routing context.",
      );
    }

    // Issue singular target identification pull against table collection 'posts'
    const { data: structuralPostItem, error: databaseSyncFault } =
      await window.supabaseClient
        .from("posts")
        .select("*")
        .eq("id", articleIdentificationToken)
        .single();

    if (databaseSyncFault || !structuralPostItem) {
      throw new Error(
        databaseSyncFault
          ? databaseSyncFault.message
          : "Requested insight model not found inside active clusters.",
      );
    }

    // Pass retrieved record directly down into view injection pipeline
    populateProductionViewportDOM(structuralPostItem);

    // Transition presentation elements cleanly
    if (renderLoadingState) renderLoadingState.style.display = "none";
    if (renderProductionState) renderProductionState.style.display = "block";
  } catch (criticalRoutingFault) {
    console.error(
      "Core Lifecycle Sync Exception Handled:",
      criticalRoutingFault,
    );
    renderReaderFaultState(criticalRoutingFault.message);
  }
}

function populateProductionViewportDOM(record) {
  // Dynamic Frame Title Context Update
  document.title = `${record.title || "Insight Perspective"} | People Assets`;

  // DOM Assignment Targets Definition
  const uiCategory = document.getElementById("render-category");
  const uiReadTime = document.getElementById("render-read-time");
  const uiTitle = document.getElementById("render-title");
  const uiDate = document.getElementById("render-date");
  const uiImage = document.getElementById("render-image");
  const uiBody = document.getElementById("render-body");

  // Structural Variable Assignments
  if (uiCategory) uiCategory.textContent = record.category || "Insight";
  if (uiReadTime) uiReadTime.textContent = record.read_time || "General Read";
  if (uiTitle)
    uiTitle.textContent = record.title || "Untitled Professional Insight";

  if (uiDate && record.published_at) {
    uiDate.textContent = new Date(record.published_at).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );
  } else if (uiDate) {
    uiDate.textContent = "Recent Matrix Release";
  }

  if (uiImage) {
    uiImage.src = record.cover_image || "assets/placeholder-fallback.jpg";
    uiImage.alt = `Illustration Canvas: ${record.title || "Context Platform Graphic"}`;
  }

  // Dynamic inner HTML injection mapping complex block sections safely
  if (uiBody) {
    uiBody.innerHTML =
      record.content ||
      `<p style="color: var(--color-slate-body)">No content metrics are populated within this active record profile block.</p>`;
  }
}

function renderReaderFaultState(diagnosticString) {
  const renderLoadingState = document.getElementById(
    "article-loading-container",
  );
  if (renderLoadingState) {
    renderLoadingState.innerHTML = `
            <div style="text-align: center; padding: 80px 24px; background: #ffffff; border-radius: 20px; border: 1px solid rgba(239, 68, 68, 0.15); max-width: 600px; margin: 40px auto;">
                <div style="font-size: 2.5rem; margin-bottom: 16px;">🔍</div>
                <h3 style="color: var(--color-slate-headline); font-size: 1.4rem; margin-bottom: 10px; font-weight:800;">Insight Route Terminated</h3>
                <p style="color: var(--color-slate-body); font-size: 0.95rem; line-height:1.6; margin-bottom: 24px;">The article you are attempting to review cannot be mapped. It may have been archived, unlisted, or restricted to admin nodes.</p>
                <a href="blog.html" style="display:inline-block; text-decoration:none; background: var(--color-brand-indigo); color:#ffffff; padding:12px 24px; border-radius:30px; font-weight:700; font-size:0.9rem; box-shadow:0 4px 15px rgba(99,102,241,0.2);">Return to Dashboard Insights</a>
            </div>
        `;
  }
}
