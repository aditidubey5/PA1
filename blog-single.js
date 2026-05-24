document.addEventListener("DOMContentLoaded", () => {
  loadSingleArticle();
});

async function loadSingleArticle() {
  // 1. Grab the ID from the URL (e.g., website.com/blog-single.html?id=123-abc)
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");

  // If there is no ID in the URL, send them back to the main blog page
  if (!articleId) {
    window.location.href = "/blog.html";
    return;
  }

  try {
    // 2. Ask Supabase for exactly one row matching this ID
    const { data: post, error } = await _supabase
      .from("blogs")
      .select("*")
      .eq("id", articleId)
      .single();

    if (error) throw error;
    if (!post) throw new Error("Article not found.");

    // 3. Map the database values to our HTML shell
    document.title = `${post.title} | People Assets`;
    document.getElementById("render-category").textContent = post.category;
    document.getElementById("render-title").textContent = post.title;
    document.getElementById("render-read-time").textContent = post.read_time;

    // Format the date nicely
    document.getElementById("render-date").textContent = new Date(
      post.created_at,
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Set the image
    const imgEl = document.getElementById("render-image");
    imgEl.src = post.image_url;
    imgEl.alt = post.title;

    // Set the main article content (using innerHTML because our mock data uses <p> and <h3> tags)
    document.getElementById("render-body").innerHTML = post.content;

    // 4. Hide the loader and show the completed article
    document.getElementById("loading-state").style.display = "none";
    document.getElementById("article-content").style.display = "block";
  } catch (err) {
    console.error("Error fetching article:", err.message);
    document.getElementById("loading-state").textContent =
      "⚠️ Sorry, we couldn't load this article. It may have been moved.";
  }
}
