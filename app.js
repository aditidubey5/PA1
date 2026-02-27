/* ============================================
   PEOPLE ASSETS — app.js
   Full application logic
   ============================================ */

// ============================================
// ASSESSMENT DATA
// ============================================
const TESTS = [
  {
    id: "disc",
    title: "DISC Behavioral Profile",
    tagline: "Uncover how you communicate, lead, and react under pressure.",
    description: "The DISC model maps your natural behavioral style across four dimensions — Dominance, Influence, Steadiness, and Conscientiousness. Knowing your DISC profile helps you understand your default communication patterns, decision-making speed, and how others experience working with you.",
    questions: 28,
    time: "9 min",
    icon: "🎯",
    questions_data: [
      { q: "When working in a group, I typically...", options: ["Take charge and direct others","Motivate and energize the team","Support others and keep harmony","Analyze data before contributing"] },
      { q: "Under pressure, I tend to...", options: ["Become more decisive and assertive","Talk more and seek input from others","Become quieter and more methodical","Double-check everything carefully"] },
      { q: "My biggest frustration at work is...", options: ["Slow progress and indecisiveness","Lack of social connection","Sudden changes to routine","Vague instructions or unclear expectations"] },
      { q: "I prefer a work environment that is...", options: ["Fast-paced and results-driven","Collaborative and energetic","Stable and structured","Precise and well-organized"] },
      { q: "When making decisions, I prioritize...", options: ["Speed and results","People's feelings and buy-in","Consistency with past decisions","Accuracy and all available data"] },
      { q: "My communication style is best described as...", options: ["Direct and to the point","Enthusiastic and expressive","Calm and supportive","Detailed and systematic"] },
      { q: "When I disagree with someone, I...", options: ["State my view confidently and debate it","Try to find common ground through conversation","Avoid conflict and accommodate","Present facts and logical arguments"] },
      { q: "I feel most accomplished when I...", options: ["Win or achieve a measurable result","Positively influence or inspire someone","Create a smooth, stable process","Deliver something error-free and complete"] },
    ]
  },
  {
    id: "bigfive",
    title: "Big Five Personality Map",
    tagline: "The gold standard of personality science — applied to your career.",
    description: "The Big Five (OCEAN) model is the most validated personality framework in psychological research. This assessment measures your Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism — and translates each dimension into practical career intelligence.",
    questions: 30,
    time: "9 min",
    icon: "🧠",
    questions_data: [
      { q: "I enjoy exploring new ideas and abstract concepts.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I keep my workspace and schedule highly organized.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I find social events energizing rather than draining.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I go out of my way to help others, even at personal cost.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I often worry about things that could go wrong.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I regularly seek out creative or artistic experiences.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I meet deadlines without needing external reminders.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I feel comfortable being the center of attention.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
    ]
  },
  {
    id: "martyr",
    title: "The Martyr Index",
    tagline: "Are you working hard — or just suffering productively?",
    description: "The Martyr Index is a proprietary People Assets diagnostic. It measures the gap between effort invested and systemic impact generated. High martyrs work extremely hard but remain stuck — they over-invest in low-leverage tasks, under-delegate, and confuse busyness with progress.",
    questions: 20,
    time: "6 min",
    icon: "⚖️",
    questions_data: [
      { q: "I regularly stay late or work weekends to finish tasks others could have handled.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "Saying 'no' to a request at work makes me feel guilty.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I take on tasks because I believe no one else will do them correctly.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "My effort level is high, but I'm not sure how much actual impact I'm creating.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I feel resentful when my hard work goes unacknowledged.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I delegate tasks comfortably and trust others to execute.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "My to-do list is a source of pride, not stress.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I can clearly name the 3 things that create the most value in my role.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
    ]
  },
  {
    id: "signal",
    title: "Signal vs. Noise Quotient",
    tagline: "How much of your day is signal — and how much is static?",
    description: "In the attention economy, your ability to filter high-value information from digital noise is a professional superpower. This assessment measures your Signal/Noise Quotient (SNQ) — quantifying your information diet, focus quality, and strategic thinking bandwidth.",
    questions: 22,
    time: "6 min",
    icon: "📡",
    questions_data: [
      { q: "I check email or messaging apps within 15 minutes of waking up.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I can work for 90+ minutes without checking a notification.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I have a clear system for deciding what information deserves my attention.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "After a full work day, I feel mentally depleted from information overload.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I regularly read long-form content (books, deep articles, research).", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "Meetings often feel like they could have been emails.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I can summarize the 3 most important things I learned this week.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "Social media leaves me feeling informed rather than scattered.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
    ]
  },
  {
    id: "leadership",
    title: "Leadership Archetype Scanner",
    tagline: "Discover the leader you actually are — not the one you think you are.",
    description: "Are you a Visionary, an Executor, a Coach, or a Stabilizer? This assessment cuts through self-perception bias to reveal your dominant leadership archetype based on your actual behaviors, instincts, and decisions — not your aspirations.",
    questions: 24,
    time: "7 min",
    icon: "👑",
    questions_data: [
      { q: "When a project stalls, my first instinct is to...", options: ["Paint a compelling vision of success to re-energize the team","Break the problem into tasks and assign them immediately","Have 1-on-1s to understand what's blocking each person","Review the process and identify where it broke down"] },
      { q: "A new team member joins. I primarily...", options: ["Share the big picture and excite them about the mission","Give them clear tasks and quick wins to build momentum","Pair them with a mentor and invest in their development","Walk them through systems, protocols, and expectations"] },
      { q: "A team member makes a costly mistake. I...", options: ["Focus on lessons learned and future vision","Address it directly and move forward quickly","Explore the emotional context and coach them through it","Analyze what process failed and how to prevent a recurrence"] },
      { q: "My team would describe my meetings as...", options: ["Inspiring and idea-filled","Efficient and action-focused","Personal and connecting","Structured and detailed"] },
      { q: "I feel most confident when...", options: ["I've articulated a future others are excited about","The team is executing with speed and clarity","Each person feels seen, supported, and growing","All systems are running smoothly and predictably"] },
      { q: "I struggle most with...", options: ["Staying patient with slow progress","Slowing down to hear all perspectives","Holding people accountable to hard deadlines","Embracing ambiguity and rapid change"] },
      { q: "My ideal team is...", options: ["Bold risk-takers who love big bets","Self-starters who execute with speed","Collaborative and psychologically safe","Disciplined and process-oriented"] },
      { q: "In a crisis, I am known for...", options: ["Rallying people around a new direction","Taking decisive, rapid action","Keeping people calm and connected","Restoring order and following protocol"] },
    ]
  },
  {
    id: "ei",
    title: "Emotional Intelligence Audit",
    tagline: "Your EQ is the ceiling on your leadership. Find out where it sits.",
    description: "Emotional Intelligence (EQ) is the ability to recognize, understand, and manage emotions — in yourself and others. Research consistently shows EQ outperforms IQ in predicting leadership effectiveness, team performance, and career longevity.",
    questions: 26,
    time: "7 min",
    icon: "❤️",
    questions_data: [
      { q: "I can name the specific emotion I'm feeling, not just 'stressed' or 'upset'.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "When someone is venting to me, I focus on understanding before advising.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I can stay composed during heated disagreements.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I adjust my communication style based on who I'm speaking to.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I seek feedback on how I come across, even when it might be uncomfortable.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "I can sense when someone is emotionally disengaged even if they say they're fine.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "After a conflict, I reflect on my own role before assigning blame.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { q: "My emotions rarely interfere with my professional judgment.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
    ]
  },
  {
    id: "growth",
    title: "Growth Mindset Diagnostic",
    tagline: "Fixed or fluid? This is the meta-skill beneath every other skill.",
    description: "Psychologist Carol Dweck's foundational research shows that how you think about your own abilities determines how far you'll grow. This diagnostic goes beyond self-reported mindset to measure your behavioral patterns around challenge, failure, learning, and feedback.",
    questions: 18,
    time: "5 min",
    icon: "🌱",
    questions_data: [
      { q: "When I fail at something important, I...", options: ["Analyze what I can learn and try a different approach","Feel discouraged but eventually try again","Take a break then revisit it","Tend to avoid that area going forward"] },
      { q: "Feedback that points out my weaknesses...", options: ["Is exactly what I seek out","Is useful even when uncomfortable","Is helpful in small doses","Is hard to hear and demotivating"] },
      { q: "I believe my core talents and intelligence...", options: ["Can grow significantly with effort and strategy","Can be somewhat developed with practice","Are mostly fixed but I can learn skills","Are largely determined by nature"] },
      { q: "When a colleague outperforms me, I feel...", options: ["Motivated — what can I learn from them?","Mildly competitive but mostly fine","Indifferent — we all have different strengths","Threatened or inadequate"] },
      { q: "I actively seek out challenges that I might fail at.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "My effort on a hard task increases when I realize I might not succeed.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I regularly invest time in learning skills that are outside my current role.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I view my career as a series of experiments rather than a fixed path.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
    ]
  }
];

// ============================================
// REPORT LOGIC
// ============================================
const REPORT_LOGIC = {
  disc: (answers) => {
    const counts = { D: 0, I: 0, S: 0, C: 0 };
    const map = [
      ["D","I","S","C"],["D","I","S","C"],["D","I","S","C"],
      ["D","I","S","C"],["D","I","S","C"],["D","I","S","C"],
      ["D","I","S","C"],["D","I","S","C"]
    ];
    answers.forEach((a, i) => { if (map[i] && map[i][a] !== undefined) counts[map[i][a]]++; });
    const primary = Object.entries(counts).sort((a,b) => b[1]-a[1])[0][0];
    const profiles = {
      D: { label: "Dominant Driver", score: 82, color: "#ef4444", description: "You are a natural results-driver. You move fast, think big, and aren't afraid to challenge the status quo. Your directness is a strength in high-stakes situations, but can create friction when others need more time to process.", strengths: ["Decisive under pressure","Natural leader in a crisis","Clear and direct communicator","High achievement drive"], watch: ["Can rush decisions without full information","May steamroll more reserved team members","Impatience with slow processes"] },
      I: { label: "Influential Connector", score: 78, color: "#f59e0b", description: "You are a natural energizer. People gravitate toward your enthusiasm and ideas. You thrive in collaborative, people-facing roles and are at your best when you can inspire and persuade.", strengths: ["Exceptional relationship builder","Inspiring and persuasive","Thrives in ambiguity","Creative problem-solver"], watch: ["May overpromise and underdeliver on details","Can avoid difficult, necessary conversations","Loses interest with repetitive tasks"] },
      S: { label: "Steady Supporter", score: 74, color: "#10b981", description: "You are the backbone of any high-performing team. You create psychological safety, build loyalty, and ensure consistency. You are at your best when supporting meaningful work in a stable, trusted environment.", strengths: ["Deep loyalty and reliability","Creates team harmony","Excellent listener and mediator","Consistent and dependable"], watch: ["Can resist necessary change","May suppress own needs to avoid conflict","Struggles to assert views in group settings"] },
      C: { label: "Conscientious Analyst", score: 79, color: "#6366f1", description: "You are the quality control system of any team. You think before you speak, verify before you commit, and your work reflects a standard of accuracy others struggle to match.", strengths: ["Exceptional attention to detail","Thorough and systematic thinker","High personal quality standards","Excellent risk assessment"], watch: ["Can get paralyzed by over-analysis","May be perceived as cold or aloof","Perfectionism can slow execution"] }
    };
    return profiles[primary];
  },

  bigfive: (answers) => {
    const score = answers.reduce((s, a) => s + (4 - a), 0);
    const pct = Math.round((score / (answers.length * 4)) * 100);
    if (pct >= 65) return { label: "High Openness / Extraverted", score: pct, color: "#a855f7", description: "Your Big Five profile shows high openness and extraversion. You thrive in dynamic, novel environments and bring creative energy to teams.", strengths: ["Adaptable and curious","Highly collaborative","Generates innovative ideas","Energized by people"], watch: ["May lose focus when bored","Can overlook detail in favor of big picture","Takes on too many new things simultaneously"] };
    if (pct >= 40) return { label: "Balanced & Adaptive", score: pct, color: "#6366f1", description: "Your Big Five profile is well-balanced. You adapt to different environments and can flex between detail-focus and big-picture thinking.", strengths: ["Versatile across contexts","Manages stress well","Works effectively alone or in teams","Steady under ambiguity"], watch: ["Can seem inconsistent to others","May not stand out in any single dimension","Needs clear role definition to thrive"] };
    return { label: "Introverted Analyst", score: pct, color: "#0ea5e9", description: "Your Big Five profile shows high conscientiousness and introversion. You do your best work in structured, focused environments where quality matters.", strengths: ["Deep, focused thinker","High accuracy and reliability","Disciplined self-manager","Excellent solo performer"], watch: ["Can be drained by excessive social demands","May appear reserved in group settings","Needs time to process before deciding"] };
  },

  martyr: (answers) => {
    const score = answers.reduce((s, a) => s + a, 0);
    const pct = Math.round((score / (answers.length * 4)) * 100);
    const martyrScore = 100 - pct;
    if (martyrScore >= 65) return { label: "High Martyr Pattern", score: martyrScore, color: "#ef4444", description: "Your Martyr Index is elevated. You're investing significant effort — but a large portion may not be translating into measurable impact. You likely over-function in areas others could handle, struggle to delegate, and may be running on a hidden cost to your wellbeing and strategic bandwidth.", strengths: ["Extremely high work ethic","Deeply reliable and committed","Takes ownership seriously"], watch: ["Critical: Review your task portfolio — which 20% creates 80% of your impact?","Practice saying no to low-leverage requests","Build a delegation habit — imperfect execution by others beats zero delegation"] };
    if (martyrScore >= 35) return { label: "Moderate Martyr Tendencies", score: martyrScore, color: "#f59e0b", description: "You show some martyr patterns, particularly around delegation and low-leverage tasks. You're aware of the issue but haven't fully escaped it.", strengths: ["Generally good at prioritizing","Has some delegation habits","Awareness of effort vs. impact gap"], watch: ["Audit your weekly tasks — are you doing $10/hr work?","Strengthen boundary-setting skills","Schedule strategic thinking time that is non-negotiable"] };
    return { label: "High Leverage Operator", score: 100 - martyrScore, color: "#10b981", description: "Your effort is well-aligned with impact. You have strong leverage habits — you delegate effectively, protect your strategic bandwidth, and say no to low-value work.", strengths: ["Excellent effort-to-impact ratio","Strong delegation habits","Protects high-value focus time","Clear on personal ROI"], watch: ["Continue calibrating — leverage habits can erode under pressure","Ensure your team doesn't develop martyr patterns from your high standards"] };
  },

  signal: (answers) => {
    const score = answers.reduce((s, a) => s + (4 - a), 0);
    const pct = Math.round((score / (answers.length * 4)) * 100);
    if (pct >= 65) return { label: "High Signal Thinker", score: pct, color: "#10b981", description: "You have an exceptional ability to filter information. Your attention is a well-managed resource, and your information diet is intentional and high-quality.", strengths: ["Excellent focus and concentration","Strong critical information filter","Strategic information consumption","Resilient to digital distraction"], watch: ["Be careful not to miss important real-time signals","Ensure your signal diet includes diverse perspectives"] };
    if (pct >= 40) return { label: "Signal-Aware", score: pct, color: "#f59e0b", description: "You have a reasonable signal-to-noise ratio but there is meaningful room to sharpen your information filter and reclaim focus time.", strengths: ["Generally good awareness of distraction","Can focus when environment allows","Some intentional information habits"], watch: ["Audit your notification settings today","Implement a 'no phone first 30 minutes' rule","Schedule one 90-minute deep work block daily"] };
    return { label: "High Noise Exposure", score: 100 - pct, color: "#ef4444", description: "Your information environment is working against you. High noise exposure is fragmenting your attention and reducing your strategic thinking capacity.", strengths: ["High information volume — can be redirected","Strong connectivity and responsiveness"], watch: ["URGENT: Turn off all non-essential notifications","Delete or time-limit social media apps","Invest in one long-form reading habit per week — books, not headlines"] };
  },

  leadership: (answers) => {
    const types = ["Visionary","Executor","Coach","Stabilizer"];
    const counts = [0,0,0,0];
    answers.forEach(a => { if (counts[a] !== undefined) counts[a]++; });
    const idx = counts.indexOf(Math.max(...counts));
    const profiles = [
      { label: "The Visionary", score: 81, color: "#a855f7", description: "You lead by painting pictures of the future. Your superpower is helping people believe in something bigger than the current moment. Teams follow you because of where you're going.", strengths: ["Exceptional at inspiring and enrolling others","Thrives in ambiguity and change","Natural strategist and innovator","Excellent at reframing challenges as opportunities"], watch: ["Can lose people in the details of execution","May set unrealistic timelines","Needs strong executor partners to land the vision"] },
      { label: "The Executor", score: 85, color: "#ef4444", description: "You lead by doing. When there's a goal, you build a plan, assemble the right people, and deliver. Teams respect your consistency and your results.", strengths: ["Exceptional at breaking vision into action","High accountability and follow-through","Thrives under pressure and tight deadlines","Creates clarity and momentum"], watch: ["Can optimize speed at the expense of buy-in","May under-invest in team development","Needs to slow down for strategic reflection"] },
      { label: "The Coach", score: 77, color: "#10b981", description: "You lead by developing people. You see potential where others see performance gaps, and your investment in individuals creates compounding returns for your team.", strengths: ["Deep talent development instinct","Builds psychological safety","Creates high-retention team cultures","Excellent at giving meaningful feedback"], watch: ["Can prioritize relationships over accountability","May protect underperformers too long","Needs to pair development with clear expectations"] },
      { label: "The Stabilizer", score: 80, color: "#6366f1", description: "You lead by creating the conditions for others to succeed. Your discipline, processes, and consistency give teams the infrastructure to execute at scale.", strengths: ["Exceptional at building reliable systems","Creates scalable team operations","High predictability and trustworthiness","Excellent crisis manager"], watch: ["Can resist necessary disruption","May over-index on process at the expense of agility","Needs to flex leadership style in high-change environments"] }
    ];
    return profiles[idx];
  },

  ei: (answers) => {
    const score = answers.reduce((s, a) => s + (4 - a), 0);
    const pct = Math.round((score / (answers.length * 4)) * 100);
    if (pct >= 70) return { label: "High EQ — Emotionally Intelligent Leader", score: pct, color: "#10b981", description: "Your emotional intelligence is a significant professional asset. You read rooms accurately, manage your own emotional state under pressure, and create trust with the people around you.", strengths: ["Strong self-awareness and regulation","Excellent empathy and social reading","Effective conflict navigator","Creates psychologically safe environments"], watch: ["Be careful not to over-prioritize emotional harmony at the cost of difficult truths","High empathy can lead to decision fatigue — maintain your own emotional boundaries"] };
    if (pct >= 45) return { label: "Developing EQ", score: pct, color: "#f59e0b", description: "Your EQ profile shows solid foundations with clear opportunities to develop. Targeted investment in emotional skill-building will have an outsized impact on your career trajectory.", strengths: ["Self-aware in low-stress situations","Generally good with interpersonal relationships","Some empathy and social skill"], watch: ["Practice naming emotions with more precision than 'stressed' or 'frustrated'","Develop a regulation toolkit for high-pressure moments","Seek feedback on how others experience your emotional presence"] };
    return { label: "EQ Growth Opportunity", score: pct, color: "#ef4444", description: "Your emotional intelligence profile points to a significant growth opportunity. The good news: EQ is highly trainable. Unlike IQ, it responds dramatically to intentional practice.", strengths: ["Directness and clarity (often high in low-EQ profiles)","Strong task focus"], watch: ["PRIORITY: Invest in 1-on-1 coaching on emotional regulation","Read 'Emotional Intelligence' by Daniel Goleman","Practice daily: before any interaction, name your current emotional state"] };
  },

  growth: (answers) => {
    const score = answers.reduce((s, a) => s + (4 - (a > 3 ? a : a)), 0);
    const pct = Math.round((score / (answers.length * 4)) * 100);
    if (pct >= 65) return { label: "Growth Mindset Dominant", score: pct, color: "#10b981", description: "Your mindset is your greatest asset. You approach challenges as training, feedback as data, and failure as iteration. This meta-skill amplifies every other capability you develop.", strengths: ["Embraces challenge and discomfort","Uses failure as information","Actively seeks development","Resilient to setbacks and criticism"], watch: ["Ensure your growth mindset extends to others — do you give people room to fail and learn?","Watch for 'false growth mindset' — advocating for growth while secretly protecting ego"] };
    if (pct >= 40) return { label: "Mixed Mindset", score: pct, color: "#f59e0b", description: "You have genuine growth mindset in some areas, but fixed patterns emerge in others — often in areas tied to your identity or deepest insecurities.", strengths: ["Open to learning in comfortable areas","Generally positive about development","Can embrace feedback in low-stakes situations"], watch: ["Identify the 1-2 areas where you avoid challenge — that's your fixed zone","Practice the 'not yet' reframe: change 'I can't do this' to 'I can't do this yet'","Journal about a recent failure — what did you actually learn?"] };
    return { label: "Fixed Mindset Tendencies", score: pct, color: "#ef4444", description: "Your mindset profile shows patterns that may be limiting your growth ceiling. Fixed mindset is not a character flaw — it's a protective pattern the brain learned. But it can be rewired.", strengths: ["High standards for current competencies","Reliable and consistent in established areas"], watch: ["Read 'Mindset' by Carol Dweck — it is the #1 investment you can make","Seek out one 'stretch project' that you're not sure you can succeed at","Reframe feedback as data, not judgment — practice this daily"] };
  }
};

// ============================================
// STATE
// ============================================
let currentPage = "home";
let currentTest = null;
let currentQuestion = 0;
let answers = [];

// ============================================
// NAVIGATION
// ============================================
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(page).style.display = "block";
  currentPage = page;

  // Active nav state
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const navMap = { home: "nav-home", tests: "nav-tests" };
  if (navMap[page]) document.getElementById(navMap[page])?.classList.add("active");

  // Init pages
  if (page === "tests") renderTestGrid();
  if (page === "coaching") renderCoachingPage();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileNav() {
  const drawer = document.getElementById("mobile-drawer");
  drawer.classList.toggle("open");
}

// ============================================
// MODAL
// ============================================
function closeModal() {
  document.getElementById("method-modal").style.display = "none";
}
function handleModalBackdropClick(e) {
  if (e.target === document.getElementById("method-modal")) closeModal();
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ============================================
// RENDER TEST GRID
// ============================================
function renderTestGrid() {
  const grid = document.getElementById("test-grid-ui");
  grid.innerHTML = TESTS.map(t => `
    <div class="card">
      <div style="font-size: 2rem; margin-bottom: 12px;">${t.icon}</div>
      <h3>${t.title}</h3>
      <p style="font-size:0.83rem; color:var(--text-muted); margin-bottom:18px; flex-grow:1;">${t.tagline}</p>
      <button class="btn-secondary" onclick="openKnowMore('${t.id}')">Know More</button>
      <button class="btn-primary btn-full" onclick="startTest('${t.id}')">Start Analysis →</button>
      <div class="card-meta">
        <span><strong>${t.questions}</strong> Questions</span>
        <span><strong>${t.time}</strong></span>
      </div>
    </div>
  `).join("");
}

// ============================================
// KNOW MORE MODAL (dynamic)
// ============================================
function openKnowMore(testId) {
  const t = TESTS.find(x => x.id === testId);
  if (!t) return;

  // Create or reuse a dynamic modal
  let modal = document.getElementById("know-more-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "know-more-modal";
    modal.className = "modal-overlay";
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal" onclick="document.getElementById('know-more-modal').style.display='none'">&#x2715;</span>
      <div style="font-size:2.5rem; margin-bottom:12px;">${t.icon}</div>
      <h2 class="text-gradient" style="font-size: clamp(1.4rem, 3.5vw, 2rem); margin-bottom:10px;">${t.title}</h2>
      <p style="color:var(--text-muted); margin-bottom:24px; font-size:0.95rem; line-height:1.7;">${t.description}</p>
      <div style="background:#f8fafc; border-radius:14px; padding:18px; margin-bottom:24px;">
        <div style="display:flex; gap:24px; justify-content:center;">
          <div style="text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--brand-indigo);">${t.questions}</div>
            <div style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Questions</div>
          </div>
          <div style="width:1px; background:#e2e8f0;"></div>
          <div style="text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--brand-magenta);">${t.time}</div>
            <div style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Est. Time</div>
          </div>
        </div>
      </div>
      <button class="btn-primary btn-full" onclick="document.getElementById('know-more-modal').style.display='none'; startTest('${t.id}')">
        Begin ${t.title} →
      </button>
    </div>
  `;

  modal.style.display = "block";
}

// ============================================
// QUESTION ENGINE
// ============================================
function startTest(testId) {
  currentTest = TESTS.find(t => t.id === testId);
  if (!currentTest) return;
  currentQuestion = 0;
  answers = new Array(currentTest.questions_data.length).fill(null);
  showPage("engine");
  renderQuestion();
}

function renderQuestion() {
  const t = currentTest;
  const q = t.questions_data[currentQuestion];
  const total = t.questions_data.length;
  const progress = ((currentQuestion) / total) * 100;

  document.getElementById("test-title").textContent = t.title;

  document.getElementById("question-area").innerHTML = `
    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" style="width:${progress}%"></div>
    </div>
    <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:28px; font-weight:600;">
      Question ${currentQuestion + 1} of ${total}
    </p>
    <div style="background:white; border-radius:20px; padding: clamp(24px,4vw,40px); box-shadow: var(--shadow-card); max-width:580px; margin:0 auto 24px; text-align:left;">
      <p style="font-size: clamp(1rem, 2.5vw, 1.2rem); font-weight:700; color:var(--text-primary); margin-bottom:24px; line-height:1.5;">
        ${q.q}
      </p>
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${q.options.map((opt, i) => `
          <label class="answer-option ${answers[currentQuestion] === i ? 'selected' : ''}" onclick="selectAnswer(${i})">
            <span class="answer-letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `;

  // Update nav buttons
  document.getElementById("back-btn").style.display = currentQuestion === 0 ? "none" : "inline-block";
  document.getElementById("next-btn").textContent =
    currentQuestion === total - 1 ? "View My Results →" : "Next →";
}

function selectAnswer(index) {
  answers[currentQuestion] = index;
  document.querySelectorAll(".answer-option").forEach((el, i) => {
    el.classList.toggle("selected", i === index);
  });
}

function changeQuestion(direction) {
  if (direction === 1) {
    if (answers[currentQuestion] === null) {
      shakeNextButton();
      return;
    }
    if (currentQuestion === currentTest.questions_data.length - 1) {
      generateReport();
      return;
    }
    currentQuestion++;
  } else {
    if (currentQuestion === 0) return;
    currentQuestion--;
  }
  renderQuestion();
}

function shakeNextButton() {
  const btn = document.getElementById("next-btn");
  btn.style.animation = "none";
  btn.offsetHeight; // reflow
  btn.style.animation = "shake 0.4s ease";
  btn.style.background = "#ef4444";
  setTimeout(() => {
    btn.style.background = "";
    btn.style.animation = "";
  }, 600);
}

// Add shake animation dynamically
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
  .answer-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-primary);
    background: #f8fafc;
    transition: all 0.2s ease;
    user-select: none;
  }
  .answer-option:hover {
    border-color: var(--brand-magenta);
    background: #fdf8ff;
  }
  .answer-option.selected {
    border-color: var(--brand-indigo);
    background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
    color: var(--brand-indigo);
  }
  .answer-letter {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: white;
    border: 2px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 800;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }
  .answer-option.selected .answer-letter {
    background: var(--brand-indigo);
    border-color: var(--brand-indigo);
    color: white;
  }
`;
document.head.appendChild(shakeStyle);

// ============================================
// REPORT GENERATION
// ============================================
function generateReport() {
  const logic = REPORT_LOGIC[currentTest.id];
  const result = logic ? logic(answers) : { label: "Complete", score: 75, color: "#6366f1", description: "Your assessment is complete.", strengths: [], watch: [] };

  showPage("report");

  const strengthsHtml = result.strengths?.map(s => `
    <div style="display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #f1f5f9;">
      <span style="color:#10b981; font-size:1.1rem;">✓</span>
      <span style="font-size:0.9rem; color:var(--text-primary); font-weight:500;">${s}</span>
    </div>
  `).join("") || "";

  const watchHtml = result.watch?.map(w => `
    <div style="display:flex; align-items:flex-start; gap:10px; padding:10px 0; border-bottom:1px solid #f1f5f9;">
      <span style="color:#f59e0b; font-size:1.1rem; margin-top:1px;">→</span>
      <span style="font-size:0.9rem; color:var(--text-primary); font-weight:500;">${w}</span>
    </div>
  `).join("") || "";

  document.getElementById("report-page-content").innerHTML = `
    <div>
      <!-- Header -->
      <div class="report-header" style="
        background: var(--brand-grad);
        border-radius: 24px;
        padding: clamp(40px,6vw,70px) clamp(24px,5vw,56px);
        text-align: center;
        margin-bottom: 28px;
        position:relative;
        overflow:hidden;
      ">
        <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.06);"></div>
        <div style="position:absolute;bottom:-40px;left:-40px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,0.06);"></div>
        <div style="margin-bottom:20px;">
          <img src="data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z" alt="People Assets" style="height:44px; width:auto; filter:brightness(0) invert(1); opacity:0.92;" />
        </div>
        <p style="font-size:0.75rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.7); margin-bottom:16px;">${currentTest.title}</p>
        <div style="font-size:clamp(3rem,8vw,5.5rem); font-weight:800; color:white; line-height:1; margin-bottom:8px;">${result.score}<span style="font-size:1.5rem;">/100</span></div>
        <h1 style="font-size:clamp(1.6rem,4vw,2.5rem); font-weight:800; color:white; margin-bottom:16px;">${result.label}</h1>
        <div style="width:60px;height:4px;background:rgba(255,255,255,0.4);border-radius:50px;margin:0 auto;"></div>
      </div>

      <!-- Body -->
      <div class="report-body" style="background:white; border-radius:24px; padding:clamp(28px,5vw,48px); box-shadow:var(--shadow-card);">
        <div class="report-inner-grid" style="display:grid; grid-template-columns:1.4fr 1fr; gap:32px; align-items:start;">
          <!-- Left -->
          <div>
            <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:14px; color:var(--text-primary);">Your Profile Summary</h3>
            <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.8; margin-bottom:28px;">${result.description}</p>

            <h3 style="font-size:1rem; font-weight:800; margin-bottom:12px; color:var(--text-primary);">Your Strengths</h3>
            <div style="margin-bottom:28px;">${strengthsHtml}</div>

            <h3 style="font-size:1rem; font-weight:800; margin-bottom:12px; color:var(--text-primary);">Watch Points & Growth Areas</h3>
            <div>${watchHtml}</div>
          </div>

          <!-- Right -->
          <div>
            <div style="background:#f8fafc; border-radius:16px; padding:24px; margin-bottom:20px; text-align:center;">
              <div style="font-size:0.75rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:var(--text-muted); margin-bottom:12px;">Score Breakdown</div>
              <div style="font-size:4rem; font-weight:800; color:${result.color}; line-height:1;">${result.score}</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">out of 100</div>
              <div style="margin-top:16px; background:#e2e8f0; border-radius:50px; height:8px; overflow:hidden;">
                <div style="height:100%; width:${result.score}%; background:${result.color}; border-radius:50px; transition:width 1s ease;"></div>
              </div>
            </div>

            <div style="background:linear-gradient(135deg,rgba(99,102,241,0.06),rgba(217,70,239,0.06)); border-radius:16px; padding:24px; border:1px solid rgba(99,102,241,0.12);">
              <div style="font-size:0.8rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--brand-magenta); margin-bottom:12px;">Recommended Next Step</div>
              <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6; margin-bottom:16px;">
                Your profile unlocks a personalized 1-on-1 session with a People Assets coach who specializes in this archetype.
              </p>
              <button class="btn-primary btn-full" onclick="showPage('coaching')" style="font-size:0.85rem;">
                Book a Coaching Session →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="report-actions">
        <button class="btn-primary" onclick="showPage('tests')" style="background:#64748b;">← Try Another Assessment</button>
        <button class="btn-primary" onclick="window.print()">Download Report</button>
        <button class="btn-primary" onclick="showPage('coaching')">Book Coaching →</button>
      </div>
    </div>
  `;
}

// ============================================
// COACHING PAGE
// ============================================
function renderCoachingPage() {
  const section = document.getElementById("coaching");
  section.innerHTML = `
    <div class="container">
      <div class="coaching-wrap">
        <p class="section-label">1-on-1 Expert Coaching</p>
        <h1>Work With <span class="text-gradient">A Coach</span></h1>
        <p>You have the data. Now let's turn it into a plan. Our coaches specialize in translating your assessment results into tangible career and leadership growth.</p>

        <div class="coaching-card">
          <form onsubmit="submitCoachingForm(event)">
            <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px; letter-spacing:0.05em;">FULL NAME</label>
            <input class="main-input" type="text" id="coach-name" placeholder="Your full name" required>

            <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px; letter-spacing:0.05em;">EMAIL ADDRESS</label>
            <input class="main-input" type="email" id="coach-email" placeholder="your@email.com" required>

            <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px; letter-spacing:0.05em;">WHAT WOULD YOU LIKE TO WORK ON?</label>
            <textarea class="main-input" id="coach-goal" rows="4" placeholder="e.g. I want to understand my DISC results and improve how I lead my team..." required></textarea>

            <button class="btn-primary btn-full" type="submit" style="margin-top:8px;">
              Request My Coaching Session →
            </button>
          </form>
          <p id="form-status" style="text-align:center; margin-top:16px; font-size:0.85rem; font-weight:600; color:var(--brand-magenta); display:none;"></p>
        </div>

        <div style="margin-top:36px; display:grid; grid-template-columns:repeat(3,1fr); gap:16px; text-align:center;">
          ${[
            { icon:"🎯", label:"Assessment-Led", desc:"Coaching grounded in your actual data" },
            { icon:"🔒", label:"Confidential", desc:"Private 1-on-1 sessions, always" },
            { icon:"⚡", label:"Action-Focused", desc:"Leave every session with a clear next step" }
          ].map(f => `
            <div style="background:white; border-radius:16px; padding:20px; box-shadow:var(--shadow-card);">
              <div style="font-size:1.8rem; margin-bottom:8px;">${f.icon}</div>
              <div style="font-size:0.85rem; font-weight:800; margin-bottom:4px;">${f.label}</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${f.desc}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function submitCoachingForm(e) {
  e.preventDefault();
  const name  = document.getElementById("coach-name").value;
  const email = document.getElementById("coach-email").value;
  const goal  = document.getElementById("coach-goal").value;
  const status = document.getElementById("form-status");

  // EmailJS integration (configure your service/template IDs below)
  // emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{name,email,goal})
  //   .then(() => { ... })

  // Simulated success for now
  status.style.display = "block";
  status.textContent = `✓ Thanks ${name}! We'll reach out to ${email} within 24 hours.`;
  e.target.reset();
}

// ============================================
// INIT
// ============================================
showPage("home");
