function showTab(tab) {
document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
document.getElementById(tab).classList.add('active');
}

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
document.body.classList.toggle('dark-mode');
});

// Login/Signup
document.getElementById('signupForm').onsubmit = (e) => {
e.preventDefault();
const user = document.getElementById('signupUsername').value;
const pass = document.getElementById('signupPassword').value;
localStorage.setItem('user', JSON.stringify({ user, pass }));
alert("Signup successful!");
showTab('login');
};

document.getElementById('loginForm').onsubmit = (e) => {
e.preventDefault();
const user = document.getElementById('loginUsername').value;
const pass = document.getElementById('loginPassword').value;
const stored = JSON.parse(localStorage.getItem('user'));
if (stored && stored.user === user && stored.pass === pass) {
document.getElementById('welcomeMessage').innerText = `Welcome, ${user}!`;
showTab('home');
} else {
alert("Login failed!");
}
};

// BMI Calculator
function calculateBMI() {
const h = document.getElementById('height').value / 100;
const w = document.getElementById('weight').value;
const bmi = (w / (h * h)).toFixed(2);
document.getElementById('bmi-result').innerText = `Your BMI is ${bmi}`;
}

// Fitness Tip
function showQuote() {
const tips = [
"Stay consistent, even on low energy days!",
"Drink enough water during the day.",
"Don't skip rest days—they're part of progress!",
"Focus on form, not just reps.",
"Eat whole foods and track your intake."
];
const tip = tips[Math.floor(Math.random() * tips.length)];
document.getElementById('fitness-quote').innerText = tip;
}

// Water Tracker
let glasses = 0;
function addGlass() {
glasses++;
document.getElementById('water-count').innerText = `${glasses} Glasses`;
}

// Sleep Tracker
function trackSleep() {
const sleepHours = document.getElementById('sleepHours').value;
if (sleepHours && !isNaN(sleepHours)) {
let history = JSON.parse(localStorage.getItem('sleepHistory')) || [];
history.push({ date: new Date().toLocaleDateString(), hours: sleepHours });
localStorage.setItem('sleepHistory', JSON.stringify(history));
document.getElementById('sleepResult').innerText = `Logged: ${sleepHours} hours of sleep`;
} else {
alert("Please enter a valid number of hours.");
}
}

function viewHistory() {
let history = JSON.parse(localStorage.getItem('sleepHistory')) || [];
if (history.length === 0) {
document.getElementById('historyResults').innerText = "No history available.";
} else {
let resultHTML = "<ul>";
history.forEach(entry => {
resultHTML += `<li>${entry.date}: ${entry.hours} hours</li>`;
});
resultHTML += "</ul>";
document.getElementById('historyResults').innerHTML = resultHTML;
}
}

// Workout Reminder
function setReminder() {
const time = document.getElementById('reminderTime').value;
document.getElementById('reminderMsg').innerText = `Workout reminder set for ${time}`;
}

// Feedback Submission
function submitFeedback() {
const feedback = document.getElementById('feedbackBox').value;
if (feedback.trim()) {
document.getElementById('feedbackMsg').innerText = "Thanks for your feedback!";
document.getElementById('feedbackBox').value = "";
}
}

// Timer
let timer;
let timeLeft;

function startTimer() {
let timeInput = document.getElementById('timerInput').value;
if (isNaN(timeInput) || timeInput <= 0) {
alert("Please enter a valid number of seconds.");
return;
}

timeLeft = parseInt(timeInput);
updateTimerDisplay();

timer = setInterval(() => {
timeLeft--;

if (timeLeft <= 0) {
clearInterval(timer);
alert("Time's up! ⏰");
if ("vibrate" in navigator) {
navigator.vibrate(1000);
} else {
new Audio('alarm-sound.mp3').play(); // Replace with your own audio file
}
}

updateTimerDisplay();
}, 1000);
}

function updateTimerDisplay() {
const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
const seconds = (timeLeft % 60).toString().padStart(2, '0');
document.getElementById('timerDisplay').textContent = `Time Remaining: ${minutes}:${seconds}`;
}

// Plan Generator
function generatePlan() {
const goal = document.getElementById('goal').value;
const level = document.getElementById('fitnessLevel').value;

let plan = `Your ${goal} workout plan for ${level} level:`;

if (goal === 'weight-loss') {
plan += level === 'beginner' ? "<ul><li>Full body workout 3 times a week</li></ul>" :
level === 'intermediate' ? "<ul><li>HIIT 4 times a week</li></ul>" :
"<ul><li>Advanced HIIT with strength training 5 times a week</li></ul>";
} else if (goal === 'muscle-gain') {
plan += level === 'beginner' ? "<ul><li>Full-body strength training 3 times a week</li></ul>" :
level === 'intermediate' ? "<ul><li>PPL split with hypertrophy focus</li></ul>" :
"<ul><li>Push/Pull/Legs with heavy compound lifts</li></ul>";
} else {
plan += level === 'beginner' ? "<ul><li>Full body strength training 2 times a week</li></ul>" :
level === 'intermediate' ? "<ul><li>Strength and cardio mix</li></ul>" :
"<ul><li>Strength training 4 times a week with cardio</li></ul>";
}

document.getElementById('planResult').innerHTML = plan;
}

// Badge Checker
let stepGoal = 10000;
let steps = 5000;

function checkBadges() {
const badges = [];
if (steps >= stepGoal) {
badges.push("🏅 Step Master: 10,000 Steps!");
}
document.getElementById('badgeDisplay').innerHTML = badges.join("<br>") || "No badges earned yet.";
}
checkBadges();

// Wearable Sync (Mock)
function syncWearables() {
document.getElementById('wearableStatus').textContent = "Syncing with wearables... Data synced!";
}

// Weekly Schedule Generator
function generateSchedule() {
const schedule = `
<h3>Your 7-Day Workout Schedule:</h3>
<ul>
<li>Monday: Full Body Strength</li>
<li>Tuesday: Cardio</li>
<li>Wednesday: Upper Body Strength</li>
<li>Thursday: Lower Body Strength</li>
<li>Friday: HIIT (High-Intensity Interval Training)</li>
<li>Saturday: Active Rest (Yoga, Stretching)</li>
<li>Sunday: Rest or Light Activity (Walking, Cycling)</li>
</ul>
`;
document.getElementById('schedule-container').innerHTML = schedule;
}

// Tab Button Navigation
document.addEventListener("DOMContentLoaded", () => {
const tabs = document.querySelectorAll('.tab');
const tabButtons = document.querySelectorAll('.tab-button');

tabButtons.forEach(button => {
button.addEventListener('click', () => {
tabs.forEach(tab => tab.classList.remove('active'));
document.querySelector(`#${button.dataset.tab}`).classList.add('active');
});
});
});