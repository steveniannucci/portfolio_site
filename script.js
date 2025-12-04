// Consolidated DOMContentLoaded - Optimized for performance
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements to avoid repeated queries
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const filterButtons = document.querySelectorAll('.projects-filter button');
    const projectItems = document.querySelectorAll('.project-item');
    const form = document.querySelector('form');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Hamburger menu toggle functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Projects filter functionality
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', filterProjects);
        });
    }

    function filterProjects(e) {
        const button = e.target;
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects efficiently
        projectItems.forEach(item => {
            item.style.display = (filter === 'all' || item.classList.contains(filter)) ? '' : 'none';
        });
    }

    // Form validation functionality
    if (form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Real-time validation on input
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
        
        form.addEventListener('submit', (e) => {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    function validateField(input) {
        let feedback = input.parentElement.querySelector('.feedback');
        
        if (!feedback) {
            feedback = document.createElement('span');
            feedback.className = 'feedback';
            input.parentElement.appendChild(feedback);
        }
        
        const isValid = input.value.trim().length > 0;
        
        if (!isValid) {
            input.classList.add('error');
            feedback.textContent = 'This field is required';
            feedback.classList.add('error');
        } else {
            input.classList.remove('error');
            feedback.textContent = '';
            feedback.classList.remove('error');
        }
        
        return isValid;
    }
});