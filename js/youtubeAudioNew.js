let mode = "",
  ytPlayer,
  animationFrameId = null,
  loaderInterval,
  isPlaying = false,
  isSeeking = false,
  wasPlayingBeforeSeek = false;

const audioEl = document.getElementById("localAudio");
const seekSlider = document.getElementById("seekSlider");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const loader = document.getElementById("loader");
const playPauseBtn = document.getElementById("playPauseBtn");
const replayBtn = document.getElementById("replayBtn"); // Replay button

// Load YouTube IFrame API
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

function isYouTube(url) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function extractVideoId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function showLoader() {
  loader.style.display = "block";
  let percent = 0;
  loader.textContent = "Loading... 0%";
  loaderInterval = setInterval(() => {
    percent += Math.floor(Math.random() * 10) + 5;
    if (percent >= 100) percent = 99;
    loader.textContent = `Loading... ${percent}%`;
  }, 150);
}

function hideLoader() {
  clearInterval(loaderInterval);
  loader.textContent = "Loading... 100%";
  setTimeout(() => (loader.style.display = "none"), 300);
}

// YouTube API ready
window.onYouTubeIframeAPIReady = function () {
  if (isYouTube(audioSource)) {
    const videoId = extractVideoId(audioSource);
    if (!videoId) return alert("Invalid YouTube URL");

    mode = "youtube";
    showLoader();

    ytPlayer = new YT.Player("youtubePlayer", {
      height: "0",
      width: "0",
      videoId,
      playerVars: { autoplay: 0, controls: 0 },
      events: {
        onReady: () => {
          hideLoader();

          // Wait for duration to be available
          const waitForDuration = setInterval(() => {
            const duration = ytPlayer.getDuration();
            if (duration > 0) {
              durationEl.textContent = formatTime(duration);
              clearInterval(waitForDuration);
            }
          }, 300);
        },
        onStateChange: (event) => {
          const state = event.data;
          if (state === YT.PlayerState.PLAYING) {
            updateButton(true);
            updateProgressLoop();
          } else if (
            state === YT.PlayerState.PAUSED ||
            state === YT.PlayerState.ENDED
          ) {
            updateButton(false);
            stopProgressLoop();
            if (state === YT.PlayerState.ENDED) {
              seekSlider.value = 100;
            }
          }
        },
      },
    });
  }
};

// Page load setup
window.onload = () => {
  if (!audioSource) return alert("No audio source set.");

  if (isYouTube(audioSource)) {
    // Wait for YouTube API
  } else {
    mode = "file";
    audioEl.src = audioSource;
    showLoader();
    audioEl.load();

    audioEl.addEventListener("loadedmetadata", () => {
      hideLoader();
      durationEl.textContent = formatTime(audioEl.duration);
    });

    audioEl.addEventListener("play", () => {
      updateButton(true);
      updateProgressLoop();
    });

    audioEl.addEventListener("pause", () => {
      updateButton(false);
      stopProgressLoop();
    });

    audioEl.addEventListener("ended", () => {
      seekSlider.value = 100;
      updateButton(false);
      stopProgressLoop();
    });
  }
};

// Handle dragging start - pause playback & flag
seekSlider.addEventListener("mousedown", () => {
  isSeeking = true;
  wasPlayingBeforeSeek = isPlaying;
  if (mode === "file" && audioEl) audioEl.pause();
  else if (mode === "youtube" && ytPlayer) ytPlayer.pauseVideo();
});

seekSlider.addEventListener("touchstart", () => {
  isSeeking = true;
  wasPlayingBeforeSeek = isPlaying;
  if (mode === "file" && audioEl) audioEl.pause();
  else if (mode === "youtube" && ytPlayer) ytPlayer.pauseVideo();
});

// Handle dragging end - seek & resume if was playing
seekSlider.addEventListener("mouseup", (e) => {
  isSeeking = false;
  handleSeek(e.target.value);
  if (wasPlayingBeforeSeek) {
    if (mode === "file" && audioEl) audioEl.play();
    else if (mode === "youtube" && ytPlayer) ytPlayer.playVideo();
  }
});

seekSlider.addEventListener("touchend", (e) => {
  isSeeking = false;
  handleSeek(e.target.value);
  if (wasPlayingBeforeSeek) {
    if (mode === "file" && audioEl) audioEl.play();
    else if (mode === "youtube" && ytPlayer) ytPlayer.playVideo();
  }
});

function togglePlay() {
  if (mode === "youtube" && ytPlayer) {
    const state = ytPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      ytPlayer.pauseVideo();
    } else {
      ytPlayer.playVideo();
    }
  } else if (mode === "file") {
    if (audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  }
}

function updateButton(playing) {
  isPlaying = playing;
  playPauseBtn.src = playing ? "images/pause2.png" : "images/play2.png";
}

function seek(seconds) {
  if (mode === "youtube" && ytPlayer) {
    ytPlayer.seekTo(ytPlayer.getCurrentTime() + seconds, true);
  } else if (mode === "file") {
    audioEl.currentTime += seconds;
  }
}

function handleSeek(val) {
  const percent = parseFloat(val);
  if (mode === "youtube" && ytPlayer?.getDuration) {
    ytPlayer.seekTo((ytPlayer.getDuration() * percent) / 100, true);
  } else if (mode === "file" && audioEl.duration) {
    audioEl.currentTime = (audioEl.duration * percent) / 100;
  }
}

function updateProgressLoop() {
  function update() {
    if (!isSeeking) {
      let current = 0,
        duration = 0;

      if (mode === "youtube" && ytPlayer?.getCurrentTime) {
        current = ytPlayer.getCurrentTime();
        duration = ytPlayer.getDuration();
      } else if (mode === "file") {
        current = audioEl.currentTime;
        duration = audioEl.duration;
      }

      if (duration > 0) {
        const percent = (current / duration) * 100;
        if (percent >= 99.5 || current >= duration) {
          seekSlider.value = 100;
        } else {
          seekSlider.value = percent;
        }
        durationEl.textContent = formatTime(duration);
      }

      currentTimeEl.textContent = formatTime(current);
    }
    animationFrameId = requestAnimationFrame(update);
  }

  if (!animationFrameId) {
    update(); // Start loop
  }
}

function stopProgressLoop() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Replay Button Event Listener
replayBtn.addEventListener("click", () => {
  if (mode === "youtube" && ytPlayer) {
    ytPlayer.seekTo(0, true); // Seek to the start
    ytPlayer.playVideo();    // Play video
  } else if (mode === "file" && audioEl) {
    audioEl.currentTime = 0; // Reset audio to start
    audioEl.play();          // Play audio
  }
});

// 
$('.container-sub').children().css({'width': '560px','height': '500px'});
$('.audio-container').css({'width': '90%','height': '90%'}).removeClass('mb-3');
$('.audio-container').parent().addClass('d-flex justify-content-center align-items-center');

