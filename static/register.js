const form = document.getElementById('register-form');

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  
  const formData = new FormData(form);

  try{
    const res = await fetch('/auth/register', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if(data.success){
      alert('Registration successful! Redirecting to dashboard...');
      localStorage.setItem('userEmail', data.user.email);
      window.location.href = 'dashboard.html';
    } else {
      alert('Registration failed: ' + data.error);
    }

  } catch(err){
    console.log(err);
    alert('Server error');
  }
});
