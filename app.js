/**
 * PEOPLE ASSETS - FIXED FINAL STEP LOGIC
 */

const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

(function() { emailjs.init(PUBLIC_KEY); })();

const testData = {
    'friction': {
        title: "Friction vs. Flow Quiz",
        questions: [
            "If I achieve a goal quickly and easily, I often feel like I haven't 'really' earned the result.",
            "When learning something new, I feel a sense of guilt if I don't read the entire material from start to finish.",
            "I find myself preferring to work on complex, difficult problems, even if they are less profitable than simpler ones.",
            "I would rather wait until I can do a 'perfect' one-hour session than settle for a productive 10-minute window.",
            "I feel significantly more productive and virtuous on days when I am physically or mentally exhausted by the end.",
            "I am naturally skeptical of new tools, AI, or shortcuts that promise to make my professional work 10x faster."
        ]
    },
    'odat': {
        title: "Open DISC Assessment",
        questions: [
            "I tend to be assertive and direct when dealing with others, even if it causes slight tension.",
            "I find great enjoyment in influencing others and persuading them to see my point of view.",
            "I prioritize a steady, predictable, and calm work environment over a fast-paced and chaotic one.",
            "I pay extremely close attention to accuracy, high standards, and the fine details of every project.",
            "When making decisions, I consistently prioritize objective results and logic over personal relationships."
        ]
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        questions: [
            "I see myself as someone who is the life of the party and feels energized by large social gatherings.",
            "I consider myself to be a person who has a soft heart and is deeply concerned about others' feelings.",
            "I am someone who is always prepared, highly organized, and follows a strict personal schedule.",
            "I find that I am a person who gets upset or anxious easily when faced with unexpected stress.",
            "I have a very vivid imagination and I am constantly looking for new, abstract ways of thinking."
        ]
    }
};

let activeKey = null, currentIdx = 0, userAnswers = {};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'tests') renderGrid();
    window.scrollTo(0, 0);
}

function renderGrid() {
    const grid = document.getElementById('test-grid-ui');
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `
            <div class="card" onclick="loadTest('${key}')">
                <h3>${testData[key].title}</h3>
                <p style="color:var(--brand-magenta); font-weight:800; font-size:0.8rem;">START ANALYSIS →</p>
            </div>`;
    }
}

function loadTest(id) {
    activeKey = id; 
    currentIdx = 0; 
    userAnswers = {};
    showPage('engine');
    document.getElementById('test-title').innerText = testData[id].title;
    renderQuestion();
}

function renderQuestion() {
    const questions = testData[activeKey].questions;
    const qText = questions[currentIdx];
    const isLast = currentIdx === questions.length - 1;
    
    // Core Card UI
    let html = `
        <div class="card" style="max-width:650px; margin: 40px auto; cursor: default;">
            <p style="font-size:1.3rem; font-weight:800; margin-bottom:30px; line-height:1.4;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:450px; margin:0 auto; margin-bottom: 20px;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">DISAGREE</span>
                ${[1, 2, 3, 4, 5].map(v => `
                    <input type="radio" name="q" value="${v}" 
                    onchange="saveAnswer(${v})" 
                    ${userAnswers[currentIdx] == v ? 'checked' : ''} 
                    style="width:25px; height:25px; accent-color: var(--brand-magenta);">
                `).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">AGREE</span>
            </div>`;

    // ADD EMAIL FIELD INSIDE THE CARD IF IT'S THE LAST QUESTION
    if (isLast) {
        html += `
            <div id="final-step" style="margin-top:40px; border-top: 1px solid #eee; padding-top: 30px;">
                <p style="font-weight:700; margin-bottom:15px; font-size:0.9rem;">ENTER EMAIL TO RECEIVE ANALYSIS</p>
                <input type="email" id="u-email" placeholder="your@email.com" class="main-input" style="max-width:100%; margin-bottom:20px;">
                <button class="btn-primary" style="width:100%;" onclick="calculateReport()">Generate Results</button>
            </div>`;
    }

    html += `</div>`;
    document.getElementById('question-area').innerHTML = html;

    // Handle External Navigation Buttons
    document.getElementById('next-btn').style.display = isLast ? 'none' : 'inline-block';
    document.getElementById('back-btn').style.display = currentIdx === 0 ? 'none' : 'inline-block';
}

