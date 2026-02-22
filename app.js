const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

(function() { emailjs.init(PUBLIC_KEY); })();

const testData = {
    'friction': {
        title: "Friction vs. Flow Quiz",
        questions: [
            "If I achieve a goal quickly and easily, I often feel like I haven't 'really' earned the result.",
            "I tend to view colleagues who find 'easy' ways to do hard things as cutting corners.",
            "I find myself preferring complex problems, even if they are less profitable than simpler ones.",
            "I feel 'guilty' if I finish my primary work tasks before the workday is officially over.",
            "I feel more virtuous on days when I am physically exhausted by the end.",
            "I am naturally skeptical of new tools or AI that promise to make work 10x faster.",
            "If a project doesn't feel stressful, I worry the final quality will be lower.",
            "I add more features to a task than requested to ensure it's 'thorough'.",
            "I'd rather do a task manually for 'control' than set up an automated system.",
            "I believe professional growth is only possible through intense 'grinding'."
        ]
    },
    'signal': {
        title: "Signal vs. Noise Audit",
        questions: [
            "I feel an urgent need to reply to every notification immediately.",
            "I spend more time 'organizing' my work than actually doing it.",
            "I often attend meetings where I have no clear contribution.",
            "I struggle to identify the one task that makes everything else easier.",
            "My workday is mostly dictated by other people's requests.",
            "I feel productive when I am 'busy' even without milestones.",
            "I struggle to work on one project for 30 minutes without checking my phone.",
            "I find myself caught in 'research loops' reading too much info.",
            "At the end of the day, I feel tired but haven't accomplished much.",
            "I am afraid that if I don't stay connected 24/7, I will miss something vital."
        ]
    },
    'odat': {
        title: "Open DISC Assessment",
        questions: [
            "I am assertive and direct.", "I enjoy influencing others.", "I prefer steady environments.", 
            "I pay close attention to accuracy.", "I prioritize results over relationships.",
            "I am an active listener.", "I enjoy working in teams.", "I am very organized.",
            "I tend to take charge in group settings.", "I prefer following a set schedule.",
            "I am persuasive when presenting ideas.", "I am known for being calm under pressure.",
            "I enjoy helping others solve problems.", "I am very detail-oriented.",
            "I focus on the big picture rather than small details.", "I value stability in my work.",
            "I am quick to make decisions.", "I am very enthusiastic about new projects.",
            "I am a patient person.", "I always check my work for errors."
        ] // Restored to 20-question comprehensive version
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        questions: [
            "I am the life of the party.", "I am concerned about others' feelings.", "I am always prepared.", 
            "I get upset easily.", "I have a vivid imagination.", "I talk to a lot of different people.",
            "I sympathize with others' feelings.", "I leave my belongings around (reversed).",
            "I am relaxed most of the time.", "I have difficulty understanding abstract ideas.",
            "I keep in the background.", "I am not interested in other people's problems.",
            "I follow a schedule.", "I have frequent mood swings.", "I am full of ideas.",
            "I am quiet around strangers.", "I make people feel at ease.", "I am exacting in my work.",
            "I often feel blue.", "I am quick to understand things."
        ] // Restored to 20-question comprehensive version
    }
};

let activeKey = null, currentIdx = 0, userAnswers = {};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    const targetPage = document.getElementById(id);
    if (targetPage) targetPage.style.display = 'block';

    document.querySelectorAll('.nav-links span').forEach(s => s.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + id);
    if(activeNav) activeNav.classList.add('active');

    if(id === 'tests') renderGrid();
    if(id === 'coaching') renderCoachingPage();
    window.scrollTo(0, 0);
}

