// --- DOM ELEMENTS ---
const screens = {
  menu: document.getElementById('splashScreen'),
  game: document.getElementById('quizContainer'),
  result: document.getElementById('resultScreen'),
  prestasi: document.getElementById('prestasiScreen'),
  analisis: document.getElementById('analisisScreen')
};

// Menu & Profile Elements
const profileSelect = document.getElementById('profileSelect');
const newNameInput = document.getElementById('newNameInput');
const padamBtn = document.getElementById('padamBtn');
const mulaBtn = document.getElementById('mulaBtn');
const prestasiBtn = document.getElementById('prestasiBtn');
const analisisBtn = document.getElementById('analisisBtn');
const levelSelect = document.getElementById('levelSelect');
const abortQuizBtn = document.getElementById('abortQuizBtn');

// Dropdowns for specific views
const prestasiLevelSelect = document.getElementById('prestasiLevelSelect');
const analisisLevelSelect = document.getElementById('analisisLevelSelect');

// Game Elements
//const questionImage = document.getElementById('questionImage');
const speakBtn = document.getElementById('speakBtn');
const wordDisplay = document.getElementById('wordDisplay');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const progressText = document.getElementById('progress');
const feedbackMsg = document.getElementById('feedbackMsg');
const quizGreeting = document.getElementById('quizGreeting');

// Result Elements
const finalScoreText = document.getElementById('finalScoreText');
const finalPercentText = document.getElementById('finalPercentText');
const finalGradeText = document.getElementById('finalGradeText');
const resultPrestasiBtn = document.getElementById('resultPrestasiBtn');
const resultKembaliBtn = document.getElementById('resultKembaliBtn');

// Data Display Elements
const prestasiName = document.getElementById('prestasiName');
const analisisName = document.getElementById('analisisName');
const analisisData = document.getElementById('analisisData');
const prestasiDataContainer = document.getElementById('prestasiData');
const performanceCanvas = document.getElementById('performanceChart');

// --- GAME STATE VARIABLES ---
let currentLevel = 1;
let sessionQuestions = [];
let currentQuestionIndex = 0;
let currentAnswer = "";
let currentFullWord = "";
let questionStartTime = 0; 
let score = 0;
let chartInstance = null;
let currentUser = "";
let appData = JSON.parse(localStorage.getItem('kuiz_ejaan_data')) || {};

// --- DATA MIGRATION & INITIALIZATION ---
function ensureDataStructure() {
  Object.keys(appData).forEach(user => {
    if (!appData[user].history || Array.isArray(appData[user].history)) {
      let oldHist = Array.isArray(appData[user].history) ? appData[user].history : [];
      appData[user].history = { '1': oldHist, '2': [], '3': [] };
    }
    if (!appData[user].mistakes || !appData[user].mistakes['1']) {
      appData[user].mistakes = { '1': {}, '2': {}, '3': {}, '1_syllable': {} };
    }
    if (!appData[user].mistakes['1_syllable']) {
      appData[user].mistakes['1_syllable'] = {};
    }
    if (!appData[user].timeTracking) {
      appData[user].timeTracking = { '1': {} };
    }
  });
  saveData();
}

function initApp() {
  ensureDataStructure();
  updateProfileDropdown();
}

function showScreen(screenName) {
  Object.values(screens).forEach(screen => {
    if (screen) {
      screen.style.display = 'none';
      screen.classList.remove('active');
    }
  });
  screens[screenName].style.display = 'block';
  screens[screenName].classList.add('active');
}

// --- PROFILE MANAGEMENT LOGIC ---
function updateProfileDropdown() {
  profileSelect.innerHTML = '<option value="">-- Pilih Profil Sedia Ada --</option>';
  Object.keys(appData).forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    profileSelect.appendChild(option);
  });
}

profileSelect.addEventListener('change', (e) => {
  if (e.target.value) {
    newNameInput.value = "";
    padamBtn.style.display = "block";
  } else {
    padamBtn.style.display = "none";
  }
});

