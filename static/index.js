// Trending Skills - Fetch from backend API
async function fetchTrendingSkills(){
  try{
    const res = await fetch('/api/trending');
    const data = await res.json();
    const container = document.getElementById('skills-container');
    container.innerHTML='';
    data.trending.forEach(skill=>{
      const card = document.createElement('div');
      card.className='skill-card';
      card.innerText=skill;
      container.appendChild(card);
    });
  }catch(err){ console.log(err); }
}
fetchTrendingSkills();

// Aurora-style particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

class Particle {
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.size=Math.random()*2+1;
    this.speedX=Math.random()*1-0.5;
    this.speedY=Math.random()*1-0.5;
    this.color=`rgba(255,255,255,${Math.random()})`;
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    if(this.x<0||this.x>canvas.width) this.speedX*=-1;
    if(this.y<0||this.y>canvas.height) this.speedY*=-1;
  }
  draw(){
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){ particlesArray=[]; for(let i=0;i<100;i++) particlesArray.push(new Particle()); }
function animateParticles(){ ctx.clearRect(0,0,canvas.width,canvas.height); particlesArray.forEach(p=>{p.update(); p.draw();}); requestAnimationFrame(animateParticles);}
window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; initParticles(); });
initParticles(); animateParticles();
