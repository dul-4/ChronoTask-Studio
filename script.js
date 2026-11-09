let timerMinutes = 25 ;
let timerSeconds = 0;
let totalSecondsRemaining = 25 * 60;
let totalSecondsInitial = 25 * 60;
let timerInterval = null;
let isRunning = false;
let currentMode = 'work';

let completedSessions = parseInt(localStorage.getItem('focusflow_sessions')) || 0;
let totalFocusMinutes = parseInt(localStorage.getItem('focusflow_minutes')) || 0;

const timerDisplay = document.getElementById('timer-display');
const timerStatus = document.getElementById('timer-status');
const startPauseBtn = document.getElementById('start-pause-btn');
const playIcon = document.getElementById('play-icon');
const startPauseText = document.getElementById('start-pause-text');
const sessionCountEl = document.getElementById('session-count');
const streakCounter = document.getElementById('streak-counter');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');

sessionCountEl.textContent = completedSessions;
streakCounter.textContent = `${totalFocusMinutes}m focused today`;

function updateDisplay(){
    const mins = Math.floor(totalSecondsRemaining / 60).toString().padStart(2, '0');
    const secs = (totalSecondsRemaining % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
    document.title = `(${mins}:${secs}) ChronoTask Studio`;
}

function setMode(mode) {
    if (isRunning) toggleTimer();
    currentMode = mode;

    document.getElementById('mode-work').className = "flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer " + (mode === 'work' ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white");
    document.getElementById('mode-short').className = "flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer " + (mode === 'short' ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white");
    document.getElementById('mode-long').className = "flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer " + (mode === 'long' ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white");

    if (mode === 'work') {
        totalSecondsInitial = 25 * 60;
        timerStatus.textContent = "Deep work session. Stay focused!";
    } else if (mode === 'short') {
        totalSecondsInitial = 5 *60;
        timerStatus.textContent = "Short break. Relax and strech.";
    } else if (mode === 'long') {
        totalSecondsInitial = 15 * 60;
        timerStatus.textContent = "Long break. Take a proper rest.";
    }

    totalSecondsRemaining = totalSecondsInitial;
    updateDisplay();
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        playIcon.className = "fa-solid fa-play";
        startPauseText.textContent = "Resume Timer";
        startPauseBtn.className = "flex-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-extrabold text-sm sm:text-base py-4 rounded.2xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2.5 cursor-pointer";
    } else {
        isRunning = true;
        playIcon.className = "fa-solid fa-pause";
        startPauseText.textContent = "Pause Timer";
        startPauseBtn.className = "flex-1 bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-extrabold text-sm sm:text-base py-4 rounded-2xl shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2.5 cursor-pointer";

        timerInterval = setInterval(() => {
            if (totalSecondsRemaining > 0) {
                totalSecondsRemaining--;
                updateDisplay();

                if (currentMode === 'work' && totalSecondsRemaining % 60 === 0) {
                    totalFocusMinutes++;
                    localStorage.setItem('focusflow_minutes',
                    totalFocusMinutes);
                    streakCounter.textContent = `${totalFocusMinutes}m focused today`;
                }
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                playIcon.className = "fa-solid fa-play";
                startPauseText.textContent = "Start Timer";
                startPauseBtn.className = "flex-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-extrabold text-sm sm:text-base py-4 rounded-2xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2.5 cursor-pointer";

                if (currentMode === 'work') {
                    completedSessions++;
                    localStorage.setItem('focusflow_sessions',
                        completedSessions);
                        sessionCountEl.textContent = completedSessions;
                        showToast("🎉 Focus session completed! Great job.");
                } else {
                    showToast("🔔 Break finished! Ready for another session?");
                }
            }
        }, 1000);
    }
}

function resetTimer() {
    if (isRunning) toggleTimer();
    totalSecondsRemaining = totalSecondsInitial;
    updateDisplay();
}

function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none');
    }, 3000);
}

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskBadge = document.getElementById('task-badge');

let tasks = JSON.parse(localStorage.getItem('focusflow_tasks')) || [
    { text: "Review project poposal", completed: true },
    { text: "Write clean code for Hack Club project", completed: false },
    { text: "Test and verify functionality", completed: false }
];

function saveTasks() {
    localStorage.setItem('focusflow_tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
            task.completed
            ? 'bg-slate-950/40 border-slate-900 text-slate-500 line-through': 'bg-slate-950 border-slate-800 text-slate-200'
        }`;

        li.innerHTML = `
        <span class="flex-1 cursor-pointer text-xs sm:text-sm font-medium flex items-center gap-2.5" onclick="toggleTask(${index})">
        <i class="fa-regular ${task.completed ? 'fa-circle-check text-indigo-500' : 'fa-circle text-slate-600'}"></i>
        ${task.text}
        </span>
        <button onclick="deleteTask(${index})" class="text-slate-600 hover:text-red-400 transition p-1 cursor-pointer">
        <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
        `;
        taskList.appendChild(li);
    });

    const remaining = tasks.filter(t => !t.completed).length;
    taskBadge.textContent = `${remaining} remaining`;
}

taskForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
    }
});

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
}

renderTasks();

let audioCtx = null;
let noiseNode = null;
let isPlayingAmbient = false;
const ambientBtn = document.getElementById('ambient-btn');
const ambientIcon = document.getElementById('ambient-icon');

ambientBtn.addEventListener('click', () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (isPlayingAmbient) {
        if (noiseNode) {
            noiseNode.stop();
            noiseNode.disconnect();
            noiseNode = null;
        }
        isPlayingAmbient = false;
        ambientIcon.className = "fa-solid fa-volume-xmark text-slate-400";
        ambientBtn.classList.remove('border-indigo-500', 'text-white', 'bg-slate-800');
        showToast("Ambient sound stopped.");
    } else {
        const bufferSize = audioCtx.sampleRate * 2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = buffer;
        noiseNode.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 350;
        filter.Q.value = 2.5;
        const lfo = audioCtx.createOscillator();
        lfo.frequency.value = 0.15;
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 200;

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.2;

        noiseNode.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        noiseNode.start();

        isPlayingAmbient = true;
        ambientIcon.className = "fa-solid fa-volume-high text-indigo-400";
        ambientBtn.classList.add('border-indigo-500', 'text-white', 'bg-slate-800');
        showToast("🌊 The sound of wind over the sea can be heard.!");
    }
});