/**
 * Service for handling geolocation functionality
 */

/**
 * Get countries list
 * @returns {Array} Array of country objects with name and code
 */
exports.getCountriesList = () => {
  // In a real app, you would either fetch this from an API or use a complete countries list
  // This is a simplified example
  return [
    { name: 'السعودية', code: 'SA' },
    { name: 'الإمارات', code: 'AE' },
    { name: 'مصر', code: 'EG' },
    { name: 'الكويت', code: 'KW' },
    { name: 'قطر', code: 'QA' },
    { name: 'عمان', code: 'OM' },
    { name: 'البحرين', code: 'BH' },
    { name: 'الأردن', code: 'JO' },
    { name: 'لبنان', code: 'LB' },
    { name: 'العراق', code: 'IQ' },
    // Add more countries as needed
  ];
};

/**
 * Get current user location based on IP or GPS
 * @returns {Promise<Object>} Location object with country
 */
exports.getCurrentLocation = async () => {
  try {
    // In a real app, you would use a geolocation API
    // This is a simplified example
    return {
      country: 'السعودية',
      countryCode: 'SA',
      city: 'الرياض'
    };
  } catch (error) {
    console.error('Error getting location:', error);
    throw new Error('Could not determine location');
  }
};

/**
 * Get users by country
 * @param {string} countryCode - The country code to search for
 * @param {Object} User - Mongoose User model
 * @returns {Promise<Array>} Array of users in the specified country
 */
exports.getUsersByCountry = async (countryCode, User) => {
  try {
    return await User.find({ country: countryCode })
      .select('name age gender profilePhoto ethnicity hobbies activities');
  } catch (error) {
    console.error('Error fetching users by country:', error);
    throw new Error('Failed to fetch users by country');
  }
};

/**
 * Calculate distance between users
 * @param {Object} locationA - First location with lat/long
 * @param {Object} locationB - Second location with lat/long
 * @returns {number} Distance in kilometers
 */
exports.calculateDistance = (locationA, locationB) => {
  // Haversine formula to calculate distance between two points
  const R = 6371; // Radius of the Earth in km
  const dLat = (locationB.lat - locationA.lat) * Math.PI / 180;
  const dLon = (locationB.lng - locationA.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(locationA.lat * Math.PI / 180) * Math.cos(locationB.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  
  return distance;
};

/**
 * Find nearby users based on a given location and radius
 * @param {string} userId - Current user ID
 * @param {Object} userLocation - User's location
 * @param {number} radius - Search radius in kilometers
 * @param {Object} User - Mongoose User model
 * @returns {Promise<Array>} Array of nearby users
 */
exports.findNearbyUsers = async (userId, userLocation, radius, User) => {
  try {
    // In a real app, this would use a geospatial query in MongoDB
    // This is a simplified example
    const allUsers = await User.find({ _id: { $ne: userId } });
    
    // Filter users by distance
    const nearbyUsers = [];
    
    for (const user of allUsers) {
      // This assumes users have location data stored
      if (user.location) {
        const distance = exports.calculateDistance(userLocation, user.location);
        if (distance <= radius) {
          nearbyUsers.push({
            user,
            distance: Math.round(distance)
          });
        }
      }
    }
    
    // Sort by distance
    return nearbyUsers.sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error('Error finding nearby users:', error);
    throw new Error('Failed to find nearby users');
  }
};