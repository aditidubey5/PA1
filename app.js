// Replace with your keys
const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";
(function() { emailjs.init(PUBLIC_KEY); })();

const testData = {
    'friction': { title: "Friction vs. Flow", questions: ["I feel guilty if I don't read the entire material.", "Achievements only count if they were hard.", "I prefer complex problems over profitable ones.", "I skip small habits if they don't feel substantial.", "I'm skeptical of shortcuts."] },
    'odat': { title: "Open DISC Assessment", questions: ["I am assertive.", "I enjoy influencing others.", "I prefer stability.", "I pay attention to detail."] },
    'bigfive': { title: "Big Five Personality", questions: ["I am outgoing.", "I am compassionate.", "I am organized.", "I am anxious."] }
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
                <p style="color: #64748b; font-size: 0.9rem; margin-top: 10px;">Click to start analysis</p>
            </div>`;
    }
}

function loadTest(id) {
    activeKey = id; currentIdx = 0; userAnswers = {};
    showPage('engine');
    document.getElementById('test-title').innerText = testData[id].title;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('final-step').style.display = 'none';
    renderQuestion();
}

function renderQuestion() {
    const qText = testData[activeKey].questions[currentIdx];
    document.getElementById('active-question-area').innerHTML = `
        <div style="background:white; padding:50px; border-radius:30px; box-shadow:0 10px 40px rgba(0,0,0,0.05); margin: 30px 0;">
            <p style="font-weight:800; color:var(--brand-purple); margin-bottom:15px; text-transform:uppercase;">Step ${currentIdx + 1}</p>
            <p style="font-size:1.8rem; font-weight:800; line-height:1.3;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:500px; margin:40px auto 0;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.75rem;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();" style="width:25px; height:25px; cursor:pointer;">`).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.75rem;">ALWAYS</span>
            </div>
        </div>`;
    document.getElementById('prev-btn').style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Please select a rating.");
    currentIdx += step;
    if (currentIdx >= testData[activeKey].questions.length) {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('final-step').style.display = 'block';
    } else { renderQuestion(); }
}

function updateProgress() {
    const pct = Math.round((Object.keys(userAnswers).length / testData[activeKey].questions.length) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-text').innerText = pct + '% Complete';
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email) return alert("Email required.");
    
    let score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    let title = score >= 18 ? "The Friction Seeker" : (score >= 10 ? "The Balanced Achiever" : "The Flow Specialist");

    let reportHTML = `
        <h1 class="text-gradient" style="font-size:3.5rem; margin-bottom:20px;">Profile: ${title}</h1>
        <div class="report-section"><h3>Core Analysis</h3><p>Based on your responses, you prioritize effort as a metric of value. This can lead to mastery but also significant burnout risk.</p></div>
        <div class="report-section"><h3>30-Day Outlook</h3><p>Focus on reducing "structural friction" by automating repetitive tasks this month.</p></div>
        <button class="btn-primary" onclick="showPage('home')">Return Home</button>`;

    showPage('report');
    document.getElementById('report-wrapper').innerHTML = reportHTML;
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
