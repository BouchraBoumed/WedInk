// DOM elements
const form = document.getElementById('invitationForm');
const previewBtn = document.getElementById('previewBtn');
const resetBtn = document.getElementById('resetBtn');
const printBtn = document.getElementById('printBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Navigation elements
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const loginBtn = document.getElementById('loginBtn');
const userMenu = document.getElementById('userMenu');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');

// Page elements
const pages = document.querySelectorAll('.page');

// Preview elements
const previewTitle = document.getElementById('previewTitle');
const previewHosts = document.getElementById('previewHosts');
const previewDate = document.getElementById('previewDate');
const previewTime = document.getElementById('previewTime');
const previewVenue = document.getElementById('previewVenue');
const previewAddress = document.getElementById('previewAddress');
const previewMessage = document.getElementById('previewMessage');
const previewRSVP = document.getElementById('previewRSVP');
const previewAdditional = document.getElementById('previewAdditional');

// Form elements
const invitationType = document.getElementById('invitationType');
const eventTitle = document.getElementById('eventTitle');
const hostNames = document.getElementById('hostNames');
const eventDate = document.getElementById('eventDate');
const eventTime = document.getElementById('eventTime');
const venue = document.getElementById('venue');
const address = document.getElementById('address');
const rsvpInfo = document.getElementById('rsvpInfo');
const additionalInfo = document.getElementById('additionalInfo');
const specialMessage = document.getElementById('specialMessage');

// Auth elements
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authSwitchText = document.getElementById('authSwitchText');
const authSwitchLink = document.getElementById('authSwitchLink');
const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
const nameGroup = document.getElementById('nameGroup');

// Print locations elements
const locationSearch = document.getElementById('locationSearch');
const searchBtn = document.getElementById('searchBtn');
const printLocationsList = document.getElementById('printLocationsList');

// Templates elements
const templatesGrid = document.getElementById('templatesGrid');
const templateFilters = document.querySelectorAll('.filter-btn');

// Global state
let currentPage = 'creator';
let isLoggedIn = false;
let currentUser = null;
let isSignUpMode = false;
let map = null;

// Event type templates
const eventTemplates = {
    wedding: {
        title: 'Wedding Celebration',
        defaultMessage: 'Together with our families, we invite you to celebrate our wedding',
        placeholder: 'Sarah & Michael'
    },
    birthday: {
        title: 'Birthday Celebration',
        defaultMessage: 'Join us for a special birthday celebration',
        placeholder: 'Birthday Star'
    },
    anniversary: {
        title: 'Anniversary Celebration',
        defaultMessage: 'Celebrate with us as we commemorate our special day',
        placeholder: 'Happy Couple'
    },
    'baby-shower': {
        title: 'Baby Shower',
        defaultMessage: 'Please join us for a baby shower celebration',
        placeholder: 'Expecting Parents'
    },
    graduation: {
        title: 'Graduation Celebration',
        defaultMessage: 'Join us in celebrating this milestone achievement',
        placeholder: 'Graduate Name'
    },
    engagement: {
        title: 'Engagement Party',
        defaultMessage: 'We\'re engaged! Come celebrate with us',
        placeholder: 'Engaged Couple'
    },
    other: {
        title: 'Special Event',
        defaultMessage: 'You are cordially invited to join us',
        placeholder: 'Host Name(s)'
    }
};

// Sample print locations data
const printLocations = [
    {
        name: "FedEx Office Print & Ship Center",
        address: "123 Main Street, Downtown",
        services: ["Color Printing", "Premium Paper", "24 Hour"],
        lat: 40.7128,
        lng: -74.0060,
        phone: "(555) 123-4567"
    },
    {
        name: "Staples Print & Marketing",
        address: "456 Oak Avenue, Midtown",
        services: ["Color Printing", "Premium Paper"],
        lat: 40.7589,
        lng: -73.9851,
        phone: "(555) 234-5678"
    },
    {
        name: "UPS Store",
        address: "789 Pine Street, Uptown",
        services: ["Color Printing", "24 Hour"],
        lat: 40.7831,
        lng: -73.9712,
        phone: "(555) 345-6789"
    },
    {
        name: "Office Depot OfficeMax",
        address: "321 Elm Street, Westside",
        services: ["Color Printing", "Premium Paper"],
        lat: 40.7505,
        lng: -74.0087,
        phone: "(555) 456-7890"
    }
];

// Sample templates data
const templates = [
    {
        id: 1,
        title: "Classic Elegance",
        category: "wedding",
        description: "Timeless design with gold accents and elegant typography",
        preview: "Classic Wedding\nInvitation"
    },
    {
        id: 2,
        title: "Modern Minimalist",
        category: "wedding",
        description: "Clean lines and contemporary styling for modern couples",
        preview: "Modern Wedding\nDesign"
    },
    {
        id: 3,
        title: "Vintage Romance",
        category: "wedding",
        description: "Romantic vintage-inspired design with floral elements",
        preview: "Vintage Romance\nWedding"
    },
    {
        id: 4,
        title: "Birthday Celebration",
        category: "birthday",
        description: "Fun and colorful design perfect for birthday parties",
        preview: "Birthday Party\nInvitation"
    },
    {
        id: 5,
        title: "Anniversary Milestone",
        category: "anniversary",
        description: "Sophisticated design for anniversary celebrations",
        preview: "Anniversary\nCelebration"
    },
    {
        id: 6,
        title: "Baby Shower Bliss",
        category: "baby-shower",
        description: "Sweet and gentle design for baby shower events",
        preview: "Baby Shower\nInvitation"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check login status
    checkLoginStatus();
    
    // Set default values for creator
    setDefaultValues();
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize pages
    initializePages();
    
    // Show default page
    showPage('creator');
    
    // Initial preview update
    if (form) {
        updatePreview();
    }
}

function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showPage(page);
        });
    });

    // Hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Auth buttons
    if (loginBtn) {
        loginBtn.addEventListener('click', () => showPage('login'));
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Creator page events
    if (previewBtn) previewBtn.addEventListener('click', updatePreview);
    if (resetBtn) resetBtn.addEventListener('click', resetForm);
    if (printBtn) printBtn.addEventListener('click', printInvitation);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadInvitation);
    
    if (form) {
        form.addEventListener('input', updatePreview);
        form.addEventListener('submit', (e) => e.preventDefault());
    }
    
    if (invitationType) {
        invitationType.addEventListener('change', handleTypeChange);
    }

    // Auth form events
    if (authForm) {
        authForm.addEventListener('submit', handleAuth);
    }
    
    if (authSwitchLink) {
        authSwitchLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAuthMode();
        });
    }

    // Print locations events
    if (searchBtn) {
        searchBtn.addEventListener('click', searchPrintLocations);
    }
    
    if (locationSearch) {
        locationSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchPrintLocations();
            }
        });
    }

    // Template filters
    templateFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            templateFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterTemplates(btn.getAttribute('data-category'));
        });
    });

    // Social auth buttons (placeholder)
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Social login will be implemented in the future!', 'info');
        });
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;

        // Update navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        // Close mobile menu
        if (navMenu) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Initialize page-specific functionality
        initializePage(pageId);
    }
}

