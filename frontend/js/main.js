// API Configuration - loads from config.js
// Fallback to localhost for development
const API_BASE_URL = '';

// Utility function to show flash messages
function showFlashMessage(message, type = 'success') {
    const flashContainer = document.getElementById('flash-messages');
    if (!flashContainer) return;
    
    flashContainer.style.display = 'block';
    const flashDiv = document.createElement('div');
    flashDiv.className = `flash ${type}`;
    flashDiv.textContent = message;
    flashContainer.appendChild(flashDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        flashDiv.remove();
        if (flashContainer.children.length === 0) {
            flashContainer.style.display = 'none';
        }
    }, 5000);
}

// Fetch and display contact information
async function loadContactInfo() {
    const contactInfoContainer = document.getElementById('contactInfo');
    if (!contactInfoContainer) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/contact/info`);
        const result = await response.json();
        
        if (response.ok && result.success && result.data) {
            const data = result.data;
            
            // Update contact information
            const companyEl = document.getElementById('contactCompany');
            const phoneEl = document.getElementById('contactPhone');
            const emailEl = document.getElementById('contactEmail');
            const addressEl = document.getElementById('contactAddress');
            const websiteEl = document.getElementById('contactWebsite');
            
            if (companyEl) companyEl.textContent = data.company;
            if (phoneEl) {
                phoneEl.textContent = data.phone;
                phoneEl.href = `tel:${data.phone.replace(/\s/g, '')}`;
            }
            if (emailEl) {
                emailEl.textContent = data.email;
                emailEl.href = `mailto:${data.email}`;
            }
            if (addressEl) addressEl.textContent = data.address;
            if (websiteEl) {
                const websiteUrl = data.website.startsWith('http') ? data.website : `https://${data.website}`;
                websiteEl.href = websiteUrl;
                websiteEl.textContent = data.website;
            }
            
            // Update social media links
            const socialLinksContainer = document.getElementById('socialLinks');
            if (socialLinksContainer && data.social_media) {
                socialLinksContainer.innerHTML = '';
                
                const socialPlatforms = [
                    { key: 'facebook', name: 'Facebook', icon: 'FB' },
                    { key: 'twitter', name: 'Twitter', icon: 'TW' },
                    { key: 'linkedin', name: 'LinkedIn', icon: 'LI' },
                    { key: 'instagram', name: 'Instagram', icon: 'IG' }
                ];
                
                socialPlatforms.forEach(platform => {
                    const url = data.social_media[platform.key];
                    if (url && url.trim()) {
                        const link = document.createElement('a');
                        link.href = url.startsWith('http') ? url : `https://${url}`;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.className = 'social-link';
                        link.setAttribute('aria-label', `Visit our ${platform.name} page`);
                        link.textContent = platform.icon;
                        socialLinksContainer.appendChild(link);
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error loading contact info:', error);
        // Contact info will display default values from HTML
    }
}

// Contact form submission handler
document.addEventListener('DOMContentLoaded', () => {
    // Load contact information
    loadContactInfo();
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                company: document.getElementById('company').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Basic client-side validation
            if (!formData.name || formData.name.length < 2) {
                showFlashMessage('Name must be at least 2 characters', 'danger');
                return;
            }
            
            if (!formData.email || !formData.email.includes('@')) {
                showFlashMessage('Please enter a valid email address', 'danger');
                return;
            }
            
            if (!formData.message || formData.message.length < 10) {
                showFlashMessage('Message must be at least 10 characters', 'danger');
                return;
            }
            
            // Disable submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                const response = await fetch(`${API_BASE_URL}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    showFlashMessage(result.message || 'Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    showFlashMessage(result.message || 'Failed to send message. Please try again.', 'danger');
                }
            } catch (error) {
                console.error('Error:', error);
                showFlashMessage('Network error. Please check your connection and try again.', 'danger');
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
    
    // Accessibility enhancement: add focus class on keyboard navigation
    let isTabbing = false;
    
    const handleKeydown = (e) => {
        if (e.key === 'Tab' && !isTabbing) {
            document.body.classList.add('is-tabbing');
            isTabbing = true;
        }
    };
    
    const handleMousedown = () => {
        if (isTabbing) {
            document.body.classList.remove('is-tabbing');
            isTabbing = false;
        }
    };
    
    window.addEventListener('keydown', handleKeydown, { passive: true });
    window.addEventListener('mousedown', handleMousedown, { passive: true });
    
    // Smooth scroll for anchor links (if needed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

