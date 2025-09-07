 // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking on overlay
    navLinks.addEventListener('click', (e) => {
      if (e.target === navLinks) {
        navLinks.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
      }
    });

    // Close menu when clicking on a link (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          mobileMenuBtn.textContent = '☰';
        }
      });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
      }
    });

    // Your existing logout function
    async function logout() {
      try {
        const res = await fetch('/auth/logout', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          window.location.href = '/login';
        }
      } catch (err) {
        console.error("Logout Error", err);
      }
    }