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
    }
};

let activeKey = null, currentIdx = 0, userAnswers = {};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'flex'; // Uses flex for centering
    if(id === 'tests') renderGrid();
    window.scrollTo(0, 0);
}

function renderGrid() {
    const grid = document.getElementById('test-grid-ui');
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `<div class="card" onclick="loadTest('${key}')"><h3>${testData[key].title}</h3><p>Click to Begin</p></div>`;
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
        <div style="background:white; padding:50px; border-radius:30px; box-shadow:0 10px 40px rgba(0,0,0,0.05); margin: 30px 0; width:100%; max-width:600px;">
            <p style="font-weight:800; color:var(--brand-purple);">STEP ${currentIdx + 1}</p>
            <p style="font-size:1.8rem; font-weight:800; margin: 30px 0;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.7rem; font-weight:800; color:#94a3b8;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();" style="width:25px; height:25px;">`).join('')}
                <span style="font-size:0.7rem; font-weight:800; color:#94a3b8;">ALWAYS</span>
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
    let content = "";

    if (score >= 20) {
        content = `
            <h1 class="text-gradient" style="font-size:3rem; margin-bottom:40px;">The Friction Seeker</h1>
            <div class="report-section"><h3>The Diagnosis</h3><p>Your "value compass" is calibrated to effort rather than outcomes. The struggle isn't a byproduct—it's your evidence of worth.</p></div>
            <div class="report-section"><h3>Key Drivers</h3><p><b>The Competence Shield:</b> Complexity protects you from being "average."<br><b>Moralizing the Grind:</b> You believe "easy" equals "lazy."</p></div>
            <div class="report-section"><h3>30-Day Re-Wiring Plan</h3><p>1. The Least Resistance Exercise: Pick one task and force the simplest route.<br>2. The 7-Minute Rule: Commit to consistency over intensity.</p></div>`;
    } else {
        content = `
            <h1 class="text-gradient" style="font-size:3rem; margin-bottom:40px;">The Flow specialist</h1>
            <div class="report-section"><h3>The Diagnosis</h3><p>You naturally prioritize outcome over effort. You have zero interest in suffering for the sake of it.</p></div>
            <button class="btn-primary" onclick="showPage('home')">Back Home</button>`;
    }

    document.getElementById('report-wrapper').innerHTML = content;
    showPage('report');
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