newNameInput.addEventListener('input', () => {
  if (newNameInput.value.trim() !== "") {
    profileSelect.value = "";
    padamBtn.style.display = "none";
  }
});

padamBtn.addEventListener('click', () => {
  const selectedName = profileSelect.value;
  if (selectedName && confirm(`Adakah anda pasti mahu memadam profil ${selectedName}?`)) {
    delete appData[selectedName];
    saveData();
    updateProfileDropdown();
    padamBtn.style.display = "none";
  }
});

function saveData() {
  localStorage.setItem('kuiz_ejaan_data', JSON.stringify(appData));
}

// --- BUTTON EVENT LISTENERS ---
mulaBtn.addEventListener('click', () => {
  const selectedProfile = profileSelect.value;
  const newProfile = newNameInput.value.trim();
  
  if (newProfile) {
    currentUser = newProfile;
    if (!appData[currentUser]) {
      appData[currentUser] = { 
        history: { '1':[], '2':[], '3':[] }, 
        mistakes: { '1':{}, '2':{}, '3':{}, '1_syllable':{} },
        timeTracking: { '1':{} }
      };
      saveData();
      updateProfileDropdown();
    }
  } else if (selectedProfile) {
    currentUser = selectedProfile;
  } else {
    alert("Sila pilih profil atau masukkan nama baru.");
    return;
  }

  currentLevel = levelSelect ? parseInt(levelSelect.value, 10) : 1;
  startSession();
});

document.getElementById('kembaliBtn').addEventListener('click', () => showScreen('menu'));
document.getElementById('kembaliAnalisisBtn').addEventListener('click', () => showScreen('menu'));

resultKembaliBtn.addEventListener('click', () => showScreen('menu'));
resultPrestasiBtn.addEventListener('click', () => {
  prestasiName.textContent = currentUser;
  prestasiLevelSelect.value = currentLevel; 
  showScreen('prestasi');
  renderPerformanceChart();
});

prestasiBtn.addEventListener('click', () => {
  const targetUser = profileSelect.value || newNameInput.value.trim();
  if (!targetUser || !appData[targetUser]) return alert("Sila pilih profil dahulu.");
  currentUser = targetUser;
  prestasiName.textContent = currentUser;
  showScreen('prestasi');
  renderPerformanceChart();
});

analisisBtn.addEventListener('click', () => {
  const targetUser = profileSelect.value || newNameInput.value.trim();
  if (!targetUser || !appData[targetUser]) return alert("Sila pilih profil dahulu.");
  currentUser = targetUser;
  analisisName.textContent = currentUser;
  showScreen('analisis');
  renderAnalysis();
});

prestasiLevelSelect.addEventListener('change', renderPerformanceChart);
analisisLevelSelect.addEventListener('change', renderAnalysis);

submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (!submitBtn.disabled) submitBtn.click();
  }
});

abortQuizBtn.addEventListener('click', () => {
  const confirmAbort = confirm("Adakah anda pasti mahu kembali ke menu utama? Markah sesi ini tidak akan disimpan.");
  
  if (confirmAbort) {
    // Stop the voice engine if it's currently spelling a word out loud
    window.speechSynthesis.cancel(); 
    
    // Route back to the main menu (score is naturally lost because endGame() is never called)
    showScreen('menu'); 
  }
});

// --- LINGUISTIC PARSERS ---
function tokenizeWord(word) {
  if (!word) return [];
  const regex = /(NG|NY|SY|KH|GH)|./gi;
  let matches = word.match(regex);
  return matches ? matches.map(t => t.toUpperCase()) : [];
}

function syllabifyCleanWord(word) {
  let safeWord = word
    .replace(/NG/g, "ŋ").replace(/NY/g, "ɲ")
    .replace(/SY/g, "ʃ").replace(/KH/g, "χ").replace(/GH/g, "ɣ");
    
  // 👉 FIX: Removed the '+' after [AEIOU] so it strictly assigns ONE vowel per syllable
  const syllableRegex = /[^AEIOU]*[AEIOU](?:[^AEIOU](?![AEIOU]))*/g;
  
  let matches = safeWord.match(syllableRegex) || [safeWord];
  
  return matches.map(syl => syl
    .replace(/ŋ/g, "NG").replace(/ɲ/g, "NY")
    .replace(/ʃ/g, "SY").replace(/χ/g, "KH").replace(/ɣ/g, "GH")
  );
}

