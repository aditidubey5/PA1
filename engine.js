// ============================================
// QUESTION ENGINE (engine.js)
// ============================================

let currentQuestion = 0;
let answers = [];

function startTest(testId) {
    currentTest = TESTS.find(t => t.id === testId);
    if (!currentTest) return;
    
    document.querySelector(".engine-nav").style.display = "flex";
    if (typeof gtag === 'function') {
        gtag('event', 'begin_test', { 'test_id': testId, 'test_name': currentTest.title });
    }
    
    currentQuestion = 0;
    answers = new Array(currentTest.questions_data.length).fill(null);
    showPage("engine");
    renderQuestion();
}

function renderQuestion() {
    const t = currentTest;
    const q = t.questions_data[currentQuestion];
    const total = t.questions_data.length;

    document.getElementById("test-title").textContent = t.title;

    // Build progress bar
    let progressBarHtml = "";
    if (t.sections && t.sections.length) {
        const sectionsHtml = t.sections.map((sec, i) => {
            const isActive = currentQuestion >= sec.start && currentQuestion <= sec.end;
            const isComplete = currentQuestion > sec.end;
            const segProgress = isComplete ? 100 : isActive ? Math.round(((currentQuestion - sec.start) / (sec.end - sec.start + 1)) * 100) : 0;
            return `
                <div style="flex:1; padding: 0 3px;">
                    <div style="font-size:0.62rem; font-weight:700; text-transform:uppercase; letter-spacing:0.07em; color:${isActive ? "var(--brand-indigo)" : isComplete ? "#10b981" : "var(--text-light)"}; margin-bottom:5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${isComplete ? "✓ " : ""}${sec.name}
                    </div>
                    <div style="background:#e2e8f0; border-radius:50px; height:5px; overflow:hidden;">
                        <div style="height:100%; width:${segProgress}%; background:${isComplete ? "#10b981" : "var(--brand-grad)"}; border-radius:50px; transition:width 0.4s ease;"></div>
                    </div>
                </div>
            `;
        }).join("");
        progressBarHtml = `<div style="display:flex; gap:0; width:100%; max-width:580px; margin:0 auto 20px;">${sectionsHtml}</div>`;
    } else {
        const progress = (currentQuestion / total) * 100;
        progressBarHtml = `
            <div class="progress-bar-wrap" style="max-width:520px; margin:0 auto 8px;">
                <div class="progress-bar-fill" style="width:${progress}%"></div>
            </div>
        `;
    }

    document.getElementById("question-area").innerHTML = `
        ${progressBarHtml}
        <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:28px; font-weight:600;">
            Question ${currentQuestion + 1} of ${total}
            ${t.sections && q.section ? `&nbsp;·&nbsp;<span style="color:var(--brand-indigo);">${q.section}</span>` : ""}
        </p>
        <div style="background:white; border-radius:20px; padding: clamp(24px,4vw,40px); box-shadow: var(--shadow-card); max-width:580px; margin:0 auto 24px; text-align:left;">
            <p style="font-size: clamp(1rem, 2.5vw, 1.2rem); font-weight:700; color:var(--text-primary); margin-bottom:24px; line-height:1.5;">${q.q}</p>
            <div style="display:flex; flex-direction:column; gap:10px;">
                ${q.options.map((opt, i) => `
                    <label class="answer-option ${answers[currentQuestion] === i ? 'selected' : ''}" onclick="selectAnswer(${i})">
                        <span class="answer-letter">${String.fromCharCode(65 + i)}</span>
                        <span>${opt}</span>
                    </label>
                `).join("")}
            </div>
        </div>
    `;

    document.getElementById("back-btn").style.display = currentQuestion === 0 ? "none" : "inline-block";
    document.getElementById("next-btn").textContent = currentQuestion === total - 1 ? "View My Results →" : "Next →";
}

function selectAnswer(index) {
    answers[currentQuestion] = index;
    document.querySelectorAll(".answer-option").forEach((el, i) => {
        el.classList.toggle("selected", i === index);
    });
}

function changeQuestion(direction) {
    if (direction === 1) {
        if (answers[currentQuestion] === null) {
            shakeNextButton();
            return;
        }
        if (currentQuestion === currentTest.questions_data.length - 1) {
            showNameInputScreen();
            return;
        }
        currentQuestion++;
    } else {
        if (currentQuestion === 0) return;
        currentQuestion--;
    }
    renderQuestion();
}

async function showNameInputScreen() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    if (user) {
        userName = user.user_metadata.full_name.split(' ')[0];
        generateReport();
        return;
    }

    const area = document.getElementById("question-area");
    area.innerHTML = `
        <div style="background:white; border-radius:24px; padding: 40px; box-shadow:var(--shadow-card); max-width:500px; margin:40px auto; text-align:center;">
            <div style="font-size:3rem; margin-bottom:20px;">✍️</div>
            <h2 class="text-gradient" style="margin-bottom:15px;">One Last Step...</h2>
            <p style="color:var(--text-muted); margin-bottom:30px;">Tell us your name and we'll generate a customized report for you.</p>
            <input type="text" id="user-name-field" placeholder="Enter your first name" style="width:100%; padding:15px; border-radius:12px; border:2px solid #e2e8f0; font-size:1.1rem; margin-bottom:20px; text-align:center;">
            <button class="btn-primary btn-full" onclick="saveNameAndGenerate()">Generate My Report →</button>
        </div>
    `;
    document.querySelector(".engine-nav").style.display = "none";
}

function saveNameAndGenerate() {
    const input = document.getElementById("user-name-field");
    userName = input.value.trim() || "there";
    generateReport();
}

function shakeNextButton() {
    const btn = document.getElementById("next-btn");
    btn.style.animation = "none";
    btn.offsetHeight;
    btn.style.animation = "shake 0.4s ease";
    btn.style.background = "#ef4444";
    setTimeout(() => {
        btn.style.background = "";
        btn.style.animation = "";
    }, 600);
}