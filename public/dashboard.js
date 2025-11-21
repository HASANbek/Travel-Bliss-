const API_BASE = 'http://localhost:4000';
let currentTourEditId = null;

// ========== PAGE INIT ==========
window.onload = () => {
    loadDashboard();
    checkHealth();
};

// ========== NAVIGATION ==========
function showSection(sectionName) {
    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Remove active from all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Add active to clicked nav item
    event.currentTarget.classList.add('active');

    // Show selected section
    document.getElementById(sectionName).classList.add('active');

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        users: 'Foydalanuvchilar',
        tours: 'Turlar',
        stats: 'Statistika'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName];

    // Load content
    if (sectionName === 'users') loadUsers();
    if (sectionName === 'tours') loadAllTours();
    if (sectionName === 'stats') loadDetailedStats();
}

// ========== DASHBOARD ==========
async function loadDashboard() {
    try {
        // Load users
        const usersRes = await fetch(`${API_BASE}/api/demo/users`);
        const usersData = await usersRes.json();
        document.getElementById('totalUsers').textContent = usersData.data?.count || 0;

        // Load tours
        const toursRes = await fetch(`${API_BASE}/api/tours`);
        const toursData = await toursRes.json();
        document.getElementById('totalTours').textContent = toursData.data?.count || 0;

        // Load featured tours
        const featuredRes = await fetch(`${API_BASE}/api/tours/featured`);
        const featuredData = await featuredRes.json();
        document.getElementById('featuredTours').textContent = featuredData.data?.count || 0;

        // Load stats
        const statsRes = await fetch(`${API_BASE}/api/tours/stats`);
        const statsData = await statsRes.json();
        const avgPrice = statsData.data?.avgPrice || 0;
        document.getElementById('avgPrice').textContent = formatPrice(avgPrice);

        updateStatus('Dashboard yuklandi');
    } catch (error) {
        console.error('Dashboard load error:', error);
        updateStatus('Xato!', 'error');
    }
}

async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE}/api/health`);
        const data = await response.json();

        if (data.success) {
            updateStatus('Server Ishlayapti ✅');
        }
    } catch (error) {
        updateStatus('Server Ishlamayapti ❌', 'error');
    }
}

// ========== USERS ==========
async function loadUsers() {
    const container = document.getElementById('usersContainer');
    container.innerHTML = '<div class="loading"><div class="spinner"></div>Yuklanmoqda...</div>';

    try {
        const response = await fetch(`${API_BASE}/api/demo/users`);
        const data = await response.json();

        if (data.success && data.data.users.length > 0) {
            displayUsers(data.data.users);
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👥</div>
                    <h3>Foydalanuvchilar yo'q</h3>
                    <p>Yangi foydalanuvchi qo'shish uchun yuqoridagi tugmani bosing</p>
                </div>
            `;
        }
    } catch (error) {
        container.innerHTML = `<div class="loading" style="color: red;">❌ Xato: ${error.message}</div>`;
    }
}

function displayUsers(users) {
    const container = document.getElementById('usersContainer');
    container.innerHTML = users.map(user => `
        <div class="card">
            <div class="card-header">
                <div class="card-title">${user.name}</div>
                <div class="card-subtitle">${user.role || 'user'}</div>
            </div>
            <div class="card-body">
                <div class="card-text">
                    📧 ${user.email}<br>
                    📱 ${user.phone}
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">
                        🗑️ O'chirish
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openUserModal() {
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userPhone').value = '';
    document.getElementById('userModal').style.display = 'flex';
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
}

async function saveUser(event) {
    event.preventDefault();

    const userData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value
    };

    try {
        const response = await fetch(`${API_BASE}/api/demo/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (data.success) {
            alert('User yaratildi!');
            closeUserModal();
            loadUsers();
            loadDashboard();
        } else {
            alert('Xato: ' + data.message);
        }
    } catch (error) {
        alert('Xato: ' + error.message);
    }
}

