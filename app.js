const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

(function() { emailjs.init(PUBLIC_KEY); })();

const testData = {
    'odat': { title: "DISC Assessment", questions: ["I am assertive and demand results.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.", "I take charge in groups.", "I am sociable.", "I am patient.", "I value accuracy.", "I am direct.", "I like to inspire."] },
    'bigfive': { title: "Big Five Inventory", questions: ["I am the life of the party.", "I feel concern for others.", "I am always prepared.", "I get stressed easily.", "I have a rich vocabulary.", "I am quiet.", "I am interested in people.", "I leave a mess.", "I am relaxed.", "I like abstract ideas."] }
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
                <h3 style="margin-bottom:25px; font-size: 1.8rem; font-weight: 800;">${testData[key].title}</h3>
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
        <div class="q-card">
            <p style="font-weight:800; color:var(--brand-purple); font-size:0.8rem;">STEP ${currentIdx + 1}</p>
            <p style="font-size:1.6rem; font-weight:700; margin:1.5rem 0;">${qText}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2rem;">
                <span style="font-weight:700; font-size:0.7rem; color:var(--text-light)">DISAGREE</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();">`).join('')}
                <span style="font-weight:700; font-size:0.7rem; color:var(--text-light)">AGREE</span>
            </div>
        </div>`;
    document.getElementById('prev-btn').style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').innerText = currentIdx === testData[activeKey].questions.length - 1 ? "Finish" : "Next";
}

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Select an answer.");
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
    showPage('report');
    document.getElementById('report-wrapper').innerHTML = `<div class="container"><h1>Analysis Sent!</h1><p>Results for ${testData[activeKey].title} sent to ${email}</p><button class="btn-primary" onclick="showPage('home')">Back Home</button></div>`;
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { user_email: email, test_name: testData[activeKey].title });
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
