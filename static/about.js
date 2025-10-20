// Optional: Add floating animation randomization for bubbles
const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach(bubble => {
  bubble.style.left = Math.random()*100 + '%';
  bubble.style.animationDuration = (10 + Math.random()*10) + 's';
  bubble.style.width = 20 + Math.random()*30 + 'px';
  bubble.style.height = bubble.style.width;
});
