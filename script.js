const SCHEDULE = {
    1: [ // Monday
        { name: "Form", start: "08:15", end: "09:00", type: "class" },
        { name: "Period 1", start: "09:00", end: "10:00", type: "class" },
        { name: "Period 2", start: "10:00", end: "10:50", type: "class", nextIsBreak: true },
        { name: "Interval", start: "10:50", end: "11:15", type: "break" },
        { name: "Period 3", start: "11:15", end: "12:10", type: "class" },
        { name: "Period 4", start: "12:10", end: "13:00", type: "class", nextIsBreak: true },
        { name: "Lunch", start: "13:00", end: "13:50", type: "break" },
        { name: "Period 5", start: "13:50", end: "14:40", type: "class", nextIsBreak: true }
    ],
    2: [ // Tuesday
        { name: "Form", start: "08:15", end: "08:30", type: "class" },
        { name: "Period 1", start: "08:30", end: "09:30", type: "class" },
        { name: "Period 2", start: "09:30", end: "10:25", type: "class", nextIsBreak: true },
        { name: "Interval", start: "10:25", end: "10:50", type: "break" },
        { name: "Period 3", start: "10:50", end: "11:50", type: "class" },
        { name: "Period 4", start: "11:50", end: "12:45", type: "class", nextIsBreak: true },
        { name: "Lunch", start: "12:45", end: "13:45", type: "break" },
        { name: "Period 5", start: "13:45", end: "14:40", type: "class", nextIsBreak: true }
    ],
    3: [ // Wednesday
        { name: "Period 1", start: "08:15", end: "09:10", type: "class" },
        { name: "Form Time", start: "09:10", end: "09:30", type: "class" },
        { name: "Period 2", start: "09:30", end: "10:25", type: "class", nextIsBreak: true },
        { name: "Interval", start: "10:25", end: "10:50", type: "break" },
        { name: "Period 3", start: "10:50", end: "11:50", type: "class" },
        { name: "Period 4", start: "11:50", end: "12:45", type: "class", nextIsBreak: true },
        { name: "Lunch", start: "12:45", end: "13:35", type: "break" },
        { name: "Period 5", start: "13:35", end: "14:30", type: "class", nextIsBreak: true }
    ],
    4: [ // Thursday
        { name: "Form", start: "08:15", end: "08:30", type: "class" },
        { name: "Period 1", start: "08:30", end: "09:30", type: "class" },
        { name: "Period 2", start: "09:30", end: "10:25", type: "class", nextIsBreak: true },
        { name: "Interval", start: "10:25", end: "10:50", type: "break" },
        { name: "Period 3", start: "10:50", end: "11:50", type: "class" },
        { name: "Period 4", start: "11:50", end: "12:45", type: "class", nextIsBreak: true },
        { name: "Lunch", start: "12:45", end: "13:45", type: "break" },
        { name: "Period 5", start: "13:45", end: "14:40", type: "class", nextIsBreak: true }
    ],
    5: [ // Friday
        { name: "Form", start: "08:15", end: "08:30", type: "class" },
        { name: "Period 1", start: "08:30", end: "09:30", type: "class" },
        { name: "Period 2", start: "09:30", end: "10:25", type: "class", nextIsBreak: true },
        { name: "Interval", start: "10:25", end: "10:50", type: "break" },
        { name: "Period 3", start: "10:50", end: "11:50", type: "class" },
        { name: "Period 4", start: "11:50", end: "12:45", type: "class", nextIsBreak: true },
        { name: "Lunch", start: "12:45", end: "13:45", type: "break" },
        { name: "Period 5", start: "13:45", end: "14:40", type: "class", nextIsBreak: true }
    ]
};

// Exam week: same schedule every weekday. Add date ranges here to activate.
const EXAM_WEEKS = [
    { start: '2026-09-08', end: '2026-09-17' } // Tue 8 Sep - Thu 17 Sep 2026
];

const EXAM_SCHEDULE = [
    { name: "Form", start: "08:15", end: "08:30", type: "class" },
    { name: "Period 1", start: "08:30", end: "09:30", type: "class" },
    { name: "Period 2", start: "09:30", end: "10:25", type: "class", nextIsBreak: true },
    { name: "Interval", start: "10:25", end: "10:50", type: "break" },
    { name: "Period 3", start: "10:50", end: "11:45", type: "class", nextIsBreak: true },
    { name: "Lunch", start: "11:45", end: "12:40", type: "break" },
    { name: "Period 4", start: "12:40", end: "13:40", type: "class" },
    { name: "Period 5", start: "13:40", end: "14:40", type: "class", nextIsBreak: true }
];

function isExamDay(now) {
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    return EXAM_WEEKS.some(w => today >= w.start && today <= w.end);
}

