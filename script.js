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

let terminalLogs = [];

function addToTerminalLogs(command, response) {
    terminalLogs.push({ command, response });
    updateTerminalDisplay();
}

function updateTerminalDisplay() {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    
    output.innerHTML = terminalLogs.map(log => 
        `<div>User@Hikari:~$ ${sanitizeInput(log.command)}</div><div>${log.response}</div>`
    ).join('');
}

function typewriterEffect(text, elementId, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function handleHikariCommand(input) {
    switch(input) {
        case 'scan':
            return 'Running integrity check on GitHub repositories...';
        case 'monitor':
            return 'NOC Heartbeat: All systems nominal. Latency: 14ms.';
        case 'validate':
            return 'Auditing credentials... [Splunk: Validated] [Cisco: Validated].';
        default:
            return 'Unknown command. Type help for system protocols.';
    }
}

function generateNOCLog() {
    const nocLogs = [
        'Packet analysis buffer at 12%',
        'Firewall rules validated',
        'Network latency: 8ms optimal',
        'SSL certificates renewed',
        'Intrusion detection: No threats',
        'Port scan completed: 65535 ports',
        'DNS resolution time: 2ms',
        'VPN tunnel established',
        'Log rotation completed',
        'Backup verification: Success'
    ];
    
    const randomLog = nocLogs[Math.floor(Math.random() * nocLogs.length)];
    addToTerminalLogs('NOC_MONITOR', `[${new Date().toLocaleTimeString()}] ${randomLog}`);
}

function startNOCMonitoring() {
    setInterval(generateNOCLog, 20000);
}

function hikariProcess(input) {
    const hikariResponse = handleHikariCommand(input);
    if (hikariResponse !== 'Unknown command. Type help for system protocols.') {
        return hikariResponse;
    }
    
    switch(input) {
        case 'monitor':
            return `SYSTEM STATUS REPORT:
[✓] Connectivity Layer: ACTIVE
[✓] Security Layer: ACTIVE  
[✓] Portfolio Interface: OPERATIONAL
[✓] Terminal Systems: ONLINE
[!] Background Monitoring: ENABLED`;
        case 'validate':
            return `CREDENTIAL VALIDATION SUITE:
[TESTING] Azure Certifications... PASS
[TESTING] Google Cybersecurity... PASS
[TESTING] Cisco Networking... PASS
[TESTING] QA Validation Skills... PASS
[RESULT] All 12+ certifications verified and active`;
        default:
            return `HIKARI: Unknown process '${input}'. Available: monitor, validate`;
    }
}

function generateHeartbeat() {
    const heartbeats = [
        '[HEARTBEAT] System integrity check: All layers operational',
        '[HEARTBEAT] Security monitoring: No threats detected',
        '[HEARTBEAT] Portfolio connectivity: Stable connection maintained',
        '[HEARTBEAT] Background processes: All systems nominal',
        '[HEARTBEAT] Terminal interface: Responsive and secure'
    ];
    
    const randomHeartbeat = heartbeats[Math.floor(Math.random() * heartbeats.length)];
    addToTerminalLogs('SYSTEM', randomHeartbeat);
}

function startHeartbeatMonitoring() {
    setInterval(generateHeartbeat, 30000);
}

function handleCommand(command) {
    let response;
    
    switch(command) {
        case 'scan':
            response = handleHikariCommand(command);
            break;
        case 'help':
            response = 'Available commands: status, whoami, clear, scan, help, monitor, validate, signal, linkedin';
            break;
        case 'status':
            response = 'AI Core: Offline (Handshake Error 503) | Logic Engine: Active';
            break;
        case 'signal':
        case 'linkedin':
            addToTerminalLogs(command, 'Establishing secure uplink to Operator profile...');
            setTimeout(() => {
                window.open('https://www.linkedin.com/in/jesel-kalogris-7617bb25a/', '_blank');
            }, 1500);
            return;
        case 'monitor':
        case 'validate':
            response = hikariProcess(command);
            break;
        case 'whoami':
            addToTerminalLogs(command, '');
            const responseText = 'I am HIKARI, your Adaptive Tactical Interface. Current Mission: Portfolio Security and QA Validation.';
            const lastLogIndex = terminalLogs.length - 1;
            const responseElement = document.createElement('div');
            responseElement.id = 'typewriter-response';
            
            updateTerminalDisplay();
            const output = document.getElementById('terminal-output');
            if (output) {
                output.appendChild(responseElement);
                typewriterEffect(responseText, 'typewriter-response', () => {
                    terminalLogs[lastLogIndex].response = responseText;
                    updateTerminalDisplay();
                });
            }
            return;
        case 'clear':
            terminalLogs = [];
            updateTerminalDisplay();
            return;
        default:
            response = `Command '${sanitizeInput(command)}' not recognized. Type 'help' for available commands.`;
    }
    
    addToTerminalLogs(command, response);
}

function processCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const command = input.value.toLowerCase().trim();
        
        if (command !== '') {
            handleCommand(command);
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
    startHeartbeatMonitoring();
    startNOCMonitoring();
};