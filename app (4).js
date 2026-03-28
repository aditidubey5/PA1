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
    questions: 28,
    time: "12 min",
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
    questions: 30,
    time: "14 min",
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

  // ── THE MARTYR INDEX (EXPANDED) ──────────
  {
    id: "martyr",
    title: "The Martyr Index",
    tagline: "Are you working hard — or just suffering productively?",
    description: "The Martyr Index measures the gap between effort invested and systemic impact generated. High martyrs work extremely hard but remain stuck — they over-invest in low-leverage tasks, under-delegate, and confuse busyness with progress.",
    questions: 20,
    time: "9 min",
    sections: [
      { name: "Over-Functioning", start: 0, end: 4 },
      { name: "Delegation Barriers", start: 5, end: 9 },
      { name: "Impact vs Effort", start: 10, end: 14 },
      { name: "Boundaries & Recovery", start: 15, end: 19 }
    ],
    questions_data: [
      { section: "Over-Functioning", q: "I stay late to finish tasks that others were responsible for but didn't complete to my standard.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Over-Functioning", q: "I feel like the entire project will fall apart if I'm not personally involved in every detail.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Over-Functioning", q: "I say 'yes' to new requests even when my current workload is already at capacity.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Over-Functioning", q: "I take pride in being the most 'stressed' or 'busy' person in the room.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Over-Functioning", q: "I jump in to solve problems before others have even had a chance to try.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Delegation Barriers", q: "It takes longer to explain a task to someone else than to just do it myself.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Delegation Barriers", q: "I feel guilty when I see my team working hard while I am focused on high-level strategy.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Delegation Barriers", q: "I don't trust the quality of work produced by others without my direct oversight.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Delegation Barriers", q: "I believe that 'if you want something done right, you have to do it yourself.'", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Delegation Barriers", q: "I delegate the 'easy' tasks but keep all the complex ones, even when I'm overwhelmed.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Impact vs Effort", q: "I spend more than 50% of my day on reactive tasks (emails, Slack, minor fixes) rather than deep work.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Impact vs Effort", q: "At the end of a long day, I feel exhausted but can't name a single significant thing I achieved.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Impact vs Effort", q: "I focus on getting things 'done' rather than questioning if they should be done at all.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Impact vs Effort", q: "I prioritize tasks based on who is asking, rather than the strategic value of the work.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Impact vs Effort", q: "I confuse high activity levels with high productivity.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Boundaries & Recovery", q: "I check my work messages within 30 minutes of waking up or going to bed.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Boundaries & Recovery", q: "I feel resentful toward colleagues who seem to work less but get more recognition.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Boundaries & Recovery", q: "The idea of taking a true 'offline' vacation makes me feel anxious about the backlog.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Boundaries & Recovery", q: "I find it difficult to say 'no' to my boss or clients, even for low-priority items.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Boundaries & Recovery", q: "I use my 'hard work' as a shield to avoid dealing with my own burnout.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] }
    ]
  },

  // ── SIGNAL vs NOISE (EXPANDED) ───────────
  {
    id: "signal",
    title: "Signal vs. Noise Quotient",
    tagline: "How much of your day is signal — and how much is static?",
    description: "This assessment measures your Signal/Noise Quotient (SNQ) — quantifying your information diet, focus quality, and strategic thinking bandwidth.",
    questions: 20,
    time: "10 min",
    sections: [
      { name: "Information Diet", start: 0, end: 4 },
      { name: "Focus Environment", start: 5, end: 9 },
      { name: "Digital Hygiene", start: 10, end: 14 },
      { name: "Strategic Filter", start: 15, end: 19 }
    ],
    questions_data: [
      { section: "Information Diet", q: "I consume information primarily from curated, high-quality sources (books, journals) rather than feeds.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Information Diet", q: "I find myself scrolling through social media or news apps without a specific purpose.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Information Diet", q: "I can summarize the most important things I learned this week in under 2 minutes.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Information Diet", q: "My information intake is driven by curiosity rather than the fear of missing out (FOMO).", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Information Diet", q: "I regularly unsubscribe from newsletters or feeds that no longer provide value.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Focus Environment", q: "I can work for 90 minutes on a single task without checking a single notification.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Focus Environment", q: "My physical and digital workspace is free of clutter and unnecessary distractions.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Focus Environment", q: "I use 'Deep Work' blocks that are protected from meetings and interruptions.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Focus Environment", q: "I feel mentally 'fragmented' by the number of open tabs and applications on my screen.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Focus Environment", q: "I am able to enter a state of 'flow' at least three times per week.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Digital Hygiene", q: "All non-human notifications (apps, news, promos) are disabled on my phone.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Digital Hygiene", q: "I check my email at specific, batch-processed times rather than continuously.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Digital Hygiene", q: "I use my phone at the dinner table or during social interactions.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Digital Hygiene", q: "I have 'No-Screen' zones or times in my daily routine.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Digital Hygiene", q: "I feel a compulsion to respond to messages the instant they arrive.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Strategic Filter", q: "I can clearly distinguish between 'Urgent' tasks and 'Important' ones.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Strategic Filter", q: "I spend time thinking about the long-term consequences of my current information intake.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Strategic Filter", q: "I have a 'Not-To-Do' list of things that are noise and should be ignored.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Strategic Filter", q: "I feel confident saying 'I don't know' about topics that are outside my focus area.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Strategic Filter", q: "I feel mentally clear and energized after a day of work.", options: ["Almost always","Often","Sometimes","Rarely","Never"] }
    ]
  },

  // ── LEADERSHIP ARCHETYPE (EXPANDED) ────────
  {
    id: "leadership",
    title: "Leadership Archetype Scanner",
    tagline: "Discover the leader you actually are — not the one you think you are.",
    description: "Are you a Visionary, an Executor, a Coach, or a Stabilizer? This assessment measures your leadership instincts across four core dimensions.",
    questions: 20,
    time: "11 min",
    sections: [
      { name: "Vision & Strategy", start: 0, end: 4 },
      { name: "Execution & Pace", start: 5, end: 9 },
      { name: "People & Coaching", start: 10, end: 14 },
      { name: "Systems & Stability", start: 15, end: 19 }
    ],
    questions_data: [
      { section: "Vision & Strategy", q: "I spend more time thinking about where the team will be in 3 years than what we are doing next week.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Vision & Strategy", q: "When a problem arises, I look for the opportunity to innovate rather than just fixing it.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Vision & Strategy", q: "I enjoy 'selling' a big idea to stakeholders and getting them excited about the future.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Vision & Strategy", q: "I am comfortable with high levels of ambiguity and changing directions.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Vision & Strategy", q: "I believe a leader's main job is to set the 'North Star' for everyone else.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Execution & Pace", q: "I feel frustrated when meetings end without a clear list of action items and owners.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Execution & Pace", q: "I believe that 'speed is a feature' and I push the team to deliver faster.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Execution & Pace", q: "I am willing to bypass protocol if it means getting a critical result on time.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Execution & Pace", q: "I measure my success primarily by the number of goals met and projects shipped.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Execution & Pace", q: "I lead by example, often being the first one to dive into the work itself.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "People & Coaching", q: "I would rather spend 30 minutes listening to a team member's struggle than giving them the answer.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "People & Coaching", q: "I prioritize psychological safety and team harmony over individual performance metrics.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "People & Coaching", q: "I am actively mentoring at least two people to take over my current responsibilities.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "People & Coaching", q: "I feel most successful when I see a team member achieve a personal growth milestone.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "People & Coaching", q: "I adjust my leadership style based on the unique emotional needs of each person.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Systems & Stability", q: "I believe that 'good people in a bad system will eventually fail.'", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Systems & Stability", q: "I enjoy creating documentation, SOPs, and clear workflows for the team.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Systems & Stability", q: "I am the one who asks 'how will this scale?' when someone proposes a new idea.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Systems & Stability", q: "I value predictability and consistency over rapid, unvetted experimentation.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Systems & Stability", q: "I feel most confident when I know exactly who is doing what and why.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] }
    ]
  },

  // ── EMOTIONAL INTELLIGENCE (EXPANDED) ────
  {
    id: "ei",
    title: "Emotional Intelligence Audit",
    tagline: "Your EQ is the ceiling on your leadership. Find out where it sits.",
    description: "EQ is the ability to manage emotions in yourself and others. Research shows EQ outperforms IQ in predicting leadership effectiveness.",
    questions: 25,
    time: "12 min",
    sections: [
      { name: "Self-Awareness", start: 0, end: 4 },
      { name: "Self-Regulation", start: 5, end: 9 },
      { name: "Motivation & Drive", start: 10, end: 14 },
      { name: "Empathy", start: 15, end: 19 },
      { name: "Social Skills", start: 20, end: 24 }
    ],
    questions_data: [
      { section: "Self-Awareness", q: "I can accurately name the specific emotion I am feeling in real-time.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Self-Awareness", q: "I understand the specific 'triggers' that cause me to become defensive or angry.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Self-Awareness", q: "I am aware of how my body language changes when I am under stress.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Self-Awareness", q: "I seek out feedback about my behavior, even when I know it might be critical.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Self-Awareness", q: "I recognize the impact my mood has on the people around me.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Self-Regulation", q: "I can stay calm and think clearly even when someone is shouting or being unfair.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Self-Regulation", q: "I think through the consequences of my words before I speak during a conflict.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Self-Regulation", q: "I can 'turn off' work stress when I get home to be present with family or friends.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Self-Regulation", q: "I rarely make impulsive decisions driven by temporary emotions like excitement or fear.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Self-Regulation", q: "I am able to admit when I am wrong and apologize sincerely without making excuses.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Motivation & Drive", q: "I am driven by an internal standard of excellence rather than external praise.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Motivation & Drive", q: "I remain optimistic and persistent even after a major project failure.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Motivation & Drive", q: "I am willing to delay short-term gratification for long-term goal achievement.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Motivation & Drive", q: "I constantly look for ways to improve my performance and learn new skills.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Motivation & Drive", q: "My personal goals are aligned with my professional actions.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Empathy", q: "I can sense the 'vibe' of a room the moment I walk in.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Empathy", q: "I am good at predicting how others will react to a specific decision or piece of news.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Empathy", q: "I listen with the intent to understand, not just to prepare my response.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Empathy", q: "I take the time to understand the cultural and personal background of my colleagues.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Empathy", q: "I find myself naturally comforting people when they are visibly upset.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Social Skills", q: "I am able to navigate difficult conversations and reach a 'win-win' resolution.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Social Skills", q: "I am effective at persuading others to see my point of view without using authority.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Social Skills", q: "I am able to build rapport quickly with people from different departments or backgrounds.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Social Skills", q: "I actively work to diffuse tension during team meetings or group projects.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Social Skills", q: "People often come to me to mediate their disagreements.", options: ["Almost always","Often","Sometimes","Rarely","Never"] }
    ]
  },

  // ── GROWTH MINDSET (EXPANDED) ────────────
  {
    id: "growth",
    title: "Growth Mindset Diagnostic",
    tagline: "Fixed or fluid? This is the meta-skill beneath every other skill.",
    description: "Measures your behavioral patterns around challenge, failure, learning, and feedback.",
    questions: 20,
    time: "8 min",
    sections: [
      { name: "Challenge Receptivity", start: 0, end: 4 },
      { name: "Response to Failure", start: 5, end: 9 },
      { name: "Effort Beliefs", start: 10, end: 14 },
      { name: "Learning from Others", start: 15, end: 19 }
    ],
    questions_data: [
      { section: "Challenge Receptivity", q: "I actively seek out tasks that are slightly beyond my current ability level.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Challenge Receptivity", q: "I prefer working on things I am already good at to avoid making mistakes.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Challenge Receptivity", q: "I see difficult problems as puzzles to be solved rather than threats to my ego.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Challenge Receptivity", q: "I feel excited when I encounter a challenge that requires me to learn a new skill.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Challenge Receptivity", q: "I avoid taking on projects where there is a high chance I might fail publicly.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Response to Failure", q: "When I fail, I ask 'What can I learn from this?' rather than 'Who is to blame?'", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Response to Failure", q: "I am able to bounce back quickly from professional setbacks.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Response to Failure", q: "I believe that mistakes are a necessary part of the mastery process.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Response to Failure", q: "I tend to hide my errors from my boss or teammates out of shame.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Response to Failure", q: "I view feedback (even harsh feedback) as valuable data for improvement.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Effort Beliefs", q: "I believe that intelligence and talent can be developed through hard work.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Effort Beliefs", q: "I think that if you have to work hard at something, you probably aren't naturally good at it.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Effort Beliefs", q: "I value the 'process' of working on a project more than just the final result.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Effort Beliefs", q: "I keep pushing on a hard problem even when I feel like I'm not making progress.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Effort Beliefs", q: "I believe that 'practice makes permanent' and I invest time in deliberate practice.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Learning from Others", q: "I feel inspired, rather than threatened, by the success of my peers.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Learning from Others", q: "I regularly ask high-performers for advice on how they achieved their results.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Learning from Others", q: "I am willing to look 'foolish' in order to ask a question and understand a concept.", options: ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"] },
      { section: "Learning from Others", q: "I share my own failures and lessons learned to help others grow.", options: ["Almost always","Often","Sometimes","Rarely","Never"] },
      { section: "Learning from Others", q: "I actively look for mentors who will challenge my current thinking.", options: ["Almost always","Often","Sometimes","Rarely","Never"] }
    ]
  },

  {
    id: "hardworking",
    title: "Hardworking Index",
    tagline: "Are you truly putting in the work — or just feeling busy?",
    description: "The Hardworking Index measures the depth and quality of your work across five dimensions: effort, consistency, focus, resilience, and self-motivation.",
    questions: 22,
    time: "10 min",
    sections: [
      { name: "Work Ethic", start: 0, end: 4 },
      { name: "Consistency", start: 5, end: 9 },
      { name: "Focus", start: 10, end: 14 },
      { name: "Resilience", start: 15, end: 18 },
      { name: "Motivation", start: 19, end: 21 }
    ],
    questions_data: [
      { section: "Work Ethic & Effort", q: "When I take on a task, I commit to seeing it through even when it becomes difficult.", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Work Ethic & Effort", q: "How would your colleagues honestly describe your effort?", options: ["Minimum required","Inconsistent","Solid","Goes above and beyond","One of the hardest working"] },
      { section: "Work Ethic & Effort", q: "When I'm given a deadline, I typically...", options: ["Struggle to meet it","Meet it last-minute","Meet it with time to spare","Finish ahead of time","Exceed quality expectations early"] },
      { section: "Work Ethic & Effort", q: "I put in extra effort even when no one is watching.", options: ["Rarely","Sometimes","It varies","Often","Always"] },
      { section: "Work Ethic & Effort", q: "How often do you take on extra responsibilities?", options: ["Almost never","Occasionally","Sometimes","Often","Proactively expand contribution"] },
      { section: "Consistency & Discipline", q: "My productivity across a week is...", options: ["Very uneven","Somewhat uneven","Moderate","Fairly consistent","Very consistent"] },
      { section: "Consistency & Discipline", q: "When I set a goal, I follow through on it...", options: ["Rarely","Sometimes","Half the time","Most of the time","Almost always"] },
      { section: "Consistency & Discipline", q: "How do you behave when motivation is low?", options: ["Do very little","Go through motions","Do less than usual","Push through","Maintain usual output"] },
      { section: "Consistency & Discipline", q: "I have structured routines to stay productive.", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Consistency & Discipline", q: "When an unexpected disruption happens, I recover...", options: ["Long time","Slowly","Few days","Quickly","Adapt immediately"] },
      { section: "Focus & Prioritisation", q: "Time spent on tasks that 'move the needle'?", options: ["Very little","Less than half","About half","More than half","Majority"] },
      { section: "Focus & Prioritisation", q: "Can sustain deep focus for extended periods?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Focus & Prioritisation", q: "When faced with a long to-do list, I...", options: ["Feel overwhelmed","Do easiest items","Work randomly","Prioritise but drift","Attack highest impact tasks first"] },
      { section: "Focus & Prioritisation", q: "How effectively do you protect focus hours?", options: ["Not at all","Poorly","Somewhat","Well","Very well"] },
      { section: "Focus & Prioritisation", q: "I regularly audit tasks to eliminate low-value work.", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Resilience & Persistence", q: "When I encounter a significant obstacle, I...", options: ["Step back","Feel discouraged","Take break then revisit","Work through frustration","Treat as problem to solve"] },
      { section: "Resilience & Persistence", q: "I have pushed through exhaustion to finish work.", options: ["Rarely","Occasionally","Sometimes","Often","Almost always"] },
      { section: "Resilience & Persistence", q: "When a project takes longer than expected, I...", options: ["Abandon it","Quality drops","Adjust but lose drive","Keep working at pace","Stay fully committed"] },
      { section: "Resilience & Persistence", q: "After critical feedback, I typically...", options: ["Feel demotivated","Take it personally","Use to adjust","Return quickly","Treat as data for improvement"] },
      { section: "Purpose & Self-Motivation", q: "I have a clear 'why' for my work.", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Purpose & Self-Motivation", q: "Drive comes from within (internal).", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Purpose & Self-Motivation", q: "Satisfied with effort in past 3 months?", options: ["Very unsatisfied","Unsatisfied","Neutral","Satisfied","Very satisfied"] }
    ]
  },

  {
    id: "ambition",
    title: "Ambition Spectrum",
    tagline: "How high are you really aiming — and what's driving it?",
    description: "Ambition is more than wanting success — it's the quality of your goals and the clarity of your direction.",
    questions: 22,
    time: "10 min",
    sections: [
      { name: "Goal Clarity", start: 0, end: 4 },
      { name: "Drive & Initiative", start: 5, end: 9 },
      { name: "Risk & Growth", start: 10, end: 13 },
      { name: "Long-Term Vision", start: 14, end: 17 },
      { name: "Inner Fuel", start: 18, end: 21 }
    ],
    questions_data: [
      { section: "Goal Clarity", q: "I have a specific, concrete goal I am actively working toward.", options: ["No","Vague idea","Shift frequently","Reasonably clear","Yes - specific target"] },
      { section: "Goal Clarity", q: "How specific and measurable is your goal?", options: ["Very vague","Somewhat defined","Moderately","Trackable","Very specific"] },
      { section: "Goal Clarity", q: "How often do you refine your goals?", options: ["Rarely","Occasionally","Sometimes","Regularly","Consistently"] },
      { section: "Goal Clarity", q: "Where do you want to be in five years?", options: ["No idea","Vaguely","General direction","Reasonably clear","Confidently detailed"] },
      { section: "Goal Clarity", q: "Goals aligned with deepest values?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Drive & Initiative", q: "When growth opportunities arise, I...", options: ["Hesitate","Consider but rare action","Occasionally pursue","Act quickly","Move decisively"] },
      { section: "Drive & Initiative", q: "Proactively create opportunities?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Drive & Initiative", q: "Invest personal time in skill development?", options: ["Rarely","Occasionally","Sometimes","Often","Almost always"] },
      { section: "Drive & Initiative", q: "Progress over the last two years?", options: ["Standing still","Moved slightly","Mixed","Satisfied","Significant momentum"] },
      { section: "Drive & Initiative", q: "After achieving a goal, my instinct is...", options: ["Relax","Enjoy for a long time","Start thinking next","Set bigger target","Immediately raise bar"] },
      { section: "Risk & Growth", q: "Willing to leave comfort for pursuit?", options: ["Rarely","External pressure only","Sometimes","Often","Almost always"] },
      { section: "Risk & Growth", q: "Respond to bold moves with risk?", options: ["Avoid it","Think but no action","Take if validated","Weigh carefully","Lean into it"] },
      { section: "Risk & Growth", q: "Put yourself in situations to fail?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Risk & Growth", q: "Stretch beyond comfort zone in past year?", options: ["Not at all","Very little","Moderately","Significantly","Substantially"] },
      { section: "Long-Term Vision", q: "Sacrifice today for years from now?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Long-Term Vision", q: "Daily habits connected to ambition?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Long-Term Vision", q: "How far ahead do you think?", options: ["Days/Weeks","Months","1-2 years","3-5 years","Decade+"] },
      { section: "Long-Term Vision", q: "Building a career you are proud of?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Inner Fuel", q: "Ambition driven by growth vs approval?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Inner Fuel", q: "Excited by reaching biggest goals?", options: ["Admiration","Material rewards","Mixed","Satisfaction","Full potential"] },
      { section: "Inner Fuel", q: "How does fear of failure affect you?", options: ["Stops me","Shrinks aim","Cautious","Act in spite","Peace with failure"] },
      { section: "Inner Fuel", q: "How ambitious are you relative to potential?", options: ["Not at all","Mildly","Moderately","Quite","Highly ambitious"] }
    ]
  },

  {
    id: "loneliness",
    title: "Loneliness & Connection Index",
    tagline: "Are you truly connected — or just surrounded?",
    description: "Loneliness isn't simply about being alone. It's about the perceived quality of your connections.",
    questions: 20,
    time: "9 min",
    sections: [
      { name: "Social Connection", start: 0, end: 4 },
      { name: "Emotional Intimacy", start: 5, end: 8 },
      { name: "Sense of Belonging", start: 9, end: 12 },
      { name: "Relationship with Self", start: 13, end: 16 },
      { name: "Loneliness Impact", start: 17, end: 19 }
    ],
    questions_data: [
      { section: "Social Connection", q: "Have people you can genuinely talk to?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Social Connection", q: "How often spend quality time with people?", options: ["Rarely/Never","Monthly","Few times","Weekly","Multiple times"] },
      { section: "Social Connection", q: "When reaching out to others, you feel...", options: ["Burden","Uncertain","Neutral","Welcome","Genuinely wanted"] },
      { section: "Social Connection", q: "Person to call in distress?", options: ["No","Not sure","Maybe","Yes - likely","Yes - definitely"] },
      { section: "Social Connection", q: "Satisfaction with relationship quality?", options: ["Very unsatisfied","Unsatisfied","Neutral","Satisfied","Very satisfied"] },
      { section: "Emotional Intimacy", q: "Person who truly knows you (fears/struggles)?", options: ["No","Not sure","Partly","Mostly","Yes - deeply"] },
      { section: "Emotional Intimacy", q: "Instinct when struggling emotionally?", options: ["Alone","Distract","Process alone then share","Reach out soon","Seek connection quickly"] },
      { section: "Emotional Intimacy", q: "Comfortable with emotional vulnerability?", options: ["Very uncomfortable","Uncomfortable","Somewhat","Fairly","Very comfortable"] },
      { section: "Emotional Intimacy", q: "Feel understood by people in life?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Sense of Belonging", q: "Have a community where you belong?", options: ["No","Participate only","Somewhat","Yes - one/two","Yes - multiple"] },
      { section: "Sense of Belonging", q: "Free to be yourself (not performing)?", options: ["Rarely","Sometimes","Most people","Almost always","Always"] },
      { section: "Sense of Belonging", q: "Feel like an outsider?", options: ["Very often","Often","Sometimes","Rarely","Almost never"] },
      { section: "Sense of Belonging", q: "People would notice/care if you withdrew?", options: ["No one","1-2 eventually","Few quickly","Most reach out","Absence felt clearly"] },
      { section: "Relationship with Self", q: "Enjoy spending time alone?", options: ["No","Tolerate","Okay small doses","Enjoy it","Deeply value solitude"] },
      { section: "Relationship with Self", q: "Feel when alone with thoughts?", options: ["Anxious","Restless","Mixed","At ease","At home"] },
      { section: "Relationship with Self", q: "Rely on others to feel okay?", options: ["Almost always","Often","Sometimes","Rarely","Almost never"] },
      { section: "Relationship with Self", q: "Describe relationship with yourself?", options: ["Painful","Strained","Functional","Positive","Healthy"] },
      { section: "Loneliness Impact", q: "How often do you feel lonely?", options: ["Daily","Often","Sometimes","Rarely","Almost never"] },
      { section: "Loneliness Impact", q: "Effect on functioning/mood?", options: ["Very significant","Significant","Moderate","Mild","Minimal"] },
      { section: "Loneliness Impact", q: "Connections reflect what you need?", options: ["Not at all","Not much","Partially","Mostly","Fully"] }
    ]
  },

  {
    id: "listening",
    title: "Listening Intelligence Profile",
    tagline: "Are you truly listening — or just waiting to speak?",
    description: "Listening is the most underrated communication skill. Measures presence, comprehension, attunement, and response.",
    questions: 21,
    time: "10 min",
    sections: [
      { name: "Presence & Attention", start: 0, end: 4 },
      { name: "Comprehension", start: 5, end: 8 },
      { name: "Emotional Attunement", start: 9, end: 12 },
      { name: "Response Quality", start: 13, end: 16 },
      { name: "Listening Under Pressure", start: 17, end: 20 }
    ],
    questions_data: [
      { section: "Presence & Attention", q: "Fully present (not planning response)?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Presence & Attention", q: "Phone/distractions compete for attention?", options: ["Almost always","Often","Sometimes","Rarely","Almost never"] },
      { section: "Presence & Attention", q: "Notice non-verbal signals naturally?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Presence & Attention", q: "Make others feel full attention?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Presence & Attention", q: "Finish others' sentences?", options: ["Very often","Often","Sometimes","Rarely","Almost never"] },
      { section: "Comprehension", q: "Recall key points after conversation?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Comprehension", q: "Ask clarifying questions?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Comprehension", q: "Listen for what is NOT being said?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Comprehension", q: "Others confirm your accuracy?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Emotional Attunement", q: "Instinct to listen before advice?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Emotional Attunement", q: "Sense discrepancy in emotion vs words?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Emotional Attunement", q: "People feel safe sharing vulnerability?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Emotional Attunement", q: "Stay calm when listener is upset?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Response Quality", q: "Make person feel understood first?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Response Quality", q: "Questions deepen the discussion?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Response Quality", q: "People feel clearer after talking to you?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Response Quality", q: "Resist urge to relate to own experience?", options: ["Rarely","Often","Sometimes","Rarely","Almost never"] },
      { section: "Listening Under Pressure", q: "Listen openly during strong disagreement?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Listening Under Pressure", q: "Listen carefully in fast conversations?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Listening Under Pressure", q: "Listen to feedback before defending?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Listening Under Pressure", q: "Rating by others as a listener?", options: ["Poor","Below avg","Average","Good","Excellent"] }
    ]
  },

  {
    id: "attachment",
    title: "Attachment Style Indicator",
    tagline: "How you love, connect, and pull away — and why.",
    description: "Unconscious blueprint shaping behavior in close relationships.",
    questions: 25,
    time: "12 min",
    sections: [
      { name: "Intimacy & Closeness", start: 0, end: 4 },
      { name: "Anxiety & Fear", start: 5, end: 9 },
      { name: "Avoidance & Distance", start: 10, end: 14 },
      { name: "Conflict & Repair", start: 15, end: 19 },
      { name: "Security & Trust", start: 20, end: 24 }
    ],
    questions_data: [
      { section: "Intimacy & Closeness", q: "Easy to let people close emotionally?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Intimacy & Closeness", q: "Feel when someone becomes dependent?", options: ["Overwhelmed","Uncomfortable","Mixed","Comfortable","Warm/Secure"] },
      { section: "Intimacy & Closeness", q: "Able to share inner world?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Intimacy & Closeness", q: "Comfortable with mutual dependence?", options: ["Rarely","Sometimes","Moderately","Often","Almost always"] },
      { section: "Intimacy & Closeness", q: "Feel loved for who you are?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Anxiety & Fear", q: "Worry people don't value you enough?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Anxiety & Fear", q: "Feel when someone becomes distant?", options: ["Fine","Curious","Unsettled","Anxious","Very anxious"] },
      { section: "Anxiety & Fear", q: "Replay interactions for errors?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Anxiety & Fear", q: "Fear of rejection affects behavior?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Anxiety & Fear", q: "Seek reassurance frequently?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Avoidance & Distance", q: "Impulse to withdraw from intensity?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Avoidance & Distance", q: "Prefer emotional distance?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Avoidance & Distance", q: "Deal with emotions alone?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Avoidance & Distance", q: "Keep arm's length to protect independence?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Avoidance & Distance", q: "Difficult to express emotional needs?", options: ["Almost never","Rarely","Sometimes","Often","Almost always"] },
      { section: "Conflict & Repair", q: "Move toward person in conflict?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Conflict & Repair", q: "Able to repair without withdrawal?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Conflict & Repair", q: "Express hurt without exploding/shutting?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Conflict & Repair", q: "Easy to offer genuine apology?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Conflict & Repair", q: "Conflict doesn't permanently damage?", options: ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"] },
      { section: "Security & Trust", q: "Trust people will be there?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Security & Trust", q: "Feel secure in relationships?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Security & Trust", q: "Past hurt affects new relationships?", options: ["Almost always","Often","Sometimes","Rarely","Almost never"] },
      { section: "Security & Trust", q: "Sense of own worthiness of love?", options: ["Rarely","Sometimes","Half time","Often","Almost always"] },
      { section: "Security & Trust", q: "Experience of relationships over life?", options: ["Painful","Difficult","Mixed","Positive","Deeply nourishing"] }
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
      D: { label: "Dominant Driver", score: 82, color: "#ef4444", description: "You are a natural results-driver. You move fast and think big.", strengths: ["Decisive under pressure","Natural leader","Clear communicator"], watch: ["Can rush decisions","May steamroll others"] },
      I: { label: "Influential Connector", score: 78, color: "#f59e0b", description: "You are a natural energizer. People gravitate toward you.", strengths: ["Relationship builder","Inspiring","Creative"], watch: ["May overpromise","Can avoid hard talks"] },
      S: { label: "Steady Supporter", score: 74, color: "#10b981", description: "You are the backbone of any team. You create harmony.", strengths: ["Reliable","Great listener","Consistent"], watch: ["Can resist change","May suppress own needs"] },
      C: { label: "Conscientious Analyst", score: 79, color: "#6366f1", description: "You are the quality control. You verify before committing.", strengths: ["Attention to detail","Systematic thinker","High standards"], watch: ["Paralysis by analysis","Can seem aloof"] }
    };
    return profiles[primary];
  },

  bigfive: (answers) => {
    const score = answers.reduce((s, a) => s + (4 - a), 0);
    const pct = Math.round((score / (answers.length * 4)) * 100);
    if (pct >= 65) return { label: "High Openness / Extraverted", score: pct, color: "#a855f7", description: "You thrive in dynamic environments.", strengths: ["Adaptable","Collaborative","Innovative"], watch: ["May lose focus","Overlook details"] };
    return { label: "Introverted Analyst", score: pct, color: "#0ea5e9", description: "You excel in focused, solo work.", strengths: ["Focused thinker","Reliable","Disciplined"], watch: ["Drained by social demands","Reserved"] };
  },

  martyr: (answers) => {
    const test = TESTS.find(t => t.id === "martyr");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overallRaw = sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length;
    // For Martyr, high raw score = high martyrdom (inverse of efficiency)
    const overall = Math.round(overallRaw);

    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: sectionScores[i],
      color: sectionScores[i] > 60 ? "#ef4444" : "#10b981",
      description: "This score reflects your tendency in this specific dimension.",
      watch: ["Review how this affects your impact."]
    }));

    return {
      overall,
      overallLabel: overall > 60 ? "High Martyr Pattern" : "High Leverage Operator",
      overallColor: overall > 60 ? "#ef4444" : "#10b981",
      overallDescription: "Your Martyr Index identifies the gap between effort and impact.",
      sectionResults
    };
  },

  signal: (answers) => {
    const test = TESTS.find(t => t.id === "signal");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: sectionScores[i],
      color: sectionScores[i] > 60 ? "#10b981" : "#f59e0b",
      description: "Measuring your ability to filter static.",
      watch: ["Identify noise leaks."]
    }));
    return {
      overall,
      overallLabel: overall > 70 ? "High Signal Thinker" : "Noise Sensitive",
      overallColor: overall > 70 ? "#10b981" : "#f59e0b",
      overallDescription: "Your SNQ measures your attention management.",
      sectionResults
    };
  },

  leadership: (answers) => {
    const test = TESTS.find(t => t.id === "leadership");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const labels = ["Visionary", "Executor", "Coach", "Stabilizer"];
    const primaryIdx = sectionScores.indexOf(Math.max(...sectionScores));

    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: sectionScores[i],
      color: "#6366f1",
      description: `Inhabiting the ${labels[i]} dimension.`,
      watch: ["Balance this with other archetypes."]
    }));

    return {
      overall,
      overallLabel: `Primary: The ${labels[primaryIdx]}`,
      overallColor: "#6366f1",
      overallDescription: "Your scanner reveals your dominant leadership instincts.",
      sectionResults
    };
  },

  ei: (answers) => {
    const test = TESTS.find(t => t.id === "ei");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: sectionScores[i],
      color: sectionScores[i] > 70 ? "#10b981" : "#f59e0b",
      description: "Measuring emotional intelligence foundations.",
      watch: ["Target this area for development."]
    }));
    return {
      overall,
      overallLabel: overall > 70 ? "High EQ Leader" : "EQ Developing",
      overallColor: overall > 70 ? "#10b981" : "#f59e0b",
      overallDescription: "Your audit highlights strengths in interpersonal intelligence.",
      sectionResults
    };
  },

  growth: (answers) => {
    const test = TESTS.find(t => t.id === "growth");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: sectionScores[i],
      color: sectionScores[i] > 70 ? "#10b981" : "#f59e0b",
      description: "Mindset fluidity in this dimension.",
      watch: ["Shift your perspective here."]
    }));
    return {
      overall,
      overallLabel: overall > 70 ? "Growth Dominant" : "Mixed Mindset",
      overallColor: overall > 70 ? "#10b981" : "#f59e0b",
      overallDescription: "This diagnostic measures fixed vs growth patterns.",
      sectionResults
    };
  },

  hardworking: (answers) => {
    const test = TESTS.find(t => t.id === "hardworking");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: sectionScores[i],
      color: sectionScores[i] > 70 ? "#10b981" : "#f59e0b",
      description: "Consistency and work ethic measurement.",
      watch: ["Review your daily routines."]
    }));
    return {
      overall,
      overallLabel: overall >= 75 ? "High-Output Operator" : "Capable but Inconsistent",
      overallColor: overall >= 75 ? "#10b981" : "#f59e0b",
      overallDescription: "The Hardworking Index measures depth and quality of work.",
      sectionResults
    };
  },

  ambition: (answers) => {
    const test = TESTS.find(t => t.id === "ambition");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: sectionScores[i],
      color: sectionScores[i] > 70 ? "#10b981" : "#f59e0b",
      description: "Goal and drive orientation.",
      watch: ["Align goals with values."]
    }));
    return {
      overall,
      overallLabel: overall >= 75 ? "Purposefully Ambitious" : "Emerging Ambition",
      overallColor: "#6366f1",
      overallDescription: "Ambition Spectrum measures your goal clarity and fuel.",
      sectionResults
    };
  },

  loneliness: (answers) => {
    const test = TESTS.find(t => t.id === "loneliness");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: sectionScores[i],
      color: sectionScores[i] > 70 ? "#10b981" : "#f59e0b",
      description: "Connection and belonging scores.",
      watch: ["Nurture these relationships."]
    }));
    return {
      overall,
      overallLabel: overall >= 70 ? "Well-Connected" : "Partially Connected",
      overallColor: overall >= 70 ? "#10b981" : "#ef4444",
      overallDescription: "Measures quality of connection and belonging.",
      sectionResults
    };
  },

  listening: (answers) => {
    const test = TESTS.find(t => t.id === "listening");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: sectionScores[i],
      color: sectionScores[i] > 70 ? "#10b981" : "#f59e0b",
      description: "Attunement and response capability.",
      watch: ["Practice active listening."]
    }));
    return {
      overall,
      overallLabel: overall >= 75 ? "Masterful Listener" : "Capable Listener",
      overallColor: "#10b981",
      overallDescription: "Listening Quotient measures presence and comprehension.",
      sectionResults
    };
  },

  attachment: (answers) => {
    const test = TESTS.find(t => t.id === "attachment");
    const sectionScores = calculateSectionScores(answers, test.sections);
    const adjScores = sectionScores.map((s, i) => (i === 1 || i === 2) ? 100 - s : s);
    const overall = Math.round(adjScores.reduce((s, v) => s + v, 0) / adjScores.length);
    const sectionResults = test.sections.map((sec, i) => ({
      name: sec.name,
      score: (i === 1 || i === 2) ? 100 - sectionScores[i] : sectionScores[i],
      color: "#6366f1",
      description: "Attachment orientation dimension.",
      watch: ["Understand this relational blueprint."]
    }));
    return {
      overall,
      overallLabel: overall >= 72 ? "Securely Attached" : "Insecure Patterns Detected",
      overallColor: "#10b981",
      overallDescription: "Blueprint for connection and intimacy.",
      sectionResults
    };
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

function toggleMobileNav() {
  const drawer = document.getElementById("mobile-drawer");
  drawer.classList.toggle("open");
}

function closeModal() {
  document.getElementById("method-modal").style.display = "none";
}

function handleModalBackdropClick(e) {
  if (e.target === document.getElementById("method-modal")) closeModal();
}

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

  let progressBarHtml = "";
  if (t.sections && t.sections.length) {
    const sectionsHtml = t.sections.map((sec, i) => {
      const isActive = currentQuestion >= sec.start && currentQuestion <= sec.end;
      const isComplete = currentQuestion > sec.end;
      const segProgress = isComplete ? 100 : isActive ? Math.round(((currentQuestion - sec.start) / (sec.end - sec.start + 1)) * 100) : 0;
      return `
        <div style="flex:1; padding: 0 3px;">
          <div style="font-size:0.55rem; font-weight:700; text-transform:uppercase; color:${isActive ? "var(--brand-indigo)" : "var(--text-light)"}; margin-bottom:4px;">${sec.name}</div>
          <div style="background:#e2e8f0; border-radius:10px; height:4px; overflow:hidden;">
            <div style="height:100%; width:${segProgress}%; background:var(--brand-grad); transition:width 0.3s ease;"></div>
          </div>
        </div>
      `;
    }).join("");
    progressBarHtml = `<div style="display:flex; gap:0; width:100%; max-width:600px; margin:0 auto 20px;">${sectionsHtml}</div>`;
  } else {
    progressBarHtml = `<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${(currentQuestion/total)*100}%"></div></div>`;
  }

  document.getElementById("question-area").innerHTML = `
    ${progressBarHtml}
    <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:20px;">Question ${currentQuestion + 1} of ${total}</p>
    <div style="background:white; border-radius:20px; padding:30px; box-shadow:var(--shadow-card); max-width:600px; margin:0 auto 24px; text-align:left;">
      <p style="font-size:1.15rem; font-weight:700; margin-bottom:20px;">${q.q}</p>
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

// ============================================
// REPORT GENERATION
// ============================================
function generateReport() {
  const logic = REPORT_LOGIC[currentTest.id];
  if (!logic) return;
  const result = logic(answers);
  showPage("report");

  if (result.sectionResults) {
    const sectionCards = result.sectionResults.map(sec => `
      <div style="background:#f8fafc; border-radius:12px; padding:16px; margin-bottom:12px; border-left:4px solid ${sec.color || '#6366f1'};">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="font-weight:800; font-size:0.9rem;">${sec.name}</span>
          <span style="font-weight:800; color:${sec.color || '#6366f1'};">${sec.score}/100</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted);">${sec.description}</p>
      </div>
    `).join("");

    document.getElementById("report-page-content").innerHTML = `
      <div style="text-align:center; padding:40px 20px; background:var(--brand-grad); border-radius:24px; color:white; margin-bottom:30px;">
        <p style="text-transform:uppercase; letter-spacing:0.1em; font-size:0.75rem; opacity:0.8;">${currentTest.title} Result</p>
        <h1 style="font-size:3rem; margin:10px 0;">${result.overall}<span style="font-size:1rem;">/100</span></h1>
        <h2>${result.overallLabel}</h2>
      </div>
      <div style="background:white; border-radius:24px; padding:30px; box-shadow:var(--shadow-card);">
        <h3 style="margin-bottom:15px;">Detailed Breakdown</h3>
        ${sectionCards}
        <div style="margin-top:30px;">
           <button class="btn-primary btn-full" onclick="showPage('coaching')">Book Professional Coaching →</button>
           <button class="btn-secondary btn-full" onclick="showPage('tests')" style="margin-top:10px;">Take Another Test</button>
        </div>
      </div>
    `;
  } else {
    // Original Flat Format for DISC / Big Five
    document.getElementById("report-page-content").innerHTML = `
      <div style="text-align:center; padding:40px 20px; background:var(--brand-grad); border-radius:24px; color:white; margin-bottom:30px;">
        <h1>${result.label}</h1>
        <p>Your analysis is complete.</p>
      </div>
      <div style="background:white; border-radius:24px; padding:30px; box-shadow:var(--shadow-card);">
        <p>${result.description}</p>
        <button class="btn-primary btn-full" onclick="showPage('tests')" style="margin-top:20px;">Back to Assessments</button>
      </div>
    `;
  }
}

// ============================================
// COACHING PAGE
// ============================================
function renderCoachingPage() {
  document.getElementById("coaching").innerHTML = `
    <div class="container" style="padding:60px 20px;">
      <h1>Book A <span class="text-gradient">Coaching Session</span></h1>
      <p>Take your analysis to the next level with a personalized performance plan.</p>
      <div class="coaching-card" style="max-width:500px; margin:40px auto; background:white; padding:30px; border-radius:20px; box-shadow:var(--shadow-card);">
        <form onsubmit="event.preventDefault(); alert('Request Sent!');">
          <input class="main-input" type="text" placeholder="Full Name" required>
          <input class="main-input" type="email" placeholder="Email Address" required>
          <textarea class="main-input" placeholder="What is your main career goal?" rows="4"></textarea>
          <button class="btn-primary btn-full">Submit Request</button>
        </form>
      </div>
    </div>
  `;
}

// ============================================
// INIT
// ============================================
showPage("home");

// UI Helpers (Shake & Styles)
const style = document.createElement('style');
style.textContent = `
  .answer-option { display:flex; align-items:center; gap:12px; padding:15px; border:2px solid #e2e8f0; border-radius:12px; cursor:pointer; transition:0.2s; font-weight:600; }
  .answer-option:hover { border-color:var(--brand-indigo); background:#f8fafc; }
  .answer-option.selected { border-color:var(--brand-indigo); background:rgba(99,102,241,0.05); color:var(--brand-indigo); }
  .answer-letter { width:24px; height:24px; border-radius:50%; background:#f1f5f9; display:flex; align-items:center; justify-content:center; font-size:0.7rem; }
  .answer-option.selected .answer-letter { background:var(--brand-indigo); color:white; }
`;
document.head.appendChild(style);