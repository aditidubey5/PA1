/* ============================================
   PEOPLE ASSETS — app.js
   Full application logic — Unified Format
   ============================================ */

// ============================================
// ASSESSMENT DATA
// ============================================
const TESTS = [
  {
    id: "disc",
    title: "DISC Behavioral Profile",
    tagline: "Uncover how you communicate, lead, and react under pressure.",
    description: "The DISC model maps your natural behavioral style across four dimensions — Dominance, Influence, Steadiness, and Conscientiousness.",
    questions: 8,
    time: "5 min",
    icon: "🎯",
    questions_data: [
      { q: "When working in a group, I typically...", options: ["Take charge and direct others","Motivate and energize the team","Support others and keep harmony","Analyze data before contributing"] },
      { q: "Under pressure, I tend to...", options: ["Become more decisive and assertive","Talk more and seek input from others","Become quieter and more methodical","Double-check everything carefully"] },
      { q: "My biggest frustration at work is...", options: ["Slow progress and indecisiveness","Lack of social connection","Sudden changes to routine","Vague instructions or unclear expectations"] },
      { q: "I prefer a work environment that is...", options: ["Fast-paced and results-driven","Collaborative and energetic","Stable and structured","Precise and well-organized"] },
      { q: "When making decisions, I prioritize...", options: ["Speed and results","People's feelings and buy-in","Consistency with past decisions","Accuracy and all available data"] },
      { q: "My communication style is best described as...", options: ["Direct and to the point","Enthusiastic and expressive","Calm and supportive","Detailed and systematic"] },
      { q: "When I disagree with someone, I...", options: ["State my view confidently and debate it","Try to find common ground through conversation","Avoid conflict and accommodate","Present facts and logical arguments"] },
      { q: "I feel most accomplished when I...", options: ["Win or achieve a measurable result","Positively influence or inspire someone","Create a smooth, stable process","Deliver something error-free and complete"] }
    ]
  },
  {
    id: "bigfive",
    title: "Big Five Personality Map",
    tagline: "The gold standard of personality science — applied to your career.",
    description: "The Big Five (OCEAN) model measures Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.",
    questions: 8,
    time: "5 min",
    icon: "🧠",
    questions_data: [
      { q: "I enjoy exploring new ideas and abstract concepts.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I keep my workspace and schedule highly organized.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I find social events energizing rather than draining.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I go out of my way to help others, even at personal cost.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I often worry about things that could go wrong.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I regularly seek out creative or artistic experiences.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I meet deadlines without needing external reminders.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { q: "I feel comfortable being the center of attention.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] }
    ]
  },

  // ── THE MARTYR INDEX (EXPANDED & SECTIONED) ──────────
  {
    id: "martyr",
    title: "The Martyr Index",
    tagline: "Are you working hard — or just suffering productively?",
    description: "Measures the gap between effort and impact. High martyrs work hard but remain stuck — they under-delegate and confuse busyness with progress.",
    questions: 20,
    time: "9 min",
    icon: "⚖️",
    sections: [
      { name: "Over-Functioning", start: 0, end: 4 },
      { name: "Delegation Barriers", start: 5, end: 9 },
      { name: "Impact vs Effort", start: 10, end: 14 },
      { name: "Boundaries", start: 15, end: 19 }
    ],
    questions_data: [
      { section: "Over-Functioning", q: "I regularly stay late to finish tasks others could have handled.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Over-Functioning", q: "I feel the project will fail if I am not involved in every minor detail.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Over-Functioning", q: "I take on more work even when I am already at my breaking point.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Over-Functioning", q: "I jump in to solve problems before others have a chance to try.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Over-Functioning", q: "I feel responsible for the output of people who don't report to me.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Delegation Barriers", q: "I believe it takes longer to explain a task than to just do it myself.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Delegation Barriers", q: "I struggle to trust that others will maintain my quality standards.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Delegation Barriers", q: "I feel guilty when I delegate 'hard' tasks to my team.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Delegation Barriers", q: "I find myself 'fixing' work that others have already completed.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Delegation Barriers", q: "My team relies on me for answers they could find themselves.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Impact vs Effort", q: "I spend most of my day on reactive tasks (emails/Slack) rather than strategic work.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Impact vs Effort", q: "I feel exhausted at the end of the day but can't name one big win.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Impact vs Effort", q: "I prioritize tasks based on who is shouting loudest, not what matters most.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Impact vs Effort", q: "I value 'being busy' as a metric of my own success.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Impact vs Effort", q: "I confuse high activity with high impact.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Boundaries", q: "I check my work messages within 15 minutes of waking up.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Boundaries", q: "I find it nearly impossible to say 'no' to my superiors.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Boundaries", q: "I feel resentful toward colleagues who have better work-life balance.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Boundaries", q: "I use my 'hard work' as a way to avoid dealing with my own burnout.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Boundaries", q: "I feel like I am the only one who truly cares about this company's success.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] }
    ]
  },

  // ── SIGNAL vs NOISE (EXPANDED & SECTIONED) ───────────
  {
    id: "signal",
    title: "Signal vs. Noise Quotient",
    tagline: "How much of your day is signal — and how much is static?",
    description: "Measures your ability to filter high-value information from digital noise and maintain strategic focus.",
    questions: 20,
    time: "10 min",
    icon: "📡",
    sections: [
      { name: "Information Diet", start: 0, end: 4 },
      { name: "Focus Environment", start: 5, end: 9 },
      { name: "Digital Hygiene", start: 10, end: 14 },
      { name: "Filter Quality", start: 15, end: 19 }
    ],
    questions_data: [
      { section: "Information Diet", q: "I consume long-form content (books/articles) more than social feeds.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Information Diet", q: "I can summarize the 3 most important things I learned this week.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Information Diet", q: "I subscribe only to newsletters that provide genuine strategic value.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Information Diet", q: "I find myself scrolling news or social media without a specific goal.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Information Diet", q: "I prioritize depth over breadth in my professional learning.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Focus Environment", q: "I can work for 90+ minutes without checking a single notification.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Focus Environment", q: "My digital workspace is free of unnecessary open tabs and apps.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Focus Environment", q: "I have 'No-Phone' zones or times in my workday.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Focus Environment", q: "Interruptions from colleagues significantly disrupt my flow.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Focus Environment", q: "I use 'Deep Work' blocks that are non-negotiable on my calendar.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Digital Hygiene", q: "I have disabled all non-essential app notifications on my phone.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Digital Hygiene", q: "I batch-process my emails at specific times rather than checking all day.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Digital Hygiene", q: "I feel an urgent need to reply to messages the moment they arrive.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Digital Hygiene", q: "I use tools to block distracting websites during work hours.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Digital Hygiene", q: "I check my phone first thing in the morning before doing anything else.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Filter Quality", q: "I can easily distinguish between 'Urgent' and 'Important' tasks.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Filter Quality", q: "I feel mentally depleted from information overload by 3 PM.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Filter Quality", q: "I have a clear system for deciding what info deserves my attention.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Filter Quality", q: "Meetings I attend often feel like they could have been an email.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Filter Quality", q: "I spend more time producing than I do consuming.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] }
    ]
  },

  // ── LEADERSHIP ARCHETYPE (EXPANDED & SECTIONED) ────────
  {
    id: "leadership",
    title: "Leadership Archetype Scanner",
    tagline: "Visionary, Executor, Coach, or Stabilizer?",
    description: "Cuts through self-perception bias to reveal your dominant leadership style based on behaviors and instincts.",
    questions: 20,
    time: "11 min",
    icon: "👑",
    sections: [
      { name: "Vision & Strategy", start: 0, end: 4 },
      { name: "Execution", start: 5, end: 9 },
      { name: "People & Coaching", start: 10, end: 14 },
      { name: "Systems & Process", start: 15, end: 19 }
    ],
    questions_data: [
      { section: "Vision & Strategy", q: "I lead by painting a compelling picture of the future.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Vision & Strategy", q: "I enjoy taking big risks for the sake of long-term growth.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Vision & Strategy", q: "I am comfortable with high levels of ambiguity and change.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Vision & Strategy", q: "I focus more on 'Why' we do things than 'How' we do them.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Vision & Strategy", q: "I find routine maintenance work boring and uninspiring.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Execution", q: "I lead by setting a high pace and getting things done.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Execution", q: "I measure my team's success by measurable output and KPIs.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Execution", q: "I am willing to bypass protocol to get a critical project finished.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Execution", q: "I feel frustrated when meetings don't result in immediate action.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Execution", q: "I lead by example, often working alongside the team on tasks.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "People & Coaching", q: "I lead by developing the individual talents of my team.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "People & Coaching", q: "I would rather mentor an underperformer than replace them.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "People & Coaching", q: "I prioritize team harmony and emotional safety above all else.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "People & Coaching", q: "I adjust my leadership style based on each person's needs.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "People & Coaching", q: "I spend a lot of time in 1-on-1s listening to my team.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Systems & Process", q: "I lead by creating reliable systems and clear protocols.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Systems & Process", q: "I believe consistency is more important than rapid innovation.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Systems & Process", q: "I spend time documenting workflows and building SOPs.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Systems & Process", q: "I lead by bringing order and predictability to chaos.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Systems & Process", q: "I measure success by the stability and scalability of the system.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] }
    ]
  },

  // ── EMOTIONAL INTELLIGENCE (EXPANDED & SECTIONED) ────
  {
    id: "ei",
    title: "Emotional Intelligence Audit",
    tagline: "How well do you manage yourself and others?",
    description: "Measures Self-Awareness, Regulation, Empathy, and Social Skills — the factors that define your professional ceiling.",
    questions: 20,
    time: "10 min",
    icon: "❤️",
    sections: [
      { name: "Self-Awareness", start: 0, end: 4 },
      { name: "Regulation", start: 5, end: 9 },
      { name: "Empathy", start: 10, end: 14 },
      { name: "Social Skills", start: 15, end: 19 }
    ],
    questions_data: [
      { section: "Self-Awareness", q: "I can accurately name the specific emotion I am feeling.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Self-Awareness", q: "I know exactly what 'triggers' cause me to lose focus or temper.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Self-Awareness", q: "I am aware of how my mood affects my team's energy.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Self-Awareness", q: "I recognize when I am being defensive during a conversation.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Self-Awareness", q: "I understand my own strengths and limitations clearly.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Regulation", q: "I can stay calm and composed under intense pressure.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Regulation", q: "I think before I speak, even when I am angry or upset.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Regulation", q: "I can easily 'bounce back' from a professional rejection.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Regulation", q: "I rarely make impulsive decisions driven by fear or excitement.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Regulation", q: "I am able to admit my mistakes and take responsibility quickly.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Empathy", q: "I can sense when someone is upset even if they say they are fine.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Empathy", q: "I naturally consider how my decisions will impact others' feelings.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Empathy", q: "I am a good listener who hears what is NOT being said.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Empathy", q: "I find it easy to see a conflict from the other person's perspective.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Empathy", q: "People naturally come to me to vent or seek emotional support.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Social Skills", q: "I am effective at navigating difficult or heated conversations.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Social Skills", q: "I am good at building rapport with people I have just met.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Social Skills", q: "I can influence others without having to use my formal authority.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Social Skills", q: "I am effective at diffusing tension in a team meeting.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Social Skills", q: "I am able to provide critical feedback in a way that is well-received.", options: ["Almost always","Often","Sometimes","Rarely","Never"] }
    ]
  },

  // ── GROWTH MINDSET (EXPANDED & SECTIONED) ────────────
  {
    id: "growth",
    title: "Growth Mindset Diagnostic",
    tagline: "Fixed or fluid? Measures your learning ceiling.",
    description: "Evaluates your behavioral patterns around challenge, failure, and feedback.",
    questions: 20,
    time: "8 min",
    icon: "🌱",
    sections: [
      { name: "Challenges", start: 0, end: 4 },
      { name: "Failure", start: 5, end: 9 },
      { name: "Effort Beliefs", start: 10, end: 14 },
      { name: "Feedback", start: 15, end: 19 }
    ],
    questions_data: [
      { section: "Challenges", q: "I actively seek out tasks that are beyond my current skill level.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Challenges", q: "I prefer tasks where I know I can succeed without making mistakes.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Challenges", q: "I see difficult problems as puzzles rather than threats.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Challenges", q: "I feel excited when I encounter a challenge I haven't seen before.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Challenges", q: "I avoid taking on projects where there is a risk of public failure.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Failure", q: "When I fail at something, I treat it as data for improvement.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Failure", q: "I tend to hide my mistakes from my boss or colleagues.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Failure", q: "I believe that my core talents can be developed with effort.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Failure", q: "I get discouraged and stop trying if I don't see immediate results.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Failure", q: "I view failure as a necessary step toward mastery.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Effort Beliefs", q: "I believe that intelligence is something you are born with and can't change much.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Effort Beliefs", q: "I think that if you have to work hard at something, you probably aren't good at it.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Effort Beliefs", q: "I take pride in the amount of effort I put into a difficult task.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Effort Beliefs", q: "I believe that 'practice makes permanent' and keep trying.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Effort Beliefs", q: "I see mastery as a never-ending journey rather than a destination.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Feedback", q: "I seek out feedback even when I know it might be critical.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Feedback", q: "Critical feedback feels like a personal attack rather than useful info.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Feedback", q: "I feel threatened when a colleague outperforms me.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Feedback", q: "I regularly ask high-performers for advice on their success.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Feedback", q: "I share my own failures with others so they can learn from them.", options: ["Almost always","Often","Sometimes","Rarely","Never"] }
    ]
  },

  {
    id: "hardworking",
    title: "Hardworking Index",
    tagline: "Are you truly putting in the work — or just feeling busy?",
    description: "Measures the depth and quality of your work across effort, consistency, and resilience.",
    questions: 22,
    time: "10 min",
    icon: "🔨",
    sections: [
      { name: "Work Ethic", start: 0, end: 4 },
      { name: "Consistency", start: 5, end: 9 },
      { name: "Focus", start: 10, end: 14 },
      { name: "Resilience", start: 15, end: 18 },
      { name: "Motivation", start: 19, end: 21 }
    ],
    questions_data: [
      { section: "Work Ethic", q: "When I take on a task, I commit to seeing it through.", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Work Ethic", q: "How would colleagues describe your effort?", options: ["Minimum required","Inconsistent","Solid","Above and beyond","Hardest working person"] },
      { section: "Work Ethic", q: "When given a deadline, I typically...", options: ["Struggle","Meet last-minute","Meet comfortably","Finish early","Exceed quality early"] },
      { section: "Work Ethic", q: "I put in extra effort even when no one is watching.", options: ["Rarely","Sometimes","Varies","Often","Always"] },
      { section: "Work Ethic", q: "How often do you take on extra responsibility?", options: ["Never","Occasionally","Sometimes","Often","Proactively"] },
      { section: "Consistency", q: "My productivity across a week is...", options: ["Very uneven","Uneven","Moderate","Consistent","Very consistent"] },
      { section: "Consistency", q: "When I set a goal, I follow through...", options: ["Rarely","Sometimes","Half time","Most time","Almost always"] },
      { section: "Consistency", q: "Behavior when motivation is low?", options: ["Do little","Go through motions","Do some work","Push through","Maintain output"] },
      { section: "Consistency", q: "I have structured routines to stay productive.", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Consistency", q: "Recovery from unexpected disruption?", options: ["Weeks","Slow","Days","Quick","Immediate"] },
      { section: "Focus", q: "Time spent on 'needle-moving' tasks?", options: ["Little","Less half","About half","More half","Majority"] },
      { section: "Focus", q: "Ability to sustain deep focus?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Focus", q: "Handling a long to-do list?", options: ["Overwhelmed","Easiest first","Randomly","Prioritise but drift","Attack highest impact first"] },
      { section: "Focus", q: "Protecting focus hours from noise?", options: ["Not at all","Poorly","Somewhat","Well","Very well"] },
      { section: "Focus", q: "Review workload to eliminate low-value tasks?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Resilience", q: "Response to significant obstacles?", options: ["Step back","Discouraged","Take break","Work through","Solve as problem"] },
      { section: "Resilience", q: "Pushed through exhaustion to finish?", options: ["Rarely","Occasionally","Sometimes","Often","Almost always"] },
      { section: "Resilience", q: "Project takes longer than expected?", options: ["Abandon","Quality drops","Adjust but lose drive","Keep pace","Stay committed"] },
      { section: "Resilience", q: "Response to critical feedback?", options: ["Demotivated","Take personal","Use to adjust","Return quickly","Treat as data"] },
      { section: "Motivation", q: "Clear sense of 'Why' my work matters?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Motivation", q: "Drive comes from within (internal)?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Motivation", q: "Satisfaction with effort past 3 months?", options: ["Very unsatisfied","Unsatisfied","Neutral","Satisfied","Very satisfied"] }
    ]
  },

  {
    id: "ambition",
    title: "Ambition Spectrum",
    tagline: "How high are you really aiming — and what's driving it?",
    description: "Measures goal orientation, drive for growth, and long-term vision.",
    questions: 22,
    time: "10 min",
    icon: "🚀",
    sections: [
      { name: "Goal Clarity", start: 0, end: 4 },
      { name: "Drive & Initiative", start: 5, end: 9 },
      { name: "Risk & Growth", start: 10, end: 13 },
      { name: "Long-Term Vision", start: 14, end: 17 },
      { name: "Inner Fuel", start: 18, end: 21 }
    ],
    questions_data: [
      { section: "Goal Clarity", q: "I have specific, concrete goals I am working toward.", options: ["No","Vague","Shift frequent","Clear","Specific target"] },
      { section: "Goal Clarity", q: "Measurability of goals?", options: ["Vague","Defined","Moderate","Trackable","Specific results"] },
      { section: "Goal Clarity", q: "Frequency of goal review?", options: ["Rarely","Occasionally","Sometimes","Regularly","Consistently"] },
      { section: "Goal Clarity", q: "Where you want to be in 5 years?", options: ["No idea","Vaguely","General direction","Clear picture","Confidently detailed"] },
      { section: "Goal Clarity", q: "Goals aligned with values?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Drive & Initiative", q: "Response to growth opportunities?", options: ["Hesitate","Rare action","Evaluation only","Act quickly","Move decisively"] },
      { section: "Drive & Initiative", q: "Proactively create opportunities?", options: ["Never","Rarely","Sometimes","Often","Always"] },
      { section: "Drive & Initiative", q: "Invest time outside work in skills?", options: ["Rarely","Occasionally","Sometimes","Often","Always"] },
      { section: "Drive & Initiative", q: "Progress over past 2 years?", options: ["Still","Slight","Mixed","Satisfied","Significant"] },
      { section: "Drive & Initiative", q: "After achieving a goal, my instinct is...", options: ["Relax","Enjoy moment","Start thinking","Set bigger target","Raise the bar"] },
      { section: "Risk & Growth", q: "Willing to leave comfort for pursuit?", options: ["Rarely","Pressure only","Sometimes","Often","Always"] },
      { section: "Risk & Growth", q: "Handling bold moves with risk of failure?", options: ["Avoid","Think only","Need validation","Weigh carefully","Lean in"] },
      { section: "Risk & Growth", q: "Put self in situations where I might fail?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Risk & Growth", q: "Stretch beyond comfort past year?", options: ["Not at all","Little","Moderately","Significantly","Substantially"] },
      { section: "Long-Term Vision", q: "Willing to make short-term sacrifices?", options: ["Rarely","Sometimes","Moderately","Often","Always"] },
      { section: "Long-Term Vision", q: "Habits connected to long-term goals?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Long-Term Vision", q: "How far ahead do you think?", options: ["Days","Months","1-2 years","3-5 years","Decade+"] },
      { section: "Long-Term Vision", q: "Building a career you are proud of?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Inner Fuel", q: "Ambition driven by internal desire?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Inner Fuel", q: "Feel excited by imagining success?", options: ["Admiration","Material","Mixed","Satisfaction","Full Potential"] },
      { section: "Inner Fuel", q: "Fear of failure impact on ambition?", options: ["Stops me","Shrinks aim","Cautious","Act in spite","Peace with failure"] },
      { section: "Inner Fuel", q: "How ambitious are you relative to potential?", options: ["Not at all","Mildly","Moderately","Quite","Highly"] }
    ]
  },

  {
    id: "loneliness",
    title: "Loneliness & Connection Index",
    tagline: "Are you truly connected — or just surrounded?",
    description: "Measures perceived connection, belonging, and emotional intimacy.",
    questions: 20,
    time: "9 min",
    icon: "🫂",
    sections: [
      { name: "Social Connection", start: 0, end: 4 },
      { name: "Emotional Intimacy", start: 5, end: 8 },
      { name: "Belonging", start: 9, end: 12 },
      { name: "Self-Relationship", start: 13, end: 16 },
      { name: "Impact", start: 17, end: 19 }
    ],
    questions_data: [
      { section: "Social Connection", q: "People I can genuinely talk to?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Social Connection", q: "Frequency of quality time with friends?", options: ["Rarely","Monthly","Few times","Weekly","Multiple times"] },
      { section: "Social Connection", q: "Reaching out makes me feel...", options: ["Burden","Uncertain","Neutral","Welcome","Wanted"] },
      { section: "Social Connection", q: "Person to call in distress?", options: ["No","Not sure","Maybe","Yes","Definitely"] },
      { section: "Social Connection", q: "Satisfied with number of relationships?", options: ["Very unsatisfied","Unsatisfied","Neutral","Satisfied","Very satisfied"] },
      { section: "Emotional Intimacy", q: "Someone truly knows the 'real' me?", options: ["No","Not sure","Partly","Mostly","Yes"] },
      { section: "Emotional Intimacy", q: "Instinct when struggling emotionally?", options: ["Alone","Distract","Process alone","Reach out soon","Seek quickly"] },
      { section: "Emotional Intimacy", q: "Comfortable with being vulnerable?", options: ["Very uncomfortable","Uncomfortable","Somewhat","Fairly","Very"] },
      { section: "Emotional Intimacy", q: "Feel understood by those close to me?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Belonging", q: "Have a community where I belong?", options: ["No","Participate only","One context","One/Two","Multiple"] },
      { section: "Belonging", q: "Free to be myself (not performing)?", options: ["Rarely","Sometimes","Most people","Almost always","Always"] },
      { section: "Belonging", q: "Feel like an outsider in groups?", options: ["Very often","Often","Sometimes","Rarely","Almost never"] },
      { section: "Belonging", q: "People notice if I withdraw?", options: ["No one","1-2 people","Few people","Most people","Everyone"] },
      { section: "Self-Relationship", q: "Enjoy spending time alone?", options: ["No","Tolerate","Okay","Enjoy","Deeply value"] },
      { section: "Self-Relationship", q: "Feelings when alone with thoughts?", options: ["Anxious","Restless","Mixed","At ease","At home"] },
      { section: "Self-Relationship", q: "Rely on others to feel okay?", options: ["Always","Often","Sometimes","Rarely","Almost never"] },
      { section: "Self-Relationship", q: "Overall relationship with self?", options: ["Difficult","Strained","Functional","Positive","Healthy"] },
      { section: "Impact", q: "How often feel lonely?", options: ["Every day","Often","Sometimes","Rarely","Almost never"] },
      { section: "Impact", q: "Loneliness impact on functioning?", options: ["Very significant","Significant","Moderate","Mild","Minimal"] },
      { section: "Impact", q: "Connections reflect what I need?", options: ["Not at all","Not much","Partially","Mostly","Fully"] }
    ]
  },

  {
    id: "listening",
    title: "Listening Intelligence Profile",
    tagline: "Are you truly listening — or just waiting to speak?",
    description: "Measures presence, comprehension, attunement, and response quality.",
    questions: 21,
    time: "10 min",
    icon: "👂",
    sections: [
      { name: "Presence & Attention", start: 0, end: 4 },
      { name: "Comprehension", start: 5, end: 8 },
      { name: "Emotional Attunement", start: 9, end: 12 },
      { name: "Response Quality", start: 13, end: 16 },
      { name: "Listening Under Pressure", start: 17, end: 20 }
    ],
    questions_data: [
      { section: "Presence & Attention", q: "Fully present when others speak?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Presence & Attention", q: "Phone competes for attention?", options: ["Always","Often","Sometimes","Rarely","Almost never"] },
      { section: "Presence & Attention", q: "Notice non-verbal signals?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Presence & Attention", q: "Make others feel heard?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Presence & Attention", q: "Finish others' sentences?", options: ["Very often","Often","Sometimes","Rarely","Almost never"] },
      { section: "Comprehension", q: "Accurately recall key points?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Comprehension", q: "Ask clarifying questions?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Comprehension", q: "Listen for what is NOT being said?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Comprehension", q: "Summaries confirmed as accurate?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Emotional Attunement", q: "Listen before offering advice?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Emotional Attunement", q: "Sense emotional discrepancies?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Emotional Attunement", q: "Others feel safe sharing vulnerability?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Emotional Attunement", q: "Stay calm when others are upset?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Response Quality", q: "Acknowledge before intro my view?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Response Quality", q: "Questions deepen discussion?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Response Quality", q: "People feel clearer after talking?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Response Quality", q: "Resist urge to self-reference?", options: ["Rarely","Often","Sometimes","Rarely","Almost never"] },
      { section: "Listening Under Pressure", q: "Listen openly during disagreement?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Listening Under Pressure", q: "Listen in fast conversations?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Listening Under Pressure", q: "Listen to criticism before defending?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Listening Under Pressure", q: "Self-rating as a listener?", options: ["Poor","Below avg","Average","Good","Excellent"] }
    ]
  },

  {
    id: "attachment",
    title: "Attachment Style Indicator",
    tagline: "How you love, connect, and pull away — and why.",
    description: "Evaluates your blueprint for handle intimacy, conflict, and trust.",
    questions: 25,
    time: "12 min",
    icon: "💞",
    sections: [
      { name: "Intimacy", start: 0, end: 4 },
      { name: "Anxiety", start: 5, end: 9 },
      { name: "Avoidance", start: 10, end: 14 },
      { name: "Conflict", start: 15, end: 19 },
      { name: "Security", start: 20, end: 24 }
    ],
    questions_data: [
      { section: "Intimacy", q: "Easy to let people close emotionally?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Intimacy", q: "Feel when someone depends on me?", options: ["Overwhelmed","Uncomfortable","Mixed","Comfortable","Secure"] },
      { section: "Intimacy", q: "Able to share inner world?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Intimacy", q: "Comfortable with mutual dependency?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Intimacy", q: "Feel loved for who I am?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Anxiety", q: "Worry people don't value me enough?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Anxiety", q: "Reaction to someone being distant?", options: ["Fine","Curious","Unsettled","Anxious","Very anxious"] },
      { section: "Anxiety", q: "Replay interactions for errors?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Anxiety", q: "Fear of rejection affects behavior?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Anxiety", q: "Seek reassurance frequently?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Avoidance", q: "Impulse to withdraw from closeness?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Avoidance", q: "Prefer emotional distance?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Avoidance", q: "Deal with emotions alone?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Avoidance", q: "Keep others at arm's length?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Avoidance", q: "Difficult to express needs?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Conflict", q: "Move toward person in tension?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Conflict", q: "Able to repair without withdrawal?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Conflict", q: "Express hurt without exploding?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Conflict", q: "Easy to offer genuine apology?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Conflict", q: "Conflict resolved without damage?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Security", q: "Trust people will be there for me?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Security", q: "Feel secure in closest relationships?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Security", q: "Past hurt affects current connection?", options: ["Always","Often","Sometimes","Rarely","Almost never"] },
      { section: "Security", q: "Sense of worthiness of love?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Security", q: "Overall experience of relationships?", options: ["Painful","Difficult","Mixed","Positive","Nourishing"] }
    ]
  }
];

// ============================================
// HELPERS FOR REUSABLE SECTION LOGIC
// ============================================
function calculateSectionScores(answers, sections) {
  return sections.map(sec => {
    const sectionAnswers = answers.slice(sec.start, sec.end + 1);
    const maxScore = sectionAnswers.length * 4;
    const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
    return Math.round((raw / maxScore) * 100);
  });
}

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
      D: { label: "Dominant Driver", score: 82, color: "#ef4444", description: "You are results-driven and move fast.", strengths: ["Decisive","Clear"], watch: ["Rushing","Steamrolling"] },
      I: { label: "Influential Connector", score: 78, color: "#f59e0b", description: "You energize others and build enthusiasm.", strengths: ["Relationship builder","Inspiring"], watch: ["Overpromising","Details"] },
      S: { label: "Steady Supporter", score: 74, color: "#10b981", description: "You create harmony and reliability.", strengths: ["Reliable","Consistent"], watch: ["Resisting change","Avoiding conflict"] },
      C: { label: "Conscientious Analyst", score: 79, color: "#6366f1", description: "You focus on quality and accuracy.", strengths: ["Analytical","Systematic"], watch: ["Over-analysis","Perfectionism"] }
    };
    return profiles[primary];
  },

  bigfive: (answers) => {
    const score = answers.reduce((s, a) => s + (4 - a), 0);
    const pct = Math.round((score / (8 * 4)) * 100);
    return { label: pct > 60 ? "Open & Extraverted" : "Focused & Introverted", score: pct, color: "#6366f1", description: "Measuring your traits against the gold standard OCEAN model." };
  },

  martyr: (answers) => {
    const test = TESTS.find(t => t.id === "martyr");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: sectionScores[i], color: sectionScores[i] > 60 ? "#ef4444" : "#10b981",
      description: "Analysis of your tendencies in this category.",
      watch: ["Consider how this impacts your bandwidth."]
    }));
    return { overall, overallLabel: overall > 65 ? "High Martyr Pattern" : "High Impact Operator", overallColor: overall > 65 ? "#ef4444" : "#10b981", overallDescription: "The Martyr Index measures the gap between effort and impact.", sectionResults };
  },

  signal: (answers) => {
    const test = TESTS.find(t => t.id === "signal");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: sectionScores[i], color: sectionScores[i] > 60 ? "#10b981" : "#f59e0b",
      description: "Assessment of your information processing quality.",
      watch: ["Identify and block noise leaks here."]
    }));
    return { overall, overallLabel: overall > 70 ? "High Signal Thinker" : "Noise Sensitive", overallColor: "#6366f1", overallDescription: "Measures your ability to maintain strategic focus.", sectionResults };
  },

  leadership: (answers) => {
    const test = TESTS.find(t => t.id === "leadership");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const labels = ["Visionary", "Executor", "Coach", "Stabilizer"];
    const primaryIdx = sectionScores.indexOf(Math.max(...sectionScores));
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: sectionScores[i], color: "#6366f1",
      description: `Analysis of your ${labels[i]} instincts.`,
      watch: ["Balance this with other archetypes."]
    }));
    return { overall, overallLabel: `The ${labels[primaryIdx]}`, overallColor: "#6366f1", overallDescription: "Your scanner reveals your dominant leadership instincts.", sectionResults };
  },

  ei: (answers) => {
    const test = TESTS.find(t => t.id === "ei");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: sectionScores[i], color: sectionScores[i] > 70 ? "#10b981" : "#f59e0b",
      description: "Interpersonal and emotional management scores.",
      watch: ["Prioritize development in this area."]
    }));
    return { overall, overallLabel: overall > 70 ? "High EQ Leader" : "EQ Developing", overallColor: "#10b981", overallDescription: "Measuring self-awareness and social intelligence.", sectionResults };
  },

  growth: (answers) => {
    const test = TESTS.find(t => t.id === "growth");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: sectionScores[i], color: sectionScores[i] > 70 ? "#10b981" : "#f59e0b",
      description: "Mindset fluidity and learning agility.",
      watch: ["Practice reframing challenges here."]
    }));
    return { overall, overallLabel: overall > 70 ? "Growth Dominant" : "Mixed Mindset", overallColor: "#10b981", overallDescription: "Measures patterns around challenge and failure.", sectionResults };
  },

  hardworking: (answers) => {
    const test = TESTS.find(t => t.id === "hardworking");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: sectionScores[i], color: sectionScores[i] > 70 ? "#10b981" : "#f59e0b",
      description: "Measuring sustained, high-quality effort.",
      watch: ["Review your consistency routines."]
    }));
    return { overall, overallLabel: "High-Output Operator", overallColor: "#10b981", overallDescription: "The Hardworking Index measures depth of effort.", sectionResults };
  },

  ambition: (answers) => {
    const test = TESTS.find(t => t.id === "ambition");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: sectionScores[i], color: "#6366f1",
      description: "Goal clarity and internal drive scores.",
      watch: ["Align goals with personal values."]
    }));
    return { overall, overallLabel: "Purposefully Ambitious", overallColor: "#6366f1", overallDescription: "Measures long-term vision and growth drive.", sectionResults };
  },

  loneliness: (answers) => {
    const test = TESTS.find(t => t.id === "loneliness");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: sectionScores[i], color: sectionScores[i] > 70 ? "#10b981" : "#ef4444",
      description: "Connection quality and belonging analysis.",
      watch: ["Nurture deeper intimacy here."]
    }));
    return { overall, overallLabel: "Well-Connected", overallColor: "#10b981", overallDescription: "Blueprint for connection and belonging.", sectionResults };
  },

  listening: (answers) => {
    const test = TESTS.find(t => t.id === "listening");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: sectionScores[i], color: "#10b981",
      description: "Comprehension and attunement scores.",
      watch: ["Practice clarifying questions."]
    }));
    return { overall, overallLabel: "Masterful Listener", overallColor: "#10b981", overallDescription: "Measures presence and intelligence in conversation.", sectionResults };
  },

  attachment: (answers) => {
    const test = TESTS.find(t => t.id === "attachment");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const adjScores = sectionScores.map((s, i) => (i === 1 || i === 2) ? 100 - s : s);
    const overall = Math.round(adjScores.reduce((s, v) => s + v, 0) / adjScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name, score: (i === 1 || i === 2) ? 100 - sectionScores[i] : sectionScores[i], color: "#6366f1",
      description: "Relational blueprint dimension.",
      watch: ["Observe how this affects conflict."]
    }));
    return { overall, overallLabel: "Securely Attached", overallColor: "#10b981", overallDescription: "blueprint for handling close relationships.", sectionResults };
  }
};

