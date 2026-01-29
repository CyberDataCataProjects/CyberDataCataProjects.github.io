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

// NOC Status HUD System
function startNOCStatusHUD() {
    const statusText = document.getElementById('noc-status-text');
    if (!statusText) return;
    
    let currentMessageIndex = 0;
    
    function typeMessage() {
        const message = systemLogs[currentMessageIndex];
        let charIndex = 0;
        
        statusText.textContent = '';
        
        function typeChar() {
            if (charIndex < message.length) {
                statusText.textContent = message.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeChar, 30);
            } else {
                setTimeout(() => {
                    statusText.textContent = '';
                    currentMessageIndex = (currentMessageIndex + 1) % systemLogs.length;
                    setTimeout(typeMessage, 100);
                }, 2000);
            }
        }
        
        typeChar();
    }
    
    typeMessage();
}

function startFooterTypewriter() {
    // Legacy function - now handled by NOC Status HUD
    startNOCStatusHUD();
}

function sanitizeInput(input) {
    return input.replace(/[<>&"']/g, function(match) {
        const escapeMap = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;' };
        return escapeMap[match];
    });
}

function sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
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

generateHikariLogs.lastIndex = -1;
function generateHikariLogs() {
    const hikariLogs = [
        { text: '[INFO] Monitoring packet flow... No anomalies detected.', type: 'intel' },
        { text: '[OK] Azure Cloud nodes responding. Connectivity nominal.', type: 'success' },
        { text: '[WARN] Latency spike detected in external uplink... Stabilized.', type: 'error' },
        { text: '[INFO] Running heuristic analysis on latest project logs...', type: 'intel' },
        { text: '[OK] Integrity check: [TECHNICAL_ARSENAL] secured.', type: 'success' },
        { text: '[INFO] Wireshark deep packet inspection active... Analyzing traffic patterns.', type: 'intel' },
        { text: '[OK] Credential validation: Splunk Core User status confirmed.', type: 'success' },
        { text: '[INFO] HIKARI logic gates operating at 98.4% efficiency.', type: 'intel' },
        { text: '[OK] GitHub repository sync complete. All source code validated.', type: 'success' },
        { text: '[INFO] Environment check: Kali Linux sub-systems active.', type: 'intel' },
        { text: '[WARN] Firewall rule update required... Applying security patches.', type: 'error' },
        { text: '[OK] Nmap network scan complete... 47 hosts discovered and catalogued.', type: 'success' },
        { text: '[INFO] Airodump-ng wireless audit running... BSSID enumeration in progress.', type: 'intel' },
        { text: '[OK] Maltego OSINT collection successful... Intelligence gathered.', type: 'success' },
        { text: '[INFO] SpiderFoot reconnaissance active... Target enumeration running.', type: 'intel' },
        { text: '[WARN] Suspicious DNS queries detected... Investigating potential threats.', type: 'error' },
        { text: '[OK] Penetration testing suite loaded... All tools operational.', type: 'success' },
        { text: '[INFO] Network topology mapping complete... Infrastructure documented.', type: 'intel' },
        { text: '[OK] Intrusion detection system active... Monitoring for anomalies.', type: 'success' },
        { text: '[SYSTEM] Heartbeat pulse sent. Operator Jesel Kalogris online.', type: 'system' }
    ];
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * hikariLogs.length);
    } while (randomIndex === generateHikariLogs.lastIndex && hikariLogs.length > 1);
    
    generateHikariLogs.lastIndex = randomIndex;
    const selectedLog = hikariLogs[randomIndex];
    addToTerminalLogs('HIKARI_SYSTEM', selectedLog.text, selectedLog.type);
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