function initializePage(pageId) {
    switch (pageId) {
        case 'print-locations':
            initializeMap();
            loadPrintLocations();
            break;
        case 'templates':
            loadTemplates();
            break;
        case 'login':
            // Reset auth form
            if (authForm) authForm.reset();
            break;
    }
}

function initializePages() {
    // Load templates
    loadTemplates();
    
    // Load print locations
    loadPrintLocations();
}

// Authentication functions
function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateAuthUI();
    }
}

function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const name = document.getElementById('authName').value;
    const confirmPassword = document.getElementById('authConfirmPassword').value;

    if (isSignUpMode) {
        // Sign up
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters long!', 'error');
            return;
        }

        // Simulate user creation
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            createdAt: new Date().toISOString()
        };

        // Save user data
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            showNotification('User with this email already exists!', 'error');
            return;
        }
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        currentUser = newUser;
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showNotification('Account created successfully!', 'success');
        updateAuthUI();
        showPage('creator');
        
    } else {
        // Sign in
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email);
        
        if (user) {
            currentUser = user;
            isLoggedIn = true;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            showNotification('Welcome back!', 'success');
            updateAuthUI();
            showPage('creator');
        } else {
            showNotification('Invalid email or password!', 'error');
        }
    }
}

function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    
    if (isSignUpMode) {
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Sign up for a new account';
        authSubmitBtn.textContent = 'Sign Up';
        authSwitchText.innerHTML = 'Already have an account? <a href="#" id="authSwitchLink">Sign in</a>';
        confirmPasswordGroup.style.display = 'block';
        nameGroup.style.display = 'block';
    } else {
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Sign in to your account';
        authSubmitBtn.textContent = 'Sign In';
        authSwitchText.innerHTML = 'Don\'t have an account? <a href="#" id="authSwitchLink">Sign up</a>';
        confirmPasswordGroup.style.display = 'none';
        nameGroup.style.display = 'none';
    }
    
    // Re-attach event listener
    const newSwitchLink = document.getElementById('authSwitchLink');
    if (newSwitchLink) {
        newSwitchLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAuthMode();
        });
    }
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Logged out successfully!', 'success');
    showPage('creator');
}

