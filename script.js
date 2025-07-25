const playlist = [
  { title: "Sample 1", file: "music1.mp3" },
  { title: "Sample 2", file: "music2.mp3" },
  { title: "Sample 3", file: "music3.mp3" },
];

let currentTrack = 0;
const audio = document.getElementById("audio");
const currentTrackDisplay = document.getElementById("current-track");
const playlistEl = document.getElementById("playlist");

function loadTrack(index) {
  currentTrack = index;
  audio.src = playlist[index].file;
  currentTrackDisplay.textContent = "Playing: " + playlist[index].title;
  updatePlaylistUI();
  audio.play();
}

function updatePlaylistUI() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((li, idx) => {
    li.classList.toggle("active", idx === currentTrack);
  });
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
}

document.getElementById("volume").addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

playlist.forEach((track, index) => {
  const li = document.createElement("li");
  li.textContent = track.title;
  li.addEventListener("click", () => loadTrack(index));
  playlistEl.appendChild(li);
});

// Auto play next track when current ends
audio.addEventListener("ended", nextTrack);
