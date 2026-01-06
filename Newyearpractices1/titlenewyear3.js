const fireCanvas = document.getElementById('fireworkCanvas');
const fireCtx = fireCanvas.getContext('2d');
const confCanvas = document.getElementById('confettiCanvas');
const confCtx = confCanvas.getContext('2d');

function resizeCanvas(){
  fireCanvas.width = confCanvas.width = window.innerWidth;
  fireCanvas.height = confCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


for(let i=0;i<50;i++){
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = Math.random()*100+'%';
  star.style.left = Math.random()*100+'%';
  star.style.animationDelay = Math.random()*3+'s';
  document.body.appendChild(star);
}


let fireworks = [];
function createFirework(x,y){
  const particles = [];
  for(let i=0;i<30;i++){
    particles.push({
      x:x, y:y,
      vx:(Math.random()-0.5)*6,
      vy:(Math.random()-0.5)*6,
      alpha:1,
      color:`hsl(${Math.random()*360},100%,60%)`
    });
  }
  return particles;
}

function animateFireworks(){
  fireCtx.fillStyle='rgba(0,0,0,0.2)';
  fireCtx.fillRect(0,0,fireCanvas.width,fireCanvas.height);
  fireworks.forEach((pArr,i)=>{
    pArr.forEach(p=>{
      p.x+=p.vx;
      p.y+=p.vy;
      p.alpha-=0.02;
      fireCtx.fillStyle=p.color;
      fireCtx.globalAlpha=p.alpha;
      fireCtx.beginPath();
      fireCtx.arc(p.x,p.y,3,0,Math.PI*2);
      fireCtx.fill();
    });
    fireworks[i]=pArr.filter(p=>p.alpha>0);
    if(fireworks[i].length===0) fireworks.splice(i,1);
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();


document.getElementById('titlenewyear3').addEventListener('click', e=>{
  fireworks.push(createFirework(e.clientX,e.clientY));
});


setInterval(()=>{
  fireworks.push(createFirework(Math.random()*fireCanvas.width,Math.random()*fireCanvas.height/2));
},2500);


const confettiColors=['#ff0a54','#ff477e','#ff7096','#ff85a1','#fbb1b9','#f9bec7','#f7cad0'];
let confettiParticles=[];
for(let i=0;i<100;i++){
  confettiParticles.push({
    x:Math.random()*confCanvas.width,
    y:Math.random()*-confCanvas.height,
    w:5+Math.random()*5,
    h:10+Math.random()*5,
    color: confettiColors[Math.floor(Math.random()*confettiColors.length)],
    vy: 2+Math.random()*3,
    vx:(Math.random()-0.5)*1.5
  });
}

function animateConfetti(){
  confCtx.clearRect(0,0,confCanvas.width,confCanvas.height);
  confettiParticles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;
    if(p.y>confCanvas.height)p.y=-10;
    if(p.x>confCanvas.width)p.x=0;
    if(p.x<0)p.x=confCanvas.width;
    confCtx.fillStyle=p.color;
    confCtx.fillRect(p.x,p.y,p.w,p.h);
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();


confettiParticles.forEach(p=>{
  p.x+=p.vx;
  p.y+=p.vy;
  if(p.y>confCanvas.height)p.y=-10;
  if(p.x>confCanvas.width)p.x=0;
  if(p.x<0)p.x=confCanvas.width;

  // draw confetti
  confCtx.fillStyle=p.color;
  confCtx.fillRect(p.x,p.y,p.w,p.h);

  // sparkle overlay
  if(Math.random()<0.05){ // 5% chance
    confCtx.fillStyle='white';
    confCtx.fillRect(p.x + Math.random()*p.w, p.y + Math.random()*p.h, 1, 1);
  }
});