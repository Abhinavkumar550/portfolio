// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* === Navbar scroll effect === */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* === Mobile Menu Toggle === */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* === Typewriter Effect === */
    const textRoles = [
        "Data Engineer.",
        "Data Analyst.",
        "Problem Solver.",
        "Tech Enthusiast."
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeElement = document.getElementById('typed-text');
    
    function typeEffect() {
        const currentRole = textRoles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        typeElement.textContent = currentRole.substring(0, charIndex);
        
        let typingSpeed = 100;
        
        if (isDeleting) {
            typingSpeed /= 2; // Delete faster
        }
        
        // If word is completely typed, pause then start deleting
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at the end
            isDeleting = true;
        } 
        // If word is completely deleted, move to next word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % textRoles.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typewriter if element exists
    if(typeElement) {
        setTimeout(typeEffect, 1000); // Initial delay
    }

    /* === Scroll Reveal Animation === */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Ensure first section elements load immediately
    setTimeout(() => {
        document.querySelectorAll('#hero .reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

});
