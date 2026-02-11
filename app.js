const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

(function() { emailjs.init(PUBLIC_KEY); })();

const testData = {
    'odat': {
        title: "Open DISC Assessment (ODAT)",
        questions: ["I am assertive and demand results.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.", "I tend to take charge in groups.", "I am a very sociable person.", "I am patient with others.", "I value accuracy over speed.", "I am direct when telling people what to do.", "I like to inspire others to act.", "I am a consistent and reliable worker.", "I enjoy following established protocols.", "I am competitive and like to win.", "I am enthusiastic about new projects.", "I dislike sudden changes in my routine.", "I am very thorough in my work.", "I am decisive even under pressure.", "I enjoy being the center of attention.", "I am a good listener.", "I focus on the facts and data.", "I am bold when facing challenges.", "I am very optimistic.", "I avoid conflict whenever possible.", "I am precise and orderly.", "I take risks to get ahead.", "I am very talkative.", "I am a calm and steady person.", "I am careful to follow instructions.", "I prioritize results over feelings.", "I love meeting new people.", "I am a team player.", "I am highly analytical.", "I speak my mind clearly.", "I am very persuasive.", "I am dependable.", "I am disciplined.", "I set high goals.", "I am very animated when talking.", "I am a peaceful person.", "I check my work multiple times."]
    },
    'bigfive': {
        title: "Five-Factor Personality Inventory",
        questions: ["I am the life of the party.", "I feel little concern for others.", "I am always prepared.", "I get stressed out easily.", "I have a rich vocabulary.", "I don't talk a lot.", "I am interested in people.", "I leave my belongings around.", "I am relaxed most of the time.", "I am not interested in abstract ideas.", "I feel comfortable around people.", "I insult people.", "I pay attention to details.", "I worry about things.", "I have a vivid imagination.", "I keep in the background.", "I sympathize with others' feelings.", "I make a mess of things.", "I seldom feel blue.", "I am not interested in theoretical discussions.", "I start conversations.", "I am not interested in other people's problems.", "I get chores done right away.", "I am easily disturbed.", "I have a great deal of ideas.", "I have little to say.", "I have a soft heart.", "I often forget to put things back.", "I get upset easily.", "I do not have a good imagination.", "I talk to a lot of different people.", "I believe that others have good intentions.", "I follow a schedule.", "I change my mood a lot.", "I am quick to understand things.", "I don't like to draw attention.", "I take time out for others.", "I shirk my duties.", "I have frequent mood swings.", "I use difficult words.", "I don't mind being the center of attention.", "I feel others' emotions.", "I follow through with my plans.", "I am easily irritated.", "I spend time reflecting on things.", "I am quiet around strangers.", "I make people feel at ease.", "I am exacting in my work.", "I often feel blue.", "I am full of ideas."]
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
        grid.innerHTML += `<div class="card" onclick="loadTest('${key}')">
            <h3>${testData[key].title}</h3>
            <button class="btn-outline" style="width:100%; margin-top:15px">Start</button>
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
            <p style="font-size:0.8rem; color:var(--blue); font-weight:800">QUESTION ${currentIdx + 1}</p>
            <p style="font-size:1.4rem; font-weight:700; margin:1rem 0">${qText}</p>
            <div class="opt-group">
                <span>Disagree</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="activeQ" value="${v}" ${userAnswers[currentIdx] == v ? 'checked' : ''} onchange="userAnswers[${currentIdx}]=${v}; updateProgress();">`).join('')}
                <span>Agree</span>
            </div>
        </div>`;
    document.getElementById('prev-btn').style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').innerText = currentIdx === testData[activeKey].questions.length - 1 ? "Finish" : "Next";
    updateProgress();
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
    const email = document.getElementById('user-email').value;
    if(!email) return alert("Email required.");
    showPage('report');
    document.getElementById('report-wrapper').innerHTML = `<div style="padding:4rem; text-align:center"><h2>Analysis Complete</h2><p>Results sent to ${email}</p><button class="btn-primary" onclick="showPage('home')">Home</button></div>`;
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { user_email: email, test_name: testData[activeKey].title });
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
