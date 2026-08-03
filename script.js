/*================================
    PORTFOLIO DEVOPS
    Animations CSS fluides + Particules Gemini
    Auteur : Fanambinantsoa Haja
==================================*/

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const initialTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', initialTheme);
updateThemeIcon(initialTheme);

themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

const langToggle = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const cvBtn = document.getElementById('cv-download');
let currentLang = localStorage.getItem('lang') || 'en';

function applyLanguage(lang) {
    document.querySelectorAll('[data-fr]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
    langText.textContent = lang === 'en' ? 'FR' : 'EN';
    localStorage.setItem('lang', lang);
    if (cvBtn) {
        cvBtn.href = lang === 'fr'
            ? 'assets/cv/CV_Fanambina_FR_Styled.pdf'
            : 'assets/cv/CV_Fanambina_EN_Styled.pdf';
    }
}
applyLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    applyLanguage(currentLang);
    textIndex = 0;
    charIndex = 0;
    deleting = false;
});

const typingElement = document.getElementById('typing');
const translations = {
    fr: ['DevOps Engineer', 'Passionné Linux', 'Docker & Terraform', 'Threat Hunting', 'Sécurité & Wazuh'],
    en: ['DevOps Engineer', 'Linux Enthusiast', 'Docker & Terraform', 'Threat Hunting', 'Security & Wazuh']
};
let textIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
    const list = translations[currentLang] || translations.en;
    const current = list[textIndex];
    if (!deleting) {
        typingElement.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    } else {
        typingElement.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            textIndex = (textIndex + 1) % list.length;
        }
    }
    setTimeout(typeEffect, deleting ? 40 : 90);
}
typeEffect();

const navbar = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50 ? '0 8px 20px rgba(0,0,0,.15)' : 'none';
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 120) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}, { passive: true });

/* Animations CSS fluides — Intersection Observer */
const revealElements = document.querySelectorAll('.about-card, .skill, .timeline-item, .project-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => observer.observe(el));

const backToTop = document.createElement('button');
backToTop.innerHTML = '↑';
backToTop.id = 'backToTop';
document.body.appendChild(backToTop);
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

const heroImage = document.querySelector('.hero-right img');
window.addEventListener('mousemove', (e) => {
    if (!heroImage) return;
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;
    heroImage.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
}, { passive: true });

/* Particules style Gemini */
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 500;
let time = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas, { passive: true });
resizeCanvas();

class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
        this.size = Math.random() * 1.8 + 0.4;
        this.baseSpeed = Math.random() * 0.4 + 0.1;
        this.waveFreq = Math.random() * 0.008 + 0.003;
        this.phase = Math.random() * Math.PI * 2;
        this.alpha = Math.random() * 0.6 + 0.15;
        this.colorChoice = Math.random();
    }
    update() {
        this.y -= this.baseSpeed;
        this.x += Math.sin(time * this.waveFreq + this.phase) * 0.6;
        if (this.y < -10) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        let r, g, b;
        if (this.colorChoice > 0.55) { r = 139; g = 92; b = 246; }
        else { r = 56; g = 189; b = 248; }
        const a = isDark ? this.alpha : this.alpha * 0.5;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}

function drawWaveBands() {
    if (document.documentElement.getAttribute('data-theme') !== 'dark') return;
    for (let band = 0; band < 3; band++) {
        ctx.beginPath();
        const yBase = canvas.height * (0.25 + band * 0.22);
        const amp = 35 + band * 15;
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= canvas.width; x += 8) {
            const y = yBase + Math.sin(x * 0.004 + time * 0.015 + band) * amp
                             + Math.sin(x * 0.008 - time * 0.01) * (amp * 0.4);
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(139, 92, 246, ' + (0.04 - band * 0.008) + ')';
        ctx.lineWidth = 40 - band * 8;
        ctx.stroke();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 1;
    drawWaveBands();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

initParticles();
animate();
