 // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Animate numbers on scroll
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.innerText);
                        const increment = target / 50;
                        let current = 0;
                        
                        const updateNumber = () => {
                            current += increment;
                            if (current < target) {
                                stat.innerText = Math.floor(current) + (stat.innerText.includes('+') ? '+' : '');
                                requestAnimationFrame(updateNumber);
                            } else {
                                stat.innerText = stat.innerText;
                            }
                        };
                        
                        if (!stat.classList.contains('animated')) {
                            stat.classList.add('animated');
                            updateNumber();
                        }
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stats').forEach(section => {
            observer.observe(section);
        });

        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.floating-shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.2);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });