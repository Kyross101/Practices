const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const starsContainer = document.querySelector('.stars-container');


for (let i = 0; i < 50; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

 
  const topPosition = Math.random() * 40 + 60; 
  star.style.top = topPosition + '%';
  
  star.style.left = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 3 + 's';
  
  starsContainer.appendChild(star);
}


let confettiParticles = [];
for (let i = 0; i < 100; i++) {
  confettiParticles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 5 + 2,
    d: Math.random() * 1
  });
}

function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = "hsl(" + Math.random()*360 + ", 100%, 50%)";
    ctx.fill();
    p.y += p.d + 1;
    if(p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();


const countdownEl = document.getElementById('countdown');

function updateCountdown() {

  const now = new Date().getTime();
  const newYear = new Date('Jan 01, 2026 00:00:00').getTime();
  const distance = newYear - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
  const seconds = Math.floor((distance % (1000*60))/1000);

  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if(distance < 0){

    clearInterval(countdownInterval);
    countdownEl.textContent = "🎉 Happy New Year! 🎉";
  
  }

}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();