/* --- CONFIGURATION --- */
const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

(function() { emailjs.init(PUBLIC_KEY); })();

const testData = {
    'odat': {
        title: "Open DISC Assessment (ODAT)",
        questions: ["I am assertive and demand results.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.", "I tend to take charge in groups.", "I am a very sociable person.", "I am patient with others.", "I value accuracy over speed.", "I am direct when telling people what to do.", "I like to inspire others to act.", "I am a consistent and reliable worker.", "I enjoy following established protocols.", "I am competitive and like to win.", "I am enthusiastic about new projects.", "I dislike sudden changes in my routine.", "I am very thorough in my work.", "I am decisive even under pressure.", "I enjoy being the center of attention.", "I am a good listener.", "I focus on the facts and data.", "I am bold when facing challenges.", "I am very optimistic.", "I avoid conflict whenever possible.", "I am precise and orderly.", "I take risks to get ahead.", "I am very talkative.", "I am a calm and steady person.", "I am careful to follow instructions.", "I prioritize results over feelings.", "I love meeting new people.", "I am a team player.", "I am highly analytical.", "I speak my mind clearly.", "I am very persuasive.", "I am dependable.", "I am disciplined.", "I set high goals.", "I am very animated when talking.", "I am a peaceful person.", "I check my work multiple times."],
        interpret: (avg) => generateLongReport("People Assets: DISC Profile", avg)
    },
    'bigfive': {
        title: "Five-Factor Personality Inventory",
        questions: ["I am the life of the party.", "I feel little concern for others.", "I am always prepared.", "I get stressed out easily.", "I have a rich vocabulary.", "I don't talk a lot.", "I am interested in people.", "I leave my belongings around.", "I am relaxed most of the time.", "I am not interested in abstract ideas.", "I feel comfortable around people.", "I insult people.", "I pay attention to details.", "I worry about things.", "I have a vivid imagination.", "I keep in the background.", "I sympathize with others' feelings.", "I make a mess of things.", "I seldom feel blue.", "I am not interested in theoretical discussions.", "I start conversations.", "I am not interested in other people's problems.", "I get chores done right away.", "I am easily disturbed.", "I have a great deal of ideas.", "I have little to say.", "I have a soft heart.", "I often forget to put things back.", "I get upset easily.", "I do not have a good imagination.", "I talk to a lot of different people.", "I believe that others have good intentions.", "I follow a schedule.", "I change my mood a lot.", "I am quick to understand things.", "I don't like to draw attention.", "I take time out for others.", "I shirk my duties.", "I have frequent mood swings.", "I use difficult words.", "I don't mind being the center of attention.", "I feel others' emotions.", "I follow through with my plans.", "I am easily irritated.", "I spend time reflecting on things.", "I am quiet around strangers.", "I make people feel at ease.", "I am exacting in my work.", "I often feel blue.", "I am full of ideas."],
        interpret: (avg) => generateLongReport("People Assets: Five-Factor Profile", avg)
    }
};

let activeKey = null;
let currentIdx = 0;
let userAnswers = {};

/* --- NAVIGATION --- */
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    const target = document.getElementById(id);
    if(target) target.style.display = 'block';
    if(id === 'tests') renderGrid();
    window.scrollTo(0, 0);
}

function renderGrid() {
    const grid = document.getElementById('test-grid-ui');
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `
            <div class="card">
                <div class="badge" style="margin-bottom:10px">Validated</div>
                <h3 style="margin-bottom:20px">${testData[key].title}</h3>
                <button class="btn-outline" onclick="loadTest('${key}')">Begin Analysis</button>
            </div>`;
    }
}

/* --- TEST ENGINE --- */
function loadTest(id) {
    activeKey = id;
    currentIdx = 0;
    userAnswers = {};
    showPage('engine');
    document.getElementById('test-title').innerText = testData[id].title;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('final-step').style.display = 'none';
    renderQuestion();
}

function renderQuestion() {
    const qText = testData[activeKey].questions[currentIdx];
    const area = document.getElementById('active-question-area');
    
    area.innerHTML = `
        <div class="q-card fade-in">
            <span style="color: var(--blue); font-weight: 800; font-size: 0.85rem; letter-spacing:1px">QUESTION ${currentIdx + 1} OF ${testData[activeKey].questions.length}</span>
            <p class="q-text">${qText}</p>
            <div class="opt-group">
                <span style="font-size: 0.7rem; font-weight: 800; color: #94a3b8;">DISAGREE</span>
                ${[1, 2, 3, 4, 5].map(v => `
                    <input type="radio" name="activeQ" value="${v}" 
                    ${userAnswers[currentIdx] == v ? 'checked' : ''} 
                    onchange="userAnswers[${currentIdx}]=${v}; updateProgress();">
                `).join('')}
                <span style="font-size: 0.7rem; font-weight: 800; color: #94a3b8;">AGREE</span>
            </div>
        </div>`;
    
    document.getElementById('prev-btn').style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').innerText = currentIdx === testData[activeKey].questions.length - 1 ? "Finish" : "Next Question";
    updateProgress();
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Please select an option to continue.");
    currentIdx += step;
    if (currentIdx >= testData[activeKey].questions.length) {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('final-step').style.display = 'block';
    } else {
        renderQuestion();
    }
}

function updateProgress() {
    const total = testData[activeKey].questions.length;
    const answered = Object.keys(userAnswers).length;
    const pct = Math.round((answered / total) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-text').innerText = pct + '% Complete';
}

/* --- ANALYSIS & EMAIL --- */
function generateLongReport(name, avg) {
    const isHigh = avg > 3;
    const summary = isHigh ? "Strategic Agency: Your profile indicates a results-oriented mindset with high decisiveness." : "Systemic Integrity: Your profile indicates a methodical approach with high operational reliability.";
    const deepDive = `
        <div class="report-section"><h3>Detailed Architecture</h3><p>Based on your scoring, you exhibit a ${isHigh ? 'proactive' : 'stable'} behavioral baseline...</p></div>
        <div class="report-section"><h3>Leadership Impact</h3><p>Your professional value lies in your ability to ${isHigh ? 'drive vision' : 'maintain quality'}...</p></div>`;
    return { title: name, summary, deepDive };
}

function calculateReport() {
    const emailAddr = document.getElementById('user-email').value;
    let total = 0;
    Object.values(userAnswers).forEach(v => total += v);
    const avg = total / testData[activeKey].questions.length;
    const report = testData[activeKey].interpret(avg);

    document.getElementById('report-wrapper').innerHTML = `
        <div class="report-header-dark">
            <small style="text-transform:uppercase; letter-spacing:2px">Official People Assets Analysis</small>
            <h1 style="margin-top:10px">${report.title}</h1>
        </div>
        <div class="report-body">
            <p class="summary-text" style="font-size:1.3rem; border-left:6px solid var(--blue); padding-left:20px">${report.summary}</p>
            ${report.deepDive}
            <div style="text-align:center; margin-top:3rem">
                <button class="btn-primary" onclick="window.print()">Download PDF Report</button>
            </div>
        </div>`;
    showPage('report');

    if (emailAddr) {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            user_email: emailAddr,
            test_name: report.title,
            report_summary: report.summary,
            report_details: report.deepDive.replace(/<[^>]*>/g, '')
        });
    }
}

// BOOTSTRAP: Start at Home
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});
