const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
  mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close when clicking overlay
overlay.addEventListener('click', () => {
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
  mobileMenuBtn.textContent = '☰';
});

// Close when clicking a link (mobile only)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      mobileMenuBtn.textContent = '☰';
    }
  });
});

// Reset menu on resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    mobileMenuBtn.textContent = '☰';
  }
});

// Logout function
async function logout() {
  try {
    const res = await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) {
      window.location.href = '/login';
    }
  } catch (err) {
    console.error("Logout Error", err);
  }
}
