for (let i = 0; i < 50; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 3 + 's';
  document.body.appendChild(star);
  
}

const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const slider = document.getElementById('musicSlider');

bgMusic.addEventListener('loadedmetadata', () => {
  slider.max = Math.floor(bgMusic.duration);
});


playBtn.addEventListener('click', () => {
  if(bgMusic.paused){
    bgMusic.play();
    playBtn.textContent = '⏸ Pause Music';
  } else {
    bgMusic.pause();
    playBtn.textContent = '▶ Play Music';
  }
});

slider.addEventListener('input', () => {
  bgMusic.currentTime = slider.value;
});


bgMusic.addEventListener('timeupdate', () => {
  slider.value = Math.floor(bgMusic.currentTime);
});
