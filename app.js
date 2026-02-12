// REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
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
            <p style="font-weight:800; color:var(--brand-purple); margin-bottom:1rem; text-transform:uppercase; letter-spacing:1px;">Question ${currentIdx + 1} of ${testData[activeKey].questions.length}</p>
            <p style="font-size:1.8rem; font-weight:800; margin-bottom:3.5rem; line-height:1.2; color:var(--text-dark);">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:500px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.8rem;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();" style="width:30px; height:30px; cursor:pointer;">`).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.8rem;">ALWAYS</span>
            </div>
        </div>`;
    document.getElementById('prev-btn').style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').innerText = (currentIdx === testData[activeKey].questions.length - 1) ? "Finalize" : "Next";
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Please select a rating.");
    currentIdx += step;
    if (currentIdx >= testData[activeKey].questions.length) {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('final-step').style.display = 'block';
        window.scrollTo(0,0);
    } else { renderQuestion(); }
}

function updateProgress() {
    const pct = Math.round((Object.keys(userAnswers).length / testData[activeKey].questions.length) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-text').innerText = pct + '% Complete';
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email) return alert("Email is required for report generation.");
    
    let totalScore = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    let resultHTML = "";

    if (activeKey === 'friction') {
        let title, intro, drivers, risks, plan;

        if (totalScore >= 22) {
            title = "The Friction Seeker";
            intro = "Scoring in the Friction Seeker category suggests that your internal 'value compass' is calibrated to effort rather than outcomes. For you, the struggle isn't just a byproduct of work—it is the evidence of the work’s worth.";
            drivers = "<b>The Competence Shield:</b> Complexity acts as a shield against self-judgment.<br><b>Moralizing the Grind:</b> You feel 'lazy' if a task is easy.<br><b>Prohibitive Perfectionism:</b> You skip small habits because they aren't 'painful' enough to count.";
            risks = "<b>Burnout without Breakthrough:</b> High risk of exhaustion.<br><b>Opportunity Cost:</b> Missing big wins while 'hand-carving' small solutions.";
            plan = "<b>The 7-Minute Rule:</b> Commit to the tiny version of goals.<br><b>Re-Define 'Hard':</b> View efficiency as the new difficult skill.";
        } else if (totalScore >= 13) {
            title = "The Balanced Achiever";
            intro = "You have a healthy relationship with effort. you understand that 'grinding' is a tool to be used sparingly, not a lifestyle.";
            drivers = "<b>Outcome Orientation:</b> You prioritize the result over the process.<br><b>Contextual Effort:</b> You know when to dig in and when to automate.";
            risks = "<b>Comfort Zone Trap:</b> You might avoid necessary friction in areas that require deep, painful growth.";
            plan = "<b>Identify 1 'Necessary Friction':</b> Find one area where you are playing it too safe and lean into the struggle.";
        } else {
            title = "The Essentialist (Flow State)";
            intro = "You are naturally wired for efficiency. You have zero interest in suffering for the sake of it, focusing purely on the Path of Least Resistance.";
            drivers = "<b>Radical Efficiency:</b> You naturally find shortcuts.<br><b>Ego-Less Work:</b> You don't need the work to be hard to feel proud.";
            risks = "<b>Surface-Level Mastery:</b> You might skip the 'deep work' required for elite-level expertise because it feels too slow.";
            plan = "<b>Embrace Deep Work:</b> Practice 90 minutes of focused, distraction-free work on a single hard problem once a week.";
        }

        resultHTML = `
            <div class="container" style="max-width:900px; padding-bottom:100px;">
                <h1 class="text-gradient" style="font-size:3.5rem; margin-bottom:10px;">Detailed Report: ${title}</h1>
                <div class="report-section"><h3>The Diagnosis</h3><p>${intro}</p></div>
                <div class="report-section"><h3>Key Psychological Drivers</h3><p>${drivers}</p></div>
                <div class="report-section"><h3>The Long-Term Risks</h3><p>${risks}</p></div>
                <div class="report-section"><h3>Your 30-Day Re-Wiring Plan</h3><p>${plan}</p></div>
                <button class="btn-primary" style="margin-top:50px" onclick="showPage('home')">Back to Home</button>
            </div>`;
    }

    // TRIGGER EMAILJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        user_email: email,
        test_name: testData[activeKey].title,
        score: totalScore
    }).then(() => {
        alert("Success! Your detailed report has been sent to " + email);
    });

    showPage('report');
    document.getElementById('report-wrapper').innerHTML = resultHTML;
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
