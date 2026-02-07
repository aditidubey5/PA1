(function() { emailjs.init("YOUR_PUBLIC_KEY"); })();

const testData = {
    'odat': {
        title: "Open DISC Assessment (ODAT)",
        desc: "40-question analysis of behavioral styles: Dominance, Influence, Steadiness, and Compliance.",
        questions: [
            "I am assertive and demand results.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.", "I tend to take charge in groups.", "I am a very sociable person.", "I am patient with others.", "I value accuracy over speed.", "I am direct when telling people what to do.", "I like to inspire others to act.", "I am a consistent and reliable worker.", "I enjoy following established protocols.", "I am competitive and like to win.", "I am enthusiastic about new projects.", "I dislike sudden changes in my routine.", "I am very thorough in my work.", "I am decisive even under pressure.", "I enjoy being the center of attention.", "I am a good listener.", "I focus on the facts and data.", "I am bold when facing challenges.", "I am very optimistic.", "I avoid conflict whenever possible.", "I am precise and orderly.", "I take risks to get ahead.", "I am very talkative.", "I am a calm and steady person.", "I am careful to follow instructions.", "I prioritize results over feelings.", "I love meeting new people.", "I am a team player.", "I am highly analytical.", "I speak my mind clearly.", "I am very persuasive.", "I am dependable.", "I am disciplined.", "I set high goals.", "I am very animated when talking.", "I am a peaceful person.", "I check my work multiple times."
        ],
        interpret: (avg) => generateLongReport("DISC Behavioral Profile", avg)
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        desc: "50-item comprehensive mapping of Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.",
        questions: [
            "I am the life of the party.", "I feel little concern for others.", "I am always prepared.", "I get stressed out easily.", "I have a rich vocabulary.", "I don't talk a lot.", "I am interested in people.", "I leave my belongings around.", "I am relaxed most of the time.", "I am not interested in abstract ideas.", "I feel comfortable around people.", "I insult people.", "I pay attention to details.", "I worry about things.", "I have a vivid imagination.", "I keep in the background.", "I sympathize with others' feelings.", "I make a mess of things.", "I seldom feel blue.", "I am not interested in theoretical discussions.", "I start conversations.", "I am not interested in other people's problems.", "I get chores done right away.", "I am easily disturbed.", "I have a great deal of ideas.", "I have little to say.", "I have a soft heart.", "I often forget to put things back.", "I get upset easily.", "I do not have a good imagination.", "I talk to a lot of different people.", "I believe that others have good intentions.", "I follow a schedule.", "I change my mood a lot.", "I am quick to understand things.", "I don't like to draw attention.", "I take time out for others.", "I shirk my duties.", "I have frequent mood swings.", "I use difficult words.", "I don't mind being the center of attention.", "I feel others' emotions.", "I follow through with my plans.", "I am easily irritated.", "I spend time reflecting on things.", "I am quiet around strangers.", "I make people feel at ease.", "I am exacting in my work.", "I often feel blue.", "I am full of ideas."
        ],
        interpret: (avg) => generateLongReport("Five-Factor Inventory", avg)
    },
    // ... Additional test keys (OEPS, EPI, MPQ) follow the same pattern
};