// Latency graph animation
function animateLatencyGraph() {
    const graph = document.querySelector('.latency-graph');
    if (!graph) return;
    
    const line = document.createElement('div');
    line.style.cssText = `
        position: absolute;
        top: 50%;
        left: 0;
        width: 2px;
        height: 60%;
        background: #00ff41;
        box-shadow: 0 0 10px #00ff41;
        animation: latencyPulse 2s ease-in-out infinite;
    `;
    
    graph.style.position = 'relative';
    graph.appendChild(line);
    
    // Animate the line across the graph
    let position = 0;
    const moveInterval = setInterval(() => {
        position += 2;
        line.style.left = position + 'px';
        if (position >= graph.offsetWidth) {
            position = -2;
        }
    }, 100);
}

// Mobile detection and layout fixes
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Force animations and NOC status on mobile
function initializeMobileFeatures() {
    if (isMobileDevice()) {
        // Force enable all animations
        document.body.style.setProperty('--mobile-animations', 'enabled');
        
        // Ensure proper scrolling
        document.body.style.overflowY = 'auto';
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Force NOC status HUD visibility
        const nocHud = document.getElementById('noc-status-hud');
        if (nocHud) {
            nocHud.style.display = 'flex';
            nocHud.style.visibility = 'visible';
            nocHud.style.opacity = '1';
        }
        
        // Force start NOC status with delay
        setTimeout(() => {
            startNOCStatusHUD();
        }, 500);
        
        // Add mobile class for CSS targeting
        document.body.classList.add('mobile-device');
        
        // Force animations by adding CSS
        const style = document.createElement('style');
        style.textContent = `
            .mobile-device body::before,
            .mobile-device body::after,
            .mobile-device .system-header::after,
            .mobile-device .content::before {
                animation-play-state: running !important;
                display: block !important;
            }
        `;
        document.head.appendChild(style);
    }
}

function applyMobileFixes() {
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
        
        // Force mobile viewport
        let viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
        }
        
        // Disable problematic animations on mobile
        const style = document.createElement('style');
        style.textContent = `
            .mobile-device .system-glitch,
            .mobile-device .critical-meltdown,
            .mobile-device .scanline,
            .mobile-device body::before,
            .mobile-device body::after {
                display: none !important;
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Command registry for consistent handling
const commandRegistry = {
    scan: () => 'Running integrity check on GitHub repositories...',
    status: () => `AMD RYZEN 9 NODE HEALTH:
