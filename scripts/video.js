let control = document.getElementById('control-button');
let video = document.getElementById('video');
let controlIcon = document.getElementById('control-icon');
let volumeButton = document.getElementById('volume-button');
let volumeIcon = document.getElementById('volume-icon');
let volume = document.getElementById('volume');
let timeElapsed = document.getElementById('time-elapsed');
let duration = document.getElementById('duration');
let seek = document.getElementById('seek');
// 设置暂停播放
function pauseOrplay() {
  if (video.paused || video.ended) {
    video.play();
    controlIcon.src = 'icons/pause.png';
  } else {
    video.pause();
    controlIcon.src = 'icons/play.png';
  }
}
// 静音非静音切换
function nono() {
  if (video.volume > 0) {
    video.volume = 0;
    volume.value = 0;
    volumeIcon.src='icons/volume-off1.png'
  } else {
    video.volume = 1;
    volume.value = 0.5;
    volumeIcon.src='icons/volume-on.png'
  }
}
// 拖动滑块显示音量的变化
function hy() {
  video.volume = volume.value;
  if (video.volume == 0) {
    volumeIcon.src = 'icons/volume-off1.png';
  } else {
    volumeIcon.src='icons/volume-on.png'
  }
}
// 监听第一帧的媒体事件
video.onloadeddata = () => {
  video.volume = volume.value;
  timeElapsed.innerText = parseInt(video.currentTime);
  duration.innerText = parseInt(video.duration);
}
// 监听媒体对象的currentTime发生变化的事件
// 触发timeupdate事件
video.ontimeupdate = () => {
  timeElapsed.innerText = parseInt(video.currentTime);
  duration.innerText = parseInt(video.duration);
}
function dhy() {
  if (seek.value == 0) {
    timeElapsed.innerText = 0;
    duration.innerText = parseInt(video.duration);
    controlIcon.src = 'icons/play.png';
  } else {
    timeElapsed.innerText = seek.value;
  duration.innerText = parseInt(video.duration);
  }
}
