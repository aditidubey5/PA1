

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
            "I feel an urgent need to reply to every notification immediately, regardless of what I am working on.",
            "I spend more time 'organizing' my work (emails, tabs, folders) than actually doing the work.",
            "I often attend meetings where I have no clear contribution just to stay 'in the loop'.",
            "I find it difficult to identify the one task that would make all other tasks easier or unnecessary.",
            "My workday is mostly dictated by other people's requests (inbox/Slack) rather than my own priorities.",
            "I feel productive when I am 'busy' even if I haven't completed any major milestones.",
            "I struggle to work on a single project for more than 30 minutes without checking my phone or email.",
            "I find myself caught in 'research loops'—reading more information than I actually need to take action.",
            "At the end of the day, I often feel tired but can't point to one significant thing I accomplished.",
            "I am afraid that if I don't stay connected 24/7, I will miss a 'vital' piece of information."
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
                <h3 style="margin-bottom:20px; font-size: 1.1rem;">${testData[key].title}</h3>
                <button class="btn-primary" style="padding:10px 15px; font-size: 0.75rem; width: 100%;">START ANALYSIS</button>
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
        <div class="card" style="max-width:650px; margin: 40px auto; cursor: default; text-align:center;">
            <p style="font-size:1.3rem; font-weight:800; margin-bottom:30px; line-height:1.4;">${questions[currentIdx]}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:450px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">DISAGREE</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" onchange="userAnswers[${currentIdx}]=${v}" ${userAnswers[currentIdx]==v?'checked':''} style="width:25px; height:25px; accent-color:var(--brand-magenta);">`).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">AGREE</span>
            </div>
            ${isLast ? `
                <div style="margin-top:40px; border-top:1px solid #eee; padding-top:20px;">
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

function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email.includes('@')) return alert("Enter valid email.");
    const score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { user_email: email, test_name: testData[activeKey].title, score: score });

    let title, desc, traits;

    if (activeKey === 'friction') {
        if (score >= 38) {
            title = "The Martyr Archetype";
            desc = "You equate exhaustion with integrity. High risk of burnout.";
            traits = ["Complexity Addiction", "Manual Bias", "Hero Mentality"];
        } else if (score >= 25) {
            title = "The Performer Archetype";
            desc = "Balanced optimizer. You work hard but open to leverage.";
            traits = ["Adaptive Effort", "Pragmatic", "Result-Oriented"];
        } else {
            title = "The Architect Archetype";
            desc = "Flow specialist. You prioritize leverage over labor.";
            traits = ["Systemic Thinker", "High Leverage", "Outcome-Focused"];
        }
    } else if (activeKey === 'signal') {
        if (score >= 38) {
            title = "The Firefighter";
            desc = "You are in a constant state of reaction. Noise has overwhelmed your Signal.";
            traits = ["Hyper-Reactive", "Shallow Work Bias", "Inbox Addiction"];
        } else if (score >= 25) {
            title = "The Broadcast Hub";
            desc = "You are connected to everything but deeply focused on nothing.";
            traits = ["Context Switching", "Information Loops", "Passive Action"];
        } else {
            title = "The Deep Diver";
            desc = "You have high immunity to noise. You focus on high-impact signals.";
            traits = ["Deep Work Mastery", "Selective Ignorance", "Elite Focus"];
        }
    } else {
        title = "Analysis Complete";
        desc = "Your psychometric data has been processed.";
        traits = ["Logical", "Analytical", "Data-Driven"];
    }

    

    document.getElementById('report-page-content').innerHTML = `
        <div class="card" style="text-align:left; max-width:800px; margin:0 auto; padding:40px;">
            <div style="background:#f0fdf4; color:#166534; padding:15px; border-radius:10px; margin-bottom:20px; text-align:center;">✓ Report Sent to ${email}</div>
            <h1 class="text-gradient" style="font-size:2.8rem; margin-top:0;">${title}</h1>
            <p style="font-size:1.1rem; line-height:1.7; color:#334155;">${desc}</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:30px 0;">
                ${traits.map(t => `<div style="background:var(--bg-lavender); padding:18px; border-radius:12px; font-weight:700;">✦ ${t}</div>`).join('')}
            </div>
            <button class="btn-primary" style="width:100%;" onclick="showPage('coaching')">Apply for Coaching</button>
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
                <input type="tel" id="c-phone" placeholder="Phone Number" class="main-input">
                <textarea id="c-focus" placeholder="Focus Area" class="main-input" style="height:80px;"></textarea>
                <button class="btn-primary" style="width:100%;" onclick="sendCoachingRequest()">Request Consultation</button>
            </div>
        </div>`;
}

function sendCoachingRequest() {
    const data = { from_name: document.getElementById('c-name').value, user_email: document.getElementById('c-email').value, phone: document.getElementById('c-phone').value, message: document.getElementById('c-focus').value };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, data).then(() => { alert("Sent!"); showPage('home'); });
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
