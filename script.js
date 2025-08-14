// Elements
const introScreen = document.getElementById('introScreen');
const startBtn = document.getElementById('startBtn');
const mainContent = document.getElementById('mainContent');
const noteInput = document.getElementById('noteInput');
const submitNoteBtn = document.getElementById('submitNote');
const petalsContainer = document.querySelector('.petals-container');
const affirmationMessage = document.getElementById('affirmationMessage');

// Breathing Tool Elements
const breathingPresetSelect = document.getElementById('breathingPreset');
const breathingVisual = document.getElementById('breathingVisual');
const breathingText = document.getElementById('breathingText');
const startBreathingBtn = document.getElementById('startBreathing');

// Audio Tool Elements
const meditationSelect = document.getElementById('meditationSelect');
const meditationAudio = document.getElementById('meditationAudio');
const meditationDesc = document.getElementById('meditationDesc');

// Store user thoughts if you want to extend later
const userThoughts = [];

// Start Button Event Listener
startBtn.addEventListener('click', () => {
  introScreen.style.opacity = '0';
  setTimeout(() => {
    introScreen.style.display = 'none';
    mainContent.style.display = 'flex';
  }, 600);
});

// Handle Thought Submission
submitNoteBtn.addEventListener('click', () => {
  const note = noteInput.value.trim();
  if (note.length === 0) return;
  userThoughts.push(note);
  noteInput.value = '';
  alert("Your thought has been sent into the wind 🌬️");
});

// Affirmations Array
const affirmations = [
  "You are enough.",
  "Your presence matters.",
  "Breathe, you are safe.",
  "This moment is yours.",
  "You bring light to the world.",
  "Peace begins with you.",
  "You are seen and valued."
];

// Create Petals Function
function createPetal(text, delay) {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.textContent = text;
  petal.style.animationDelay = `${delay}s`;

  petal.addEventListener('click', () => {
    showAffirmationMessage(text);
  });

  petalsContainer.appendChild(petal);
}

// Show Affirmation Message
function showAffirmationMessage(text) {
  affirmationMessage.textContent = text;
  affirmationMessage.style.opacity = '1';

  setTimeout(() => {
    affirmationMessage.style.opacity = '0';
  }, 4000);
}

// Populate Petals with Affirmations
function populatePetals() {
  petalsContainer.innerHTML = '';
  affirmations.forEach((affirmation, i) => {
    createPetal(affirmation, i * 0.3 + 0.1);
  });
}

// Breathing Tool Logic
let breathingInterval;

function startBreathing() {
  const preset = breathingPresetSelect.value;
  let inhaleDuration, holdDuration, exhaleDuration;

  if (preset === "box") {
    inhaleDuration = 4;
    holdDuration = 4;
    exhaleDuration = 4;
  } else if (preset === "calm") {
    inhaleDuration = 5;
    holdDuration = 5;
    exhaleDuration = 5;
  } else if (preset === "energize") {
    inhaleDuration = 3;
    holdDuration = 3;
    exhaleDuration = 3;
  }

  breathingVisual.style.transition = `transform ${inhaleDuration}s ease-in-out`;
  breathingText.textContent = `Inhale for ${inhaleDuration}s`;

  breathingVisual.style.transform = 'scale(1.3)'; // Inhale
  setTimeout(() => {
    breathingText.textContent = `Hold for ${holdDuration}s`;
    setTimeout(() => {
      breathingVisual.style.transform = 'scale(1)'; // Exhale
      breathingText.textContent = `Exhale for ${exhaleDuration}s`;
    }, holdDuration * 1000);
  }, inhaleDuration * 1000);
}

startBreathingBtn.addEventListener('click', startBreathing);

// Audio Tool Logic
meditationSelect.addEventListener('change', () => {
  const selectedAudio = meditationSelect.value;
  if (selectedAudio) {
    meditationAudio.src = selectedAudio;
    meditationAudio.play();
    const audioName = meditationSelect.options[meditationSelect.selectedIndex].text;
    meditationDesc.textContent = `Enjoy your session: ${audioName}`;
  }
});

// Initialize Petals on Load
populatePetals();
const gratitudeInput = document.getElementById('gratitudeInput');
const submitGratitudeBtn = document.getElementById('submitGratitude');
const thankYouMessage = document.getElementById('thankYouMessage');
const happySpaceSection = document.getElementById('happySpaceSection');
const gratitudeList = document.getElementById('gratitudeList');
const clearGratitudeBtn = document.getElementById('clearGratitude');

