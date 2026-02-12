const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

(function() { emailjs.init(PUBLIC_KEY); })();

(function() { emailjs.init("zs8EuLqOZPjTVHF0M"); })();

const testData = {
    'friction': { title: "Friction vs. Flow", questions: ["Achievements count only if hard.", "Guilt when not reading everything.", "Prefer complex over easy.", "Skip small habits.", "Skeptical of shortcuts."] },
    'odat': { title: "Open DISC", questions: ["Assertive.", "Influential.", "Steady pace.", "Detail oriented.", "Results focused."] },
    'bigfive': { title: "Big Five Personality", questions: ["Outgoing.", "Compassionate.", "Organized.", "Anxious.", "Creative."] }
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
                <p style="color:var(--brand-purple); font-weight:700; font-size:0.8rem;">START ANALYSIS →</p>
            </div>`;
    }
}

function loadTest(id) {
    activeKey = id; currentIdx = 0; userAnswers = {};
    showPage('engine');
    document.getElementById('test-title').innerText = testData[id].title;
    document.getElementById('final-step').style.display = 'none';
    renderQuestion();
}

function renderQuestion() {
    const qText = testData[activeKey].questions[currentIdx];
    document.getElementById('question-area').innerHTML = `
        <div class="card" style="max-width:600px; margin: 40px auto; cursor: default;">
            <p style="font-size:1.4rem; font-weight:800; margin-bottom:30px;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" onchange="userAnswers[${currentIdx}]=${v}" style="width:25px; height:25px; cursor:pointer;">`).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">ALWAYS</span>
            </div>
        </div>`;
}

function changeQuestion(step) {
    if (!userAnswers[currentIdx]) return alert("Please select an answer.");
    currentIdx += step;
    if (currentIdx >= testData[activeKey].questions.length) {
        document.getElementById('question-area').innerHTML = "";
        document.getElementById('final-step').style.display = 'block';
    } else { renderQuestion(); }
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    const score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    
    emailjs.send("service_u11zlzf", "template_zpcklyu", { user_email: email, score: score });

    document.getElementById('report-page-content').innerHTML = `
        <div class="card" style="text-align:center;">
            <h1 class="text-gradient">Analysis Complete</h1>
            <p>Your score of ${score} has been analyzed. Check your inbox at ${email}.</p>
            <button class="btn-primary" onclick="showPage('home')">Return Home</button>
        </div>`;
    showPage('report');
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
