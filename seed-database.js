const FileStorage = require('./src/utils/fileStorage');

async function seedDatabase() {
    try {
        console.log('🔄 Initializing file-based storage...');

        const toursStorage = new FileStorage('tours.json');

        // Clear existing tours
        await toursStorage.deleteMany({});
        console.log('🗑️  Cleared existing tours');

        // Demo tours data
        const demoTours = [
            {
                title: 'Samarkand City Tour',
                description: 'Visit the magnificent Registan Square, Ulugbek Observatory and Gur-Amir Mausoleum',
                destination: 'Samarkand',
                price: 500,
                duration: 3,
                nights: 2,
                category: 'cultural',
                rating: 5.0,
                ratingsCount: 89,
                isActive: true,
                isFeatured: true,
                itinerary: [
                    { day: 1, title: 'Arrival in Samarkand', description: 'Pick up from hotel, visit Registan Square', activities: ['Registan Square', 'Local dinner'], meals: 'Dinner', accommodation: 'Registan Plaza Hotel', transport: ['Car'] },
                    { day: 2, title: 'Historical Sites', description: 'Full day exploring Samarkand', activities: ['Shah-i-Zinda', 'Bibi-Khanym Mosque', 'Siab Bazaar'], meals: 'Breakfast, Lunch, Dinner', accommodation: 'Registan Plaza Hotel', transport: ['Car'] },
                    { day: 3, title: 'Departure', description: 'Visit Gur-Amir Mausoleum and departure', activities: ['Gur-Amir', 'Ulugbek Observatory'], meals: 'Breakfast', accommodation: 'N/A', transport: ['Car'] }
                ],
                included: ['Accommodation', 'Transportation', 'Guide services', 'All entrance fees'],
                excluded: ['International flights', 'Personal expenses', 'Tips']
            },
            {
                title: 'Bukhara Heritage Tour',
                description: 'Explore the ancient city of Bukhara with its stunning Islamic architecture',
                destination: 'Bukhara',
                price: 450,
                duration: 5,
                nights: 4,
                category: 'cultural',
                rating: 4.8,
                ratingsCount: 76,
                isActive: true,
                isFeatured: true,
                itinerary: [
                    { day: 1, title: 'Arrival in Bukhara', description: 'Hotel check-in and orientation walk', activities: ['Lyabi-Hauz complex', 'Orientation walk'], meals: 'Dinner', accommodation: 'Zargaron Plaza Hotel', transport: ['Car'] },
                    { day: 2, title: 'Old City Exploration', description: 'Full day in the old city', activities: ['Ark Fortress', 'Bolo Hauz Mosque', 'Trading Domes'], meals: 'Breakfast, Lunch, Dinner', accommodation: 'Zargaron Plaza Hotel', transport: ['Walking'] }
                ],
                included: ['Accommodation', 'Transportation', 'Guide services', 'Museum entries'],
                excluded: ['Lunch & Dinner', 'Personal expenses', 'Tips']
            },
            {
                title: 'Chimgan Mountain Day Trip',
                description: 'Escape to the beautiful Chimgan Mountains near Tashkent',
                destination: 'Chimgan',
                price: 80,
                duration: 1,
                nights: 0,
                category: 'adventure',
                rating: 4.7,
                ratingsCount: 52,
                isActive: true,
                isFeatured: false,
                itinerary: [
                    { day: 1, title: 'Chimgan Mountains', description: 'Full day mountain adventure', activities: ['Cable car ride', 'Mountain hiking', 'Lunch at mountain cafe'], meals: 'Lunch', accommodation: 'N/A', transport: ['Car', 'Cable Car'] }
                ],
                included: ['Transportation', 'Guide', 'Equipment', 'Cable car tickets', 'Lunch'],
                excluded: ['Accommodation', 'Personal expenses', 'Tips']
            },
            {
                title: 'Grand Uzbekistan Tour',
                description: 'Complete 10-day journey through all major cities of Uzbekistan including Tashkent, Samarkand, Bukhara, and Khiva',
                destination: 'Multi-city',
                price: 1850,
                duration: 10,
                nights: 9,
                category: 'cultural',
                rating: 4.9,
                ratingsCount: 79,
                isActive: true,
                isFeatured: true,
                itinerary: [
                    { day: 1, title: 'Arrival in Tashkent', description: 'Meet at airport, transfer to hotel, city orientation tour.', activities: ['Chorsu Bazaar', 'Independence Square', 'Broadway'], meals: 'Dinner', accommodation: 'City Palace Hotel', transport: ['Car'] },
                    { day: 2, title: 'Tashkent Full Day', description: 'Explore the capital city.', activities: ['Khast Imam Complex', 'Applied Arts Museum', 'Tashkent Metro'], meals: 'Breakfast, Lunch, Dinner', accommodation: 'City Palace Hotel', transport: ['Car', 'Metro'] }
                ],
                included: ['9 nights accommodation', 'All transfers and transport', 'English-speaking guide', 'Entrance fees', 'Breakfast daily', '5 traditional dinners', 'High-speed train ticket'],
                excluded: ['International flights', 'Travel insurance', 'Lunches', 'Personal expenses', 'Tips for guide']
            }
        ];

        // Insert tours
        const insertedTours = [];
        for (const tour of demoTours) {
            const inserted = await toursStorage.create(tour);
            insertedTours.push(inserted);
        }
        console.log(`✅ Successfully added ${insertedTours.length} tours to file storage`);

        // Display summary
        console.log('\n📊 Tours Summary:');
        insertedTours.forEach((tour, index) => {
            console.log(`   ${index + 1}. ${tour.title} - $${tour.price} (${tour.duration} days)`);
        });

        console.log('\n✅ File storage seeding completed successfully!');
        console.log('🎉 Your tours are now saved in data/tours.json');
        console.log('💡 Tours will persist even after server restart!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding file storage:', error.message);
        console.error(error);
        process.exit(1);
    }
}

seedDatabase();
