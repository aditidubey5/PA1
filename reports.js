const REPORT_LOGIC = {
AIusage: (answers) => {
    const sectionDefs = [
      {
        name: "Daily Adoption",
        range: [0, 4],
        descriptions: {
          high: "You are an early adopter. AI is already woven into the fabric of your daily life, saving you significant time.",
          mid: "You use AI for specific tasks but haven't yet explored its full utility as a daily personal assistant.",
          low: "You are currently using manual workflows for tasks where AI could provide immediate relief."
        },
        watchHigh: ["Audit your 'AI-Dependency'—ensure you still maintain your own problem-solving muscles.", "Explore niche AI tools beyond just the big names."],
        watchMid: ["Experiment with using AI for one lifestyle task (meal planning/travel) this week.", "Set up a shortcut for your favorite AI tool on your phone home screen."],
        watchLow: ["Start small: ask a chatbot to draft one difficult email today.", "Check if your existing phone apps have AI features you've been ignoring."]
      },
      {
        name: "Knowledge & Literacy",
        range: [5, 9],
        descriptions: {
          high: "You have a deep understanding of how Large Language Models work, including their risks and limitations.",
          mid: "You have a functional understanding of AI, but may be vulnerable to hallucinations or data-privacy slips.",
          low: "You are treating AI like a standard search engine, which may lead to misinformation or security risks."
        },
        watchHigh: ["Keep up with the 'Agentic AI' shift—the next wave of AI that takes actions on your behalf.", "Teach a peer about AI hallucinations to solidify your knowledge."],
        watchMid: ["Read one article on 'Data Privacy in Generative AI'.", "Practice identifying the 'cutoff date' of the specific model you use."],
        watchLow: ["Remind yourself: AI is a prediction engine, not a fact-checker.", "Never put personal passwords or financial data into a public AI prompt."]
      },
      {
        name: "Interaction Skill",
        range: [10, 14],
        descriptions: {
          high: "You are a master prompter. You know how to provide context and iterate until you get elite results.",
          mid: "You can get what you need from AI, but you often settle for the first answer instead of refining it.",
          low: "Your interactions with AI are currently one-way commands, missing out on the power of collaborative iteration."
        },
        watchHigh: ["Try 'Few-Shot Prompting'—giving the AI 3 examples of the style you want before asking for the result.", "Learn how to use AI System Instructions for permanent personas."],
        watchMid: ["The next time AI gives you a 'good' answer, ask: 'How can we make this 20% better?'", "Experiment with uploading a document or image to see how the AI processes multi-modal data."],
        watchLow: ["Use the 'Act as a...' framework in your next prompt (e.g., 'Act as a career coach').", "Always ask a follow-up question to see how the AI adjusts its logic."]
      },
      {
        name: "Critical Thinking",
        range: [15, 19],
        descriptions: {
          high: "You have a high 'Skepticism Quotient.' You use AI as a collaborator while maintaining total human oversight.",
          mid: "You edit AI content, but you might be over-relying on its logic for important decision-making.",
          low: "You are at risk of 'Algorithmic Bias.' You likely trust AI output too much without checking the human nuance."
        },
        watchHigh: ["Monitor your 'Creative Voice'—ensure the AI isn't flattening your unique style.", "Advocate for ethical AI usage within your community."],
        watchMid: ["For any fact-based task, use the 'Two-Source' rule: verify AI data with a primary source.", "Identify one bias you've noticed in an AI response recently."],
        watchLow: ["Commit to never using 'Copy-Paste' for AI content; always rewrite it in your own voice.", "Acknowledge that AI can be wrong—it is a tool, not an authority."]
      },
      {
        name: "Integration & Growth",
        range: [20, 24],
        descriptions: {
          high: "You are 'AI-Native.' You view technology as an extension of your own intelligence and seek constant growth.",
          mid: "You see the value of AI growth, but your adoption is reactive rather than proactive.",
          low: "You are an 'AI Traditionalist.' You may feel that AI is a threat to your skills or a distraction from 'real' work."
        },
        watchHigh: ["Start a weekly AI experiment: try one tool that is completely outside your comfort zone.", "Think about how you can use AI to solve a community or social problem."],
        watchMid: ["Block 30 minutes a week to watch a tutorial on a new AI feature.", "Identify one repetitive task you hate and find an AI to automate it."],
        watchLow: ["Reframe AI: it isn't here to replace you, but to replace the 'boring' parts of your day.", "Talk to an AI-Native about how they've simplified their workflow."]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const maxScore = sectionAnswers.length * 4;
      // KEY FIX: We use (4 - a) to flip the scale so index 0 = 4 points
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / maxScore) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    let overallLabel, overallColor, overallDescription;

    if (overall >= 85) {
      overallLabel = "AI Native";
      overallColor = "#10b981";
      overallDescription = "You are operating at the leading edge of the AI transition. You have successfully integrated AI into your life as a cognitive partner while maintaining a high level of critical and ethical awareness.";
    } else if (overall >= 40) {
      overallLabel = "Strategic Adopter";
      overallColor = "#f59e0b";
      overallDescription = "You have a solid foundation and use AI effectively for specific tasks. Your path forward involves moving from 'task-based' usage to 'workflow integration'.";
    } else {
      overallLabel = "AI Traditionalist";
      overallColor = "#6366f1";
      overallDescription = "You prefer manual, human-only workflows. While this protects your traditional skills, you are at risk of a 'bandwidth gap' as the world moves toward AI-powered efficiency.";
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

   MartyrIndex: (answers) => {
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
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4  - a) : 0), 0);
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
  SignalNoise: (answers) => {
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
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4-a) : 0), 0);
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

  hardworking: (ans) => {
    const t = TESTS.find(x => x.id === "hardworking");
    const s = calculateSectionScores(ans, t.sections);
    const overall = Math.round(s.reduce((a,b)=>a+b,0)/s.length);
    const results = t.sections.map((sec, i) => ({
      name: sec.name, score: s[i], color: "#10b981",
      description: "Productivity depth.",
      watch: ["Maintain consistency."]
    }));
    return { overall, overallLabel: "High Output", overallColor: "#10b981", overallDescription: "Depth and quality of effort.", sectionResults: results };
  },
  // ── EMOTIONAL INTELLIGENCE (DETAILED) ────
  EmotionalIntelligence: (answers) => {
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
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4-a) : 0), 0);
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
  GrowthMindset: (answers) => {
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
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4-a) : 0), 0);
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
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
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
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
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
  listeningIntelligence: (answers) => {
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
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
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
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
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
  },
  // ── LEADERSHIP MINDSET REPORT ───────────────────
  leadershipMindset: (answers) => {
    const sectionDefs = [
      {
        name: "Growth & Potential",
        range: [0, 4],
        descriptions: {
          high: "You have a deep-seated belief in human evolution. You view team members as 'expanding assets' and naturally look for latent talent rather than just fixed competencies.",
          mid: "You believe in development but often prioritize immediate results over long-term growth. You develop people when time permits, but tend to revert to 'managing' during stress.",
          low: "You tend to have a static view of talent. You likely focus on 'hiring the solution' rather than building it, which can lead to team stagnation or high turnover."
        },
        watchHigh: ["Don't let optimism blind you to current performance gaps that need direct correction.", "Ensure you aren't over-investing in people who do not actually want to grow."],
        watchMid: ["Try delegating 'stretch goals' that are 10% beyond a person's current ability.", "Practice seeing failure as a diagnostic data point rather than a performance failure."],
        watchLow: ["Explore the 'Growth Mindset' framework for management.", "Shift your feedback from 'what you did wrong' to 'how you can evolve.'"]
      },
      {
        name: "Risk Appetite",
        range: [5, 9],
        descriptions: {
          high: "You are psychologically resilient to ambiguity. You thrive when the path isn't clear and view calculated risks as the only way to achieve outsized results.",
          mid: "You are a pragmatist. You take risks when the data supports them, but you may stall or over-analyze when the stakes are high and the outcome is uncertain.",
          low: "You have a strong need for certainty and control. While this protects the organization from loss, it often causes you to miss major market or innovation shifts."
        },
        watchHigh: ["Ensure your team feels safe following you into the unknown; not everyone shares your risk tolerance.", "Balance your gut instincts with at least two hard metrics."],
        watchMid: ["Identify one 'Safe bet' you are holding onto and intentionally stress-test it.", "Practice making small, non-critical decisions faster to build your intuition."],
        watchLow: ["Understand that 'no decision' is actually a high-risk decision.", "Build a 'Risk Budget'—a small area where the team is allowed to fail without penalty."]
      },
      {
        name: "Trust & Default",
        range: [10, 14],
        descriptions: {
          high: "Your leadership is rooted in trust. You empower others by default and view your role as a facilitator of talent rather than a checkpoint of authority.",
          mid: "You trust your team but maintain a 'veto power' that can bottleneck progress. You delegate the tasks, but often find it hard to delegate the actual authority.",
          low: "You lean toward a command-and-control mindset. You believe that direct oversight is the only way to ensure quality, which limits your ability to scale."
        },
        watchHigh: ["Make sure you aren't abdicating responsibility when things go wrong.", "Verify that your high-trust doesn't turn into a lack of accountability."],
        watchMid: ["Identify one project this week to delegate 100%—including the final decision-making power.", "Ask more questions and give fewer answers in 1-on-1s."],
        watchLow: ["Ask yourself: 'Am I scaling the business or just scaling my own workload?'", "Evaluate how your constant oversight affects your team's initiative and morale."]
      },
      {
        name: "Success View",
        range: [15, 19],
        descriptions: {
          high: "You define success through systemic health and team well-being. You lead with a service-oriented heart, believing that a healthy culture automatically produces results.",
          mid: "Your definition of success is a mix of personal achievement and team contribution. You care about the people, but the KPI is usually the loudest voice in your head.",
          low: "You view success through the narrow lens of ego or individual performance metrics. You may reach targets, but often at a high cost to team sustainability."
        },
        watchHigh: ["Don't sacrifice necessary results for the sake of harmony.", "Ensure your 'service' to the team doesn't lead to your own burnout."],
        watchMid: ["Re-align your daily tasks with your deeper 'Why' once a month.", "Celebrate small team wins as intentionally as you celebrate the big quarterly targets."],
        watchLow: ["Shift your internal narrative from 'I achieved' to 'We enabled'.", "Practice active listening to understand what success looks like for your team members."]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    let overallLabel = overall >= 75 ? "Empathetic Growth Leader" : overall >= 50 ? "Balanced Pragmatist" : "Control-Oriented Traditionalist";
    
    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor: "#6366f1", overallDescription: "Analysis of your internal leadership blueprint.", sectionResults };
  },

  // ── LEADERSHIP ORIENTATION REPORT ────────────────
  leadershipOrientation: (answers) => {
    const sectionDefs = [
      {
        name: "Operational Execution",
        range: [0, 4],
        descriptions: {
          high: "You are a 'Tactical Driver.' Your focus is on the 'Now'—ensuring that plans become reality with high speed and absolute precision.",
          mid: "You are productive but can get caught in the 'messy middle' between doing the work and directing it. You ensure progress but may lack a high-speed edge.",
          low: "You often lose sight of the tactical steps required to finish. You may have great ideas that fail to launch because the 'boring' work is ignored."
        },
        watchHigh: ["Watch for team burnout; not everyone can maintain your 'sprint' pace forever.", "Make sure you don't confuse being 'busy' with being 'effective'."],
        watchMid: ["Use a more structured project management tool to visualize the finish line.", "Delegate one routine task today to reclaim one hour for strategic thinking."],
        watchLow: ["Connect your big ideas to a specific 'Tuesday morning' to-do list.", "Focus on closing open loops before starting new ones."]
      },
      {
        name: "Strategic Direction",
        range: [5, 9],
        descriptions: {
          high: "You are a 'Visionary Architect.' You focus on the North Star and where the organization is heading 3 years from now.",
          mid: "You have a vision but often struggle to communicate it in a way that feels actionable to the people responsible for doing it.",
          low: "You are operating reactively. You spend your day responding to the fire of the hour rather than building the firebreak for the year."
        },
        watchHigh: ["Ensure your vision is grounded in current resource reality.", "Partner with a strong 'Operational' leader to land your big ideas."],
        watchMid: ["Write down your 3-year plan and share it with a peer to check for clarity.", "Block out 2 hours of 'Strategy Only' time on your calendar weekly."],
        watchLow: ["Read industry research for 30 minutes every morning before opening email.", "Ask: 'What will this decision look like in 12 months?' before acting."]
      },
      {
        name: "Human Development",
        range: [10, 14],
        descriptions: {
          high: "You are a 'People Coach.' You believe that scaling a business is impossible without scaling the human beings within it.",
          mid: "You care about the team but often let 'the work' interrupt your investment in them. You are a supportive boss but an inconsistent mentor.",
          low: "You see people as 'units of production.' You focus on the output, which build building a fragile, high-turnover culture."
        },
        watchHigh: ["Don't let your empathy prevent you from holding people to high standards.", "Set clear performance boundaries early to avoid 'empathy traps.'"],
        watchMid: ["Schedule non-negotiable 1-on-1s that focus ONLY on growth, not project updates.", "Practice asking for feedback from your team as much as you give it."],
        watchLow: ["Identify the career goals of your top 3 employees this week.", "Acknowledge great work publicly to build social capital."]
      },
      {
        name: "Structural Integrity",
        range: [15, 19],
        descriptions: {
          high: "You are a 'System Designer.' You build machines that run without you. You prioritize scalability and predictability.",
          mid: "You appreciate process but your systems are often fragile or live 'in your head,' making it difficult for the team to operate autonomously.",
          low: "You lead through chaos. You may find process 'stifling,' which leads to repeated mistakes and a culture of 'hero-fixes'."
        },
        watchHigh: ["Ensure your systems don't become red-tape that kills agility.", "Be willing to break a process if it's no longer serving the goal."],
        watchMid: ["Document one key workflow this week that everyone uses.", "Look for one automation opportunity in your daily routine."],
        watchLow: ["Recognize that 'boring' work (SOPs) is what allows for 'exciting' growth.", "Pick the most repetitive mistake in your team and build a checklist to stop it."]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const labels = ["Tactical Driver", "Strategic Visionary", "People Coach", "System Architect"];
    const primaryIdx = sectionScores.indexOf(Math.max(...sectionScores));

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#6366f1" : score >= 40 ? "#a855f7" : "#94a3b8";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel: labels[primaryIdx], overallColor: "#6366f1", overallDescription: "Energy allocation analysis.", sectionResults };
  },

  // ── AMBITION MINDSET REPORT ─────────────────────
  ambitionMindset: (answers) => {
    const sectionDefs = [
      {
        name: "Inner Drive",
        range: [0, 4],
        descriptions: {
          high: "Your fuel is almost entirely intrinsic. You chase goals for the sake of mastery and alignment with your potential.",
          mid: "Your drive is a hybrid. You are motivated by passion, but you require external validation or status to feel 'successful'.",
          low: "Your ambition is externally dependent. You are likely chasing what you think you *should* want, making motivation fragile."
        },
        watchHigh: ["Watch for 'Ambition Blindness'—don't neglect your health or relationships.", "Stay connected to who you are today."],
        watchMid: ["Identify which 20% of your goals are purely for 'status' and consider dropping them.", "Focus on the internal win."],
        watchLow: ["Find one activity you would do even if you could never tell anyone about it.", "Explore your deeper 'Why'."]
      },
      {
        name: "Failure Resilience",
        range: [5, 9],
        descriptions: {
          high: "You view failure as premium data. Setbacks sharpen your focus rather than dulling your spirit.",
          mid: "You recover eventually, but setbacks take a heavy emotional toll. You spend time in self-criticism first.",
          low: "Failure feels like a judgment on your worth. You likely avoid 'Big Bets' to protect your ego."
        },
        watchHigh: ["Share your 'Failure Stories' with others to humanize your success.", "Don't stop doing thorough risk assessments."],
        watchMid: ["Practice the '15-minute vent'—vent after a failure, then pivot immediately to 'Lesson Mode'.", "Keep a Success Journal."],
        watchLow: ["Look at a failure from 2 years ago—what did it teach you?", "Separate your identity from your results."]
      },
      {
        name: "Growth Vision",
        range: [10, 14],
        descriptions: {
          high: "You see no ceiling. Your vision for your life is expansive, and you believe your greatest work is always ahead of you.",
          mid: "You aim high but often tether your vision to what is 'realistic.' You stretch within seen boundaries.",
          low: "Your vision is limited by your current context. You struggle to imagine a life much larger than today."
        },
        watchHigh: ["Balance your 'future' self with your 'present' self.", "Ensure your vision includes well-being."],
        watchMid: ["Write a 'No-Limits' 5-year plan this week—ignore logic for 10 minutes.", "Question your definition of 'realistic.'"],
        watchLow: ["Read biographies of people who started from zero.", "Spend 10 minutes a day visualizing success."]
      },
      {
        name: "Work Identity",
        range: [15, 19],
        descriptions: {
          high: "Ambition is your core identity. You define yourself through your impact, which provides massive focus.",
          mid: "Your career is a major anchor, but you have other stable identities. You are balanced.",
          low: "You separate your 'self' from your 'work.' This provides safety, but may lack the elite-level 'obsessive' edge."
        },
        watchHigh: ["Intentionally build an identity outside of work to prevent a crisis if work stalls.", "Mind your health."],
        watchMid: ["Ensure your restful activities are actually restful.", "Review your values annually."],
        watchLow: ["Connect your personal values to your professional output.", "Find a way to make work 'personal.'"]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const overallLabel = overall >= 75 ? "Relentless Pursuer" : overall >= 45 ? "Pragmatic Achiever" : "Under-Fuelled Talent";

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor: "#f59e0b", overallDescription: "Psychological drive analysis.", sectionResults };
  },

  // ── AMBITION ORIENTATION REPORT ──────────────────
  ambitionOrientation: (answers) => {
    const sectionDefs = [
      {
        name: "Goal Specificity",
        range: [0, 4],
        descriptions: {
          high: "You are tactically clear. You know exactly what success looks like and what the next three steps are.",
          mid: "You have a general destination, but your milestones are often blurry, causing wasted energy on course correction.",
          low: "You operate on 'vibes' rather than targets. You move in a general direction but lack concrete metrics."
        },
        watchHigh: ["Don't become so rigid with metrics that you miss unexpected opportunities.", "Ensure goals are values-aligned."],
        watchMid: ["Apply the SMART framework to your single most important goal today.", "Track metrics once a week."],
        watchLow: ["Write down one measurable goal for this month.", "Use a simple tracking app or a physical planner."]
      },
      {
        name: "Tactical Initiative",
        range: [5, 9],
        descriptions: {
          high: "You are a self-starter who creates momentum. You don't wait for permission or 'perfect conditions'.",
          mid: "You take initiative when the path is clear, but you hesitate when the project is complex.",
          low: "You are primarily reactive. You wait for external pressure to move, which means you are always 'following'."
        },
        watchHigh: ["Make sure you aren't running in the wrong direction just to stay busy.", "Pause for strategy daily."],
        watchMid: ["Identify one thing you are 'waiting for permission' to do, and do it today.", "Analyze procrastination patterns."],
        watchLow: ["Find a 'bias-toward-action' partner.", "Start with the '2-minute rule': if it takes < 2 mins, do it now."]
      },
      {
        name: "Risk Management",
        range: [10, 14],
        descriptions: {
          high: "You have a high appetite for calculated risk. You understand that growth lives in the unknown.",
          mid: "You take risks when forced, but prefer the comfort of the known path. Growth is steady but rarely exponential.",
          low: "You are risk-averse. While this protects your current state, it acts as a ceiling on long-term potential."
        },
        watchHigh: ["Ensure you always have a 'downside protection' strategy.", "Don't bet everything on a single outcome."],
        watchMid: ["Identify one 'Safe bet' that is actually costing you opportunity.", "Calculate the 'Cost of Inaction'."],
        watchLow: ["Take one tiny social risk this week.", "Acknowledge that staying still is also a high-risk decision."]
      },
      {
        name: "Social Leverage",
        range: [15, 19],
        descriptions: {
          high: "You understand success is a team sport. You leverage your network to accelerate results and open doors.",
          mid: "You have a good network but you feel 'guilty' when using it to advance goals. You under-utilize capital.",
          low: "You are a 'Lone Wolf.' You try to do everything through individual effort, ignoring multipliers."
        },
        watchHigh: ["Ensure you are giving as much value to your network as you take.", "Mentor someone junior."],
        watchMid: ["Reach out to one person who is 5 years ahead of you.", "Practice 'The Ask'—be direct."],
        watchLow: ["Join one professional community this month.", "Recognize that 'lone-wolfing' doesn't scale."]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    const overallLabel = overall >= 75 ? "High-Impact Strategist" : overall >= 45 ? "Steady Progressor" : "Lone Workhorse";

    const sectionResults = sectionDefs.map((sec, i) => {
      const score = sectionScores[i];
      const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
      const color = score >= 70 ? "#6366f1" : score >= 40 ? "#a855f7" : "#94a3b8";
      const watchKey = "watch" + tier.charAt(0).toUpperCase() + tier.slice(1);
      return { name: sec.name, score, color, description: sec.descriptions[tier], watch: sec[watchKey] };
    });

    return { overall, overallLabel, overallColor: "#6366f1", overallDescription: "Pursuit mechanics analysis.", sectionResults };
  },
  StressResilience: (answers) => {
    const sectionDefs = [
      {
        name: "Internal Regulation",
        range: [0, 3],
        descriptions: {
          high: "You have a high degree of emotional stability. You can stay in the 'driver's seat' even when the environment is chaotic.",
          mid: "Your regulation is solid but situational. You stay calm during familiar stress but may feel a 'biological spike' during brand new challenges.",
          low: "You are a 'Deep Processor'. Your body reacts strongly to pressure, which means you need more deliberate cooling-off periods than most."
        },
        watchHigh: ["Don't mistake calmness for immunity; check your physical health markers even when you feel fine.", "Ensure you aren't suppressing stress to the point of a future collapse."],
        watchMid: ["Practice 'body scanning' once a day to catch physical tension before it becomes a mood.", "Name your emotions out loud to reduce their power."],
        watchLow: ["Focus on 'Box Breathing' (4s in, 4s hold, 4s out, 4s hold) to manually reset your nervous system.", "Schedule 15 minutes of quiet time after every high-stakes interaction."]
      },
      {
        name: "Tactical Relief",
        range: [4, 7],
        descriptions: {
          high: "You have an excellent real-time toolkit. You know how to pivot your state and lower the pressure valve immediately.",
          mid: "You have some relief habits, but you often wait until you are fully overwhelmed before using them.",
          low: "You tend to endure the pressure until it breaks you, or you rely on 'escapism' rather than actual relief."
        },
        watchHigh: ["Keep diversifying your toolkit so your brain doesn't become 'numb' to one specific relief method.", "Share your tactics with your team."],
        watchMid: ["Set a 'Stress Trigger' alarm: if you feel a 7/10 stress, you MUST walk away for 5 minutes.", "Establish a clear boundary between 'Distraction' and 'Recovery'."],
        watchLow: ["Identify two small things (a song, a scent, a stretch) that make you feel 10% better.", "Practice saying 'I need a moment to think' instead of answering immediately."]
      },
      {
        name: "Perspective & Reframing",
        range: [8, 11],
        descriptions: {
          high: "You have a masterful cognitive filter. You can quickly reframe threats into challenges and see the long-term utility of current pain.",
          mid: "You are generally optimistic, but a series of small wins can be easily overshadowed by one large setback.",
          low: "Your internal narrative tends to favor worst-case scenarios, which makes every stressor feel permanent and pervasive."
        },
        watchHigh: ["Ensure your optimism is grounded in reality; don't 'reframe' a situation that actually needs to be fixed.", "Help others reframe without sounding dismissive of their pain."],
        watchMid: ["Apply the '10-10-10' rule: will this matter in 10 minutes? 10 months? 10 years?", "Journal your 'Setback to Growth' history to remind yourself of your resilience."],
        watchLow: ["Write down the 3 facts of the situation and the 3 stories you are telling yourself about it.", "Stop using words like 'always', 'never', and 'disaster'."]
      },
      {
        name: "Social Scaffolding",
        range: [12, 15],
        descriptions: {
          high: "You leverage your social environment effectively. You understand that resilience is a team sport and you lean on your circle.",
          mid: "You have a good support system but you often hesitate to use it because you don't want to seem weak or needy.",
          low: "You are 'Lone-Wolfing' your stress. By processing everything in isolation, you are doubling the weight of every challenge."
        },
        watchHigh: ["Check in on your support system; ensure you are giving back as much emotional energy as you receive.", "Be specific about what kind of help you need (Listening vs. Solving)."],
        watchMid: ["Practice 'low-stakes vulnerability'—share a small frustration with a peer this week.", "Recognize that asking for help is actually an act of competence, not failure."],
        watchLow: ["Identify one person who is a 'Calm Anchor' and spend 10 minutes with them when things get heavy.", "Join a community or peer group where high-stakes discussions are normalized."]
      },
      {
        name: "Proactive Prevention",
        range: [16, 19],
        descriptions: {
          high: "You don't just cope; you architect. You have built a lifestyle that minimizes unnecessary stress and protects your energy.",
          mid: "You understand prevention but often let 'urgent' tasks violate your self-care routines.",
          low: "You are living in a 'Reactive Loop'. You spend your energy fighting fires that could have been prevented with better boundaries."
        },
        watchHigh: ["Be careful not to become too rigid with your routines; maintain the ability to flex when life demands it.", "Review your boundaries quarterly as your responsibilities grow."],
        watchMid: ["Treat your rest like a meeting: put it on the calendar and don't cancel it.", "Identify your 'Yes-person' tendencies and practice saying 'I'll get back to you'."],
        watchLow: ["Audit your calendar: where can you add a 30-minute 'White Space' buffer every day?", "Commit to one non-negotiable sleep habit starting tonight."]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    let overallLabel, overallColor, overallDescription;

    if (overall >= 75) {
      overallLabel = "Resilient Strategist";
      overallColor = "#10b981";
      overallDescription = "You have a highly developed internal architecture for handling pressure. You balance tactical relief with long-term prevention, allowing you to sustain high-stakes performance without compromising your well-being. The opportunity now is to model this for others and guard against complacency.";
    } else if (overall >= 45) {
      overallLabel = "Contextual Adapter";
      overallColor = "#f59e0b";
      overallDescription = "Your resilience is functional but fluctuates. You cope well in certain environments but may lose your 'center' when multiple areas of life get heavy at once. Strengthening your real-time regulation and proactive boundaries will move you toward an elite level of resilience.";
    } else {
      overallLabel = "High-Capacity Processor";
      overallColor = "#6366f1";
      overallDescription = "You feel the weight of life more acutely than most, which often indicates a high level of empathy and conscientiousness. However, your current 'Lone Wolf' approach and reactive habits are creating a bottleneck. Your path forward isn't about being 'tougher', but about building better scaffolding and systems to support your processing style.";
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

  EgoProfile: (answers) => {
    const sectionDefs = [
      {
        name: "Feedback Receptivity",
        range: [0, 4],
        descriptions: {
          high: "You view critique as high-value data. You are able to separate your work from your worth, allowing you to iterate faster than others.",
          mid: "You are open to feedback from trusted sources, but unasked-for advice still triggers a momentary 'Identity Shield' response.",
          low: "Feedback currently feels like an interrogation. You spend significant bandwidth defending your logic rather than investigating the critique."
        },
        watchHigh: ["Ensure your openness doesn't turn into a lack of conviction; stand your ground when the data supports you.", "Model this 'Data-over-Ego' mindset for your peers."],
        watchMid: ["Practice 'Active Inquiry'—when criticized, ask two clarifying questions before explaining your position.", "Notice which specific people trigger your defensiveness."],
        watchLow: ["Ask 'What if they are 10% right?' as a mental exercise.", "Understand that a critique of a project is not a critique of your character."]
      },
      {
        name: "Idea Ownership",
        range: [5, 9],
        descriptions: {
          high: "You optimize for the 'Best Idea,' regardless of where it came from. This intellectual humility makes you a powerful collaborator.",
          mid: "You enjoy collaboration, but you still feel a significant psychological boost when you are recognized as the primary architect of a plan.",
          low: "Your identity is currently tied to being the 'Source.' You may find it difficult to fully commit to plans that you didn't originate."
        },
        watchHigh: ["Be careful of abdicating your own voice too much; your unique perspective is still a vital asset.", "Highlight your team's contributions more often to build a collective shield."],
        watchMid: ["Practice supporting one plan this week that contradicts your original idea.", "Notice if you use 'I' more than 'We' when describing wins."],
        watchLow: ["Remind yourself: 'The goal is to win, not to be the person who found the way to win.'", "Try 'Blind Ideation' where you evaluate ideas without knowing the author."]
      },
      {
        name: "Error Tolerance",
        range: [10, 14],
        descriptions: {
          high: "You have a high 'Public Error Tolerance.' You view mistakes as the cost of innovation and admit them with high velocity.",
          mid: "You admit errors when the evidence is clear, but you often provide a long list of 'context' to explain why the mistake wasn't your fault.",
          low: "Errors feel like 'Identity Cracks.' You likely hide or minimize mistakes to protect your reputation for being reliable and correct."
        },
        watchHigh: ["Don't become 'numb' to errors; ensure you are still conducting rigorous post-mortems.", "Help others feel safe failing by sharing your own 'Failure Resume.'"],
        watchMid: ["Practice the 'Short Apology': admit the error, state the fix, and stop talking.", "Stop explaining the 'Why' unless specifically asked."],
        watchLow: ["Acknowledge one small mistake publicly this week to realize that people’s respect for you actually increases.", "Shift your identity from 'The Person who is never wrong' to 'The Person who learns the fastest.'"]
      },
      {
        name: "Status Baseline",
        range: [15, 19],
        descriptions: {
          high: "You are driven by internal mastery. Your self-worth is rooted in your own progress rather than your position relative to others.",
          mid: "You are generally self-assured, but the sudden success of a peer can still trigger a spike of restlessness or comparison.",
          low: "Your sense of worth is currently 'Comparison-Dependent.' You likely feel most successful only when you are outperforming your immediate circle."
        },
        watchHigh: ["Ensure your 'Mastery' orientation doesn't make you appear aloof or disconnected from team goals.", "Use your stability to anchor others during competitive seasons."],
        watchMid: ["Unfollow social or professional feeds that trigger your 'Status Anxiety' response.", "Define your own 'Success Metrics' that don't involve other people."],
        watchLow: ["Celebrate a peer's win with a handwritten note or a public shout-out to break the comparison loop.", "Recognize that someone else's success is not your failure."]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    let overallLabel, overallColor, overallDescription;

    if (overall >= 75) {
      overallLabel = "Flexible Growth Learner";
      overallColor = "#10b981";
      overallDescription = "You have successfully decoupled your identity from your output. By keeping your 'Identity Shield' low, you absorb information, feedback, and lessons at a much higher rate than your peers. You are an asset in high-innovation environments where iteration is the key to success.";
    } else if (overall >= 45) {
      overallLabel = "Pragmatic Protector";
      overallColor = "#f59e0b";
      overallDescription = "You are balanced but situational. You protect your identity when you feel threatened or exposed, which can occasionally bottleneck your growth. Increasing your comfort with being 'wrong' in public will unlock your next level of professional potential.";
    } else {
      overallLabel = "High-Intensity Identity Shield";
      overallColor = "#6366f1";
      overallDescription = "You spend significant cognitive energy defending your current self. While this makes you look confident, it is acting as a ceiling on your growth. True confidence isn't having all the answers; it's being the person most comfortable saying 'I don't know yet, but I will find out.'";
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
  HarmonyVsImpactQuotient: (answers) => {
    const sectionDefs = [
      {
        name: "Conflict Threshold",
        range: [0, 4],
        descriptions: {
          high: "You view conflict as a necessary tool for clarity. You are willing to endure a 'short-term awkward' moment to solve a 'long-term problem.'",
          mid: "You are honest but 'soft.' You address issues eventually, but you spend so much energy cushioning the message that the urgency is often lost.",
          low: "You trade Truth for Peace. By avoiding the discomfort of disagreement, you are accumulating 'Emotional Debt' that will eventually lead to resentment."
        },
        watchHigh: ["Check your tone; ensure that your directness isn't perceived as unnecessary aggression.", "Leave space for others to process the truth before moving to the solution."],
        watchMid: ["Practice 'Radical Candor': care personally, but challenge directly.", "Stop using 'softener' phrases like 'Maybe I'm wrong but...' or 'Just a thought...'"],
        watchLow: ["Identify one 'unspoken truth' this week and state it in a meeting.", "Acknowledge that conflict is a sign of respect—you care enough about the person to give them the truth."]
      },
      {
        name: "Validation Need",
        range: [5, 9],
        descriptions: {
          high: "You are internally validated. You do what you believe is correct regardless of whether the room is applauding you.",
          mid: "You enjoy external approval, and while it doesn't dictate your decisions, it heavily dictates your stress levels and mood.",
          low: "Approval is your oxygen. You likely check the room's energy before speaking, which makes your leadership feel 'unfiltered' or inconsistent."
        },
        watchHigh: ["Don't become aloof; ensure you are still connected to the social reality of your group.", "Check that you aren't ignoring legitimate social data in favor of 'Lone Wolf' logic."],
        watchMid: ["Do one thing today that you know someone will slightly dislike, just to practice being okay with it.", "Notice when you 'Mirror' the person you are talking to."],
        watchLow: ["Limit your 'Opinion Polls.' When making a personal choice, ask only one trusted source instead of five.", "Recognize that 'Being Liked' is a byproduct of high-impact work, not the goal itself."]
      },
      {
        name: "Boundary Support",
        range: [10, 14],
        descriptions: {
          high: "Your 'No' is a high-value asset. You protect your time and energy so that when you say 'Yes,' you can deliver elite results.",
          mid: "Your boundaries are situational. You say 'no' to peers, but you struggle to say 'no' to authorities or high-status individuals.",
          low: "Your 'Yes' is a debt-generator. You likely over-commit to protect your image, which leads to mediocre work and personal exhaustion."
        },
        watchHigh: ["Explain the 'Why' behind your boundaries so they are seen as protective, not restrictive.", "Teach your boundary logic to your team."],
        watchMid: ["Practice the '24-hour delay.' If a request is made, say 'Let me check my calendar and get back to you' as a default.", "Establish a hard stop time for work."],
        watchLow: ["Stop providing a long list of excuses when you say no. 'I don't have the bandwidth for this right now' is a full sentence.", "Delete work apps for the weekend."]
      },
      {
        name: "Decision Autonomy",
        range: [15, 19],
        descriptions: {
          high: "You own your outcomes. You value input but you don't use consensus as a shield to hide behind.",
          mid: "You decide well, but you prefer to have the 'safety of the group' before moving forward on high-stakes choices.",
          low: "You decide by committee. This slows down momentum and often results in 'average' decisions that satisfy everyone but solve nothing."
        },
        watchHigh: ["Ensure you are building 'Collective Ownership' so the team doesn't feel like you are a dictator.", "Check in on your blind spots."],
        watchMid: ["Make one solo decision today without checking with a peer first.", "Ask yourself: 'If the group hates this, would I still believe it's the right call?'"],
        watchLow: ["Identify one project that you will take 100% responsibility for—the win and the loss.", "Practice stating your opinion *first* in a meeting instead of waiting to see what others say."]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    let overallLabel, overallColor, overallDescription;

    if (overall >= 75) {
      overallLabel = "Impact-First Driver";
      overallColor = "#10b981";
      overallDescription = "You prioritize systemic value over social safety. While you may occasionally create social friction, you are the person who actually lands the mission. You are most effective in high-stakes turnaround environments where clear truth is required.";
    } else if (overall >= 45) {
      overallLabel = "Harmony-Oriented Professional";
      overallColor = "#f59e0b";
      overallDescription = "You are a 'Social Stabilizer.' You maintain the peace and build rapport easily. However, you are likely trading some of your personal impact for the sake of being well-liked. Hardening your boundaries will significantly increase your ROI.";
    } else {
      overallLabel = "Harmony Stabilizer";
      overallColor = "#d946ef";
      overallDescription = "Your current priority is social safety. You are a natural bridge-builder and highly empathetic. However, your 'Harmony Default' is likely causing you to over-function for others and avoid the hard decisions required for your own growth. You deserve to take up more space.";
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
  perfectionism_index: (answers) => {
    const sectionDefs = [
      {
        name: "Shipping Velocity",
        range: [0, 4],
        descriptions: {
          high: "You optimize for momentum. You understand that 'Done is better than Perfect' and you move with high velocity.",
          mid: "You are productive but cautious. You struggle with the 'last 10%' of a project where the impulse to tweak details is highest.",
          low: "You are currently stuck in the 'Optimization Loop.' You spend so much energy on perfection that your actual output volume is low."
        },
        watchHigh: ["Watch for 'Sloppiness' in high-stakes tasks where precision actually matters.", "Ensure your speed doesn't leave your team behind."],
        watchMid: ["Set a 'Hard Ship' time: once the clock hits the hour, you MUST send the version you have.", "Identify your 'Diminishing Returns' threshold."],
        watchLow: ["Practice 'Imperfect Shipping'—send one email or draft today that is only 80% polished.", "Acknowledge that 'Perfect' is often a mask for the fear of being judged."]
      },
      {
        name: "Error Sensitivity",
        range: [5, 9],
        descriptions: {
          high: "You view errors as essential diagnostics. You don't ruminate on mistakes; you simply update your process and move on.",
          mid: "You handle major errors well, but small aesthetic mistakes or typos cause you an outsized amount of internal stress.",
          low: "A minor mistake feels like a character flaw. You likely ruminate on errors for days, which drains your cognitive bandwidth."
        },
        watchHigh: ["Ensure your tolerance for errors doesn't lead to a drop in overall standards.", "Model resilience for your team when things go wrong."],
        watchMid: ["Celebrate the 90% that went right before you obsess over the 10% that went wrong.", "Keep a 'Win Log' to read when a mistake triggers you."],
        watchLow: ["Ask: 'Will this error matter in one year?' If no, limit your rumination to 5 minutes.", "Separate your identity from your latest result."]
      },
      {
        name: "Process Control",
        range: [10, 14],
        descriptions: {
          high: "You optimize for the Result. You are flexible with methods as long as the target is hit.",
          mid: "You appreciate structure, but your need for a 'Specific Way' often makes it hard for you to delegate successfully.",
          low: "Rigidity is your current bottleneck. You value the 'Process' so highly that you often ignore more efficient shortcuts."
        },
        watchHigh: ["Document your 'Result-oriented' successes so they are repeatable.", "Be careful not to appear 'Chaotic' to your structured peers."],
        watchMid: ["Identify one task this week where you will delegate the outcome, but NOT specify the steps.", "Try one new tool or method just to break your pattern."],
        watchLow: ["Recognize that 'Boring' work (SOPs) is what allows for 'Exciting' growth.", "Build a checklist for the *results*, not the actions."]
      },
      {
        name: "Standard Sustainability",
        range: [15, 19],
        descriptions: {
          high: "Your standards are high but sustainable. You know when to apply pressure and when to 'Coast' to prevent burnout.",
          mid: "You set high standards for yourself, but you struggle with the 'Success Burdens'—the pressure to repeat your highest win every time.",
          low: "Your current standards are a threat to your health. You likely feel that any moment of rest is a moment of failure."
        },
        watchHigh: ["Continue to monitor your recovery markers.", "Ensure your standards are inclusive of your team's different processing speeds."],
        watchMid: ["Define what 'Success' looks like *before* you start the task.", "Practice 'Calibrated Standards'—not every task deserves an A+ effort."],
        watchLow: ["Schedule non-negotiable rest as if it were a high-stakes meeting.", "Read about the 'Pareto Principle' (80/20 rule)."]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    let overallLabel, overallColor, overallDescription;

    if (overall >= 75) {
      overallLabel = "Momentum Optimizer";
      overallColor = "#10b981";
      overallDescription = "You are a master of high-quality action. You know exactly how to calibrate your effort to the stakes of the task, allowing you to ship high volumes of work without burning out. You are a natural builder who thrives in fast-paced environments.";
    } else if (overall >= 45) {
      overallLabel = "High-Standard Specialist";
      overallColor = "#f59e0b";
      overallDescription = "You are a precision player. Your work is reliable and high-quality. However, your perfectionism is currently acting as a speed-limiter. By learning to 'Ship early and iterate,' you can double your impact without working more hours.";
    } else {
      overallLabel = "High-Precision Architect";
      overallColor = "#6366f1";
      overallDescription = "You have an elite eye for detail and a deep sense of responsibility. Currently, however, your 'Outcome Protection' is creating a massive bottleneck. You are over-engineering tasks that don't deserve the bandwidth. Learn to distinguish between 'Heart Surgery' tasks (Zero errors allowed) and 'Postcard' tasks (Speed is the only metric).";
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
  ProcrastinationBlueprint: (answers) => {
    const sectionDefs = [
      {
        name: "Initiative Threshold",
        range: [0, 4],
        descriptions: {
          high: "You have a high 'Bias for Action.' You understand that the hardest part of any task is the first 2 minutes, and you are a master of starting.",
          mid: "You start tasks well when you are inspired, but you require a long 'Ramp-up' period for tasks that feel boring or routine.",
          low: "Your 'Starting Threshold' is very high. You likely spend hours in 'Productive Procrastination' (doing easy tasks to avoid the big one)."
        },
        watchHigh: ["Make sure your 'Starting' isn't actually 'Rushing.' Pause for 10% more planning time.", "Ensure you are finishing as well as you are starting."],
        watchMid: ["Use the '5-Minute Rule': Commit to doing the hard task for only 5 minutes. Usually, the momentum carries you through.", "Notice which environments lower your threshold (e.g., library vs home)."],
        watchLow: ["Write down the absolute smallest first step (e.g., 'Open the document').", "Remove the 'Activation Friction'—set up your tools the night before."]
      },
      {
        name: "Clarity Dependency",
        range: [5, 9],
        descriptions: {
          high: "You build clarity through action. You are comfortable moving into a project when it is only 50% clear, knowing you will find the way.",
          mid: "You need a solid plan to act, but you can tolerate a small amount of ambiguity as long as the goal is defined.",
          low: "Ambiguity is your primary trigger for stalling. You likely stop working as soon as you hit a detail you don't fully understand."
        },
        watchHigh: ["Ensure you are communicating enough clarity to the more structured people on your team.", "Check that you aren't ignoring 'Weak Signals' because you are moving too fast."],
        watchMid: ["Practice 'Drafting'—tell yourself 'This is a trash version' to lower the pressure of getting the plan right.", "Set a time-limit for research."],
        watchLow: ["Recognize that 'Gathering more information' is often a stalling tactic.", "Write down your 3 biggest questions and seek answers to ONLY those today."]
      },
      {
        name: "Comfort Mapping",
        range: [10, 14],
        descriptions: {
          high: "You prioritize Long-Term Relief over Short-Term Comfort. You eat the 'Frog' first every morning.",
          mid: "You are a 'Firefighter.' You move fast when the pressure is high, but you drift into comfort loops when the deadlines are distant.",
          low: "You are currently driven by dopamine-seeking. You prioritize immediate comfort (phone, easy tasks) at the cost of your future self."
        },
        watchHigh: ["Don't forget to schedule intentional dopamine breaks; willpower is a depletable resource.", "Reward yourself for finishing a 'Heavy' task."],
        watchMid: ["Identify one 'Hard Win' to do first thing every Tuesday.", "Use a 'Focus Timer' to gamify your deep work."],
        watchLow: ["Put your phone in another room during your deep work block.", "Ask: 'What task am I avoiding most right now?' Do that for 10 minutes immediately."]
      },
      {
        name: "Activation Energy",
        range: [15, 19],
        descriptions: {
          high: "You are a 'Closer.' You maintain a steady flow of energy until the project is 100% complete and verified.",
          mid: "You have high energy at the start but lose interest in the 'Boring Middle' or the final 5%.",
          low: "Your energy is 'Activation Heavy.' You feel emotionally taxed by the process of engagement, leading to a pattern of half-finished work."
        },
        watchHigh: ["Make sure you are celebrating the finish before diving into the next project.", "Model this 'Closing' behavior for your more reflective peers."],
        watchMid: ["Identify why the 'Final 5%' feels scary or boring.", "Partner with an 'Executor' who can help you push through the admin details."],
        watchLow: ["Commit to finishing one 'Half-Started' project this week before you start anything new.", "Reduce the size of your projects; aim for small, daily 'Ships'."]
      }
    ];

    const sectionScores = sectionDefs.map(sec => {
      const sectionAnswers = answers.slice(sec.range[0], sec.range[1] + 1);
      const raw = sectionAnswers.reduce((sum, a) => sum + (a !== null ? (4 - a) : 0), 0);
      return Math.round((raw / (sectionAnswers.length * 4)) * 100);
    });

    const overall = Math.round(sectionScores.reduce((s, v) => s + v, 0) / sectionScores.length);
    let overallLabel, overallColor, overallDescription;

    if (overall >= 75) {
      overallLabel = "Direct Executor";
      overallColor = "#10b981";
      overallDescription = "You move with a massive bias for action. You understand that momentum is the primary antidote to anxiety. You thrive in high-stakes environments where 'Ready, Fire, Aim' is the required pace.";
    } else if (overall >= 45) {
      overallLabel = "Reflective Action-Taker";
      overallColor = "#f59e0b";
      overallDescription = "You are a steady producer, but your 'Decision Architecture' is currently fragile. You lose significant bandwidth to ramp-up time and clarity-seeking. By lowering your 'Initiative Threshold,' you can double your output without more effort.";
    } else {
      overallLabel = "The Strategic Delayer";
      overallColor = "#6366f1";
      overallDescription = "You are highly sensitive to the 'cost' of effort. While you are a deep thinker and potentially a high-precision producer, your current 'Activation Energy' is so taxing that you are likely underperforming your potential. Your work isn't about more discipline; it's about building a physical environment that makes starting easier.";
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

};


// ─────────────────────────────────────────────
// 2. HELPER FUNCTIONS
// ─────────────────────────────────────────────
function buildEmailReportSection() {
    return `
        <div id="email-report-box" style="background: white; border-radius: 20px; padding: 28px 32px; box-shadow: var(--shadow-card); margin-top: 28px; text-align: center;">
            <div style="font-size:1.6rem; margin-bottom:10px;">📬</div>
            <h3 style="font-size:1rem; font-weight:800; margin-bottom:6px;">Get this report in your inbox</h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:20px;">We'll send your full results and growth tips.</p>
            <div style="display:flex; gap:10px; max-width:420px; margin:0 auto; flex-wrap:wrap;">
                <input id="report-email-input" type="email" placeholder="your@email.com" class="main-input" style="flex:1; margin-bottom:0;">
                <button class="btn-primary" onclick="sendReportEmail()" id="send-report-btn">Email My Report →</button>
            </div>
            <p id="email-report-status" style="margin-top:14px; font-size:0.85rem; font-weight:600; display:none;"></p>
        </div>
    `;
}

function handleFollowUp(isYes, keyword) {
    const resultDisplay = document.getElementById("follow-up-result");
    const actionsDisplay = document.getElementById("follow-up-actions");

    if (isYes) {
        resultDisplay.innerHTML = `✓ Great! Email "<span style="color:var(--brand-magenta)">${keyword}</span>" to <a href="mailto:growth@peopleassets.in">growth@peopleassets.in</a>`;
        resultDisplay.style.display = "block";
        actionsDisplay.style.display = "none";
    } else {
        resultDisplay.textContent = "Thank you for completing the assessment!";
        resultDisplay.style.display = "block";
        actionsDisplay.style.display = "none";
    }
}

// ─────────────────────────────────────────────
// 3. MAIN GENERATE REPORT FUNCTION (Cleaned)
// ─────────────────────────────────────────────
async function generateReport() {
    if (!currentTest || !answers) {
        console.error("Missing test data for report");
        return;
    }

    const logic = REPORT_LOGIC[currentTest.id];
    if (!logic) {
        console.error("No report logic found for:", currentTest.id);
        return;
    }

    const result = logic(answers);

    // Store globally
    lastReportResult = result;
    window.lastReportResult = result;

    // Save to database
    try {
        await syncToDatabase(result);
    } catch (e) {
        console.error("Failed to save:", e);
    }

    showPage("report");
    setTimeout(() => {
    if (typeof renderProfilePage === "function") {
        renderProfilePage();   // Force refresh profile data
    }
}, 800);

    // === Render Report (you can expand this later) ===
    const greeting = `Hi ${userName}, `;
  const personalizedTitle = userName ? `${userName}, ` : "";
    
  const followUpHtml = `
    <div id="follow-up-card" style="margin-top: 40px; padding: 30px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 20px; text-align: center;">
        <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px;">
            ${currentTest.followUp || "Ready to take the next step with your results?"}
        </h3>
        <div id="follow-up-actions" style="display: flex; justify-content: center; gap: 15px;">
            <button class="btn-secondary" style="padding: 10px 30px; width: auto;" onclick="handleFollowUp(false)">No</button>
            <button class="btn-primary" style="padding: 10px 30px; width: auto;" onclick="handleFollowUp(true, '${currentTest.keyword || 'coaching'}')">Yes</button>
        </div>
        <p id="follow-up-result" style="margin-top: 20px; font-weight: 700; color: var(--brand-indigo); display: none;"></p>
    </div>
  `;

    let html = '';

    if (result.sectionResults) {
        // Sectioned Report (Growth Mindset, Martyr, etc.)
        const sectionCardsHtml = result.sectionResults.map(sec => `
            <div style="background:#f8fafc; border-radius:16px; padding:20px; margin-bottom:16px; border-left:4px solid ${sec.color || '#6366f1'};">
                <h4 style="margin:0 0 8px 0;">${sec.name}</h4>
                <p style="color:var(--text-muted);">${sec.description}</p>
            </div>
        `).join("");

        html = `
            <div style="background:var(--brand-grad); border-radius:24px; padding:50px 30px; text-align:center; color:white;">
                <p style="opacity:0.8;">Analysis for ${userName}</p>
                <div style="font-size:4.5rem; font-weight:900;">${result.overall}<span style="font-size:1.8rem;">/100</span></div>
                <h1 style="color:white;">${personalizedTitle}you are a ${result.overallLabel}</h1>
            </div>

            <div style="background:white; padding:40px; border-radius:24px; margin-top:30px;">
                <h3>Overall Summary</h3>
                <p>${result.overallDescription}</p>
                <h3 style="margin-top:30px;">Section Breakdown</h3>
                ${sectionCardsHtml}
            </div>

            <div class="report-actions" style="margin-top:40px;">
                <button class="btn-primary" onclick="showPage('tests')" style="background:#64748b;">← Try Another</button>
                <button class="btn-primary" onclick="window.print()">Download Report</button>
                <button class="btn-primary" onclick="showPage('coaching')">Book Coaching</button>
            </div>
            ${buildEmailReportSection()}
            ${followUpHtml}
        `;
    } else {
        document.getElementById("report-page-content").innerHTML = `
      <div>
        <div class="report-header" style="background: var(--brand-grad); border-radius: 24px; padding: clamp(40px,6vw,70px) clamp(24px,5vw,56px); text-align: center; margin-bottom: 28px; position:relative; overflow:hidden;">
          <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.06);"></div>
          <div style="position:absolute;bottom:-40px;left:-40px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,0.06);"></div>
          <p style="font-size:0.75rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.7); margin-bottom:16px;">
            Analysis Result for ${userName}
          </p>
          <div style="font-size:clamp(3rem,8vw,5.5rem); font-weight:800; color:white; line-height:1; margin-bottom:8px;">${result.score}<span style="font-size:1.5rem;">/100</span></div>
          
          <!-- PERSONALIZED TITLE ADDED HERE -->
          <h1 style="font-size:clamp(1.6rem,4vw,2.5rem); font-weight:800; color:white; margin-bottom:16px;">
            ${personalizedTitle}your result is ${result.label}
          </h1>
          
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
            </div>
          </div>
        </div>

        <div class="report-actions" style="margin-top: 28px;">
          <button class="btn-primary" onclick="showPage('tests')" style="background:#64748b;">← Try Another Assessment</button>
          <button class="btn-primary" onclick="window.print()">Download Report</button>
          <button class="btn-primary" onclick="showPage('coaching')">Book Coaching →</button>
        </div>
        ${buildEmailReportSection()}
        ${followUpHtml}
      </div>
    `;
  }
}
    

    document.getElementById("report-page-content").innerHTML = `<div class="container">${html}</div>`;

window.generateReport = generateReport;
window.buildEmailReportSection = buildEmailReportSection;
window.handleFollowUp = handleFollowUp;
window.REPORT_LOGIC = REPORT_LOGIC;