function segmentWordBySyllable(word) {
  const parts = word.split(/([ \-])/); 
  let tokens = [];
  parts.forEach(part => {
    if (part === " " || part === "-") {
      tokens.push(part);
    } else if (part.length > 0) {
      tokens = tokens.concat(syllabifyCleanWord(part));
    }
  });
  return tokens;
}

// --- AUDIO ENGINE ---
const voiceAlert = document.getElementById('voiceAlert');

function checkMalayVoice() {
  const voices = window.speechSynthesis.getVoices();
  // Scan strictly for language code 'ms'
  const hasMalay = voices.some(voice => voice.lang.toLowerCase().includes('ms'));
  
  if (!hasMalay && voiceAlert) {
    voiceAlert.style.display = 'block'; // Show instructions if missing
  } else if (voiceAlert) {
    voiceAlert.style.display = 'none';  // Keep hidden if everything is perfect
  }
}

// Chrome/Android loads voices asynchronously, so we run the check when they change
if (window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = checkMalayVoice;
}

// Fallback execution for Safari/iOS devices on initial load
setTimeout(checkMalayVoice, 500);

function speakWord(word) {
  if (!word) return;
  
  window.speechSynthesis.cancel(); 
  
  const utterance = new SpeechSynthesisUtterance(word);
  const voices = window.speechSynthesis.getVoices();
  
  // Find native Malay voice asset
  const malayVoice = voices.find(voice => voice.lang.toLowerCase().includes('ms'));
  
  if (malayVoice) {
    utterance.voice = malayVoice;
    utterance.lang = malayVoice.lang;
  } else {
    // If missing, enforce standard Malay targeting string
    utterance.lang = 'ms-MY'; 
  }
  
  utterance.rate = 0.6; 
  utterance.pitch = 1.1; 
  
  window.speechSynthesis.speak(utterance);
}

// Bind button to repeat word
if (speakBtn) {
  speakBtn.addEventListener('click', () => {
    speakWord(currentFullWord);
  });
}

// --- GAMEPLAY ENGINE ---
function startSession() {
  score = 0;
  currentQuestionIndex = 0;
  quizGreeting.textContent = `Tahap ${currentLevel}: Selamat Berjaya, ${currentUser}!`;
  
  // Directly grab the single master list from questions.js
  const availableQuestions = (typeof spellingQuestions !== 'undefined') ? spellingQuestions : [];

  if (!availableQuestions || availableQuestions.length === 0) {
    alert("Ralat: Pangkalan data perkataan tidak dijumpai. Pastikan questions.js dimuatkan.");
    return;
  }

  // Shuffle the massive list and pick 10 random words
  let shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
  sessionQuestions = shuffled.slice(0, 10);
  
  showScreen('game');
  loadQuestion();
}

