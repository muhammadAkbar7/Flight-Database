/* script.js */
// Tab functionality
function openTab(evt, tabName) {
    // Hide all tab content
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove active class from all tab buttons
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab content and activate the button
    document.getElementById(tabName).style.display = "block";
    
    // Safety check before applying animation
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
        evt.currentTarget.style.transform = 'scale(1.05)';
        setTimeout(() => {
            if (evt.currentTarget) {
                evt.currentTarget.style.transform = 'scale(1)';
            }
        }, 200);
    }
}

// Form functionality
function showform(dowhat, formType) {
    // Get all form containers
    const forms = document.querySelectorAll('.form-container');
    
    // Hide all forms first
    forms.forEach(form => {
        form.style.display = 'none';
        form.classList.remove('visible');
    });
    
    // Show the requested form
    if (dowhat === 'all') {
        forms.forEach(form => {
            form.style.display = 'block';
            form.classList.add('visible');
        });
    } else if (dowhat !== 'browse') {
        const targetForm = document.getElementById(dowhat);
        if (targetForm) {
            targetForm.style.display = 'block';
            
            // Trigger reflow to enable transition
            targetForm.offsetWidth;
            
            // Add visible class for fade-in effect
            targetForm.classList.add('visible');
            
            // Smooth scroll to the form
            targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Always show tables
    const tables = document.querySelectorAll('.table-container');
    tables.forEach(table => {
        table.style.display = 'block';
        table.classList.add('visible');
    });
}

// Fade in containers
function fadeInContainers() {
    const containers = document.querySelectorAll('.form-container, .table-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    containers.forEach(container => {
        observer.observe(container);
    });
}

// Initialize tabs on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get default tab from URL hash or show first tab
    const hash = window.location.hash || '#employees';
    const defaultTab = hash.substring(1) + 'Tab';
    const defaultButton = document.querySelector(`[data-tab="${defaultTab}"]`);
    
    if (defaultButton) {
        // Simulate click on the default tab
        defaultButton.click();
    } else {
        // Fallback to first tab if hash is invalid
        const firstTab = document.querySelector('.tablink');
        if (firstTab) firstTab.click();
    }

    // Add search functionality
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const table = e.target.closest('.tabcontent').querySelector('table tbody');
            const rows = table.getElementsByTagName('tr');

            for (let row of rows) {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            }
        });
    });

    // Fade in containers
    fadeInContainers();
});

// Enhanced form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
            
            // Remove error after a moment
            setTimeout(() => {
                field.classList.remove('error');
            }, 1000);
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Delete confirmation
function confirmDelete(event, itemType) {
    if (!confirm(`Are you sure you want to delete this ${itemType}? This action cannot be undone.`)) {
        event.preventDefault();
        return false;
    }
    return true;
}