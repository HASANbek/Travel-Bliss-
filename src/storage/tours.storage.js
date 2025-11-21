const fs = require('fs').promises;
const path = require('path');

const TOURS_FILE = path.join(__dirname, '../../data/tours.json');

class ToursStorage {
  /**
   * Read all tours from file
   * @returns {Promise<Array>}
   */
  async readTours() {
    try {
      const data = await fs.readFile(TOURS_FILE, 'utf8');
      const tours = JSON.parse(data);
      // Add IDs based on array index (1-based)
      return tours.map((tour, index) => ({
        ...tour,
        id: String(index + 1),
        _id: String(index + 1)
      }));
    } catch (error) {
      console.error('Error reading tours:', error);
      return [];
    }
  }

  /**
   * Find tour by ID
   * @param {string} id - Tour ID (1-based index)
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    try {
      const tours = await this.readTours();
      const index = parseInt(id) - 1;
      if (index >= 0 && index < tours.length) {
        return tours[index];
      }
      return null;
    } catch (error) {
      console.error('Error finding tour:', error);
      return null;
    }
  }

  /**
   * Find all tours
   * @returns {Promise<Array>}
   */
  async findAll() {
    return await this.readTours();
  }

  /**
   * Find tours by destination
   * @param {string} destination
   * @returns {Promise<Array>}
   */
  async findByDestination(destination) {
    try {
      const tours = await this.readTours();
      return tours.filter(tour =>
        tour.destination && tour.destination.toLowerCase() === destination.toLowerCase()
      );
    } catch (error) {
      console.error('Error finding tours by destination:', error);
      return [];
    }
  }

  /**
   * Find featured tours
   * @returns {Promise<Array>}
   */
  async findFeatured() {
    try {
      const tours = await this.readTours();
      return tours.filter(tour => tour.isFeatured === true);
    } catch (error) {
      console.error('Error finding featured tours:', error);
      return [];
    }
  }

  /**
   * Update tour by ID (1-based index)
   * @param {string} id - Tour ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object|null>}
   */
  async update(id, updates) {
    try {
      const data = await fs.readFile(TOURS_FILE, 'utf8');
      const tours = JSON.parse(data);
      const index = parseInt(id) - 1;

      if (index < 0 || index >= tours.length) {
        return null;
      }

      tours[index] = { ...tours[index], ...updates };
      await fs.writeFile(TOURS_FILE, JSON.stringify(tours, null, 2));

      return {
        ...tours[index],
        id: String(index + 1),
        _id: String(index + 1)
      };
    } catch (error) {
      console.error('Error updating tour:', error);
      return null;
    }
  }
}

module.exports = new ToursStorage();
