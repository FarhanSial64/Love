/* ============================================
   💖 ROMANTIC PROPOSAL WEBSITE - JAVASCRIPT
   A Special Creation for a Special Person
   ============================================ */

// ==================== CONFIGURATION ====================
// You can customize these messages easily!
const CONFIG = {
    // Landing screen messages (more suspenseful!)
    landingMessages: [
        "Hey… 👀",
        "I need to tell you something...",
        "Something I've been holding in my heart... 💕"
    ],
    
    // Typing speed (lower = faster)
    typingSpeed: 70,
    
    // Music volume (0 to 1)
    musicVolume: 0.3,
    
    // Romantic quotes for celebration (random selection)
    quotes: [
        {
            text: ["In all the world, there is no heart for me like yours.", "In all the world, there is no love for you like mine."],
            author: "Maya Angelou"
        },
        {
            text: ["I have waited for this opportunity for more than half a century,", "to repeat to you once again my vow of eternal fidelity and everlasting love."],
            author: "Gabriel García Márquez"
        },
        {
            text: ["Whatever our souls are made of,", "yours and mine are the same."],
            author: "Emily Brontë"
        }
    ]
};

// ==================== DOM ELEMENTS ====================
const screens = {
    landing: document.getElementById('screen-landing'),
    memory: document.getElementById('screen-memory'),
    queen: document.getElementById('screen-queen'),
    suspense: document.getElementById('screen-suspense'),
    question: document.getElementById('screen-question'),
    celebration: document.getElementById('screen-celebration')
};

const buttons = {
    start: document.getElementById('btn-start'),
    memory: document.getElementById('btn-memory'),
    queen: document.getElementById('btn-queen'),
    yes: document.getElementById('btn-yes'),
    no: document.getElementById('btn-no')
};

const elements = {
    typingText1: document.getElementById('typing-text-1'),
    typingText2: document.getElementById('typing-text-2'),
    typingText3: document.getElementById('typing-text-3'),
    heartsContainer: document.getElementById('hearts-container'),
    starsContainer: document.getElementById('stars-container'),
    confettiContainer: document.getElementById('confetti-container'),
    bgMusic: document.getElementById('bgMusic'),
    noMessage: document.getElementById('no-message')
};

// ==================== STATE ====================
let musicStarted = false;
let noButtonEscapeCount = 0;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

function initializeWebsite() {
    // Create starfield background
    createStarfield();
    
    // Start floating hearts
    createFloatingHearts();
    
    // Start typing animation on landing page
    startTypingAnimation();
    
    // Setup button listeners
    setupEventListeners();
}

// ==================== STARFIELD BACKGROUND ====================
function createStarfield() {
    const starsContainer = elements.starsContainer;
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size (tiny stars)
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random twinkle animation
        star.style.animationDuration = (2 + Math.random() * 3) + 's';
        star.style.animationDelay = Math.random() * 2 + 's';
        
        starsContainer.appendChild(star);
    }
}

// ==================== FLOATING HEARTS ====================
function createFloatingHearts() {
    // More emojis for variety!
    const emojis = [
        '💕', '💖', '💗', '💓', '💝', '❤️', '💘', '💞', '💟', '♥️',
        '✨', '🌟', '⭐', '💫', '🌙', '🦋', '🌸', '🌺', '🌹', '💐',
        '👑', '💎', '🔮', '🎀', '🪽', '☁️', '🤍', '💜', '🩷', '🩵'
    ];
    
    // Create many initial emojis for a rich background
    for (let i = 0; i < 40; i++) {
        setTimeout(() => createHeart(emojis), i * 100);
    }
    
    // Continue creating emojis more frequently
    setInterval(() => createHeart(emojis), 800);
    
    // Create burst of emojis periodically
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createHeart(emojis), i * 150);
        }
    }, 4000);
}

function createHeart(emojis) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Random position and animation
    const startLeft = Math.random() * 100;
    heart.style.left = startLeft + 'vw';
    
    // Varied animation duration for natural feel
    const duration = 12 + Math.random() * 15;
    heart.style.animationDuration = duration + 's';
    
    // Varied sizes
    heart.style.fontSize = (0.8 + Math.random() * 2) + 'rem';
    
    // Start with good visibility
    const startOpacity = 0.4 + Math.random() * 0.4;
    heart.style.opacity = startOpacity;
    
    // Add gentle horizontal sway
    heart.style.setProperty('--sway', (Math.random() * 100 - 50) + 'px');
    
    elements.heartsContainer.appendChild(heart);
    
    // Gradually fade out while continuing motion instead of disappearing
    const fadeStart = duration * 0.6 * 1000; // Start fading at 60% of journey
    const fadeDuration = duration * 0.4 * 1000; // Fade for remaining 40%
    
    setTimeout(() => {
        heart.style.transition = `opacity ${fadeDuration}ms ease-out`;
        heart.style.opacity = '0.05'; // Fade to very low opacity, not zero
    }, fadeStart);
    
    // Remove only after animation fully completes
    setTimeout(() => heart.remove(), duration * 1000 + 1000);
}

