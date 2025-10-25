const form = document.getElementById('register-form');
const profileInput = document.getElementById('profilePic');
const profilePreview = document.getElementById('profilePreview');
const profileText = document.getElementById('profilePicText');
const certInput = document.getElementById('certificates');
const certText = document.getElementById('certificatesText');

// Container to display certificate previews
let certPreviewContainer = document.createElement('div');
certPreviewContainer.id = 'certPreviewContainer';
certPreviewContainer.style.display = 'flex';
certPreviewContainer.style.flexWrap = 'wrap';
certPreviewContainer.style.gap = '10px';
certInput.parentNode.appendChild(certPreviewContainer);

// ===== Profile Picture Preview =====
profileInput.addEventListener('change', () => {
  const file = profileInput.files[0];
  if (file) {
    profilePreview.src = URL.createObjectURL(file);
    profilePreview.style.display = 'block';
    profileText.textContent = file.name;
  } else {
    profilePreview.style.display = 'none';
    profileText.textContent = 'Choose a profile photo';
  }
});

// ===== Certificates Preview =====
certInput.addEventListener('change', () => {
  certPreviewContainer.innerHTML = ''; // Clear previous previews
  const files = Array.from(certInput.files);
  certText.textContent = files.map(f => f.name).join(', ') || 'Upload PDF, JPG, or PNG files';

  files.forEach(file => {
    const fileExt = file.name.split('.').pop().toLowerCase();
    let previewEl;

    if (fileExt === 'pdf') {
      // PDF: show icon with link
      previewEl = document.createElement('a');
      previewEl.href = URL.createObjectURL(file);
      previewEl.target = '_blank';
      previewEl.textContent = file.name;
      previewEl.style.color = '#fff';
      previewEl.style.background = 'rgba(0,0,0,0.3)';
      previewEl.style.padding = '5px 10px';
      previewEl.style.borderRadius = '5px';
      previewEl.style.textDecoration = 'none';
    } else {
      // Image: show thumbnail
      previewEl = document.createElement('img');
      previewEl.src = URL.createObjectURL(file);
      previewEl.style.width = '80px';
      previewEl.style.height = '80px';
      previewEl.style.objectFit = 'cover';
      previewEl.style.borderRadius = '8px';
      previewEl.style.border = '2px solid #fff';
    }

    certPreviewContainer.appendChild(previewEl);
  });
});

// ===== Form Submission =====
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Registering...';

  try {
    const formData = new FormData(form);

    const res = await fetch('/auth/register', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      alert('✅ Registration successful! Redirecting to dashboard...');
      localStorage.setItem('userEmail', data.user.email);
      window.location.href = 'dashboard.html';
    } else {
      alert('❌ Registration failed: ' + (data.error || 'Please try again.'));
    }

  } catch (err) {
    console.error(err);
    alert('⚠️ Server error. Please try again later.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Register & Start Swapping';
  }
});