┌─────────────────────────────────────────┐
│ CPU: AMD Ryzen 9 7900X (12-Core)       │
│ Cores: 12/12 Active | Threads: 24/24   │
│ Clock: 4.7GHz Boost | Temp: 42°C       │
│ Memory: 32GB DDR5-5600 | Usage: 68%    │
│ GPU: NVIDIA RTX Architecture Active     │
│ Storage: NVMe SSD | Health: Optimal    │
│ Network: Gigabit Ethernet | Latency: 12ms│
│ Uptime: 72h 14m | Load Avg: 1.2        │
│ Status: All systems operational         │
└─────────────────────────────────────────┘`,
    help: () => 'Available commands: status, whoami, clear, scan, help, self-destruct, override, resume, monitor, validate, signal, audit, osi-check, osi-diag, osi-scan, map, ping [target]',
    'self-destruct': (terminalOutput) => {
        const warningDiv = document.createElement('div');
        warningDiv.textContent = '[!] CRITICAL: INITIATING SELF-DESTRUCT SEQUENCE...';
        warningDiv.style.color = '#ff0000';
        warningDiv.style.fontSize = '1.2em';
        warningDiv.style.fontWeight = 'bold';
        terminalOutput.appendChild(warningDiv);
        
        document.body.classList.add('screen-vibrate');
        document.documentElement.style.setProperty('--primary-color', '#ff0000');
        
        setTimeout(() => {
            const countdownDiv = document.createElement('div');
            countdownDiv.textContent = '[WARNING] 5... 4... 3... 2... 1...';
            countdownDiv.style.color = '#ff0000';
            countdownDiv.style.fontSize = '1.5em';
            countdownDiv.style.textShadow = '0 0 20px #ff0000';
            terminalOutput.appendChild(countdownDiv);
            
            document.body.classList.add('critical-meltdown');
        }, 1000);
        
        setTimeout(() => {
            const explosionDiv = document.createElement('div');
            explosionDiv.textContent = '[CRITICAL] SYSTEM MELTDOWN IMMINENT!!!';
            explosionDiv.style.color = '#ffffff';
            explosionDiv.style.fontSize = '2em';
            explosionDiv.style.textShadow = '0 0 30px #ff0000';
            explosionDiv.style.animation = 'blink 0.1s infinite';
            terminalOutput.appendChild(explosionDiv);
            
            document.body.classList.remove('screen-vibrate');
            document.body.classList.add('system-explosion');
        }, 3000);
        
        setTimeout(() => {
            terminalLogs = [];
            terminalOutput.innerHTML = '';
            document.body.classList.remove('critical-meltdown', 'system-explosion');
            document.documentElement.style.setProperty('--primary-color', '#00ff41');
            
            const fatalDiv = document.createElement('div');
            fatalDiv.textContent = '[SYSTEM_FATAL] HIKARI CORE DELETED. REBOOT REQUIRED.';
            fatalDiv.style.color = '#ff0000';
            fatalDiv.style.fontSize = '1.1em';
            fatalDiv.style.textShadow = '0 0 15px #ff0000';
            terminalOutput.appendChild(fatalDiv);
        }, 4000);
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
│ MEMORY_BANKS: 16+ Certification Modules │
│ SPECIALIZATION: NOC Operations & QA     │
│ AI_INTEGRATION: Amazon Q & GitHub Copilot│
│ THREAT_ANALYSIS: Real-time Monitoring   │
│ UPLINK_STATUS: Secure Channel Active    │
│ OPERATOR: Jesel Kalogris               │
└─────────────────────────────────────────┘`,
    signal: (terminalOutput) => {
        const linkDiv = document.createElement('div');
        linkDiv.textContent = 'Establishing secure uplink... ';
        const link = document.createElement('a');
        link.href = 'https://www.linkedin.com/in/jesel-kalogris-7617bb25a/';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.color = '#00ff41';
        link.style.textDecoration = 'underline';
        link.textContent = '[LINKEDIN_SIGNAL]';
        linkDiv.appendChild(link);
        linkDiv.style.color = '#00ff41';
        terminalOutput.appendChild(linkDiv);
        return null;
    },
    audit: (terminalOutput) => {
        const auditDiv = document.createElement('div');
        auditDiv.textContent = 'INITIATING CERTIFICATION AUDIT...';
        auditDiv.style.color = '#00d4ff';
        terminalOutput.appendChild(auditDiv);
        
        const certs = [
            'Amazon Q Developer: Advanced AI Coding',
            'GitHub Copilot: AI-Powered Development', 
            'Azure: Cost Management & Cloud Services',
            'Azure: Management & Deployment Tools',
            'Azure Fundamentals (AZ-900)',
            'Microsoft Security, Compliance & Identity',
            'Google Cybersecurity Professional V2',
            'Splunk: Core Certified User (Intro)',
            'Cisco: Introduction to Cybersecurity',
            'Network Security: Connect & Protect',
            'U. Leeds: Software Testing & Validation',
            'Cisco: Networking Basics',
            'Jira Management (Coursera)',
            'Cisco: IT Customer Support',
            'Introduction to Git & GitHub',
            'Introduction to DevOps (Microsoft)'
        ];
        
        let index = 0;
        const auditInterval = setInterval(() => {
            if (index < certs.length) {
                const certDiv = document.createElement('div');
                certDiv.textContent = `[OK] ${certs[index]}`;
                certDiv.style.color = '#00ff41';
                certDiv.style.marginLeft = '20px';
                terminalOutput.appendChild(certDiv);
                index++;
            } else {
                clearInterval(auditInterval);
                const summaryDiv = document.createElement('div');
                summaryDiv.textContent = `\nAUDIT COMPLETE: ${certs.length} certifications validated. All credentials verified.`;
                summaryDiv.style.color = '#00d4ff';
                summaryDiv.style.fontWeight = 'bold';
                terminalOutput.appendChild(summaryDiv);
            }
        }, 150);
        return null;
    },
    'osi-check': (terminalOutput) => {
        const initDiv = document.createElement('div');
        initDiv.textContent = 'INITIATING OSI MODEL DIAGNOSTIC...';
        initDiv.style.color = '#00d4ff';
        terminalOutput.appendChild(initDiv);
        
        const osiLayers = [
            '[L1] PHYSICAL: Fiber/Copper Link... OK',
            '[L2] DATA LINK: MAC Filtering... ACTIVE', 
            '[L3] NETWORK: IPv6 Routing Table... VALIDATED',
            '[L4] TRANSPORT: TCP/UDP Sessions... ESTABLISHED',
            '[L5] SESSION: SSL/TLS Handshakes... SECURED',
            '[L6] PRESENTATION: Data Encryption... ENABLED',
            '[L7] APPLICATION: DNS Services... OPERATIONAL'
        ];
        
        let layerIndex = 0;
        const osiInterval = setInterval(() => {
            if (layerIndex < osiLayers.length) {
                const layerDiv = document.createElement('div');
                layerDiv.textContent = osiLayers[layerIndex];
                layerDiv.style.color = '#00ff41';
                layerDiv.style.marginLeft = '10px';
                terminalOutput.appendChild(layerDiv);
                layerIndex++;
            } else {
                clearInterval(osiInterval);
                const completeDiv = document.createElement('div');
                completeDiv.textContent = '\nOSI DIAGNOSTIC COMPLETE: All 7 layers operational.';
                completeDiv.style.color = '#00d4ff';
                completeDiv.style.fontWeight = 'bold';
                terminalOutput.appendChild(completeDiv);
            }
        }, 500);
        return null;
    },
    'osi-diag': (terminalOutput) => {
        const initDiv = document.createElement('div');
        initDiv.textContent = 'INITIATING OSI LAYER DIAGNOSTICS...';
        initDiv.style.color = '#00d4ff';
        terminalOutput.appendChild(initDiv);
        
        const diagLayers = [
            '[L1] PHYSICAL: Fiber/Twisted-Pair Link... [CONNECTED]',
            '[L3] NETWORK: IPv4/IPv6 Routing Table... [VALIDATED]',
            '[L7] APPLICATION: DNS Services & VPN Tunnel... [OPERATIONAL]'
        ];
        
        let diagIndex = 0;
        const diagInterval = setInterval(() => {
            if (diagIndex < diagLayers.length) {
                const layerDiv = document.createElement('div');
                layerDiv.textContent = diagLayers[diagIndex];
                layerDiv.style.color = '#00ff41';
                layerDiv.style.marginLeft = '10px';
                terminalOutput.appendChild(layerDiv);
                diagIndex++;
            } else {
                clearInterval(diagInterval);
                const completeDiv = document.createElement('div');
                completeDiv.textContent = '\nDIAGNOSTIC COMPLETE: Critical OSI layers operational.';
                completeDiv.style.color = '#00d4ff';
                completeDiv.style.fontWeight = 'bold';
                terminalOutput.appendChild(completeDiv);
            }
        }, 400);
        return null;
    },
    ping: (terminalOutput) => {
        const args = handleCommand.lastCommand ? handleCommand.lastCommand.split(' ') : [];
        const target = args[1] || '8.8.8.8';
        
        const pingDiv = document.createElement('div');
        pingDiv.textContent = `PING ${target} (${target}): 56 data bytes`;
        pingDiv.style.color = '#00d4ff';
        terminalOutput.appendChild(pingDiv);
        
        const latencies = [12.4, 11.8, 13.2, 12.1];
        const replies = latencies.map((latency, i) => 
            `64 bytes from ${target}: icmp_seq=${i+1} ttl=64 time=${latency} ms`
        );
        
        let replyIndex = 0;
        const pingInterval = setInterval(() => {
            if (replyIndex < replies.length) {
                const replyDiv = document.createElement('div');
                replyDiv.textContent = replies[replyIndex];
                replyDiv.style.color = '#00ff41';
                replyDiv.style.marginLeft = '10px';
                terminalOutput.appendChild(replyDiv);
                replyIndex++;
            } else {
                clearInterval(pingInterval);
                const avgLatency = (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(1);
                const minLatency = Math.min(...latencies).toFixed(1);
                const maxLatency = Math.max(...latencies).toFixed(1);
                const statsDiv = document.createElement('div');
                statsDiv.textContent = `\n--- ${target} ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss\nround-trip min/avg/max = ${minLatency}/${avgLatency}/${maxLatency} ms`;
                statsDiv.style.color = '#00d4ff';
                terminalOutput.appendChild(statsDiv);
            }
        }, 800);
        return null;
    },
    'osi-scan': (terminalOutput) => {
        const initDiv = document.createElement('div');
        initDiv.textContent = 'INITIATING OSI MODEL DIAGNOSTIC SCAN...';
        initDiv.style.color = '#00d4ff';
        terminalOutput.appendChild(initDiv);
        
        const osiLayers = [
            '[L1] PHYSICAL: CAT6 Connected',
            '[L2] DATA LINK: Ethernet Frame Processing OK', 
            '[L3] NETWORK: IPv4/IPv6 Routing Operational',
            '[L4] TRANSPORT: TCP/UDP Sessions Active',
            '[L5] SESSION: SSL/TLS Handshakes Secured',
            '[L6] PRESENTATION: Data Encryption Enabled',
            '[L7] APPLICATION: DNS/HTTP Services Online'
        ];
        
        let layerIndex = 0;
        const osiInterval = setInterval(() => {
            if (layerIndex < osiLayers.length) {
                const layerDiv = document.createElement('div');
                layerDiv.textContent = osiLayers[layerIndex];
                layerDiv.style.color = '#00ff41';
                layerDiv.style.marginLeft = '15px';
                terminalOutput.appendChild(layerDiv);
                layerIndex++;
            } else {
                clearInterval(osiInterval);
                const completeDiv = document.createElement('div');
                completeDiv.textContent = '\nOSI SCAN COMPLETE: All 7 layers operational.';
                completeDiv.style.color = '#00d4ff';
                completeDiv.style.fontWeight = 'bold';
                terminalOutput.appendChild(completeDiv);
            }
        }, 400);
        return null;
    },
    map: () => `ENTERPRISE NETWORK TOPOLOGY MAP:

    [INTERNET]
         |
    [FIREWALL]
         |
   [CORE_SWITCH]
    /    |    \
[SW1]  [SW2]  [SW3]
  |      |      |
[PC1]  [SRV]  [PC2]

LEGEND:
┌─────────────────────────┐
│ FIREWALL: ASA 5506-X    │
│ CORE: Catalyst 9300     │
│ ACCESS: 2960-X Series   │
│ SERVERS: ESXi Cluster   │
│ WORKSTATIONS: 47 Nodes  │
└─────────────────────────┘

VLAN SEGMENTATION:
• VLAN 10: Management
• VLAN 20: Production
• VLAN 30: Guest Network
• VLAN 99: Native (Unused)`
};

