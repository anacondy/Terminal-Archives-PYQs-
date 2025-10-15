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

    // Listen for Ctrl+K to open search
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchModal.classList.remove('hidden');
            searchInput.focus();
            searchInput.value = '';
        }
        // Listen for Escape key to close search
        if (e.key === 'Escape') {
            if (!searchModal.classList.contains('hidden')) {
                searchModal.classList.add('hidden');
            }
        }
    });

    // Listen for Enter key in search input
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchModal.classList.add('hidden');
            performSearch(searchInput.value);
        }
    });

    // Start the application
    start();
});