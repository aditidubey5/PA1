

const testData = {
    'friction': {
        title: "Friction vs. Flow Quiz",
        questions: [
            "If I achieve a goal quickly and easily, I often feel like I haven't 'really' earned the result.",
            "I tend to view colleagues who find 'easy' ways to do hard things as cutting corners.",
            "I find myself preferring complex problems, even if they are less profitable than simpler ones.",
            "I feel 'guilty' if I finish my primary work tasks before the workday is officially over.",
            "I feel more virtuous on days when I am physically exhausted by the end.",
            "I am naturally skeptical of new tools or AI that promise to make work 10x faster.",
            "If a project doesn't feel stressful, I worry the final quality will be lower.",
            "I add more features to a task than requested to ensure it's 'thorough'.",
            "I'd rather do a task manually for 'control' than set up an automated system.",
            "I believe professional growth is only possible through intense 'grinding'."
        ]
    },
    'signal': {
        title: "Signal vs. Noise Audit",
        questions: [
            "I feel an urgent need to reply to every notification immediately.",
            "I spend more time 'organizing' my work than actually doing it.",
            "I often attend meetings where I have no clear contribution.",
            "I struggle to identify the one task that makes everything else easier.",
            "My workday is mostly dictated by other people's requests.",
            "I feel productive when I am 'busy' even without milestones.",
            "I struggle to work on one project for 30 minutes without checking my phone.",
            "I find myself caught in 'research loops' reading too much info.",
            "At the end of the day, I feel tired but haven't accomplished much.",
            "I am afraid that if I don't stay connected 24/7, I will miss something vital."
        ]
    },
    'leverage': {
        title: "Architect vs. Firefighter",
        questions: [
            "I spend most of my day responding to 'urgent' requests.",
            "I have a written system (SOP) for my recurring tasks.",
            "I feel like I'm constantly putting out fires.",
            "I prioritise building tools that save me time next month.",
            "Most of my work is 'reactive' rather than 'proactive'.",
            "I delegate tasks that are below my pay grade.",
            "I focus on the 20% of work that yields 80% of results.",
            "I feel anxious when I don't have a crisis to solve.",
            "I spend time training others to do what I do.",
            "My work feels like a hamster wheel of the same tasks."
        ]
    },
    'validation': {
        title: "Internal vs. External Validation",
        questions: [
            "I feel successful only when others praise my work.",
            "I would still do my current job if no one ever knew my title.",
            "I often check social media/metrics to feel good about my progress.",
            "My self-worth is tied to my latest professional 'win'.",
            "I find it hard to enjoy work if I don't receive feedback.",
            "I have internal benchmarks for quality that I follow strictly.",
            "I care more about 'the craft' than 'the credit'.",
            "I feel anxious if I am not being 'seen' as successful.",
            "I make career moves based on what looks good on a resume.",
            "I find deep satisfaction in tasks that no one will ever see."
        ]
    },
    'scarcity': {
        title: "Scarcity vs. Abundance",
        questions: [
            "I focus more on 'not losing' than on 'winning'.",
            "I believe there is a limited amount of opportunity in my field.",
            "I am hesitant to share my best ideas for fear of theft.",
            "I view my competitors' success as my personal loss.",
            "I am comfortable investing money to save time.",
            "I believe that for me to win, someone else must lose.",
            "I see mistakes as catastrophic failures rather than data.",
            "I tend to hoard resources (money/info) 'just in case'.",
            "I am excited by others' success in my industry.",
            "I focus on expanding the pie rather than fighting for a slice."
        ]
    },
    'odat': {
        title: "Open DISC Assessment",
        questions: [
            "I am assertive and direct.", "I enjoy influencing others.", "I prefer steady environments.", 
            "I pay close attention to accuracy.", "I prioritize results over relationships.",
            "I am an active listener.", "I enjoy working in teams.", "I am very organized.",
            "I tend to take charge in group settings.", "I prefer following a set schedule.",
            "I am persuasive when presenting ideas.", "I am known for being calm under pressure.",
            "I enjoy helping others solve problems.", "I am very detail-oriented.",
            "I focus on the big picture rather than small details.", "I value stability in my work.",
            "I am quick to make decisions.", "I am very enthusiastic about new projects.",
            "I am a patient person.", "I always check my work for errors."
        ]
    },
    'bigfive': {
        title: "Big Five Personality Inventory",
        questions: [
            "I am the life of the party.", "I am concerned about others' feelings.", "I am always prepared.", 
            "I get upset easily.", "I have a vivid imagination.", "I talk to a lot of different people.",
            "I sympathise with others' feelings.", "I leave my belongings around.",
            "I am relaxed most of the time.", "I have difficulty understanding abstract ideas.",
            "I keep in the background.", "I am not interested in other people's problems.",
            "I follow a schedule.", "I have frequent mood swings.", "I am full of ideas.",
            "I am quiet around strangers.", "I make people feel at ease.", "I am exacting in my work.",
            "I often feel blue.", "I am quick to understand things."
        ]
    }
};

