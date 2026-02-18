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
            "I tend to be assertive and direct when dealing with others.",
            "I find great enjoyment in influencing others.",
            "I prioritize a steady, predictable environment.",
            "I pay close attention to accuracy and high standards.",
            "I prioritize objective results over personal relationships."
        ]
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        questions: [
            "I am the life of the party and feel energized by social gatherings.",
            "I have a soft heart and am concerned about others' feelings.",
            "I am always prepared and highly organized.",
            "I get upset or anxious easily.",
            "I have a vivid imagination and love new ideas."
        ]
    }
};

let activeKey = null, currentIdx = 0, userAnswers = {};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';

    // Update Nav Highlights
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
                <button class="btn-primary" style="padding:10px 20px;">START →</button>
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
            <p style="font-size:1.3rem; font-weight:800; margin-bottom:30px;">${questions[currentIdx]}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:450px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">DISAGREE</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" onchange="userAnswers[${currentIdx}]=${v}" ${userAnswers[currentIdx]==v?'checked':''} style="width:25px; height:25px;">`).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">AGREE</span>
            </div>
            ${isLast ? `
                <div style="margin-top:40px; border-top:1px solid #eee; padding-top:20px;">
                    <input type="email" id="u-email" placeholder="Enter email for report" class="main-input">
                    <button class="btn-primary" style="width:100%;" onclick="calculateReport()">Generate Results</button>
                </div>` : ''}
        </div>`;

    document.getElementById('next-btn').style.display = isLast ? 'none' : 'inline-block';
    document.getElementById('back-btn').style.display = currentIdx === 0 ? 'none' : 'inline-block';
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Please select an answer.");
    currentIdx += step;
    renderQuestion();
}

function renderCoachingPage() {
    document.getElementById('coaching').innerHTML = `
        <div class="container" style="text-align:center;">
            <h1 class="text-gradient">Executive Coaching</h1>
            <p>Request a consultation to align your behavioral profile with your goals.</p>
            <div class="card" style="max-width:500px; margin: 30px auto; text-align:left;">
                <input type="text" id="c-name" placeholder="Full Name" class="main-input">
                <input type="email" id="c-email" placeholder="Email Address" class="main-input">
                <input type="tel" id="c-phone" placeholder="Phone Number" class="main-input">
                <textarea id="c-focus" placeholder="Focus Area" class="main-input" style="height:100px;"></textarea>
                <button class="btn-primary" style="width:100%;" onclick="sendCoachingRequest()">Submit Request</button>
            </div>
        </div>`;
}

function sendCoachingRequest() {
    const data = { 
        from_name: document.getElementById('c-name').value, 
        user_email: document.getElementById('c-email').value,
        phone: document.getElementById('c-phone').value,
        message: document.getElementById('c-focus').value
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, data).then(() => {
        alert("Request Sent! We will reach out shortly.");
        showPage('home');
    });
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    const score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { user_email: email, test_name: testData[activeKey].title, score: score });

    let title = score >= 22 ? "High Friction Seeker" : (score >= 15 ? "Balanced Optimizer" : "Flow Specialist");
    
    document.getElementById('report-page-content').innerHTML = `
        <div class="card" style="text-align:center;">
            <div style="background:#f0fdf4; color:#166534; padding:15px; border-radius:10px; margin-bottom:20px;">✓ Email Sent to ${email}</div>
            <h1 class="text-gradient">${title}</h1>
            <p>Score: ${score}. Your profile is ready. Check your inbox.</p>
            <button class="btn-primary" onclick="showPage('coaching')">Book Coaching</button>
        </div>`;
    showPage('report');
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
