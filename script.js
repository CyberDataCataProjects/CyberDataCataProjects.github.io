function updateClock() {
    const now = new Date();
    const utc = now.toISOString().slice(0, 19).replace('T', ' ');
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.innerHTML = 'System Time (UTC)<br>' + utc;
    }
}
setInterval(updateClock, 1000);

function toggleElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = element.style.display === 'block' ? 'none' : 'block';
    }
}

function toggleFolder(id) { toggleElement(id); }
function showTerminal(id) { toggleElement(id); }
function showLog(id) { toggleElement(id); }

function initiateLinkedIn(event) {
    event.preventDefault();
    const message = document.getElementById('uplink-message');
    if (message) {
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
            window.open('https://www.linkedin.com/in/jesel-kalogris-7617bb25a/', '_blank');
        }, 1000);
    }
}

function initiateEmail(event) {
    event.preventDefault();
    const message = document.getElementById('uplink-message');
    if (message) {
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
            window.location.href = 'mailto:cyberdatacat@gmail.com';
        }, 1000);
    }
}

function sanitizeInput(input) {
    return input.replace(/[<>&"']/g, function(match) {
        const escapeMap = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;' };
        return escapeMap[match];
    });
}

function processCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const command = input.value.toLowerCase().trim();
        const output = document.getElementById('terminal-output');
        
        if (!output) return;
        
        if (command === 'status') {
            output.textContent = 'AI Core: Offline (Handshake Error 503) | Logic Engine: Active';
        } else if (command === 'scan') {
            output.textContent = 'Searching for vulnerabilities...';
            setTimeout(() => {
                if (output) output.textContent = 'Searching for vulnerabilities... Found 0 in local environment.';
            }, 1500);
        } else if (command === 'clear') {
            output.textContent = '';
        } else if (command !== '') {
            output.textContent = `Command '${sanitizeInput(command)}' not recognized. Try 'status' or 'scan'.`;
        }
        
        input.value = '';
    }
}

function processCoreCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const command = input.value.toLowerCase().trim();
        const output = document.getElementById('core-output');
        
        if (!output) return;
        
        if (command === 'status') {
            output.textContent = 'AI_HANDSHAKE: [REFACTORING] | LOGIC_CORE: [ACTIVE]';
        } else if (command === 'scan') {
            output.textContent = 'Analyzing system integrity...';
            setTimeout(() => {
                if (output) output.textContent = 'System Integrity: Optimal.';
            }, 2000);
        } else if (command === 'report') {
            output.textContent = `ERROR REPORT #QA-2024-503
ISSUE: OpenAI 503 Handshake Error
SEVERITY: High
STEPS TO REPRODUCE:
1. Initialize OpenAI API connection
2. Attempt authentication handshake
3. Service returns HTTP 503 error
EXPECTED: Successful API handshake
ACTUAL: Service unavailable error
STATUS: Investigating upstream service`;
        } else if (command === 'help') {
            output.textContent = `Available Commands:
status - Check system status
scan - Analyze system integrity
report - Generate OpenAI error report
help - Show this help menu
clear - Clear terminal output`;
        } else if (command === 'clear') {
            output.textContent = '';
        } else if (command !== '') {
            output.textContent = `Command '${sanitizeInput(command)}' not recognized. Type 'help' for available commands.`;
        }
        
        input.value = '';
    }
}

// Initialize clock when page loads
window.onload = function() {
    updateClock();
};