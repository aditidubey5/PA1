/**
 * PEOPLE ASSETS - MASTER JAVASCRIPT
 * Combined: Full Question Set + Last Question UI Logic + EmailJS
 */

const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

// Initialize EmailJS
(function() { emailjs.init(PUBLIC_KEY); })();

const testData = {
    'friction': {
        title: "Friction vs. Flow Quiz",
        questions: [
            "If I achieve a goal quickly and easily, I often feel like I haven't 'really' earned the result.",
            "When learning something new, I feel a sense of guilt if I don't read the entire material from start to finish.",
            "I find myself preferring to work on complex, difficult problems, even if they are less profitable than simpler ones.",
            "I would rather wait until I can do a 'perfect' one-hour session than settle for a productive 10-minute window.",
            "I feel significantly more productive and virtuous on days when I am physically or mentally exhausted by the end.",
            "I am naturally skeptical of new tools, AI, or shortcuts that promise to make my professional work 10x faster."
        ]
    },
    'odat': {
        title: "Open DISC Assessment",
        questions: [
            "I tend to be assertive and direct when dealing with others, even if it causes slight tension.",
            "I find great enjoyment in influencing others and persuading them to see my point of view.",
            "I prioritize a steady, predictable, and calm work environment over a fast-paced and chaotic one.",
            "I pay extremely close attention to accuracy, high standards, and the fine details of every project.",
            "When making decisions, I consistently prioritize objective results and logic over personal relationships."
        ]
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        questions: [
            "I see myself as someone who is the life of the party and feels energized by large social gatherings.",
            "I consider myself to be a person who has a soft heart and is deeply concerned about others' feelings.",
            "I am someone who is always prepared, highly organized, and follows a strict personal schedule.",
            "I find that I am a person who gets upset or anxious easily when faced with unexpected stress.",
            "I have a very vivid imagination and I am constantly looking for new, abstract ways of thinking."
        ]
    }
};

let activeKey = null, currentIdx = 0, userAnswers = {};

/**
 * Page Routing Logic
 */
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'tests') renderGrid();
    window.scrollTo(0, 0);
}

/**
 * Render Assessment Library
 */
function renderGrid() {
    const grid = document.getElementById('test-grid-ui');
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `
            <div class="card" onclick="loadTest('${key}')">
                <h3>${testData[key].title}</h3>
                <p style="color:var(--brand-magenta); font-weight:800; font-size:0.75rem;">START ANALYSIS →</p>
            </div>`;
    }
}

/**
 * Quiz Engine Initialization
 */
function loadTest(id) {
    activeKey = id; 
    currentIdx = 0; 
    userAnswers = {};
    showPage('engine');
    document.getElementById('test-title').innerText = testData[id].title;
    renderQuestion();
}

/**
 * Render Question & Handle Dynamic UI Transitions
 */
function renderQuestion() {
    const qText = testData[activeKey].questions[currentIdx];
    const totalQuestions = testData[activeKey].questions.length;
    
    // UI for the question
    document.getElementById('question-area').innerHTML = `
        <div class="card" style="max-width:650px; margin: 40px auto; cursor: default;">
            <p style="font-size:1.3rem; font-weight:800; margin-bottom:30px; line-height:1.4;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:450px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.65rem;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `
                    <input type="radio" name="q" value="${v}" 
                    onchange="saveAnswer(${v})" 
                    ${userAnswers[currentIdx] == v ? 'checked' : ''} 
                    style="width:25px; height:25px; accent-color: var(--brand-magenta);">
                `).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.65rem;">ALWAYS</span>
            </div>
        </div>`;

    // 1. Identify if we've reached the final step
    const isLastQuestion = currentIdx === totalQuestions - 1;

    // 2. Hide 'Next' button on last question to make room for Generate Results
    document.getElementById('next-btn').style.display = isLastQuestion ? 'none' : 'inline-block';
    
    // 3. Show 'Back' button only if we aren't at the start
    document.getElementById('back-btn').style.display = currentIdx === 0 ? 'none' : 'inline-block';
    
    // 4. Reveal the Email input field only on the last question
    document.getElementById('final-step').style.display = isLastQuestion ? 'block' : 'none';
}

function saveAnswer(val) {
    userAnswers[currentIdx] = val;
}

function changeQuestion(step) {
    // Prevent moving forward without an answer
    if (step === 1 && !userAnswers[currentIdx]) {
        alert("Please select a rating to continue.");
        return;
    }
    
    currentIdx += step;
    renderQuestion();
}

/**
 * Calculate Results and Dispatch via EmailJS
 */
function calculateReport() {
    const email = document.getElementById('u-email').value;
    
    if(!email || !email.includes('@')) {
        alert("Please enter a valid email address.");
        return;
    }

    const score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    
    // Send data to EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { 
        user_email: email, 
        test_name: testData[activeKey].title,
        score: score 
    });

    // Render results view
    document.getElementById('report-page-content').innerHTML = `
        <div class="card" style="text-align:center;">
            <h1 class="text-gradient">Analysis Complete</h1>
            <p style="margin: 20px 0; line-height: 1.6;">
                Your professional profile for the <strong>${testData[activeKey].title}</strong> has been generated.<br>
                Your score of <strong>${score}</strong> has been analyzed. Check your inbox at <strong>${email}</strong>.
            </p>
            <button class="btn-primary" onclick="showPage('home')">Return Home</button>
        </div>`;
    showPage('report');
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
