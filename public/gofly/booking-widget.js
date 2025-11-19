// Global booking state
let bookingState = {
    tourId: null,
    tourName: '',
    date: '',
    adults: 1,
    children: 0,
    pricePerPerson: 0,
    totalPrice: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    pickupLocation: '',
    specialRequests: ''
};

// Create and inject booking modal HTML into the page
(function() {
    const modalHTML = `
    <!-- Booking Modal -->
    <div id="bookingModal" class="booking-modal" style="display: none;">
        <div class="booking-modal-overlay"></div>
        <div class="booking-modal-content">
            <button class="booking-modal-close" onclick="closeBookingModal()">&times;</button>

            <div class="booking-modal-header">
                <h2>Complete Your Booking</h2>
                <p id="bookingTourName"></p>
            </div>

            <div class="booking-modal-body">
                <!-- Step Indicator -->
                <div class="booking-steps">
                    <div class="booking-step active" data-step="1">
                        <div class="step-number">1</div>
                        <div class="step-label">Details</div>
                    </div>
                    <div class="booking-step-line"></div>
                    <div class="booking-step" data-step="2">
                        <div class="step-number">2</div>
                        <div class="step-label">Review</div>
                    </div>
                    <div class="booking-step-line"></div>
                    <div class="booking-step" data-step="3">
                        <div class="step-number">3</div>
                        <div class="step-label">Confirm</div>
                    </div>
                </div>

                <!-- Step 1: Customer Details -->
                <div id="bookingStep1" class="booking-step-content active">
                    <form id="bookingDetailsForm">
                        <div class="booking-summary">
                            <h3>Booking Summary</h3>
                            <div class="summary-item">
                                <span>Date:</span>
                                <strong id="summaryDate"></strong>
                            </div>
                            <div class="summary-item">
                                <span>Adults:</span>
                                <strong id="summaryAdults"></strong>
                            </div>
                            <div class="summary-item">
                                <span>Children:</span>
                                <strong id="summaryChildren"></strong>
                            </div>
                            <div class="summary-item price-item">
                                <span>Total Price:</span>
                                <strong id="summaryPrice">$0</strong>
                            </div>
                        </div>

                        <h3>Contact Information</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name <span class="required">*</span></label>
                                <input type="text" id="customerName" placeholder="John Doe" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Email <span class="required">*</span></label>
                                <input type="email" id="customerEmail" placeholder="john@example.com" required>
                            </div>
                            <div class="form-group">
                                <label>Phone Number <span class="required">*</span></label>
                                <input type="tel" id="customerPhone" placeholder="+998901234567" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Pick up location <span class="required">*</span></label>
                            <input type="text" id="pickupLocation" placeholder="Enter your hotel or address" required>
                        </div>

                        <div class="form-group">
                            <label>Special Requests (Optional)</label>
                            <textarea id="specialRequests" rows="3" placeholder="Any dietary restrictions, accessibility needs, or special requests..."></textarea>
                        </div>

                        <div class="booking-actions">
                            <button type="button" class="btn-secondary" onclick="closeBookingModal()">Cancel</button>
                            <button type="button" class="btn-primary" onclick="goToStep2()">Continue</button>
                        </div>
                    </form>
                </div>

                <!-- Step 2: Review Booking -->
                <div id="bookingStep2" class="booking-step-content">
                    <div class="booking-review">
                        <h3>Review Your Booking</h3>

                        <div class="review-section">
                            <h4>Tour Information</h4>
                            <div class="review-item">
                                <span>Tour:</span>
                                <strong id="reviewTourName"></strong>
                            </div>
                            <div class="review-item">
                                <span>Date:</span>
                                <strong id="reviewDate"></strong>
                            </div>
                            <div class="review-item">
                                <span>Pick up location:</span>
                                <strong id="reviewPickup"></strong>
                            </div>
                            <div class="review-item">
                                <span>Guests:</span>
                                <strong id="reviewGuests"></strong>
                            </div>
                        </div>

                        <div class="review-section">
                            <h4>Contact Information</h4>
                            <div class="review-item">
                                <span>Name:</span>
                                <strong id="reviewName"></strong>
                            </div>
                            <div class="review-item">
                                <span>Email:</span>
                                <strong id="reviewEmail"></strong>
                            </div>
                            <div class="review-item">
                                <span>Phone:</span>
                                <strong id="reviewPhone"></strong>
                            </div>
                            <div class="review-item" id="reviewRequestsContainer" style="display: none;">
                                <span>Special Requests:</span>
                                <strong id="reviewRequests"></strong>
                            </div>
                        </div>

                        <div class="review-section price-section">
                            <h4>Price Breakdown</h4>
                            <div class="review-item">
                                <span id="priceAdultsLabel"></span>
                                <strong id="priceAdultsAmount"></strong>
                            </div>
                            <div class="review-item" id="priceChildrenRow" style="display: none;">
                                <span id="priceChildrenLabel"></span>
                                <strong id="priceChildrenAmount"></strong>
                            </div>
                            <div class="review-item total-price">
                                <span>Total:</span>
                                <strong id="reviewTotalPrice">$0</strong>
                            </div>
                        </div>
                    </div>

                    <div class="booking-actions">
                        <button type="button" class="btn-secondary" onclick="goToStep1()">Back</button>
                        <button type="button" class="btn-primary" onclick="confirmBooking()">Confirm Booking</button>
                    </div>
                </div>

                <!-- Step 3: Confirmation -->
                <div id="bookingStep3" class="booking-step-content">
                    <div class="booking-success">
                        <div class="success-icon">✓</div>
                        <h3>Booking Confirmed!</h3>
                        <p>Thank you for your booking. We've sent a confirmation email to <strong id="confirmEmail"></strong></p>

                        <div class="confirmation-details">
                            <h4>Booking Reference</h4>
                            <div class="booking-ref" id="bookingReference">BOOK-XXXXXX</div>

                            <p class="confirmation-note">
                                Our team will contact you within 24 hours to finalize the details of your trip.
                            </p>
                        </div>

                        <div class="booking-actions">
                            <button type="button" class="btn-primary" onclick="closeBookingModal()">Done</button>
                        </div>
                    </div>
                </div>

                <!-- Loading Overlay -->
                <div id="bookingLoading" class="booking-loading" style="display: none;">
                    <div class="spinner"></div>
                    <p>Processing your booking...</p>
                </div>
            </div>
        </div>
    </div>
    `;

    // Inject modal HTML when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        });
    } else {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
})();

