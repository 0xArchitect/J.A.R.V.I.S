import { LocalStorageKeys } from 'constants/common';

import CONNOR_1 from 'assets/audio-video/connor1.mp3';
import CONNOR_2 from 'assets/audio-video/connor2.mp3';
import CONNOR_3 from 'assets/audio-video/connor3.mp3';
import FLIGHT_SFX_AMBIENCE from 'assets/audio-video/FLIGHT-SFX-AMBIENCE.mp3';
import FLIGHT_SFX_BUTTON from 'assets/audio-video/FLIGHT-SFX-button.mp3';
import FLIGHT_SFX_CONFIRMATION from 'assets/audio-video/FLIGHT-SFX-confirmation.mp3';
import FLIGHT_SFX_ERROR from 'assets/audio-video/FLIGHT-SFX-error.mp3';
import FLIGHT_SFX_UI_BEGINS from 'assets/audio-video/FLIGHT-SFX-UI BEGINS.mp3';
import ENTRY_AUDIO from 'assets/audio-video/passenger_entry_music.m4a';
import SFX_CLICK from 'assets/audio-video/SFX-click.mp3';
import SFX_HOVER from 'assets/audio-video/SFX-hover.mp3';
import gsap from 'gsap';

export const audio = {
  sfxHover: new Audio(SFX_HOVER),
  sfxClick: new Audio(SFX_CLICK),
  flightSfxUiBegins: new Audio(FLIGHT_SFX_UI_BEGINS),
  flightSfxButton: new Audio(FLIGHT_SFX_BUTTON),
  flightSfxConfirmation: new Audio(FLIGHT_SFX_CONFIRMATION),
  flightSfxError: new Audio(FLIGHT_SFX_ERROR),
  flightSfxAmbience: new Audio(FLIGHT_SFX_AMBIENCE),
  connor1: new Audio(CONNOR_1),
  connor2: new Audio(CONNOR_2),
  connor3: new Audio(CONNOR_3),
  entryAudio: new Audio(ENTRY_AUDIO),
};

audio.flightSfxAmbience.loop = true;

function getMute() {
  return JSON.parse(localStorage.getItem(LocalStorageKeys.MUTE) || 'false') as boolean;
}

function play(a: HTMLAudioElement) {
  const isMute = getMute();
  if (isMute) return;

  a.currentTime = 0;
  a.play();
}

function stop(a: HTMLAudioElement) {
  gsap.to(a, {
    volume: 0,
    duration: 2,
    onComplete: () => {
      a.pause();
      a.currentTime = 0;
      a.volume = getMute() ? 0 : 1;
    },
  });
}

function setMute(isMute: boolean) {
  localStorage.setItem(LocalStorageKeys.MUTE, String(isMute));

  const animation = { value: isMute ? 1 : 0 };
  const soundObjects = Object.values(audio);
  gsap.to(animation, {
    value: isMute ? 0 : 1,
    duration: 1,
    onUpdate: () => {
      soundObjects.forEach(s => {
        s.volume = animation.value;
      });
    },
  });
}

const Sound = {
  play,
  stop,
  getMute,
  playSfxClick: () => play(audio.sfxClick),
  playSfxHover: () => play(audio.sfxHover),
  sfxHover: () => play(audio.sfxHover),
  setMute,
  playFlightAmbience: () => play(audio.flightSfxAmbience),
  playFlightSfxUiBegins: () => play(audio.flightSfxUiBegins),
  playFlightSfxButton: () => play(audio.flightSfxButton),
  playFlightSfxConfirmation: () => play(audio.flightSfxConfirmation),
  playFlightSfxError: () => play(audio.flightSfxError),
};

export default Sound;
