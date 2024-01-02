class VideoPlayer {
  constructor() {
    this.videoEl = document.querySelector(".player__video");
    this.playBtn = document.querySelector(".toggle");
    this.volumeBtn = document.querySelector("[name='volume']");
    this.playBackBtn = document.querySelector("[name='playbackRate']");
    this.progressBar = document.querySelector(".progress__filled");
    this.progress = document.querySelector(".progress");
    this.skipBtns = document.querySelectorAll(".player__button");

    this.addEventListeners();
  }

  addEventListeners() {
    // PLAY 'N' PAUSE
    this.playBtn.addEventListener("click", () => {
      this.handlePlayNPause();
    });

    // VOLUME BUTTON
    this.volumeBtn.addEventListener("change", (e) => {
      this.videoEl.volume = e.target.value;
    });
    this.volumeBtn.addEventListener("mousemove", (e) => {
      this.videoEl.volume = e.target.value;
    });

    // PLAYBACK BUTTON
    this.playBackBtn.addEventListener("change", (e) => {
      this.videoEl.playbackRate = e.target.value;
    });
    this.playBackBtn.addEventListener("mousemove", (e) => {
      this.videoEl.playbackRate = e.target.value;
    });

    // SKIP BUTTONS
    this.skipBtns.forEach((btn) => {
      btn.addEventListener("click", this.handleSkip.bind(this));
    });

    // SEEKING
    this.progress.addEventListener("click", this.handleSeeking.bind(this));

    // VIDEO ELEMENT
    this.videoEl.addEventListener("timeupdate", () => {
      this.handleProgressBar();
    });

    this.videoEl.addEventListener("click", () => {
      this.handlePlayNPause();
    });
  }

  handleProgressBar() {
    const currentTime =
      (this.videoEl.currentTime / this.videoEl.duration) * 100;
    this.progressBar.style.flexBasis = `${currentTime}%`;
  }

  handlePlayNPause() {
    if (this.videoEl.paused) {
      this.videoEl.play();
      this.playBtn.textContent = "❚❚";
    } else {
      this.videoEl.pause();
      this.playBtn.textContent = "►";
    }
  }

  handleSkip(e) {
    const data = e.target.dataset.skip;

    this.videoEl.currentTime += +data;
  }

  handleSeeking(e) {
    this.videoEl.currentTime =
      (e.offsetX / this.progress.offsetWidth) * this.videoEl.duration;
  }
}

new VideoPlayer();
