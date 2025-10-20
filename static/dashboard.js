CharacterData.js
document.addEventListener('DOMContentLoaded', async () => {
  const email = localStorage.getItem('userEmail');
  if(!email){ window.location.href='register.html'; return; }

  // Fetch user data from backend
  const res = await fetch('/api/users?email=' + email);
  const data = await res.json();
  const user = data.user;

  // Populate profile info
  document.getElementById('profile-pic').src = user.profilePic || '../assets/default.png';
  document.getElementById('profile-name').innerText = user.name;
  document.getElementById('profile-email').innerText = user.email;

  const teachContainer = document.getElementById('teach-skills');
  user.teachSkills.forEach(skill => {
    const span = document.createElement('span');
    span.innerText = skill;
    teachContainer.appendChild(span);
  });

  const learnContainer = document.getElementById('learn-skills');
  user.learnSkills.forEach(skill => {
    const span = document.createElement('span');
    span.innerText = skill;
    learnContainer.appendChild(span);
  });

  const certContainer = document.getElementById('certificates-container');
  user.certificates.forEach(cert => {
    const img = document.createElement('img');
    img.src = cert;
    certContainer.appendChild(img);
  });

  // Chart.js: Skills taught vs learned
  const ctxSkills = document.getElementById('chart-skills').getContext('2d');
  new Chart(ctxSkills, {
    type:'bar',
    data:{
      labels:['Skills Taught','Skills Learned'],
      datasets:[{
        label:'Skill Count',
        data:[user.teachSkills.length,user.learnSkills.length],
        backgroundColor:['#7C3AED','#A78BFA']
      }]
    },
    options:{ responsive:true, plugins:{legend:{display:false}} }
  });

  // Chart.js: Learning Progress (random demo data)
  const ctxProgress = document.getElementById('chart-progress').getContext('2d');
  new Chart(ctxProgress,{
    type:'line',
    data:{
      labels:['Week1','Week2','Week3','Week4'],
      datasets:[{
        label:'Progress (%)',
        data:[20,45,65,80],
        borderColor:'#F3E8FF',
        backgroundColor:'rgba(243,232,255,0.2)',
        fill:true,
        tension:0.4
      }]
    },
    options:{ responsive:true, plugins:{legend:{display:false}}, scales:{y:{max:100, min:0}} }
  });

  // Start Swapping button - triggers matching
  document.getElementById('start-swapping-btn').addEventListener('click', async ()=>{
    const matchRes = await fetch('/api/match',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ teachSkills:user.teachSkills, learnSkills:user.learnSkills, email:user.email })
    });
    const matchData = await matchRes.json();
    localStorage.setItem('matches', JSON.stringify(matchData.matches));
    window.location.href='chat.html';
  });
});
