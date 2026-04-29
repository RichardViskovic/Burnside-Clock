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
    // For testing: const now = new Date(2026, 2, 11, 9, 2, 0); 
    
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

    // ... (greeting and date code) ...

    // Dynamic Greeting
    let greeting = "Good Morning!";
    if (hours >= 11 && hours < 13) greeting = "Good Afternoon!";
    else if (hours >= 13) greeting = "Almost there!";
    greetingEl.innerText = greeting;

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dateEl.innerText = `${dayNames[day]} ${now.getDate()} ${monthNames[now.getMonth()]}`;

    const schedule = SCHEDULE[day];
    if (!schedule || currentSeconds < timeToSeconds(schedule[0].start)) {
        showOutOfSchool("School hasn't started", schedule ? schedule[0] : null, currentSeconds);
        return;
    }

    if (currentSeconds >= timeToSeconds(schedule[schedule.length - 1].end)) {
        showOutOfSchool("End of Day", null, currentSeconds);
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
            const remaining = Math.max(0, phaseEnd - currentSeconds);
            const percent = Math.min(100, (elapsedPhase / totalPhase) * 100);
            
            setProgress(100 - percent);

            // Upcoming / Ends In logic
            const next = schedule[i + 1];
            if (next) {
                nextPeriodEl.innerText = next.name;
                // Calculate time until this current PHASE ends (class or transition)
                timeUntilEl.innerText = formatMinutes(phaseEnd - currentSeconds);
                document.querySelectorAll('.tile-label')[1].innerText = "ENDS IN";
            } else {
                nextPeriodEl.innerText = "Home Time";
                timeUntilEl.innerText = formatMinutes(endSec - currentSeconds);
                document.querySelectorAll('.tile-label')[1].innerText = "ENDS IN";
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

function showOutOfSchool(msg, next, currentSeconds) {
    document.getElementById('status-label').innerText = "STATUS";
    document.getElementById('period-name').innerText = msg;
    document.getElementById('time-left').innerText = "--m";
    setProgress(0);
    if (next) {
        document.getElementById('next-period-name').innerText = next.name;
        document.getElementById('time-until-next').innerText = formatMinutes(timeToSeconds(next.start) - currentSeconds);
    }
}

setInterval(updateTimer, 1000);
updateTimer();