async function deleteUser(id) {
    if (!confirm('Userni o\'chirmoqchimisiz?')) return;

    try {
        const response = await fetch(`${API_BASE}/api/demo/users/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            alert('User o\'chirildi!');
            loadUsers();
            loadDashboard();
        } else {
            alert('Xato: ' + data.message);
        }
    } catch (error) {
        alert('Xato: ' + error.message);
    }
}

// ========== TOURS ==========
async function loadAllTours() {
    const container = document.getElementById('toursContainer');
    container.innerHTML = '<div class="loading"><div class="spinner"></div>Yuklanmoqda...</div>';

    try {
        const response = await fetch(`${API_BASE}/api/tours`);
        const data = await response.json();

        if (data.success && data.data.tours.length > 0) {
            displayTours(data.data.tours);
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🏖️</div>
                    <h3>Turlar yo'q</h3>
                    <p>Yangi tur qo'shish uchun yuqoridagi tugmani bosing</p>
                </div>
            `;
        }
    } catch (error) {
        container.innerHTML = `<div class="loading" style="color: red;">❌ Xato: ${error.message}</div>`;
    }
}

async function loadFeaturedTours() {
    const container = document.getElementById('toursContainer');
    container.innerHTML = '<div class="loading"><div class="spinner"></div>Yuklanmoqda...</div>';

    try {
        const response = await fetch(`${API_BASE}/api/tours/featured`);
        const data = await response.json();

        if (data.success && data.data.tours.length > 0) {
            displayTours(data.data.tours);
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⭐</div>
                    <h3>Featured turlar yo'q</h3>
                </div>
            `;
        }
    } catch (error) {
        container.innerHTML = `<div class="loading" style="color: red;">❌ Xato: ${error.message}</div>`;
    }
}

function displayTours(tours) {
    const container = document.getElementById('toursContainer');
    container.innerHTML = tours.map(tour => `
        <div class="card">
            <div class="card-header">
                ${tour.isFeatured ? '<span class="badge badge-warning">⭐ Featured</span><br>' : ''}
                <div class="card-title">${tour.title}</div>
                <div class="card-subtitle">📍 ${tour.destination}</div>
            </div>
            <div class="card-body">
                <div class="card-text">${tour.description.substring(0, 100)}...</div>

                <div class="info-grid">
                    <div class="info-item">⏱️ ${tour.duration} kun</div>
                    <div class="info-item">👥 ${tour.maxGroupSize} kishi</div>
                    <div class="info-item">⭐ ${tour.rating}</div>
                    <div class="info-item">
                        <span class="badge badge-${getDifficultyClass(tour.difficulty)}">
                            ${getDifficultyText(tour.difficulty)}
                        </span>
                    </div>
                </div>

                <div style="margin: 15px 0;">
                    <span class="badge badge-primary">${getCategoryText(tour.category)}</span>
                </div>

                <div class="price">${formatPrice(tour.price)} UZS</div>

                <div class="card-footer">
                    <button class="btn btn-info btn-sm" onclick="editTour('${tour.id}')">
                        ✏️ Tahrirlash
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTour('${tour.id}')">
                        🗑️ O'chirish
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openTourModal() {
    currentTourEditId = null;
    document.getElementById('tourModalTitle').textContent = 'Yangi Tur Yaratish';
    document.getElementById('tourTitle').value = '';
    document.getElementById('tourDescription').value = '';
    document.getElementById('tourDestination').value = '';
    document.getElementById('tourCategory').value = '';
    document.getElementById('tourPrice').value = '';
    document.getElementById('tourDuration').value = '';
    document.getElementById('tourMaxGroupSize').value = '';
    document.getElementById('tourDifficulty').value = '';
    document.getElementById('tourIncluded').value = '';
    document.getElementById('tourExcluded').value = '';
    document.getElementById('tourModal').style.display = 'flex';
}

function closeTourModal() {
    document.getElementById('tourModal').style.display = 'none';
}

async function saveTour(event) {
    event.preventDefault();

    const tourData = {
        title: document.getElementById('tourTitle').value,
        description: document.getElementById('tourDescription').value,
        destination: document.getElementById('tourDestination').value,
        category: document.getElementById('tourCategory').value,
        price: Number(document.getElementById('tourPrice').value),
        duration: Number(document.getElementById('tourDuration').value),
        maxGroupSize: Number(document.getElementById('tourMaxGroupSize').value),
        difficulty: document.getElementById('tourDifficulty').value,
        included: document.getElementById('tourIncluded').value.split(',').map(s => s.trim()).filter(Boolean),
        excluded: document.getElementById('tourExcluded').value.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
        const url = currentTourEditId
            ? `${API_BASE}/api/tours/${currentTourEditId}`
            : `${API_BASE}/api/tours`;

        const method = currentTourEditId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tourData)
        });

        const data = await response.json();

        if (data.success) {
            alert(currentTourEditId ? 'Tur yangilandi!' : 'Tur yaratildi!');
            closeTourModal();
            loadAllTours();
            loadDashboard();
        } else {
            alert('Xato: ' + data.message);
        }
    } catch (error) {
        alert('Xato: ' + error.message);
    }
}