// ============================================
// STATE & UI ENGINE
// ============================================
let currentPage = "home";
let currentTest = null;
let currentQuestion = 0;
let answers = [];

function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  const target = document.getElementById(page);
  if(target) target.style.display = "block";
  currentPage = page;

  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const navMap = { home: "nav-home", tests: "nav-tests" };
  if (navMap[page]) document.getElementById(navMap[page])?.classList.add("active");

  if (page === "tests") renderTestGrid();
  if (page === "coaching") renderCoachingPage();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

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

function openKnowMore(testId) {
  const t = TESTS.find(x => x.id === testId);
  if (!t) return;
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
      <h2 class="text-gradient">${t.title}</h2>
      <p style="color:var(--text-muted); margin-bottom:24px; font-size:0.95rem; line-height:1.7;">${t.description}</p>
      <button class="btn-primary btn-full" onclick="document.getElementById('know-more-modal').style.display='none'; startTest('${t.id}')">
        Begin Analysis →
      </button>
    </div>
  `;
  modal.style.display = "block";
}

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

  document.getElementById("test-title").textContent = t.title;

  let progressBarHtml = "";
  if (t.sections && t.sections.length) {
    const sectionsHtml = t.sections.map((sec, i) => {
      const isActive = currentQuestion >= sec.start && currentQuestion <= sec.end;
      const isComplete = currentQuestion > sec.end;
      const segProgress = isComplete ? 100 : isActive ? Math.round(((currentQuestion - sec.start) / (sec.end - sec.start + 1)) * 100) : 0;
      return `
        <div style="flex:1; padding: 0 4px;">
          <div style="font-size:0.55rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:${isActive ? "var(--brand-indigo)" : isComplete ? "#10b981" : "#94a3b8"}; margin-bottom:6px;">${sec.name}</div>
          <div style="background:#e2e8f0; border-radius:10px; height:6px; overflow:hidden;">
            <div style="height:100%; width:${segProgress}%; background:var(--brand-grad); transition:width 0.3s ease;"></div>
          </div>
        </div>
      `;
    }).join("");
    progressBarHtml = `<div style="display:flex; gap:0; width:100%; max-width:650px; margin:0 auto 24px;">${sectionsHtml}</div>`;
  } else {
    progressBarHtml = `<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${(currentQuestion/total)*100}%"></div></div>`;
  }

  document.getElementById("question-area").innerHTML = `
    ${progressBarHtml}
    <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:20px;">Question ${currentQuestion + 1} of ${total} ${q.section ? '· ' + q.section : ''}</p>
    <div style="background:white; border-radius:24px; padding: clamp(24px, 4vw, 40px); box-shadow:var(--shadow-card); max-width:620px; margin:0 auto 24px; text-align:left;">
      <p style="font-size:1.2rem; font-weight:700; color:var(--text-primary); margin-bottom:28px; line-height:1.5;">${q.q}</p>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${q.options.map((opt, i) => `
          <label class="answer-option ${answers[currentQuestion] === i ? 'selected' : ''}" onclick="selectAnswer(${i})">
            <span class="answer-letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `;
}

function selectAnswer(index) {
  answers[currentQuestion] = index;
  document.querySelectorAll(".answer-option").forEach((el, i) => { el.classList.toggle("selected", i === index); });
}

function changeQuestion(direction) {
  if (direction === 1) {
    if (answers[currentQuestion] === null) return;
    if (currentQuestion === currentTest.questions_data.length - 1) { generateReport(); return; }
    currentQuestion++;
  } else {
    if (currentQuestion === 0) return;
    currentQuestion--;
  }
  renderQuestion();
}

function generateReport() {
  const logic = REPORT_LOGIC[currentTest.id];
  if (!logic) return;
  const result = logic(answers);
  showPage("report");

  if (result.sectionResults) {
    const sectionCards = result.sectionResults.map(sec => `
      <div style="background:#f8fafc; border-radius:16px; padding:20px; margin-bottom:16px; border-left:5px solid ${sec.color || '#6366f1'};">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-weight:800; font-size:1rem; color:var(--text-primary);">${sec.name}</span>
          <span style="font-weight:800; font-size:1.1rem; color:${sec.color || '#6366f1'};">${sec.score}/100</span>
        </div>
        <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;">${sec.description}</p>
      </div>
    `).join("");

    document.getElementById("report-page-content").innerHTML = `
      <div style="text-align:center; padding:60px 20px; background:var(--brand-grad); border-radius:24px; color:white; margin-bottom:30px;">
        <p style="text-transform:uppercase; letter-spacing:0.15em; font-size:0.8rem; font-weight:700; opacity:0.8;">Analysis Result</p>
        <h1 style="font-size:clamp(2.5rem, 8vw, 4.5rem); margin:10px 0;">${result.overall}<span style="font-size:1.5rem; opacity:0.7;">/100</span></h1>
        <h2 style="font-size:clamp(1.5rem, 4vw, 2rem);">${result.overallLabel}</h2>
      </div>
      <div style="background:white; border-radius:24px; padding: clamp(24px, 5vw, 48px); box-shadow:var(--shadow-card);">
        <h3 style="margin-bottom:20px; font-size:1.2rem; font-weight:800;">Detailed Breakdown</h3>
        ${sectionCards}
        <div style="margin-top:40px; display:flex; flex-direction:column; gap:12px;">
           <button class="btn-primary btn-full" onclick="showPage('coaching')">Book Professional Coaching →</button>
           <button class="btn-secondary btn-full" onclick="showPage('tests')">Try Another Assessment</button>
        </div>
      </div>
    `;
  } else {
    document.getElementById("report-page-content").innerHTML = `
      <div style="text-align:center; padding:60px 20px; background:var(--brand-grad); border-radius:24px; color:white; margin-bottom:30px;">
        <h1 style="font-size:3rem;">${result.label}</h1>
        <p style="font-size:1.2rem;">Score: ${result.score}/100</p>
      </div>
      <div style="background:white; border-radius:24px; padding:40px; box-shadow:var(--shadow-card);">
        <p style="font-size:1.1rem; line-height:1.7;">${result.description}</p>
        <button class="btn-primary btn-full" onclick="showPage('tests')" style="margin-top:30px;">Back to Assessments</button>
      </div>
    `;
  }
}

