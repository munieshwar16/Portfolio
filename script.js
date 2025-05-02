// DOM Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const typedTextElement = document.querySelector('.typed-text');
const sections = document.querySelectorAll('section');
const skillCards = document.querySelectorAll('.skill-card');
const projectCards = document.querySelectorAll('.project-card');
const timelineItems = document.querySelectorAll('.timeline-item');
const contactForm = document.getElementById('contactForm');

// Typed text effect with updated roles
const typedTexts = ['Data Analyst', 'ML Engineer', 'AI Scientist', 'Software Engineer', 'Data Engineer'];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let deletingDelay = 50;
let newTextDelay = 1500;

function typeEffect() {
    const currentText = typedTexts[currentTextIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingDelay = deletingDelay;
    } else {
        typedTextElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typedTexts.length;
    }
    
    setTimeout(typeEffect, typingDelay);
}

// Responsive Navigation
function toggleNav() {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
}

// Smooth scrolling for navigation links
function smoothScroll(event, targetId) {
    event.preventDefault();
    
    const targetSection = document.querySelector(targetId);
    const headerOffset = 80;
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (navLinks.classList.contains('active')) {
        toggleNav();
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
            }
        }
    });
}, observerOptions);

// Show More Skills Functionality
function setupShowMoreSkills() {
    const showMoreBtn = document.getElementById('show-more-skills');
    const hiddenSkills = document.getElementById('hidden-skills');
    const btnText = showMoreBtn.querySelector('.btn-text');
    
    if (showMoreBtn && hiddenSkills) {
        showMoreBtn.addEventListener('click', function() {
            const isExpanded = hiddenSkills.classList.contains('show');
            
            if (isExpanded) {
                // Hide skills
                hiddenSkills.classList.remove('show');
                btnText.textContent = 'Show More Skills';
                showMoreBtn.classList.remove('active');
            } else {
                // Show skills
                hiddenSkills.classList.add('show');
                btnText.textContent = 'Show Less Skills';
                showMoreBtn.classList.add('active');
            }
        });
    }
}

// Form validation and submission
function validateForm(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    let isValid = true;
    
    // Simple validation
    if (nameInput.value.trim() === '') {
        highlightInvalid(nameInput);
        isValid = false;
    } else {
        removeInvalidHighlight(nameInput);
    }
    
    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        highlightInvalid(emailInput);
        isValid = false;
    } else {
        removeInvalidHighlight(emailInput);
    }
    
    if (subjectInput.value.trim() === '') {
        highlightInvalid(subjectInput);
        isValid = false;
    } else {
        removeInvalidHighlight(subjectInput);
    }
    
    if (messageInput.value.trim() === '') {
        highlightInvalid(messageInput);
        isValid = false;
    } else {
        removeInvalidHighlight(messageInput);
    }
    
    if (isValid) {
        // Form submission logic here
        alert('Message sent successfully!');
        event.target.reset();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function highlightInvalid(element) {
    element.style.borderColor = '#ff6b6b';
    element.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
}

function removeInvalidHighlight(element) {
    element.style.borderColor = '';
    element.style.boxShadow = '';
}

// Sticky navbar with background change
function handleScroll() {
    const nav = document.querySelector('nav');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        nav.style.padding = '15px 5%';
        nav.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
    } else {
        nav.style.boxShadow = 'none';
        nav.style.padding = '20px 5%';
        nav.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
    }
}

// Enhanced parallax effect for floating shapes
function parallaxEffect() {
    const scrollPosition = window.scrollY;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrollPosition * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
}

// Add skill card animation delays
function setSkillCardAnimationDelays() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.dataset.delay = `${index * 0.1}s`;
        card.classList.add('scroll-animated');
    });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start the typing effect
    if (typedTextElement) {
        setTimeout(typeEffect, 1000);
    }
    
    // Set up burger menu click event
    if (burger) {
        burger.addEventListener('click', toggleNav);
    }
    
    // Set up smooth scrolling for navigation links
    navLinksItems.forEach(link => {
        const targetId = link.getAttribute('href');
        link.addEventListener('click', (event) => smoothScroll(event, targetId));
    });
    
    // Set up animation delays for skill cards
    setSkillCardAnimationDelays();
    
    // Set up intersection observer for scroll animations
    sections.forEach(section => {
        section.classList.add('scroll-animated');
        intersectionObserver.observe(section);
    });
    
    skillCards.forEach(card => {
        intersectionObserver.observe(card);
    });
    
    projectCards.forEach(card => {
        card.classList.add('scroll-animated');
        intersectionObserver.observe(card);
    });
    
    timelineItems.forEach(item => {
        item.classList.add('scroll-animated');
        intersectionObserver.observe(item);
    });
    
    // Set up form validation
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
    
    // Set up scroll event for sticky navbar and parallax
    window.addEventListener('scroll', () => {
        handleScroll();
        parallaxEffect();
        requestAnimationFrame(parallaxEffect);
    });
    
    // Setup Show More Skills functionality
    setupShowMoreSkills();
    
    // Add mobile menu styles to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            right: 0;
            top: 70px;
            background-color: rgba(10, 25, 47, 0.98);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 0 0 0 10px;
            z-index: 999;
        }
        
        .nav-links.active a {
            margin: 10px 0;
            color: var(--light-color);
        }
        
        .burger {
            display: none;
            cursor: pointer;
            z-index: 1001;
        }
        
        .burger div {
            width: 25px;
            height: 3px;
            background-color: var(--light-color);
            margin: 5px;
            transition: all 0.3s ease;
        }
        
        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .burger.toggle .line2 {
            opacity: 0;
        }
        
        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Card hover effects */
        .skill-card, .project-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @media (max-width: 768px) {
            .burger {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add progress bar at the top of the page
window.addEventListener('load', function() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))';
    progressBar.style.zIndex = '2000';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.2s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});