// Global variables
let terminalLogs = [];
let hikariMonitorInterval = null;
let heartbeatInterval = null;

// System logs for footer typewriter
const systemLogs = [
    '[SYSTEM] nmap scan complete... vulnerability assessment active',
    '[SYSTEM] tcpdump capturing on eth0... packet analysis running', 
    '[SYSTEM] airodump-ng tracking BSSID... wireless audit in progress',
    '[SYSTEM] wireshark analyzing packets... deep inspection enabled',
    '[SYSTEM] maltego OSINT gathering... intelligence collection active',
    '[SYSTEM] spiderfoot reconnaissance active... target enumeration running',
    '[SYSTEM] kali linux terminal ready... penetration testing suite loaded',
    '[SYSTEM] sudo privileges validated... administrative access confirmed',
    '[SYSTEM] network topology mapped... infrastructure analysis complete',
    '[SYSTEM] firewall rules updated... security perimeter reinforced',
    '[SYSTEM] intrusion detection active... monitoring for anomalies',
    '[SYSTEM] vulnerability scanner running... security assessment in progress'
];

function startFooterTypewriter() {
    // Wait for DOM to be ready, then find the footer element
    setTimeout(() => {
        const footerElement = document.querySelector('.system-footer-scroller .footer-scroll');
        if (!footerElement) {
            console.log('Footer element not found');
            return;
        }
        
        let currentMessageIndex = 0;
        let isTyping = false;
        
        function typeMessage() {
            if (isTyping) return;
            
            const message = systemLogs[currentMessageIndex];
            let charIndex = 0;
            isTyping = true;
            
            footerElement.textContent = '';
            
            function typeChar() {
                if (charIndex < message.length) {
                    footerElement.textContent = message.substring(0, charIndex + 1) + '_';
                    charIndex++;
                    setTimeout(typeChar, 30);
                } else {
                    footerElement.textContent = message + '_';
                    setTimeout(() => {
                        footerElement.textContent = '';
                        currentMessageIndex = (currentMessageIndex + 1) % systemLogs.length;
                        isTyping = false;
                        setTimeout(typeMessage, 100);
                    }, 1500);
                }
            }
            
            typeChar();
        }
        
        typeMessage();
    }, 1000);
}

function sanitizeInput(input) {
    return input.replace(/[<>&"']/g, function(match) {
        const escapeMap = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;' };
        return escapeMap[match];
    });
}

function updateClock() {
    const now = new Date();
    const utc = now.toISOString().slice(0, 19).replace('T', ' ');
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `System Time (UTC): ${utc}`;
    }
}
setInterval(updateClock, 1000);

function toggleElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = element.style.display === 'block' ? 'none' : 'block';
    }
}

function initiateUplink(event, action) {
    event.preventDefault();
    const message = document.getElementById('uplink-message');
    if (message) {
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
            action();
        }, 1000);
    }
}

function initiateLinkedIn(event) {
    initiateUplink(event, () => {
        window.open('https://www.linkedin.com/in/jesel-kalogris-7617bb25a/', '_blank', 'noopener,noreferrer');
    });
}

function initiateEmail(event) {
    initiateUplink(event, () => {
        window.location.href = 'mailto:cyberdatacat@gmail.com';
    });
}

function addToTerminalLogs(command, response, type = 'system') {
    terminalLogs.push({ command: sanitizeInput(command), response: { text: sanitizeInput(response), type } });
    // Limit to 50 entries to prevent memory issues
    if (terminalLogs.length > 50) {
        terminalLogs = terminalLogs.slice(-50);
    }
    updateTerminalDisplay();
}

function updateTerminalDisplay() {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    
    output.innerHTML = '';
    terminalLogs.forEach(log => {
        const logDiv = document.createElement('div');
        
        const commandSpan = document.createElement('span');
        commandSpan.style.color = '#00ff41';
        commandSpan.textContent = `User@Hikari:~$ ${log.command}`;
        
        const responseDiv = document.createElement('div');
        responseDiv.className = `log-${log.response.type}`;
        responseDiv.textContent = log.response.text;
        
        logDiv.appendChild(commandSpan);
        logDiv.appendChild(responseDiv);
        output.appendChild(logDiv);
    });
}

function typewriterEffect(element, text, speed = 50) {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
    return timer;
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
    if (hikariMonitorInterval) clearInterval(hikariMonitorInterval);
    hikariMonitorInterval = setInterval(generateHikariLogs, 15000);
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
    if (heartbeatInterval) clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(generateHeartbeat, 30000);
}

