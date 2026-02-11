const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";
(function() { emailjs.init(PUBLIC_KEY); })();

const testData = {
    'friction': {
        title: "Friction vs. Flow Quiz",
        desc: "Identify if you have a 'Hard-Way' bias that limits your efficiency.",
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
        desc: "Map your dominant behavioral traits: Drive, Influence, Support, and Clarity.",
        questions: ["I am assertive and demand results.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.", "I tend to take charge in groups."] 
    },
    'bigfive': { 
        title: "Five-Factor Inventory", 
        desc: "The gold standard of personality science: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.",
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
                <div class="badge" style="margin-bottom:10px">Active</div>
                <h3 style="margin-bottom:15px; font-weight:800; font-size:1.6rem;">${testData[key].title}</h3>
                <p style="color:#64748b; margin-bottom:25px; font-size:0.9rem; line-height:1.5">${testData[key].desc}</p>
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
        <div style="background:white; padding:3.5rem; border-radius:30px; border:1px solid #eee; box-shadow: 0 10px 30px rgba(0,0,0,0.02)">
            <p style="font-weight:800; color:var(--brand-purple); margin-bottom:1rem; letter-spacing:1px">QUESTION ${currentIdx + 1} OF ${testData[activeKey].questions.length}</p>
            <p style="font-size:1.6rem; font-weight:700; margin-bottom:2.5rem; line-height:1.3">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:500px; margin:0 auto;">
                <span style="font-size:0.7rem; font-weight:800; color:#94a3b8;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();" style="width:28px; height:28px; cursor:pointer; accent-color:var(--brand-purple);">`).join('')}
                <span style="font-size:0.7rem; font-weight:800; color:#94a3b8;">ALWAYS</span>
            </div>
        </div>`;
    document.getElementById('prev-btn').style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').innerText = currentIdx === testData[activeKey].questions.length - 1 ? "Get My Score" : "Next Question";
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Please select a rating to continue.");
    currentIdx += step;
    if (currentIdx >= testData[activeKey].questions.length) {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('final-step').style.display = 'block';
    } else { renderQuestion(); }
}

function updateProgress() {
    const pct = Math.round((Object.keys(userAnswers).length / testData[activeKey].questions.length) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-text').innerText = pct + '% Analyzed';
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email) return alert("Please enter your email to receive your detailed report.");
    
    let totalScore = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    let resultHTML = "";

    if (activeKey === 'friction') {
        let category = "";
        let advice = "";
        if (totalScore <= 12) {
            category = "The Essentialist (Flow State)";
            advice = "You value Outcome over Effort. You find the Path of Least Resistance easily.";
        } else if (totalScore <= 21) {
            category = "The Balanced Achiever";
            advice = "You understand the grind but aren't addicted to it. Watch out for Complexity Creep.";
        } else {
            category = "The Friction Seeker (Hard-Way Bias)";
            advice = "You subconsciously equate suffering with value. Practice 'Strategic Laziness'.";
        }

        resultHTML = `
            <div class="container" style="text-align:left; max-width:800px;">
                <h1 class="text-gradient" style="font-size:3rem">Your Result: ${category}</h1>
                <div class="card" style="margin-top:20px; border-left: 5px solid var(--brand-magenta)">
                    <p style="font-size:1.2rem; line-height:1.6"><strong>The Diagnosis:</strong> ${advice}</p>
                </div>
                <h2 style="margin-top:40px">30-Day Re-Wiring Plan</h2>
                <ul style="line-height:2; font-size:1.1rem">
                    <li><strong>Path of Least Resistance:</strong> Ask 'What if this were easy?' before every task.</li>
                    <li><strong>Re-Define Hard:</strong> Discipline to do ONLY what matters is the new hard skill.</li>
                    <li><strong>Low-Bar Consistency:</strong> 7 minutes of action beats 1 hour of planning.</li>
                </ul>
                <button class="btn-primary" style="margin-top:40px" onclick="showPage('coaching')">Book a Discovery Call to Deep Dive</button>
            </div>`;
    } else {
        resultHTML = `<div class="container"><h1>Analysis Sent!</h1><p>Your results for ${testData[activeKey].title} have been dispatched.</p></div>`;
    }

    showPage('report');
    document.getElementById('report-wrapper').innerHTML = resultHTML;
    // EmailJS integration here
}