// ==================== TYPING ANIMATION ====================
async function startTypingAnimation() {
    // Dramatic pause before starting
    await delay(800);
    
    elements.typingText1.classList.add('typing-cursor');
    
    // Type first message
    await typeText(elements.typingText1, CONFIG.landingMessages[0]);
    elements.typingText1.classList.remove('typing-cursor');
    
    await delay(600);
    
    // Type second message
    elements.typingText2.classList.add('typing-cursor');
    await typeText(elements.typingText2, CONFIG.landingMessages[1]);
    elements.typingText2.classList.remove('typing-cursor');
    
    await delay(600);
    
    // Type third message
    elements.typingText3.classList.add('typing-cursor');
    await typeText(elements.typingText3, CONFIG.landingMessages[2]);
    elements.typingText3.classList.remove('typing-cursor');
    
    // Show continue button with dramatic pause
    await delay(500);
    showButton(buttons.start);
}

function typeText(element, text) {
    return new Promise((resolve) => {
        let index = 0;
        const interval = setInterval(() => {
            element.textContent = text.substring(0, index + 1);
            index++;
            
            if (index === text.length) {
                clearInterval(interval);
                resolve();
            }
        }, CONFIG.typingSpeed);
    });
}

// ==================== SCREEN TRANSITIONS ====================
function transitionToScreen(currentScreen, nextScreen, callback) {
    // Add cinematic fade out
    currentScreen.classList.add('fade-out');
    
    setTimeout(() => {
        currentScreen.classList.remove('active', 'fade-out');
        nextScreen.classList.add('active', 'fade-in');
        
        setTimeout(() => {
            nextScreen.classList.remove('fade-in');
            if (callback) callback();
        }, 1000);
    }, 800);
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Continue button (Landing → Memory)
    buttons.start.addEventListener('click', () => {
        transitionToScreen(screens.landing, screens.memory, () => {
            setTimeout(animateMemoryLines, 300);
        });
    });
    
    // Go Ahead button (Memory → Queen)
    buttons.memory.addEventListener('click', () => {
        transitionToScreen(screens.memory, screens.queen, () => {
            startMusic();
        });
    });
    
    // Question button (Queen → Suspense → Question)
    buttons.queen.addEventListener('click', () => {
        transitionToScreen(screens.queen, screens.suspense, () => {
            // Auto-transition to question after suspense builds
            setTimeout(() => {
                transitionToScreen(screens.suspense, screens.question);
            }, 4000);
        });
    });
    
    // YES button - The happy ending! 💍
    buttons.yes.addEventListener('click', handleYesClick);
    
    // When hovering YES, bring NO button back to its place
    buttons.yes.addEventListener('mouseenter', () => {
        const noBtn = buttons.no;
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.transform = '';
        noBtn.style.transition = 'all 0.5s ease';
    });
    
    // NO button - The escaping button! 😏
    setupNoButtonEscape();
}

// ==================== MEMORY SCREEN ====================
function animateMemoryLines() {
    const lines = document.querySelectorAll('.memory-line');
    
    lines.forEach((line, index) => {
        const delay = parseInt(line.dataset.delay) || index * 1000;
        setTimeout(() => {
            line.classList.add('visible');
        }, delay);
    });
    
    // Show button after all lines
    const totalDelay = (lines.length * 1000) + 800;
    setTimeout(() => showButton(buttons.memory), totalDelay);
}

// ==================== MUSIC ====================
function startMusic() {
    if (!musicStarted && elements.bgMusic) {
        elements.bgMusic.volume = CONFIG.musicVolume;
        elements.bgMusic.play().catch(e => {
            console.log('Music autoplay prevented:', e);
        });
        musicStarted = true;
    }
}