function updateAuthUI() {
    if (isLoggedIn && currentUser) {
        loginBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        userName.textContent = `Welcome, ${currentUser.name}!`;
    } else {
        loginBtn.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

// Print locations functions
function initializeMap() {
    if (map) return; // Map already initialized
    
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    try {
        map = L.map('map').setView([40.7128, -74.0060], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add markers for print locations
        printLocations.forEach(location => {
            const marker = L.marker([location.lat, location.lng]).addTo(map);
            marker.bindPopup(`
                <strong>${location.name}</strong><br>
                ${location.address}<br>
                ${location.phone}<br>
                Services: ${location.services.join(', ')}
            `);
        });
        
    } catch (error) {
        console.error('Error initializing map:', error);
        mapElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">Map loading...</div>';
    }
}

function loadPrintLocations() {
    if (!printLocationsList) return;
    
    printLocationsList.innerHTML = '';
    
    printLocations.forEach(location => {
        const locationElement = document.createElement('div');
        locationElement.className = 'location-item';
        locationElement.innerHTML = `
            <div class="location-name">${location.name}</div>
            <div class="location-address">${location.address}</div>
            <div class="location-phone" style="color: var(--cream-light); margin-bottom: 10px;">${location.phone}</div>
            <div class="location-services">
                ${location.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
            </div>
        `;
        
        locationElement.addEventListener('click', () => {
            if (map) {
                map.setView([location.lat, location.lng], 15);
            }
        });
        
        printLocationsList.appendChild(locationElement);
    });
}

function searchPrintLocations() {
    const query = locationSearch.value.toLowerCase();
    if (!query) {
        loadPrintLocations();
        return;
    }
    
    const filteredLocations = printLocations.filter(location => 
        location.name.toLowerCase().includes(query) ||
        location.address.toLowerCase().includes(query)
    );
    
    printLocationsList.innerHTML = '';
    
    if (filteredLocations.length === 0) {
        printLocationsList.innerHTML = '<div style="text-align: center; color: var(--cream-light); padding: 20px;">No locations found matching your search.</div>';
        return;
    }
    
    filteredLocations.forEach(location => {
        const locationElement = document.createElement('div');
        locationElement.className = 'location-item';
        locationElement.innerHTML = `
            <div class="location-name">${location.name}</div>
            <div class="location-address">${location.address}</div>
            <div class="location-phone" style="color: var(--cream-light); margin-bottom: 10px;">${location.phone}</div>
            <div class="location-services">
                ${location.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
            </div>
        `;
        
        locationElement.addEventListener('click', () => {
            if (map) {
                map.setView([location.lat, location.lng], 15);
            }
        });
        
        printLocationsList.appendChild(locationElement);
    });
}

// Templates functions
function loadTemplates() {
    if (!templatesGrid) return;
    
    templatesGrid.innerHTML = '';
    
    templates.forEach(template => {
        const templateElement = document.createElement('div');
        templateElement.className = 'template-card';
        templateElement.setAttribute('data-category', template.category);
        templateElement.innerHTML = `
            <div class="template-preview">
                ${template.preview}
            </div>
            <div class="template-info">
                <div class="template-title">${template.title}</div>
                <div class="template-description">${template.description}</div>
                <div class="template-category">${template.category.replace('-', ' ')}</div>
            </div>
        `;
        
        templateElement.addEventListener('click', () => {
            showNotification('Template selected! Redirecting to creator...', 'success');
            setTimeout(() => {
                showPage('creator');
                // Apply template settings here
                applyTemplate(template);
            }, 1000);
        });
        
        templatesGrid.appendChild(templateElement);
    });
}

function filterTemplates(category) {
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function applyTemplate(template) {
    if (invitationType) {
        invitationType.value = template.category;
        handleTypeChange();
    }
    
    showNotification(`${template.title} template applied!`, 'success');
}

// Creator page functions (existing functionality)
function setDefaultValues() {
    if (!eventDate || !eventTime) return;
    
    const today = new Date();
    const futureDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    eventDate.value = futureDate.toISOString().split('T')[0];
    eventTime.value = '18:00';
    
    if (eventTitle) eventTitle.value = eventTemplates.wedding.title;
    if (hostNames) hostNames.placeholder = eventTemplates.wedding.placeholder;
    if (specialMessage) specialMessage.value = eventTemplates.wedding.defaultMessage;
}

function handleTypeChange() {
    if (!invitationType) return;
    
    const selectedType = invitationType.value;
    const template = eventTemplates[selectedType];
    
    if (template) {
        if (eventTitle) eventTitle.value = template.title;
        if (hostNames) hostNames.placeholder = template.placeholder;
        if (specialMessage && (!specialMessage.value || Object.values(eventTemplates).some(t => t.defaultMessage === specialMessage.value))) {
            specialMessage.value = template.defaultMessage;
        }
    }
    
    updatePreview();
}

function updatePreview() {
    if (!previewTitle || !invitationType) return;
    
    const titleText = eventTitle?.value || eventTemplates[invitationType.value].title;
    previewTitle.textContent = titleText;
    
    const hostsText = hostNames?.value || hostNames?.placeholder || 'Host Names';
    if (previewHosts) previewHosts.textContent = hostsText;
    
    if (eventDate?.value && previewDate) {
        const date = new Date(eventDate.value);
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        previewDate.textContent = date.toLocaleDateString('en-US', options);
    } else if (previewDate) {
        previewDate.textContent = 'Date to be announced';
    }
    
    if (eventTime?.value && previewTime) {
        const time = new Date(`2000-01-01T${eventTime.value}`);
        const timeOptions = { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        };
        previewTime.textContent = time.toLocaleTimeString('en-US', timeOptions);
    } else if (previewTime) {
        previewTime.textContent = 'Time to be announced';
    }
    
    if (previewVenue) previewVenue.textContent = venue?.value || 'Venue to be announced';
    if (previewAddress) previewAddress.textContent = address?.value || 'Address details to follow';
    
    const messageText = specialMessage?.value || eventTemplates[invitationType.value].defaultMessage;
    if (previewMessage) {
        previewMessage.textContent = messageText;
        previewMessage.style.display = messageText ? 'block' : 'none';
    }
    
    if (previewRSVP) {
        previewRSVP.textContent = rsvpInfo?.value || '';
        previewRSVP.style.display = rsvpInfo?.value ? 'block' : 'none';
    }
    
    if (previewAdditional) {
        previewAdditional.textContent = additionalInfo?.value || '';
        previewAdditional.style.display = additionalInfo?.value ? 'block' : 'none';
    }
    
    const invitationCard = document.getElementById('invitationPreview');
    if (invitationCard) {
        invitationCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            invitationCard.style.transform = 'scale(1)';
        }, 100);
    }
}

function resetForm() {
    if (!form) return;
    
    if (confirm('Are you sure you want to reset all fields? This will clear all your current information.')) {
        form.reset();
        setDefaultValues();
        updatePreview();
        showNotification('Form has been reset successfully!', 'success');
    }
}

function printInvitation() {
    if (!hostNames?.value && !eventDate?.value) {
        showNotification('Please fill in at least the host names and event date before printing.', 'error');
        return;
    }
    
    const formContainer = document.querySelector('.form-container');
    const actionButtons = document.querySelector('.action-buttons');
    
    if (formContainer) formContainer.style.display = 'none';
    if (actionButtons) actionButtons.style.display = 'none';
    
    window.print();
    
    setTimeout(() => {
        if (formContainer) formContainer.style.display = 'block';
        if (actionButtons) actionButtons.style.display = 'flex';
    }, 1000);
    
    showNotification('Invitation sent to printer!', 'success');
}

function downloadInvitation() {
    if (!hostNames?.value && !eventDate?.value) {
        showNotification('Please fill in at least the host names and event date before downloading.', 'error');
        return;
    }
    
    const invitationCard = document.querySelector('.invitation-card');
    if (!invitationCard) return;
    
    if (window.html2canvas) {
        html2canvas(invitationCard, {
            backgroundColor: '#f5f5dc',
            scale: 2,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `invitation-${hostNames.value.replace(/\s+/g, '-').toLowerCase()}-${eventDate.value}.png`;
            link.href = canvas.toDataURL('image/png');
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification('Invitation downloaded successfully!', 'success');
        }).catch(error => {
            console.error('Error generating image:', error);
            showNotification('Download feature requires additional setup. Please use the print option for now.', 'info');
        });
    } else {
        showNotification('Download feature is loading. Please try again in a moment or use the print option.', 'info');
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        font-family: 'Playfair Display', serif;
        font-weight: 500;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Auto-save functionality
function autoSave() {
    if (!form) return;
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('invitationData', JSON.stringify(data));
}

function loadSavedData() {
    const savedData = localStorage.getItem('invitationData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = data[key];
            }
        });
        
        updatePreview();
        showNotification('Previous invitation data loaded!', 'info');
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add auto-save on input
if (form) {
    form.addEventListener('input', debounce(autoSave, 1000));
}

// Load saved data on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (localStorage.getItem('invitationData') && !isLoggedIn) {
            if (confirm('Would you like to load your previously saved invitation data?')) {
                loadSavedData();
            }
        }
    }, 2000);
});

// Add HTML2Canvas script
function addHtml2CanvasScript() {
    if (!window.html2canvas) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = function() {
            console.log('html2canvas loaded successfully');
        };
        script.onerror = function() {
            console.log('Failed to load html2canvas');
        };
        document.head.appendChild(script);
    }
}

// Load html2canvas on page load
document.addEventListener('DOMContentLoaded', addHtml2CanvasScript);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (currentPage === 'creator') {
            updatePreview();
            showNotification('Preview updated!', 'success');
        }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        if (currentPage === 'creator') {
            printInvitation();
        }
    }
});