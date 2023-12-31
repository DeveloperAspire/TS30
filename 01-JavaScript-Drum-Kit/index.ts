"use strict";

class DrumKit {
  keys: NodeList;

  constructor() {
    this.keys = document.querySelectorAll(".key");

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("keydown", (e) => {
      const keyCode = e.key.toUpperCase().charCodeAt(0);

      const key: HTMLDivElement | null = document.querySelector(
        `div[data-key="${keyCode}"]`
      );
      if (!key) return;
      this.playSound(keyCode, key);
    });
  }

  playSound(keyCode: number, keyElement: HTMLDivElement) {
    const audio: HTMLAudioElement | null = document.querySelector(
      `audio[data-key="${keyCode}"]`
    );

    keyElement.classList.add("playing");

    if (!audio) return;

    audio.currentTime = 0;

    audio.play();

    this.removeStyling(keyElement);
  }

  removeStyling(keyElement: HTMLDivElement) {
    keyElement.addEventListener("transitionend", () => {
      keyElement.classList.remove("playing");
    });
  }
}

new DrumKit();