// Command registry for consistent handling
const commandRegistry = {
    scan: () => 'Running integrity check on GitHub repositories...',
    status: () => 'AI Core: Offline (Handshake Error 503) | Logic Engine: Active',
    help: () => 'Available commands: status, whoami, clear, scan, help, self-destruct, override, resume, monitor, validate, signal',
    'self-destruct': (terminalOutput) => {
        const countdownDiv = document.createElement('div');
        countdownDiv.textContent = '[!] CRITICAL: INITIATING SELF-DESTRUCT SEQUENCE... 3... 2... 1...';
        countdownDiv.style.color = '#ff0000';
        terminalOutput.appendChild(countdownDiv);
        
        document.body.classList.add('screen-vibrate');
        
        setTimeout(() => {
            terminalLogs = [];
            document.body.classList.remove('screen-vibrate');
            terminalOutput.innerHTML = '';
            const wipeDiv = document.createElement('div');
            wipeDiv.textContent = '[SYSTEM_WIPE] ALL LOGS PURGED.';
            wipeDiv.style.color = '#ff0000';
            terminalOutput.appendChild(wipeDiv);
        }, 3000);
        return null;
    },
    override: () => {
        document.documentElement.style.setProperty('--primary-color', '#ff0000');
        return '[!] ALERT: SECURITY PROTOCOLS BYPASSED. EMERGENCY MODE ACTIVE.';
    },
    resume: () => '[ACCESSING_ARCHIVES] Resume link located: https://drive.google.com/file/d/your-cv-link-here',
    monitor: () => `LIVE NETWORK STATISTICS:
┌─────────────────────────────┐
│ Latency: 12ms               │
│ Packet Loss: 0%             │
│ Firewall: Active            │
│ Bandwidth: 1.2 Gbps         │
│ Connections: 47 Active      │
│ Threat Level: Minimal       │
└─────────────────────────────┘`,
    validate: (terminalOutput) => {
        const scanDiv = document.createElement('div');
        scanDiv.textContent = 'Scanning credentials';
        scanDiv.style.color = '#00d4ff';
        terminalOutput.appendChild(scanDiv);
        
        let dots = 0;
        const scanInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            scanDiv.textContent = 'Scanning credentials' + '.'.repeat(dots);
        }, 200);
        
        setTimeout(() => {
            clearInterval(scanInterval);
            scanDiv.textContent = '[OK] Credentials for Operator Jesel Kalogris fully validated.';
            scanDiv.style.color = '#00ff41';
        }, 2000);
        return null;
    },
    whoami: () => `HIKARI HEURISTIC ARCHITECTURE:
┌─────────────────────────────────────────┐
│ DESIGNATION: Adaptive Tactical Interface│
│ CORE_ENGINE: Neural Logic Processing    │
│ MEMORY_BANKS: 12+ Certification Modules │
│ SPECIALIZATION: NOC Operations & QA     │
│ THREAT_ANALYSIS: Real-time Monitoring   │
│ UPLINK_STATUS: Secure Channel Active    │
│ OPERATOR: Jesel Kalogris               │
└─────────────────────────────────────────┘`,
    signal: (terminalOutput) => {
        const linkDiv = document.createElement('div');
        linkDiv.innerHTML = 'Establishing secure uplink... <a href="https://www.linkedin.com/in/jesel-kalogris-7617bb25a/" target="_blank" rel="noopener noreferrer" style="color: #00ff41; text-decoration: underline;">[LINKEDIN_SIGNAL]</a>';
        linkDiv.style.color = '#00ff41';
        terminalOutput.appendChild(linkDiv);
        return null;
    }
};

function handleCommand(command) {
    const sanitizedCommand = sanitizeInput(command);
    const terminalOutput = document.querySelector('.terminal-output');
    
    if (command === 'clear') {
        terminalLogs = [];
        if (terminalOutput) terminalOutput.innerHTML = '';
        return;
    }
    
    if (!terminalOutput) return;
    
    const commandDiv = document.createElement('div');
    const commandSpan = document.createElement('span');
    commandSpan.style.color = '#00ff41';
    commandSpan.textContent = `User@Hikari:~$ ${sanitizedCommand}`;
    commandDiv.appendChild(commandSpan);
    terminalOutput.appendChild(commandDiv);
    
    const handler = commandRegistry[command];
    if (handler) {
        const result = handler(terminalOutput);
        if (result !== null && result !== undefined) {
            const responseDiv = document.createElement('div');
            responseDiv.style.color = '#00ff41';
            responseDiv.style.whiteSpace = 'pre-line';
            responseDiv.textContent = result;
            terminalOutput.appendChild(responseDiv);
        }
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.style.color = '#ff0000';
        errorDiv.textContent = `Command '${sanitizedCommand}' not recognized. Type 'help' for available commands.`;
        terminalOutput.appendChild(errorDiv);
    }
    
    // Limit DOM elements
    const children = terminalOutput.children;
    if (children.length > 100) {
        for (let i = 0; i < children.length - 100; i++) {
            terminalOutput.removeChild(children[i]);
        }
    }
}

