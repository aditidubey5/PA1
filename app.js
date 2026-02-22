

const testData = {
    'friction': {
        title: "Friction vs. Flow Quiz",
        questions: [
            "If I achieve a goal quickly and easily, I often feel like I haven't 'really' earned the result.",
            "I tend to view colleagues who find 'easy' ways to do hard things as cutting corners rather than being efficient.",
            "I find myself preferring to work on complex, difficult problems, even if they are less profitable than simpler ones.",
            "I feel uncomfortable or 'guilty' when I finish my primary work tasks before the workday is officially over.",
            "I feel significantly more productive and virtuous on days when I am physically or mentally exhausted by the end.",
            "I am naturally skeptical of new tools, AI, or shortcuts that promise to make my professional work 10x faster.",
            "If a project doesn't feel challenging or stressful, I worry that the final quality will be lower.",
            "I find myself adding more features or steps to a task than what was originally requested to ensure it's 'thorough'.",
            "I would rather do a task manually to ensure 'control' than spend time setting up an automated system.",
            "I believe that professional growth is only possible through a period of intense 'grinding' or suffering."
        ]
    },
    'odat': {
        title: "Open DISC Assessment",
        questions: ["I am assertive and direct.", "I enjoy influencing others.", "I prefer steady environments.", "I pay close attention to accuracy.", "I prioritize results over relationships."]
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        questions: ["I am the life of the party.", "I am concerned about others' feelings.", "I am always prepared.", "I get upset easily.", "I have a vivid imagination."]
    }
};

let activeKey = null, currentIdx = 0, userAnswers = {};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';

    document.querySelectorAll('.nav-links span').forEach(s => s.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + id);
    if(activeNav) activeNav.classList.add('active');

    if(id === 'tests') renderGrid();
    if(id === 'coaching') renderCoachingPage();
    window.scrollTo(0, 0);
}

function renderGrid() {
    const grid = document.getElementById('test-grid-ui');
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `
            <div class="card" onclick="loadTest('${key}')">
                <h3 style="margin-bottom:20px;">${testData[key].title}</h3>
                <button class="btn-primary" style="padding:10px 20px;">BEGIN ANALYSIS →</button>
            </div>`;
    }
}

function loadTest(id) {
    activeKey = id; currentIdx = 0; userAnswers = {};
    showPage('engine');
    document.getElementById('test-title').innerText = testData[id].title;
    renderQuestion();
}

