// Event Data
const events = [
    { title: 'Sunday Service', description: 'Join us every Sunday at 5 PM for worship, message and fellowship.' },
    { title: 'Wednesday Bible Study', description: 'Midweek Bible study and prayer at 7 PM.' },
    { title: 'Youth Fellowship', description: 'Every Friday at 6:30 PM for teens and young adults.' },
    { title: 'Children\'s Ministry', description: 'Sunday School for kids during the main service.' },
    { title: 'Community Outreach', description: 'Monthly outreach programs to serve our local community.' },
];

const landingSectionImgs = 3; // Total number of background images
let currentImageIndex = 1;

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');
const contactForm = document.querySelector('.contact-form');
const landingSection = document.getElementById('landing');

// Initialize mobile menu
function initMobileMenu() {
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        // Create mobile nav if it doesn't exist
        let mobileNav = document.querySelector('.mobile-nav');
        
        if (!mobileNav) {
            mobileNav = document.createElement('div');
            mobileNav.className = 'mobile-nav';
            
            // Clone nav links and append to mobile nav
            const navLinks = document.querySelectorAll('.navbar-right .nav-link');
            navLinks.forEach(link => {
                const newLink = link.cloneNode(true);
                mobileNav.appendChild(newLink);
            });
            
            document.body.appendChild(mobileNav);
        }
        
        // Toggle mobile nav
        mobileNav.classList.toggle('active');
    });
}

// Initialize smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                }
            }
        });
    });
}

// Add background image cycling
function cycleBackgroundImages() {
    if (!landingSection) return;
    
    // Set initial background
    landingSection.style.backgroundImage = `url('land_imgs/${currentImageIndex}.jpg')`;
    
    // Set interval to change images
    setInterval(() => {
        landingSection.style.opacity = 0;
        
        setTimeout(() => {
            currentImageIndex = currentImageIndex % landingSectionImgs + 1;
            landingSection.style.backgroundImage = `url('land_imgs/${currentImageIndex}.jpg')`;
            landingSection.style.opacity = 1;
        }, 500);
    }, 6000);
}

// Generate event boxes
function generateEvents() {
    const eventsContainer = document.querySelector('.events-container');
    if (!eventsContainer) return;
    
    events.forEach((event, index) => {
        const eventBox = document.createElement('div');
        eventBox.className = 'event-box';
        eventBox.style.background = `linear-gradient(135deg, hsl(${index * 30 % 360}, 70%, 60%), hsl(${index * 30 % 360}, 70%, 70%))`;
        
        const title = document.createElement('h3');
        title.textContent = event.title;
        
        const description = document.createElement('p');
        description.textContent = event.description;
        
        eventBox.appendChild(title);
        eventBox.appendChild(description);
        eventsContainer.appendChild(eventBox);
    });
}

// Load video embed
function loadVideoEmbed() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;
    
    fetch('./liveVidEmbed.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            videoContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading video embed:', error);
            videoContainer.innerHTML = '<p>Video temporarily unavailable</p>';
        });
}

// Generate photo gallery
function generatePhotoGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;
    
    // Sample photo categories
    const photoCategories = [
        { name: 'Worship Services', thumbnail: '../photos/cat1/1.jpg' },
        { name: 'Community Events', thumbnail: '../photos/cat2/1.jpg' },
        { name: 'Youth Activities', thumbnail: '../photos/cat3/1.jpg' },
    ];
    
    photoCategories.forEach(category => {
        const folder = document.createElement('div');
        folder.className = 'folder';
        
        const img = document.createElement('img');
        img.src = category.thumbnail;
        img.alt = category.name;
        img.loading = 'lazy';
        
        img.addEventListener('click', () => {
            window.location.href = `photos.html?name=${encodeURIComponent(category.name)}`;
        });
        
        const name = document.createElement('div');
        name.className = 'folder-name';
        name.textContent = category.name;
        
        folder.appendChild(img);
        folder.appendChild(name);
        galleryContainer.appendChild(folder);
    });
}

// Handle contact form submission
function handleContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show success state
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('submitted');
        
        // In a real implementation, this would send the form data to a server
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.classList.remove('submitted');
        }, 2000);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    cycleBackgroundImages();
    generateEvents();
    loadVideoEmbed();
    generatePhotoGallery();
    handleContactForm();
    
    // Add scroll effect for sections
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});