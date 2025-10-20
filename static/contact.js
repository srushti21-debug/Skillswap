const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  try{
    const res = await fetch('/api/contact',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if(data.success){
      alert('Message sent successfully!');
      contactForm.reset();
    }else{
      alert('Failed to send message: ' + data.error);
    }
  }catch(err){
    console.log(err);
    alert('Server error');
  }
});