function timeToSeconds(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 3600) + (minutes * 60);
}

function formatMinutes(seconds) {
    const mins = Math.ceil(seconds / 60);
    return mins <= 0 ? "0m" : `${mins}m`;
}

const circle = document.getElementById('progress-circle');
const circumference = 2 * Math.PI * 170;
circle.style.strokeDasharray = `${circumference} ${circumference}`;

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

function updateTimer() {
    const now = new Date();
    // For testing: const now = new Date(2026, 2, 11, 15, 0, 0); 
    
    const currentSeconds = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
    const day = now.getDay();
    const hours = now.getHours();
    
    // UI Elements
    const greetingEl = document.getElementById('greeting');
    const dateEl = document.getElementById('current-day-period');
    const statusEl = document.getElementById('status-label');
    const periodEl = document.getElementById('period-name');
    const nextPeriodEl = document.getElementById('next-period-name');
    const timeUntilEl = document.getElementById('time-until-next');
    const countdownLabelEl = document.getElementById('countdown-label');

    const examActive = isExamDay(now) && day >= 1 && day <= 5;
    const schedule = examActive ? EXAM_SCHEDULE : SCHEDULE[day];

    document.getElementById('exam-sep').hidden = !examActive;
    document.getElementById('exam-indicator').hidden = !examActive;

    // Dynamic Greeting logic
    let greeting = "Good Morning!";
    if (hours >= 18) greeting = "Good Evening!";
    else if (hours >= 12) greeting = "Good Afternoon!";
    
    if (schedule) {
        const startSec = timeToSeconds(schedule[0].start);
        const endSec = timeToSeconds(schedule[schedule.length - 1].end);
        if (currentSeconds >= startSec && currentSeconds < endSec && hours >= 13) {
            greeting = "Almost there!";
        }
    }
    greetingEl.innerText = greeting;

    // Date display
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dateEl.innerText = `${dayNames[day]} ${now.getDate()} ${monthNames[now.getMonth()]}`;

    // Weekend or Late Night / Early Morning Logic
    if (!schedule) {
        showOutOfSchool("WEEKEND", "Have a great break!", "Monday", "08:15");
        return;
    }

    if (currentSeconds < timeToSeconds(schedule[0].start)) {
        const diff = timeToSeconds(schedule[0].start) - currentSeconds;
        showOutOfSchool("WELCOME", "Ready for school?", schedule[0].name, formatMinutes(diff));
        return;
    }

    if (currentSeconds >= timeToSeconds(schedule[schedule.length - 1].end)) {
        const nextDay = (day % 5) + 1; 
        const nextSched = examActive ? EXAM_SCHEDULE : (SCHEDULE[nextDay] || SCHEDULE[1]); // Fallback to Monday if nextDay is weekend
        showOutOfSchool("GOODBYE", "School is finished", "Next Class", nextSched[0].start);
        return;
    }

    for (let i = 0; i < schedule.length; i++) {
        const period = schedule[i];
        const startSec = timeToSeconds(period.start);
        const endSec = timeToSeconds(period.end);
        
        if (currentSeconds >= startSec && currentSeconds < endSec) {
            let phaseStart = startSec;
            let phaseEnd = endSec;
            let displayStatus = "CURRENTLY IN";
            let displayName = period.name;
            let isTransition = false;

            // Transition Rule: 5 mins before next class
            if (period.type === "class" && !period.nextIsBreak) {
                const transitionStartSec = endSec - 300;
                if (currentSeconds >= transitionStartSec) {
                    phaseStart = transitionStartSec;
                    phaseEnd = endSec;
                    displayStatus = "TRANSITION TO";
                    isTransition = true;
                    displayName = schedule[i+1] ? schedule[i+1].name : "Next Class";
                } else {
                    phaseEnd = transitionStartSec;
                }
            }

            // Update UI
            statusEl.innerText = displayStatus;
            periodEl.innerText = displayName;
            if (isTransition && !lowStressMode) statusEl.classList.add('transition-mode');
            else statusEl.classList.remove('transition-mode');

            const totalPhase = phaseEnd - phaseStart;
            const elapsedPhase = currentSeconds - phaseStart;
            const percent = Math.min(100, (elapsedPhase / totalPhase) * 100);
            
            setProgress(100 - percent);

            // Upcoming / Ends In logic
            const next = schedule[i + 1];
            countdownLabelEl.innerText = "ENDS IN"; 
            
            if (next) {
                nextPeriodEl.innerText = next.name;
                timeUntilEl.innerText = formatMinutes(phaseEnd - currentSeconds);
            } else {
                nextPeriodEl.innerText = "Home Time";
                timeUntilEl.innerText = formatMinutes(endSec - currentSeconds);
            }
            
            updateAccent(percent);
            return;
        }
    }
}

