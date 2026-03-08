// Confetti Effect
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = ['#ff6b9d', '#c44569', '#fecfef', '#ff9a9e'][Math.floor(Math.random() * 4)];
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

// Typing Animation
function typeWriter(text, element, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Days Counter
function calculateDays() {
    const startDate = new Date('2025-06-21'); // Updated to first meet date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Time Since Met Counter
function getTimeSince(date) {
    const now = new Date();
    const diff = now - date;
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const years = Math.floor(totalDays / 365.25);
    const daysInYear = totalDays % 365.25;
    const months = Math.floor(daysInYear / 30.44);
    const days = Math.floor(daysInYear % 30.44);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    return { years, months, days, hours, minutes, seconds };
}

function updateTimeCounter() {
    const metDate = new Date('2025-06-21');
    const time = getTimeSince(metDate);
    const counterElement = document.getElementById('time-counter');
    if (counterElement) {
        counterElement.innerHTML = `${time.years} Years ${time.months} Months ${time.days} Days<br>${time.hours} Hours ${time.minutes} Minutes ${time.seconds} Seconds<br>with Suggi ❤️`;
    }
}

// Lightbox
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Surprise Popup
function showSurprise() {
    const popup = document.getElementById('surprise-popup');
    popup.style.display = 'flex';
    // Trigger heart animation or something
    createHearts();
}

function closeSurprise() {
    document.getElementById('surprise-popup').style.display = 'none';
}

function createHearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(heart);
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 3000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Confetti on index
    if (document.querySelector('.animated-title')) {
        createConfetti();
    }

    // Confetti on memories
    if (document.querySelector('.journey-section')) {
        createConfetti();
    }

    // Typing on letter page
    const typedText = document.getElementById('typed-text');
    if (typedText) {
        const message = "Dear Suggi,\n\nFrom the moment you came into my life everything became more beautiful.\nThis small website is just a little reminder of how special you are to me.\n\nHappy Birthday my Suggi ❤️";
        typeWriter(message, typedText);
    }

    // Days counter
    const daysCounter = document.getElementById('days-counter');
    if (daysCounter) {
        daysCounter.textContent = calculateDays() + ' days';
    }

    // Time counter
    updateTimeCounter();
    setInterval(updateTimeCounter, 1000);
});

// Add confetti styles dynamically
const confettiStyles = `
.confetti-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
}
.confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    animation: fall 3s linear infinite;
}
@keyframes fall {
    0% { transform: translateY(-10px) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(360deg); }
}
.floating-heart {
    position: fixed;
    font-size: 2rem;
    animation: floatUp 3s ease-out forwards;
    z-index: 1100;
}
@keyframes floatUp {
    0% { transform: translateY(100vh); opacity: 1; }
    100% { transform: translateY(-100px); opacity: 0; }
}
`;

const style = document.createElement('style');
style.textContent = confettiStyles;
document.head.appendChild(style);

// Music Player
let currentSongIndex = 0;
const songs = [
    { title: "Perfect", artist: "Ed Sheeran", src: "music/perfect.mp3" },
    { title: "Until I Found You", artist: "Stephen Sanchez", src: "music/until-i-found-you.mp3" },
    { title: "Yellow", artist: "Coldplay", src: "music/yellow.mp3" }
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const songTitleEl = document.getElementById('songTitle');
const songArtistEl = document.getElementById('songArtist');

function loadSong(song) {
    songTitleEl.textContent = song.title;
    songArtistEl.textContent = song.artist;
    audio.src = song.src;
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '⏸️';
    } else {
        audio.pause();
        playBtn.innerHTML = '▶️';
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playBtn.innerHTML = '⏸️';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playBtn.innerHTML = '⏸️';
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update time display
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    if (!isNaN(duration)) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners for Music Player
if (audio) {
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    playBtn.addEventListener('click', playPause);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    progressContainer.addEventListener('click', setProgress);

    // Load first song
    loadSong(songs[currentSongIndex]);
}