// Open booking modal
function openBookingModal(tourId, tourName, pricePerPerson) {
    // Get values from the sidebar form
    const checkInDate = document.getElementById('checkInDate').value;
    const guestCount = document.getElementById('guestCount').value;

    if (!checkInDate) {
        alert('Iltimos, sanani tanlang');
        document.getElementById('checkInDate').focus();
        return;
    }

    // Parse guest count (assume "1 Guest", "2 Guests", etc.)
    const adults = parseInt(guestCount) || 1;
    const children = 0; // For now, all guests are adults

    // Calculate total price
    const totalPrice = pricePerPerson * (adults + children * 0.5); // Children are 50% price

    // Update booking state
    bookingState = {
        tourId,
        tourName,
        date: checkInDate,
        adults,
        children,
        pricePerPerson,
        totalPrice,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        pickupLocation: '',
        specialRequests: ''
    };

    // Update modal content
    document.getElementById('bookingTourName').textContent = tourName;
    document.getElementById('summaryDate').textContent = new Date(checkInDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('summaryAdults').textContent = adults;
    document.getElementById('summaryChildren').textContent = children;
    document.getElementById('summaryPrice').textContent = `$${totalPrice}`;

    // Reset to step 1
    goToStep1();

    // Show modal
    document.getElementById('bookingModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';

    // Reset form
    document.getElementById('bookingDetailsForm').reset();

    // Go back to step 1
    goToStep1();
}

// Navigate to step 1
function goToStep1() {
    setActiveStep(1);
}

// Navigate to step 2
function goToStep2() {
    // Validate step 1
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const pickupLocation = document.getElementById('pickupLocation').value.trim();

    if (!name || !email || !phone || !pickupLocation) {
        alert('Iltimos, barcha majburiy maydonlarni to\'ldiring');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email formati noto\'g\'ri');
        return;
    }

    // Validate phone format (Uzbekistan)
    const phoneRegex = /^\+998[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Telefon formati noto\'g\'ri. Format: +998XXXXXXXXX');
        return;
    }

    // Update booking state
    bookingState.customerName = name;
    bookingState.customerEmail = email;
    bookingState.customerPhone = phone;
    bookingState.pickupLocation = pickupLocation;
    bookingState.specialRequests = document.getElementById('specialRequests').value.trim();

    // Update review section
    document.getElementById('reviewTourName').textContent = bookingState.tourName;
    document.getElementById('reviewDate').textContent = new Date(bookingState.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('reviewPickup').textContent = bookingState.pickupLocation;
    document.getElementById('reviewGuests').textContent = `${bookingState.adults} Adults${bookingState.children > 0 ? `, ${bookingState.children} Children` : ''}`;
    document.getElementById('reviewName').textContent = bookingState.customerName;
    document.getElementById('reviewEmail').textContent = bookingState.customerEmail;
    document.getElementById('reviewPhone').textContent = bookingState.customerPhone;

    // Special requests
    if (bookingState.specialRequests) {
        document.getElementById('reviewRequestsContainer').style.display = 'flex';
        document.getElementById('reviewRequests').textContent = bookingState.specialRequests;
    } else {
        document.getElementById('reviewRequestsContainer').style.display = 'none';
    }

    // Price breakdown
    document.getElementById('priceAdultsLabel').textContent = `${bookingState.adults} Adults × $${bookingState.pricePerPerson}`;
    document.getElementById('priceAdultsAmount').textContent = `$${bookingState.adults * bookingState.pricePerPerson}`;

    if (bookingState.children > 0) {
        document.getElementById('priceChildrenRow').style.display = 'flex';
        document.getElementById('priceChildrenLabel').textContent = `${bookingState.children} Children × $${bookingState.pricePerPerson * 0.5}`;
        document.getElementById('priceChildrenAmount').textContent = `$${bookingState.children * bookingState.pricePerPerson * 0.5}`;
    } else {
        document.getElementById('priceChildrenRow').style.display = 'none';
    }

    document.getElementById('reviewTotalPrice').textContent = `$${bookingState.totalPrice}`;

    setActiveStep(2);
}

// Confirm booking
async function confirmBooking() {
    // Show loading
    document.getElementById('bookingLoading').style.display = 'flex';

    try {
        // Call API to create booking
        const response = await fetch('http://localhost:4000/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tourId: bookingState.tourId,
                tourName: bookingState.tourName,
                customerName: bookingState.customerName,
                customerEmail: bookingState.customerEmail,
                customerPhone: bookingState.customerPhone,
                pickupLocation: bookingState.pickupLocation,
                date: bookingState.date,
                guests: {
                    adults: bookingState.adults,
                    children: bookingState.children
                },
                totalPrice: bookingState.totalPrice,
                specialRequests: bookingState.specialRequests
            })
        });

        const data = await response.json();

        // Hide loading
        document.getElementById('bookingLoading').style.display = 'none';

        if (response.ok && data.success) {
            // Show success step
            document.getElementById('confirmEmail').textContent = bookingState.customerEmail;
            document.getElementById('bookingReference').textContent = data.data.id;
            setActiveStep(3);
        } else {
            alert(data.message || 'Buyurtma yaratishda xatolik yuz berdi');
        }
    } catch (error) {
        console.error('Booking error:', error);
        document.getElementById('bookingLoading').style.display = 'none';
        alert('Server bilan bog\'lanishda xatolik. Iltimos, qaytadan urinib ko\'ring.');
    }
}

// Set active step
function setActiveStep(stepNumber) {
    // Update step indicators
    document.querySelectorAll('.booking-step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');

        if (stepNum < stepNumber) {
            step.classList.add('completed');
        } else if (stepNum === stepNumber) {
            step.classList.add('active');
        }
    });

    // Update step content
    document.querySelectorAll('.booking-step-content').forEach((content, index) => {
        content.classList.remove('active');
        if (index + 1 === stepNumber) {
            content.classList.add('active');
        }
    });
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('booking-modal-overlay')) {
        closeBookingModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('bookingModal') && document.getElementById('bookingModal').style.display === 'flex') {
        closeBookingModal();
    }
});
