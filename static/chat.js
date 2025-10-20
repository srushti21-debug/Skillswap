// Connect to Socket.IO server
const socket = io();

// Elements
const chatBox = document.getElementById('chat-box');
const input = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const fileInput = document.getElementById('file-input');
const videoBtn = document.getElementById('video-btn');

// Append message
function appendMessage(text, sender, type='text'){
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  if(type==='text'){ msgDiv.innerText = text; }
  else if(type==='file'){
    const link = document.createElement('a');
    link.href=text;
    link.target='_blank';
    link.innerText='📎 File Received';
    msgDiv.appendChild(link);
  }
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send text
sendBtn.addEventListener('click',()=>{
  const msg = input.value.trim();
  if(msg==='') return;
  appendMessage(msg,'user');
  socket.emit('chat message',{ type:'text', message:msg });
  input.value='';
});

// Enter key
input.addEventListener('keydown',e=>{if(e.key==='Enter') sendBtn.click();});

// Send file
fileInput.addEventListener('change',e=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(evt){
    socket.emit('chat message',{ type:'file', message:evt.target.result, fileName:file.name });
    appendMessage(file.name,'user','file');
  }
  reader.readAsDataURL(file);
});

// Video call placeholder
videoBtn.addEventListener('click',()=>{
  alert('Video call feature coming soon! Can be integrated with WebRTC.');
});

// Receive messages
socket.on('chat message', data=>{
  if(data.type==='text') appendMessage(data.message,'bot');
  else if(data.type==='file') appendMessage(data.message,'bot','file');
});

// Aurora-style particles (reuse from index)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
let particlesArray=[];
class Particle{constructor(){this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.size=Math.random()*2+1; this.speedX=Math.random()*1-0.5; this.speedY=Math.random()*1-0.5; this.color=`rgba(255,255,255,${Math.random()})`;} update(){this.x+=this.speedX; this.y+=this.speedY; if(this.x<0||this.x>canvas.width)this.speedX*=-1; if(this.y<0||this.y>canvas.height)this.speedY*=-1;} draw(){ctx.fillStyle=this.color; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill();}}
function initParticles(){particlesArray=[]; for(let i=0;i<100;i++) particlesArray.push(new Particle());}
function animateParticles(){ctx.clearRect(0,0,canvas.width,canvas.height); particlesArray.forEach(p=>{p.update(); p.draw();}); requestAnimationFrame(animateParticles);}
window.addEventListener('resize',()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight; initParticles();});
initParticles(); animateParticles();
