// =========================================
// BFC BADASS INTERACTIONS
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE NAVIGATION TOGGLE ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');

    if (mobileToggle && navLeft && navRight) {
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLeft.classList.toggle('active');
            navRight.classList.toggle('active');
            mobileToggle.textContent = navLeft.classList.contains('active') ? '✕' : '☰';
            console.log('Mobile nav toggled:', navLeft.classList.contains('active'));
        });
    }

    // --- SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.athlete-card, .rank-item, .fight-card, .video-card');
    
    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 50); // Staggered animation
            }
        });
    };

    // Initialize hidden state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // --- PARALLAX EFFECT ON HERO IMAGES ---
    const heroImages = document.querySelectorAll('.top-image, .champion-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroImages.forEach(img => {
            img.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    });

    // --- TYPEWRITER EFFECT FOR CHAMPION NAME ---
    const championName = document.querySelector('.champion-name');
    if (championName) {
        const text = championName.textContent;
        championName.textContent = '';
        championName.style.borderRight = '3px solid #e41f25';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                championName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    championName.style.borderRight = 'none';
                }, 500);
            }
        };
        
        // Start typewriter when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(championName);
    }

    // --- COUNTER ANIMATION FOR RANK NUMBERS ---
    const rankNumbers = document.querySelectorAll('.rank-number');
    
    const animateCounters = () => {
        rankNumbers.forEach(el => {
            const target = parseInt(el.textContent);
            let current = 0;
            const increment = target / 20;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.ceil(current);
                }
            }, 30);
        });
    };

    // Trigger counter animation when rankings section is visible
    const rankingsSection = document.querySelector('.rankings-list');
    if (rankingsSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        counterObserver.observe(rankingsSection);
    }

    // --- MOUSE TRAIL EFFECT (Desktop only) ---
    if (window.innerWidth > 768) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        document.body.appendChild(trail);
        
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';
            requestAnimationFrame(animateTrail);
        };
        
        animateTrail();
    }

    // --- ATHLETE CARD TILT EFFECT ---
    const athleteCards = document.querySelectorAll('.athlete-card');
    
    athleteCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // --- CLICK RIPPLE EFFECT ---
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });

    // --- NAVBAR SCROLL EFFECT ---
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'rgb(21, 21, 21)';
            nav.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });

    console.log('🔥 BFC Website Loaded - FIGHT NIGHT READY! 🔥');
});