function processCoreCommand(event) {
    if (event.key !== 'Enter') return;
    
    const input = event.target;
    const command = sanitizeInput(input.value.toLowerCase().trim());
    const output = document.getElementById('core-output');
    
    if (!output || !command) {
        input.value = '';
        return;
    }
    
    const coreCommands = {
        status: () => 'AI_HANDSHAKE: [REFACTORING] | LOGIC_CORE: [ACTIVE]',
        scan: () => {
            output.textContent = 'Analyzing system integrity...';
            setTimeout(() => {
                output.textContent = 'System Integrity: Optimal.';
            }, 2000);
            return null;
        },
        report: () => `ERROR REPORT #QA-2024-503\nISSUE: OpenAI 503 Handshake Error\nSEVERITY: High\nSTEPS TO REPRODUCE:\n1. Initialize OpenAI API connection\n2. Attempt authentication handshake\n3. Service returns HTTP 503 error\nEXPECTED: Successful API handshake\nACTUAL: Service unavailable error\nSTATUS: Investigating upstream service`,
        'self-destruct': () => {
            output.textContent = '[!] CRITICAL: INITIATING SELF-DESTRUCT SEQUENCE...';
            document.body.classList.add('system-glitch');
            setTimeout(() => {
                output.textContent = '';
                document.body.classList.remove('system-glitch');
                setTimeout(() => {
                    output.textContent = '[SYSTEM_FATAL] HIKARI CORE DELETED. REBOOT REQUIRED.';
                }, 100);
            }, 3000);
            return null;
        },
        override: () => {
            document.documentElement.style.setProperty('--primary-color', '#ff0000');
            return 'OVERRIDE ACTIVATED: Emergency Red mode engaged';
        },
        overide: () => {
            document.documentElement.style.setProperty('--primary-color', '#ff0000');
            return 'OVERRIDE ACTIVATED: Emergency Red mode engaged';
        },
        resume: () => '[ACCESSING_ARCHIVES] Resume link found: https://drive.google.com/file/d/your-cv-link-here',
        monitor: () => commandRegistry.monitor(),
        validate: () => commandRegistry.validate(),
        whoami: () => commandRegistry.whoami(),
        purge: () => '[!] SYSTEM PURGE COMPLETE. REBOOTING HIKARI...',
        signal: () => {
            output.textContent = 'Establishing secure uplink to Operator profile...';
            setTimeout(() => {
                window.open('https://www.linkedin.com/in/jesel-kalogris-7617bb25a/', '_blank', 'noopener,noreferrer');
            }, 1500);
            return null;
        },
        linkedin: () => {
            output.textContent = 'Establishing secure uplink to Operator profile...';
            setTimeout(() => {
                window.open('https://www.linkedin.com/in/jesel-kalogris-7617bb25a/', '_blank', 'noopener,noreferrer');
            }, 1500);
            return null;
        },
        help: () => `Available Commands:\nstatus - Check system status\nscan - Analyze system integrity\nreport - Generate OpenAI error report\nhelp - Show this help menu\nclear - Clear terminal output\nself-destruct - Initiate system purge\noverride - Emergency mode activation\nresume - Access CV archives\nmonitor - System status report\nvalidate - Credential validation\nwhoami - System identity\npurge - System reboot\nsignal - LinkedIn uplink`,
        clear: () => {
            output.textContent = '';
            return null;
        }
    };
    
    const handler = coreCommands[command];
    if (handler) {
        const result = handler();
        if (result !== null) {
            output.textContent = result;
        }
    } else {
        output.textContent = `Command '${command}' not recognized. Type 'help' for available commands.`;
    }
    
    input.value = '';
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

function processCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const command = sanitizeInput(input.value.toLowerCase().trim());
        
        if (command !== '') {
            handleCommand(command);
        }
        
        input.value = '';
    }
}

// Initialize application when page loads
window.onload = function() {
    updateClock();
    startHeartbeatMonitoring();
    startHikariLiveMonitoring();
    startBootLineSequence();
    startFooterTypewriter();
};