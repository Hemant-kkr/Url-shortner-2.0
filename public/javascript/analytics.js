 // Chart colors
        const colors = [
            'rgba(102, 126, 234, 0.8)',
            'rgba(118, 75, 162, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
        ];

        // Helper function to create no data message
        function showNoData(canvasId, message, icon) {
            const canvas = document.getElementById(canvasId);
            const container = canvas.parentElement;
            container.innerHTML = `
                <div class="no-data">
                    <div class="no-data-icon">${icon}</div>
                    <div>${message}</div>
                </div>
            `;
        }

        // Country Chart
        const countryData = <%- JSON.stringify(countryStats || []) %>;
        const validCountryData = countryData.filter(item => item.country);
        
        if (validCountryData.length > 0) {
            const countryLabels = validCountryData.map(item => item.country);
            const countryCounts = validCountryData.map(item => item.count);

            new Chart(document.getElementById('countryChart'), {
                type: 'doughnut',
                data: {
                    labels: countryLabels,
                    datasets: [{
                        data: countryCounts,
                        backgroundColor: colors.slice(0, countryLabels.length),
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        } else {
            showNoData('countryChart', 'No country data available', '🌍');
        }

        // City Chart
        const cityData = <%- JSON.stringify(cityStats || []) %>;
        const validCityData = cityData.filter(item => item.city);
        
        if (validCityData.length > 0) {
            const cityLabels = validCityData.map(item => item.city);
            const cityCounts = validCityData.map(item => item.count);

            new Chart(document.getElementById('cityChart'), {
                type: 'bar',
                data: {
                    labels: cityLabels,
                    datasets: [{
                        label: 'Clicks',
                        data: cityCounts,
                        backgroundColor: colors[1],
                        borderRadius: 8,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        } else {
            showNoData('cityChart', 'No city data available', '🏙️');
        }

        // Device Chart
        const deviceData = <%- JSON.stringify(deviceStats || []) %>;
        const validDeviceData = deviceData.filter(item => item.device);
        
        if (validDeviceData.length > 0) {
            const deviceLabels = validDeviceData.map(item => item.device);
            const deviceCounts = validDeviceData.map(item => item.count);

            new Chart(document.getElementById('deviceChart'), {
                type: 'pie',
                data: {
                    labels: deviceLabels,
                    datasets: [{
                        data: deviceCounts,
                        backgroundColor: colors.slice(0, deviceLabels.length),
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        } else {
            showNoData('deviceChart', 'No device data available', '📱');
        }

        // Browser Chart
        const browserData = <%- JSON.stringify(browserStats || []) %>;
        const validBrowserData = browserData.filter(item => item.browser);
        
        if (validBrowserData.length > 0) {
            const browserLabels = validBrowserData.map(item => item.browser);
            const browserCounts = validBrowserData.map(item => item.count);

            new Chart(document.getElementById('browserChart'), {
                type: 'polarArea',
                data: {
                    labels: browserLabels,
                    datasets: [{
                        data: browserCounts,
                        backgroundColor: colors.slice(0, browserLabels.length),
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        }
                    }
                }
            });
        } else {
            showNoData('browserChart', 'No browser data available', '🌐');
        }