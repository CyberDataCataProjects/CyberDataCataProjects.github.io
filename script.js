// Global variables
let terminalLogs = [];
let latencyData = [];
let clockInterval;
let nocInterval;
let latencyInterval;

// System logs for NOC Status HUD
const systemLogs = [
    '[SYSTEM] Network Operations Center online... monitoring 47 nodes',
    '[SYSTEM] Splunk Core User credentials validated... access granted', 
    '[SYSTEM] Azure cloud infrastructure health check... all services active',
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

// Initialize system on page load
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    startNOCStatusHUD();
    startLatencyMonitoring();
    initializeTerminal();
});

// NOC Status HUD System with cleanup
function startNOCStatusHUD() {
    const statusText = document.getElementById('noc-status-text');
    if (!statusText) return;
    
    let currentMessageIndex = 0;
    let typeTimeout;
    
    function typeMessage() {
        const message = systemLogs[currentMessageIndex];
        let charIndex = 0;
        
        statusText.textContent = '';
        
        function typeChar() {
            if (charIndex < message.length) {
                statusText.textContent = message.substring(0, charIndex + 1);
                charIndex++;
                typeTimeout = setTimeout(typeChar, 30);
            } else {
                typeTimeout = setTimeout(() => {
                    statusText.textContent = '';
                    currentMessageIndex = (currentMessageIndex + 1) % systemLogs.length;
                    typeTimeout = setTimeout(typeMessage, 100);
                }, 2000);
            }
        }
        
        typeChar();
    }
    
    typeMessage();
    
    return {
        stop: () => {
            if (typeTimeout) clearTimeout(typeTimeout);
        }
    };
}

// Generic command processor to eliminate code duplication
function processTerminalCommand(event, commandHandler) {
    if (event.key === 'Enter') {
        const input = event.target.value.trim().toLowerCase();
        const response = commandHandler(input);
        if (response.isTerminal) {
            addToTerminalLogs(input, response.text);
        } else {
            const output = document.getElementById('core-output');
            if (output) output.innerHTML = response.text;
        }
        event.target.value = '';
    }
}

// Terminal command processing
function processCommand(event) {
    processTerminalCommand(event, (input) => ({
        text: handleHikariCommand(input),
        isTerminal: true
    }));
}

// Core command processing
function processCoreCommand(event) {
    processTerminalCommand(event, (input) => {
        let response;
        switch(input) {
            case 'help':
                response = 'Available commands: status, scan, validate, monitor, self-destruct';
                break;
            case 'status':
                response = 'HIKARI Core v1.0 - All systems operational. NOC monitoring active.';
                break;
            case 'scan':
                response = 'Scanning network topology... 47 nodes discovered. Security assessment complete.';
                break;
            case 'validate':
                response = 'Credential validation: [Azure: ✓] [Cisco: ✓] [Google: ✓] [Splunk: ✓]';
                break;
            case 'monitor':
                response = 'Network latency: 12ms avg | Packet loss: 0% | Uptime: 99.97%';
                break;
            case 'self-destruct':
                response = 'ERROR: Insufficient privileges. Contact system administrator.';
                break;
            default:
                response = 'Unknown command. Type "help" for available commands.';
        }
        return { text: response, isTerminal: false };
    });
}

// Initialize terminal
function initializeTerminal() {
    const terminalInput = document.querySelector('.terminal-command');
    const coreInput = document.querySelector('.core-command');
    
    if (terminalInput) {
        terminalInput.addEventListener('keypress', processCommand);
    }
    if (coreInput) {
        coreInput.addEventListener('keypress', processCoreCommand);
    }
}

function handleHikariCommand(input) {
    switch(input) {
        case 'status':
            return 'NOC Heartbeat: All systems nominal. Latency: 14ms.';
        case 'scan':
            return 'Running integrity check on GitHub repositories...';
        case 'monitor':
            return 'Network monitoring active. 47 nodes online.';
        case 'validate':
            return 'Auditing credentials... [Splunk: Validated] [Cisco: Validated].';
        case 'help':
            return 'Available commands: status, scan, monitor, validate';
        default:
            return 'Unknown command. Type "help" for system protocols.';
    }
}

