/**
 * Digital Identity Cleanse - Minimal JavaScript
 * Only essential functionality, no tracking, no analytics
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Checklist functionality
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateProgress();
            
            // Save progress to localStorage (no server tracking)
            const checklistData = {};
            checkboxes.forEach(cb => {
                checklistData[cb.id] = cb.checked;
            });
            localStorage.setItem('privacy-checklist', JSON.stringify(checklistData));
        });
    });
    
    // Load saved checklist progress
    function loadChecklistProgress() {
        const saved = localStorage.getItem('privacy-checklist');
        if (saved) {
            try {
                const checklistData = JSON.parse(saved);
                Object.keys(checklistData).forEach(id => {
                    const checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = checklistData[id];
                    }
                });
                updateProgress();
            } catch (e) {
                console.log('Could not load saved progress');
            }
        }
    }
    
    // Update progress indicators
    function updateProgress() {
        const categories = document.querySelectorAll('.checklist-category');
        categories.forEach(category => {
            const checkboxes = category.querySelectorAll('input[type="checkbox"]');
            const checked = category.querySelectorAll('input[type="checkbox"]:checked');
            const progress = checkboxes.length > 0 ? (checked.length / checkboxes.length) * 100 : 0;
            
            // Update progress bar if it exists
            const progressBar = category.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            // Update progress text if it exists
            const progressText = category.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = `${checked.length}/${checkboxes.length} completed`;
            }
        });
    }
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-copy');
            const element = document.querySelector(target);
            
            if (element) {
                const text = element.textContent || element.value;
                
                // Use modern clipboard API if available
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        showCopyFeedback(this);
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showCopyFeedback(this);
                }
            }
        });
    });
    
    function showCopyFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#00ff41';
        button.style.color = '#000';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }
    
    // Terminal-style typing effect for hero text (optional enhancement)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect for terminal elements
    const terminals = document.querySelectorAll('.terminal');
    terminals.forEach((terminal, index) => {
        const text = terminal.textContent;
        setTimeout(() => {
            typeWriter(terminal, text, 30);
        }, index * 1000);
    });
    
    // Load checklist progress on page load
    loadChecklistProgress();
    
    // Add glitch effect to random elements occasionally
    function addRandomGlitch() {
        const glitchElements = document.querySelectorAll('h1, h2, .feature-icon');
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        
        if (randomElement && !randomElement.classList.contains('glitch')) {
            randomElement.classList.add('glitch');
            setTimeout(() => {
                randomElement.classList.remove('glitch');
            }, 2000);
        }
    }
    
    // Trigger random glitch effects every 30 seconds
    setInterval(addRandomGlitch, 30000);
    
    // Matrix rain effect (Easter egg)
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Activate matrix rain on Konami code: ↑↑↓↓←→←→BA
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length) {
            let match = true;
            for (let i = 0; i < konamiSequence.length; i++) {
                if (konamiCode[i] !== konamiSequence[i]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                createMatrixRain();
                konamiCode = [];
            }
        }
    });
});

// No analytics, no tracking, no surveillance
// This is how JavaScript should be: minimal, functional, and privacy-respecting