let activeKey = null, currentIdx = 0, userAnswers = {};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    document.querySelectorAll('.nav-links span').forEach(s => s.classList.remove('active'));
    if(document.getElementById('nav-' + id)) document.getElementById('nav-' + id).classList.add('active');
    if(id === 'tests') renderGrid();
    if(id === 'coaching') renderCoachingPage();
    window.scrollTo(0,0);
}

function renderGrid() {
    const grid = document.getElementById('test-grid-ui');
    grid.innerHTML = "";
    for (let key in testData) {
        grid.innerHTML += `
            <div class="card" onclick="loadTest('${key}')">
                <h3 style="margin-bottom:10px;">${testData[key].title}</h3>
                <p style="color:#64748b; font-size:0.8rem; margin-bottom:20px;">${testData[key].questions.length} Diagnostic Points</p>
                <button class="btn-primary" style="width:100%;">START ANALYSIS</button>
            </div>`;
    }
}

function loadTest(id) {
    activeKey = id; currentIdx = 0; userAnswers = {};
    showPage('engine');
    document.getElementById('test-title').innerText = testData[id].title;
    renderQuestion();
}

function renderQuestion() {
    const questions = testData[activeKey].questions;
    const isLast = currentIdx === questions.length - 1;
    document.getElementById('question-area').innerHTML = `
        <div class="card" style="max-width:650px; margin: 40px auto; cursor: default;">
            <p style="color:var(--brand-magenta); font-weight:800; font-size:0.75rem;">PROGRESS: ${currentIdx + 1} / ${questions.length}</p>
            <p style="font-size:1.3rem; font-weight:800; margin-top:10px; margin-bottom:30px; line-height:1.4;">${questions[currentIdx]}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:450px; margin:0 auto;">
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">DISAGREE</span>
                ${[1, 2, 3, 4, 5].map(v => `<input type="radio" name="q" value="${v}" onchange="saveAnswer(${v})" ${userAnswers[currentIdx]==v?'checked':''} style="width:25px; height:25px; accent-color:var(--brand-magenta);">`).join('')}
                <span style="font-weight:800; color:#94a3b8; font-size:0.7rem;">AGREE</span>
            </div>
            ${isLast ? `
                <div style="margin-top:40px; border-top:1px solid #eee; padding-top:20px;">
                    <input type="email" id="u-email" placeholder="professional@email.com" class="main-input">
                    <button class="btn-primary" style="width:100%;" onclick="calculateReport()">GENERATE FULL DOSSIER</button>
                </div>` : ''}
        </div>`;
    document.getElementById('next-btn').style.display = isLast ? 'none' : 'inline-block';
    document.getElementById('back-btn').style.display = currentIdx === 0 ? 'none' : 'inline-block';
}

function saveAnswer(v) { userAnswers[currentIdx] = v; }

function changeQuestion(step) {
    if (step === 1 && !userAnswers[currentIdx]) return alert("Select a rating.");
    currentIdx += step;
    renderQuestion();
}

