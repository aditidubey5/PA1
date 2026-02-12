// Replace with your keys
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
    'odat': { title: "Open DISC Assessment", questions: ["I am assertive.", "I enjoy influencing others.", "I prefer stability.", "I pay attention to detail.", "I take charge."] },
    'bigfive': { title: "Big Five Personality", questions: ["I am outgoing.", "I am compassionate.", "I am organized.", "I am anxious.", "I am creative."] }
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
                <h3 style="margin-bottom:30px; font-weight:800; font-size:1.8rem;">${testData[key].title}</h3>
                <button class="btn-outline" style="width:100%" onclick="loadTest('${key}')">Begin Analysis</button>
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
        <div class="question-card">
            <p style="font-weight:800; color:var(--brand-purple); margin-bottom:1rem; text-transform:uppercase;">Question ${currentIdx + 1} of ${testData[activeKey].questions.length}</p>
            <p style="font-size:1.8rem; font-weight:800; margin-bottom:3.5rem; line-height:1.2;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:500px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.8rem;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();" style="width:30px; height:30px; cursor:pointer;">`).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.8rem;">ALWAYS</span>
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
    
    let totalScore = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    let resultHTML = "";

    if (activeKey === 'friction') {
        let title = totalScore >= 22 ? "The Friction Seeker" : (totalScore >= 13 ? "The Balanced Achiever" : "The Flow Specialist");
        
        resultHTML = `
            <h1 class="text-gradient" style="font-size:3rem;">Detailed Report: ${title}</h1>
            <div class="report-section">
                <h3>The Diagnosis</h3>
                <p>Scoring in this category suggests that your internal 'value compass' is calibrated to effort rather than outcomes. For you, the struggle is evidence of the work’s worth.</p>
            </div>
            <div class="report-section">
                <h3>Your 30-Day Plan</h3>
                <p>Start viewing efficiency as the new 'hard' skill. It is easy to work long hours; it is incredibly difficult to have the discipline to do only what matters.</p>
            </div>
            <button class="btn-primary" style="margin-top:40px" onclick="showPage('home')">Finish</button>`;
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, { user_email: email, score: totalScore }).then(() => {
        alert("Report Sent to " + email);
    });

    showPage('report');
    document.getElementById('report-wrapper').innerHTML = resultHTML;
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
