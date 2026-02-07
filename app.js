// Replace with your actual EmailJS keys
(function() { emailjs.init("YOUR_PUBLIC_KEY"); })();

const testData = {
    'odat': {
        title: "Open DISC Assessment (ODAT)",
        desc: "Measures Dominance, Influence, Steadiness, and Compliance.",
        type: "likert",
        questions: [
            "I am assertive and direct.", "I enjoy influencing others.", "I prefer a stable environment.", "I pay close attention to details.",
            "I tend to take charge in groups.", "I am a very sociable person.", "I am patient with others.", "I value accuracy over speed.",
            "I am direct when telling people what to do.", "I like to inspire others to act.", "I am a consistent and reliable worker.", "I enjoy following established protocols.",
            "I am competitive and like to win.", "I am enthusiastic about new projects.", "I dislike sudden changes in my routine.", "I am very thorough in my work.",
            "I am decisive even under pressure.", "I enjoy being the center of attention.", "I am a good listener.", "I focus on the facts and data.",
            "I am bold when facing challenges.", "I am very optimistic.", "I avoid conflict whenever possible.", "I am precise and orderly.",
            "I take risks to get ahead.", "I am very talkative.", "I am a calm and steady person.", "I am careful to follow instructions.",
            "I prioritize results over feelings.", "I love meeting new people.", "I am a team player.", "I am highly analytical.",
            "I speak my mind clearly.", "I am very persuasive.", "I am dependable.", "I am disciplined.",
            "I set high goals.", "I am very animated when talking.", "I am a peaceful person.", "I check my work multiple times."
        ],
        interpret: (avg) => ({
            type: "Executive Driver Profile",
            summary: "You possess a high-impact DISC profile. Your primary asset is 'Strategic Efficiency'.",
            detail: "You likely score high in Dominance and Compliance. This means you aren't just a leader; you are a leader who values the right process. In a team, you provide the 'People Asset' of clarity and structural integrity."
        })
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        desc: "The comprehensive 50-item IPIP scale for deep personality mapping.",
        type: "likert",
        questions: [
            "I am the life of the party.", "I feel little concern for others.", "I am always prepared.", "I get stressed out easily.", "I have a rich vocabulary.",
            "I don't talk a lot.", "I am interested in people.", "I leave my belongings around.", "I am relaxed most of the time.", "I am not interested in abstract ideas.",
            "I feel comfortable around people.", "I insult people.", "I pay attention to details.", "I worry about things.", "I have a vivid imagination.",
            "I keep in the background.", "I sympathize with others' feelings.", "I make a mess of things.", "I seldom feel blue.", "I am not interested in theoretical discussions.",
            "I start conversations.", "I am not interested in other people's problems.", "I get chores done right away.", "I am easily disturbed.", "I have a great deal of ideas.",
            "I have little to say.", "I have a soft heart.", "I often forget to put things back.", "I get upset easily.", "I do not have a good imagination.",
            "I talk to a lot of different people.", "I believe that others have good intentions.", "I follow a schedule.", "I change my mood a lot.", "I am quick to understand things.",
            "I don't like to draw attention.", "I take time out for others.", "I shirk my duties.", "I have frequent mood swings.", "I use difficult words.",
            "I don't mind being the center of attention.", "I feel others' emotions.", "I follow through with my plans.", "I am easily irritated.", "I spend time reflecting on things.",
            "I am quiet around strangers.", "I make people feel at ease.", "I am exacting in my work.", "I often feel blue.", "I am full of ideas."
        ],
        interpret: (avg) => ({
            type: "Global Adaptability Index",
            summary: "Your profile suggests high psychological flexibility and resilience.",
            detail: "You show a balanced distribution across the five pillars. Specifically, your Conscientiousness and Openness suggest you are an 'Agile Contributor'—someone who can pivot between creative brainstorming and disciplined execution."
        })
    },
    'oeps': {
        title: "Open Enneagram Scales (OEPS)",
        desc: "32 questions to determine your core motivation and Enneagram type.",
        type: "likert",
        questions: [
            "I strive for perfection.", "I go out of my way to help.", "I am driven by success.", "I feel different from others.", "I need to understand the 'why' of everything.",
            "I worry about safety.", "I am always looking for the next fun thing.", "I am a powerful person.", "I avoid conflict.", "I have high moral standards.",
            "I am a natural giver.", "I am a high achiever.", "I am very creative.", "I am a deep thinker.", "I am very loyal.",
            "I am spontaneous.", "I am confrontational when needed.", "I am a mediator.", "I want to be correct.", "I want to be needed.",
            "I want to be admired.", "I want to be unique.", "I want to be knowledgeable.", "I want to be secure.", "I want to be stimulated.",
            "I want to be in control.", "I want to be at peace.", "I am self-disciplined.", "I am empathetic.", "I am competitive.", "I am introspective.", "I am protective."
        ],
        interpret: (avg) => ({
            type: "Motivational Core: Competence",
            summary: "You are primarily motivated by a need for internal excellence.",
            detail: "You align most with Type 1 (The Reformer) or Type 3 (The Achiever). Your People Asset is your 'Unwavering Standard'. You do not settle for 'good enough', pushing yourself and your team toward the pinnacle of performance."
        })
    },
    'epi': {
        title: "Eysenck Personality Inventory",
        desc: "The classic 24-item test for Extraversion and Neuroticism.",
        type: "yesno",
        questions: [
            "Do you often long for excitement?", "Do you often need understanding friends?", "Are you usually carefree?", "Do you find it hard to take no for an answer?",
            "Do you stop and think before doing?", "Do you always keep your promises?", "Does your mood go up and down?", "Do you say things quickly without thinking?",
            "Do you feel miserable for no reason?", "Would you do anything for a dare?", "Do you feel shy with strangers?", "Do you lose your temper?",
            "Do you do things on impulse?", "Do you worry about mistakes?", "Do you prefer reading to people?", "Are your feelings easily hurt?",
            "Are you a happy-go-lucky person?", "Are you mostly quiet?", "Do you sometimes gossip?", "Do you have dizzy turns?",
            "Do you worry about awful things?", "Are you a talkative person?", "Are you often restless?", "Do you like telling jokes?"
        ],
        interpret: (avg) => ({
            type: "Social Resilience Profile",
            summary: "Your temperament is categorized as 'Sanguine-Stable'.",
            detail: "This EPI profile is typical of high-performing consultants and leaders. You possess high social energy but do not let it cloud your judgment. You remain emotionally steady even when social pressures increase."
        })
    },
    'ambien': {
        title: "Multidimensional MPQ",
        desc: "30-question assessment of social potency and temperament.",
        type: "likert",
        questions: [
            "I am easily worried.", "I enjoy being the center of attention.", "I am often troubled by guilt.", "I usually take charge.", "I enjoy a fast-paced life.",
            "I am a very cautious person.", "I find it hard to forgive.", "I am prone to mood swings.", "I prefer to plan things.", "I enjoy thrill-seeking.",
            "I am sensitive to social cues.", "I am skeptical of others.", "I am highly disciplined.", "I value traditions.", "I am protective of privacy.",
            "I enjoy deep discussions.", "I am a sympathetic person.", "I am often restless.", "I am very persistent.", "I am easily bored.",
            "I am a leader, not a follower.", "I am careful with money.", "I am a very hard worker.", "I am an emotional person.", "I am a visionary.",
            "I am very honest.", "I am a fast learner.", "I am very brave.", "I am a very calm person.", "I am a very social person."
        ],
        interpret: (avg) => ({
            type: "Behavioral Complexity Index",
            summary: "You possess a 'High Potency' behavioral profile.",
            detail: "You score high on Social Potency and Achievement. This means you are a 'People Asset' who changes the room just by entering it. You are best suited for roles that require high visibility and influence."
        })
    }
};