function handleCommand(command) {
    const sanitizedCommand = sanitizeInput(command);
    const terminalOutput = document.querySelector('.terminal-output');
    
    // Store command for ping parameter parsing
    handleCommand.lastCommand = command;
    
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
        errorDiv.textContent = `Command '${sanitizeHTML(sanitizedCommand)}' not recognized. Type 'help' for available commands.`;
        terminalOutput.appendChild(errorDiv);
    }
    
    // Limit DOM elements safely
    const children = Array.from(terminalOutput.children);
    if (children.length > 100) {
        children.slice(0, children.length - 100).forEach(child => {
            terminalOutput.removeChild(child);
        });
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
            document.body.classList.add('screen-vibrate');
            document.documentElement.style.setProperty('--primary-color', '#ff0000');
            
            setTimeout(() => {
                output.textContent = '[WARNING] SYSTEM MELTDOWN IN PROGRESS... 5... 4... 3...';
                document.body.classList.add('critical-meltdown');
            }, 1000);
            
            setTimeout(() => {
                output.textContent = '[CRITICAL] CORE BREACH!!! TOTAL SYSTEM FAILURE!!!';
                output.style.fontSize = '1.5em';
                output.style.textShadow = '0 0 30px #ff0000';
                document.body.classList.add('system-explosion');
            }, 2500);
            
            setTimeout(() => {
                output.textContent = '';
                document.body.classList.remove('screen-vibrate', 'critical-meltdown', 'system-explosion');
                document.documentElement.style.setProperty('--primary-color', '#00ff41');
                output.style.fontSize = '1em';
                output.style.textShadow = 'none';
                setTimeout(() => {
                    output.textContent = '[SYSTEM_FATAL] HIKARI CORE DELETED. REBOOT REQUIRED.';
                    output.style.color = '#ff0000';
                    output.style.textShadow = '0 0 15px #ff0000';
                }, 200);
            }, 4000);
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
function initializeApplication() {
    initializeMobileFeatures();
    applyMobileFixes();
    startNOCStatusHUD();
    startHikariLiveMonitoring();
    startHeartbeatMonitoring();
    startBootLineSequence();
    animateLatencyGraph();
    updateClock();
}

// Single initialization point
document.addEventListener('DOMContentLoaded', initializeApplication);
if (document.readyState === 'complete') {
    initializeApplication();
} else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();
}
function calculateSubnet() {
    const ipInput = document.getElementById('ip-input').value;
    const cidrInput = parseInt(document.getElementById('cidr-input').value);
    const output = document.getElementById('calc-output');
    
    if (!ipInput || isNaN(cidrInput) || cidrInput < 0 || cidrInput > 32) {
        output.textContent = 'ERROR: Invalid IP address or CIDR notation';
        return;
    }
    
    const ipParts = ipInput.split('.').map(part => parseInt(part));
    if (ipParts.length !== 4 || ipParts.some(part => isNaN(part) || part < 0 || part > 255)) {
        output.textContent = 'ERROR: Invalid IP address format';
        return;
    }
    
    const ip = (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
    const mask = (0xFFFFFFFF << (32 - cidrInput)) >>> 0;
    const network = (ip & mask) >>> 0;
    const broadcast = (network | (0xFFFFFFFF >>> cidrInput)) >>> 0;
    const firstHost = network + 1;
    const lastHost = broadcast - 1;
    
    const toIP = (num) => [(num >>> 24) & 0xFF, (num >>> 16) & 0xFF, (num >>> 8) & 0xFF, num & 0xFF].join('.');
    
    output.textContent = `SUBNET CALCULATION RESULTS:
┌─────────────────────────────────────────┐
│ Network Address: ${toIP(network).padEnd(15)} │
│ Broadcast Address: ${toIP(broadcast).padEnd(13)} │
│ First Host: ${toIP(firstHost).padEnd(20)} │
│ Last Host: ${toIP(lastHost).padEnd(21)} │
│ Total Hosts: ${(broadcast - network - 1).toString().padEnd(18)} │
│ Subnet Mask: ${toIP(mask).padEnd(18)} │
└─────────────────────────────────────────┘`;
}