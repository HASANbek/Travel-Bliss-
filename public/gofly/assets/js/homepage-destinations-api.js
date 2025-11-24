// API Configuration - use existing API_BASE if available
if (typeof API_BASE === 'undefined') {
    var API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:4000'
        : '';
}

// Country code to flag emoji mapping
const countryFlags = {
    'Uzbekistan': '🇺🇿',
    'Tajikistan': '🇹🇯',
    'Kazakhstan': '🇰🇿',
    'Kyrgyzstan': '🇰🇬',
    'Turkmenistan': '🇹🇲',
    'Afghanistan': '🇦🇫',
    'Pakistan': '🇵🇰',
    'Iran': '🇮🇷',
    'Turkey': '🇹🇷',
    'Azerbaijan': '🇦🇿'
};

// Function to get country code abbreviation
function getCountryCode(country) {
    const codes = {
        'Uzbekistan': 'UZ',
        'Tajikistan': 'TJ',
        'Kazakhstan': 'KZ',
        'Kyrgyzstan': 'KG',
        'Turkmenistan': 'TM'
    };
    return codes[country] || country.substring(0, 2).toUpperCase();
}

// Load and render homepage destinations
async function loadHomepageDestinations() {
    try {
        const response = await fetch(`${API_BASE}/api/destinations?homepage=true&isActive=true`);
        const result = await response.json();

        if (result.success && result.data && result.data.destinations) {
            const destinations = result.data.destinations;
            const container = document.querySelector('.explore-destinations-slider .swiper-wrapper');

            if (!container) {
                console.error('Destinations container not found');
                return;
            }

            // Clear existing static content
            container.innerHTML = '';

            // If no destinations found, show message
            if (destinations.length === 0) {
                container.innerHTML = '<div class="swiper-slide"><p style="text-align: center; padding: 40px;">No destinations available at the moment.</p></div>';
                return;
            }

            // Generate destination cards
            destinations.forEach(function(dest) {
                const flag = countryFlags[dest.country] || '🌍';
                const countryCode = getCountryCode(dest.country);
                const image = dest.coverImage || dest.heroImage || 'assets/img/home2/destination-img1.jpg';
                const description = dest.shortDesc || dest.description || '';
                const tripCount = dest.tripCount || Math.floor(Math.random() * 15) + 3;

                const slideHTML = `
                    <div class="swiper-slide">
                        <div class="destination-card-overlay">
                            <div class="destination-flag">${flag}</div>
                            <div class="destination-trips-badge">${tripCount} Trips</div>
                            <img src="${image}" alt="${dest.name}" onerror="this.src='assets/img/home2/destination-img1.jpg'">
                            <div class="destination-overlay"></div>
                            <div class="destination-card-content">
                                <h3>${dest.name}</h3>
                                <p>${description.substring(0, 150)}${description.length > 150 ? '...' : ''}</p>
                                <a href="destination-details.html?id=${dest._id}" class="destination-link">
                                    See destination
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                `;

                container.innerHTML += slideHTML;
            });

            console.log(`✅ Loaded ${destinations.length} destinations from API`);

            // Reinitialize or update Swiper if it exists
            if (window.destinationsSwiper) {
                window.destinationsSwiper.update();
                console.log('✅ Swiper updated');
            }
        } else {
            console.error('Failed to load destinations:', result.message);
        }
    } catch (error) {
        console.error('Error loading homepage destinations:', error);
        // Keep static content as fallback
    }
}

// Auto-load destinations when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHomepageDestinations);
} else {
    loadHomepageDestinations();
}