async function editTour(id) {
    try {
        const response = await fetch(`${API_BASE}/api/tours/${id}`);
        const data = await response.json();

        if (data.success) {
            const tour = data.data.tour;
            currentTourEditId = id;

            document.getElementById('tourModalTitle').textContent = 'Turni Tahrirlash';
            document.getElementById('tourTitle').value = tour.title;
            document.getElementById('tourDescription').value = tour.description;
            document.getElementById('tourDestination').value = tour.destination;
            document.getElementById('tourCategory').value = tour.category;
            document.getElementById('tourPrice').value = tour.price;
            document.getElementById('tourDuration').value = tour.duration;
            document.getElementById('tourMaxGroupSize').value = tour.maxGroupSize;
            document.getElementById('tourDifficulty').value = tour.difficulty;
            document.getElementById('tourIncluded').value = tour.included?.join(', ') || '';
            document.getElementById('tourExcluded').value = tour.excluded?.join(', ') || '';

            document.getElementById('tourModal').style.display = 'flex';
        }
    } catch (error) {
        alert('Xato: ' + error.message);
    }
}

async function deleteTour(id) {
    if (!confirm('Turni o\'chirmoqchimisiz?')) return;

    try {
        const response = await fetch(`${API_BASE}/api/tours/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            alert('Tur o\'chirildi!');
            loadAllTours();
            loadDashboard();
        } else {
            alert('Xato: ' + data.message);
        }
    } catch (error) {
        alert('Xato: ' + error.message);
    }
}

// ========== STATS ==========
async function loadDetailedStats() {
    const container = document.getElementById('statsContainer');
    container.innerHTML = '<div class="loading"><div class="spinner"></div>Yuklanmoqda...</div>';

    try {
        const response = await fetch(`${API_BASE}/api/tours/stats`);
        const data = await response.json();

        if (data.success) {
            const stats = data.data;
            container.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon blue">🏖️</div>
                        <div class="stat-info">
                            <h3>${stats.totalTours || 0}</h3>
                            <p>Jami Turlar</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon green">💰</div>
                        <div class="stat-info">
                            <h3>${formatPrice(stats.avgPrice || 0)}</h3>
                            <p>O'rtacha Narx</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon orange">⭐</div>
                        <div class="stat-info">
                            <h3>${(stats.avgRating || 0).toFixed(1)}</h3>
                            <p>O'rtacha Rating</p>
                        </div>
                    </div>
                </div>

                <div class="content-card" style="margin-top: 20px;">
                    <h3 style="margin-bottom: 20px;">Kategoriyalar Bo'yicha</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon blue">🏛️</div>
                            <div class="stat-info">
                                <h3>${stats.categories?.cultural || 0}</h3>
                                <p>Madaniy Turlar</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon green">🎒</div>
                            <div class="stat-info">
                                <h3>${stats.categories?.adventure || 0}</h3>
                                <p>Sarguzasht Turlar</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon orange">🌿</div>
                            <div class="stat-info">
                                <h3>${stats.categories?.nature || 0}</h3>
                                <p>Tabiat Turlar</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        container.innerHTML = `<div class="loading" style="color: red;">❌ Xato: ${error.message}</div>`;
    }
}

// ========== UTILITIES ==========
function updateStatus(message, type = 'success') {
    const statusEl = document.getElementById('serverStatus');
    statusEl.textContent = message;
    statusEl.style.background = type === 'error' ? '#ef4444' : '#10b981';
}

function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(Math.round(price));
}

function getDifficultyText(difficulty) {
    const map = {
        'easy': 'Oson',
        'medium': 'O\'rtacha',
        'hard': 'Qiyin'
    };
    return map[difficulty] || difficulty;
}

function getDifficultyClass(difficulty) {
    const map = {
        'easy': 'success',
        'medium': 'warning',
        'hard': 'danger'
    };
    return map[difficulty] || 'primary';
}

function getCategoryText(category) {
    const map = {
        'cultural': 'Madaniy',
        'adventure': 'Sarguzasht',
        'nature': 'Tabiat',
        'city': 'Shahar',
        'beach': 'Plyaj',
        'mountain': 'Tog\''
    };
    return map[category] || category;
}
