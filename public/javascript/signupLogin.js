//Enhanced SweetAlert function with better styling
        function showAlert(type, message) {
            Swal.fire({
                icon: type,
                title: type === 'success' ? '🎉 Success!' : '❌ Oops!',
                text: message,
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#333',
                confirmButtonColor: type === 'success' ? '#27ae60' : '#e74c3c',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                customClass: {
                    popup: 'swal2-custom-popup'
                }
            });
        }

        // Enhanced form switching with animation
        function showSignup() {
            const container = document.querySelector('.form-container');
            container.classList.add('switching');

            setTimeout(() => {
                document.getElementById('loginForm').classList.remove('active');
                document.getElementById('signupForm').classList.add('active');
                container.classList.remove('switching');
            }, 150);
        }

        function showLogin() {
            const container = document.querySelector('.form-container');
            container.classList.add('switching');

            setTimeout(() => {
                document.getElementById('signupForm').classList.remove('active');
                document.getElementById('loginForm').classList.add('active');
                container.classList.remove('switching');
            }, 150);
        }

        // Enhanced input validation with visual feedback
        function validateInput(input, isValid) {
            input.classList.remove('valid', 'invalid');
            if (isValid) {
                input.classList.add('valid');
            } else {
                input.classList.add('invalid');
            }
        }

        // Enhanced login validation
        function validateLogin() {
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            let isValid = true;

            // Reset errors and visual states
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

            // Email validation
            const emailValid = email.value && email.value.includes('@') && email.value.includes('.');
            validateInput(email, emailValid);
            if (!emailValid) {
                document.getElementById('loginEmailError').style.display = 'block';
                isValid = false;
            }

            // Password validation
            const passwordValid = password.value && password.value.length > 0;
            validateInput(password, passwordValid);
            if (!passwordValid) {
                document.getElementById('loginPasswordError').style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                const btn = document.querySelector('#loginForm .btn');
                const btnText = btn.querySelector('.btn-text');
                btnText.innerHTML = '<span class="loading"></span>Signing in...';
                btn.disabled = true;

                fetch("https://url-shortener-74fg.onrender.com/auth/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value
                    })
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.status == 'sucess') {
                            showAlert('success', 'Welcome back! Redirecting...');
                            setTimeout(() => {
                                window.location.href = "/";
                            }, 1500);
                        } else {
                            showAlert('error', data.status || 'Login failed. Please try again.');
                            btnText.innerHTML = '🚀 Sign In';
                            btn.disabled = false;
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        showAlert('error', 'Network error. Please check your connection.');
                        btnText.innerHTML = '🚀 Sign In';
                        btn.disabled = false;
                    });
            }
        }

        // Enhanced signup validation
        function validateSignup() {
            const username = document.getElementById('signupUsername');
            const email = document.getElementById('signupEmail');
            const password = document.getElementById('signupPassword');
            let isValid = true;

            // Reset errors and visual states
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

            // Username validation
            const usernameValid = username.value && username.value.length >= 3;
            validateInput(username, usernameValid);
            if (!usernameValid) {
                document.getElementById('signupUsernameError').style.display = 'block';
                isValid = false;
            }

            // Email validation
            const emailValid = email.value && email.value.includes('@') && email.value.includes('.');
            validateInput(email, emailValid);
            if (!emailValid) {
                document.getElementById('signupEmailError').style.display = 'block';
                isValid = false;
            }

            // Password validation
            const passwordValid = password.value && password.value.length >= 8;
            validateInput(password, passwordValid);
            if (!passwordValid) {
                document.getElementById('signupPasswordError').style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                const btn = document.querySelector('#signupForm .btn');
                const btnText = btn.querySelector('.btn-text');
                btnText.innerHTML = '<span class="loading"></span>Creating account...';
                btn.disabled = true;

                fetch("https://url-shortener-74fg.onrender.com/auth/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username.value,
                        email: email.value,
                        password: password.value,
                    })
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.signUP == 'sucess') {
                            showAlert('success', 'Account created successfully! Please sign in.');
                            setTimeout(() => {
                                btnText.innerHTML = '✨ Create Account';
                                btn.disabled = false;
                                username.value = '';
                                email.value = '';
                                password.value = '';
                                showLogin();
                            }, 1500);
                        } else {
                            showAlert('error', data.signUP || 'Registration failed. Please try again.');
                            btnText.innerHTML = '✨ Create Account';
                            btn.disabled = false;
                        }
                    })
                    .catch(error => {
                        console.error('❌ Error:', error);
                        showAlert('error', 'Network error. Please check your connection.');
                        btnText.innerHTML = '✨ Create Account';
                        btn.disabled = false;
                    });
            }
        }

        // Initialize enhanced interactions
        document.addEventListener('DOMContentLoaded', function () {
            // Add real-time input validation
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('input', function () {
                    const errorId = this.id + 'Error';
                    const errorElement = document.getElementById(errorId);
                    if (errorElement) {
                        errorElement.style.display = 'none';
                        this.classList.remove('invalid', 'valid');
                    }
                });

                // Add focus and blur effects
                input.addEventListener('focus', function () {
                    this.parentElement.style.transform = 'translateY(-2px)';
                });

                input.addEventListener('blur', function () {
                    this.parentElement.style.transform = 'translateY(0)';
                });
            });

            // Enhanced Enter key support
            document.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    if (document.getElementById('loginForm').classList.contains('active')) {
                        validateLogin();
                    } else {
                        validateSignup();
                    }
                }
            });

            // Add particle mouse interaction
            document.addEventListener('mousemove', (e) => {
                const particles = document.querySelectorAll('.particle');
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                particles.forEach((particle, index) => {
                    const rect = particle.getBoundingClientRect();
                    const particleX = rect.left + rect.width / 2;
                    const particleY = rect.top + rect.height / 2;

                    const deltaX = mouseX - particleX;
                    const deltaY = mouseY - particleY;
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                    if (distance < 150) {
                        const force = (150 - distance) / 150;
                        const moveX = deltaX * force * 0.05;
                        const moveY = deltaY * force * 0.05;
                        particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.1})`;
                        particle.style.opacity = 0.8 + force * 0.2;
                    } else {
                        particle.style.transform = '';
                        particle.style.opacity = '';
                    }
                });
            });
        });