function renderCoachingPage() {
  document.getElementById("coaching").innerHTML = `
    <div class="container" style="padding:80px 20px; text-align:center;">
      <h1 style="font-size:clamp(2rem, 5vw, 3.5rem);">Work With <span class="text-gradient">A Coach</span></h1>
      <p style="max-width:600px; margin:20px auto; font-size:1.1rem; color:var(--text-muted);">Data is the map. Coaching is the vehicle. Book a session to build a high-performance roadmap based on your assessment results.</p>
      <div class="coaching-card" style="max-width:500px; margin:50px auto; background:white; padding:40px; border-radius:24px; box-shadow:var(--shadow-card); text-align:left;">
        <form onsubmit="event.preventDefault(); alert('Request Received! Our team will contact you within 24 hours.');">
          <label style="font-weight:700; font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:8px;">FULL NAME</label>
          <input class="main-input" type="text" placeholder="Your name" required style="margin-bottom:20px;">
          <label style="font-weight:700; font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:8px;">EMAIL ADDRESS</label>
          <input class="main-input" type="email" placeholder="email@address.com" required style="margin-bottom:20px;">
          <label style="font-weight:700; font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:8px;">YOUR GOAL</label>
          <textarea class="main-input" placeholder="e.g. I want to scale my team's output..." rows="4" style="margin-bottom:24px;"></textarea>
          <button class="btn-primary btn-full">Request Session →</button>
        </form>
      </div>
    </div>
  `;
}

// ============================================
// INIT
// ============================================
showPage("home");

const style = document.createElement('style');
style.textContent = `
  .answer-option { display:flex; align-items:center; gap:16px; padding:18px; border:2px solid #e2e8f0; border-radius:14px; cursor:pointer; transition:all 0.2s ease; font-weight:600; font-size:0.95rem; background:#fcfcfc; }
  .answer-option:hover { border-color:var(--brand-indigo); background:#fff; transform: translateY(-1px); }
  .answer-option.selected { border-color:var(--brand-indigo); background:rgba(99,102,241,0.08); color:var(--brand-indigo); }
  .answer-letter { width:28px; height:28px; border-radius:50%; background:white; border:2px solid #e2e8f0; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:800; flex-shrink:0; }
  .answer-option.selected .answer-letter { background:var(--brand-indigo); border-color:var(--brand-indigo); color:white; }
`;
document.head.appendChild(style);