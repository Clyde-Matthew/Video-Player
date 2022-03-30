const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const durationEL = document.getElementById("time-duration");
const fullScreenBtn = document.querySelector(".fullscreen");
const speed = document.querySelector(".player-speed");
const player = document.querySelector(".player");

let lastVolume = 1;

// Play & Pause ----------------------------------- //
function showIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showIcon();
  }
}

// Progress Bar ---------------------------------- //
// calculate display time format
function displayTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  sec = sec > 9 ? sec : `0${sec}`;
  return `${min}:${sec}`;
}

// update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  displayTime(video.currentTime);
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  durationEL.textContent = `${displayTime(video.duration)}`;
}

// click on progress bar to seek video
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = video.duration;
  video.currentTime = (clickX / width) * duration;
}
// Volume Controls --------------------------- //
// volume bar

function changeVolume(e) {
  let volume = e.offsetX / this.clientWidth;
  if (volume < 0.1) {
    volume = 0;
  }

  if (volume > 0.9) {
    volume = 1;
  }
  video.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;
  volumeRange.setAttribute("title", `${Math.round(volume * 100)}%`);

  // change depending on the volume
  volumeIcon.className = "";
  if (volume > 0.5) {
    volumeIcon.className = "";
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.5 && volume > 0.1) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeRange.setAttribute("title", "Muted");
  }

  lastVolume = volume;
}

// mute / unmute
function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeRange.setAttribute("title", "Muted");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add("fas", "fa-volume-up");
    volumeIcon.setAttribute("title", "Mute");
    volumeRange.setAttribute("title", `${Math.round(lastVolume * 100)}%`);
  }
}

// Change Playback rate -------------------- //
function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

// open fullscreen
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  }
}
/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

let fullscreen = false;

//   toggleFullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
    fullscreen = true;
  } else {
    closeFullscreen(player);
    fullscreen = false;
  }
  fullscreen = !fullscreen;
}
// Event Listeners ---------------------------- //
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullScreenBtn.addEventListener("click", toggleFullscreen);
