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
        questions: ["I am assertive and demand results.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.", "I tend to take charge in groups."] 
    },
    'bigfive': { 
        title: "Big Five Personality", 
        questions: ["I am the life of the party.", "I feel concern for others.", "I am always prepared.", "I get stressed easily.", "I have a rich vocabulary."] 
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
        <div style="background:white; padding:4rem; border-radius:30px; box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
            <p style="font-weight:800; color:var(--brand-purple); margin-bottom:1rem;">QUESTION ${currentIdx + 1}</p>
            <p style="font-size:1.8rem; font-weight:800; margin-bottom:3rem; line-height:1.2;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:800; color:#94a3b8;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();" style="width:30px; height:30px; accent-color:var(--brand-magenta);">`).join('')}
                <span style="font-weight:800; color:#94a3b8;">ALWAYS</span>
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
        let cat = totalScore <= 12 ? "The Essentialist" : (totalScore <= 21 ? "Balanced Achiever" : "Friction Seeker");
        resultHTML = `<div class="container"><h1>Result: ${cat}</h1><button class="btn-primary" onclick="showPage('home')">Back Home</button></div>`;
    } else {
        resultHTML = `<div class="container"><h1>Analysis Sent!</h1><p>Sent to: ${email}</p></div>`;
    }

    showPage('report');
    document.getElementById('report-wrapper').innerHTML = resultHTML;
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
