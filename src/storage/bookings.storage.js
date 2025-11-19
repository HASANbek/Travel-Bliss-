const fs = require('fs').promises;
const path = require('path');

const BOOKINGS_FILE = path.join(__dirname, '../../data/bookings.json');

/**
 * Bookings File Storage
 * Manages bookings in JSON file
 */
class BookingsStorage {
  constructor() {
    this.ensureDataDir();
  }

  /**
   * Ensure data directory exists
   */
  async ensureDataDir() {
    const dataDir = path.join(__dirname, '../../data');
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Initialize bookings file if it doesn't exist
    try {
      await fs.access(BOOKINGS_FILE);
    } catch {
      await fs.writeFile(BOOKINGS_FILE, JSON.stringify([], null, 2));
    }
  }

  /**
   * Read all bookings
   */
  async findAll() {
    try {
      const data = await fs.readFile(BOOKINGS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading bookings:', error);
      return [];
    }
  }

  /**
   * Find booking by ID
   */
  async findById(id) {
    const bookings = await this.findAll();
    return bookings.find(b => b.id === id);
  }

  /**
   * Find bookings by user ID
   */
  async findByUserId(userId) {
    const bookings = await this.findAll();
    return bookings.filter(b => b.userId === userId);
  }

  /**
   * Find bookings by tour ID
   */
  async findByTourId(tourId) {
    const bookings = await this.findAll();
    return bookings.filter(b => b.tourId === tourId);
  }

  /**
   * Find bookings by date
   */
  async findByDate(date) {
    const bookings = await this.findAll();
    const searchDate = new Date(date).toISOString().split('T')[0];
    return bookings.filter(b => {
      const bookingDate = new Date(b.date).toISOString().split('T')[0];
      return bookingDate === searchDate;
    });
  }

  /**
   * Find bookings by status
   */
  async findByStatus(status) {
    const bookings = await this.findAll();
    return bookings.filter(b => b.status === status);
  }

  /**
   * Create new booking
   */
  async create(bookingData) {
    const bookings = await this.findAll();

    // Generate unique ID: BOOK-YYYYMMDD-XXXX
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const randomCode = Math.random().toString(36).substr(2, 4).toUpperCase();
    const id = `BOOK-${year}${month}${day}-${randomCode}`;

    const newBooking = {
      id,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      confirmedAt: null,
      cancelledAt: null
    };

    bookings.push(newBooking);
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

    return newBooking;
  }

  /**
   * Update booking
   */
  async update(id, updates) {
    const bookings = await this.findAll();
    const index = bookings.findIndex(b => b.id === id);

    if (index === -1) {
      return null;
    }

    bookings[index] = {
      ...bookings[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

    return bookings[index];
  }

  /**
   * Delete booking
   */
  async delete(id) {
    const bookings = await this.findAll();
    const filteredBookings = bookings.filter(b => b.id !== id);

    if (bookings.length === filteredBookings.length) {
      return false; // Booking not found
    }

    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(filteredBookings, null, 2));
    return true;
  }

  /**
   * Confirm booking
   */
  async confirm(id) {
    return await this.update(id, {
      status: 'confirmed',
      confirmedAt: new Date().toISOString()
    });
  }

  /**
   * Cancel booking
   */
  async cancel(id) {
    return await this.update(id, {
      status: 'cancelled',
      cancelledAt: new Date().toISOString()
    });
  }

  /**
   * Get booking statistics
   */
  async getStats() {
    const bookings = await this.findAll();

    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      totalRevenue: bookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
    };
  }

  /**
   * Check availability for a tour on a specific date
   * @param {string} tourId - Tour ID
   * @param {string} date - Date to check
   * @param {number} maxCapacity - Maximum capacity for the tour
   * @returns {Promise<Object>} - Availability info
   */
  async checkAvailability(tourId, date, maxCapacity = 20) {
    const bookingsOnDate = await this.findByDate(date);
    const confirmedBookings = bookingsOnDate.filter(
      b => b.tourId === tourId && (b.status === 'confirmed' || b.status === 'pending')
    );

    const totalGuests = confirmedBookings.reduce((sum, b) => {
      return sum + (b.guests.adults || 0) + (b.guests.children || 0);
    }, 0);

    const availableSpots = maxCapacity - totalGuests;

    return {
      available: availableSpots > 0,
      totalGuests,
      availableSpots,
      maxCapacity
    };
  }
}

module.exports = new BookingsStorage();
