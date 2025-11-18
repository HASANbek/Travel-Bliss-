const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateTour() {
  try {
    const updatedTour = await prisma.tour.update({
      where: { id: '4' },
      data: {
        summary: 'Complete Silk Road adventure covering all major historical cities of Uzbekistan',
        imageCover: 'uzbekistan-grand-tour.jpg',
        images: [
          'assets/img/home1/tour-package-img1.jpg',
          'assets/img/home1/tour-package-img2.jpg',
          'assets/img/home1/tour-package-img3.jpg',
          'assets/img/home1/tour-package-img4.jpg',
          'assets/img/home1/tour-package-img5.jpg'
        ],
        highlights: [
          'Explore three UNESCO World Heritage Sites (Samarkand, Bukhara, Khiva)',
          'Visit the legendary Registan Square in Samarkand',
          'Walk through the ancient streets of Bukhara old town',
          'Discover the walled city of Khiva - an open-air museum',
          'Experience traditional Uzbek cuisine and hospitality',
          'Stay in authentic guesthouses and boutique hotels',
          'Professional English-speaking guide throughout the tour',
          'High-speed train journey from Tashkent to Samarkand'
        ],
        included: [
          'Accommodation: 9 nights in 4-star hotels and guesthouses',
          'Transportation: All transfers and intercity travel by comfortable AC vehicles',
          'Guide: Professional English-speaking tour guide for entire tour',
          'Entrance Fees: All museum and monument entrance tickets included',
          'Meals: Daily breakfast and 5 traditional Uzbek dinners',
          'Train Tickets: High-speed train from Tashkent to Samarkand',
          'Airport Transfers: Pickup and drop-off included'
        ],
        excluded: [
          'International flights',
          'Travel insurance',
          'Personal expenses',
          'Lunches (except mentioned)',
          'Tips for guide and driver',
          'Visa fees'
        ],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Tashkent',
            description: 'Arrive in Tashkent, the vibrant capital of Uzbekistan. Meet your guide at the airport and transfer to hotel. After check-in, enjoy a comprehensive city orientation tour including the bustling Chorsu Bazaar, Independence Square, and the Amir Temur Museum. Welcome dinner with the group.',
            activities: [
              'Airport pickup and meet your guide',
              'Hotel check-in and orientation',
              'Visit Chorsu Bazaar - experience local life',
              'Explore Independence Square',
              'Amir Temur Museum tour',
              'Welcome dinner at traditional restaurant'
            ]
          },
          {
            day: 2,
            title: 'Tashkent to Samarkand by High-Speed Train',
            description: 'Morning departure on the Afrosiyob high-speed train to Samarkand (2.5 hours). Upon arrival in this legendary Silk Road city, visit the magnificent Registan Square with its three stunning madrasahs. Explore the Gur-e-Amir Mausoleum, the final resting place of the great conqueror Tamerlane.',
            activities: [
              'High-speed train journey to Samarkand',
              'Visit the iconic Registan Square',
              'Explore Tilya-Kori, Sher-Dor, and Ulugbek Madrasahs',
              'Gur-e-Amir Mausoleum - Tamerlane\'s tomb',
              'Evening walk through Samarkand old town',
              'Dinner at local restaurant'
            ]
          },
          {
            day: 3,
            title: 'Samarkand - City of Wonders',
            description: 'Full day exploring Samarkand\'s incredible monuments. Visit the breathtaking Shah-i-Zinda necropolis, the grand Bibi-Khanym Mosque, bustling Siab Bazaar, and the Ulugbek Observatory. Learn about the astronomical achievements of the medieval Islamic world.',
            activities: [
              'Shah-i-Zinda necropolis with azure-tiled mausoleums',
              'Bibi-Khanym Mosque - once the largest in Central Asia',
              'Shopping at colorful Siab Bazaar',
              'Ulugbek Observatory - medieval astronomy center',
              'Afrosiab Museum with ancient frescoes',
              'Traditional Uzbek dinner'
            ]
          },
          {
            day: 4,
            title: 'Samarkand to Bukhara',
            description: 'Scenic drive to Bukhara (280km, approximately 4 hours) through the beautiful Uzbek countryside. En route, stop at a traditional pottery workshop to see master craftsmen at work. Arrive in Bukhara and check into your hotel. Evening stroll around the picturesque Lyabi-Hauz complex.',
            activities: [
              'Scenic drive through Uzbek countryside',
              'Stop at traditional pottery workshop',
              'Arrive in Bukhara and hotel check-in',
              'Evening walk around Lyabi-Hauz complex',
              'Dinner at poolside restaurant',
              'Free time to explore the area'
            ]
          },
          {
            day: 5,
            title: 'Bukhara - Pearl of the East',
            description: 'Explore Bukhara\'s historic old town, a UNESCO World Heritage Site. Visit the ancient Ark Fortress, Bolo Hauz Mosque, bustling trading domes, and the iconic Kalyan Minaret and Mosque complex. Experience a traditional hammam (bathhouse) in the evening.',
            activities: [
              'Ark Fortress - ancient citadel of Bukhara rulers',
              'Bolo Hauz Mosque with beautiful wooden columns',
              'Shopping in medieval trading domes',
              'Kalyan Minaret - the symbol of Bukhara',
              'Kalyan Mosque and Mir-i-Arab Madrasah',
              'Traditional hammam experience'
            ]
          },
          {
            day: 6,
            title: 'Bukhara Surroundings',
            description: 'Visit the sacred Bahauddin Naqshband Complex, spiritual center of Central Asian Sufism. Explore the beautiful Sitorai Mokhi-Khosa Palace, former summer residence of the last Emir. Visit Chor Bakr Necropolis. Evening folklore show with traditional music and dance.',
            activities: [
              'Bahauddin Naqshband Memorial Complex',
              'Learn about Sufi traditions and practices',
              'Sitorai Mokhi-Khosa - Emir\'s Summer Palace',
              'Chor Bakr Necropolis - "City of the Dead"',
              'Traditional folklore show with dinner',
              'Uzbek music and dance performance'
            ]
          },
          {
            day: 7,
            title: 'Bukhara to Khiva - Desert Journey',
            description: 'Long but scenic drive through the Kyzylkum Desert to Khiva (450km, approximately 7 hours). Experience the changing landscapes from oasis to desert. Stop for lunch and rest. Cross the mighty Amu Darya River. Arrive in Khiva, the pearl of Khorezm, in the evening.',
            activities: [
              'Desert drive through Kyzylkum',
              'Lunch stop at roadside chaikhana',
              'Cross the Amu Darya River',
              'Photo opportunities in desert landscape',
              'Arrive in ancient Khiva',
              'Evening rest and relaxation'
            ]
          },
          {
            day: 8,
            title: 'Khiva - Living Museum',
            description: 'Full day exploring Itchan Kala, the walled inner town of Khiva - a UNESCO World Heritage Site. This open-air museum preserves the atmosphere of an ancient oriental city. Visit the unfinished Kalta Minor Minaret, Kunya Ark citadel, Islam Khodja Complex, Tash Khovli Palace, and the unique Juma Mosque with 200 wooden columns.',
            activities: [
              'Walk through Itchan Kala - the inner city',
              'Kalta Minor - the short minaret with turquoise tiles',
              'Kunya Ark - the fortress of Khiva khans',
              'Islam Khodja Minaret - climb for panoramic views',
              'Tash Khovli Palace - harem and throne room',
              'Juma Mosque with ancient wooden columns',
              'Sunset view from the city walls'
            ]
          },
          {
            day: 9,
            title: 'Khiva to Tashkent',
            description: 'Morning flight from Urgench to Tashkent. Visit the Tashkent Modern Art Museum and enjoy last-minute shopping at Broadway pedestrian street. Farewell dinner at a traditional Uzbek restaurant with live music. Certificate presentation ceremony.',
            activities: [
              'Flight from Urgench to Tashkent',
              'Visit Modern Art Museum',
              'Shopping at Broadway - pedestrian street',
              'Buy souvenirs and handicrafts',
              'Farewell dinner with live traditional music',
              'Tour completion certificate ceremony'
            ]
          },
          {
            day: 10,
            title: 'Departure',
            description: 'Free time for last-minute activities or relaxation depending on your flight time. Hotel check-out. Transfer to Tashkent International Airport for your international departure. End of an unforgettable journey through Uzbekistan.',
            activities: [
              'Hotel breakfast and check-out',
              'Free time for shopping or relaxation',
              'Airport transfer',
              'Departure and end of tour'
            ]
          }
        ]
      }
    });

    console.log('✅ Tour updated successfully!');
    console.log('Tour ID:', updatedTour.id);
    console.log('Title:', updatedTour.title);
    console.log('Itinerary days:', updatedTour.itinerary.length);
    console.log('\nView tour at: http://localhost:4000/gofly/tour-details.html?id=4');
  } catch (error) {
    console.error('❌ Error updating tour:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateTour();
