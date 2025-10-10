// Terminal Archives - PYQs System
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const commandHistory = [];
let historyIndex = -1;

// Sample PYQ data structure
const pyqDatabase = {
    'mathematics': [
        { year: 2023, semester: 'Fall', topic: 'Calculus' },
        { year: 2023, semester: 'Spring', topic: 'Linear Algebra' },
        { year: 2022, semester: 'Fall', topic: 'Differential Equations' }
    ],
    'physics': [
        { year: 2023, semester: 'Fall', topic: 'Quantum Mechanics' },
        { year: 2023, semester: 'Spring', topic: 'Thermodynamics' },
        { year: 2022, semester: 'Fall', topic: 'Electromagnetism' }
    ],
    'computer-science': [
        { year: 2023, semester: 'Fall', topic: 'Data Structures' },
        { year: 2023, semester: 'Spring', topic: 'Algorithms' },
        { year: 2022, semester: 'Fall', topic: 'Operating Systems' }
    ],
    'chemistry': [
        { year: 2023, semester: 'Fall', topic: 'Organic Chemistry' },
        { year: 2023, semester: 'Spring', topic: 'Physical Chemistry' },
        { year: 2022, semester: 'Fall', topic: 'Inorganic Chemistry' }
    ]
};

// Command handlers
const commands = {
    help: () => {
        return `
<div class="command-output">
  <p><strong>Available Commands:</strong></p>
  <table>
    <tr><td>help</td><td>Display this help message</td></tr>
    <tr><td>list</td><td>List all available subjects</td></tr>
    <tr><td>show &lt;subject&gt;</td><td>Display PYQs for a specific subject</td></tr>
    <tr><td>search &lt;keyword&gt;</td><td>Search for PYQs by keyword</td></tr>
    <tr><td>about</td><td>Display information about this system</td></tr>
    <tr><td>clear</td><td>Clear the terminal screen</td></tr>
    <tr><td>date</td><td>Display current date and time</td></tr>
  </table>
</div>`;
    },

    list: () => {
        const subjects = Object.keys(pyqDatabase);
        let output = '<div class="command-output"><p><strong>Available Subjects:</strong></p>';
        subjects.forEach((subject, index) => {
            const count = pyqDatabase[subject].length;
            output += `<div class="subject-item">${index + 1}. ${subject.toUpperCase()} (${count} papers available)</div>`;
        });
        output += '</div>';
        return output;
    },

    show: (args) => {
        const subject = args[0] ? args[0].toLowerCase() : null;
        if (!subject) {
            return '<p class="error">Error: Please specify a subject. Usage: show &lt;subject&gt;</p>';
        }
        
        if (!pyqDatabase[subject]) {
            return `<p class="error">Error: Subject '${subject}' not found. Type 'list' to see available subjects.</p>`;
        }

        const papers = pyqDatabase[subject];
        let output = `<div class="command-output"><p><strong>PYQs for ${subject.toUpperCase()}:</strong></p>`;
        papers.forEach((paper, index) => {
            output += `<div class="pyq-item">${index + 1}. ${paper.year} - ${paper.semester} | Topic: ${paper.topic}</div>`;
        });
        output += '</div>';
        return output;
    },

    search: (args) => {
        const keyword = args[0] ? args[0].toLowerCase() : null;
        if (!keyword) {
            return '<p class="error">Error: Please specify a search keyword. Usage: search &lt;keyword&gt;</p>';
        }

        let results = [];
        Object.keys(pyqDatabase).forEach(subject => {
            pyqDatabase[subject].forEach(paper => {
                if (subject.includes(keyword) || paper.topic.toLowerCase().includes(keyword)) {
                    results.push({ subject, ...paper });
                }
            });
        });

        if (results.length === 0) {
            return `<p class="info">No results found for '${keyword}'</p>`;
        }

        let output = `<div class="command-output"><p><strong>Search results for '${keyword}':</strong></p>`;
        results.forEach((result, index) => {
            output += `<div class="pyq-item">${index + 1}. ${result.subject.toUpperCase()} - ${result.year} ${result.semester} | ${result.topic}</div>`;
        });
        output += '</div>';
        return output;
    },

    about: () => {
        return `
<div class="command-output">
  <p class="info">Terminal Archives - PYQs v1.0</p>
  <p>A complete, self-contained website for managing Previous Year Questions.</p>
  <p>Built with HTML, CSS, and JavaScript.</p>
  <p>Repository: github.com/anacondy/Terminal-Archives-PYQs-</p>
  <p>License: MIT</p>
</div>`;
    },

    clear: () => {
        terminalOutput.innerHTML = '';
        return null;
    },

    date: () => {
        const now = new Date();
        return `<p class="info">${now.toLocaleString()}</p>`;
    },

    ls: () => {
        return commands.list();
    },

    cat: (args) => {
        return commands.show(args);
    }
};

// Process command
function processCommand(input) {
    const parts = input.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === '') {
        return null;
    }

    if (commands[command]) {
        return commands[command](args);
    } else {
        return `<p class="error">Command not found: ${command}. Type 'help' for available commands.</p>`;
    }
}

// Add output to terminal
function addOutput(content) {
    if (content !== null) {
        const outputDiv = document.createElement('div');
        outputDiv.innerHTML = content;
        terminalOutput.appendChild(outputDiv);
    }
    scrollToBottom();
}

// Add command line to terminal
function addCommandLine(command) {
    const commandDiv = document.createElement('div');
    commandDiv.className = 'command-line';
    commandDiv.innerHTML = `<span class="prompt-text">guest@archives:~$</span> <span class="command-text">${command}</span>`;
    terminalOutput.appendChild(commandDiv);
    scrollToBottom();
}

// Scroll to bottom
function scrollToBottom() {
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Handle input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        
        if (input.trim() !== '') {
            commandHistory.push(input);
            historyIndex = commandHistory.length;
            
            addCommandLine(input);
            const output = processCommand(input);
            addOutput(output);
        }
        
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = terminalInput.value.toLowerCase();
        const availableCommands = Object.keys(commands);
        const matches = availableCommands.filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            addCommandLine(input);
            addOutput(`<p>${matches.join('  ')}</p>`);
        }
    }
});

// Keep focus on input
document.addEventListener('click', () => {
    terminalInput.focus();
});

// Initial focus
terminalInput.focus();
