// This file contains logic for determining user locations and finding nearby users.

class GeoLocationService {
    constructor() {
        this.usersLocationData = new Map(); // Store user locations
    }

    // Method to set user location
    setUserLocation(userId, latitude, longitude) {
        this.usersLocationData.set(userId, { latitude, longitude });
    }

    // Method to get user location
    getUserLocation(userId) {
        return this.usersLocationData.get(userId);
    }

    // Method to find nearby users within a specified distance (in kilometers)
    findNearbyUsers(userId, distance) {
        const userLocation = this.getUserLocation(userId);
        if (!userLocation) return [];

        const nearbyUsers = [];
        this.usersLocationData.forEach((location, id) => {
            if (id !== userId) {
                const dist = this.calculateDistance(userLocation.latitude, userLocation.longitude, location.latitude, location.longitude);
                if (dist <= distance) {
                    nearbyUsers.push(id);
                }
            }
        });

        return nearbyUsers;
    }

    // Haversine formula to calculate distance between two points on the Earth
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    }

    // Convert degrees to radians
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}

module.exports = new GeoLocationService();