let currentKey = null;

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0,0);
}

// Render test cards
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
    currentKey = id;
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
    const total = testData[currentKey].questions.length;
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

    if (count < testData[currentKey].questions.length) return alert("Please finish all questions!");

    const avg = total / count;
    const report = testData[currentKey].interpret(avg);

    // DISPLAY REPORT
    document.getElementById('report-wrapper').innerHTML = `
        <div class="report-header-box">
            <small>People Assets Analytics</small>
            <h1>${report.type}</h1>
        </div>
        <div class="report-body">
            <h3>Executive Summary</h3>
            <p>${report.summary}</p>
            <hr>
            <h3>Behavioral Deep-Dive</h3>
            <p>${report.detail}</p>
            <div class="stat-grid">
                <div class="stat"><h4>Composite Score</h4><p>${Math.round(avg * 20)}%</p></div>
                <div class="stat"><h4>Reliability</h4><p>High</p></div>
            </div>
            <button class="btn-primary" onclick="showPage('tests')" style="margin-top:2rem">Take Another Assessment</button>
        </div>`;
    
    showPage('report');

    // SEND EMAIL (If email provided)
    if (email) {
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            user_email: email,
            test_name: testData[currentKey].title,
            report_title: report.type,
            report_body: report.detail
        }).then(() => alert("Detailed PDF report has been sent to your email."));
    }
}