// ==================== NO BUTTON ESCAPE LOGIC ====================
function setupNoButtonEscape() {
    const noBtn = buttons.no;
    const container = screens.question;
    
    // Escape messages (more playful!)
    const escapeMessages = [
        "Haha! You can't escape my love! 😏💕",
        "Nice try! But NO is not an option! 😘",
        "The button is too shy! 🙈💖",
        "Oops! It ran away again! 😂❤️",
        "You're stuck with me forever! 💍✨",
        "That button has commitment issues, unlike me! 😉",
        "Catch me if you can! 🏃‍♀️💨",
        "The universe wants you to say YES! 🌌💖",
        "Even the button knows the answer! 😏",
        "It's afraid of your beauty! 👸✨"
    ];
    
    // Mouse hover escape (Desktop)
    noBtn.addEventListener('mouseenter', (e) => {
        escapeButton(noBtn, container);
    });
    
    // Click escape (Desktop & Mobile)
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        escapeButton(noBtn, container);
    });
    
    // Touch escape (Mobile)
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        escapeButton(noBtn, container);
    });
    
    function escapeButton(btn, container) {
        noButtonEscapeCount++;
        
        // Add screen shake effect
        screens.question.classList.add('screen-shake');
        setTimeout(() => screens.question.classList.remove('screen-shake'), 400);
        
        // Get container bounds
        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        
        // Calculate safe area (keep button visible)
        const padding = 30;
        const maxX = containerRect.width - btnRect.width - padding;
        const maxY = containerRect.height - btnRect.height - padding;
        
        // Random new position
        const newX = padding + Math.random() * (maxX - padding);
        const newY = padding + Math.random() * (maxY - padding);
        
        // Apply new position with playful animation
        btn.style.position = 'fixed';
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
        btn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Show escape message
        showEscapeMessage(escapeMessages[noButtonEscapeCount % escapeMessages.length]);
    }
}

function showEscapeMessage(message) {
    elements.noMessage.textContent = message;
    elements.noMessage.classList.remove('hidden');
    elements.noMessage.classList.add('show');
    
    // Hide after 2 seconds
    setTimeout(() => {
        elements.noMessage.classList.remove('show');
        elements.noMessage.classList.add('hidden');
    }, 2500);
}

// ==================== YES CLICK - CELEBRATION! ====================
function handleYesClick() {
    // Reset NO button to its original position
    const noBtn = buttons.no;
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.transform = '';
    noBtn.style.transition = '';
    
    // Transition to celebration
    transitionToScreen(screens.question, screens.celebration);
    
    // Start celebration effects
    setTimeout(() => {
        createConfetti();
        createHeartBurst();
        createFireworks();
    }, 300);
    
    // Increase music volume slightly for celebration
    if (elements.bgMusic) {
        elements.bgMusic.volume = Math.min(0.5, CONFIG.musicVolume + 0.2);
    }
}

// ==================== CONFETTI ANIMATION ====================
function createConfetti() {
    const colors = ['#ff6b9d', '#ffd700', '#ff8fab', '#ffc2d1', '#ffffff', '#e8a87c', '#ff69b4'];
    const shapes = ['square', 'circle'];
    
    // Create 200 confetti pieces for more impact
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = 5 + Math.random() * 12;
            
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.backgroundColor = color;
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
            confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
            
            elements.confettiContainer.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }
    
    // Continue confetti for a while
    setTimeout(() => createMoreConfetti(), 3000);
    setTimeout(() => createMoreConfetti(), 6000);
}

function createMoreConfetti() {
    const colors = ['#ff6b9d', '#ffd700', '#ff8fab'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 5 + Math.random() * 10;
            
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.backgroundColor = color;
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            elements.confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 40);
    }
}

function createHeartBurst() {
    const hearts = ['💖', '💕', '💗', '💓', '❤️', '💘', '💝', '💞', '💟'];
    
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'confetti';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            heart.style.background = 'none';
            
            elements.confettiContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 80);
    }
}

// ==================== FIREWORKS ====================
function createFireworks() {
    const colors = ['#ff6b9d', '#ffd700', '#ff8fab', '#ffffff', '#e8a87c'];
    
    // Create multiple fireworks
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createSingleFirework(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 500);
    }
}

function createSingleFirework(color) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.backgroundColor = color;
    firework.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
    firework.style.left = (20 + Math.random() * 60) + '%';
    firework.style.top = (20 + Math.random() * 40) + '%';
    
    elements.confettiContainer.appendChild(firework);
    
    setTimeout(() => firework.remove(), 1000);
}

// ==================== UTILITY FUNCTIONS ====================
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showButton(button) {
    button.classList.remove('hidden');
    button.classList.add('show');
}

