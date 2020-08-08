// 获取播放器对象
let videoContainer = document.getElementById('video-container');
let control = document.getElementById('control-button');
// 获取视频对象--HTMLVideoElement
let video = document.getElementById('video');
// 获取控制图标对象
let controlIcon = document.getElementById('control-icon');
// 获取控制音量对象
let volumeButton = document.getElementById('volume-button');
// 获取音量图标对象
let volumeIcon = document.getElementById('volume-icon');
// 获取音量滑块对象
let volume = document.getElementById('volume');
// 获取当前时间对象
let timeElapsed = document.getElementById('time-elapsed');
// 获取总时长对象
let duration = document.getElementById('duration');
let seek = document.getElementById('seek');
// 获取全屏按钮对象
let fullscreenButton = document.getElementById('fullscreen-button');
let fullscreenIcon = document.getElementById('fullsceen-icon');
// 控制按钮对象的单击事件
control.addEventListener('click', () => {
  // 视频播放或暂停
  if (video.paused || video.ended) {
    video.play();
    controlIcon.src = 'icons/pause.png';
  } else {
    video.pause();
    controlIcon.src = 'icons/play.png';
  }
}) 
// 音量按钮对象的事件
volumeButton.addEventListener('click', () => {
  video.muted = !video.muted;
  // 如果视频对象静音
  // 1）先拿到
  // 2）值为0
  // 3）音量图标为静音
  if (video.muted ||volume.dataVolume==0) {
    // 将静音之前的音量存储到自定义属性data-volume中
    volume.dataVolume = volume.value;
    // 设置滑块的值为0
    volume.value = 0;
    volumeIcon.src = 'icons/volume-off1.png';
  } else {
    volumeIcon.src = 'icons/volume-on.png';
    volume.value = volume.dataVolume;
  }
})
// 音量滑块对象的事件input change click后两个松手才触发
volume.addEventListener('input', () => {
  // 如果视频已经静音了
  if (video.muted) {
    video.muted = false;
    volumeIcon.src = 'icons/volume-on.png';  
  }
  // 滑块滑动到最左侧
  if (volume.value == 0) {
    volumeIcon.src = 'icons/volume-off1.png';
  } else {
    volumeIcon.src = 'icons/volume-on.png';  
  }
  // 视频对象的音量为音量滑块对象的值
  video.volume = volume.value;
  // 将滑块音量保存到自定义属性中，为防止用户拖动滑块后直接单击静音，记住每次的变化，能够得到最后的值
  volume.dataVolume = volume.value;
})
// 通过自定义属性data-*，在静音之前，把音量存到data-*里面

// 获取当前时间和总时长----在loadeddata事件触发时
video.addEventListener('loadeddata', () => {
  // 当前时间
  timeElapsed.innerText = formatTime(video.currentTime);
  // 总时长
  duration.innerText = formatTime(video.duration);
  // 滑块的最大值
  seek.max = parseInt(video.duration);
})
// 实时更新当前时间
video.addEventListener('timeupdate', () => {
  // 当前时间
  timeElapsed.innerText = formatTime(video.currentTime);
  duration.innerText = formatTime(video.duration);
})
// 全屏按钮的事件
fullscreenButton.addEventListener('click', () => {
  console.log(document.fullscreenElement);
  // null或者是这个标签
  if (document.fullscreenElement) {
   //有全屏元素就退出 
    document.exitFullscreen();
    fullscreenIcon.src = 'icons/fullscreen.png';
  } else {
    // 否则退出
    videoContainer.requestFullscreen();
    fullscreenIcon.src = 'icons/fullscreen-exit.png';
  }

})
// 格式化时间的自定义函数
// 1000s:40
function formatTime(time) {
  time = parseInt(time);
  let minutes = parseInt(time / 60);
  let seconds = parseInt(time % 60);
  // 小于10前面就要拼接0
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return minutes + ':' + seconds;
}