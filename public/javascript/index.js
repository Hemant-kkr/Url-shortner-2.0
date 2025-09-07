  // Smooth scroll for navigation
        // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        //     anchor.addEventListener('click', function (e) {
        //         e.preventDefault();
        //         const target = document.querySelector(this.getAttribute('href'));
        //         if (target) {
        //             target.scrollIntoView({ behavior: 'smooth' });
        //         }
        //     });
        // });

        // URL Shortener functionality
        document.getElementById('shortenBtn').addEventListener('click', async () => {
            const urlInput = document.getElementById('urlInput');
            const shortenBtn = document.getElementById('shortenBtn');
            const resultDiv = document.getElementById('result');
            const btnContent = shortenBtn.querySelector('.btn-content');

            const urlValue = urlInput.value.trim();

            // Validation
            if (!urlValue) {
                showResult('⚠️ Please enter a URL', 'error');
                shakeInput();
                return;
            }

            if (!isValidUrl(urlValue)) {
                showResult('⚠️ Please enter a valid URL (include http:// or https://)', 'error');
                shakeInput();
                return;
            }

            // Loading state
            shortenBtn.disabled = true;
            btnContent.innerHTML = '<div class="loading-spinner"></div><span>Shortening...</span>';

            try {
                const response = await fetch('https://url-shortener-74fg.onrender.com/url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url: urlValue })
                });

                if (response.ok) {
                    const data = await response.json();
                    const shortUrl = `https://url-shortener-74fg.onrender.com/rq/${data.id}`;

                    showResult(`
                        <div style="text-align: left;">
                            <h3 style="color: #10b981; margin-bottom: 1rem; font-size: 1.3rem;">
                                ✅ Success! Your short URL is ready
                            </h3>
                            <div class="shortened-url-box">
                                <a href="${shortUrl}" class="url-link" target="_blank">${shortUrl}</a>
                                <button class="copy-btn" onclick="copyToClipboard('${shortUrl}', this)">
                                    📋 Copy
                                </button>
                            </div>
                            <p style="margin-top: 1rem; font-size: 0.9rem; color: #64748b;">
                                Original: ${urlValue.substring(0, 50)}${urlValue.length > 50 ? '...' : ''}
                            </p>
                        </div>
                    `, 'success');

                    // Clear input with animation
                    urlInput.value = '';
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    showResult(`❌ ${errorData.message || 'Unable to shorten URL. Please try again.'}`, 'error');
                }
            } catch (error) {
                console.error('Network error:', error);
                showResult('🌐 Network error. Please check your connection.', 'error');
            } finally {
                shortenBtn.disabled = false;
                btnContent.innerHTML = '<span class="btn-text">✨ Shorten URL</span>';
            }
        });

        // Enter key support
        document.getElementById('urlInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('shortenBtn').click();
            }
        });

        function isValidUrl(string) {
            try {
                new URL(string);
                return string.startsWith('http://') || string.startsWith('https://');
            } catch (_) {
                return false;
            }
        }

        function showResult(message, type = 'success') {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = message;
            resultDiv.className = `result-container show ${type}`;
        }

        function shakeInput() {
            const input = document.getElementById('urlInput');
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }

      function   copyToClipboard(shortUrl, x){
        x.innerText= 'Copied';
        navigator.clipboard.writeText(shortUrl);
      }