function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email.includes('@')) return alert("Valid email required.");
    const score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    const pct = (score / (testData[activeKey].questions.length * 5)) * 100;

    let r = { title: "", tagline: "", summary: "", analysis: "", traits: [], blindspots: [], roadmap: "" };

    if (activeKey === 'validation') {
        if (pct >= 60) {
            r.title = "The Prestige Chaser"; r.summary = "You are fueled by external benchmarks and social proof.";
            r.analysis = "Prestige Chasers are high achievers but are prone to 'Arrival Fallacy'—the belief that once you hit a certain title or goal, you will finally be happy. This leads to burnout and a sense of hollow victory.";
            r.traits = [{n:"Metrics Focused", d:"Highly sensitive to data and public feedback."}, {n:"Approval Driven", d:"Decisions are often filtered through 'how this looks'."}];
            r.blindspots = ["Fragile self-worth", "Burnout risk", "Losing touch with personal values"];
            r.roadmap = "Identify one 'Invisible Project'—a task done purely for the joy of the craft that you will never post about.";
        } else {
            r.title = "The Autotelic Elite"; r.summary = "You are driven by the internal mastery of your craft.";
            r.analysis = "Autotelic individuals find the reward in the activity itself. This makes you extremely resilient to market fluctuations or lack of external praise. You are a marathon runner in a world of sprinters.";
            r.traits = [{n:"Internal Benchmarking", d:"Strict adherence to personal quality standards."}, {n:"Flow Mastery", d:"Ease of entering deep focus without external prompts."}];
            r.blindspots = ["Isolation from market reality", "Potential for perfectionism", "Difficulty with self-promotion"];
            r.roadmap = "Connect your internal standards to a public-facing 'Signal' once a month to ensure your work is being valued.";
        }
    } else if (activeKey === 'friction') {
        if (pct >= 75) {
            r.title = "The Martyr"; r.tagline = "High Friction / Low Leverage";
            r.summary = "You equate professional value with total exhaustion.";
            r.analysis = "The Martyr chooses the path of most resistance. You are likely the bottleneck in your own scaling process because you distrust simplicity.";
            r.traits = [{n:"Complexity Addiction", d:"Over-engineering simple tasks to feel 'thorough'."}, {n:"Manual Bias", d:"Choosing labor over automation for a sense of control."}];
            r.blindspots = ["Equating busy-ness with effectiveness", "Fear of free time"];
            r.roadmap = "Automate one recurring 2-hour task this week. No exceptions.";
        } else {
            r.title = "The Architect"; r.tagline = "Low Friction / High Leverage";
            r.summary = "You view effort as a cost to be minimised.";
            r.analysis = "Architects focus on the system, not the labor. You naturally find the 20% of actions that drive 80% of results.";
            r.traits = [{n:"Systemic Thinking", d:"Viewing every task as a potential workflow."}, {n:"Strategic Laziness", d:"Refusing manual labor if a tool can do it."}];
            r.blindspots = ["Detachment from team struggles", "Over-automation"];
            r.roadmap = "Focus on the 'Human Element' to inspire others to scale with you.";
        }
    } else if (activeKey === 'signal') {
        if (pct >= 70) {
            r.title = "The Firefighter"; r.tagline = "Reactive / Noise-Dominated";
            r.summary = "Your day is defined by reactivity and external stimuli.";
            r.analysis = "Firefighters spend energy on small, urgent fires. Your actual output of 'deep value' is drowned out by trivial requests.";
            r.traits = [{n:"Hyper-Reactivity", d:"Responding to notifications immediately."}, {n:"Inbox Addiction", d:"Using email as a primary to-do list."}];
            r.blindspots = ["Loss of vision", "Cognitive fatigue"];
            r.roadmap = "Implement a 90-minute 'No-Notification' block every morning.";
        } else {
            r.title = "The Deep Diver"; r.tagline = "Proactive / Signal-Focused";
            r.summary = "You have mastered selective ignorance to protect your focus.";
            r.analysis = "Deep Divers protect their time ruthlessly. You ignore the 'Noise' of the workplace to produce higher quality work.";
            r.traits = [{n:"Deep Work Mastery", d:"Cognitive focus for hours at a time."}, {n:"Selective Ignorance", d:"Ignoring non-vital info."}];
            r.blindspots = ["Communication gaps", "Social friction"];
            r.roadmap = "Schedule specific 'Signal Windows' for team collaboration.";
        }
    } else {
        r.title = "Psychometric Profile"; r.tagline = "Behavioral & Personality Map";
        r.summary = "Your results show a high-functioning professional baseline.";
        r.analysis = "You possess a balanced profile suited for strategic execution. Your data indicates a strong alignment between your intentions and actions.";
        r.traits = [{n:"Analytical Depth", d:"Processing variables logically."}, {n:"Strategic Alignment", d:"Connecting daily tasks to long-term goals."}];
        r.blindspots = ["Perfectionism paralysis", "Analysis overload"];
        r.roadmap = "Practice 'Agile Execution'—move at 70% confidence rather than waiting for 100%.";
    }
    if (activeKey === 'leverage') {
        if (pct >= 65) {
            r.title = "The Firefighter";
            r.summary = "You are addicted to urgency and reactive work.";
            r.analysis = "The Firefighter derives their worth from 'saving the day.' While you are excellent under pressure, you are stuck in a loop of low-leverage work. You are so busy putting out fires that you haven't built a sprinkler system.";
            r.traits = [{n:"High Adrenaline", d:"Thrives in chaos but struggles with routine."}, {n:"Reactive Execution", d:"Wait for problems to occur before solving them."}];
            r.blindspots = ["Scaling limitations", "Chronically high cortisol", "Neglecting system-building"];
            r.roadmap = "Spend the first hour of every day building one SOP (Standard Operating Procedure).";
        } else {
            r.title = "The Architect";
            r.summary = "You build machines that produce results while you sleep.";
            r.analysis = "The Architect focuses on proactivity. You view recurring problems as failures of the system, not failures of effort. You prioritize leverage over labor.";
            r.traits = [{n:"Systemic Oversight", d:"Thinking in workflows, not tasks."}, {n:"Leverage Focus", d:"Always asking 'How does this scale?'"}];
            r.blindspots = ["Detachment from frontline reality", "Over-engineering simple fixes"];
            r.roadmap = "Audit your current systems to ensure they aren't becoming 'bottlenecks' for your team.";
        }
    } else if (activeKey === 'scarcity') {
        if (pct >= 55) {
            r.title = "The Guardian"; r.summary = "You operate from a 'Protect the Assets' mindset.";
            r.analysis = "The Guardian plays to 'not lose'. While this makes you excellent at risk management, it can prevent you from capturing exponential growth opportunities. You see a finite world where others' wins feel like your losses.";
            r.traits = [{n:"Risk Aversion", d:"Prioritising security over potential upside."}, {n:"Resource Hoarding", d:"Keeping info or assets close to the vest."}];
            r.blindspots = ["Missing 'Black Swan' upsides", "Static growth", "Creating high-friction environments"];
            r.roadmap = "Set aside a 'Experimentation Fund'—time or money that you are 100% comfortable 'losing' on a new idea.";
        } else {
            r.title = "The Venture Architect"; r.summary = "You operate from an 'Expand the Pie' mindset.";
            r.analysis = "Venture Architects see the world as a series of compounding opportunities. You understand that the best way to win is to create a bigger game for everyone. You focus on ROI over cost.";
            r.traits = [{n:"Growth Orientation", d:"Focusing on potential gain rather than potential loss."}, {n:"Collaborative Drive", d:"Viewing competitors as potential partners or data points."}];
            r.blindspots = ["Over-extension of resources", "Underestimating downside risk", "Impatience with slow-growth phases"];
            r.roadmap = "Implement a 'Guardian' check-and-balance system to ensure your growth doesn't outpace your infrastructure.";
        }
    } else {
        // Fallback for Friction/Signal/DISC (Similar to previous logic)
        r.title = "Analysis Complete";
        r.summary = "Your results indicate a high-functioning profile.";
        r.analysis = "Based on your data, you demonstrate a balanced approach to professional challenges.";
        r.traits = [{n:"Strategic Mindset", d:"The ability to align actions with goals."}];
        r.blindspots = ["Standard professional risks"];
        r.roadmap = "Continue optimizing your current workflows.";
    }

    

    document.getElementById('report-page-content').innerHTML = `
        <div id="pdf-content" class="card" style="text-align:left; max-width:900px; margin:0 auto; padding:0; overflow:hidden; border:none; box-shadow:0 20px 50px rgba(0,0,0,0.15);">
            <div style="background:var(--brand-grad); padding:50px; color:white; text-align:center;">
                <p style="text-transform:uppercase; letter-spacing:3px; font-weight:800; font-size:0.7rem; margin-bottom:10px; opacity:0.8;">Diagnostic Dossier</p>
                <h1 style="font-size:3.5rem; margin:0; line-height:1;">${r.title}</h1>
                <p style="font-size:1.1rem; font-weight:600; margin-top:15px;">${r.tagline}</p>
            </div>
            <div style="padding:50px;">
                <h2 style="font-weight:800;">Executive Summary</h2>
                <p style="font-size:1.2rem; color:#475569; border-left:4px solid var(--brand-magenta); padding-left:20px;">${r.summary}</p>
                <div style="display:grid; grid-template-columns: 2fr 1fr; gap:40px; margin-top:40px;">
                    <div>
                        <h3 style="font-size:0.9rem; color:var(--brand-magenta); text-transform:uppercase;">Analysis</h3>
                        <p style="line-height:1.7;">${r.analysis}</p>
                        <h3 style="font-size:0.9rem; color:var(--brand-magenta); text-transform:uppercase; margin-top:30px;">Core Traits</h3>
                        ${r.traits.map(t => `<div style="margin-bottom:15px;"><strong>✦ ${t.n}:</strong> <span style="color:#64748b;">${t.d}</span></div>`).join('')}
                    </div>
                    <div style="background:#f8fafc; padding:25px; border-radius:15px;">
                        <h3 style="font-size:0.8rem; margin-top:0;">BLIND SPOTS</h3>
                        <ul style="color:#ef4444; font-size:0.85rem; padding-left:15px;">
                            ${r.blindspots.map(b => `<li style="margin-bottom:10px;">${b}</li>`).join('')}
                        </ul>
                        <h3 style="font-size:0.8rem; margin-top:30px;">ROADMAP</h3>
                        <p style="font-size:0.85rem; color:#475569;">${r.roadmap}</p>
                    </div>
                </div>
            </div>
        </div>
        <div style="text-align:center; margin-top:30px;">
            <button class="btn-primary" onclick="window.print()">Download PDF Report</button>
            <button class="btn-primary" style="background:#0f172a; margin-left:10px;" onclick="showPage('coaching')">Apply for Coaching</button>
        </div>`;
    showPage('report');
}

function renderCoachingPage() {
    document.getElementById('coaching').innerHTML = `
        <div class="container" style="text-align:center;">
            <h1 class="text-gradient">Elite Strategy Coaching</h1>
            <div class="card" style="max-width:500px; margin: 0 auto; text-align:left;">
                <input type="text" id="c-name" placeholder="Full Name" class="main-input">
                <input type="email" id="c-email" placeholder="Email" class="main-input">
                <textarea id="c-focus" placeholder="Main Professional Challenge?" class="main-input" style="height:100px;"></textarea>
                <button class="btn-primary" style="width:100%;" onclick="alert('Sent!')">Request Consultation</button>
            </div>
        </div>`;
}

document.addEventListener('DOMContentLoaded', () => showPage('home'));
