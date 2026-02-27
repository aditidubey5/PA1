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
    time: "12 min",
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
    time: "14 min",
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
    time: "9 min",
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
    time: "10 min",
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
    time: "11 min",
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
    time: "12 min",
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
    time: "8 min",
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