function generateLongReport(name, avg) {
    const isHigh = avg > 3;
    
    const execSummary = isHigh 
        ? `The assessment indicates a highly proactive and results-driven psychological configuration. Your responses suggest an individual who thrives in high-pressure environments where strategic decision-making and rapid execution are prioritized. There is a clear tendency toward organizational leadership, characterized by an ability to synthesize complex variables into actionable goals. This profile is typical of high-impact contributors who prioritize objective outcomes over subjective process constraints.`
        : `The assessment reveals a highly methodical and stable psychological baseline, characterized by a preference for structured environments and data-driven consistency. Your profile suggests a deep-seated value for operational excellence and long-term sustainability rather than immediate, high-risk pivots. You likely serve as a foundational pillar in professional settings, ensuring that quality standards are maintained and that team dynamics remain harmonious through predictable and reliable performance metrics.`;

    const deepDive = `
        <p>Your primary behavioral driver is centered on <strong>${isHigh ? 'Strategic Agency' : 'Operational Precision'}</strong>. This cognitive framework influences how you perceive challenges, manage interpersonal conflict, and allocate mental resources. In high-stakes scenarios, you are likely to rely on a ${isHigh ? 'broad-scope vision that seeks to maximize efficiency and impact' : 'focused analytical lens that seeks to mitigate risk and ensure total accuracy'}.</p>
        
        <p>From a leadership perspective, this configuration suggests that your influence is felt through your ${isHigh ? 'ability to inspire change and drive innovative solutions' : 'capacity for maintaining order and ensuring that every detail is accounted for'}. You likely find that your greatest successes occur when you are given the autonomy to ${isHigh ? 'reshape workflows and challenge the status quo' : 'optimize existing systems and provide the necessary checks and balances'}.</p>
        
        <p>Regarding social dynamics, you tend to communicate with ${isHigh ? 'high directness and a focus on the "bottom line," which can sometimes be perceived as assertive' : 'careful deliberation and a focus on consensus, which builds deep-seated trust over time'}. Your profile indicates a high level of ${isHigh ? 'Self-Efficacy' : 'System-Reliance'}, meaning you are most comfortable when ${isHigh ? 'you are at the helm of the decision-making process' : 'there is a clear, validated roadmap to follow'}.</p>
        
        <p>Furthermore, your stress-response mechanism is tuned toward ${isHigh ? 'active problem-solving' : 'structured mitigation'}. When faced with ambiguity, your natural instinct is to ${isHigh ? 'force a path forward and resolve the uncertainty through action' : 'deconstruct the ambiguity into manageable components and resolve it through logic'}. This deep-seated trait makes you an invaluable asset in roles that require ${isHigh ? 'crisis management and rapid scaling' : 'complex project management and long-term organizational health'}.</p>
        
        <p>Finally, your career trajectory is likely best served by environments that value ${isHigh ? 'meritocracy and high-speed growth' : 'integrity and technical mastery'}. You should seek out opportunities where your natural inclination toward ${isHigh ? 'disruption' : 'refinement'} is not only accepted but required for the mission's success. Your profile is a rare combination of ${isHigh ? 'extroverted potency and visionary logic' : 'introverted depth and system-wide reliability'}.</p>
    `;

    return { title: name, summary: execSummary, deepDive: deepDive };
}

let activeKey = null;

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0,0);
}

// Cards
const grid = document.getElementById('test-grid-ui');
for (let key in testData) {
    grid.innerHTML += `
        <div class="card">
            <h3>${testData[key].title}</h3>
            <p>${testData[key].desc}</p>
            <button class="btn-outline" onclick="loadTest('${key}')">Start Assessment</button>
        </div>`;
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
}

function updateProgress() {
    const total = testData[activeKey].questions.length;
    const answered = document.querySelectorAll('input:checked').length;
    const pct = Math.round((answered / total) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-text').innerText = pct + '% Complete';
}

function calculateReport() {
    const email = document.getElementById('user-email').value;
    const form = new FormData(document.getElementById('quiz-form'));
    let total = 0, count = 0;
    for (let v of form.values()) { total += parseInt(v); count++; }

    if (count < testData[activeKey].questions.length) return alert("Please complete all questions.");

    const avg = total / count;
    const report = testData[activeKey].interpret(avg);

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
            <div class="report-section">
                <h3>Behavioral Deep-Dive</h3>
                <div class="deep-dive-text">${report.deepDive}</div>
            </div>
            <button class="btn-primary" onclick="showPage('tests')" style="margin-top:2rem">Back to Assessments</button>
        </div>
    `;
    
    showPage('report');

    if (email) {
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            user_email: email,
            test_name: testData[activeKey].title,
            report_summary: report.summary,
            report_details: report.deepDive.replace(/<[^>]*>/g, '') // Strips HTML for email
        }).then(() => alert("Your report has been dispatched to: " + email));
    }
}