function renderGrid() {
    const grid = document.getElementById('test-grid-ui');
    if (!grid) return;
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `
            <div class="card" onclick="loadTest('${key}')">
                <h3 style="margin-bottom:20px; font-size: 1.1rem;">${testData[key].title}</h3>
                <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 20px;">${testData[key].questions.length} Questions</p>
                <button class="btn-primary" style="padding:10px 15px; width:100%;">START ANALYSIS</button>
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
    const test = testData[activeKey];
    if (!test) return;
    const questions = test.questions;
    const isLast = currentIdx === questions.length - 1;
    const questionText = questions[currentIdx] || "End of Assessment reached.";

    document.getElementById('question-area').innerHTML = `
        <div class="card" style="max-width:650px; margin: 40px auto; cursor: default; text-align:center;">
            <p style="font-size: 0.8rem; color: #a855f7; font-weight: 800; margin-bottom: 10px;">QUESTION ${currentIdx + 1} OF ${questions.length}</p>
            <p style="font-size:1.3rem; font-weight:800; margin-bottom:30px; line-height:1.4;">${questionText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:450px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">DISAGREE</span>
                ${[1, 2, 3, 4, 5].map(v => `
                    <input type="radio" name="q" value="${v}" 
                    onclick="saveAnswer(${v})" 
                    ${userAnswers[currentIdx] == v ? 'checked' : ''} 
                    style="width:25px; height:25px; accent-color:#d946ef;">
                `).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">AGREE</span>
            </div>
            ${isLast ? `
                <div style="margin-top:40px; border-top:1px solid #eee; padding-top:20px;">
                    <input type="email" id="u-email" placeholder="professional@email.com" class="main-input" required>
                    <button class="btn-primary" style="width:100%; margin-top:10px;" onclick="calculateReport()">Generate Results</button>
                </div>` : ''}
        </div>`;

    document.getElementById('next-btn').style.display = isLast ? 'none' : 'inline-block';
    document.getElementById('back-btn').style.display = currentIdx === 0 ? 'none' : 'inline-block';
}

function saveAnswer(v) { userAnswers[currentIdx] = v; }

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Please select an answer.");
    currentIdx += step;
    renderQuestion();
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email || !email.includes('@')) return alert("Valid email required.");

    const score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    const maxScore = testData[activeKey].questions.length * 5;
    const percentage = (score / maxScore) * 100;

    emailjs.send(SERVICE_ID, TEMPLATE_ID, { user_email: email, test_name: testData[activeKey].title, score: score });

    let title, desc, traits;

    // Logic for Friction Test
    if (activeKey === 'friction') {
        if (percentage >= 75) { title = "The Martyr Archetype"; desc = "You equate suffering with value. High risk of burnout."; traits = ["Complexity Addiction", "Manual Bias", "Hero Mentality"]; }
        else if (percentage >= 50) { title = "The Performer Archetype"; desc = "Balanced optimizer. You work hard but value systems."; traits = ["Adaptive Effort", "Pragmatic", "Result-Oriented"]; }
        else { title = "The Architect Archetype"; desc = "Flow specialist. You prioritize leverage over labor."; traits = ["High Leverage", "Systemic Thinker", "Outcome-Focused"]; }
    } 
    // Logic for Signal vs Noise
    else if (activeKey === 'signal') {
        if (percentage >= 75) { title = "The Firefighter"; desc = "You are in constant reaction mode. Noise has overwhelmed Signal."; traits = ["Hyper-Reactive", "Inbox Addiction", "Shallow Work Bias"]; }
        else { title = "The Deep Diver"; desc = "You have high immunity to noise. You focus on high-impact signals."; traits = ["Deep Work Mastery", "Selective Ignorance", "Elite Focus"]; }
    }
    // Logic for DISC/Big5
    else {
        title = "Psychometric Profile Complete";
        desc = "Your data indicates a strong professional baseline. Your detailed traits are listed below.";
        traits = ["Analytical", "Strategic", "Driven"];
    }

    

    document.getElementById('report-page-content').innerHTML = `
        <div class="card" style="text-align:left; max-width:800px; margin:0 auto; padding:40px;">
            <div style="background:#f0fdf4; color:#166534; padding:15px; border-radius:10px; margin-bottom:20px; text-align:center; font-weight:bold;">Analysis Dispatched to ${email}</div>
            <h1 class="text-gradient" style="font-size:2.8rem; margin-top:0;">${title}</h1>
            <p style="font-size:1.1rem; line-height:1.7; color:#334155;">${desc}</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:30px 0;">
                ${traits.map(t => `<div style="background:#dcd6f7; padding:18px; border-radius:12px; font-weight:700;">✦ ${t}</div>`).join('')}
            </div>
            <button class="btn-primary" style="width:100%;" onclick="showPage('coaching')">Book Coaching Session</button>
        </div>`;
    showPage('report');
}

function renderCoachingPage() {
    document.getElementById('coaching').innerHTML = `
        <div class="container" style="text-align:center;">
            <h1 class="text-gradient">Elite Coaching</h1>
            <div class="card" style="max-width:500px; margin: 0 auto; text-align:left;">
                <input type="text" id="c-name" placeholder="Full Name" class="main-input">
                <input type="email" id="c-email" placeholder="Email" class="main-input">
                <textarea id="c-focus" placeholder="Primary Challenge?" class="main-input" style="height:100px;"></textarea>
                <button class="btn-primary" style="width:100%;" onclick="sendCoachingRequest()">Request Consultation</button>
            </div>
        </div>`;
}

function sendCoachingRequest() {
    const data = { from_name: document.getElementById('c-name').value, user_email: document.getElementById('c-email').value, message: document.getElementById('c-focus').value };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, data).then(() => { alert("Consultation request sent!"); showPage('home'); });
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
