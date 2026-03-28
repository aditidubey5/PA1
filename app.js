
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
      { q: "I feel most accomplished when I...", options: ["Win or achieve a measurable result","Positively influence or inspire someone","Create a smooth, stable process","Deliver something error-free and complete"] }
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
      { q: "I feel comfortable being the center of attention.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] }
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
  {
    id: "signal",
    title: "Signal vs. Noise Quotient",
    tagline: "How much of your day is signal — and how much is static?",
    description: "In the attention economy, your ability to filter high-value information from digital noise is a professional superpower. This assessment measures your Signal/Noise Quotient (SNQ) — quantifying your information diet, focus quality, and strategic thinking bandwidth.",
    questions: 22,
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
  {
    id: "leadership",
    title: "Leadership Archetype Scanner",
    tagline: "Discover the leader you actually are — not the one you think you are.",
    description: "Are you a Visionary, an Executor, a Coach, or a Stabilizer? This assessment cuts through self-perception bias to reveal your dominant leadership archetype based on your actual behaviors, instincts, and decisions — not your aspirations.",
    questions: 24,
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
  {
    id: "ei",
    title: "Emotional Intelligence Audit",
    tagline: "Your EQ is the ceiling on your leadership. Find out where it sits.",
    description: "Emotional Intelligence (EQ) is the ability to recognize, understand, and manage emotions — in yourself and others. Research consistently shows EQ outperforms IQ in predicting leadership effectiveness, team performance, and career longevity.",
    questions: 26,
    time: "12 min",
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
  {
    id: "growth",
    title: "Growth Mindset Diagnostic",
    tagline: "Fixed or fluid? This is the meta-skill beneath every other skill.",
    description: "Psychologist Carol Dweck's foundational research shows that how you think about your own abilities determines how far you'll grow. This diagnostic goes beyond self-reported mindset to measure your behavioral patterns around challenge, failure, learning, and feedback.",
    questions: 18,
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
    description: "The Hardworking Index measures the depth and quality of your work across five dimensions: effort, consistency, focus, resilience, and self-motivation. It goes beyond surface-level busyness to reveal whether your energy is being channelled into meaningful, sustained output.",
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
      {
        section: "Work Ethic & Effort",
        q: "When I take on a task, I commit to seeing it through even when it becomes difficult or tedious.",
        options: ["Almost never — I tend to abandon tasks when they get hard","Rarely — I sometimes push through but usually look for an easier path","Sometimes — it depends on how important the task feels to me","Often — I usually stick with it even when it gets uncomfortable","Almost always — I see every commitment through to completion"]
      },
      {
        section: "Work Ethic & Effort",
        q: "How would your closest colleagues honestly describe the quality of effort you bring to your work?",
        options: ["They'd say I do the minimum required to get by","They'd say my effort is inconsistent — great sometimes, absent other times","They'd say I'm solid but rarely go above and beyond","They'd say I consistently bring strong effort to most things","They'd say I'm one of the hardest working people they know"]
      },
      {
        section: "Work Ethic & Effort",
        q: "When I'm given a deadline, I typically...",
        options: ["Struggle to meet it and often need extensions","Meet it but only after a last-minute panic","Meet it with just enough time to spare","Meet it comfortably with time to review my work","Finish ahead of time and use the extra time to improve quality"]
      },
      {
        section: "Work Ethic & Effort",
        q: "I put in extra effort on tasks even when no one is watching or measuring my output.",
        options: ["Rarely — my effort is largely driven by external accountability","Sometimes — I try harder when I know people will notice","It varies — depends on the task and my energy levels that day","Often — I have personal standards that exist regardless of who's watching","Always — my work ethic is internal and doesn't depend on external eyes"]
      },
      {
        section: "Work Ethic & Effort",
        q: "How often do you voluntarily take on responsibilities beyond what's explicitly required of you?",
        options: ["Almost never — I focus on what's asked of me","Occasionally — only when it directly benefits me","Sometimes — when I have the bandwidth and it seems useful","Often — I regularly look for ways to contribute beyond my job description","Almost always — I proactively expand my contribution wherever I can"]
      },
      {
        section: "Consistency & Discipline",
        q: "My productivity levels across a typical workweek are...",
        options: ["Very uneven — I have one or two productive days and the rest are wasted","Somewhat uneven — I struggle to maintain output mid-week","Moderate — I'm reasonably consistent but have noticeable dips","Fairly consistent — I maintain good output across most days","Very consistent — I sustain strong performance across the full week"]
      },
      {
        section: "Consistency & Discipline",
        q: "When I set a personal goal related to my work or development, I follow through on it...",
        options: ["Rarely — I set goals but seldom act on them for long","Sometimes — I start well but usually lose momentum within weeks","About half the time — I complete some goals but not others","Most of the time — I follow through on the majority of my goals","Almost always — I have a strong track record of completing what I commit to"]
      },
      {
        section: "Consistency & Discipline",
        q: "How do you behave on days when your motivation is low or you simply don't feel like working?",
        options: ["I give myself the day off mentally and do very little","I go through the motions but produce little of real value","I manage to get some things done but far less than usual","I push through and still complete most of my key tasks","I rely on discipline over motivation and maintain my usual output"]
      },
      {
        section: "Consistency & Discipline",
        q: "I have structured routines or systems that help me stay productive day to day.",
        options: ["Strongly Disagree — I operate mostly reactively with no real structure","Disagree — I have loose intentions but few real systems in place","Neutral — I have some routines but they're fragile and easily disrupted","Agree — I have functional systems that generally keep me on track","Strongly Agree — I have well-designed routines that anchor my daily performance"]
      },
      {
        section: "Consistency & Discipline",
        q: "When an unexpected disruption breaks my workflow (illness, crisis, travel), I...",
        options: ["Take a long time to get back on track — sometimes weeks","Struggle significantly but recover eventually","Get somewhat back on track within a few days","Recover quickly and resume my rhythm within a day or two","Adapt immediately and maintain my output through the disruption"]
      },
      {
        section: "Focus & Prioritisation",
        q: "On a typical workday, how much of my time is spent on tasks that genuinely move the needle?",
        options: ["Very little — most of my day is reactive or low-value work","Less than half — I often get caught in busywork","About half — I split my time between high and low value tasks","More than half — I generally protect time for my most important work","The majority — I'm disciplined about focusing on what truly matters"]
      },
      {
        section: "Focus & Prioritisation",
        q: "I can sustain deep, uninterrupted focus on a single task for extended periods.",
        options: ["Rarely — I find it very hard to focus for more than 15–20 minutes","Sometimes — I can focus in short bursts but get distracted easily","Moderately — I can sustain focus for 30–45 minutes with effort","Often — I can enter deep focus for an hour or more regularly","Almost always — sustained deep work is a natural part of how I operate"]
      },
      {
        section: "Focus & Prioritisation",
        q: "When I have a long to-do list, I...",
        options: ["Feel overwhelmed and often don't know where to start","Tackle the easiest items first to feel a sense of progress","Work through items somewhat randomly depending on my mood","Prioritise consciously but don't always stick to the plan","Clearly identify the highest-impact tasks and attack those first"]
      },
      {
        section: "Focus & Prioritisation",
        q: "How effectively do you protect your most productive hours from interruptions and low-value demands?",
        options: ["Not at all — I'm available and reactive to everyone at all times","Poorly — I intend to protect focus time but rarely enforce it","Somewhat — I have some boundaries but they're frequently broken","Well — I generally guard my prime hours and communicate boundaries","Very well — I have clear systems to protect my deep work time consistently"]
      },
      {
        section: "Focus & Prioritisation",
        q: "I regularly review my workload to eliminate or delegate tasks that don't deserve my time.",
        options: ["Strongly Disagree — I rarely audit what I'm working on","Disagree — I hold on to tasks even when I shouldn't","Neutral — I occasionally think about this but rarely act on it","Agree — I periodically clean up my task list and offload where I can","Strongly Agree — I actively and regularly audit my commitments to protect focus"]
      },
      {
        section: "Resilience & Persistence",
        q: "When I encounter a significant obstacle in my work, my typical response is to...",
        options: ["Step back and often not return to the task with full effort","Feel discouraged for a long time before trying again","Take a break and revisit it, though momentum is often lost","Work through the frustration and find a way to keep going","Treat it as a problem to solve and come back with more energy"]
      },
      {
        section: "Resilience & Persistence",
        q: "I have pushed through exhaustion, discomfort, or boredom to complete something that mattered to me.",
        options: ["Rarely — I tend to stop when things become physically or mentally draining","Occasionally — only under extreme external pressure","Sometimes — when the stakes feel high enough","Often — I regularly push past comfort to finish what I start","Almost always — I have a strong internal drive that overrides discomfort"]
      },
      {
        section: "Resilience & Persistence",
        q: "How do you respond when a project or task takes significantly longer than expected?",
        options: ["I often abandon it or dramatically reduce the scope","I get frustrated and my quality drops noticeably","I adjust my expectations but lose some motivation","I recalibrate my timeline and keep working at a reasonable pace","I stay fully committed and adjust my approach without losing quality"]
      },
      {
        section: "Resilience & Persistence",
        q: "After receiving critical feedback or experiencing a setback at work, I typically...",
        options: ["Feel demotivated for an extended period and struggle to re-engage","Take it personally and need a lot of time to process it","Feel stung but eventually use it to adjust my approach","Process it constructively and return to work relatively quickly","Treat it as data and immediately channel it into improvement"]
      },
      {
        section: "Purpose & Self-Motivation",
        q: "I have a clear sense of why the work I do matters, which fuels my effort even on hard days.",
        options: ["Strongly Disagree — I often feel disconnected from any deeper purpose in my work","Disagree — I understand my tasks but rarely feel driven by a deeper why","Neutral — I have some sense of purpose but it doesn't consistently motivate me","Agree — I have a clear enough sense of purpose that it sustains me through difficulty","Strongly Agree — my work is deeply connected to my values and this drives consistent effort"]
      },
      {
        section: "Purpose & Self-Motivation",
        q: "My drive to work hard comes primarily from within, rather than from external rewards or pressure.",
        options: ["Strongly Disagree — I need external pressure or incentives to work hard","Disagree — I'm mostly motivated by outcomes like salary, recognition, or approval","Neutral — it's a mix of internal and external drivers, roughly equal","Agree — my motivation is mostly internal, though external factors still play a role","Strongly Agree — I am fundamentally self-driven and don't rely on external motivation"]
      },
      {
        section: "Purpose & Self-Motivation",
        q: "Looking back over the past three months, how satisfied are you with the quality and consistency of effort you brought to your work?",
        options: ["Very unsatisfied — I know I significantly underperformed relative to my potential","Unsatisfied — I had stretches of good work but too many gaps in effort","Neutral — I showed up and did the work but didn't push myself enough","Satisfied — I worked hard and consistently with only occasional dips","Very satisfied — I brought my best effort consistently and have little to regret"]
      }
    ]
  },

  // ── AMBITION ──────────────────────────────
  {
    id: "ambition",
    title: "Ambition Spectrum",
    tagline: "How high are you really aiming — and what's driving it?",
    description: "Ambition is more than wanting success — it's the quality of your goals, the clarity of your direction, and the actions you actually take toward them. The Ambition Spectrum measures your goal orientation, drive for growth, risk appetite, long-term thinking, and the psychological fuel behind your aspirations.",
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
      {
        section: "Goal Clarity",
        q: "Right now, I have a specific, concrete goal I am actively working toward — not a vague wish, but a real target with a timeline.",
        options: ["No — I have no clear goal I'm working toward","I have a vague idea of what I want but nothing defined","I have goals but they shift frequently and lack real specificity","I have a reasonably clear goal with some structure around it","Yes — I have a specific, time-bound goal I am actively pursuing"]
      },
      {
        section: "Goal Clarity",
        q: "When I set a goal for myself, how specific and measurable is it?",
        options: ["Very vague — more of a direction than a destination","Somewhat defined but I rarely track progress against it","Moderately specific — I know roughly what success looks like","Specific enough that I can tell when I'm on or off track","Very specific — I define success clearly and measure my progress regularly"]
      },
      {
        section: "Goal Clarity",
        q: "How often do you revisit and refine your goals to make sure they still reflect what you truly want?",
        options: ["Rarely — I don't have a habit of reviewing my goals","Occasionally — maybe once a year if that","Sometimes — when life forces me to reassess","Regularly — I check in on my goals every few months","Consistently — I have a deliberate review practice and update them as I grow"]
      },
      {
        section: "Goal Clarity",
        q: "If someone asked you today where you want to be in five years, you could answer...",
        options: ["Not at all — I genuinely have no idea","Very vaguely — something like 'successful' or 'happy'","With a general direction but no real specifics","With a reasonably clear picture of what I'm working toward","Confidently and in detail — I have a vivid vision I'm actively building toward"]
      },
      {
        section: "Goal Clarity",
        q: "My goals are aligned with my deepest values — not just what I think I should want.",
        options: ["Strongly Disagree — I'm chasing goals that feel externally imposed","Disagree — my goals are mostly about status or what looks good to others","Neutral — some goals feel mine, others feel inherited from expectations","Agree — my goals are mostly aligned with what genuinely matters to me","Strongly Agree — my goals are deeply personal and reflect my true values"]
      },
      {
        section: "Drive & Initiative",
        q: "When an opportunity arises that could accelerate my growth, I typically...",
        options: ["Hesitate and usually let it pass","Consider it but rarely take action","Evaluate it carefully and occasionally pursue it","Act on it quickly if it aligns with my goals","Move decisively — I seek out opportunities rather than waiting for them"]
      },
      {
        section: "Drive & Initiative",
        q: "How often do you proactively create opportunities for yourself rather than waiting for them to appear?",
        options: ["Almost never — I tend to wait for things to come to me","Rarely — I act when pushed, not by choice","Sometimes — when the timing feels right","Often — I regularly look for ways to create my own momentum","Almost always — I believe opportunities are built, not found, and I act accordingly"]
      },
      {
        section: "Drive & Initiative",
        q: "I invest time outside of work hours in activities that directly develop my skills or advance my goals.",
        options: ["Rarely — my personal time is strictly for rest and leisure","Occasionally — I do something developmental once in a while","Sometimes — I go through phases of active self-development","Often — I regularly invest personal time in growth-related activities","Almost always — self-development is a non-negotiable part of my weekly rhythm"]
      },
      {
        section: "Drive & Initiative",
        q: "When I compare where I am now to where I was two years ago, I feel...",
        options: ["Like very little has changed — I've been largely standing still","Like I've moved slightly but not meaningfully","Mixed — I've grown in some areas but stagnated in others","Satisfied — I've made real progress and I can see the growth clearly","Proud — the distance I've covered is significant and I'm building momentum"]
      },
      {
        section: "Drive & Initiative",
        q: "When things are going well and I've achieved a goal, my instinct is to...",
        options: ["Relax and stay where I am — I've earned it","Enjoy the moment for a long time before thinking about what's next","Gradually start thinking about new goals","Fairly quickly set a new, bigger target","Immediately raise the bar — achievement fuels my hunger for the next challenge"]
      },
      {
        section: "Risk & Growth",
        q: "I am willing to leave behind comfort, certainty, or security in pursuit of something I genuinely want.",
        options: ["Rarely — security is my priority and I protect it strongly","Only under significant external pressure","Sometimes — if the potential upside is large enough","Often — I regularly choose growth over comfort when it matters","Almost always — I see discomfort as the price of meaningful ambition"]
      },
      {
        section: "Risk & Growth",
        q: "How do you respond when a bold move could advance your goals but carries real risk of failure?",
        options: ["I avoid it — the fear of failure outweighs the potential gain","I think about it a lot but usually don't follow through","I take it if someone else validates or encourages me to","I weigh it carefully and take it if the reasoning is sound","I lean into it — I know that bold goals require bold moves"]
      },
      {
        section: "Risk & Growth",
        q: "I actively put myself in situations where I might fail, because I know that's where the real growth is.",
        options: ["Strongly Disagree — I avoid situations where failure is likely","Disagree — I prefer to operate in areas where I know I can succeed","Neutral — I'll stretch occasionally but don't seek it out deliberately","Agree — I regularly take on challenges that are at the edge of my current ability","Strongly Agree — I deliberately seek out environments where failure is a real possibility"]
      },
      {
        section: "Risk & Growth",
        q: "Looking at the past year, how much have you stretched beyond your existing comfort zone in pursuit of your goals?",
        options: ["Not at all — I've stayed firmly within what's familiar","Very little — one or two small stretches at most","Moderately — I've pushed myself in a few meaningful ways","Significantly — I've taken real steps that required genuine courage","Substantially — I've consistently pushed beyond comfort in multiple dimensions"]
      },
      {
        section: "Long-Term Vision",
        q: "I am willing to make short-term sacrifices today for goals that will only pay off years from now.",
        options: ["Rarely — I prioritise immediate comfort and rewards","Sometimes — only if the sacrifice is small","Moderately — I can delay gratification when I must but it's a struggle","Often — I regularly invest in long-term outcomes over short-term ease","Almost always — my decisions are shaped by where I want to be, not where I am"]
      },
      {
        section: "Long-Term Vision",
        q: "My day-to-day decisions and habits are meaningfully connected to my longer-term ambitions.",
        options: ["Strongly Disagree — my daily life is largely disconnected from any bigger vision","Disagree — I have a vision but my daily habits don't really reflect it","Neutral — there's some connection but it's inconsistent","Agree — most of my key daily choices are guided by my longer-term goals","Strongly Agree — my habits are deliberately designed to compound toward my future"]
      },
      {
        section: "Long-Term Vision",
        q: "How far ahead do you naturally think when making important decisions about your career or life?",
        options: ["Days or weeks — I focus on what's immediately in front of me","A few months — I think short-term and react to what comes up","One to two years ahead — I have a medium-term orientation","Three to five years ahead — I regularly think about where I'm heading","A decade or more — I think in long arcs and build toward a distant horizon"]
      },
      {
        section: "Long-Term Vision",
        q: "I am building something — a career, a body of work, a life — that I am genuinely proud to be constructing.",
        options: ["Strongly Disagree — I don't feel like I'm building toward anything meaningful","Disagree — I'm going through the motions without a real sense of direction","Neutral — I have some sense of building something but it's not vivid or compelling","Agree — I have a real sense that my work and choices are accumulating into something","Strongly Agree — I feel a strong sense of purpose and momentum behind what I'm creating"]
      },
      {
        section: "Inner Fuel",
        q: "My ambition is driven primarily by an internal desire to grow and create, rather than by the need for approval or status.",
        options: ["Strongly Disagree — I'm largely motivated by how others perceive me","Disagree — recognition and status are significant drivers for me","Neutral — it's genuinely a mix of internal and external motivation","Agree — I'm mostly internally driven, though external factors still play a role","Strongly Agree — my ambition comes from a deep internal source, not from external validation"]
      },
      {
        section: "Inner Fuel",
        q: "When I imagine reaching my biggest goals, the feeling that excites me most is...",
        options: ["The admiration or respect I'd receive from others","The financial or material rewards it would bring","A mix — both the external rewards and the personal satisfaction","Primarily the personal satisfaction of knowing I did it","The sense of having fully expressed my potential and contributed something meaningful"]
      },
      {
        section: "Inner Fuel",
        q: "How does fear of failure affect your ambition?",
        options: ["It stops me completely — I don't pursue goals where failure is visible","It significantly shrinks what I'm willing to aim for","It makes me cautious and I sometimes play smaller than I should","I feel it but it doesn't stop me — I act in spite of it","It rarely holds me back — I've made peace with failure as part of the process"]
      },
      {
        section: "Inner Fuel",
        q: "On reflection, how ambitious do you honestly consider yourself to be — not compared to others, but relative to your own potential?",
        options: ["Not ambitious at all — I'm content where I am and not pushing further","Mildly ambitious — I want more but I rarely act on it","Moderately ambitious — I push myself but not consistently or boldly","Quite ambitious — I regularly push toward bigger goals and take action","Highly ambitious — I am consistently working at or near the edge of my potential"]
      }
    ]
  },

  // ── LONELINESS ────────────────────────────
  {
    id: "loneliness",
    title: "Loneliness & Connection Index",
    tagline: "Are you truly connected — or just surrounded?",
    description: "Loneliness isn't simply about being alone. It's about the perceived quality of your connections, your sense of belonging, and how well your emotional needs for intimacy and understanding are being met. This assessment explores the depth of your social connections, emotional intimacy, self-relationship, and how loneliness — if present — is shaping your daily life.",
    questions: 20,
    time: "9 min",
    icon: "🫂",
    sections: [
      { name: "Social Connection", start: 0, end: 4 },
      { name: "Emotional Intimacy", start: 5, end: 8 },
      { name: "Sense of Belonging", start: 9, end: 12 },
      { name: "Relationship with Self", start: 13, end: 16 },
      { name: "Loneliness Impact", start: 17, end: 19 }
    ],
    questions_data: [
      {
        section: "Social Connection",
        q: "In my daily life, I have people I can genuinely talk to — not just exchange pleasantries with.",
        options: ["Almost never — most of my interactions are surface-level","Rarely — I have very few people I can be honest with","Sometimes — I have one or two people but access to them is limited","Often — I have a handful of people I can have real conversations with","Almost always — I have a rich network of people I can be genuinely myself with"]
      },
      {
        section: "Social Connection",
        q: "How often do you spend quality time with people who genuinely know and understand you?",
        options: ["Rarely or never","Once a month or less","A few times a month","At least once a week","Multiple times a week — connection is a regular part of my life"]
      },
      {
        section: "Social Connection",
        q: "When I reach out to connect with others, I typically feel...",
        options: ["Like a burden — I worry I'm bothering people","Uncertain — I'm not sure if people actually want to hear from me","Neutral — connection feels okay but not particularly warm or easy","Welcome — I generally feel received positively by the people in my life","Genuinely wanted — the people in my life make me feel valued and missed"]
      },
      {
        section: "Social Connection",
        q: "I have at least one person in my life I could call right now if I were in genuine distress.",
        options: ["No — I genuinely cannot think of anyone","I'm not sure — I have people but I'd hesitate to call","Maybe — there might be someone but I'm not confident they'd show up","Yes — I have one person I'm fairly confident would be there","Yes, definitely — I have multiple people I could call without hesitation"]
      },
      {
        section: "Social Connection",
        q: "How satisfied are you with the number and quality of meaningful relationships in your life right now?",
        options: ["Very unsatisfied — I feel acutely isolated","Unsatisfied — my social life feels thin and unfulfilling","Neutral — I have some connections but they don't feel like enough","Satisfied — my relationships aren't perfect but they meet my needs reasonably well","Very satisfied — I feel genuinely well-connected and my relationships nourish me"]
      },
      {
        section: "Emotional Intimacy",
        q: "There is at least one person in my life who truly knows me — including my fears, struggles, and the parts I don't share publicly.",
        options: ["No — I don't feel truly known by anyone","I'm not sure — I keep a lot hidden even from those closest to me","Partly — someone knows some of the real me but not all of it","Mostly — there's one person who understands me at a meaningful depth","Yes — I feel genuinely and deeply known by at least one person in my life"]
      },
      {
        section: "Emotional Intimacy",
        q: "When I'm going through something emotionally difficult, my instinct is to...",
        options: ["Deal with it entirely alone — sharing feels impossible or unsafe","Distract myself rather than talk to anyone about it","Talk to someone eventually but only after I've processed most of it alone","Reach out to a trusted person relatively soon after I realise I'm struggling","Seek connection quickly — I know that sharing lightens the load and I do it naturally"]
      },
      {
        section: "Emotional Intimacy",
        q: "How comfortable are you being emotionally vulnerable with the people closest to you?",
        options: ["Very uncomfortable — I keep my emotional world almost entirely private","Uncomfortable — I share occasionally but it always feels risky","Somewhat comfortable — I can be vulnerable in small doses with very safe people","Fairly comfortable — I can open up meaningfully with the right person","Very comfortable — vulnerability feels natural and I lean into it in close relationships"]
      },
      {
        section: "Emotional Intimacy",
        q: "I feel genuinely understood — not just heard, but truly seen — by the people in my life.",
        options: ["Almost never — I usually feel misunderstood or unseen","Rarely — I have moments of connection but feeling truly understood is uncommon","Sometimes — certain people get me in certain ways but not fully","Often — most of the important people in my life have a genuine sense of who I am","Almost always — I feel deeply understood by the key people in my world"]
      },
      {
        section: "Sense of Belonging",
        q: "I have a community, group, or circle where I feel I genuinely belong — not just participate.",
        options: ["No — I don't feel I belong anywhere in particular","I participate in groups but rarely feel a deep sense of belonging","I have one context where I feel somewhat at home","I have one or two communities where I feel a real sense of belonging","I have multiple contexts where I feel genuinely accepted and at home"]
      },
      {
        section: "Sense of Belonging",
        q: "When I'm with the people in my social world, I feel free to be myself rather than performing a version of who I think they want me to be.",
        options: ["Rarely — I almost always feel like I'm managing how I come across","Sometimes — I can be myself with a very small number of people","With most of them, though I still edit myself a bit","Almost always — I feel genuinely safe to be myself with the people I choose to spend time with","Always — I've built a social world where authenticity is the norm"]
      },
      {
        section: "Sense of Belonging",
        q: "How often do you feel like an outsider — even in social situations or groups you're part of?",
        options: ["Very often — feeling like an outsider is a persistent experience for me","Often — I regularly feel disconnected or different from those around me","Sometimes — I feel it in certain contexts but not others","Rarely — I occasionally feel it but it's not a pattern","Almost never — I generally feel like I belong in the spaces I inhabit"]
      },
      {
        section: "Sense of Belonging",
        q: "The people in my life would notice and genuinely care if I went quiet or withdrew for a while.",
        options: ["I don't think anyone would notice","One or two people might notice eventually","A few people would probably notice fairly quickly","Most of the people close to me would notice and reach out","My absence would be felt clearly and people would actively check in on me"]
      },
      {
        section: "Relationship with Self",
        q: "I genuinely enjoy spending time alone — not as an escape from others, but as something I value in itself.",
        options: ["No — being alone feels uncomfortable or distressing for me","I tolerate it but it rarely feels good","It's okay in small doses but I don't particularly value it","I enjoy it — solitude is something I consciously protect and appreciate","I deeply value solitude — time alone is nourishing and I seek it out intentionally"]
      },
      {
        section: "Relationship with Self",
        q: "When I am alone with my thoughts, I feel...",
        options: ["Overwhelmed or anxious — my inner world is not a comfortable place to be","Somewhat restless — I tend to seek distraction rather than sit with myself","Mixed — sometimes peaceful, sometimes uncomfortable","Generally at ease — I'm reasonably comfortable with my own company","At home — I have a rich and settled inner life and I enjoy my own presence"]
      },
      {
        section: "Relationship with Self",
        q: "I rely on other people's presence or validation to feel okay about myself.",
        options: ["Almost always — I struggle significantly when alone or not receiving validation","Often — my mood and self-worth are heavily tied to social input","Sometimes — I notice dependency but I have some internal stability too","Rarely — I have a reasonably secure sense of self that doesn't depend on others","Almost never — my sense of self is largely independent of external validation"]
      },
      {
        section: "Relationship with Self",
        q: "How would you describe your overall relationship with yourself at this point in your life?",
        options: ["Difficult and often painful — I am frequently my own harshest critic","Strained — there's a lot of self-doubt and inner conflict","Functional but not warm — I get by but don't feel deeply at peace with myself","Generally positive — I treat myself with a fair degree of kindness and acceptance","Genuinely healthy — I have a warm, honest, and compassionate relationship with myself"]
      },
      {
        section: "Loneliness Impact",
        q: "How often do you feel lonely — a sense that your need for meaningful connection is not being met?",
        options: ["Almost every day — loneliness is a constant presence in my life","Often — I feel it several times a week","Sometimes — it comes and goes, often triggered by specific situations","Rarely — it surfaces occasionally but it's not a significant issue","Almost never — I feel consistently connected and my social needs are well met"]
      },
      {
        section: "Loneliness Impact",
        q: "When loneliness arises, how does it affect your functioning, mood, or wellbeing?",
        options: ["Very significantly — it heavily impacts my energy, mood, and ability to function","Significantly — it darkens my mood and makes daily life harder","Moderately — it affects me but I manage to function through it","Mildly — I notice it but it doesn't derail me","Minimally — I can acknowledge the feeling and it passes without major disruption"]
      },
      {
        section: "Loneliness Impact",
        q: "Looking honestly at your life right now, how much does the quality of your connections reflect what you truly need and deserve?",
        options: ["Not at all — my social life is a source of real pain and unmet need","Not much — there's a significant gap between what I have and what I need","Partially — some needs are met but important ones aren't","Mostly — my connections are genuinely good even if they're not perfect","Fully — the connections I have reflect the warmth, depth, and belonging I need"]
      }
    ]
  },

  // ── LISTENING SKILLS ─────────────────────
  {
    id: "listening",
    title: "Listening Intelligence Profile",
    tagline: "Are you truly listening — or just waiting to speak?",
    description: "Listening is the most underrated communication skill. Most people hear words — very few actually listen. The Listening Intelligence Profile measures your presence, comprehension, emotional attunement, response quality, and listening under pressure across 21 questions to reveal where your listening is an asset and where it's costing you.",
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
      {
        section: "Presence & Attention",
        q: "When someone is speaking to me, I am fully present — not thinking about what I'll say next, planning my response, or mentally elsewhere.",
        options: ["Rarely — my mind wanders or I'm preparing my response most of the time","Sometimes — I catch myself drifting fairly often","About half the time — I'm present in some conversations but not others","Often — I'm genuinely present most of the time when someone is speaking","Almost always — full presence during conversation is something I actively practice and maintain"]
      },
      {
        section: "Presence & Attention",
        q: "When I'm in a conversation, my phone or other distractions compete meaningfully for my attention.",
        options: ["Almost always — I regularly check my phone or let my mind wander to other things","Often — distractions pull me away fairly regularly","Sometimes — I get distracted occasionally but can refocus","Rarely — I'm generally able to stay present despite distractions","Almost never — when I'm in a conversation, I'm in it fully and distractions don't win"]
      },
      {
        section: "Presence & Attention",
        q: "I notice non-verbal signals — tone of voice, facial expressions, body language — as naturally as I notice the words being spoken.",
        options: ["Rarely — I'm mostly focused on the content and miss non-verbal cues","Sometimes — I notice them occasionally but it's not a consistent habit","Moderately — I pick up on obvious cues but miss subtler ones","Often — I'm fairly attuned to non-verbal communication alongside the words","Almost always — non-verbal signals are a natural and integral part of how I listen"]
      },
      {
        section: "Presence & Attention",
        q: "When someone is sharing something important with me, I make them feel that they have my full attention.",
        options: ["Rarely — people often have to repeat themselves or ask if I'm listening","Sometimes — some people feel heard by me but others don't","About half the time — it depends on the conversation and my state of mind","Often — most people feel genuinely attended to when they're speaking with me","Almost always — people consistently tell me or show me that they feel heard and seen"]
      },
      {
        section: "Presence & Attention",
        q: "How often do you find yourself finishing other people's sentences or jumping in before they've completed their thought?",
        options: ["Very often — I frequently complete sentences or cut in early","Often — I do this regularly, especially when I think I know what they're going to say","Sometimes — it slips out occasionally, particularly in fast-paced conversations","Rarely — I'm generally patient and let people finish their thought","Almost never — I consistently wait until someone has fully expressed themselves before responding"]
      },
      {
        section: "Comprehension",
        q: "After a conversation, I can accurately recall the key points the other person made — not just the general topic.",
        options: ["Rarely — I often realise I've retained very little of what was said","Sometimes — I get the gist but miss a lot of the specifics","About half the time — my retention varies a lot depending on the topic","Often — I generally walk away with a good grasp of the substance of what was shared","Almost always — I have strong recall of what was said and can reflect it back accurately"]
      },
      {
        section: "Comprehension",
        q: "When something isn't clear to me during a conversation, I ask a clarifying question rather than assuming I've understood.",
        options: ["Rarely — I usually assume I've got it and move on","Sometimes — I ask only when I'm very confused","About half the time — I sometimes ask, sometimes assume","Often — I regularly check my understanding rather than guessing","Almost always — clarifying is a natural part of how I engage in conversation"]
      },
      {
        section: "Comprehension",
        q: "I listen for what is not being said — the meaning beneath the words, the hesitation, the thing someone is circling around.",
        options: ["Rarely — I take what people say at face value","Sometimes — I occasionally sense there's more but don't always explore it","Moderately — I notice subtext in conversations where I know the person well","Often — I regularly pick up on the deeper layer of what someone is communicating","Almost always — reading between the lines is a natural part of how I listen and understand people"]
      },
      {
        section: "Comprehension",
        q: "When I paraphrase or summarise what someone has said back to them, they typically confirm that I've understood them accurately.",
        options: ["Rarely — I often get told I've missed the point","Sometimes — I get it right occasionally but miss important nuance","About half the time — my summaries are partially accurate","Often — people generally confirm that I've captured what they meant","Almost always — when I reflect back what I've heard, people feel accurately and completely understood"]
      },
      {
        section: "Emotional Attunement",
        q: "When someone shares something emotionally difficult with me, my first instinct is to listen deeply before offering any advice or perspective.",
        options: ["Rarely — I tend to jump into problem-solving or advice almost immediately","Sometimes — I try to listen but advice comes out quickly","About half the time — it depends on the person and the situation","Often — I generally create space to listen before I respond with anything","Almost always — I know that emotional presence before advice is what people most need, and I practise this"]
      },
      {
        section: "Emotional Attunement",
        q: "I can sense when someone's emotional state doesn't match what they're saying — when they say they're fine but clearly aren't.",
        options: ["Rarely — I tend to take people's words at face value","Sometimes — I notice obvious discrepancies but miss subtler ones","Moderately — I pick this up in close relationships but not always with others","Often — I'm fairly attuned to emotional undercurrents in most of my conversations","Almost always — I have a strong sense for the emotional reality beneath what people express"]
      },
      {
        section: "Emotional Attunement",
        q: "People feel emotionally safe sharing difficult or vulnerable things with me.",
        options: ["Rarely — I'm often told I come across as dismissive or distracted","Sometimes — a few people feel safe with me but most don't open up deeply","About half the time — some people feel safe, others don't","Often — most people who know me feel comfortable opening up","Almost always — I've built a reputation as someone people trust with their real feelings"]
      },
      {
        section: "Emotional Attunement",
        q: "When I'm listening to someone who is upset or frustrated, I can stay calm and present rather than becoming defensive or reactive.",
        options: ["Rarely — I tend to get defensive or emotionally triggered fairly easily","Sometimes — I stay calm unless the conversation touches something personal","About half the time — my ability to stay regulated depends heavily on the topic","Often — I can generally hold space for someone else's emotions without being derailed","Almost always — I have strong emotional regulation in conversations and rarely make it about me"]
      },
      {
        section: "Response Quality",
        q: "My responses in conversation make the other person feel understood before I introduce my own perspective.",
        options: ["Rarely — I usually respond with my view before acknowledging what they've said","Sometimes — I occasionally acknowledge but quickly pivot to my point","About half the time — I do it in some conversations but not consistently","Often — I generally make people feel heard before I introduce a different angle","Almost always — acknowledgement before perspective is something I do naturally and consistently"]
      },
      {
        section: "Response Quality",
        q: "The questions I ask in conversation are thoughtful and deepen the discussion, rather than redirecting it to my own experience.",
        options: ["Rarely — my questions often steer the conversation toward my own stories or points","Sometimes — I ask good questions occasionally but often make it about me","About half the time — mixed depending on how engaged I am","Often — the questions I ask are genuinely curious and advance the other person's thinking","Almost always — people feel that my questions open things up and make them think more deeply"]
      },
      {
        section: "Response Quality",
        q: "After conversations where I've listened to someone work through a problem, they often say they feel clearer or more settled — even if I haven't given them a solution.",
        options: ["Rarely — people usually want advice from me and I tend to give it","Sometimes — occasionally people feel better after talking to me but it's not consistent","About half the time — it depends on the person and situation","Often — people regularly walk away from conversations with me feeling lighter","Almost always — I'm known as someone people feel genuinely better after talking to, regardless of outcome"]
      },
      {
        section: "Response Quality",
        q: "I resist the urge to relate everything back to my own experience when someone is sharing something personal.",
        options: ["Rarely — I find myself saying 'that happened to me too' almost reflexively","Often — I notice the urge but frequently act on it anyway","Sometimes — I do it occasionally but I'm aware of it","Rarely — I consciously hold back my own stories to keep the focus on the other person","Almost never — I'm disciplined about keeping the conversation focused on the person speaking"]
      },
      {
        section: "Listening Under Pressure",
        q: "When I strongly disagree with what someone is saying, I can continue listening openly without shutting down or planning my rebuttal.",
        options: ["Rarely — disagreement immediately triggers me to stop listening and start countering","Sometimes — I can hold it briefly but my internal rebuttal builds quickly","About half the time — I manage it in some conversations but not when the stakes are high","Often — I can generally stay open and curious even when I disagree","Almost always — I've learned to listen through disagreement before forming or sharing my response"]
      },
      {
        section: "Listening Under Pressure",
        q: "Under time pressure or in fast-moving conversations, I still listen carefully rather than rushing to respond.",
        options: ["Rarely — speed makes me much less careful as a listener","Sometimes — I try to keep up but my listening quality drops significantly","About half the time — it depends on the stakes and my state of mind","Often — I generally maintain reasonable listening quality even in faster conversations","Almost always — I've developed the ability to listen well even when the pace is quick"]
      },
      {
        section: "Listening Under Pressure",
        q: "When I receive feedback or criticism directed at me, I listen to understand it before I respond or defend myself.",
        options: ["Rarely — I become defensive almost immediately when criticised","Sometimes — I try to listen but my defensiveness usually takes over","About half the time — I manage it when the feedback feels fair","Often — I generally manage to stay open to feedback even when it stings","Almost always — I've developed the ability to receive criticism with genuine curiosity rather than defensiveness"]
      },
      {
        section: "Listening Under Pressure",
        q: "Reflecting honestly — how would the people who know you best rate you as a listener?",
        options: ["Poor — they'd say I frequently make them feel unheard or dismissed","Below average — they'd say I'm inconsistent and often distracted","Average — they'd say I'm okay but not someone they'd go to for a deep conversation","Good — they'd say I'm a genuinely attentive and caring listener","Excellent — they'd say I'm one of the best listeners they know and they feel truly heard by me"]
      }
    ]
  },

  // ── ATTACHMENT ────────────────────────────
  {
    id: "attachment",
    title: "Attachment Style Indicator",
    tagline: "How you love, connect, and pull away — and why.",
    description: "Your attachment style is the unconscious blueprint that shapes how you behave in close relationships. Developed in early life and reinforced over time, it drives how you handle intimacy, conflict, distance, and emotional need. This assessment maps your patterns across five dimensions to reveal whether you lean secure, anxious, avoidant, or a combination — and what that means for your relationships.",
    questions: 25,
    time: "12 min",
    icon: "💞",
    sections: [
      { name: "Intimacy & Closeness", start: 0, end: 4 },
      { name: "Anxiety & Fear", start: 5, end: 9 },
      { name: "Avoidance & Distance", start: 10, end: 14 },
      { name: "Conflict & Repair", start: 15, end: 19 },
      { name: "Security & Trust", start: 20, end: 24 }
    ],
    questions_data: [
      {
        section: "Intimacy & Closeness",
        q: "I find it relatively easy to let people close to me — emotionally, not just physically.",
        options: ["Strongly Disagree — letting people close feels very uncomfortable or unsafe","Disagree — I allow closeness occasionally but it requires a lot of trust to develop","Neutral — I'm somewhat open to closeness but it depends heavily on the person","Agree — I can generally open up to people I care about without too much difficulty","Strongly Agree — emotional closeness feels natural and I welcome it in my relationships"]
      },
      {
        section: "Intimacy & Closeness",
        q: "When someone I care about becomes more emotionally close or dependent on me, I typically feel...",
        options: ["Overwhelmed or suffocated — too much closeness makes me want to create distance","Somewhat uncomfortable — I value connection but too much feels like pressure","Mixed — it depends on the person and where I'm at emotionally","Generally comfortable — closeness feels good even if I sometimes need space","Warm and secure — deepening intimacy is something I welcome and enjoy"]
      },
      {
        section: "Intimacy & Closeness",
        q: "I am able to share my inner world — fears, insecurities, deep feelings — with the people I'm closest to.",
        options: ["Rarely — keeping my inner world private is something I do almost automatically","Sometimes — I share in small doses but rarely go very deep","Moderately — I can share meaningfully with people I deeply trust","Often — emotional openness comes fairly naturally with the right people","Almost always — I'm comfortable with deep self-disclosure in close relationships"]
      },
      {
        section: "Intimacy & Closeness",
        q: "I feel comfortable depending on others and letting others depend on me.",
        options: ["Rarely — dependency in either direction makes me uncomfortable","Sometimes — I can accept it in small amounts but it feels risky","Moderately — it's okay in certain relationships under the right conditions","Often — mutual dependence feels natural and healthy to me","Almost always — I embrace healthy interdependence as a natural part of close relationships"]
      },
      {
        section: "Intimacy & Closeness",
        q: "In my closest relationships, I feel genuinely loved and valued for who I am — not just what I do or provide.",
        options: ["Rarely — I often feel like I have to earn love through performance or behaviour","Sometimes — I have moments of feeling loved but they're not consistent","About half the time — some relationships feel genuinely loving, others feel conditional","Often — I generally feel loved and valued in my close relationships","Almost always — I have a deep and stable sense of being loved for who I am, not what I do"]
      },
      {
        section: "Anxiety & Fear",
        q: "I worry that the people I care about don't value me as much as I value them.",
        options: ["Almost never — I feel secure in the mutual value of my close relationships","Rarely — I occasionally wonder but it doesn't persist","Sometimes — this worry comes up but doesn't dominate","Often — this is a recurring concern in many of my close relationships","Almost always — I regularly feel like I care more than others do and it causes me real distress"]
      },
      {
        section: "Anxiety & Fear",
        q: "When someone important to me becomes distant or less available, I feel...",
        options: ["Fine — space and distance don't particularly worry me","Mildly curious but not anxious — I might check in but I don't spiral","Somewhat unsettled — I notice it and it sits with me a little","Anxious — I find myself preoccupied with what it means and whether something is wrong","Very anxious — distance from important people triggers significant worry and a strong urge to reconnect immediately"]
      },
      {
        section: "Anxiety & Fear",
        q: "I find myself replaying interactions with people I care about — wondering if I said something wrong or if they're upset with me.",
        options: ["Almost never — I don't tend to ruminate about what others think","Rarely — only when something clearly went wrong","Sometimes — occasionally, especially after more intense conversations","Often — I regularly replay conversations looking for signs that something is off","Almost always — post-conversation rumination is a significant pattern for me"]
      },
      {
        section: "Anxiety & Fear",
        q: "The fear of being rejected or abandoned by someone I love affects my behaviour in relationships.",
        options: ["Almost never — rejection fear doesn't significantly shape how I show up","Rarely — I feel it mildly but it doesn't change my behaviour much","Sometimes — it surfaces in certain situations and influences how I act","Often — fear of rejection regularly shapes how I communicate, what I say, and how much I share","Almost always — fear of abandonment is a dominant force in my close relationships"]
      },
      {
        section: "Anxiety & Fear",
        q: "In relationships, I sometimes find myself seeking reassurance or confirmation that the other person still cares — even when there's no clear reason to doubt it.",
        options: ["Almost never — I feel secure without needing regular reassurance","Rarely — occasionally but it doesn't feel like a pattern","Sometimes — I notice the need for reassurance in certain periods or situations","Often — I regularly seek reassurance from the people I'm close to","Almost always — the need for reassurance is a consistent and prominent pattern in my relationships"]
      },
      {
        section: "Avoidance & Distance",
        q: "When a relationship gets very emotionally intense or close, I notice an impulse to withdraw or create distance.",
        options: ["Almost never — emotional intensity doesn't trigger a pull to withdraw","Rarely — I might need brief space but it's not a pattern","Sometimes — this happens in certain relationships or periods","Often — emotional intensity fairly regularly activates a desire to pull back","Almost always — withdrawal is my default response when closeness becomes too intense"]
      },
      {
        section: "Avoidance & Distance",
        q: "I am more comfortable in relationships that maintain a degree of emotional distance than in deeply enmeshed, intense ones.",
        options: ["Strongly Disagree — I want and thrive in deeply close, emotionally rich relationships","Disagree — I prefer closeness even if some distance is inevitable","Neutral — I'm comfortable with varying levels of intensity","Agree — I generally feel more at ease when relationships maintain some emotional space","Strongly Agree — depth and intensity in relationships makes me uncomfortable and I function better with distance"]
      },
      {
        section: "Avoidance & Distance",
        q: "When I'm struggling emotionally, I prefer to deal with it alone rather than turning to someone close to me.",
        options: ["Strongly Disagree — reaching out when I struggle is something I do naturally","Disagree — I prefer connection but can manage alone","Neutral — it depends on what I'm dealing with","Agree — I tend to handle difficult emotions privately rather than bringing them to others","Strongly Agree — dealing with emotional difficulty alone is my strong default — sharing feels uncomfortable or unnecessary"]
      },
      {
        section: "Avoidance & Distance",
        q: "I value my independence and self-sufficiency so highly that I sometimes keep relationships at arm's length to protect them.",
        options: ["Strongly Disagree — independence doesn't get in the way of my close relationships","Disagree — I value independence but not at the cost of closeness","Neutral — there's some tension between the two but I manage it","Agree — my strong need for independence does sometimes limit how close I allow relationships to get","Strongly Agree — self-sufficiency is a core identity and relationships that demand too much of my autonomy feel threatening"]
      },
      {
        section: "Avoidance & Distance",
        q: "I find it difficult to articulate or express what I need emotionally in a relationship.",
        options: ["Almost never — I'm comfortable identifying and expressing my emotional needs","Rarely — I can do it, though it sometimes takes effort","Sometimes — it depends on the relationship and the depth of the need","Often — expressing emotional needs feels hard and I often don't do it","Almost always — identifying and voicing emotional needs is a consistent challenge for me"]
      },
      {
        section: "Conflict & Repair",
        q: "When there's tension or conflict in a close relationship, I move toward the other person to resolve it rather than away from them.",
        options: ["Rarely — conflict makes me pull back or go cold","Sometimes — I can approach but only once I've had a long time to process","About half the time — I approach in some conflicts but avoid in others","Often — I generally lean toward resolution even when it's uncomfortable","Almost always — I believe in facing conflict directly and I move toward it in close relationships"]
      },
      {
        section: "Conflict & Repair",
        q: "After a conflict with someone I care about, I am able to repair the relationship without prolonged withdrawal, punishment, or resentment.",
        options: ["Rarely — I tend to shut down, go cold, or hold onto hurt for a long time","Sometimes — I can repair but it takes me a very long time to open back up","About half the time — some conflicts I repair well, others I struggle with","Often — I'm generally able to re-engage and repair without excessive delay","Almost always — I prioritise repair and can move back toward closeness relatively quickly after conflict"]
      },
      {
        section: "Conflict & Repair",
        q: "I can express hurt, disappointment, or anger to someone I care about without either exploding or completely shutting down.",
        options: ["Rarely — conflict emotions either come out explosively or I go completely quiet","Sometimes — I manage it occasionally but often go to one extreme or the other","About half the time — my regulation in conflict varies a lot","Often — I can generally express difficult emotions in a measured way","Almost always — I have good emotional regulation in conflict and can express my feelings clearly without losing control"]
      },
      {
        section: "Conflict & Repair",
        q: "When I've hurt someone I care about, I find it relatively easy to offer a genuine, non-defensive apology.",
        options: ["Rarely — apologising feels threatening or shameful and I struggle to do it genuinely","Sometimes — I can apologise but it's often qualified or partially defensive","About half the time — I can do it when the hurt is clear but struggle in ambiguous situations","Often — I can generally take responsibility and apologise sincerely","Almost always — genuine apology comes naturally and I don't need to defend myself in order to acknowledge impact"]
      },
      {
        section: "Conflict & Repair",
        q: "I believe that conflict in close relationships can be resolved without permanently damaging the connection.",
        options: ["Strongly Disagree — conflict feels very threatening to me and I worry it will end things","Disagree — I believe conflict leaves lasting damage even when it's repaired","Neutral — I believe it sometimes, but conflict still feels risky","Agree — I generally believe conflict can be worked through without lasting harm","Strongly Agree — I see conflict as a normal and even strengthening part of close relationships when handled well"]
      },
      {
        section: "Security & Trust",
        q: "I trust that the people I love will be there for me when I genuinely need them.",
        options: ["Rarely — I have a deep belief that people will ultimately let me down","Sometimes — I hope they will but I'm not fully confident","About half the time — I trust some people but not most","Often — I generally believe in the reliability of the people I'm close to","Almost always — I have a stable trust that the people I love will show up when it truly matters"]
      },
      {
        section: "Security & Trust",
        q: "I feel secure in my closest relationships — I don't constantly worry about losing them or them changing.",
        options: ["Rarely — insecurity about my most important relationships is a persistent feeling","Sometimes — I feel secure in good periods but anxiety returns when things feel off","About half the time — it varies quite a bit depending on external signals","Often — I generally feel stable and secure in my close relationships","Almost always — I carry a deep and settled sense of security in the people I love most"]
      },
      {
        section: "Security & Trust",
        q: "My past experiences of hurt or betrayal in relationships significantly affect how I show up in new ones.",
        options: ["Almost always — past pain shapes nearly everything about how I approach new relationships","Often — it takes me a long time to trust and past wounds are present a lot","Sometimes — I carry some patterns but I'm able to give new relationships a fair chance","Rarely — I've mostly worked through past hurts and they don't dominate my present relationships","Almost never — I'm able to approach new relationships without significant baggage from the past"]
      },
      {
        section: "Security & Trust",
        q: "I have a stable and positive sense of my own worthiness of love — I don't feel I need to earn it.",
        options: ["Rarely — I deeply struggle with feeling inherently worthy of love","Sometimes — I have good days but often doubt whether I'm truly lovable","About half the time — I'm working on it but it's inconsistent","Often — I generally feel worthy of love even when relationships are hard","Almost always — I have a solid and stable belief that I am worthy of love simply as I am"]
      },
      {
        section: "Security & Trust",
        q: "Overall, how would you describe your experience of close relationships throughout your life?",
        options: ["Mostly painful — relationships have been a consistent source of hurt, loss, or disappointment","Difficult — I've had meaningful connections but they've often been complicated or short-lived","Mixed — a balance of nourishing and difficult, with no strong pattern either way","Mostly positive — I've experienced real love and connection, with the usual difficulties","Deeply nourishing — close relationships have been a consistent source of security, joy, and growth in my life"]
      }
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
    const sectionDefs = [
      {
        name: "Over-Functioning",
        range: [0, 4],
        descriptions: {
          high: "You are heavily over-functioning. You take on responsibilities that aren't yours, often to the detriment of your own health and strategic focus.",
          mid: "You have a tendency to step in too quickly. You are helpful, but you frequently cross the line into doing others' work for them.",
          low: "You have a healthy sense of responsibility. You understand where your job ends and another person's begins."
        },
        watchHigh: ["Practice 'the 5-second pause' before saying yes to a new request", "Identify one task this week that you will intentionally let fail if the owner doesn't step up"],
        watchMid: ["Ask yourself: 'Is my help empowering this person or making them dependent on me?'", "Set a hard stop time for work 2 days a week"],
        watchLow: ["Ensure your 'no' is paired with a clear explanation so you aren't seen as unhelpful", "Keep monitoring your capacity as you take on more senior roles"]
      },
      {
        name: "Delegation Barriers",
        range: [5, 9],
        descriptions: {
          high: "You have significant barriers to delegation. You likely view it as 'more work' or a risk to quality, which keeps you trapped in low-leverage tasks.",
          mid: "You delegate occasionally, but often only the tasks you find boring. You struggle to delegate complex or high-stakes work.",
          low: "You are a leverage-minded delegator. You trust your team and understand that your value is in coaching, not just doing."
        },
        watchHigh: ["Delegate a task that 'only you can do' to a team member this week as a training exercise", "Accept that 80% quality from someone else is often better than 100% quality at the cost of your burnout"],
        watchMid: ["Stop 'fixing' work. Provide feedback and let the owner redo the task themselves", "Create a basic SOP for your most repetitive task"],
        watchLow: ["Don't delegate and disappear; ensure you have a light-touch check-in system", "Look for more 'stretch assignments' to give your high-performers"]
      },
      {
        name: "Impact vs Effort",
        range: [10, 14],
        descriptions: {
          high: "Your effort-to-impact ratio is skewed. You are working extremely hard, but much of that energy is leaking into low-value activity.",
          mid: "You are productive, but you often confuse 'busyness' with 'progress'. You have moments of high leverage followed by stretches of reactive work.",
          low: "You are a high-leverage operator. You prioritize ruthlessly and ensure your energy is spent on the 20% of work that drives 80% of results."
        },
        watchHigh: ["Audit your calendar: color-code 'deep strategic work' vs 'reactive fire-fighting'", "Stop attending meetings where you are not a primary decision-maker"],
        watchMid: ["Spend the first 15 minutes of every day defining your 'One Big Win' for the day", "Review your project list and delete the bottom 10%"],
        watchLow: ["Be careful of 'success guilt'—just because you've become efficient doesn't mean you aren't working hard enough", "Teach your prioritization system to your direct reports"]
      },
      {
        name: "Boundaries & Recovery",
        range: [15, 19],
        descriptions: {
          high: "Your boundaries are nearly non-existent. You are 'always on', which is creating a high risk of chronic burnout and resentment.",
          mid: "You have loose boundaries. You try to disconnect, but you frequently let work bleed into your personal time out of a sense of obligation.",
          low: "You have robust professional boundaries. You understand that your long-term output depends on your ability to fully recharge."
        },
        watchHigh: ["Delete work messaging apps from your phone for the weekend", "Practice saying 'I can help with that, but not until Tuesday'"],
        watchMid: ["Create a physical 'shutdown ritual' to signal to your brain that work is over", "Stop responding to non-emergency emails after 7 PM"],
        watchLow: ["Communicate your boundary philosophy to your team so they feel safe doing the same", "Watch for 'boundary creep' during high-stress seasons"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    
    // For Martyr, high score = BAD. We flip the colors.
    let overallLabel, overallColor, overallDescription;
    if (overall >= 65) {
      overallLabel = "High Martyr Pattern";
      overallColor = "#ef4444";
      overallDescription = "You are currently stuck in a martyr cycle. You are over-investing in effort while under-investing in leverage. This pattern is unsustainable and is likely preventing you from reaching the next level of leadership because you are too busy doing the work to lead it.";
    } else if (overall >= 35) {
      overallLabel = "Moderate Martyr Tendencies";
      overallColor = "#f59e0b";
      overallDescription = "You have solid output, but you frequently fall into the trap of 'suffering productively.' You take on too much and delegate too little, leading to uneven results and occasional exhaustion.";
    } else {
      overallLabel = "High-Leverage Operator";
      overallColor = "#10b981";
      overallDescription = "You have successfully decoupled your effort from your impact. You work with a high degree of leverage, protect your boundaries, and ensure your energy is focused where it creates the most systemic value.";
    }

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      // Reverse colors for Martyr Index (Low is green, High is red)
      const color = score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#10b981";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
  },

  // ── SIGNAL VS NOISE (DETAILED) ───────────
  signal: (answers) => {
    const sectionDefs = [
      {
        name: "Information Diet",
        range: [0, 4],
        descriptions: {
          high: "You consume high-quality, intentional information. You prioritize depth over breadth and avoid the trap of mindless digital consumption.",
          mid: "Your information diet is mixed. You have good sources, but you still spend significant time in 'low-signal' environments like social feeds.",
          low: "Your information diet is high in 'noise.' You are consuming fragmented, reactive content that likely leaves you feeling scattered."
        },
        watchHigh: ["Don't let your 'depth' become an echo chamber; seek out one high-quality dissenting view weekly", "Try teaching what you learn to solidify the signal"],
        watchMid: ["Unsubscribe from 5 newsletters today that you haven't read in a month", "Set a 20-minute timer for news/social consumption"],
        watchLow: ["Switch from 'feeds' to 'folders'—save articles to read later instead of scrolling live", "Commit to one long-form book per month"]
      },
      {
        name: "Focus Environment",
        range: [5, 9],
        descriptions: {
          high: "You have built a fortress of focus. You protect your concentration as a professional asset and understand how to enter flow states.",
          mid: "You can focus when conditions are perfect, but your concentration is easily broken by pings, people, or your own internal restlessness.",
          low: "Your environment is working against you. You are operating in a state of continuous partial attention, which prevents deep mastery."
        },
        watchHigh: ["Be careful not to become 'unreachable' to the point of causing friction for your team", "Schedule your most creative work for your peak biological energy hours"],
        watchMid: ["Use a physical signal (like headphones) to tell others you are in deep work", "Close all browser tabs that aren't related to your current task"],
        watchLow: ["Download a focus app to lock your distracting sites for 60 minutes", "Physically move your phone to a different room during deep work"]
      },
      {
        name: "Digital Hygiene",
        range: [10, 14],
        descriptions: {
          high: "You have exceptional control over your tools. You use technology to serve your goals rather than letting your tools dictate your attention.",
          mid: "You have some systems in place, but your tools still pull you into reactive loops more often than you'd like.",
          low: "You are being managed by your notifications. Your digital habits are likely causing constant dopamine spikes followed by mental fatigue."
        },
        watchHigh: ["Audit your 'Auto-check' habits—are you checking email just because you're bored?", "Refine your 'Do Not Disturb' settings for specific high-priority people"],
        watchMid: ["Turn off all 'badge' icons (the red dots) on your apps", "Establish a 'no-screens' hour before bed"],
        watchLow: ["Turn off 100% of non-human notifications today", "Move all social apps off your home screen into a folder on the second page"]
      },
      {
        name: "Strategic Filter",
        range: [15, 19],
        descriptions: {
          high: "You have a powerful strategic filter. You can quickly discard noise and zero in on what truly moves the needle for your life and career.",
          mid: "You know what's important, but you often get distracted by 'urgent noise.' You struggle to say no to requests that sound interesting but aren't vital.",
          low: "You are struggling to find the signal in your day. You feel overwhelmed by tasks and likely feel that everything is 'high priority.'"
        },
        watchHigh: ["Periodically challenge your own filters—are you missing new 'weak signals' that could be important?", "Help your team develop their own filters by being clear about what NOT to work on"],
        watchMid: ["Use the Eisenhower Matrix to categorize your to-do list for tomorrow", "Practice saying 'That sounds interesting, but it's not a priority for me right now'"],
        watchLow: ["Spend 10 minutes every morning identifying the *one* task that makes everything else easier", "Stop attending meetings that don't have a clear agenda"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    
    let overallLabel, overallColor, overallDescription;
    if (overall >= 75) {
      overallLabel = "High-Signal Thinker";
      overallColor = "#10b981";
      overallDescription = "You possess the superpower of the 21st century: the ability to protect your attention. You filter noise ruthlessly and invest your mental energy into high-leverage information and deep work. This allows you to see patterns that others miss.";
    } else if (overall >= 45) {
      overallLabel = "Noise-Sensitive Operator";
      overallColor = "#f59e0b";
      overallDescription = "You are aware of the noise, but you haven't yet built the systems to fully escape it. You are productive, but you are likely leaving 30-40% of your mental capacity on the table due to fragmentation and reactive consumption.";
    } else {
      overallLabel = "Information Overloaded";
      overallColor = "#ef4444";
      overallDescription = "You are currently drowning in noise. Your attention is being sold to the highest bidder by your apps and notifications. This is likely leading to high stress, low creativity, and a feeling of 'running in place.'";
    }

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
  },

  // ── LEADERSHIP ARCHETYPE (DETAILED) ────────
  leadership: (answers) => {
    const sectionDefs = [
      {
        name: "Vision & Strategy",
        range: [0, 4],
        descriptions: {
          high: "You are a natural 'Visionary.' You lead by painting a compelling future and enrolling others in the 'Why'.",
          mid: "You understand the big picture, but you often get pulled back into the 'How' before the vision is fully articulated.",
          low: "You are more focused on the present than the future. You may struggle to inspire others during times of major change."
        },
        watchHigh: ["Pair yourself with a strong 'Executor' who can handle the details you might overlook", "Ensure your vision is translated into concrete quarterly goals"],
        watchMid: ["Practice your 'elevator pitch' for the company's 3-year goal", "Spend one hour a week just 'thinking'—no meetings, no emails"],
        watchLow: ["Ask 'What if?' more often in meetings", "Read more about industry trends outside your direct silo"]
      },
      {
        name: "Execution & Pace",
        range: [5, 9],
        descriptions: {
          high: "You are a 'Driver.' You lead through action, speed, and high standards. You get projects across the finish line.",
          mid: "You are reliable and productive, but your pace can fluctuate. You sometimes prioritize 'getting it done' over 'getting it right.'",
          low: "You may struggle with momentum. Your leadership can sometimes stall during the final 10% of a project."
        },
        watchHigh: ["Watch for burnout in your team—not everyone can maintain your 'sprint' pace forever", "Celebrate wins before rushing into the next project"],
        watchMid: ["Use a project management tool to track micro-milestones", "Identify your biggest 'blocker' every morning and move it first"],
        watchLow: ["Focus on 'closing loops'—don't leave tasks 90% finished", "Set shorter, more aggressive deadlines for small tasks"]
      },
      {
        name: "People & Coaching",
        range: [10, 14],
        descriptions: {
          high: "You are a 'Coach.' You lead by developing others. You see people as your primary asset and invest deeply in their growth.",
          mid: "You are a good teammate and listener, but you may avoid the 'hard' coaching conversations that lead to real growth.",
          low: "You lead through tasks rather than people. You may see team development as a distraction from the 'real work.'"
        },
        watchHigh: ["Ensure your empathy doesn't prevent you from holding people accountable to high standards", "Make sure you are also developing your *own* skills, not just others'"],
        watchMid: ["Practice 'Radical Candor'—give direct feedback paired with personal care", "Ask more 'What' and 'How' questions instead of giving answers"],
        watchLow: ["Start doing weekly 1-on-1s if you aren't already", "Ask your team: 'What is one thing I could do to better support your growth?'"]
      },
      {
        name: "Systems & Stability",
        range: [15, 19],
        descriptions: {
          high: "You are a 'Stabilizer.' You lead by creating order, process, and scalability. You ensure the machine runs smoothly.",
          mid: "You appreciate process, but your systems are often informal or 'in your head,' making them hard for others to follow.",
          low: "You lead through chaos. You may find process 'stifling,' which leads to repeated mistakes and 'hero-culture' fixes."
        },
        watchHigh: ["Don't let process become 'red tape' that slows down innovation", "Be willing to 'break the system' when a rapid pivot is required"],
        watchMid: ["Document your most important workflow this week", "Look for one repetitive task you can automate or eliminate"],
        watchLow: ["Recognize that 'boring' processes are what allow for 'exciting' growth", "Start using a centralized knowledge base for team protocols"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const primaryIdx = sectionScores.indexOf(Math.max(...sectionScores));
    const archetypes = ["The Visionary", "The Driver", "The Coach", "The Stabilizer"];

    const overallLabel = archetypes[primaryIdx];
    const overallColor = "#6366f1";
    const overallDescription = `Your dominant leadership archetype is ${overallLabel}. You lead primarily through the lens of ${sectionDefs[primaryIdx].name.toLowerCase()}. While this is a major strength, the highest-performing leaders are 'versatile'—they can flex into the other three dimensions when the situation demands it.`;

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#6366f1" : score >= 40 ? "#a855f7" : "#94a3b8";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
  },

  // ── EMOTIONAL INTELLIGENCE (DETAILED) ────
  ei: (answers) => {
    const sectionDefs = [
      {
        name: "Self-Awareness",
        range: [0, 4],
        descriptions: {
          high: "You have a clear, real-time mirror on your internal state. You understand your emotions, your triggers, and your impact on others.",
          mid: "You are aware of your emotions after the fact, but you sometimes struggle to recognize them as they are happening.",
          low: "You often feel 'blindsided' by your own emotions or reactions. You may struggle to explain why you feel the way you do."
        },
        watchHigh: ["Don't let self-awareness turn into over-thinking; use the data to act, not just reflect", "Help others build awareness by modeling vulnerability"],
        watchMid: ["Practice 'Labeling'—when you feel a spike of emotion, name it: 'I am feeling defensive right now'", "Ask a trusted peer for 'blind spot' feedback"],
        watchLow: ["Start a 2-minute daily journaling habit focusing only on your mood", "Pay attention to physical signals: tight chest, clenched jaw—these are emotional data points"]
      },
      {
        name: "Self-Regulation",
        range: [5, 9],
        descriptions: {
          high: "You have a powerful 'pause' button. You can manage your impulses and choose your response even in high-stakes or heated moments.",
          mid: "You are generally composed, but you 'leak' stress or frustration in high-pressure situations. You may regret your words occasionally.",
          low: "Your emotions often drive the car. You are prone to reactive outbursts or impulsive decisions when stressed."
        },
        watchHigh: ["Make sure you aren't just 'suppressing' emotions—regulation is about processing, not hiding", "Practice 'Cognitive Reappraisal'—find the hidden opportunity in a setback"],
        watchMid: ["Wait 10 minutes before sending that 'sharp' email", "Practice box-breathing (4s in, 4s hold, 4s out, 4s hold) during tense meetings"],
        watchLow: ["Count to 10 before responding to a criticism", "Identify your 'exit'—when you feel too triggered to think, ask for a 5-minute break"]
      },
      {
        name: "Empathy & Attunement",
        range: [10, 14],
        descriptions: {
          high: "You are highly attuned to the 'unspoken' room. You read emotions in others effortlessly and respond with genuine care.",
          mid: "You are empathetic to people you like or agree with, but you may struggle to find empathy for those with different styles or perspectives.",
          low: "You often miss social cues. You may be perceived as 'clinical' or 'detached' because you focus on tasks over the human experience."
        },
        watchHigh: ["Watch for 'empathy fatigue'—protect your own energy while supporting others", "Ensure you don't use your 'reading' of people to manipulate situations"],
        watchMid: ["Ask 'How does this feel for you?' during project updates", "Practice active listening: repeat back what you heard before you respond"],
        watchLow: ["Practice 'Perspective Taking'—literally write down the 3 things your 'opponent' might be feeling", "Notice body language: are people leaning in or crossing their arms?"]
      },
      {
        name: "Social Skills & Influence",
        range: [15, 19],
        descriptions: {
          high: "You are a master of relational dynamics. You navigate conflict, build rapport, and influence others through connection rather than command.",
          mid: "You are good at networking, but you may struggle with 'difficult' social tasks like conflict resolution or delivering hard feedback.",
          low: "You may struggle to enroll others in your ideas. You likely rely on 'logic' or 'authority' and feel frustrated when people don't just follow."
        },
        watchHigh: ["Be careful of becoming the 'professional mediator'—ensure you aren't solving everyone's problems for them", "Use your influence to amplify quieter voices in the room"],
        watchMid: ["Identify one 'difficult' conversation you've been avoiding and have it this week", "Focus on building rapport with one person outside your direct department"],
        watchLow: ["Study basic negotiation tactics—focus on 'interests' instead of 'positions'", "Practice 'acknowledgment'—tell someone specifically what you value about their work once a day"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    
    let overallLabel, overallColor, overallDescription;
    if (overall >= 75) {
      overallLabel = "High-EQ Leader";
      overallColor = "#10b981";
      overallDescription = "Your emotional intelligence is a top-tier asset. You navigate the 'human' side of work with a sophistication that allows you to lead through trust and influence. This is the ultimate multiplier for your technical skills.";
    } else if (overall >= 45) {
      overallLabel = "Emotionally Intelligent (Developing)";
      overallColor = "#f59e0b";
      overallDescription = "You have a solid foundation, but your EQ can be 'situational.' You are likely great when things are calm, but you lose your emotional edge when the pressure is high. Focused practice on regulation and empathy will unlock your next level.";
    } else {
      overallLabel = "EQ Growth Opportunity";
      overallColor = "#ef4444";
      overallDescription = "Your EQ profile suggests you are operating with a 'technical-only' lens. While your skills may be high, your ability to navigate people and your own stress is likely limiting your impact. The good news: EQ is a skill that can be built through intentional practice.";
    }

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
  },

  // ── GROWTH MINDSET (DETAILED) ────────────
  growth: (answers) => {
    const sectionDefs = [
      {
        name: "Challenge Receptivity",
        range: [0, 4],
        descriptions: {
          high: "You run toward the unknown. You see difficult, new tasks as the primary vehicle for your development.",
          mid: "You take on challenges when you feel safe, but you tend to stick to 'known territory' when the stakes are high.",
          low: "You avoid challenges. You likely view difficulty as a threat to your perceived competence and prefer tasks you've already mastered."
        },
        watchHigh: ["Ensure you aren't taking on *too many* challenges at once—growth requires focus, not just bravery", "Help your team embrace challenges by lowering the 'cost of failure'"],
        watchMid: ["Choose one task this week that you have *no idea* how to do and commit to it", "Reframe 'This is hard' as 'This is new'"],
        watchLow: ["Start with 'micro-challenges'—tiny new tasks that only take 10 minutes", "Acknowledge that staying in your comfort zone is actually a long-term risk to your career"]
      },
      {
        name: "Response to Failure",
        range: [5, 9],
        descriptions: {
          high: "You treat failure as 'data.' You bounce back quickly and focus entirely on the lessons learned rather than the ego-bruise.",
          mid: "You recover eventually, but you spend a significant amount of time in self-criticism or 'blame' mode after a setback.",
          low: "Failure feels final to you. You likely ruminate on mistakes and avoid those areas of work in the future to prevent feeling that way again."
        },
        watchHigh: ["Don't become 'numb' to failure—ensure you are actually extracting the lesson, not just moving on", "Share your 'Failure Resume' with your team to build a growth culture"],
        watchMid: ["Practice the 'Not Yet' reframe: 'I didn't succeed *yet*'", "Set a 15-minute timer for 'venting' after a failure, then pivot immediately to 'solutions'"],
        watchLow: ["Look at a past failure from 2 years ago—what did it actually teach you that made you better?", "Separate your identity from your results—you are not your mistake"]
      },
      {
        name: "Belief in Effort",
        range: [10, 14],
        descriptions: {
          high: "You believe effort is the path to mastery. You understand that even 'natural' talent requires massive practice to become an asset.",
          mid: "You believe in effort for others, but you often think *you* should be naturally good at things. If you struggle, you think you 'lack the gift.'",
          low: "You believe intelligence and talent are fixed. You think people are either 'born with it' or they aren't, which limits how much you try."
        },
        watchHigh: ["Don't mistake 'effort' for 'brute force'—ensure you are working hard *on the right things*", "Focus on 'Deliberate Practice'—targeting the specific part of a skill you are worst at"],
        watchMid: ["Identify one skill you used to be bad at but are now good at—remind yourself of that process", "Value the 'work' as much as the 'win'"],
        watchLow: ["Read about 'Neuroplasticity'—your brain literally changes shape as you learn", "Stop saying 'I'm not a [Math/Writing/Tech] person'"]
      },
      {
        name: "Feedback Orientation",
        range: [15, 19],
        descriptions: {
          high: "You are a feedback-seeker. You view criticism as the most efficient way to close your performance gaps.",
          mid: "You accept feedback when it's delivered gently, but you become defensive when it's direct or unasked for.",
          low: "You view feedback as an attack. You likely ignore or argue against criticism and feel that people 'just don't get it.'"
        },
        watchHigh: ["Be careful of 'Feedback Overload'—you don't have to act on every single piece of advice you receive", "Seek out 'extreme' feedback from people who will be brutally honest"],
        watchMid: ["Ask for 'advice' instead of 'feedback'—it feels less like a judgment and more like a collaboration", "Take a breath and count to 5 before responding to a critique"],
        watchLow: ["Ask one person today: 'What is one thing I could do 10% better?'", "Recognize that people who give you hard feedback are usually the ones who care most about your success"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    
    let overallLabel, overallColor, overallDescription;
    if (overall >= 75) {
      overallLabel = "Growth Mindset Dominant";
      overallColor = "#10b981";
      overallDescription = "You have a powerful psychological engine. You view your entire life and career as an experiment in progress. This makes you incredibly resilient and ensures that your potential is constantly expanding.";
    } else if (overall >= 45) {
      overallLabel = "Mixed Mindset (Context-Dependent)";
      overallColor = "#f59e0b";
      overallDescription = "You have growth patterns, but they are fragile. You lean into growth when you feel confident, but you revert to 'fixed' thinking (avoiding challenge, fearing failure) when you feel insecure or exposed.";
    } else {
      overallLabel = "Fixed Mindset Tendencies";
      overallColor = "#ef4444";
      overallDescription = "You are currently operating with a 'fixed' lens. You likely feel that you are being judged on your innate abilities, which makes everything feel high-stakes and scary. This mindset is the primary bottleneck on your career growth.";
    }

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
  },
  hardworking: (answers) => {
    const sectionDefs = [
      {
        name: "Work Ethic & Effort",
        range: [0, 4],
        descriptions: {
          high: "Your work ethic is a genuine asset. You bring consistent, high-quality effort to your commitments and hold yourself to internal standards regardless of external accountability.",
          mid: "You have solid work ethic foundations but your effort can be inconsistent. There are moments of strong output, but they're not yet dependable across all contexts.",
          low: "Your effort levels are largely reactive and externally driven. Building intrinsic work standards will be the key shift that unlocks your next level of performance."
        },
        watchHigh: ["Watch for over-investing in low-leverage tasks — effort without direction is still waste", "Ensure your high standards don't create unrealistic expectations of others"],
        watchMid: ["Identify what conditions bring out your best effort and engineer more of them", "Build one non-negotiable daily work standard to anchor consistency"],
        watchLow: ["Start with one commitment per day that you see through regardless of difficulty", "Examine what's driving the gap between your intentions and your follow-through"]
      },
      {
        name: "Consistency & Discipline",
        range: [5, 9],
        descriptions: {
          high: "Your discipline is a competitive advantage. You show up with reliable output regardless of motivation levels, and your routines create a stable foundation for sustained performance.",
          mid: "You're capable of consistency but haven't yet built the systems to make it automatic. Your output peaks and dips with your mood and circumstances.",
          low: "Consistency is your biggest growth opportunity. Without reliable systems, your performance is unpredictable — which limits both your output and how others perceive you."
        },
        watchHigh: ["Audit your routines occasionally — discipline can calcify into rigidity", "Make space for rest; sustained output requires intentional recovery"],
        watchMid: ["Choose one keystone habit and protect it for 30 days — consistency compounds", "Track your productive and unproductive days to identify patterns"],
        watchLow: ["Focus on showing up, not performing — consistency starts before quality", "Remove friction from the start of your workday to lower the barrier to beginning"]
      },
      {
        name: "Focus & Prioritisation",
        range: [10, 14],
        descriptions: {
          high: "You have strong focus discipline. You consistently direct your energy toward high-value work and protect your most productive hours from noise and distraction.",
          mid: "You understand the importance of prioritisation but execution is mixed. You spend too much time on work that feels productive but doesn't move the needle.",
          low: "Your attention is fragmented across too many inputs. Without a stronger focus architecture, even high effort will produce mediocre results."
        },
        watchHigh: ["Don't mistake depth for avoidance — ensure you're also responsive when it matters", "Review your priorities regularly; deep focus on the wrong thing is still a cost"],
        watchMid: ["Implement a 'top 3 tasks' rule each morning before opening any inbox or app", "Block one 90-minute deep work session daily and treat it as non-negotiable"],
        watchLow: ["Start by turning off all non-essential notifications for your first hour of work", "Ask yourself daily: 'What one thing, if done today, would make everything else easier?'"]
      },
      {
        name: "Resilience & Persistence",
        range: [15, 18],
        descriptions: {
          high: "You have exceptional persistence. Setbacks and obstacles don't derail you — they redirect you. Your ability to stay in motion through difficulty is a rare and powerful trait.",
          mid: "You have resilience in moderate doses. You recover from setbacks but the process is slow and your momentum often suffers. Strengthening your rebound speed will unlock more.",
          low: "Obstacles significantly disrupt your work output and motivation. Building a stronger relationship with difficulty is essential for sustained performance at any level."
        },
        watchHigh: ["Persistence without reflection can become stubbornness — know when to pivot", "Ensure you're recovering, not just enduring — resilience needs replenishment"],
        watchMid: ["Develop a personal protocol for setbacks: a specific ritual for how you re-engage", "Practice separating emotional reaction from professional response in the moment"],
        watchLow: ["Reframe obstacles as expected features of meaningful work, not exceptions", "Build a track record of small comebacks — resilience is built through repetition"]
      },
      {
        name: "Purpose & Self-Motivation",
        range: [19, 21],
        descriptions: {
          high: "Your work is anchored in genuine internal motivation. You don't need external pressure to bring effort — your why fuels your how, and this creates sustainable high performance.",
          mid: "You have some internal motivation but it's not yet consistent enough to carry you through hard stretches. Your drive is partly borrowed from external sources.",
          low: "Your motivation is largely externally dependent. Without a clearer sense of personal purpose, your effort will remain reactive and vulnerable to fluctuation."
        },
        watchHigh: ["Ensure your internal drive accounts for rest — intrinsic motivation can mask burnout", "Revisit your purpose regularly; what drives you can shift as your life evolves"],
        watchMid: ["Spend 20 minutes writing why this work matters to you beyond salary and status", "Connect daily tasks to a longer-term vision to fuel short-term discipline"],
        watchLow: ["Explore what work has felt most meaningful in your life and look for the pattern", "External rewards are a starting point, not a destination — invest in finding your intrinsic why"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const maxScore = sectionAnswers.length * 4;
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / maxScore) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);

    let overallLabel, overallColor, overallDescription;
    if (overall >= 75) {
      overallLabel = "High-Output Operator";
      overallColor = "#10b981";
      overallDescription = "You demonstrate strong, consistent hardworking behaviours across all five dimensions. Your effort is deliberate, disciplined, and internally driven. You're not just busy — you're productive in ways that compound over time. The opportunity now is to sustain this without burning out, and to ensure your effort is always pointed at the highest-leverage work.";
    } else if (overall >= 50) {
      overallLabel = "Capable but Inconsistent";
      overallColor = "#f59e0b";
      overallDescription = "You have the raw ingredients of a hard worker — drive, standards, and resilience — but they don't yet fire reliably. Your output peaks when conditions are right and dips when they're not. The work ahead is about building systems that make your best self the default, not the exception.";
    } else {
      overallLabel = "Effort Gap Identified";
      overallColor = "#ef4444";
      overallDescription = "Your results point to a meaningful gap between your potential and your current work output. This isn't about intelligence or ability — it's about the habits, systems, and internal drive that convert potential into performance. The good news: hardworking is a behaviour, not a personality trait, and behaviours can be trained.";
    }

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
  },

  // ── AMBITION REPORT ───────────────────────
  ambition: (answers) => {
    const sectionDefs = [
      {
        name: "Goal Clarity",
        range: [0, 4],
        descriptions: {
          high: "You have exceptional clarity about what you want. Your goals are specific, values-aligned, and live at the center of your decision-making. This clarity is the foundation everything else is built on.",
          mid: "You have a sense of direction but your goals lack the precision needed to drive consistent action. Vague aspirations produce vague results — sharpening your targets will sharpen your progress.",
          low: "Goal clarity is your most urgent development area. Without knowing specifically where you're going, effort becomes scattered and motivation is hard to sustain. The first act of ambition is deciding what you actually want."
        },
        watchHigh: ["Revisit goals regularly — clarity can become rigidity if you stop questioning what you want", "Ensure your goals are truly yours and not a performance of what success should look like"],
        watchMid: ["Write one specific goal with a deadline this week — vague goals produce vague effort", "Ask yourself: if nothing about my circumstances changed, would I still want this?"],
        watchLow: ["Start by writing down 3 things you genuinely want — not what you should want", "A journal practice of 10 minutes a week on 'what do I actually want?' will create more clarity than any book"]
      },
      {
        name: "Drive & Initiative",
        range: [5, 9],
        descriptions: {
          high: "You are a natural initiator. You don't wait for permission or perfect conditions — you create momentum. This proactive energy is one of the most reliable predictors of long-term achievement.",
          mid: "You have drive in bursts but haven't yet made initiative a consistent habit. The gap between knowing what you want and acting on it is where ambition lives or dies.",
          low: "Your drive is largely reactive — it activates when pushed but not consistently from within. Building a bias toward action is the single most impactful shift you can make right now."
        },
        watchHigh: ["High initiative without reflection can lead to busyness without direction — ensure action is pointed at the right things", "Protect your energy — constant action without recovery erodes the drive that fuels it"],
        watchMid: ["Commit to one proactive action per week that you take without being prompted or pushed", "Ask yourself: what am I waiting for? The answer often reveals a fear to address, not a condition to meet"],
        watchLow: ["Start with the smallest possible action toward a goal today — momentum begins with one step", "Identify one area where you've been waiting for the 'right time' and take a single step this week"]
      },
      {
        name: "Risk & Growth",
        range: [10, 13],
        descriptions: {
          high: "You have a healthy relationship with risk and discomfort. You understand that meaningful ambition requires accepting the possibility of failure, and you lean into it rather than away from it.",
          mid: "You're willing to stretch sometimes but your risk tolerance is inconsistent. You tend to grow in areas that feel manageable and avoid the deeper discomforts where the real breakthroughs often live.",
          low: "Fear of failure or discomfort is significantly limiting the ceiling of your ambition. The goals you're pursuing may be calibrated to feel safe rather than to reflect what you truly want."
        },
        watchHigh: ["Calculated risk and recklessness are different things — ensure your boldness is informed by honest self-assessment", "Share your bolder moves with someone who will give you honest feedback, not just encouragement"],
        watchMid: ["Name one thing you've been avoiding because you might fail at it — that's likely your growth edge", "Reframe risk: the real risk is arriving at the end of your life having played safe with your potential"],
        watchLow: ["Start with micro-risks — small acts of courage that build your tolerance for uncertainty", "Explore what failure actually means to you — often the imagined consequences are far worse than the real ones"]
      },
      {
        name: "Long-Term Vision",
        range: [14, 17],
        descriptions: {
          high: "You think and build in long arcs. Your daily choices are informed by a distant horizon, and you're willing to sacrifice short-term comfort for long-term significance. This orientation is rare and powerful.",
          mid: "You have some long-term thinking but your daily habits and decisions aren't yet well-aligned with your future vision. The connection between today and tomorrow needs to be made more deliberate.",
          low: "Your orientation is predominantly short-term. Without a compelling vision of the future, it's hard to make the sacrifices today that tomorrow requires. Building a longer time horizon is foundational."
        },
        watchHigh: ["Long-term thinking can become an excuse to defer present joy — ensure your vision includes richness now, not just later", "Revisit your vision regularly to check it still reflects what you want, not just what you once decided"],
        watchMid: ["Write a one-paragraph description of where you want to be in 5 years and read it weekly", "For each major daily habit, ask: does this compound toward or against where I want to be?"],
        watchLow: ["Spend 30 minutes writing your ideal life at age 65 — work backward from there", "Small daily rituals that compound over years are more powerful than any single dramatic act — identify one to start today"]
      },
      {
        name: "Inner Fuel",
        range: [18, 21],
        descriptions: {
          high: "Your ambition is internally driven. It doesn't depend on external validation, status, or comparison. This intrinsic fuel burns cleaner and longer than any external motivator — it's what sustains people through genuine difficulty.",
          mid: "Your ambition is powered by a mix of internal and external fuel. This isn't inherently wrong, but it means your motivation will fluctuate based on recognition, comparison, and reward. Deepening the internal source builds resilience.",
          low: "Your ambition is largely externally dependent — driven by what others think, what you should want, or what rewards you'll receive. Ambition fuelled this way is fragile. It peaks when conditions are favourable and collapses when they're not."
        },
        watchHigh: ["Internally driven people can push too hard without external feedback — build in honest mirrors and accountability", "Intrinsic motivation doesn't mean ignoring external reality — stay connected to feedback from the world around you"],
        watchMid: ["Journal on this question: what would I still pursue if no one would ever know about it?", "Notice when you're seeking validation and ask: what does that tell me about my underlying insecurities?"],
        watchLow: ["Spend time identifying what work or pursuit has made you lose track of time — that's your intrinsic signal", "Consider that chasing external approval is a treadmill — the goalposts move every time you reach them"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const maxScore = sectionAnswers.length * 4;
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / maxScore) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);

    let overallLabel, overallColor, overallDescription;
    if (overall >= 75) {
      overallLabel = "Purposefully Ambitious";
      overallColor = "#6366f1";
      overallDescription = "Your ambition is high, clear, and internally driven. You set bold goals, take initiative, embrace risk as part of growth, and think in long arcs. You're not chasing what's expected of you — you're building what genuinely matters to you. The work now is to stay honest about whether your goals continue to reflect your true values as you evolve, and to ensure your ambition includes space for rest and presence, not just pursuit.";
    } else if (overall >= 50) {
      overallLabel = "Emerging Ambition";
      overallColor = "#f59e0b";
      overallDescription = "You have real ambition — the ingredients are present. But they're not yet firing consistently. Your goals may lack specificity, your actions may not match your aspirations, or your fuel may be partly borrowed from external sources. The gap between where you are and where you could be is not a talent gap — it's a systems and clarity gap. Close it deliberately.";
    } else {
      overallLabel = "Dormant Potential";
      overallColor = "#a855f7";
      overallDescription = "Your ambition is quieter than your potential suggests it should be. This may reflect a season of life, a lack of clarity about what you want, fear that keeps goals small and safe, or simply not having given yourself permission to want more. Dormant potential isn't fixed potential — it's waiting for the right question, the right environment, or the right moment of honesty with yourself.";
    }

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
  },

  // ── LONELINESS REPORT ─────────────────────
  loneliness: (answers) => {
    const sectionDefs = [
      {
        name: "Social Connection",
        range: [0, 4],
        descriptions: {
          high: "Your social connections are a genuine source of support and nourishment. You have people in your life you can reach, and they reach back. This is a real asset for your wellbeing.",
          mid: "Your social connections exist but have gaps in depth, availability, or reliability. You have some support but not enough to feel consistently held.",
          low: "Social connection is a significant area of unmet need for you. The absence of reliable, reciprocal relationships is one of the most painful human experiences — and it's worth taking seriously."
        },
        watchHigh: ["Connection quality can decline if you stop investing in it — relationships need regular tending", "Ensure you're not confusing quantity of connections with depth — a few deep ones matter more than many shallow ones"],
        watchMid: ["Identify one relationship worth deepening and invest in it deliberately over the next month", "Consider whether busyness, technology, or fear is creating distance in existing relationships"],
        watchLow: ["Start small — one genuine conversation per week with someone you care about", "Consider whether a therapist, support group, or community activity could provide initial connection scaffolding"]
      },
      {
        name: "Emotional Intimacy",
        range: [5, 8],
        descriptions: {
          high: "You experience genuine emotional intimacy — the kind where you are known, not just liked. This depth of connection is rare and profoundly protective of your wellbeing.",
          mid: "You have some emotional intimacy but remain partly hidden even in your closest relationships. Full connection requires being known — not just present.",
          low: "Emotional intimacy is largely absent from your relational world. Being unseen at depth is a specific and painful kind of loneliness — different from being alone, and often harder to name."
        },
        watchHigh: ["Intimacy requires vulnerability on both sides — ensure your close relationships have reciprocal depth", "Check in periodically: are you still allowing yourself to be known as you change and grow?"],
        watchMid: ["Choose one trusted person and share something you haven't told anyone — small acts of vulnerability compound", "Ask yourself: what am I afraid would happen if people really knew me?"],
        watchLow: ["The barrier to intimacy is almost always fear of rejection or judgment — naming this is the first step", "Therapy can be a safe space to practice being known before bringing it to personal relationships"]
      },
      {
        name: "Sense of Belonging",
        range: [9, 12],
        descriptions: {
          high: "You have a genuine sense of belonging in your world. You feel accepted, seen, and at home in the communities and relationships you inhabit. This is a profound wellbeing asset.",
          mid: "You participate in communities but true belonging — the feeling of being fully accepted as you are — is only partially present. You may be performing rather than inhabiting your social spaces.",
          low: "A persistent sense of being an outsider is one of the deepest forms of loneliness. It can exist even in crowded rooms. Building belonging begins with finding spaces where you don't have to edit yourself."
        },
        watchHigh: ["Belonging can become a comfort zone — ensure it's not preventing you from expanding your world", "Examine whether your belonging comes at the cost of authenticity — real belonging accepts all of you"],
        watchMid: ["Belonging is built through repeated genuine interaction — identify one community where you can show up consistently and authentically", "Consider whether you're presenting a curated version of yourself that makes belonging feel hollow"],
        watchLow: ["Find one community built around something you genuinely care about — shared purpose creates belonging faster than shared proximity", "The feeling of being an outsider is often a story, not a fact — challenge it by showing up consistently"]
      },
      {
        name: "Relationship with Self",
        range: [13, 16],
        descriptions: {
          high: "You have a healthy, warm relationship with yourself. You enjoy your own company, have a settled inner life, and don't depend on external validation for your sense of self. This is the foundation of all other connection.",
          mid: "Your relationship with yourself is functional but not deeply nourishing. There's some dependency on external input for self-worth, and solitude is okay rather than genuinely valued.",
          low: "A strained relationship with yourself makes loneliness significantly harder to bear — and also harder to escape. When being alone feels threatening, it often drives unhealthy relationship patterns."
        },
        watchHigh: ["A rich inner life is an asset — ensure it doesn't become isolation disguised as self-sufficiency", "Loving yourself well includes knowing when you need others — don't let self-reliance become a wall"],
        watchMid: ["Develop a solo practice you genuinely love — running, journaling, walking — that makes time with yourself feel good", "Notice when you reach for your phone or distraction to escape being with yourself — sit with it instead"],
        watchLow: ["Therapy or self-inquiry work is particularly valuable here — the relationship with yourself is the root of everything", "Try 10 minutes of intentional solitude daily — not productivity, just being — and notice what arises"]
      },
      {
        name: "Loneliness Impact",
        range: [17, 19],
        descriptions: {
          high: "Loneliness is currently having a significant impact on your daily experience. This is important information, not a permanent condition. Chronic loneliness affects both mental and physical health and deserves direct, compassionate attention.",
          mid: "Loneliness is present in your life and affects your mood and functioning at times, but it's not yet chronic or overwhelming. There's a window here to address the gaps before they deepen.",
          low: "Loneliness is not a significant issue for you right now. Your connection needs are largely being met and the impact of any loneliness you experience is manageable."
        },
        watchHigh: ["Please consider speaking to a mental health professional — loneliness at this level is a health issue, not just an emotional one", "Small consistent actions matter more than big ones — reach out to one person today, even briefly"],
        watchMid: ["Don't wait for loneliness to worsen before acting — use this as a prompt to invest in one relationship or community", "Name what kind of connection you're most missing and take one step toward it this week"],
        watchLow: ["Maintain your connection habits — wellbeing in this area is something to actively protect, not take for granted", "Consider whether there are people in your life who might be struggling and could benefit from your outreach"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const maxScore = sectionAnswers.length * 4;
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / maxScore) * 100);
    });

    // For loneliness, high score = more connected/less lonely
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);

    let overallLabel, overallColor, overallDescription;
    if (overall >= 70) {
      overallLabel = "Well-Connected";
      overallColor = "#10b981";
      overallDescription = "Your results suggest you have a rich and nourishing social world. You feel known, you belong, and your relationship with yourself is healthy. This doesn't mean life is without difficulty, but your connection needs are largely being met and loneliness is not a significant force in your daily experience. The opportunity is to continue investing in the depth of what you have.";
    } else if (overall >= 45) {
      overallLabel = "Partially Connected";
      overallColor = "#f59e0b";
      overallDescription = "Your connections have real value but meaningful gaps remain. You may have quantity without depth, presence without belonging, or social contact without emotional intimacy. This middle ground is where a lot of people live — not acutely lonely but not fully nourished either. The work is specific: identify the gaps and invest in closing them.";
    } else {
      overallLabel = "Significant Loneliness Present";
      overallColor = "#ef4444";
      overallDescription = "Your results indicate that loneliness is a meaningful and likely painful part of your current experience. This is one of the most honest things you can acknowledge about yourself — and one of the most important. Loneliness is not a character flaw. It's a signal that real human needs are going unmet. You deserve connection, and with the right steps, it is genuinely buildable.";
    }

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
  },

  // ── LISTENING REPORT ──────────────────────
  listening: (answers) => {
    const sectionDefs = [
      {
        name: "Presence & Attention",
        range: [0, 4],
        descriptions: {
          high: "Your presence in conversation is a genuine gift to the people around you. You're fully there — not performing listening, but actually listening. This is rarer than most people realise.",
          mid: "Your attention is good in some conversations but fragmented in others. Distraction, internal commentary, and anticipation of your own response are still pulling you out of the present moment.",
          low: "Your ability to be fully present in conversation is your most important development area as a listener. Without genuine attention, nothing else in the listening skill set can function well."
        },
        watchHigh: ["Presence doesn't mean passivity — ensure your attentiveness also includes appropriate engagement and response", "Check that 'full presence' isn't being used to avoid contributing your own perspective when it's needed"],
        watchMid: ["Before important conversations, take two slow breaths and consciously set an intention to listen", "Put your phone face-down and out of reach — physical removal of distraction is more effective than willpower"],
        watchLow: ["Practice one conversation per day where you commit to zero internal agenda — just receive what's being said", "Notice when your mind is composing your response mid-sentence and gently return your focus to the speaker"]
      },
      {
        name: "Comprehension",
        range: [5, 8],
        descriptions: {
          high: "You are an active and accurate comprehender. You not only hear what's said but understand what's meant — including the layers beneath the words. People feel genuinely understood by you.",
          mid: "Your comprehension is reasonable but you miss nuance, subtext, and sometimes the core point. You work from partial understanding more than you realise.",
          low: "Your comprehension gaps are likely creating real misunderstandings in your relationships and work. The good news is that this is highly trainable with deliberate practice."
        },
        watchHigh: ["Strong comprehension can create overconfidence — always check your understanding rather than assuming you've got it", "Listen for what's changing in someone's thinking over time, not just what they're saying in this conversation"],
        watchMid: ["After important conversations, write down the three key things the other person communicated — this builds comprehension muscle", "Ask one clarifying question per conversation as a practice — 'just to make sure I understand, are you saying...'"],
        watchLow: ["Practice reflecting back what you've heard before responding: 'What I'm hearing is...' — it slows you down helpfully", "Read about active listening — even one resource deeply absorbed will create meaningful change"]
      },
      {
        name: "Emotional Attunement",
        range: [9, 12],
        descriptions: {
          high: "You have exceptional emotional attunement. You read the room, sense the feeling beneath the words, and respond to the human in front of you — not just the content they're delivering. People feel emotionally safe with you.",
          mid: "Your emotional attunement is present but inconsistent. You pick up on feelings in some situations but miss them in others — particularly under stress or when you disagree with the speaker.",
          low: "Emotional attunement is significantly underdeveloped. You tend to respond to what people say rather than how they feel, which means people often feel heard but not understood."
        },
        watchHigh: ["High attunement can mean you absorb others' emotions — develop boundaries that allow empathy without overwhelm", "Ensure you're responding to the person's actual emotional state and not projecting what you'd feel in their situation"],
        watchMid: ["Ask 'how are you feeling about this?' more often than 'what do you think about this?' — it shifts the register", "Practice naming the emotion you sense someone is carrying: 'It sounds like you're frustrated' — even if quietly, to yourself"],
        watchLow: ["Emotional attunement starts with curiosity — try to make it your practice to wonder how someone feels, not just what they mean", "Read 'I Hear You' by Michael Sorensen — it's a practical and accessible introduction to empathic listening"]
      },
      {
        name: "Response Quality",
        range: [13, 16],
        descriptions: {
          high: "Your responses are the hallmark of a truly skilled listener. You acknowledge before you advise, ask questions that open rather than redirect, and hold space without making the conversation about you.",
          mid: "Your responses are good in low-stakes conversations but drift toward self-reference, premature advice, or agenda in more loaded ones. The quality of your response often determines whether someone felt heard.",
          low: "Your responses frequently undercut the listening you've done. Jumping to advice, relating back to yourself, or redirecting to your own agenda signals to people that you weren't fully there for them."
        },
        watchHigh: ["Excellent responses can set a high bar that others feel they can't match — be mindful of the dynamic your skill creates", "Don't let skill become performance — the goal is connection, not demonstrating listening technique"],
        watchMid: ["Before responding, ask yourself: 'Does this response serve them or me?'", "Practise the pause — a two-second pause before speaking forces you to ensure your response comes from what you heard, not what you planned"],
        watchLow: ["Replace 'That happened to me too...' with 'Tell me more about that' — this one habit shift will transform how people experience you", "Ask one question after someone finishes speaking, before offering any perspective — make it about them, not about you"]
      },
      {
        name: "Listening Under Pressure",
        range: [17, 20],
        descriptions: {
          high: "Your listening holds up under pressure — disagreement, criticism, speed, and emotional intensity don't collapse your ability to hear. This is the hallmark of listening mastery and an enormous professional and personal asset.",
          mid: "Your listening degrades meaningfully under pressure. You're good when conversations are easy and stakes are low, but disagreement or criticism tends to activate defensiveness that closes your ears.",
          low: "Pressure is the consistent enemy of your listening. Under stress, disagreement, or criticism, your ability to take in what's being said collapses almost entirely. This is where the most important development lies."
        },
        watchHigh: ["Listening under pressure is a skill that requires maintenance — notice if certain topics or people still trigger a closure response", "Use your strong listening to model the behaviour for others in high-stakes conversations"],
        watchMid: ["Before difficult conversations, set an explicit intention: 'I will listen to understand, not to respond'", "When you feel defensiveness rise, name it internally: 'I'm getting defensive' — this small act creates just enough space to keep listening"],
        watchLow: ["Develop a physical anchor for calm in tense conversations — a slow breath, feet on the floor, hands relaxed", "Practice receiving feedback by asking for it from someone you trust and listening without any verbal response — just nod, absorb, and thank them"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const maxScore = sectionAnswers.length * 4;
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / maxScore) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);

    let overallLabel, overallColor, overallDescription;
    if (overall >= 75) {
      overallLabel = "Masterful Listener";
      overallColor = "#10b981";
      overallDescription = "You are a genuinely rare kind of communicator. Your listening is present, accurate, emotionally attuned, and holds up even when conversations are hard. People feel truly heard by you — not just processed. This is one of the highest-value interpersonal skills a person can possess, and yours is highly developed. The opportunity is to continue refining the edges and to model this skill for others.";
    } else if (overall >= 50) {
      overallLabel = "Capable Listener";
      overallColor = "#f59e0b";
      overallDescription = "You are a solid listener who genuinely cares about understanding others. But your listening is uneven — excellent in comfortable conversations and degraded in difficult ones. The gap between your best and average listening is where your development lives. The habits that would close that gap are specific, learnable, and worth the investment.";
    } else {
      overallLabel = "Developing Listener";
      overallColor = "#6366f1";
      overallDescription = "Your listening has meaningful room to grow. The patterns showing up in your results — distraction, premature response, self-referencing, or defensiveness — are common and fully correctable. Listening well is not a personality trait; it's a set of learnable behaviours. The people in your life will feel the difference, and so will you.";
    }

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
  },

  // ── ATTACHMENT REPORT ─────────────────────
  attachment: (answers) => {
    const sectionDefs = [
      {
        name: "Intimacy & Closeness",
        range: [0, 4],
        descriptions: {
          high: "You are comfortable with closeness. You allow people in, share your inner world, and feel worthy of the love and care offered to you. This openness is the hallmark of a secure attachment orientation toward intimacy.",
          mid: "You experience intimacy in partial doses — you can let people close in some ways but keep walls up in others. Real intimacy requires being fully known, not just partially present.",
          low: "Closeness and intimacy are sources of significant discomfort or anxiety for you. This likely reflects early experiences that made vulnerability feel unsafe. Understanding this pattern is the first step to changing it."
        },
        watchHigh: ["Comfort with closeness is an asset — ensure you're also allowing your partners and loved ones the space they need", "Reflect on whether you're equally comfortable with both giving and receiving emotional closeness"],
        watchMid: ["Identify one specific way you keep people at a distance and experiment with removing that barrier in one relationship", "Consider what you're afraid of losing by being fully known — the answer often illuminates the work"],
        watchLow: ["Therapy, particularly attachment-focused work, can be profoundly helpful here — this pattern has roots worth exploring", "Start with the smallest act of self-disclosure to someone you trust — vulnerability is built gradually, not all at once"]
      },
      {
        name: "Anxiety & Fear",
        range: [5, 9],
        descriptions: {
          high: "Anxiety and fear are prominent features of your relational experience. You likely worry about abandonment, question others' feelings for you, and feel hypervigilant to signs of distance or rejection. This is painful — and it's workable.",
          mid: "Some relational anxiety is present. You feel insecurity in certain relationships or periods, and the fear of rejection influences your behaviour more than you'd like. There's meaningful room to build security here.",
          low: "Relational anxiety is minimal. You carry a relatively settled sense of security in your relationships and don't tend to be preoccupied by fears of abandonment or rejection. This is a real strength."
        },
        watchHigh: ["Anxious attachment is one of the most researched and treatable relational patterns — please consider working with a therapist", "Notice when you're seeking reassurance and try pausing before acting on the urge — the anxiety doesn't mean the fear is accurate"],
        watchMid: ["Build your internal reassurance capacity — when anxiety spikes, ask: 'Is there actual evidence for this fear, or am I interpreting neutral information through an anxious lens?'", "Communicate your needs directly to people you trust rather than testing relationships indirectly"],
        watchLow: ["Your security is an asset — use it to create safety for people in your life who carry more relational anxiety", "Notice if there are specific people or situations that do trigger more anxiety and explore why"]
      },
      {
        name: "Avoidance & Distance",
        range: [10, 14],
        descriptions: {
          high: "Avoidance is a significant feature of your relational style. You create distance when closeness grows, handle difficulty alone, and may have built an identity around self-sufficiency that makes dependency feel threatening. This protects you — and also isolates you.",
          mid: "Some avoidant patterns are present. You value independence, sometimes at the cost of closeness, and may struggle to express or even identify your emotional needs. There's room to let more in.",
          low: "Avoidance is not a significant pattern for you. You're generally comfortable with closeness and don't tend to create distance as a protective mechanism. This reflects a relatively secure relational orientation."
        },
        watchHigh: ["Avoidant patterns often feel like strength (self-sufficiency, independence) but are often a protective response to early pain — exploring this with a therapist is valuable", "Practice identifying one emotional need per week and expressing it to someone safe — it gets easier with repetition"],
        watchMid: ["Notice when you're pulling back and ask: 'Am I creating space because I need it, or because closeness is feeling threatening?'", "Practise staying emotionally present in conversations that make you want to withdraw"],
        watchLow: ["Your openness to closeness is healthy — ensure you're also honouring your legitimate need for personal space and autonomy", "Being available for connection doesn't mean having no boundaries — reflect on whether yours are clear and communicated"]
      },
      {
        name: "Conflict & Repair",
        range: [15, 19],
        descriptions: {
          high: "Your conflict and repair patterns are healthy. You move toward resolution rather than away from it, can regulate your emotions during disagreement, and prioritise the relationship over winning. This makes you a safe partner and friend.",
          mid: "You handle some conflicts well but others poorly. Your response to conflict varies based on who it's with, what it's about, and your emotional state at the time. Building more consistency here will deepen all your relationships.",
          low: "Conflict is a significantly difficult area for you. Whether you tend to explode, shut down, or withdraw, the pattern is getting in the way of genuine repair and sustained closeness. This is one of the most impactful areas to develop."
        },
        watchHigh: ["Your willingness to engage in conflict can sometimes feel overwhelming to more avoidant partners — calibrate your approach to their pace", "Ensure that 'moving toward conflict' doesn't become forcing resolution before the other person is ready"],
        watchMid: ["Identify your default conflict pattern (pursue, withdraw, explode, shut down) and work on the specific behaviour that follows from it", "The repair bid — a small gesture of reconnection after conflict — is one of the most powerful skills in relationship research. Practice it."],
        watchLow: ["Consider couples therapy or individual therapy focused on conflict patterns — this is highly learnable with the right support", "Start small: practice staying in one uncomfortable conversation for two minutes longer than you normally would before withdrawing"]
      },
      {
        name: "Security & Trust",
        range: [20, 24],
        descriptions: {
          high: "You carry a deep and stable sense of relational security. You trust in the people who love you, believe in your own worthiness of love, and approach relationships from a place of openness rather than self-protection. This is the foundation of secure attachment.",
          mid: "You have a working sense of security in relationships but it's not yet stable and consistent. Past hurts still surface, trust takes time, and your sense of being lovable fluctuates. There's meaningful work to do here — and it pays enormous dividends.",
          low: "Relational security is a significant challenge for you. You may doubt your worthiness of love, struggle to trust, and carry the weight of past hurt into new relationships. This is understandable — and it's also changeable with the right support."
        },
        watchHigh: ["Secure attachment is hard-won — continue the practices that built it and don't take it for granted", "Use your security to be a source of stability and safety for people in your life who carry more fear"],
        watchMid: ["Explore the specific narrative you carry about being lovable — often it's a story inherited from early experience, not an accurate reflection of reality", "Identify one person in your life who has shown up consistently for you and let that evidence counter the story that trust is unsafe"],
        watchLow: ["Attachment-focused therapy (EFT, schema therapy, or relational therapy) is specifically designed for this work — it's worth the investment", "Begin practicing self-compassion — the relationship you have with yourself is the template for all other relationships"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const maxScore = sectionAnswers.length * 4;
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? a : 0), 0);
      return Math.round((raw / maxScore) * 100);
    });

    // Attachment: high score = more secure; low anxiety/avoidance sections scored inversely
    // Anxiety (range 5-9) and Avoidance (range 10-14): higher answer = more anxious/avoidant
    // We invert those two sections for the overall
    const adjustedScores = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      if (sec.name === "Anxiety & Fear" || sec.name === "Avoidance & Distance") {
        return 100 - score;
      }
      return score;
    });

    const overall = Math.round(adjustedScores.reduce((s, v) => s + v, 0) / adjustedScores.length);

    let overallLabel, overallColor, overallDescription;
    if (overall >= 72) {
      overallLabel = "Securely Attached";
      overallColor = "#10b981";
      overallDescription = "Your attachment profile leans securely. You're comfortable with closeness, trust in the reliability of the people you love, handle conflict constructively, and carry a stable sense of your own worthiness. This doesn't mean relationships are effortless — it means you have the internal resources to navigate difficulty without it threatening the connection. This is a profound asset in all close relationships.";
    } else if (overall >= 50) {
      overallLabel = "Anxious-Leaning";
      overallColor = "#f59e0b";
      overallDescription = "Your attachment style shows anxious tendencies — a heightened need for reassurance, sensitivity to distance or withdrawal, and a fear of abandonment that can shape your relational behaviour. This doesn't make you broken; it makes you human. Anxious attachment is the most common insecure style, and with self-awareness and the right support, it can shift meaningfully toward security.";
    } else if (overall >= 30) {
      overallLabel = "Avoidant-Leaning";
      overallColor = "#6366f1";
      overallDescription = "Your attachment style shows avoidant tendencies — a pull toward self-sufficiency, discomfort with dependency, and a habit of creating distance when closeness intensifies. This style often feels like strength from the inside but loneliness from the outside. Understanding why distance feels safer than closeness is the most important question you can sit with.";
    } else {
      overallLabel = "Disorganised Attachment";
      overallColor = "#ef4444";
      overallDescription = "Your results suggest a complex attachment pattern — one that may involve elements of both anxiety and avoidance, often described as fearful or disorganised attachment. This typically develops from early experiences where the source of comfort was also a source of fear or unpredictability. This is the most challenging style to navigate alone, and working with a therapist who specialises in attachment would be a genuinely valuable investment in your relational world.";
    }

    const sectionResults = sectionDefs.map((sec, i) => {
      const raw = sectionScores[i];
      // For anxiety and avoidance, display inverted (lower raw = higher security)
      const displayScore = (sec.name === "Anxiety & Fear" || sec.name === "Avoidance & Distance")
        ? 100 - raw : raw;
      const tier = displayScore >= 70 ? "high" : displayScore >= 40 ? "mid" : "low";
      const color = displayScore >= 70 ? "#10b981" : displayScore >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score: displayScore, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor, overallDescription, sectionResults };
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

  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const navMap = { home: "nav-home", tests: "nav-tests" };
  if (navMap[page]) document.getElementById(navMap[page])?.classList.add("active");

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
// KNOW MORE MODAL
// ============================================
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

  document.getElementById("test-title").textContent = t.title;

  // Build progress bar
  let progressBarHtml = "";
  if (t.sections && t.sections.length) {
    const sectionsHtml = t.sections.map((sec, i) => {
      const isActive = currentQuestion >= sec.start && currentQuestion <= sec.end;
      const isComplete = currentQuestion > sec.end;
      const segProgress = isComplete ? 100 :
        isActive ? Math.round(((currentQuestion - sec.start) / (sec.end - sec.start + 1)) * 100) : 0;

      return `
        <div style="flex:1; padding: 0 3px;">
          <div style="font-size:0.62rem; font-weight:700; text-transform:uppercase; letter-spacing:0.07em;
            color:${isActive ? "var(--brand-indigo)" : isComplete ? "#10b981" : "var(--text-light)"};
            margin-bottom:5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${isComplete ? "✓ " : ""}${sec.name}
          </div>
          <div style="background:#e2e8f0; border-radius:50px; height:5px; overflow:hidden;">
            <div style="height:100%; width:${segProgress}%;
              background:${isComplete ? "#10b981" : "var(--brand-grad)"};
              border-radius:50px; transition:width 0.4s ease;"></div>
          </div>
        </div>
      `;
    }).join("");

    progressBarHtml = `
      <div style="display:flex; gap:0; width:100%; max-width:580px; margin:0 auto 20px;">
        ${sectionsHtml}
      </div>
    `;
  } else {
    const progress = (currentQuestion / total) * 100;
    progressBarHtml = `
      <div class="progress-bar-wrap" style="max-width:520px; margin:0 auto 8px;">
        <div class="progress-bar-fill" style="width:${progress}%"></div>
      </div>
    `;
  }

  document.getElementById("question-area").innerHTML = `
    ${progressBarHtml}
    <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:28px; font-weight:600;">
      Question ${currentQuestion + 1} of ${total}
      ${t.sections && q.section ? `&nbsp;·&nbsp;<span style="color:var(--brand-indigo);">${q.section}</span>` : ""}
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
  btn.offsetHeight;
  btn.style.animation = "shake 0.4s ease";
  btn.style.background = "#ef4444";
  setTimeout(() => {
    btn.style.background = "";
    btn.style.animation = "";
  }, 600);
}

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
  if (!logic) return;
  const result = logic(answers);
  showPage("report");

  // SECTIONED REPORT (tests with sectionResults e.g. Hardworking Index)
  if (result.sectionResults) {
    const sectionCardsHtml = result.sectionResults.map(sec => `
      <div style="background:#f8fafc; border-radius:16px; padding:20px 24px; margin-bottom:16px; border-left:4px solid ${sec.color};">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
          <h4 style="font-size:0.95rem; font-weight:800; color:var(--text-primary);">${sec.name}</h4>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="background:#e2e8f0; border-radius:50px; height:6px; width:80px; overflow:hidden;">
              <div style="height:100%; width:${sec.score}%; background:${sec.color}; border-radius:50px;"></div>
            </div>
            <span style="font-size:0.9rem; font-weight:800; color:${sec.color};">${sec.score}/100</span>
          </div>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.7; margin-bottom:12px;">${sec.description}</p>
        <div>
          ${sec.watch.map(w => `
            <div style="display:flex; align-items:flex-start; gap:8px; padding:6px 0; border-top:1px solid #e2e8f0;">
              <span style="color:#f59e0b; margin-top:1px; flex-shrink:0;">→</span>
              <span style="font-size:0.82rem; color:var(--text-primary); font-weight:500;">${w}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");

    document.getElementById("report-page-content").innerHTML = `
      <div>
        <div style="
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
          <div style="font-size:clamp(3rem,8vw,5.5rem); font-weight:800; color:white; line-height:1; margin-bottom:8px;">${result.overall}<span style="font-size:1.5rem;">/100</span></div>
          <h1 style="font-size:clamp(1.6rem,4vw,2.5rem); font-weight:800; color:white; margin-bottom:16px;">${result.overallLabel}</h1>
          <div style="width:60px;height:4px;background:rgba(255,255,255,0.4);border-radius:50px;margin:0 auto;"></div>
        </div>

        <div style="background:white; border-radius:24px; padding:clamp(28px,5vw,48px); box-shadow:var(--shadow-card); margin-bottom:28px;">
          <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:14px; color:var(--text-primary);">Overall Summary</h3>
          <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.8; margin-bottom:32px;">${result.overallDescription}</p>

          <div style="background:#f8fafc; border-radius:14px; padding:20px; margin-bottom:32px; text-align:center;">
            <div style="font-size:0.75rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px;">Overall Score</div>
            <div style="background:#e2e8f0; border-radius:50px; height:10px; overflow:hidden; margin-bottom:8px;">
              <div style="height:100%; width:${result.overall}%; background:${result.overallColor}; border-radius:50px; transition:width 1s ease;"></div>
            </div>
            <div style="font-size:2rem; font-weight:800; color:${result.overallColor};">${result.overall}/100</div>
          </div>

          <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:16px; color:var(--text-primary);">Section Breakdown</h3>
          ${sectionCardsHtml}
        </div>

        <div style="background:linear-gradient(135deg,rgba(99,102,241,0.06),rgba(217,70,239,0.06)); border-radius:16px; padding:24px; border:1px solid rgba(99,102,241,0.12); margin-bottom:28px;">
          <div style="font-size:0.8rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--brand-magenta); margin-bottom:12px;">Recommended Next Step</div>
          <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6; margin-bottom:16px;">
            Your profile unlocks a personalised 1-on-1 session with a People Assets coach who specialises in performance and work habits.
          </p>
          <button class="btn-primary btn-full" onclick="showPage('coaching')" style="font-size:0.85rem;">
            Book a Coaching Session →
          </button>
        </div>

        <div class="report-actions">
          <button class="btn-primary" onclick="showPage('tests')" style="background:#64748b;">← Try Another Assessment</button>
          <button class="btn-primary" onclick="window.print()">Download Report</button>
          <button class="btn-primary" onclick="showPage('coaching')">Book Coaching →</button>
        </div>
      </div>
    `;

  } else {
    // FLAT REPORT (all original tests)
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

        <div class="report-body" style="background:white; border-radius:24px; padding:clamp(28px,5vw,48px); box-shadow:var(--shadow-card);">
          <div class="report-inner-grid" style="display:grid; grid-template-columns:1.4fr 1fr; gap:32px; align-items:start;">
            <div>
              <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:14px; color:var(--text-primary);">Your Profile Summary</h3>
              <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.8; margin-bottom:28px;">${result.description}</p>
              <h3 style="font-size:1rem; font-weight:800; margin-bottom:12px; color:var(--text-primary);">Your Strengths</h3>
              <div style="margin-bottom:28px;">${strengthsHtml}</div>
              <h3 style="font-size:1rem; font-weight:800; margin-bottom:12px; color:var(--text-primary);">Watch Points & Growth Areas</h3>
              <div>${watchHtml}</div>
            </div>
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

        <div class="report-actions">
          <button class="btn-primary" onclick="showPage('tests')" style="background:#64748b;">← Try Another Assessment</button>
          <button class="btn-primary" onclick="window.print()">Download Report</button>
          <button class="btn-primary" onclick="showPage('coaching')">Book Coaching →</button>
        </div>
      </div>
    `;
  }
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

  status.style.display = "block";
  status.textContent = `✓ Thanks ${name}! We'll reach out to ${email} within 24 hours.`;
  e.target.reset();
}

// ============================================
// INIT
// ============================================
showPage("home");

// ADD TO THE VERY END OF YOUR FILE
function sendReportEmail(e, testTitle, resultLabel) {
  e.preventDefault();
  
  const emailInput = document.getElementById("report-email-input");
  const status = document.getElementById("report-email-status");
  const btn = document.getElementById("report-send-btn");

  if (!emailInput.value) return;

  status.style.display = "block";
  status.innerText = "Sending report...";
  btn.disabled = true;

  const templateParams = {
    to_email: emailInput.value,
    test_name: testTitle,
    result_label: resultLabel,
    message: `Your ${testTitle} results are ready! Your profile was identified as: ${resultLabel}.`
  };

  // Replace 'YOUR_SERVICE_ID' and 'YOUR_REPORT_TEMPLATE_ID' with your EmailJS IDs
  emailjs.send('service_u11zlzf', 'template_zpcklyu', templateParams)
    .then(() => {
      status.innerText = "✓ Success! Report sent to " + emailInput.value;
      status.style.color = "#ffffff";
      alert("Your " + testTitle + " report has been successfully sent!");
    })
    .catch((err) => {
      status.innerText = "Error sending email. Please try again.";
      console.error("EmailJS Error:", err);
    })
    .finally(() => {
      btn.disabled = false;
    });
}