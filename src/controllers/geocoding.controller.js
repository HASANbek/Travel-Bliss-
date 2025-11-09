const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const fetch = require('node-fetch');

// @route   GET /api/geocoding/search
// @desc    Search location coordinates using Nominatim API (proxy to avoid CORS)
// @access  Public
const searchLocation = asyncHandler(async (req, res) => {
    const { q, city } = req.query;

    if (!q) {
        throw new ApiError(400, 'Search query (q) is required');
    }

    // Build search query with city context for better accuracy
    const searchQuery = city ? `${q}, ${city}, Uzbekistan` : `${q}, Uzbekistan`;

    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'TravelBliss/1.0 (Travel Agency Platform)'
            }
        });

        if (!response.ok) {
            throw new ApiError(response.status, `Nominatim API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const result = {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                name: data[0].display_name.split(',')[0]
            };

            res.status(200).json(
                new ApiResponse(200, result, 'Location found successfully')
            );
        } else {
            res.status(404).json(
                new ApiResponse(404, null, 'Location not found')
            );
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        throw new ApiError(500, `Geocoding service error: ${error.message}`);
    }
});

module.exports = {
    searchLocation
};
