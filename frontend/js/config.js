// API Configuration - can be overridden by environment
// For production, set this via a config file or build process
const API_CONFIG = {
    // Auto-detect API URL based on current hostname
    baseURL: (function() {
        // If running on same domain, use relative URL
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:5000';
        }
        // For production, use same protocol and hostname with API port/subdomain
        // Adjust this based on your deployment setup
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        // Option 1: Same domain, different port (if frontend and backend on same server)
        // return `${protocol}//${hostname}:5000`;
        // Option 2: API subdomain
        // return `${protocol}//api.${hostname}`;
        // Option 3: Same domain, /api path (if using reverse proxy)
        return `${protocol}//${hostname}/api`;
    })()
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}

