// 1. INITIALIZE EMAILJS
// Using your public key from previous versions
const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

(function() {
    emailjs.init(PUBLIC_KEY);
})();

// 2. DATA FOR ALL 3 RESTORED TESTS
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
        questions: [
            "I am assertive and direct.", 
            "I enjoy influencing and persuading others.", 
            "I prefer a steady and predictable pace.", 
            "I pay close attention to accuracy and detail.", 
            "I prioritize results over relationships."
        ]
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        questions: [
            "I am the life of the party.", 
            "I have a soft heart.", 
            "I am always prepared.", 
            "I get upset easily.", 
            "I have a vivid imagination."
        ]
    }
};

// 3. APP STATE
let activeKey = null;
let currentIdx = 0;
let userAnswers = {};

// 4. NAVIGATION LOGIC
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    
    if(id === 'tests') renderGrid();
    window.scrollTo(0, 0);
}

// 5. RENDER THE 3-COLUMN TEST GRID
function renderGrid() {
    const grid = document.getElementById('test-grid-ui');
    if (!grid) return;
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `
            <div class="card">
                <h3 style="font-weight:800; font-size:1.6rem; margin-bottom:25px;">${testData[key].title}</h3>
                <button class="btn-primary" style="width:100%" onclick="loadTest('${key}')">Begin Analysis</button>
            </div>`;
    }
}

// 6. ENGINE LOGIC
function loadTest(id) {
    activeKey = id;
    currentIdx = 0;
    userAnswers = {};
    showPage('engine');
    
    document.getElementById('test-title').innerText = testData[id].title;
    document.getElementById('question-area').style.display = 'block';
    document.getElementById('final-step').style.display = 'none';
    
    // Reset progress bar
    document.getElementById('progress-fill').style.width = '0%';
    document.getElementById('progress-text').innerText = '0% Complete';
    
    renderQuestion();
}

function renderQuestion() {
    const qText = testData[activeKey].questions[currentIdx];
    const totalQs = testData[activeKey].questions.length;
    
    document.getElementById('question-area').innerHTML = `
        <div class="card" style="max-width:700px; margin: 40px auto; cursor: default;">
            <p style="font-weight:800; color:var(--brand-purple); margin-bottom:10px; text-transform: uppercase; letter-spacing: 1px;">
                Question ${currentIdx + 1} of ${totalQs}
            </p>
            <p style="font-size:1.8rem; font-weight:800; margin-bottom:40px; line-height: 1.2;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:500px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.75rem;">NEVER</span>
                ${[1, 2, 3, 4, 5].map(v => `
                    <input type="radio" name="q" value="${v}" 
                    ${userAnswers[currentIdx] == v ? 'checked' : ''} 
                    onchange="handleSelection(${v})" 
                    style="width:30px; height:30px; cursor:pointer; accent-color: var(--brand-magenta);">
                `).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.75rem;">ALWAYS</span>
            </div>
        </div>`;
}

function handleSelection(val) {
    userAnswers[currentIdx] = val;
    updateProgress();
}

function updateProgress() {
    const totalQs = testData[activeKey].questions.length;
    const answered = Object.keys(userAnswers).length;
    const pct = Math.round((answered / totalQs) * 100);
    
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-text').innerText = pct + '% Complete';
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) {
        alert("Please select a rating before moving forward.");
        return;
    }
    
    currentIdx += step;
    
    if (currentIdx >= testData[activeKey].questions.length) {
        document.getElementById('question-area').style.display = 'none';
        document.getElementById('final-step').style.display = 'block';
    } else {
        renderQuestion();
    }
}

// 7. CALCULATION & EMAIL SENDING
function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email || !email.includes('@')) {
        alert("Please enter a valid email address to receive your report.");
        return;
    }
    
    // Calculate total score
    let score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    let resultTitle = "";
    let diagnosis = "";
    let rewiring = "";

    // Logic specifically for Friction vs Flow
    if (activeKey === 'friction') {
        if (score >= 20) {
            resultTitle = "The Friction Seeker";
            diagnosis = "Your 'value compass' is calibrated to effort rather than outcomes. The struggle isn't a byproduct—it's your evidence of worth.";
            rewiring = "Practice 'The Path of Least Resistance'. Pick one major task this week and force yourself to find the easiest possible way to complete it.";
        } else {
            resultTitle = "The Flow Specialist";
            diagnosis = "You naturally prioritize outcomes over effort. You have a high resistance to unnecessary suffering and find efficiency intuitive.";
            rewiring = "Focus on scaling your flow states by identifying and removing 'micro-distractions' that break your deep work sessions.";
        }
    } else {
        // Generic logic for DISC and Big Five for now
        resultTitle = "Analysis Complete";
        diagnosis = `Your total assessment score is ${score}. A detailed breakdown of your behavioral traits is being compiled.`;
        rewiring = "Review your results and identify one habit that aligns with your core strengths.";
    }

    // Prepare EmailJS params
    const templateParams = {
        user_email: email,
        test_name: testData[activeKey].title,
        score: score,
        result_title: resultTitle,
        diagnosis: diagnosis
    };

    // SEND EMAIL
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(() => {
            console.log("Email sent successfully.");
        })
        .catch((err) => {
            console.error("Email failed to send:", err);
        });

    // Display the report on screen
    let reportHTML = `
        <h1 class="text-gradient" style="font-size:3.5rem; margin-bottom:30px;">${resultTitle}</h1>
        <div class="report-section">
            <h3>Diagnostic Overview</h3>
            <p>${diagnosis}</p>
        </div>
        <div class="report-section">
            <h3>30-Day Re-Wiring Plan</h3>
            <p>${rewiring}</p>
        </div>
        <button class="btn-primary" onclick="showPage('home')">Back to Dashboard</button>
    `;

    document.getElementById('report-wrapper').innerHTML = reportHTML;
    showPage('report');
}

// 8. INITIAL LOAD
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});