function loadQuestion() {
  // Get the current question object from your list
  const q = sessionQuestions[currentQuestionIndex];
  
  // Access the word directly
  currentFullWord = q.word.toUpperCase(); 
  
  // Trigger the text-to-speech voice engine
  speakWord(currentFullWord); 
  
  // Clear out the previous inputs and RE-ENABLE the input box
  answerInput.value = "";
  answerInput.disabled = false; 
  feedbackMsg.innerHTML = "";
  feedbackMsg.className = "feedback";
  questionStartTime = Date.now();

  // 👉 FIX 1: Reset the button text back to "Jawab" and auto-focus the input
  submitBtn.textContent = "Jawab";
  answerInput.focus();

  // --- AUTOMATIC GAME LAYOUT LOGIC & ANSWER SETTING ---
  if (currentLevel === 1) {
    // Tahap 1: Hide a completely random letter
    let displayArray = currentFullWord.split('');
    
    // 👉 FIX: Generate a random index between 0 and the length of the word
    let hideIndex = Math.floor(Math.random() * displayArray.length); 
    
    currentAnswer = displayArray[hideIndex]; 
    window.currentTargetSyllable = currentAnswer; 
    
    displayArray[hideIndex] = '_'; 
    wordDisplay.textContent = displayArray.join(' ');
  }
  else if (currentLevel === 2) {
    let syllablesArray = segmentWordBySyllable(currentFullWord); 
    
    // Generate a random index for the syllables array
    let hideIndex = Math.floor(Math.random() * syllablesArray.length);
    
    currentAnswer = syllablesArray[hideIndex];
    window.currentTargetSyllable = currentAnswer;
    
    // Create an array of underscores equal to the exact number of letters in the hidden syllable
    let blanksArray = [];
    for (let i = 0; i < currentAnswer.length; i++) {
      blanksArray.push('_');
    }
    
    // Replace the hidden syllable with the blanks (e.g., 4 letters = "_ _ _ _")
    syllablesArray[hideIndex] = blanksArray.join(' ');
    
    // Join the syllables back together with an extra wide space so the 5-year-old eye can easily see the separation
    wordDisplay.textContent = syllablesArray.join('   ');
  }
  else if (currentLevel === 3) {
    // Tahap 3: Full dictation spelling
    // 👉 FIX: The expected answer is the entire word
    currentAnswer = currentFullWord; 
    let blanks = [];
    for (let i = 0; i < currentFullWord.length; i++) {
      blanks.push('_');
    }
    wordDisplay.textContent = blanks.join(' ');
  }
}

function checkAnswer() {
  // 👉 FIX 2: Bulletproof blank check. If the input is active but empty, block it.
  if (!answerInput.disabled && answerInput.value.trim() === "") {
    answerInput.style.borderColor = "#e53e3e";
    setTimeout(() => answerInput.style.borderColor = "#e2e8f0", 500);
    return;
  }

  // Handle transitioning to the next question or the result screen
  if (submitBtn.textContent === "Seterusnya" || submitBtn.textContent === "Lihat Keputusan") {
    currentQuestionIndex++;
    if (currentQuestionIndex < sessionQuestions.length) {
      loadQuestion();
    } else {
      endGame();
    }
    return;
  }

  const timeTaken = Date.now() - questionStartTime;
  
  // Safe string sanitization
  const sanitizedInput = (answerInput.value || "").replace(/[-\s]/g, "").toUpperCase();
  const sanitizedTarget = (currentAnswer || "").replace(/[-\s]/g, "").toUpperCase();

  // Bulletproof object existence checks
  if (!appData[currentUser]) return;
  if (!appData[currentUser].timeTracking) appData[currentUser].timeTracking = { '1': {} };
  if (!appData[currentUser].timeTracking['1']) appData[currentUser].timeTracking['1'] = {};

  // TIME TRACKING (Level 1) 
  if (currentLevel === 1) {
    let strAnswer = (currentAnswer || "").toUpperCase();
    if (strAnswer) {
      if (!appData[currentUser].timeTracking['1'][strAnswer]) {
        appData[currentUser].timeTracking['1'][strAnswer] = { totalTime: 0, count: 0 };
      }
      appData[currentUser].timeTracking['1'][strAnswer].totalTime += timeTaken;
      appData[currentUser].timeTracking['1'][strAnswer].count += 1;
    }
  }

  if (sanitizedInput === sanitizedTarget) {
    feedbackMsg.textContent = "Betul! 🎉";
    feedbackMsg.className = "feedback correct";
    score++;
  } else {
    feedbackMsg.textContent = `Salah. Jawapan: ${currentAnswer || ""}`;
    feedbackMsg.className = "feedback wrong";
    
    let strLevel = currentLevel.toString();
    if (!appData[currentUser].mistakes) appData[currentUser].mistakes = {};
    
    if (currentLevel === 1) {
      if (!appData[currentUser].mistakes['1_syllable']) appData[currentUser].mistakes['1_syllable'] = {};
      let syl = (window.currentTargetSyllable || "").toUpperCase();
      if (syl) {
        appData[currentUser].mistakes['1_syllable'][syl] = (appData[currentUser].mistakes['1_syllable'][syl] || 0) + 1;
      }
    } 
    else if (currentLevel === 2 || currentLevel === 3) {
      if (!appData[currentUser].mistakes[strLevel]) appData[currentUser].mistakes[strLevel] = {};
      
      let targetTokens = tokenizeWord(sanitizedTarget);
      let inputTokens = tokenizeWord(sanitizedInput || " ");
      let maxLen = Math.max(targetTokens.length, inputTokens.length);
      
      for(let i = 0; i < maxLen; i++) {
        if(targetTokens[i] !== inputTokens[i] && targetTokens[i]) {
          let errLetter = targetTokens[i];
          appData[currentUser].mistakes[strLevel][errLetter] = (appData[currentUser].mistakes[strLevel][errLetter] || 0) + 1;
        }
      }
    }
  }
  
  saveData();
  answerInput.disabled = true;
  if (currentQuestionIndex === sessionQuestions.length - 1) {
    submitBtn.textContent = "Lihat Keputusan";
  } else {
    submitBtn.textContent = "Seterusnya";
  }
  submitBtn.focus();
}

