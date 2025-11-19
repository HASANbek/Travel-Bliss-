const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

class FileStorage {
    constructor(filename) {
        this.filepath = path.join(DATA_DIR, filename);
    }

    async read() {
        try {
            const data = await fs.readFile(this.filepath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File doesn't exist, return empty array
                return [];
            }
            throw error;
        }
    }

    async write(data) {
        try {
            // Ensure data directory exists
            await fs.mkdir(DATA_DIR, { recursive: true });

            // Write data to file
            await fs.writeFile(this.filepath, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error(`Error writing to ${this.filepath}:`, error);
            throw error;
        }
    }

    async findAll() {
        return await this.read();
    }

    async findById(id) {
        const data = await this.read();
        return data.find(item => item.id === id || item._id === id);
    }

    async create(item) {
        const data = await this.read();

        // Generate ID if not exists
        if (!item.id && !item._id) {
            item.id = String(data.length + 1);
        }

        // Add createdAt if not exists
        if (!item.createdAt) {
            item.createdAt = new Date();
        }

        data.push(item);
        await this.write(data);
        return item;
    }

    async update(id, updates) {
        const data = await this.read();
        const index = data.findIndex(item => item.id === id || item._id === id);

        if (index === -1) {
            throw new Error('Item not found');
        }

        // Update item
        data[index] = { ...data[index], ...updates, updatedAt: new Date() };
        await this.write(data);
        return data[index];
    }

    async delete(id) {
        const data = await this.read();
        const filtered = data.filter(item => item.id !== id && item._id !== id);

        if (filtered.length === data.length) {
            throw new Error('Item not found');
        }

        await this.write(filtered);
        return true;
    }

    async deleteMany(filter = {}) {
        if (Object.keys(filter).length === 0) {
            // Delete all
            await this.write([]);
            return true;
        }

        // Filter based on conditions
        const data = await this.read();
        const filtered = data.filter(item => {
            return !Object.keys(filter).every(key => item[key] === filter[key]);
        });

        await this.write(filtered);
        return true;
    }

    async count() {
        const data = await this.read();
        return data.length;
    }
}

module.exports = FileStorage;