function saveAnswer(val) {
    userAnswers[currentIdx] = val;
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) {
        alert("Please select a rating to continue.");
        return;
    }
    currentIdx += step;
    renderQuestion();
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email || !email.includes('@')) {
        alert("Please enter a valid email address.");
        return;
    }

    const score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    const totalQuestions = testData[activeKey].questions.length;
    const maxScore = totalQuestions * 5;
    
    // 1. TRIGGER EMAIL (EmailJS)
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { 
        user_email: email, 
        test_name: testData[activeKey].title,
        score: score 
    });

    // 2. GENERATE THE DYNAMIC REPORT CONTENT
    let reportTitle = "";
    let reportDescription = "";
    let traits = [];

    // Scoring Logic for Friction vs Flow
    if (score >= 22) {
        reportTitle = "The High Friction Seeker";
        reportDescription = "You perceive value through the lens of effort. While this makes you incredibly disciplined, you may be 'over-engineering' your path to success by ignoring efficient shortcuts.";
        traits = ["High Resilience", "Perfectionist Tendencies", "Skepticism of AI/Automation", "Process-Oriented"];
    } else if (score >= 15) {
        reportTitle = "The Balanced Optimizer";
        reportDescription = "You have a healthy relationship with effort. You aren't afraid of hard work, but you are constantly looking for the most effective way to produce results.";
        traits = ["Strategic Effort", "Pragmatic Learner", "Adaptive", "Result-Focused"];
    } else {
        reportTitle = "The Flow Specialist";
        reportDescription = "You are a master of leverage. You naturally gravitate toward systems and tools that maximize output with minimum friction.";
        traits = ["High Efficiency", "Early Adopter", "Outcome-Oriented", "Systemic Thinker"];
    }

    // 3. RENDER THE REPORT PAGE
    document.getElementById('report-page-content').innerHTML = `
        <div class="card" style="text-align:left; max-width:800px; margin: 0 auto; padding: 40px;">
            <div style="background: #f0fdf4; color: #166534; padding: 15px; border-radius: 10px; margin-bottom: 30px; border: 1px solid #bbf7d0; font-size: 0.9rem; text-align: center;">
                <strong>✓ Success!</strong> Your detailed PDF report has been dispatched to <strong>${email}</strong>.
            </div>

            <h4 style="color: var(--brand-magenta); font-weight: 800; margin-bottom: 5px; font-size: 0.8rem; letter-spacing: 1px;">DIAGNOSTIC RESULT</h4>
            <h1 class="text-gradient" style="font-size: 2.5rem; margin-top: 0;">${reportTitle}</h1>
            
            <p style="font-size: 1.1rem; line-height: 1.6; color: #334155; margin-bottom: 30px;">
                ${reportDescription}
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
                ${traits.map(trait => `
                    <div style="background: var(--bg-lavender); padding: 15px; border-radius: 12px; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 10px;">
                        <span style="color: var(--brand-magenta);">✦</span> ${trait}
                    </div>
                `).join('')}
            </div>

            <div style="border-top: 2px solid #f1f5f9; padding-top: 30px; text-align: center;">
                <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">Want to discuss these results with a professional coach?</p>
                <button class="btn-primary" onclick="showPage('coaching')">Book Coaching Session</button>
                <button class="btn-primary" style="background: transparent; color: #64748b; border: 1px solid #cbd5e1; margin-left: 10px;" onclick="showPage('home')">Back to Home</button>
            </div>
        </div>
    `;

    showPage('report');
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
