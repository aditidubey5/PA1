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
        title: "Open DISC Assessment (ODAT)", 
        questions: ["I am assertive and demand results.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.", "I tend to take charge in groups."] 
    },
    'bigfive': { 
        title: "Big Five Personality Inventory", 
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
                <h3 style="margin-bottom:25px; font-weight:800; font-size:1.6rem;">${testData[key].title}</h3>
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
        <div style="background:white; padding:3.5rem; border-radius:30px; border:1px solid #eee; text-align:center;">
            <p style="font-weight:800; color:var(--brand-purple); margin-bottom:1rem;">QUESTION ${currentIdx + 1}</p>
            <p style="font-size:1.6rem; font-weight:700; margin-bottom:2.5rem; line-height:1.3;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:500px; margin:0 auto;">
                <span style="font-size:0.7rem; font-weight:800; color:#94a3b8;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();" style="width:28px; height:28px; accent-color:var(--brand-purple); cursor:pointer;">`).join('')}
                <span style="font-size:0.7rem; font-weight:800; color:#94a3b8;">ALWAYS</span>
            </div>
        </div>`;
    document.getElementById('prev-btn').style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').innerText = currentIdx === testData[activeKey].questions.length - 1 ? "Finish" : "Next";
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
        let category, advice, plan;
        if (totalScore <= 12) {
            category = "The Essentialist (Flow State)";
            advice = "You value Outcome over Effort. You have a natural ability to find the 'Path of Least Resistance'.";
            plan = "Practice acknowledging your efficiency as a skill, not a shortcut. Did quality suffer, or just your ego?";
        } else if (totalScore <= 21) {
            category = "The Balanced Achiever";
            advice = "You understand that some things require a 'grind', but you aren't addicted to it.";
            plan = "Watch out for 'Complexity Creep'—don't let simple tasks become hard just because you have the time.";
        } else {
            category = "The Friction Seeker (Hard-Way Bias)";
            advice = "You subconsciously equate suffering with value. You likely overlook 'Easy Wins'.";
            plan = "Practice 'Strategic Laziness'. Try to achieve one goal this week using the easiest method possible.";
        }

        resultHTML = `
            <div class="container" style="text-align:left; max-width:800px; padding-top:60px;">
                <h1 class="text-gradient" style="font-size:3.5rem; margin-bottom:20px;">${category}</h1>
                <p style="font-size:1.4rem; line-height:1.6;">${advice}</p>
                <div class="card" style="margin-top:40px; text-align:left; border-left: 6px solid var(--brand-magenta); background:#fff;">
                    <h3 style="color:var(--brand-purple); font-size:1.8rem;">Your Re-Wiring Plan</h3>
                    <p style="font-size:1.1rem; line-height:1.8;">${plan}</p>
                </div>
                <button class="btn-primary" style="margin-top:40px" onclick="showPage('home')">Back to Home</button>
            </div>`;
    } else {
        resultHTML = `<div class="container"><h1>Report Sent!</h1><p>Detailed analysis for ${testData[activeKey].title} sent to ${email}.</p></div>`;
    }

    showPage('report');
    document.getElementById('report-wrapper').innerHTML = resultHTML;
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
