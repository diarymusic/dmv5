<template>
  <div class="audio-player text-black">
    <div class="audio-info">
      <div class="song-name">
        {{ songName }}
      </div>
      <div class="controlsrow">
        <div class="controls">
          <button class="play-pause" @click="togglePlay">
            <i
              class="text-black playAndPause"
              :class="isPlaying ? 'ri-pause-fill' : 'ri-play-fill'"
            ></i>
          </button>
        </div>
        <div
          class="progress-bar"
          :id="'bar' + songid"
          @mousedown="startDrag"
          @click="handleClick"
        >
          <div class="progress" :style="{ width: progress + '%' }"></div>
          <div
            class="progress-handle"
            :style="{ left: progress + '%' }"
            @mousedown="startDrag"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
    .audio-player {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    -webkit-user-drag: none;
}
.controlsrow {
    border-left: #ffffff 2px solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px 0 10px;
    border-radius: 0;
    -webkit-user-drag: none;
}
body{
    -webkit-user-select: none;
    user-select: none;
}
.audio-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
}

.song-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
}

.progress-bar {
    position: relative;
    width: 100%;
    height: 10px;
    background-color: #ccc;
    border-radius: 5px;
}

.progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #333;
    border-radius: 5px 0 0 5px;
}

.progress-handle {
    position: absolute;
    top: -5px;
    left: 0;
    width: 10px;
    height: 20px;
    background-color: #333;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
}

.controls {
    display: flex;
    align-items: center;
}

.play-pause {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 20px;
    color: #ffffff;
}

i{
    transition: transform 0.2s;
}

.ri-play-fill:hover {
    transform: scale(1.05);
}

.ri-pause-fill:hover {
    transform: scale(1.05);
}
</style>
<script>
var audiosMap = [];
function createAudio({ songname, src }) {
  var audio = new Audio(src);
  audiosMap.push({
    songname: songname,
    src: audio,
  });
  console.log("Current Audios : %d", audiosMap.length);
  return audio;
}
function showPlaying() {
  audiosMap.forEach(function (audio) {
    if (!audio.src.paused) {
      console.log(audio);
      console.log(!audio.src.paused);
      document.querySelector(".playingname").innerText = audio.songname;
      document.querySelector(".notifyPlay").classList.add("show");
    }
  });
}
function pauseAllAudio(th) {
  document.querySelectorAll(".playAndPause").forEach((el) => {
    el.classList.remove("ri-pause-fill");
    el.classList.add("ri-play-fill");
  });
  audiosMap.forEach(function (audio) {
    if (audio.src != th) {
      audio.src.pause();
    }
  });
}
function audioSpectrum() {
  var currentAudio = null;
  audiosMap.forEach((el) => {
    currentAudio = el.src.isPlaying ? null : el.src;
  });

  // 创建音频上下文
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioContext.createAnalyser();
  var source = audioContext.createMediaElementSource(currentAudio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  // 创建Canvas元素
  var canvas = document.getElementById("frequencySpectrum");
  var canvasCtx = canvas.getContext("2d");

  // 设置频谱参数
  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  // 绘制频谱
  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.fillStyle = "rgb(0, 0, 0)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    var barWidth = (canvas.width / bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      canvasCtx.fillStyle = `rgb(${barHeight + 100},${barHeight + 100},${
        barHeight + 100
      })`;
      canvasCtx.fillRect(
        x,
        canvas.height - barHeight / 2,
        barWidth,
        barHeight / 2
      );
      x += barWidth + 1;
    }
  }

  // 开始绘制
  draw();
}

export default {
  data() {
    return {
      audio: null,
      isPlaying: false,
      progress: 0,
      dragStartX: 0,
      dragStartProgress: 0,
    };
  },
  props: {
    songName: {
      type: String,
      required: true,
    },
    songPath: {
      type: String,
      required: true,
    },
    songid: {
      type: Number,
      required: true,
    },
    songArts: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log(this.songName);
    this.audio = createAudio({
      songname: this.songName,
      src: this.songPath,
    });
    this.audio.addEventListener("timeupdate", this.updateProgress);
    this.audio.addEventListener("ended", this.resetPlayer);
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        pauseAllAudio(this.audio);
        audioSpectrum();
        // showPlaying()
        this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    updateProgress() {
      const { currentTime, duration } = this.audio;
      this.progress = (currentTime / duration) * 100;
    },
    startDrag(event) {
      this.dragStartX = event.clientX;
      this.dragStartProgress = this.progress;
      document.addEventListener("mousemove", this.handleDrag);
      document.addEventListener("mouseup", this.stopDrag);
    },
    startBarDrag(event) {
      this.dragStartX = event.clientX;
      this.dragStartProgress = this.progress;
      document.addEventListener("mousemove", this.handleBar);
      document.addEventListener("mouseup", this.stopBarDrag);
    },
    handleDrag(event) {
      const deltaX = event.clientX - this.dragStartX;
      const progressBarWidth = document.getElementById(
        `bar${this.songid}`
      ).offsetWidth;
      const progressDelta = (deltaX / progressBarWidth) * 100;
      this.progress = this.dragStartProgress + progressDelta;
      this.audio.currentTime = (this.progress / 100) * this.audio.duration;
    },
    handleBar(event) {
      const progressBarWidth = document.getElementById(
        `bar${this.songid}`
      ).offsetWidth;
      const clickX = event.target.getBoundingClientRect().left;
      const progress = (clickX / progressBarWidth) * 100;
      this.progress = progress;
      this.audio.currentTime = (progress / 100) * this.audio.duration;
    },
    handleClick(event) {
      const progressBarWidth = document.getElementById(
        `bar${this.songid}`
      ).offsetWidth;
      const clickX = event.clientX - event.target.getBoundingClientRect().left;
      const progress = (clickX / progressBarWidth) * 100;
      this.progress = progress;
      this.audio.currentTime = (progress / 100) * this.audio.duration;
    },
    stopDrag() {
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    stopBarDrag() {
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    resetPlayer() {
      this.isPlaying = false;
      this.progress = 0;
      this.audio.currentTime = 0;
    },
  },
};
</script>