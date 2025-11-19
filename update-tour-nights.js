const mongoose = require('mongoose');
require('dotenv').config();

async function updateTourNights() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-bliss');
        console.log('Connected to MongoDB');

        const Tour = require('./src/models/Tour.model.js');

        // Update Classic Uzbekistan tour (4 days = 3 nights)
        const classicTour = await Tour.findOne({ title: /Classic Uzbekistan/ });
        if (classicTour) {
            classicTour.nights = classicTour.duration - 1; // 4 days = 3 nights
            await classicTour.save();
            console.log(`✓ Updated Classic Uzbekistan: ${classicTour.duration} Days / ${classicTour.nights} Nights`);
        }

        // Update Silk Road Adventure tour (5 days = 4 nights)
        const silkRoadTour = await Tour.findOne({ title: /Silk Road Adventure/ });
        if (silkRoadTour) {
            silkRoadTour.nights = silkRoadTour.duration - 1; // 5 days = 4 nights
            await silkRoadTour.save();
            console.log(`✓ Updated Silk Road Adventure: ${silkRoadTour.duration} Days / ${silkRoadTour.nights} Nights`);
        }

        // Update all other tours that don't have nights
        const toursWithoutNights = await Tour.find({ nights: { $exists: false } });
        for (const tour of toursWithoutNights) {
            tour.nights = tour.duration - 1;
            await tour.save();
            console.log(`✓ Updated ${tour.title}: ${tour.duration} Days / ${tour.nights} Nights`);
        }

        console.log('Done!');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateTourNights();