function renderQuestion() {
    const questions = testData[activeKey].questions;
    const isLast = currentIdx === questions.length - 1;
    
    document.getElementById('question-area').innerHTML = `
        <div class="card" style="max-width:650px; margin: 40px auto; cursor: default;">
            <p style="font-size:1.3rem; font-weight:800; margin-bottom:30px; line-height:1.4;">${questions[currentIdx]}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:450px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">DISAGREE</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" onchange="userAnswers[${currentIdx}]=${v}" ${userAnswers[currentIdx]==v?'checked':''} style="width:25px; height:25px; accent-color:var(--brand-magenta);">`).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">AGREE</span>
            </div>
            ${isLast ? `
                <div style="margin-top:40px; border-top:1px solid #eee; padding-top:20px;">
                    <p style="font-weight:800; font-size:0.8rem; margin-bottom:15px; color:#64748b;">ENTER EMAIL FOR YOUR DETAILED ANALYSIS</p>
                    <input type="email" id="u-email" placeholder="professional@email.com" class="main-input">
                    <button class="btn-primary" style="width:100%;" onclick="calculateReport()">Generate Results</button>
                </div>` : ''}
        </div>`;

    document.getElementById('next-btn').style.display = isLast ? 'none' : 'inline-block';
    document.getElementById('back-btn').style.display = currentIdx === 0 ? 'none' : 'inline-block';
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Please select a rating.");
    currentIdx += step;
    renderQuestion();
}

function renderCoachingPage() {
    document.getElementById('coaching').innerHTML = `
        <div class="container" style="text-align:center;">
            <h1 class="text-gradient" style="font-size:3rem; margin-top:0;">Elite Coaching</h1>
            <p style="color:#64748b; margin-bottom:40px;">Strategic alignment for high-performers.</p>
            <div class="card" style="max-width:500px; margin: 0 auto; text-align:left;">
                <label style="font-weight:800; font-size:0.75rem; color:#94a3b8;">FULL NAME</label>
                <input type="text" id="c-name" class="main-input">
                <label style="font-weight:800; font-size:0.75rem; color:#94a3b8;">EMAIL</label>
                <input type="email" id="c-email" class="main-input">
                <label style="font-weight:800; font-size:0.75rem; color:#94a3b8;">PHONE NUMBER</label>
                <input type="tel" id="c-phone" class="main-input">
                <label style="font-weight:800; font-size:0.75rem; color:#94a3b8;">FOCUS AREA</label>
                <textarea id="c-focus" class="main-input" style="height:80px;"></textarea>
                <button class="btn-primary" style="width:100%;" onclick="sendCoachingRequest()">Request Consultation</button>
            </div>
        </div>`;
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email.includes('@')) return alert("Enter valid email.");
    const score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { user_email: email, test_name: testData[activeKey].title, score: score });

    let title, desc, traits;

    // Recalibrated logic for 10 questions (Max Score 50)
    if (score >= 38) {
        title = "The Martyr Archetype";
        desc = "You are currently in a state of 'High Friction.' You subconsciously equate physical and mental exhaustion with professional integrity. You are at high risk of burnout because you prioritize the 'grind' over systemic leverage.";
        traits = ["Complexity Addiction", "High Manual Bias", "Visible Suffering", "Hero Mentality"];
    } else if (score >= 25) {
        title = "The Performer Archetype";
        desc = "You balance hard work with moments of strategic efficiency. You are a 'Balanced Optimizer'—you aren't afraid of the grind, but you are open to tools that save time if they don't threaten your sense of value.";
        traits = ["Adaptive Effort", "Pragmatic Tooling", "Result-Oriented", "Reliable Execution"];
    } else {
        title = "The Architect Archetype";
        desc = "You are a 'Flow Specialist.' You naturally prioritize leverage over labor. You build systems that work for you, allowing you to achieve high-quality outcomes with significantly less friction than the average professional.";
        traits = ["High Leverage", "Systemic Thinker", "Early Adopter", "Minimalist Effort"];
    }

    

    document.getElementById('report-page-content').innerHTML = `
        <div class="card" style="text-align:left; max-width:800px; margin:0 auto; padding:40px;">
            <div style="background:#f0fdf4; color:#166534; padding:15px; border-radius:10px; margin-bottom:20px; text-align:center; font-size: 0.85rem;">
                <strong>✓ DISPATCHED:</strong> Detailed psychometric breakdown sent to <strong>${email}</strong>
            </div>
            <h4 style="color:var(--brand-magenta); font-weight:800; font-size:0.8rem; letter-spacing:1px;">PROFESSIONAL ARCHETYPE</h4>
            <h1 class="text-gradient" style="font-size:2.8rem; margin-top:0; line-height:1;">${title}</h1>
            <p style="font-size:1.1rem; line-height:1.7; color:#334155; margin-top: 20px;">${desc}</p>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:30px 0;">
                ${traits.map(t => `<div style="background:var(--bg-lavender); padding:18px; border-radius:12px; font-weight:700; color:#4338ca;">✦ ${t}</div>`).join('')}
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 30px; text-align: center;">
                <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">Align your archetype with a professional roadmap.</p>
                <button class="btn-primary" style="width:100%;" onclick="showPage('coaching')">Apply for Coaching Session</button>
            </div>
        </div>`;
    
    showPage('report');
}

// Ensure first page loads correctly
document.addEventListener('DOMContentLoaded', () => showPage('home'));
