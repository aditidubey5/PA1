/* --- 1. CONFIGURATION --- */
const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

// Initialize EmailJS
(function() {
    emailjs.init(PUBLIC_KEY); 
})();

/* --- 2. ASSESSMENT DATA --- */
const testData = {
    'odat': {
        title: "Open DISC Assessment (ODAT)",
        questions: [
            "I am assertive and demand results.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.", "I tend to take charge in groups.", "I am a very sociable person.", "I am patient with others.", "I value accuracy over speed.", "I am direct when telling people what to do.", "I like to inspire others to act.", "I am a consistent and reliable worker.", "I enjoy following established protocols.", "I am competitive and like to win.", "I am enthusiastic about new projects.", "I dislike sudden changes in my routine.", "I am very thorough in my work.", "I am decisive even under pressure.", "I enjoy being the center of attention.", "I am a good listener.", "I focus on the facts and data.", "I am bold when facing challenges.", "I am very optimistic.", "I avoid conflict whenever possible.", "I am precise and orderly.", "I take risks to get ahead.", "I am very talkative.", "I am a calm and steady person.", "I am careful to follow instructions.", "I prioritize results over feelings.", "I love meeting new people.", "I am a team player.", "I am highly analytical.", "I speak my mind clearly.", "I am very persuasive.", "I am dependable.", "I am disciplined.", "I set high goals.", "I am very animated when talking.", "I am a peaceful person.", "I check my work multiple times."
        ],
        interpret: (avg) => generateLongReport("People Assets: DISC Profile", avg)
    },
    'bigfive': {
        title: "Five-Factor Personality Inventory",
        questions: [
            "I am the life of the party.", "I feel little concern for others.", "I am always prepared.", "I get stressed out easily.", "I have a rich vocabulary.", "I don't talk a lot.", "I am interested in people.", "I leave my belongings around.", "I am relaxed most of the time.", "I am not interested in abstract ideas.", "I feel comfortable around people.", "I insult people.", "I pay attention to details.", "I worry about things.", "I have a vivid imagination.", "I keep in the background.", "I sympathize with others' feelings.", "I make a mess of things.", "I seldom feel blue.", "I am not interested in theoretical discussions.", "I start conversations.", "I am not interested in other people's problems.", "I get chores done right away.", "I am easily disturbed.", "I have a great deal of ideas.", "I have little to say.", "I have a soft heart.", "I often forget to put things back.", "I get upset easily.", "I do not have a good imagination.", "I talk to a lot of different people.", "I believe that others have good intentions.", "I follow a schedule.", "I change my mood a lot.", "I am quick to understand things.", "I don't like to draw attention.", "I take time out for others.", "I shirk my duties.", "I have frequent mood swings.", "I use difficult words.", "I don't mind being the center of attention.", "I feel others' emotions.", "I follow through with my plans.", "I am easily irritated.", "I spend time reflecting on things.", "I am quiet around strangers.", "I make people feel at ease.", "I am exacting in my work.", "I often feel blue.", "I am full of ideas."
        ],
        interpret: (avg) => generateLongReport("People Assets: Five-Factor Profile", avg)
    }
};

/* --- 3. STATE MANAGEMENT --- */
let activeKey = null;
let currentIdx = 0;
let userAnswers = {};

/* --- 4. NAVIGATION & RENDERING --- */
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0);
}

// Initial Grid Rendering
const grid = document.getElementById('test-grid-ui');
if(grid) {
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `
            <div class="card">
                <h3>${testData[key].title}</h3>
                <p>Advanced psychometric mapping.</p>
                <button class="btn-outline" onclick="loadTest('${key}')">Begin Analysis</button>
            </div>`;
    }
}

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
            <span style="color: var(--blue); font-weight: 800; font-size: 0.9rem;">QUESTION ${currentIdx + 1} OF ${testData[activeKey].questions.length}</span>
            <p class="q-text">${qText}</p>
            <div class="opt-group">
                <span style="font-size: 0.75rem; font-weight: 800; color: #64748b;">DISAGREE</span>
                ${[1, 2, 3, 4, 5].map(v => `
                    <input type="radio" name="activeQ" value="${v}" 
                    ${userAnswers[currentIdx] == v ? 'checked' : ''} 
                    onchange="handleSelection(${v})">
                `).join('')}
                <span style="font-size: 0.75rem; font-weight: 800; color: #64748b;">AGREE</span>
            </div>
        </div>`;
    
    document.getElementById('prev-btn').style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').innerText = currentIdx === testData[activeKey].questions.length - 1 ? "Finish" : "Next";
    updateProgress();
}

function handleSelection(val) {
    userAnswers[currentIdx] = val;
    updateProgress();
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) {
        alert("Please select an option to proceed.");
        return;
    }
    
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

/* --- 5. REPORT GENERATION --- */
function generateLongReport(name, avg) {
    const isHigh = avg > 3;
    const summary = isHigh 
        ? "Your profile indicates high Strategic Agency. You are a catalyst for change, prioritizing results and decisive action in complex environments." 
        : "Your profile indicates high Systemic Integrity. You are a foundational pillar, prioritizing accuracy, stability, and methodical progress.";

    const deepDive = `
        <div class="report-section">
            <h3>1. Behavioral Architecture</h3>
            <p>You exhibit a preference for ${isHigh ? 'dynamic and autonomous' : 'structured and reliable'} workflows. Your decision-making is driven by ${isHigh ? 'outcome-based logic' : 'data-backed security'}.</p>
        </div>
        <div class="report-section">
            <h3>2. Leadership & Impact</h3>
            <p>In a professional setting, you provide ${isHigh ? 'momentum and visionary direction' : 'quality control and operational stability'}. Your primary value asset is your ability to ${isHigh ? 'pivot quickly' : 'ensure perfection'}.</p>
        </div>
        <div class="report-section">
            <h3>3. Development Strategy</h3>
            <p>To scale your influence, focus on ${isHigh ? 'integrating consensus-building into your speed' : 'increasing your tolerance for experimental risk'}.</p>
        </div>
    `;

    return { title: name, summary, deepDive };
}

function calculateReport() {
    const emailAddr = document.getElementById('user-email').value;
    let total = 0;
    Object.values(userAnswers).forEach(v => total += v);
    const avg = total / testData[activeKey].questions.length;
    const report = testData[activeKey].interpret(avg);

    // Render Report immediately for instant feedback
    document.getElementById('report-wrapper').innerHTML = `
        <div class="report-header-dark">
            <small>Official Psychometric Analysis</small>
            <h1>${report.title}</h1>
        </div>
        <div class="report-body">
            <div class="report-section">
                <h3>Executive Summary</h3>
                <p class="summary-text">${report.summary}</p>
            </div>
            <hr>
            ${report.deepDive}
            <div class="no-print" style="text-align:center; margin-top: 3rem;">
                <button class="btn-primary" onclick="window.print()">Download PDF</button>
                <button class="btn-outline" onclick="showPage('tests')" style="margin-left:10px;">New Test</button>
            </div>
        </div>
    `;
    
    showPage('report');

    // Email dispatch in background (No alert/popup to block the user)
    if (emailAddr) {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            user_email: emailAddr,
            test_name: report.title,
