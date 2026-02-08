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
        desc: "40-question analysis of behavioral styles and dominance.",
        questions: [
            "I am assertive and demand results.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.", "I tend to take charge in groups.", "I am a very sociable person.", "I am patient with others.", "I value accuracy over speed.", "I am direct when telling people what to do.", "I like to inspire others to act.", "I am a consistent and reliable worker.", "I enjoy following established protocols.", "I am competitive and like to win.", "I am enthusiastic about new projects.", "I dislike sudden changes in my routine.", "I am very thorough in my work.", "I am decisive even under pressure.", "I enjoy being the center of attention.", "I am a good listener.", "I focus on the facts and data.", "I am bold when facing challenges.", "I am very optimistic.", "I avoid conflict whenever possible.", "I am precise and orderly.", "I take risks to get ahead.", "I am very talkative.", "I am a calm and steady person.", "I am careful to follow instructions.", "I prioritize results over feelings.", "I love meeting new people.", "I am a team player.", "I am highly analytical.", "I speak my mind clearly.", "I am very persuasive.", "I am dependable.", "I am disciplined.", "I set high goals.", "I am very animated when talking.", "I am a peaceful person.", "I check my work multiple times."
        ],
        interpret: (avg) => generateLongReport("DISC Behavioral Profile", avg)
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        desc: "50-item comprehensive mapping of personality dimensions.",
        questions: [
            "I am the life of the party.", "I feel little concern for others.", "I am always prepared.", "I get stressed out easily.", "I have a rich vocabulary.", "I don't talk a lot.", "I am interested in people.", "I leave my belongings around.", "I am relaxed most of the time.", "I am not interested in abstract ideas.", "I feel comfortable around people.", "I insult people.", "I pay attention to details.", "I worry about things.", "I have a vivid imagination.", "I keep in the background.", "I sympathize with others' feelings.", "I make a mess of things.", "I seldom feel blue.", "I am not interested in theoretical discussions.", "I start conversations.", "I am not interested in other people's problems.", "I get chores done right away.", "I am easily disturbed.", "I have a great deal of ideas.", "I have little to say.", "I have a soft heart.", "I often forget to put things back.", "I get upset easily.", "I do not have a good imagination.", "I talk to a lot of different people.", "I believe that others have good intentions.", "I follow a schedule.", "I change my mood a lot.", "I am quick to understand things.", "I don't like to draw attention.", "I take time out for others.", "I shirk my duties.", "I have frequent mood swings.", "I use difficult words.", "I don't mind being the center of attention.", "I feel others' emotions.", "I follow through with my plans.", "I am easily irritated.", "I spend time reflecting on things.", "I am quiet around strangers.", "I make people feel at ease.", "I am exacting in my work.", "I often feel blue.", "I am full of ideas."
        ],
        interpret: (avg) => generateLongReport("Five-Factor Inventory", avg)
    }
};

