/** * PEOPLE ASSETS - MASTER JS 
 * Includes: Coaching Form, Nav Highlights, and Dynamic Report
 */

const PUBLIC_KEY = "zs8EuLqOZPjTVHF0M";
const SERVICE_ID = "service_u11zlzf";
const TEMPLATE_ID = "template_zpcklyu";

(function() { emailjs.init(PUBLIC_KEY); })();

// ... (keep your testData the same as before) ...

let activeKey = null, currentIdx = 0, userAnswers = {};

/**
 * PAGE ROUTING WITH NAV HIGHLIGHTS
 */
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    
    // Update Nav UI
    document.querySelectorAll('.nav-links span').forEach(span => {
        span.classList.remove('active');
        if(span.innerText.toLowerCase() === id) span.classList.add('active');
    });

    if(id === 'tests') renderGrid();
    if(id === 'coaching') renderCoachingPage();
    window.scrollTo(0, 0);
}

/**
 * RENDER COACHING PAGE CONTENT
 */
function renderCoachingPage() {
    const container = document.getElementById('coaching');
    container.innerHTML = `
        <div class="container" style="text-align:center; padding-top: 60px;">
            <h4 style="color:var(--brand-magenta); font-weight:800; letter-spacing:1px;">EXECUTIVE STRATEGY</h4>
            <h1 class="text-gradient" style="font-size:3rem; margin-top:0;">Elite Coaching</h1>
            <p style="margin-bottom:40px; color:#64748b;">Strategic alignment for high-performers. Request a consultation below.</p>
            
            <div class="card" style="max-width:500px; margin: 0 auto; text-align:left;">
                <label style="font-weight:800; font-size:0.75rem; color:#94a3b8;">FULL NAME</label>
                <input type="text" id="c-name" placeholder="John Doe" class="main-input">
                
                <label style="font-weight:800; font-size:0.75rem; color:#94a3b8;">EMAIL ADDRESS</label>
                <input type="email" id="c-email" placeholder="john@company.com" class="main-input">
                
                <label style="font-weight:800; font-size:0.75rem; color:#94a3b8;">PHONE NUMBER</label>
                <input type="tel" id="c-phone" placeholder="+1 (555) 000-0000" class="main-input">
                
                <label style="font-weight:800; font-size:0.75rem; color:#94a3b8;">FOCUS AREA</label>
                <textarea id="c-focus" placeholder="What are your professional goals?" class="main-input" style="height:100px; font-family:inherit;"></textarea>
                
                <button class="btn-primary" style="width:100%; margin-top:10px;" onclick="sendCoachingRequest()">Request Consultation</button>
            </div>
        </div>`;
}

/**
 * SEND COACHING DATA TO EMAILJS
 */
function sendCoachingRequest() {
    const data = {
        from_name: document.getElementById('c-name').value,
        user_email: document.getElementById('c-email').value,
        phone: document.getElementById('c-phone').value,
        message: document.getElementById('c-focus').value,
        subject: "New Coaching Consultation Request"
    };

    if(!data.user_email || !data.from_name) {
        alert("Please fill in your name and email.");
        return;
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, data)
        .then(() => {
            alert("Thank you! Your request has been sent. We will contact you shortly.");
            showPage('home');
        });
}

/**
 * DYNAMIC REPORT GENERATION (FRICTION VS FLOW)
 */
function calculateReport() {
    const email = document.getElementById('u-email').value;
    if(!email || !email.includes('@')) {
        alert("Please enter a valid email address.");
        return;
    }

    const score = Object.values(userAnswers).reduce((a, b) => a + b, 0);
    
    // Send Email
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { 
        user_email: email, 
        test_name: testData[activeKey].title,
        score: score 
    });

    // Scoring Logic
    let reportTitle, reportDescription, traits;
    if (score >= 22) {
        reportTitle = "The High Friction Seeker";
        reportDescription = "You perceive value through effort. You may be over-engineering your path to success.";
        traits = ["High Resilience", "Perfectionist", "Process-Oriented", "Disciplined"];
    } else if (score >= 15) {
        reportTitle = "The Balanced Optimizer";
        reportDescription = "You have a healthy relationship with effort, balancing hard work with effective systems.";
        traits = ["Strategic Effort", "Pragmatic", "Adaptive", "Result-Focused"];
    } else {
        reportTitle = "The Flow Specialist";
        reportDescription = "You are a master of leverage, maximizing output while minimizing unnecessary friction.";
        traits = ["High Efficiency", "Systemic Thinker", "Outcome-Oriented", "Leverage Expert"];
    }

    //     document.getElementById('report-page-content').innerHTML = `
        <div class="card" style="text-align:left; max-width:800px; margin: 0 auto; padding: 40px;">
            <div style="background: #f0fdf4; color: #166534; padding: 15px; border-radius: 10px; margin-bottom: 30px; border: 1px solid #bbf7d0; font-size: 0.9rem; text-align: center;">
                <strong>✓ Success!</strong> Your detailed analysis has been dispatched to <strong>${email}</strong>.
            </div>
            <h4 style="color: var(--brand-magenta); font-weight: 800; font-size: 0.8rem; letter-spacing: 1px;">DIAGNOSTIC RESULT</h4>
            <h1 class="text-gradient" style="font-size: 2.5rem; margin-top: 0;">${reportTitle}</h1>
            <p style="font-size: 1.1rem; line-height: 1.6; color: #334155; margin-bottom: 30px;">${reportDescription}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
                ${traits.map(t => `<div style="background:var(--bg-lavender); padding:15px; border-radius:12px; font-weight:700;">✦ ${t}</div>`).join('')}
            </div>
            <div style="border-top: 2px solid #f1f5f9; padding-top: 30px; text-align:center;">
                <button class="btn-primary" onclick="showPage('coaching')">Book Coaching Session</button>
            </div>
        </div>`;
    
    showPage('report');
}

// Ensure first page loads correctly
document.addEventListener('DOMContentLoaded', () => showPage('home'));
