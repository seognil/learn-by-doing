const video = document.querySelector('video');

const $player = document.querySelector('.player__controls');
const $barTotal = $player.querySelector('.progress');
const $barCurrentTime = $player.querySelector('.progress__filled');
const $btnPlay = $player.querySelector('.player__button.toggle');
const $inputVolume = $player.querySelector('input[name="volume"]');
const $inputSpeed = $player.querySelector('input[name="playbackRate"]');
const $btnSkips = $player.querySelectorAll('button.player__button');

$barCurrentTime.style.flexBasis = '0%';

// * ----------------

const togglePlay = () => (video.paused ? video.play() : video.pause());

const updatePlayTime = (v) => (video.currentTime = v);

const range = ([a, b], v) => Math.min(b, Math.max(a, v));

const updateVolumn = (v, raw = true) => (video.volume = raw ? v : range([0, 1], video.volume + v));
const updateSpeed = (v, raw = true) =>
  (video.playbackRate = raw ? v : range([0.5, 2], video.playbackRate + v));
const skip = (v) => (video.currentTime += v);

// * ----------------

const updatePlayBtn = () => ($btnPlay.innerText = video.paused ? '►' : '❚ ❚');

const updateProgressBar = () => {
  $barCurrentTime.style.flexBasis = (video.currentTime / video.duration) * 100 + '%';
};
const updatePlayTimeByBar = (e) =>
  updatePlayTime((e.offsetX / $barTotal.offsetWidth) * video.duration);

const updateInputSpeed = (e) => {
  $inputSpeed.value = e.target.playbackRate;
};
const updateInputVolume = (e) => {
  $inputVolume.value = e.target.volume;
};

// * ----------------

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgressBar);
video.addEventListener('play', updatePlayBtn);
video.addEventListener('pause', updatePlayBtn);
video.addEventListener('volumechange', updateInputVolume);
video.addEventListener('ratechange', updateInputSpeed);

// * ----------------

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    togglePlay();
  } else if (e.code === 'ArrowLeft') {
    skip(-5);
  } else if (e.code === 'ArrowRight') {
    skip(5);
  } else if (e.code === 'ArrowUp') {
    updateVolumn(0.1, false);
  } else if (e.code === 'ArrowDown') {
    updateVolumn(-0.1, false);
  }
});

$btnPlay.addEventListener('click', togglePlay);

$inputVolume.addEventListener('input', (e) => updateVolumn(e.target.value));
$inputSpeed.addEventListener('input', (e) => updateSpeed(e.target.value));
$btnSkips.forEach((btn) =>
  btn.addEventListener('click', (e) => skip(Number(e.target.dataset.skip))),
);

let mousedown = false;
$barTotal.addEventListener('click', updatePlayTimeByBar);
$barTotal.addEventListener('mousedown', (e) => (mousedown = true));
window.addEventListener('mouseup', (e) => (mousedown = false));
$barTotal.addEventListener('mousemove', (e) => mousedown && updatePlayTimeByBar(e));
