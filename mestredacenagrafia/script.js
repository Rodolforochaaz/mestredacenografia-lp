document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initTiltEffect(); 
    initStickyScrollEffect();
    initCarousel();
    initScrollAnimations();
    initFAQ();
    initSpotlightAndTilt();
    initCounters(); 
    initVerticalScrollReveal(); 
});

function initVerticalScrollReveal() {
    const cards = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });
    cards.forEach(card => observer.observe(card));
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 100;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
}

function initSpotlightAndTilt() {
    if (window.matchMedia("(pointer: fine)").matches) {
        const cards = document.querySelectorAll('.spotlight-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const mouseX = x - centerX;
                const mouseY = y - centerY;
                const rotateX = (mouseY / centerY) * -5; 
                const rotateY = (mouseX / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease'; 
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                setTimeout(() => { card.style.transition = ''; }, 500);
            });
        });
    }
}

function initTiltEffect() {
    if(window.innerWidth > 900) {
        const hero = document.getElementById('hero');
        const content = document.querySelector('.hero-text-wrapper');
        if (hero && content) {
            hero.addEventListener('mousemove', (e) => {
                const { offsetWidth: width, offsetHeight: height } = hero;
                const { clientX: x, clientY: y } = e;
                const xWalk = Math.round((x / width * 20) - 10);
                const yWalk = Math.round((y / height * 20) - 10);
                content.style.transform = `rotateY(${xWalk}deg) rotateX(${-yWalk}deg)`;
            });
            hero.addEventListener('mouseleave', () => {
                content.style.transition = 'transform 0.5s ease';
                content.style.transform = `rotateY(0deg) rotateX(0deg)`;
                setTimeout(() => { content.style.transition = 'transform 0.1s ease-out'; }, 500);
            });
        }
    }
}

function initStickyScrollEffect() {
    const textBlocks = document.querySelectorAll('.text-block');
    const imageWrapper = document.querySelector('.img-card-wrapper');
    const section = document.querySelector('.problem-section');
    window.addEventListener('scroll', () => {
        if(window.innerWidth > 900 && section && imageWrapper) {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.7) imageWrapper.classList.add('reveal-active');
        }
    });
}

// CORREÇÃO: Mantém o menu laranja mesmo ao rolar
function initNavigation() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        // Mantém a cor laranja definida no CSS, apenas ajusta opacidade se quiser
        // Não sobrescreve com branco ou cinza
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    const links = document.querySelectorAll('.mobile-link');
    if(toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = menu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = menu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = menu.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
        });
        links.forEach(l => l.addEventListener('click', () => menu.classList.remove('active')));
    }
}

function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    let current = 0;
    const show = (i) => {
        items.forEach(el => el.classList.remove('active'));
        items[i].classList.add('active');
    };
    if(items.length) {
        if(next) next.addEventListener('click', () => { current = (current+1)%items.length; show(current); });
        if(prev) prev.addEventListener('click', () => { current = (current-1+items.length)%items.length; show(current); });
        setInterval(() => { current = (current+1)%items.length; show(current); }, 5000);
    }
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.diferencial-card, .about-content, .faq-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

function initFAQ() {
    const buttons = document.querySelectorAll('.faq-question');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            item.classList.toggle('active');
        });
    });
}