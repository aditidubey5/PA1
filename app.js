const testData = {
    'odat': {
        title: "Open DISC Assessment (ODAT)",
        type: "likert",
        questions: [
            "I am assertive and direct.", "I enjoy influencing others.", "I prefer a stable, predictable environment.",
            "I pay close attention to details.", "I tend to take charge in groups.", "I am a very sociable person.",
            "I am patient with others.", "I value accuracy over speed."
        ],
        calc: (score) => `Your DISC profile suggests a high level of ${score > 3 ? 'Directiveness' : 'Cooperativeness'}. You are likely someone who thrives in ${score > 3 ? 'competitive' : 'supportive'} environments.`
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        type: "likert",
        questions: [
            "I am the life of the party.", "I sympathize with others' feelings.", "I get chores done right away.",
            "I have a rich vocabulary.", "I have a vivid imagination.", "I am interested in people.",
            "I leave my belongings around.", "I am relaxed most of the time."
        ],
        calc: (score) => `Based on the Big Five dimensions, you exhibit high ${score > 3.5 ? 'Openness and Conscientiousness' : 'Emotional Stability'}. This suggests a profile suitable for high-stakes decision-making.`
    },
    'oeps': {
        title: "Open Enneagram Scales (OEPS)",
        type: "likert",
        questions: [
            "I want things to be perfect.", "I am very helpful to others.", "I am very focused on success.",
            "I am a very unique and different person.", "I like to understand how things work.",
            "I am always looking for security.", "I want to experience everything fun."
        ],
        calc: (score) => `Your responses indicate a Type ${Math.ceil(score * 1.8)} orientation. You are primarily motivated by a need for internal consistency and competence.`
    },
    'epi': {
        title: "Eysenck Personality Inventory",
        type: "yesno",
        questions: [
            "Do you often long for excitement?", "Are you usually carefree?", 
            "Do you often worry about things you should not have done?", "Are your feelings easily hurt?"
        ],
        calc: (score) => `Your E-score shows ${score > 0.5 ? 'Extroversion' : 'Introversion'}. Professionally, you are best utilized in ${score > 0.5 ? 'collaborative/client-facing' : 'analytical/deep-work'} roles.`
    },
    'ambien': {
        title: "Multidimensional Personality (Ambien)",
        type: "likert",
        questions: [
            "I am easily worried.", "I enjoy being the center of attention.", "I am often troubled by guilt.",
            "I usually take charge.", "I enjoy a fast-paced life.", "I am a very cautious person."
        ],
        calc: (score) => `This multidimensional analysis reveals a ${score > 3 ? 'Dynamic' : 'Methodical'} behavioral style. You prioritize ${score > 3 ? 'impact' : 'precision'} in your daily output.`
    }
};

let currentTest = null;

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0);
}

function loadTest(id) {
    currentTest = testData[id];
    showPage('engine');
    document.getElementById('test-title').innerText = currentTest.title;
    const area = document.getElementById('question-area');
    
    area.innerHTML = currentTest.questions.map((q, i) => `
        <div class="q-block">
            <p>${i+1}. ${q}</p>
            <div class="options">
                ${currentTest.type === 'likert' ? `
                    <span>Disagree</span>
                    <input type="radio" name="q${i}" value="1">
                    <input type="radio" name="q${i}" value="2">
                    <input type="radio" name="q${i}" value="3">
                    <input type="radio" name="q${i}" value="4">
                    <input type="radio" name="q${i}" value="5">
                    <span>Agree</span>
                ` : `
                    <label><input type="radio" name="q${i}" value="1"> Yes</label>
                    <label><input type="radio" name="q${i}" value="0"> No</label>
                `}
            </div>
        </div>
    `).join('');
}

function calculateReport() {
    const form = new FormData(document.getElementById('quiz-form'));
    let total = 0, count = 0;
    for (let v of form.values()) { total += parseInt(v); count++; }

    if (count < currentTest.questions.length) {
        alert("Please answer all questions.");
        return;
    }

    const avg = total / count;
    document.getElementById('report-content').innerHTML = `
        <p class="report-main-text">${currentTest.calc(avg)}</p>
        <div class="report-details">
            <h4>Detailed Observations</h4>
            <ul>
                <li>Strategic Fit: ${avg > 3 ? 'Leadership/Growth' : 'Stability/Operations'}</li>
                <li>Work Style: ${avg > 3 ? 'Proactive' : 'Reactive/Reflective'}</li>
            </ul>
        </div>
    `;
    showPage('report');
}