// Load existing gratitude from localStorage
function loadGratitude() {
  const savedGratitude = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
  gratitudeList.innerHTML = savedGratitude.map(gratitude => `<p>🌿 ${gratitude}</p>`).join('');
  if (savedGratitude.length > 0) {
    happySpaceSection.style.display = 'block';
  }
}

// Add new gratitude entry to localStorage
submitGratitudeBtn.addEventListener('click', () => {
  const gratitudeText = gratitudeInput.value.trim();

  if (gratitudeText.length === 0) {
    alert("It's okay to start small, just a simple gratitude will do.");
    return;
  }

  // Save to localStorage
  const savedGratitude = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
  savedGratitude.push(gratitudeText);
  localStorage.setItem('gratitudeEntries', JSON.stringify(savedGratitude));

  // Clear the input field and show a thank you message
  gratitudeInput.value = '';
  thankYouMessage.textContent = 'Thank you for sharing your gratitude today! 🌿';

  // Show the thank you message with a gentle fade-in
  setTimeout(() => {
    thankYouMessage.style.opacity = 1;
  }, 100);

  // Hide the message after a few seconds
  setTimeout(() => {
    thankYouMessage.style.opacity = 0;
  }, 4000);

  loadGratitude();
});

// Clear all gratitude entries from localStorage
clearGratitudeBtn.addEventListener('click', () => {
  localStorage.removeItem('gratitudeEntries');
  loadGratitude();
});

// Load gratitude entries when the page loads
window.onload = loadGratitude;


const visualizationSelect = document.getElementById('visualizationSelect');
const visualizationImage = document.getElementById('visualizationImage');
const visualizationAudio = document.getElementById('visualizationAudio');

// Visualization options
const visuals = {
  forest: {
    image: 'path/to/forest.jpg',
    audio: 'path/to/forest.mp3',
  },
  beach: {
    image: 'path/to/beach.jpg',
    audio: 'path/to/beach.mp3',
  },
  mountain: {
    image: 'path/to/mountain.jpg',
    audio: 'path/to/mountain.mp3',
  },
};

visualizationSelect.addEventListener('change', () => {
  const selected = visualizationSelect.value;
  visualizationImage.innerHTML = `<img src="${visuals[selected].image}" alt="${selected}">`;
  visualizationAudio.querySelector('source').src = visuals[selected].audio;
  visualizationAudio.load(); // Reload audio
});
const moodSlider = document.getElementById('moodSlider');
const moodLabel = document.getElementById('moodLabel');
const submitMood = document.getElementById('submitMood');
const moodHistory = document.getElementById('moodHistory');

const moodColors = {
  1: '#D43F3F', // Red (Sad)
  2: '#D77C48', // Orange (Low mood)
  3: '#D7B648', // Yellow (Neutral)
  4: '#A8D748', // Light Green (Better mood)
  5: '#7BD748', // Green (Good mood)
  6: '#48D7A8', // Light Teal (Very Good)
  7: '#48D7D7', // Teal (Happy)
  8: '#48A8D7', // Light Blue (Excited)
  9: '#48A8D7', // Blue (Very Happy)
  10: '#3F48D7'  // Deep Blue (Ecstatic)
};

// Update the mood label and background color based on slider value
moodSlider.addEventListener('input', () => {
  const moodValue = moodSlider.value;
  moodLabel.textContent = `Mood: ${moodValue}`;
  moodLabel.style.color = moodColors[moodValue];
  moodSlider.style.background = moodColors[moodValue];
});

submitMood.addEventListener('click', () => {
  const moodValue = moodSlider.value;
  const moodEntry = document.createElement('div');
  const date = new Date().toLocaleString();
  moodEntry.textContent = `Mood: ${moodValue} (Logged at ${date})`;
  moodEntry.style.color = moodColors[moodValue];

  // Add to the mood history
  moodHistory.appendChild(moodEntry);

  // Optionally, you can reset the slider after logging
  moodSlider.value = 5; // Neutral
  moodLabel.textContent = "Mood: 5";
  moodLabel.style.color = '#3B4C45'; // Reset color
});