function endGame() {
  const percentage = Math.round((score / sessionQuestions.length) * 100);
  const strLevel = currentLevel.toString();
  
  // Failsafe array initialization
  if (!appData[currentUser].history[strLevel]) appData[currentUser].history[strLevel] = [];
  
  appData[currentUser].history[strLevel].push(percentage);
  if (appData[currentUser].history[strLevel].length > 20) {
    appData[currentUser].history[strLevel].shift();
  }
  saveData();
  
  let grade = 'E'; let gradeColor = '#e53e3e';
  if (percentage >= 80) { grade = 'A'; gradeColor = '#38a169'; } 
  else if (percentage >= 60) { grade = 'B'; gradeColor = '#3182ce'; } 
  else if (percentage >= 40) { grade = 'C'; gradeColor = '#d69e2e'; } 
  else if (percentage >= 20) { grade = 'D'; gradeColor = '#dd6b20'; }
  
  finalScoreText.textContent = `${score} / ${sessionQuestions.length}`;
  finalPercentText.textContent = `${percentage}%`;
  finalGradeText.textContent = grade;
  finalGradeText.style.color = gradeColor;
  
  showScreen('result');
}

// --- PRESTASI PIPELINE ---
function renderPerformanceChart() {
  const selectedLevel = prestasiLevelSelect.value;
  const history = (appData[currentUser].history && appData[currentUser].history[selectedLevel]) ? appData[currentUser].history[selectedLevel] : [];
  
  prestasiDataContainer.innerHTML = ''; 
  
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  if (history.length === 0) {
    performanceCanvas.style.display = 'none';
    prestasiDataContainer.innerHTML = `<p style="text-align:center; color:#718096; padding: 20px;">Belum ada rekod permainan untuk Tahap ${selectedLevel}.</p>`;
    return;
  }

  performanceCanvas.style.display = 'block';
  const ctx = performanceCanvas.getContext("2d");
  const labels = history.map((_, index) => `#${index + 1}`);
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `Markah Tahap ${selectedLevel} (%)`,
        data: history,
        borderColor: '#4c51bf',
        backgroundColor: 'rgba(76, 81, 191, 0.1)',
        borderWidth: 3,
        tension: 0.3, fill: true,
        pointBackgroundColor: '#4c51bf', pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      scales: { y: { min: 0, max: 100 } }
    }
  });
}