function showOutOfSchool(status, msg, upcoming, countdown) {
    document.getElementById('status-label').innerText = status;
    document.getElementById('status-label').classList.remove('transition-mode');
    document.getElementById('period-name').innerText = msg;
    
    document.getElementById('next-period-name').innerText = upcoming;
    document.getElementById('time-until-next').innerText = countdown;
    
    const label = document.getElementById('countdown-label');
    label.innerText = countdown.includes(':') ? "STARTS AT" : "STARTS IN";
    
    setProgress(0);
    updateAccent(0);
}

const THEMES = {
    default: { start: '#3b82f6', end: '#60a5fa' },
    emerald: { start: '#10b981', end: '#34d399' },
    rose: { start: '#f43f5e', end: '#fb7185' },
    amber: { start: '#f59e0b', end: '#fbbf24' },
    purple: { start: '#8b5cf6', end: '#a78bfa' }
};

let currentTheme = localStorage.getItem('clock-theme') || 'default';

function updateAccent(percent) {
    let start, end;
    
    if (!lowStressMode && percent > 90) {
        start = '#ef4444'; // Danger
        end = '#f87171';
    } else if (!lowStressMode && percent > 75) {
        start = '#f59e0b'; // Warning
        end = '#fbbf24';
    } else {
        start = THEMES[currentTheme].start;
        end = THEMES[currentTheme].end;
    }
    
    document.documentElement.style.setProperty('--accent-start', start);
    document.documentElement.style.setProperty('--accent-end', end);
    
    // Direct SVG update for Safari/WebKit compatibility
    const gradientStops = document.querySelectorAll('#progress-gradient stop');
    if (gradientStops.length >= 2) {
        gradientStops[0].setAttribute('stop-color', start);
        gradientStops[1].setAttribute('stop-color', end);
    }
}

// Settings Toggle Logic
const settingsToggle = document.getElementById('settings-toggle');
const settingsMenu = document.getElementById('settings-menu');
const themeOpts = document.querySelectorAll('.theme-opt');
const darkModeBtn = document.getElementById('dark-mode-btn');
const lightModeBtn = document.getElementById('light-mode-btn');

let currentMode = localStorage.getItem('clock-mode') || 'dark';

function applyMode(mode) {
    if (mode === 'light') {
        document.body.classList.add('light-mode');
        lightModeBtn.classList.add('active');
        darkModeBtn.classList.remove('active');
    } else {
        document.body.classList.remove('light-mode');
        darkModeBtn.classList.add('active');
        lightModeBtn.classList.remove('active');
    }
}

darkModeBtn.addEventListener('click', () => {
    currentMode = 'dark';
    localStorage.setItem('clock-mode', currentMode);
    applyMode(currentMode);
});

lightModeBtn.addEventListener('click', () => {
    currentMode = 'light';
    localStorage.setItem('clock-mode', currentMode);
    applyMode(currentMode);
});

applyMode(currentMode);

settingsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!settingsMenu.contains(e.target) && e.target !== settingsToggle) {
        settingsMenu.classList.add('hidden');
    }
});

themeOpts.forEach(opt => {
    opt.addEventListener('click', () => {
        currentTheme = opt.dataset.theme;
        localStorage.setItem('clock-theme', currentTheme);
        
        // Update active state in UI
        themeOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        
        updateTimer(); // Force UI update
    });
});

// Initialize active theme in UI
document.querySelector(`[data-theme="${currentTheme}"]`)?.classList.add('active');

const lowStressRow = document.getElementById('low-stress-row');
const lowStressToggle = document.getElementById('low-stress-toggle');

let lowStressMode = localStorage.getItem('clock-low-stress') === 'true';

lowStressToggle.checked = lowStressMode;

lowStressToggle.addEventListener('change', () => {
    lowStressMode = lowStressToggle.checked;
    localStorage.setItem('clock-low-stress', String(lowStressMode));
    updateTimer();
});

lowStressRow.addEventListener('click', () => {
    lowStressToggle.checked = !lowStressToggle.checked;
    lowStressToggle.dispatchEvent(new Event('change'));
});

setInterval(updateTimer, 1000);
updateTimer();

// Week Info
const WEEK_URL = 'https://raw.githubusercontent.com/RichardViskovic/whichweek/master/current_week.json';

async function fetchWeekInfo() {
    try {
        const res = await fetch(WEEK_URL);
        const data = await res.json();
        document.getElementById('week-rotation').innerText = data.rotation || '-';
        document.getElementById('week-term').innerText = data.term || '-';
        document.getElementById('week-number').innerText = data.week || '-';
    } catch (e) {
        console.warn('Failed to fetch week info:', e);
    }
}

fetchWeekInfo();
setInterval(fetchWeekInfo, 60 * 60 * 1000);
