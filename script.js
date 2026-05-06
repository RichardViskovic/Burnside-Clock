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

    const schedule = SCHEDULE[day];

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
        const nextSched = SCHEDULE[nextDay] || SCHEDULE[1]; // Fallback to Monday if nextDay is weekend
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
            if (isTransition) statusEl.classList.add('transition-mode');
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

function updateAccent(percent) {
    if (percent > 90) {
        document.documentElement.style.setProperty('--accent-start', '#ef4444');
        document.documentElement.style.setProperty('--accent-end', '#f87171');
    } else if (percent > 75) {
        document.documentElement.style.setProperty('--accent-start', '#f59e0b');
        document.documentElement.style.setProperty('--accent-end', '#fbbf24');
    } else {
        document.documentElement.style.setProperty('--accent-start', '#3b82f6');
        document.documentElement.style.setProperty('--accent-end', '#60a5fa');
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
}

setInterval(updateTimer, 1000);
updateTimer();
