// Gofly Website - Backend API Integration
const API_BASE = 'http://localhost:4000';

// Load tours from backend
async function loadToursFromBackend() {
    try {
        const response = await fetch(`${API_BASE}/api/tours`);
        const data = await response.json();

        if (data.success && data.data.tours.length > 0) {
            displayTours(data.data.tours);
        } else {
            console.log('No tours found');
        }
    } catch (error) {
        console.error('Error loading tours:', error);
    }
}

// Helper function to get correct image path
function getImagePath(image) {
    if (!image) {
        return 'assets/img/home1/tour-package-img1.jpg'; // Default image
    }

    // If image starts with /uploads, it's an uploaded image - use it directly
    if (image.startsWith('/uploads/')) {
        return image;
    }

    // If image starts with http:// or https://, it's an external URL
    if (image.startsWith('http://') || image.startsWith('https://')) {
        return image;
    }

    // Otherwise, it's a legacy local asset
    return `assets/img/home1/${image}`;
}

// Display tours in package cards
function displayTours(tours) {
    const container = document.getElementById('tours-container');
    if (!container) return;

    container.innerHTML = tours.map(tour => `
        <div class="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div class="package-card">
                <div class="package-img-wrap">
                    <a href="tour-details.html?id=${tour.id}" class="package-img">
                        <img src="${getImagePath(tour.imageCover || tour.image)}" alt="${tour.title}" onerror="this.src='assets/img/home1/tour-package-img1.jpg'">
                    </a>
                    ${tour.hotSale ? '<div class="batch"><span>Hot Sale!</span></div>' : ''}
                </div>
                <div class="package-content">
                    <h5><a href="tour-details.html?id=${tour.id}">${tour.title}</a></h5>
                    <div class="location-and-time">
                        <div class="location">
                            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.83615 0C3.77766 0 1.28891 2.48879 1.28891 5.54892C1.28891 7.93837 4.6241 11.8351 6.05811 13.3994C6.25669 13.6175 6.54154 13.7411 6.83615 13.7411C7.13076 13.7411 7.41561 13.6175 7.6142 13.3994C9.04821 11.8351 12.3834 7.93833 12.3834 5.54892C12.3834 2.48879 9.89464 0 6.83615 0ZM7.31469 13.1243C7.18936 13.2594 7.02008 13.3342 6.83615 13.3342C6.65222 13.3342 6.48295 13.2594 6.35761 13.1243C4.95614 11.5959 1.69584 7.79515 1.69584 5.54896C1.69584 2.7134 4.00067 0.406933 6.83615 0.406933C9.67164 0.406933 11.9765 2.7134 11.9765 5.54896C11.9765 7.79515 8.71617 11.5959 7.31469 13.1243Z"/>
                                <path d="M6.83618 8.54554C8.4624 8.54554 9.7807 7.22723 9.7807 5.60102C9.7807 3.9748 8.4624 2.65649 6.83618 2.65649C5.20997 2.65649 3.89166 3.9748 3.89166 5.60102C3.89166 7.22723 5.20997 8.54554 6.83618 8.54554Z"/>
                            </svg>
                            <a href="tour-details.html?id=${tour.id}">${tour.destination}</a>
                        </div>
                        <svg class="arrow" width="25" height="6" viewBox="0 0 25 6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 3L5 5.88675V0.113249L0 3ZM25 3L20 0.113249V5.88675L25 3ZM4.5 3.5H20.5V2.5H4.5V3.5Z"/>
                        </svg>
                        <span>${tour.duration} ${tour.duration > 1 ? 'Days' : 'Day'}</span>
                    </div>
                    <div class="btn-and-price-area">
                        <a href="tour-details.html?id=${tour.id}" class="primary-btn1">
                            <span>
                                Book Now
                                <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"/>
                                </svg>
                            </span>
                        </a>
                        <div class="price-area">
                            <h6>Per Person</h6>
                            <span>$${tour.price}</span>
                        </div>
                    </div>
                    <svg class="divider" height="6" viewBox="0 0 374 6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM369 3.5L374 5.88675V0.113249L369 2.5V3.5ZM4.5 3.5H369.5V2.5H4.5V3.5Z"/>
                    </svg>
                    <div class="bottom-area">
                        <ul>
                            <li>
                                <span class="badge">${getCategoryText(tour.category)}</span>
                            </li>
                            <li>
                                <span class="badge">${getDifficultyText(tour.difficulty)}</span>
                            </li>
                            <li>
                                <span>👥 ${tour.maxGroupSize} people</span>
                            </li>
                            <li>
                                <span>⭐ ${tour.rating}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryText(category) {
    const map = {
        'cultural': 'Cultural',
        'adventure': 'Adventure',
        'nature': 'Nature',
        'city': 'City Tour',
        'beach': 'Beach',
        'mountain': 'Mountain'
    };
    return map[category] || category;
}

function getDifficultyText(difficulty) {
    const map = {
        'easy': 'Easy',
        'medium': 'Medium',
        'hard': 'Hard'
    };
    return map[difficulty] || difficulty;
}

// Load tours with category filter
async function loadToursWithCategory(categorySlug) {
    try {
        // Map category slugs to backend category values
        const categoryMap = {
            'cultural-tours': 'cultural',
            'adventure-tours': 'adventure',
            'homestays-hiking': 'hiking',
            'day-trips': 'day-trip'
        };

        const category = categoryMap[categorySlug];
        if (!category) {
            console.error('Unknown category:', categorySlug);
            return;
        }

        const response = await fetch(`${API_BASE}/api/tours?category=${category}`);
        const data = await response.json();

        if (data.success && data.data.tours.length > 0) {
            displayTours(data.data.tours);
        } else {
            const container = document.getElementById('tours-container');
            if (container) {
                container.innerHTML = `
                    <div class="col-12">
                        <div class="text-center py-5">
                            <h3>No tours found in this category</h3>
                            <p>Please check back later or try another category.</p>
                        </div>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading tours by category:', error);
    }
}

// Make function globally accessible
window.loadToursWithCategory = loadToursWithCategory;

// Auto-load on page load
document.addEventListener('DOMContentLoaded', () => {
    loadToursFromBackend();
});