/* --- 3. THE "LONG" REPORT GENERATOR --- */
function generateLongReport(name, avg) {
    const isHigh = avg > 3;
    
    const execSummary = isHigh 
        ? `The assessment indicates a highly proactive and results-driven psychological configuration. Your responses suggest an individual who thrives in high-pressure environments where strategic decision-making and rapid execution are prioritized. There is a clear tendency toward organizational leadership, characterized by an ability to synthesize complex variables into actionable goals. You likely possess a high degree of 'Strategic Agency'—the capacity to initiate change rather than merely reacting to it. This profile is typical of high-impact contributors who prioritize objective outcomes over subjective process constraints.`
        : `The assessment reveals a highly methodical and stable psychological baseline, characterized by a preference for structured environments and data-driven consistency. Your profile suggests a deep-seated value for operational excellence and long-term sustainability. You likely serve as a foundational pillar in professional settings, ensuring that quality standards are maintained and that team dynamics remain harmonious. Your strength lies in 'Systemic Integrity'—the ability to maintain high-functioning processes over time with a low margin for error.`;

    const deepDive = `
        <div class="report-section">
            <h3>1. Core Behavioral Architecture</h3>
            <p>Your primary behavioral driver is centered on <strong>${isHigh ? 'Strategic Agency' : 'Operational Precision'}</strong>. This cognitive framework influences how you perceive challenges and manage resource allocation. In high-stakes scenarios, you rely on a ${isHigh ? 'broad-scope vision seeking to maximize impact' : 'focused analytical lens seeking to mitigate risk'}. This contributes to a specialized work style that favors ${isHigh ? 'innovation and disruption' : 'refinement and mastery'}. You approach problems with a ${isHigh ? 'high tolerance for ambiguity' : 'preference for established logic'}.</p>
        </div>

        <div class="report-section">
            <h3>2. Workplace Performance & Leadership</h3>
            <p>When leading others or managing projects, you tend to ${isHigh ? 'delegate technical tasks to focus on the "Big Picture"' : 'immerse yourself in the technical nuances to ensure total accuracy'}. You are motivated by ${isHigh ? 'milestones and competitive achievements' : 'security, clarity, and the successful completion of a well-defined plan'}. Your profile indicates that you are most effective in roles that require ${isHigh ? 'crisis management and rapid pivots' : 'complex project stability and quality control'}. You provide the rare combination of ${isHigh ? 'visionary logic' : 'system-wide reliability'}.</p>
        </div>

        <div class="report-section">
            <h3>3. Communication & Interpersonal Dynamics</h3>
            <p>Interpersonally, you communicate with ${isHigh ? 'high directness and a focus on efficiency' : 'deliberate consensus and a focus on relational harmony'}. You likely prefer meetings that are ${isHigh ? 'short and result-oriented' : 'thorough and collaborative'}. In a team setting, you act as the ${isHigh ? 'catalyst for action' : 'stabilizer of the group'}. Under stress, your communication style may become ${isHigh ? 'overly demanding' : 'overly cautious'}, so maintaining awareness of your impact on others is key to long-term influence.</p>
        </div>

        <div class="report-section">
            <h3>4. Strategic Growth Roadmap</h3>
            <p>To maximize your professional trajectory, consider the following development areas based on your psychometric data:</p>
            <ul>
                <li><strong>Development Goal:</strong> ${isHigh ? 'Practice active listening to ensure all team perspectives are captured before moving to execution. Speed is your strength, but inclusion is your scale.' : 'Challenge yourself to make decisions with 80% of the data to increase operational speed. Perfection is the enemy of momentum.'}</li>
                <li><strong>Ideal Environment:</strong> ${isHigh ? 'Fast-paced, meritocratic, and autonomous sectors like startups or high-level consultancy.' : 'Structured, values-driven, and supportive sectors like engineering, healthcare, or established corporate firms.'}</li>
                <li><strong>Key Value Proposition:</strong> You are a ${isHigh ? 'force multiplier who turns ideas into reality through sheer will.' : 'dependable guardian of quality who ensures excellence is never compromised.'}</li>
            </ul>
        </div>
    `;

    return { title: name, summary: execSummary, deepDive: deepDive };
}

/* --- 4. CORE ENGINE LOGIC --- */
let activeKey = null;

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0);
}

// Render test grid on load
const grid = document.getElementById('test-grid-ui');
if(grid) {
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `
            <div class="card">
                <h3>${testData[key].title}</h3>
                <p>${testData[key].desc}</p>
                <button class="btn-outline" onclick="loadTest('${key}')">Start Assessment</button>
            </div>`;
    }
}

function loadTest(id) {
    activeKey = id;
    showPage('engine');
    document.getElementById('test-title').innerText = testData[id].title;
    const area = document.getElementById('question-area');
    area.innerHTML = testData[id].questions.map((q, i) => `
        <div class="q-card">
            <p class="q-text">${i+1}. ${q}</p>
            <div class="opt-group">
                <span>Disagree</span>
                ${[1,2,3,4,5].map(v => `<input type="radio" name="q${i}" value="${v}" onchange="updateProgress()">`).join('')}
                <span>Agree</span>
            </div>
        </div>`).join('');
    updateProgress();
}

function updateProgress() {
    const total = testData[activeKey].questions.length;
    const answered = document.querySelectorAll('#question-area input:checked').length;
    const pct = Math.round((answered / total) * 100);
    
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    
    if(fill) fill.style.width = pct + '%';
    if(text) text.innerText = pct + '% Complete';
}

function calculateReport() {
    const emailAddr = document.getElementById('user-email').value;
    const form = new FormData(document.getElementById('quiz-form'));
    let total = 0, count = 0;
    
    for (let v of form.values()) { 
        total += parseInt(v); 
        count++; 
    }

    if (count < testData[activeKey].questions.length) {
        return alert("Please answer all questions before generating your detailed report.");
    }

    const avg = total / count;
    const report = testData[activeKey].interpret(avg);

    // Render Full Long Report UI
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
            <div class="no-print" style="text-align:center; margin-top: 4rem; display: flex; justify-content: center; gap: 15px;">
                <button class="btn-primary" onclick="window.print()">Download as PDF</button>
                <button class="btn-outline" onclick="showPage('tests')">New Assessment</button>
            </div>
        </div>
    `;
    
    showPage('report');

    // Email Dispatch
    if (emailAddr) {
        const templateParams = {
            user_email: emailAddr,
            test_name: testData[activeKey].title,
            report_summary: report.summary,
            report_details: report.deepDive.replace(/<[^>]*>/g, '') // Strips HTML for clean email content
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
               alert("Success! Your comprehensive report has been sent to " + emailAddr);
            }, (error) => {
               console.error('Email failed:', error);
               alert("Email failed to send: " + error.text);
            });
    }
}
