const TESTS = [
  {
    id: "GrowthMindset",
    category:"Mindset",
    followUp: "Do you want to turn these insights into a permanent growth strategy?",
    keyword: "growth",
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
    id: "AIusage",
    category: "Orientation",
    followUp: "Ready to move from basic usage to AI-powered mastery?",
    keyword: "ai-native",
    title: "AI-Readiness Baseline",
    tagline: "Measure your proficiency and integration of AI tools.",
    description: "AI is no longer a futuristic concept; it is a current cognitive multiplier. This diagnostic measures your 'AI Quotient' across five dimensions: Daily Adoption, Literacy, Interaction Skill, Ethics, and Integration. By identifying your readiness level, you can transition from using AI as a simple search engine to a sophisticated strategic partner in your life and work.",
    questions: 25,
    time: "12 min",
    icon: "💡",
    highlights: ["Prompt Engineering", "Algorithmic Literacy", "Ethical Discernment"],
    sections: [
      { name: "Adoption", start: 0, end: 4 },
      { name: "Literacy", start: 5, end: 9 },
      { name: "Skill", start: 10, end: 14 },
      { name: "Ethics", start: 15, end: 19 },
      { name: "Growth", start: 20, end: 24 }
    ],
    questions_data: [
        // Daily Utility & Adoption
        { section: "Daily Adoption", q: "I use AI-powered assistants (Siri, Alexa, Google Assistant) to manage my daily tasks.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Daily Adoption", q: "I use Generative AI (ChatGPT, Gemini, etc.) to draft personal or professional emails and messages.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Daily Adoption", q: "I use AI tools to summarise long-form content to save time.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Daily Adoption", q: "I consult AI for lifestyle planning, such as workout routines, meal plans, or travel itineraries.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Daily Adoption", q: "I use AI-driven navigation (Google Maps, Waze) to optimise my commute.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        // Knowledge & Literacy
        { section: "Knowledge & Literacy", q: "I can explain the difference between a standard search engine (like Google) and a chatbot (like Gemini).", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Knowledge & Literacy", q: "I realise that AI models can sometimes provide incorrect information confidently.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Knowledge & Literacy", q: "I recognise when an image, video, or audio clip I see online has been generated or altered by AI.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Knowledge & Literacy", q: "I understand the basic privacy risks of sharing sensitive or personal information with public AI models.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Knowledge & Literacy", q: "I realise that AI's knowledge is based on specific training data and may not know today's live news.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        // Skill & Interaction
        { section: "Skill & Interaction", q: "I know how to write a 'prompt' that includes context and clear constraints.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Skill & Interaction", q: "I am comfortable 'iterating' with AI (asking follow-up questions to refine the original answer).", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Skill & Interaction", q: "I know how to ask AI to change its tone (e.g., 'Make this sound more professional').", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Skill & Interaction", q: "I am capable of using AI to troubleshoot basic technical problems or learn a new software tool.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Skill & Interaction", q: "I use 'Multi-modal' features (such as uploading a photo of a broken item for the AI to analyse).", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        // Critical Thinking & Ethics
        { section: "Critical Thinking & Ethics", q: "I cross-check important facts or data points provided by AI with a reliable secondary source.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Critical Thinking & Ethics", q: "I am conscious of potential biases in AI responses regarding gender, culture, or opinion.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Critical Thinking & Ethics", q: "I avoid using AI-generated content 'as is' and always edit the content.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Critical Thinking & Ethics", q: "I am aware of the copyright and intellectual property debates surrounding AI-generated art and text.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Critical Thinking & Ethics", q: "I actively manage my data settings within AI apps to control what information is saved or used for training.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        // Integration & Growth
        { section: "Integration & Growth", q: "I have replaced at least one repetitive daily task (e.g., data entry, proofreading) with an AI-automated workflow.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Integration & Growth", q: "I use AI for brainstorming ideas when I feel stuck on a project or hobby.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Integration & Growth", q: "I keep up with new AI features or tools by reading tech news, watching tutorials, or experimenting.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Integration & Growth", q: "I am comfortable using AI to help me learn a new language or a complex skill.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Integration & Growth", q: "I view AI as a tool that improves my human intelligence rather than a threat to my personal productivity.", options: ["Almost Always", "Often", "Sometimes", "Rarely", "Never"] }
    ]
  },
  {
    id: "MartyrIndex",
    category:"Mindset",
    followUp: "Are you ready to stop suffering productively?",
    keyword: "martyr",
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
    id: "ProcrastinationBlueprint",
    category: "Orientation",
    followUp: "Ready to lower the barrier to action and reclaim your time?",
    keyword: "initiative",
    title: "Procrastination Blueprint",
    tagline: "Understand the gap between your intentions and your actions.",
    description: "Procrastination is not a time-management problem; it is an emotional regulation challenge. This assessment analyzes your 'Initiative Threshold'—the amount of mental energy you require to start a daunting task. By identifying your specific triggers (Clarity Dependency, Dopamine Sensitivity, or Anxiety), we can build an architecture that makes action the default setting of your day.",
    questions: 20,
    time: "9 min",
    icon: "⏱️",
    highlights: ["Initiative Threshold", "Clarity Dependency", "Dopamine Mapping"],
    sections: [
      { name: "Initiative Threshold", start: 0, end: 4 },
      { name: "Clarity Dependency", start: 5, end: 9 },
      { name: "Immediate Comfort", start: 10, end: 14 },
      { name: "Activation Energy", start: 15, end: 19 }
    ],
    questions_data: [
        { section: "Initiative Threshold", q: "I often spend hours doing 'productive-looking' small tasks (like cleaning or checking email) to avoid starting the one big thing that matters.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Initiative Threshold", q: "I find that I only feel a real surge of focus and energy when the deadline is dangerously close.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Initiative Threshold", q: "I tell myself 'I'll feel more like doing this tomorrow' or 'I need to wait for the right mood.'", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Initiative Threshold", q: "I find the act of 'beginning' a task much more exhausting than the act of actually doing the work.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Initiative Threshold", q: "I have a long list of 'half-started' projects that I intend to return to once I have more time.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Clarity Dependency", q: "I tend to stall on a project if the next step is not 100% clear or defined for me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Clarity Dependency", q: "I spend more time 'researching' and 'gathering information' than I do actually taking action.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Clarity Dependency", q: "If I encounter a minor technical hurdle, I use it as a reason to stop working on the project for the day.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Clarity Dependency", q: "I feel that I need to 'understand' the whole system before I can comfortably start on a small piece of it.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Clarity Dependency", q: "I find it hard to work if my environment isn't 'set up' exactly correctly first.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Immediate Comfort", q: "When a task feels difficult, I have a strong impulse to check my phone or open a browser tab for a quick 'break.'", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Immediate Comfort", q: "I prioritize tasks that give me a quick feeling of success over those that are more important but take longer.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Immediate Comfort", q: "I find that I am a 'late-night' or 'early-morning' person purely because that is when there are no other distractions to compete with.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Immediate Comfort", q: "I use 'busyness' as an excuse to avoid the deeper, more emotionally taxing work I know I should be doing.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Immediate Comfort", q: "I am more motivated by the fear of consequences than I am by the excitement of the goal.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Activation Energy", q: "I find that once I actually start a task, it is rarely as difficult as I imagined it would be.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Activation Energy", q: "I require a significant amount of 'ramp-up' time (coffee, organizing, thinking) before I can do deep work.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Activation Energy", q: "I feel a sense of dread when I look at my to-do list in the morning.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Activation Energy", q: "I have difficulty finishing the 'final 5%' of a project once the initial excitement has worn off.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Activation Energy", q: "I judge my day's success by how much I 'thought' about my work, rather than what I actually produced.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
    ]
  },
  {
    id: "SignalNoise",
    category:"Orientation",
    followUp: "Ready to cut through the noise and focus on what truly matters?",
    keyword: "signal",
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
    id: "disc",
    category: "Personality",
    followUp: "Do you want to master your communication style?",
    keyword: "disc", 
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
    category: "Personality",
    followUp: "Ready to see how your personality shapes your future?",
    keyword: "bigfive",
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
    id: "EmotionalIntelligence",
    category:"Personality",
    followUp: "Want to build deeper connections and communicate with more impact?",
    keyword: "ei",
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
    id: "hardworking",
    category:"Orientation",
    followUp: "Ready to turn your hard work into high-impact results?",
    keyword: "hardworking",
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

  // ── LONELINESS ────────────────────────────
  {
    id: "loneliness",
    category:"Personality",
    followUp: "Want to find your tribe and build a stronger sense of belonging?",
    keyword: "loneliness",
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
    id: "listeningIntelligence",
    category:"Orientation",
    followUp: "Want to master your most underrated skill?",
    keyword: "listening",
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
    category:"Personality",
    followUp: "Ready to build relationships that feel safe, steady, and supportive?",
    keyword: "attachment",
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
  },
  {
    id: "leadershipMindset",
    category:"Mindset",
    followUp: "Ready to upgrade your leadership archetype?",
    keyword: "leadership mindset",
    title: "Leadership Mindset Scanner",
    tagline: "The psychological blueprint of your authority.",
    description: "Leadership starts between the ears; it is as much about your internal beliefs as it is about your external actions. This assessment investigates your underlying philosophy regarding human potential, failure, risk tolerance, and trust defaults to uncover the 'invisible architecture' of your decision-making. By identifying these psychological patterns, you can understand how your private beliefs unconsciously shape your team's culture and your own professional ceiling.",
    questions: 20,
    time: "10 min",
    icon: "🧠",
    highlights: ["Potential Beliefs", "Risk Tolerance", "Trust Settings"],
    sections: [
      { name: "Growth Mindset", start: 0, end: 4 },
      { name: "Risk Appetite", start: 5, end: 9 },
      { name: "Trust & Default", start: 10, end: 14 },
      { name: "Success View", start: 15, end: 19 }
    ],
    questions_data: [
        { section: "Growth Mindset", q: "I feel I’ve succeeded as a leader when my team can run brilliantly without me stepping in.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Growth Mindset", q: "I tend to believe that people have a natural 'ceiling' for their talents that is mostly fixed.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Growth Mindset", q: "Deep down, I feel that most people won't really push themselves unless there’s some pressure involved.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Growth Mindset", q: "When we hit a wall, I try to focus more on what the mistake taught us than the fact that we failed.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Growth Mindset", q: "I often find myself betting on someone's future potential rather than just their current skills.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Risk Appetite", q: "I see 'the unknown' as an opportunity to build something new, rather than a threat to what we have.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Risk Appetite", q: "I worry that playing it 'safe' is actually the biggest risk I can take for my career long-term.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Risk Appetite", q: "I find myself leaning toward proven methods because they feel more reliable than a high-stakes gamble.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Risk Appetite", q: "In a crisis, my brain goes straight to 'how do we fix the system?' rather than 'who messed up?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Risk Appetite", q: "I’m comfortable making a big call even when I only have a gut feeling and a few key facts.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Trust & Default", q: "I sometimes worry that being too open with my team might make me look less like a leader.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Trust & Default", q: "I take it personally when someone on my team misses the mark—it feels like my own failure.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Trust & Default", q: "I prefer to give people my full trust from day one and only take it back if they give me a reason to.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Trust & Default", q: "I don’t feel truly confident in a direction until I know the whole team is genuinely on board.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Trust & Default", q: "I feel most useful when I’m the one rolling up my sleeves to solve a tough problem for the group.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Success View", q: "I value 'how' we won as much as the victory.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Success View", q: "I see leadership as a way to support others, not as a way to gain power or status.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Success View", q: "I believe a great leader builds a system that works so well it doesn't need 'heroes' to save the day.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Success View", q: "I get more satisfaction from seeing how much I’ve grown than from hitting a specific target or KPI.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Success View", q: "I have a gut feeling that great leaders are mostly born with it, rather than made through training.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
    ]
  },
  {
    id: "leadershipOrientation",
    category:"Orientation",
    followUP: "Want to optimize where you direct your energy?",
    keyword: "leadership orientation",
    title: "Leadership Orientation Scanner",
    tagline: "Pinpoint exactly where you direct your energy.",
    description: "Most leaders struggle not because they lack talent, but because their daily energy is misaligned with the requirements of their role. This scanner tracks your outward behavioral focus across four key arenas—Operational Execution, Strategic Direction, Human Development, and Structural Integrity—to see where you are truly driving impact. By mapping your default orientation, you can identify high-leverage areas where you excel and critical blind spots that require immediate delegation or system-building.",
    questions: 20,
    time: "10 min",
    icon: "🧭",
    highlights: ["Energy Mapping", "Task/People Balance", "Strategic Bandwidth"],
    sections: [
      { name: "Operational", start: 0, end: 4 },
      { name: "Strategic", start: 5, end: 9 },
      { name: "People", start: 10, end: 14 },
      { name: "Structural", start: 15, end: 19 }
    ],
    questions_data: [
        { section: "Operational", q: "I find that most of my mental energy goes into monitoring current projects and hitting today's deadlines.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Operational", q: "I get a real sense of accomplishment from crossing tasks off the team’s list and seeing immediate progress.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Operational", q: "When I sit down to talk with people I am working with, I prefer to focus on how to fix current problems and clear immediate hurdles.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Operational", q: "When things get stressful, I would rather keep moving and take action quickly than wait until every single detail is perfect.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Operational", q: "I am usually the person who starts getting my hands dirty and doing the actual work alongside everyone else to get it finished.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Strategic", q: "I am usually the person who starts getting my hands dirty and doing the actual work alongside everyone else to get it finished.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Strategic", q: "I am willing to give up a small success today if it helps me build a much more meaningful result a few years from now.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Strategic", q: "When explaining an idea to others, I focus on the overall purpose and the 'why' rather than giving a long list of instructions.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Strategic", q: "I regularly find myself questioning the 'old way' of doing things to see if there is a more creative path toward the future.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Strategic", q: "I feel most alive when I am starting something brand new from scratch and have the freedom to choose a completely new direction.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "People", q: "A large part of my time is spent listening to others, supporting their feelings, and helping them figure out how they want to grow.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "People", q: "I believe the most important part of leading anything is making sure that everyone feels safe, heard, and comfortable being themselves.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "People", q: "I measure my own success by the personal growth and confidence I see in the people I have supported or taught.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "People", q: "I would choose to slow down or stop a project if I realized that the people around me were getting too stressed or unhappy.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "People", q: "I naturally try to figure out what people are truly passionate about so I can encourage them to do more of what they love.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Structural", q: "I enjoy creating clear routines and organized ways of doing things so that everything feels stable and runs smoothly.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Structural", q: "To me, doing a task correctly and avoiding mistakes is the most important part of ensuring that a plan actually works.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Structural", q: "I like setting up clear rules and systems so that things can keep working well even when I am not there to check on them.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Structural", q: "I would much rather have a slow and steady plan that I can rely on than a fast one that feels messy or out of control.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Structural", q: "I see myself as a safeguard—it is my job to spot potential problems and protect our plans from unnecessary risks.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
    ]
  },
  {
    id: "AmbitionMindset",
    category:"Mindset",
    followUp: "Ready to fuel your pursuit with the right mindset?",
    keyword: "ambition mindset",
    title: "Ambition Mindset Diagnostic",
    tagline: "The internal fuel driving your pursuit.",
    description: "Ambition is a powerful engine, but the quality of its fuel determines how far you can go before you burn out. This diagnostic measures the psychological drivers behind your pursuit: distinguishing between intrinsic mastery and the pressure of external validation or status-seeking. We analyze your internal relationship with stagnation, your resilience in the face of public failure, and how deeply your personal self-worth is tethered to your professional achievements.",
    questions: 20,
    time: "9 min",
    icon: "🔥",
    highlights: ["Internal Fuel", "Stagnation Fear", "Success Identity"],
    sections: [
      { name: "Inner Drive", start: 0, end: 4 },
      { name: "Resilience", start: 5, end: 9 },
      { name: "Growth Vision", start: 10, end: 14 },
      { name: "Identity", start: 15, end: 19 }
    ],
    questions_data: [
        { section: "Inner Drive", q: "I find that my most meaningful goals come from a personal desire to improve, rather than a need for other people to notice my progress.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Inner Drive", q: "I often feel that a significant part of my motivation comes from wanting to show people who once doubted me what I am truly capable of.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Inner Drive", q: "I frequently experience a restless internal push to keep getting better, even during times when my life is going perfectly well.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Inner Drive", q: "When I think about success, I believe that money and material possessions are the most honest way to measure how far a person has come.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Inner Drive", q: "I feel a deep, internal pull to master the skills and topics I care about, regardless of whether there is a specific reward waiting for me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Resilience", q: "When I face a major setback or obstacle, I usually find that my determination to succeed grows stronger instead of fading away.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Resilience", q: "I am very sensitive to how I am perceived, and I might walk away from a goal if the path starts to look embarrassing or unsuccessful to others.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Resilience", q: "To me, the idea of staying exactly where I am for the next few years is much more frightening than the risk of trying something new and failing.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Resilience", q: "If I don't succeed at something on my first few attempts, I tend to worry that I simply don't have the natural talent required to do it.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Resilience", q: "I am willing to put in years of quiet, unrecognized effort if I know that it is moving me toward a vision that truly matters to me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Growth Vision", q: "I frequently find myself daydreaming about a future version of my life that is much more expansive and impactful than my current reality.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Growth Vision", q: "I believe that my potential as a person is almost limitless, as long as I am willing to apply the right amount of effort and focus.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Growth Vision", q: "When I plan for the future, I tend to focus on what feels most exciting and inspiring, even if those ideas seem 'unrealistic' to the people around me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Growth Vision", q: "I feel a strong sense of personal responsibility to fully develop and express the hidden talents and abilities I know I have inside me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Growth Vision", q: "The idea that I might one day reach a point where I can no longer grow, learn, or improve is a very uncomfortable thought for me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Identity", q: "If the main projects or goals I am currently focused on were taken away tomorrow, I feel like I would lose my sense of who I am.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Identity", q: "I find it difficult to truly respect or connect with people who seem to have no desire to improve themselves or their circumstances.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Identity", q: "I feel most like my true, authentic self when I am in the middle of a challenge or actively pursuing a clear target.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Identity", q: "I often judge the value of my day based on how much progress I made toward my ambitions, rather than how much I actually enjoyed the time.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Identity", q: "I sometimes use my goals and my drive for success as a way to stay busy and avoid dealing with difficult emotions in other parts of my life.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
    ]
  },
  {
    id: "AmbitionOrientation",
    category:"Orientation",
    followUp: "Ready to optimize how you pursue your goals?",
    keyword: "ambition orientation",
    title: "Ambition Orientation Scanner",
    tagline: "The outward mechanics of your success.",
    description: "Ambition remains a dream until it is translated into a tactical sequence of actions and risks. This scanner measures the outward mechanics of your success, focusing on your goal specificity, your tactical initiative, your networking leverage, and your appetite for calculated bets. By evaluating how you actually pursue your targets in the real world, we reveal the specific behavioral bottlenecks that are currently slowing down your momentum or capping your ultimate potential.",
    questions: 20,
    time: "9 min",
    icon: "🧭",
    highlights: ["Tactical Execution", "Competitiveness", "Social Leverage"],
    sections: [
      { name: "Specificity", start: 0, end: 4 },
      { name: "Initiative", start: 5, end: 9 },
      { name: "Risk Management", start: 10, end: 14 },
      { name: "Leverage", start: 15, end: 19 }
    ],
    questions_data: [
        { section: "Specificity", q: "I make a deliberate effort to clearly define my most important goals in writing rather than keeping them as vague ideas in my head.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Specificity", q: "I have a very clear understanding of exactly what 'success' looks like for me, and I know the specific signs that show I am getting closer to it.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Specificity", q: "I find that my main objectives stay consistent over time, and I don't frequently abandon them or change my mind based on how I am feeling that day.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Specificity", q: "I am effective at breaking down my largest ambitions into small, manageable daily tasks that I can actually act on immediately.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Specificity", q: "I set aside time at least once a week to look at my progress and honestly evaluate whether I am moving forward or standing still.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Initiative", q: "When a new opportunity appears or a project needs to start, I am usually the person who takes the lead and makes the first move.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Initiative", q: "I often find myself spending more time over-thinking and planning my next move than actually doing the work required to succeed.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Initiative", q: "I find that I am more motivated and perform better when I am in an environment where I can compare my progress to others.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Initiative", q: "I am willing to put in more time and energy than the people around me if it means I can get a better result or finish more quickly.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Initiative", q: "I am careful to focus my energy on the activities that will have the biggest impact, rather than just staying busy with small, easy tasks.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Risk Management", q: "I am willing to give up a significant amount of my current comfort or security if it gives me a real chance at massive personal growth.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Risk Management", q: "Before I take a big leap, I always make sure I have a backup plan or a safety net in case my primary idea doesn't work out.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Risk Management", q: "I would rather stick with a path that guarantees a small, safe result than take a chance on an opportunity that might fail completely..", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Risk Management", q: "I am comfortable continuing to work toward a goal even if I am the only person who believes it is possible to achieve it.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Risk Management", q: "I am very protective of my physical and mental energy, making sure I don't push myself so hard that I burn out before I reach my target.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Social Leverage", q: "I deliberately try to spend time with and learn from people who are much further ahead in life or skills than I currently am.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Social Leverage", q: "I am comfortable reaching out to my friends, family, or acquaintances to ask for help or advice to help me reach my goals faster.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Social Leverage", q: "I find it easy to ask for favors or introductions from others, even if I'm not sure if I can return the favor immediately.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Social Leverage", q: "I believe that building the right relationships is more important for reaching a goal than just working hard on my own.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Social Leverage", q: "I enjoy helping others reach their targets because I believe that building a community of successful people benefits everyone.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
    ]
  },
  {
    id: "StressResilience",
    category: "Mindset",
    followUp: "Do you want to build a customized stress-prevention roadmap?",
    keyword: "resilience",
    title: "Stress Resilience Map",
    tagline: "Understand how you process and navigate pressure.",
    description: "Stress is not a sign of weakness; it is a biological response to high-stakes environments. This diagnostic maps your unique resilience profile across five key dimensions: Internal Regulation, Tactical Relief, Perspective, Social Scaffolding, and Prevention. By understanding your processing style, you can stop fighting your natural reactions and start engineering a lifestyle that sustains your high performance without the cost of burnout.",
    questions: 20,
    time: "10 min",
    icon: "🌊",
    highlights: ["Internal Regulation", "Cognitive Reframing", "Support Scaffolding"],
    sections: [
      { name: "Regulation", start: 0, end: 3 },
      { name: "Relief", start: 4, end: 7 },
      { name: "Perspective", start: 8, end: 11 },
      { name: "Scaffolding", start: 12, end: 15 },
      { name: "Prevention", start: 16, end: 19 }
    ],
    questions_data: [
        { section: "Regulation", q: "When a situation becomes unexpectedly high-pressure, I find it relatively easy to maintain a steady emotional rhythm.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Regulation", q: "I notice physical signs of stress (like a tight chest or jaw) early enough to address them before they overwhelm me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Regulation", q: "After a high-stress event, I can usually return to a calm state within a short amount of time.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Regulation", q: "I find myself making impulsive decisions when I feel pushed for time or under scrutiny.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Relief", q: "I have a specific 'toolkit' of activities (like breathing, walking, or music) that I use to lower my stress levels in real-time.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Relief", q: "I am comfortable stepping away from a problem for a few minutes to reset my brain when I feel stuck.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Relief", q: "I tend to rely on unhealthy distractions (like mindless scrolling or over-eating) to escape the feeling of pressure.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Relief", q: "I can effectively communicate to others that I need space without feeling guilty or defensive.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Perspective", q: "When facing a difficult challenge, I am able to see the potential for growth rather than just the potential for failure.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Perspective", q: "I find it helpful to look at my current stressors from a 'one year from now' perspective to reduce their intensity.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Perspective", q: "I tend to catastrophize—imagining the worst possible outcome as soon as something goes wrong.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Perspective", q: "I believe that I have the internal resources and skills necessary to handle most of the stress life throws at me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Scaffolding", q: "I have at least two people in my life I can call to discuss my stress without feeling like a burden.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Scaffolding", q: "I find that talking through a stressful situation with someone else helps me process it much faster than staying silent.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Scaffolding", q: "I am willing to ask for help with my daily responsibilities when I feel my bandwidth is reaching its limit.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Scaffolding", q: "I feel that the people I spend the most time with contribute positively to my emotional stability.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Prevention", q: "I prioritize regular rest and quality sleep as a non-negotiable part of my success strategy.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Prevention", q: "I am effective at saying 'no' to new commitments when my current schedule is already full.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Prevention", q: "I have a morning or evening routine that helps me mentally 'offload' the weight of the day.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Prevention", q: "I regularly take time to analyze what is causing me stress and look for ways to eliminate the root cause.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
    ]
  },
  // ── 1. THE EGO PROFILE (Ego)
  {
    id: "EgoProfile",
    category: "Mindset",
    followUp: "Ready to transition from protecting your identity to expanding your potential?",
    keyword: "flexible-identity",
    title: "The Ego Profile",
    tagline: "Explore your relationship with being wrong and being challenged.",
    description: "This assessment measures how much mental energy you spend defending your current self-image. Rather than measuring 'arrogance,' we analyze your 'Identity Shield'—the psychological barrier used to protect the ego from feedback, errors, and perceived status threats. Understanding this shield is the first step toward building true psychological flexibility and learning at a much higher velocity.",
    questions: 20,
    time: "10 min",
    icon: "🛡️",
    highlights: ["Feedback Receptivity", "Admission of Error", "Idea Ownership"],
    sections: [
      { name: "Feedback", start: 0, end: 4 },
      { name: "Ownership", start: 5, end: 9 },
      { name: "Error Tolerance", start: 10, end: 14 },
      { name: "Status Baseline", start: 15, end: 19 }
    ],
    questions_data: [
        { section: "Feedback", q: "When someone provides direct critique of my work, my first internal reaction is often to find the flaws in their logic.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Feedback", q: "I find that I am more likely to accept advice if it is delivered by someone I perceive as having a higher status than me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Feedback", q: "I feel a physical sense of discomfort or defensiveness when a group project I worked on is criticized publicly.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Feedback", q: "I tend to replay conversations where I was challenged, mentally refining the 'perfect rebuttal' I should have given.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Feedback", q: "I view unsolicited advice as a subtle suggestion that I am not handling the situation correctly on my own.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Ownership", q: "I find it difficult to fully support a plan if I wasn't involved in its original creation.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Ownership", q: "I feel a strong need to ensure that my specific contributions are clearly identified by leaders or peers.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Ownership", q: "I have a tendency to use 'I' or 'My' more than 'We' or 'Our' when describing a success.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Ownership", q: "I feel a sense of loss or frustration when an idea I proposed is attributed to someone else.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Ownership", q: "I find myself checking if I am 'in the loop' on major decisions as a way to verify my importance to the team.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Error Tolerance", q: "I find it easy to admit to a group that I have changed my mind based on new evidence.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
        { section: "Error Tolerance", q: "When I make a mistake, I am more likely to explain the 'context' (why it happened) than to simply apologize for the error.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Error Tolerance", q: "I worry that admitting I don't know the answer will make others lose confidence in my abilities.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Error Tolerance", q: "I feel an internal pressure to maintain a reputation for always being reliable and correct.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Error Tolerance", q: "If I realize I am wrong in the middle of a debate, I tend to 'pivot' my argument rather than acknowledge the other person's point.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Status Baseline", q: "I find myself comparing my current lifestyle or title to peers who started at the same time as me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Status Baseline", q: "I feel a sudden spike of restlessness or inadequacy when I see a colleague receiving praise that I feel I deserved.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Status Baseline", q: "I am careful about how I present myself on social or professional platforms to ensure I look 'successful.'", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Status Baseline", q: "I find it difficult to genuinely celebrate the success of a peer if they are currently outperforming me in my field.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Status Baseline", q: "I believe that my 'worth' is directly tied to the level of impact I am currently creating.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
    ]
  },

  // ── 2. THE HARMONY VS IMPACT QUOTIENT (People-Pleasing)
  {
    id: "HarmonyVsImpactQuotient",
    category: "Mindset",
    followUp: "Want to learn how to be kind without being a pushover?",
    keyword: "assertive-impact",
    title: "Harmony vs. Impact Quotient",
    tagline: "Analyze the balance between social safety and results.",
    description: "Do you trade your long-term influence for short-term peace? This assessment measures your 'Harmony Default'—the subconscious tendency to prioritize the feelings of others over the objectives of the group. While empathy is a skill, chronic harmony-seeking can lead to decision-debt and personal burnout. We explore your conflict threshold, your relationship with validation, and your ability to hold firm boundaries.",
    questions: 20,
    time: "9 min",
    icon: "🤝",
    highlights: ["Conflict Receptivity", "Boundary Integrity", "Validation Baseline"],
    sections: [
      { name: "Conflict Threshold", start: 0, end: 4 },
      { name: "Validation Need", start: 5, end: 9 },
      { name: "Boundary Support", start: 10, end: 14 },
      { name: "Decision Autonomy", start: 15, end: 19 }
    ],
    questions_data: [
        { section: "Conflict Threshold", q: "I find myself choosing to stay silent about a problem if I know that bringing it up will create an awkward atmosphere.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Conflict Threshold", q: "When I have to deliver bad news, I spend a significant amount of time 'softening' the message so no one feels hurt.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Conflict Threshold", q: "I feel a sense of personal anxiety when there is tension in a room, even if I am not involved in the disagreement.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Conflict Threshold", q: "I would rather take on a task I don't like than deal with the discomfort of telling someone 'no' to their face.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Conflict Threshold", q: "I worry that if I am too direct, people will perceive me as aggressive or unkind.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Validation Need", q: "I often find myself checking people's facial expressions after I speak to ensure they approved of what I said.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Validation Need", q: "My internal mood for the day is heavily affected by whether I feel liked and included by my peers.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Validation Need", q: "I struggle to stand by my opinion if the rest of the group seems to be moving in a different direction.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Validation Need", q: "I feel a deep sense of guilt when I think I have let someone down, even if the request was unreasonable.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Validation Need", q: "I find myself apologizing frequently for things that are not actually my fault.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Boundary Support", q: "I often say 'yes' to requests instantly, only to regret it a few minutes later when I realize I don't have the time.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Boundary Support", q: "I feel responsible for 'fixing' other people's bad moods or stress levels.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Boundary Support", q: "I find it difficult to set clear end-times for my availability, leading others to interrupt my personal time.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Boundary Support", q: "I worry that setting a boundary will make me look 'not like a team player.'", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Boundary Support", q: "I feel I must provide a long list of reasons or excuses whenever I have to decline a social or work request.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Decision Autonomy", q: "I frequently ask multiple people for their opinion before making a decision that only affects me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Decision Autonomy", q: "I tend to 'mirror' the energy or the opinions of the person I am currently talking to.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Decision Autonomy", q: "I feel a sense of relief when someone else takes the lead and makes the final choice for the group.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Decision Autonomy", q: "I find myself doing things because I feel I 'should,' rather than because I actually want to.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Decision Autonomy", q: "I would choose a path that makes everyone happy over a path that is correct but unpopular.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
    ]
  },

  // ── 3. THE OUTCOME OPTIMIZATION INDEX (Perfectionism)
  {
    id: "PerfectionismIndex",
    category: "Mindset",
    followUp: "Ready to stop over-engineering and start moving faster?",
    keyword: "optimal-results",
    title: "Outcome Optimization Index",
    tagline: "The thin line between high standards and diminishing returns.",
    description: "Perfectionism is often a mask for the fear of being judged. This diagnostic analyzes where your pursuit of excellence stops adding value and starts becoming a bottleneck. We measure your 'Shipping Velocity'—your ability to release work—and your 'Error Sensitivity.' Learn to distinguish between high-stakes precision and low-leverage over-thinking so you can increase your output without sacrificing your sanity.",
    questions: 20,
    time: "10 min",
    icon: "📐",
    highlights: ["Shipping Velocity", "Error Tolerance", "Process Obsession"],
    sections: [
      { name: "Velocity", start: 0, end: 4 },
      { name: "Error Sensitivity", start: 5, end: 9 },
      { name: "Process Control", start: 10, end: 14 },
      { name: "Post-Release Rumination", start: 15, end: 19 }
    ],
    questions_data: [
        { section: "Velocity", q: "I find it difficult to consider a task 'finished' until I have checked it at least three times.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Velocity", q: "I often miss deadlines or finish at the very last second because I was 'tweaking' minor details.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Velocity", q: "The idea of showing someone a 'rough draft' of my work makes me feel anxious or exposed.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Velocity", q: "I spend more than 20% of my time on a project focusing on aesthetics or formatting that doesn't affect the core result.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Velocity", q: "I frequently feel that if I had just one more day, I could make the project significantly better.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Error Sensitivity", q: "A minor typo or small mistake in a finished product feels like a stain on my professional reputation.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Error Sensitivity", q: "I tend to remember the one thing that went wrong in a project more than the ten things that went right.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Error Sensitivity", q: "I am much harsher on my own mistakes than I am on the mistakes of the people I work with.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Error Sensitivity", q: "I feel that any result below 'flawless' is a sign of personal laziness or lack of care.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Error Sensitivity", q: "When I receive feedback that is 90% positive, I spend most of my mental energy obsessing over the 10% negative.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Process Control", q: "I believe that there is one 'perfect' way to do things and I get frustrated when others deviate from it.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Process Control", q: "I find it hard to delegate tasks because I worry that the other person won't follow the exact steps I would use.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Process Control", q: "I often get so caught up in the 'process' or the 'tools' that I lose sight of the actual goal.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Process Control", q: "I find it difficult to relax until my workspace or my to-do list is perfectly organized.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Process Control", q: "I value 'doing it right' more than 'doing it fast,' even for tasks where speed is the priority.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Post-Release Rumination", q: "After I hit 'send' or finish a project, I immediately start thinking about all the things I could have done differently.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Post-Release Rumination", q: "I find it hard to enjoy a victory because I am already worrying about maintaining that standard for the next task.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Post-Release Rumination", q: "I have difficulty sleeping when I feel a project I am working on is in an 'imperfect' state.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
        { section: "Post-Release Rumination", q: "I feel a sense of 'shame' when I look back at work I produced a year ago, even if it was successful at the time.", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never"] },
        { section: "Post-Release Rumination", q: "I judge my self-worth by the quality of my latest output.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
    ]
  },
  
];

window.TESTS = TESTS;