// Subnet calculator with proper validation
function calculateSubnet() {
    const ipInput = document.getElementById('ip-input');
    const cidrInput = document.getElementById('cidr-input');
    const output = document.getElementById('calc-output');
    
    if (!ipInput || !cidrInput || !output) return;
    
    const ip = ipInput.value.trim();
    const cidr = parseInt(cidrInput.value.trim(), 10);
    
    if (!isValidIP(ip) || isNaN(cidr) || cidr < 0 || cidr > 32) {
        output.textContent = 'Invalid IP address or CIDR notation.';
        return;
    }
    
    const result = calculateSubnetInfo(ip, cidr);
    output.innerHTML = `
        Network: ${sanitizeHTML(result.network)}<br>
        Broadcast: ${sanitizeHTML(result.broadcast)}<br>
        Subnet Mask: ${sanitizeHTML(result.mask)}<br>
        Host Range: ${sanitizeHTML(result.firstHost)} - ${sanitizeHTML(result.lastHost)}<br>
        Total Hosts: ${result.totalHosts}
    `;
}

function isValidIP(ip) {
    const parts = ip.split('.');
    return parts.length === 4 && parts.every(part => {
        const num = parseInt(part, 10);
        return !isNaN(num) && num >= 0 && num <= 255;
    });
}

function calculateSubnetInfo(ip, cidr) {
    const ipParts = ip.split('.').map(Number);
    const mask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
    const ipInt = (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
    const networkInt = (ipInt & mask) >>> 0;
    const broadcastInt = (networkInt | (0xFFFFFFFF >>> cidr)) >>> 0;
    
    return {
        network: intToIP(networkInt),
        broadcast: intToIP(broadcastInt),
        mask: intToIP(mask),
        firstHost: intToIP(networkInt + 1),
        lastHost: intToIP(broadcastInt - 1),
        totalHosts: Math.pow(2, 32 - cidr) - 2
    };
}

function intToIP(int) {
    return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
}

// Latency monitoring with proper cleanup
function startLatencyMonitoring() {
    const latencyLine = document.querySelector('.latency-line');
    if (!latencyLine) return;
    
    latencyInterval = setInterval(() => {
        const latency = Math.floor(Math.random() * 16) + 8; // 8-24ms
        latencyData.push(latency);
        if (latencyData.length >= 50) latencyData.shift();
        
        updateLatencyDisplay();
    }, 2000);
}

function updateLatencyDisplay() {
    const stats = document.querySelector('.latency-stats');
    if (!stats || latencyData.length === 0) return;
    
    const min = Math.min(...latencyData);
    const max = Math.max(...latencyData);
    const avg = Math.round(latencyData.reduce((a, b) => a + b) / latencyData.length);
    const jitter = Math.round((max - min) / 2);
    
    stats.innerHTML = `
        <span>Min: ${min}ms</span>
        <span>Avg: ${avg}ms</span>
        <span>Max: ${max}ms</span>
        <span>Jitter: ${jitter}ms</span>
    `;
    
    // Add flicker effect
    stats.classList.add('flicker');
    setTimeout(() => stats.classList.remove('flicker'), 200);
}

function updateClock() {
    const now = new Date();
    const utc = now.toISOString().slice(0, 19).replace('T', ' ');
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `System Time (UTC): ${utc}`;
    }
}

// Start clock with proper cleanup
clockInterval = setInterval(updateClock, 1000);

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
    terminalLogs.push({ 
        command: sanitizeInput(command), 
        response: { text: sanitizeInput(response), type } 
    });
    if (terminalLogs.length >= 50) {
        terminalLogs = terminalLogs.slice(-50);
    }
    updateTerminalDisplay();
}

// Optimized terminal display with incremental updates
let lastRenderedIndex = 0;
function updateTerminalDisplay() {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    
    // Only render new entries
    for (let i = lastRenderedIndex; i < terminalLogs.length; i++) {
        const log = terminalLogs[i];
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
    }
    
    lastRenderedIndex = terminalLogs.length;
    
    // Clean up old entries if too many
    if (output.children.length > 50) {
        while (output.children.length > 50) {
            output.removeChild(output.firstChild);
        }
        lastRenderedIndex = Math.max(0, lastRenderedIndex - (terminalLogs.length - 50));
    }
}

// Improved sanitization to prevent double-escaping
function sanitizeInput(input) {
    return input.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;');
}

function sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}