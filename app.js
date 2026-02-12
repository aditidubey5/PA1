const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

(function() { emailjs.init(PUBLIC_KEY); })();

const testData = {
    'friction': {
        title: "Friction vs. Flow Quiz",
        questions: [
            "If I achieve a goal quickly and easily, I feel like I haven't 'really' earned it.",
            "When learning something new, I feel guilty if I don't read the entire material from start to finish.",
            "I prefer to work on complex problems, even if they are less profitable than simple ones.",
            "I would rather wait until I can do a 'perfect' 1-hour session than settle for 10 minutes.",
            "I feel more productive on days when I am exhausted at the end.",
            "I am skeptical of new tools or shortcuts that promise to make work 10x faster."
        ]
    },
    'odat': {
        title: "Open DISC Assessment",
        questions: ["I am assertive.", "I enjoy influencing others.", "I prefer stability.", "I pay attention to detail.", "I take charge."]
    },
    'bigfive': {
        title: "Big Five Personality",
        questions: ["I am outgoing.", "I am compassionate.", "I am organized.", "I am anxious.", "I am creative."]
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
            <div class="card">
                <h3 style="font-weight:800; font-size:1.8rem; margin-bottom:25px;">${testData[key].title}</h3>
                <button class="btn-primary" style="width:100%" onclick="loadTest('${key}')">Begin Analysis</button>
            </div>`;
    }
}

function loadTest(id) {
    activeKey = id; currentIdx = 0; userAnswers = {};
    showPage('engine');
    document.getElementById('test-title').innerText = testData[id].title;
    document.getElementById('question-area').style.display = 'block';
    document.getElementById('final-step').style.display = 'none';
    renderQuestion();
}

function renderQuestion() {
    const qText = testData[activeKey].questions[currentIdx];
    document.getElementById('question-area').innerHTML = `
        <div class="card" style="max-width:750px; margin: 40px auto; cursor: default;">
            <p style="font-weight:800; color:var(--brand-purple); margin-bottom:10px;">QUESTION ${currentIdx + 1} OF ${testData[activeKey].questions.length}</p>
            <p style="font-size:1.8rem; font-weight:800; margin-bottom:40px;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:500px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.8rem;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();" style="width:30px; height:30px; cursor:pointer;">`).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.8rem;">ALWAYS</span>
            </div>
        </div>`;
}

function updateProgress() {
    const pct = Math.round((Object.keys(userAnswers).length / testData[activeKey].questions.length) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-text').innerText = pct + '% Complete';
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Please select a rating.");
    currentIdx += step;
    if (currentIdx >= testData[activeKey].questions.length) {
        document.getElementById('question-area').style.display = 'none';
        document.getElementById('final-step').style.display = 'block';
    } else { renderQuestion(); }
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email) return alert("Email required.");
    
    let score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { 
        user_email: email, 
        test_name: testData[activeKey].title, 
        score: score 
    }).then(() => alert("Report Sent to " + email));

    let reportHTML = `
        <div class="report-wrapper">
            <h1 class="text-gradient" style="font-size:3.5rem; margin-bottom:30px;">Analysis Complete</h1>
            <div class="report-section">
                <h3>Diagnostic Result</h3>
                <p>Your score of ${score} has been analyzed. A high-performance strategy has been dispatched to your inbox.</p>
            </div>
            <button class="btn-primary" onclick="showPage('home')">Return to Dashboard</button>
        </div>`;

    document.getElementById('report-page-content').innerHTML = reportHTML;
    showPage('report');
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