// --- ANALISIS PIPELINE ---
function renderAnalysis() {
  const selectedLevel = analisisLevelSelect.value;
  const history = (appData[currentUser].history && appData[currentUser].history[selectedLevel]) ? appData[currentUser].history[selectedLevel] : [];
  const container = analisisData;
  
  if (history.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#718096; padding: 20px;">Belum ada rekod untuk Tahap ${selectedLevel}.</p>`;
    return;
  }

  const totalScore = history.reduce((a, b) => a + b, 0);
  const averageScore = Math.round(totalScore / history.length);
  
  let html = `
    <h3 style="margin-top:0; color:#4c51bf;">Statistik Umum</h3>
    <p><strong>Jumlah Kuiz Dimainkan:</strong> ${history.length} sesi</p>
    <p><strong>Purata Markah:</strong> ${averageScore}%</p>
    <hr style="border:0; border-top:1px solid #e2e8f0; margin:15px 0;">
  `;

  if (selectedLevel === "1") {
    const timeData = (appData[currentUser].timeTracking && appData[currentUser].timeTracking['1']) ? appData[currentUser].timeTracking['1'] : {};
    const sylMistakes = (appData[currentUser].mistakes && appData[currentUser].mistakes['1_syllable']) ? appData[currentUser].mistakes['1_syllable'] : {};
    
    let timeAverages = Object.keys(timeData).map(letter => {
       return {
          letter: letter,
          avgTime: timeData[letter].totalTime / timeData[letter].count
       };
    }).sort((a, b) => b.avgTime - a.avgTime).slice(0, 5);

    let sortedSyllables = Object.keys(sylMistakes).sort((a, b) => sylMistakes[b] - sylMistakes[a]).slice(0, 5);

    html += `<h3 style="color:#e53e3e;">Analisis Kelemahan (Tahap 1)</h3>`;
    
    html += `<p style="font-size: 0.9rem; color: #718096; margin-bottom: 5px;"><strong>Top 5 Huruf/Digraf (Purata Masa Terlama):</strong></p>`;
    if(timeAverages.length === 0) {
        html += `<p style="color:#38a169;">Tiada rekod masa.</p>`;
    } else {
        html += `<ul style="padding-left:20px; margin-bottom: 15px;">`;
        timeAverages.forEach(item => {
            html += `<li style="margin-bottom:5px;"><strong>${item.letter}</strong> (${(item.avgTime / 1000).toFixed(1)} saat)</li>`;
        });
        html += `</ul>`;
    }

    html += `<p style="font-size: 0.9rem; color: #718096; margin-bottom: 5px;"><strong>Top 5 Suku Kata Kerap Salah:</strong></p>`;
    if (sortedSyllables.length === 0) {
      html += `<p style="color:#38a169; font-weight:bold;">Hebat! Tiada kesalahan direkodkan.</p>`;
    } else {
      html += `<ul style="padding-left:20px; margin:0;">`;
      sortedSyllables.forEach(syl => {
        html += `<li style="margin-bottom:8px;"><strong>${syl}</strong> (Salah ${sylMistakes[syl]} kali)</li>`;
      });
      html += `</ul>`;
    }
    
  } else {
    const mistakes = (appData[currentUser].mistakes && appData[currentUser].mistakes[selectedLevel]) ? appData[currentUser].mistakes[selectedLevel] : {};
    const sortedMistakes = Object.keys(mistakes).sort((a, b) => mistakes[b] - mistakes[a]).slice(0, 5);
    
    html += `<h3 style="color:#e53e3e;">Analisis Kelemahan (Tahap ${selectedLevel})</h3>`;
    html += `<p style="font-size: 0.9rem; color: #718096; margin-bottom: 10px;"><strong>Top 5 Huruf / Digraf Kerap Salah:</strong></p>`;

    if (sortedMistakes.length === 0) {
      html += `<p style="color:#38a169; font-weight:bold;">Hebat! Tiada kesalahan direkodkan setakat ini.</p>`;
    } else {
      html += `<ul style="padding-left:20px; margin:0;">`;
      sortedMistakes.forEach(item => {
        html += `<li style="margin-bottom:8px;"><strong>${item}</strong> (Salah ${mistakes[item]} kali)</li>`;
      });
      html += `</ul>`;
    }
  }

  container.innerHTML = html;
}

// Boot up the app
initApp();
