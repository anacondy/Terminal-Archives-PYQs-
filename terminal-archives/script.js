document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');

    // --- Database of Previous Year Papers ---
    // In a real application, this would come from a server.
    const papersDB = [
        { subject: 'Physics', year: 2024, title: 'B.Sc. Physics Paper I - Mechanics', url: '#' },
        { subject: 'Physics', year: 2023, title: 'B.Sc. Physics Paper II - Electromagnetism', url: '#' },
        { subject: 'Statistics', year: 2024, title: 'B.Sc. Statistics Paper I - Probability Theory', url: '#' },
        { subject: 'Statistics', year: 2023, title: 'B.Sc. Statistics Paper II - Statistical Inference', url: '#' },
        { subject: 'Computer Application', year: 2024, title: 'B.Sc. Comp App Paper I - C++ Programming', url: '#' },
        { subject: 'Computer Application', year: 2023, title: 'B.Sc. Comp App Paper II - Data Structures', url: '#' },
    ];

    // --- Device Detection & Stats System ---
    
    // Robust device detection
    function detectDevice() {
        const ua = navigator.userAgent;
        const platform = navigator.platform;
        const maxTouchPoints = navigator.maxTouchPoints || 0;
        
        // Detect device type with emoji
        let deviceType = '👽'; // Default: other
        let deviceName = 'Unknown';
        let isMobile = false;
        
        // Check for mobile devices
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        isMobile = mobileRegex.test(ua) || maxTouchPoints > 0;
        
        // Detailed device detection
        if (/iPhone/.test(ua)) {
            deviceType = '🍎';
            deviceName = 'iPhone';
            isMobile = true;
        } else if (/iPad|iPod/.test(ua)) {
            deviceType = '🍏';
            deviceName = ua.includes('iPad') ? 'iPad' : 'iPod';
            isMobile = true;
        } else if (/Macintosh/.test(ua) && maxTouchPoints > 1) {
            deviceType = '🍏';
            deviceName = 'iPad (Safari Desktop Mode)';
            isMobile = true;
        } else if (/Mac/.test(platform)) {
            deviceType = '🍏';
            deviceName = 'Mac';
            isMobile = false;
        } else if (/Android/.test(ua)) {
            deviceType = '🐶';
            deviceName = 'Android';
            isMobile = true;
        } else if (/Windows/.test(ua) || /Win/.test(platform)) {
            deviceType = '🪟';
            deviceName = 'Windows';
            isMobile = false;
        } else if (/Linux/.test(ua) || /Linux/.test(platform)) {
            deviceType = '🐧';
            deviceName = 'Linux';
            isMobile = false;
        } else if (/CrOS/.test(ua)) {
            deviceType = '🤖';
            deviceName = 'ChromeOS';
            isMobile = false;
        }
        
        return { deviceType, deviceName, isMobile, userAgent: ua };
    }
    
    // Stats tracking system
    function initStats() {
        const device = detectDevice();
        const today = new Date().toDateString();
        
        // Get or initialize stats
        let stats = JSON.parse(localStorage.getItem('terminalStats') || '{}');
        
        // Initialize structure if needed
        if (!stats.visits) stats.visits = {};
        if (!stats.devices) stats.devices = {};
        if (!stats.firstVisit) stats.firstVisit = today;
        
        // Track today's visit
        if (!stats.visits[today]) {
            stats.visits[today] = 0;
        }
        stats.visits[today]++;
        
        // Track device
        const deviceKey = `${device.deviceType} ${device.deviceName}`;
        if (!stats.devices[deviceKey]) {
            stats.devices[deviceKey] = 0;
        }
        stats.devices[deviceKey]++;
        
        // Store last visit info
        stats.lastVisit = today;
        stats.lastDevice = deviceKey;
        
        // Save to localStorage
        localStorage.setItem('terminalStats', JSON.stringify(stats));
        
        return { stats, device };
    }
    
    // Calculate stats for display
    function calculateStats() {
        const stats = JSON.parse(localStorage.getItem('terminalStats') || '{}');
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        const todayVisits = stats.visits?.[today] || 0;
        const yesterdayVisits = stats.visits?.[yesterday] || 0;
        
        // Calculate this month's visits
        const now = new Date();
        const thisMonth = `${now.getFullYear()}-${now.getMonth()}`;
        let monthVisits = 0;
        
        for (const date in stats.visits) {
            const visitDate = new Date(date);
            const visitMonth = `${visitDate.getFullYear()}-${visitDate.getMonth()}`;
            if (visitMonth === thisMonth) {
                monthVisits += stats.visits[date];
            }
        }
        
        return {
            todayVisits,
            yesterdayVisits,
            monthVisits,
            devices: stats.devices || {},
            firstVisit: stats.firstVisit,
            totalDays: Object.keys(stats.visits || {}).length
        };
    }
    
    // Show stats page
    function showStats() {
        const statsData = calculateStats();
        const device = detectDevice();
        
        // Create stats modal
        let statsModal = document.getElementById('stats-modal');
        if (!statsModal) {
            statsModal = document.createElement('div');
            statsModal.id = 'stats-modal';
            statsModal.className = 'stats-modal';
            document.body.appendChild(statsModal);
        }
        
        statsModal.innerHTML = `
            <div class="stats-content">
                <h2>📊 Terminal Archives Statistics</h2>
                <div class="stats-section">
                    <h3>📅 Visit Statistics</h3>
                    <p>Today: <span class="highlight">${statsData.todayVisits}</span> visits</p>
                    <p>Yesterday: <span class="highlight">${statsData.yesterdayVisits}</span> visits</p>
                    <p>This Month: <span class="highlight">${statsData.monthVisits}</span> visits</p>
                    <p>First Visit: <span class="highlight">${statsData.firstVisit}</span></p>
                    <p>Total Days: <span class="highlight">${statsData.totalDays}</span> days</p>
                </div>
                <div class="stats-section">
                    <h3>🖥️ Device Breakdown</h3>
                    ${Object.entries(statsData.devices).map(([device, count]) => 
                        `<p>${device}: <span class="highlight">${count}</span> visits</p>`
                    ).join('')}
                </div>
                <div class="stats-section">
                    <h3>💻 Current Session</h3>
                    <p>Device: <span class="highlight">${device.deviceType} ${device.deviceName}</span></p>
                    <p>Mobile: <span class="highlight">${device.isMobile ? 'Yes' : 'No'}</span></p>
                </div>
                <p class="stats-close-hint">Press Escape or F+S again to close</p>
            </div>
        `;
        
        statsModal.classList.remove('hidden');
    }
    
    // Hide stats page
    function hideStats() {
        const statsModal = document.getElementById('stats-modal');
        if (statsModal) {
            statsModal.classList.add('hidden');
        }
    }
    
    // Initialize stats on page load
    const { stats, device } = initStats();

    // --- Core Functions ---

    // Function to add a line to the terminal
    // Note: Only use this with trusted content. For user input, sanitize first.
    function addLine(text, className = '', isHTML = true) {
        const line = document.createElement('div');
        if (isHTML) {
            line.innerHTML = text; // Only for trusted HTML content
        } else {
            line.textContent = text; // Safer for untrusted content
        }
        if (className) {
            line.className = `line ${className}`;
        } else {
            line.className = 'line';
        }
        output.appendChild(line);
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    // Function to sanitize user input to prevent XSS
    function sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Function to simulate a delay
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to show and run a progress bar
    async function showProgressBar(text, duration) {
        const line = document.createElement('div');
        line.className = 'line progress-bar-container';
        line.innerHTML = `<span>${text}</span><div class="progress-bar"></div>`;
        output.appendChild(line);
        await sleep(duration);
        line.remove();
    }

    // --- Startup Sequence ---
    async function start() {
        addLine('// Welcome to the Terminal Archives.', 'comment');
        addLine('// All data is loaded locally for demonstration.', 'comment');
        await sleep(1000);

        await showProgressBar('Initializing system...', 1500);
        addLine('<span class="prompt">system@archives:~$</span> <span class="command">fetch --device-info</span>');
        await sleep(500);

        await showProgressBar('Connecting to browser API...', 2000);
        await fetchDeviceInfo();

        await sleep(1000);
        addLine('<span class="prompt">system@archives:~$</span> <span class="command">ready</span>');
        addLine('System ready. Press <span class="highlight">Ctrl + K</span> to search the database.');
    }

    // --- Functionality ---

    async function fetchDeviceInfo() {
        addLine('Device Information:');

        // 1. CPU Cores
        const cores = navigator.hardwareConcurrency || 'N/A';
        addLine(`  - Logical CPU Cores: <span class="highlight">${cores}</span>`);

        // 2. Approximate RAM
        const memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB (approx.)` : 'N/A';
        addLine(`  - Device Memory (RAM): <span class="highlight">${memory}</span>`);

        // 3. Browser Storage
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            const usageMB = (estimate.usage / 1024 / 1024).toFixed(2);
            const quotaMB = (estimate.quota / 1024 / 1024).toFixed(2);
            addLine(`  - Browser Storage Quota: <span class="highlight">${usageMB} MB used / ${quotaMB} MB total</span>`);
        } else {
            addLine('  - Browser Storage: API not supported.');
        }
        addLine('// Note: Browser security prevents access to total disk space or system RAM.', 'comment');
    }

    function performSearch(query) {
        if (!query) return;

        // Sanitize user input to prevent XSS
        const sanitizedQuery = sanitizeHTML(query);
        addLine(`<span class="prompt">user@archives:~$</span> <span class="command">search --query="${sanitizedQuery}"</span>`);

        showProgressBar('Searching database...', 1500).then(() => {
            const lowerQuery = query.toLowerCase();
            const results = papersDB.filter(paper =>
                paper.subject.toLowerCase().includes(lowerQuery) ||
                paper.year.toString().includes(lowerQuery) ||
                paper.title.toLowerCase().includes(lowerQuery)
            );

            if (results.length > 0) {
                addLine(`Found <span class="highlight">${results.length}</span> result(s):`);
                results.forEach(paper => {
                    // Sanitize paper data to prevent XSS
                    const sanitizedTitle = sanitizeHTML(paper.title);
                    const sanitizedUrl = sanitizeHTML(paper.url);
                    addLine(`  <div class="search-result">[${paper.year}] <a href="${sanitizedUrl}" target="_blank" rel="noopener noreferrer">${sanitizedTitle}</a></div>`);
                });
            } else {
                addLine('No results found for your query.');
            }
             addLine('<br/>// Press <span class="highlight">Ctrl + K</span> to search again.');
        });
    }

    // --- Event Listeners ---
    
    // F+S key combination handler for stats
    let fKeyPressed = false;
    let sKeyPressed = false;
    let keyPressTimer = null;
    let keyHoldDuration = 0;
    const REQUIRED_HOLD_TIME = 2000; // 2 seconds
    
    window.addEventListener('keydown', (e) => {
        // Track F and S keys
        if (e.key.toLowerCase() === 'f') {
            if (!fKeyPressed) {
                fKeyPressed = true;
                keyHoldDuration = 0;
                if (sKeyPressed) {
                    startStatsTimer();
                }
            }
        }
        if (e.key.toLowerCase() === 's') {
            if (!sKeyPressed) {
                sKeyPressed = true;
                keyHoldDuration = 0;
                if (fKeyPressed) {
                    startStatsTimer();
                }
            }
        }
        
        // Listen for Ctrl+K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchModal.classList.remove('hidden');
            searchInput.focus();
            searchInput.value = '';
        }
        
        // Listen for Escape key to close modals
        if (e.key === 'Escape') {
            if (!searchModal.classList.contains('hidden')) {
                searchModal.classList.add('hidden');
            }
            hideStats();
        }
    });
    
    window.addEventListener('keyup', (e) => {
        if (e.key.toLowerCase() === 'f') {
            fKeyPressed = false;
            stopStatsTimer();
        }
        if (e.key.toLowerCase() === 's') {
            sKeyPressed = false;
            stopStatsTimer();
        }
    });
    
    function startStatsTimer() {
        if (keyPressTimer) return; // Timer already running
        
        keyPressTimer = setInterval(() => {
            keyHoldDuration += 100;
            if (keyHoldDuration >= REQUIRED_HOLD_TIME && fKeyPressed && sKeyPressed) {
                showStats();
                stopStatsTimer();
            }
        }, 100);
    }
    
    function stopStatsTimer() {
        if (keyPressTimer) {
            clearInterval(keyPressTimer);
            keyPressTimer = null;
            keyHoldDuration = 0;
        }
    }

    // Listen for Enter key in search input
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchModal.classList.add('hidden');
            performSearch(searchInput.value);
        }
    });
    
    // Mobile search button handler (CSS controls visibility)
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', () => {
            searchModal.classList.remove('hidden');
            searchInput.focus();
            searchInput.value = '';
        });
    }

    // Start the application
    start();
});