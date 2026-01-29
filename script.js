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

function addToTerminalLogs(command, response, type = 'system') {
    terminalLogs.push({ command, response: { text: response, type } });
    updateTerminalDisplay();
}

function updateTerminalDisplay() {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    
    output.innerHTML = terminalLogs.map(log => {
        const typeClass = log.response.type || 'system';
        return `<div>User@Hikari:~$ ${sanitizeInput(log.command)}</div><div class="log-${typeClass}">${log.response.text}</div>`;
    }).join('');
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

function generateHikariLogs() {
    const hikariLogs = [
        { text: '[OK] Integrity check: [TECHNICAL_ARSENAL] secured.', type: 'success' },
        { text: '[INFO] Monitoring packet flow... No anomalies detected.', type: 'intel' },
        { text: '[OK] Credential validation: Splunk Core User status confirmed.', type: 'success' },
        { text: '[WARN] Latency spike detected in external uplink... Stabilized.', type: 'error' },
        { text: '[INFO] HIKARI logic gates operating at 98.4% efficiency.', type: 'intel' },
        { text: '[OK] GitHub repository sync complete. All source code validated.', type: 'success' },
        { text: '[INFO] Environment check: Kali Linux sub-systems active.', type: 'intel' },
        { text: '[OK] Azure Cloud nodes responding. Connectivity nominal.', type: 'success' },
        { text: '[INFO] Running heuristic analysis on latest project logs...', type: 'intel' },
        { text: '[SYSTEM] Heartbeat pulse sent. Operator Jesel Kalogris online.', type: 'system' }
    ];
    
    const randomLog = hikariLogs[Math.floor(Math.random() * hikariLogs.length)];
    addToTerminalLogs('HIKARI_SYSTEM', randomLog.text, randomLog.type);
}

function startHikariLiveMonitoring() {
    setInterval(generateHikariLogs, 15000);
}

let isBooting = true;
let bootLines = [];

function triggerSelfDestruct() {
    // Display critical message
    addToTerminalLogs('self-destruct', '[!] CRITICAL: INITIATING SYSTEM PURGE...', 'error');
    
    // Switch to emergency red theme
    document.body.classList.add('emergency-mode');
    
    // Wait 2 seconds then clear logs and revert
    setTimeout(() => {
        terminalLogs = [];
        updateTerminalDisplay();
        document.body.classList.remove('emergency-mode');
    }, 2000);
}

function triggerOverrideSequence() {
    // Add override message with error type
    addToTerminalLogs('override', 'PROTOCOL BREAK: Manual Override Accepted. Accessing Restricted QA Logs...', 'error');
    
    // Add glitch animation to terminal container
    const terminalContainer = document.querySelector('.hikari-terminal');
    if (terminalContainer) {
        terminalContainer.classList.add('glitch-effect');
    }
    
    // Trigger screen shake
    document.body.classList.add('screen-shake');
    
    // Switch to emergency red theme
    document.body.classList.add('emergency-mode');
    
    // Revert after 3 seconds
    setTimeout(() => {
        document.body.classList.remove('screen-shake');
        document.body.classList.remove('emergency-mode');
        if (terminalContainer) {
            terminalContainer.classList.remove('glitch-effect');
        }
        terminalLogs = [];
        updateTerminalDisplay();
    }, 3000);
}

function startBootLineSequence() {
    const lines = [
        '[ IDENTITY_ANALYSIS ]',
        'NAME: HIKARI',
        'DESIGNATION: Heuristic Interactive Knowledge Interface',
        'MISSION: QA Validation & NOC Monitoring'
    ];
    
    let index = 0;
    
    function addNextLine() {
        if (index < lines.length) {
            bootLines.push(lines[index]);
            const lineElement = document.getElementById(`identity-line-${index + 1}`);
            if (lineElement) {
                lineElement.textContent = lines[index];
                lineElement.style.opacity = '0.6';
            }
            index++;
            if (index < lines.length) {
                setTimeout(addNextLine, 600);
            } else {
                setTimeout(() => {
                    isBooting = false;
                    const coreInput = document.querySelector('.core-input');
                    if (coreInput) {
                        coreInput.style.display = 'flex';
                        coreInput.style.opacity = '1';
                    }
                }, 600);
            }
        }
    }
    
    const coreInput = document.querySelector('.core-input');
    if (coreInput) {
        coreInput.style.display = 'none';
    }
    
    setTimeout(addNextLine, 1000);
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
        case 'commands':
            response = 'Available commands: status, whoami, clear, scan, help, monitor, validate, signal, linkedin, purge, self-destruct, override, resume';
            break;
        case 'status':
            response = 'AI Core: Offline (Handshake Error 503) | Logic Engine: Active';
            break;
        case 'self-destruct':
            addToTerminalLogs(command, '[!] CRITICAL: INITIATING SELF-DESTRUCT SEQUENCE...', 'error');
            addToTerminalLogs(command, '[!] WARNING: 3... 2... 1...', 'error');
            document.body.classList.add('system-glitch');
            document.body.classList.add('screen-shake');
            setTimeout(() => {
                terminalLogs = [];
                updateTerminalDisplay();
                document.body.classList.remove('system-glitch');
                document.body.classList.remove('screen-shake');
                addToTerminalLogs('SYSTEM', '[SYSTEM_FATAL] HIKARI CORE DELETED. REBOOT REQUIRED.', 'error');
            }, 3000);
            return;
        case 'override':
            document.documentElement.style.setProperty('--primary-color', '#ff0000');
            addToTerminalLogs(command, 'OVERRIDE ACTIVATED: Emergency Red mode engaged', 'error');
            return;
        case 'resume':
            response = '[ACCESSING_ARCHIVES] Resume link found: https://drive.google.com/file/d/your-cv-link-here';
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
            response = 'I am HIKARI, your Adaptive Tactical Interface. Current Mission: Portfolio Security and QA Validation.';
            break;
        case 'purge':
            terminalLogs = [];
            addToTerminalLogs(command, '[!] SYSTEM PURGE COMPLETE. REBOOTING HIKARI...', 'error');
            break;
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
        } else if (command === 'self-destruct') {
            output.textContent = '[!] CRITICAL: INITIATING SELF-DESTRUCT SEQUENCE...';
            document.body.classList.add('system-glitch');
            setTimeout(() => {
                output.textContent = '[SYSTEM_FATAL] HIKARI CORE DELETED. REBOOT REQUIRED.';
                document.body.classList.remove('system-glitch');
            }, 3000);
        } else if (command === 'override') {
            document.documentElement.style.setProperty('--primary-color', '#ff0000');
            output.textContent = 'OVERRIDE ACTIVATED: Emergency Red mode engaged';
        } else if (command === 'resume') {
            output.textContent = '[ACCESSING_ARCHIVES] Resume link found: https://drive.google.com/file/d/your-cv-link-here';
        } else if (command === 'monitor') {
            output.textContent = `SYSTEM STATUS REPORT:
[✓] Connectivity Layer: ACTIVE
[✓] Security Layer: ACTIVE
[✓] Portfolio Interface: OPERATIONAL
[✓] Terminal Systems: ONLINE
[!] Background Monitoring: ENABLED`;
        } else if (command === 'validate') {
            output.textContent = `CREDENTIAL VALIDATION SUITE:
[TESTING] Azure Certifications... PASS
[TESTING] Google Cybersecurity... PASS
[TESTING] Cisco Networking... PASS
[TESTING] QA Validation Skills... PASS
[RESULT] All 12+ certifications verified and active`;
        } else if (command === 'whoami') {
            output.textContent = 'I am HIKARI, your Adaptive Tactical Interface. Current Mission: Portfolio Security and QA Validation.';
        } else if (command === 'purge') {
            output.textContent = '[!] SYSTEM PURGE COMPLETE. REBOOTING HIKARI...';
        } else if (command === 'signal' || command === 'linkedin') {
            output.textContent = 'Establishing secure uplink to Operator profile...';
            setTimeout(() => {
                window.open('https://www.linkedin.com/in/jesel-kalogris-7617bb25a/', '_blank');
            }, 1500);
        } else if (command === 'help') {
            output.textContent = `Available Commands:
status - Check system status
scan - Analyze system integrity
report - Generate OpenAI error report
help - Show this help menu
clear - Clear terminal output
self-destruct - Initiate system purge
override - Emergency mode activation
resume - Access CV archives
monitor - System status report
validate - Credential validation
whoami - System identity
purge - System reboot
signal - LinkedIn uplink`;
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
    startHikariLiveMonitoring();
    startBootLineSequence();
};