// ==================== SPECIAL: Keyboard Easter Egg ====================
document.addEventListener('keydown', (e) => {
    // Press 'L' for extra love
    if (e.key.toLowerCase() === 'l') {
        createHeartBurst();
    }
    
    // Press 'Y' as a shortcut for YES on question screen
    if (e.key.toLowerCase() === 'y' && screens.question.classList.contains('active')) {
        handleYesClick();
    }
    
    // Press 'H' for hearts explosion
    if (e.key.toLowerCase() === 'h') {
        for (let i = 0; i < 20; i++) {
            createHeart(['💖', '💕', '💗', '💓', '❤️']);
        }
    }
});

// ==================== MOBILE TOUCH EASTER EGGS ====================
let lastTapTime = 0;
let tapCount = 0;

// Double-tap anywhere for heart burst (mobile)
document.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapGap = currentTime - lastTapTime;
    
    if (tapGap < 300 && tapGap > 0) {
        // Double tap detected!
        tapCount++;
        
        // Create hearts at touch location
        const touch = e.changedTouches[0];
        createTouchHearts(touch.clientX, touch.clientY);
        
        // Every 5 double-taps, create a bigger burst
        if (tapCount % 5 === 0) {
            createHeartBurst();
        }
    }
    lastTapTime = currentTime;
});

// Create hearts at touch location
function createTouchHearts(x, y) {
    const hearts = ['💖', '💕', '💗', '✨', '⭐', '💫'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.fontSize = (1 + Math.random()) + 'rem';
            heart.style.zIndex = '9999';
            
            // Explode in random direction
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            heart.style.transition = 'all 0.8s ease-out';
            document.body.appendChild(heart);
            
            // Animate outward
            requestAnimationFrame(() => {
                heart.style.transform = `translate(${endX}px, ${endY}px) scale(0)`;
                heart.style.opacity = '0';
            });
            
            setTimeout(() => heart.remove(), 800);
        }, i * 30);
    }
}

// Long press for big love explosion (mobile)
let longPressTimer = null;

document.addEventListener('touchstart', (e) => {
    longPressTimer = setTimeout(() => {
        // Long press detected! Big love explosion
        createHeartBurst();
        createFireworks();
        
        // Vibrate if supported (adds tactile feedback)
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }, 800); // 800ms hold
});

document.addEventListener('touchend', () => {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
});

document.addEventListener('touchmove', () => {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
});

// ==================== MOUSE TRAIL HEARTS (Desktop) ====================
let lastTrailTime = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < 100) return; // Throttle
    lastTrailTime = now;
    
    // Only on celebration screen
    if (screens.celebration.classList.contains('active')) {
        const heart = document.createElement('span');
        heart.textContent = ['✨', '💕', '💖'][Math.floor(Math.random() * 3)];
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = '1rem';
        heart.style.zIndex = '9999';
        heart.style.animation = 'fadeOutUp 1s ease forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
});

// Touch trail for mobile on celebration screen
document.addEventListener('touchmove', (e) => {
    if (!screens.celebration.classList.contains('active')) return;
    
    const now = Date.now();
    if (now - lastTrailTime < 80) return;
    lastTrailTime = now;
    
    const touch = e.touches[0];
    const heart = document.createElement('span');
    heart.textContent = ['✨', '💕', '💖', '⭐'][Math.floor(Math.random() * 4)];
    heart.style.position = 'fixed';
    heart.style.left = touch.clientX + 'px';
    heart.style.top = touch.clientY + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '1.2rem';
    heart.style.zIndex = '9999';
    heart.style.animation = 'fadeOutUp 1s ease forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}, { passive: true });

// Add fadeOutUp animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutUp {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-30px) scale(0.5); }
    }
`;
document.head.appendChild(style);

// ==================== CONSOLE MESSAGE ====================
console.log(`
💖 ═══════════════════════════════════════════════ 💖
    
    This website was made with love 💕
    
    For the most special person in someone's life.
    
    Easter Eggs:
    
    📱 MOBILE:
    - Double-tap anywhere → Hearts burst at touch
    - Long press (hold) → Big love explosion + fireworks
    - Swipe on celebration → Sparkle trail
    
    💻 DESKTOP:
    - Press 'L' → Love explosion
    - Press 'H' → Hearts burst
    - Press 'Y' → Quick yes
    - Move mouse on celebration → Sparkle trail
    
    💍 Forever and Always 💍
    
💖 ═══════════════════════════════════════════════ 💖
`);
