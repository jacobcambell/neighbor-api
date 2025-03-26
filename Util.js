const _ = require('lodash');

module.exports = class Util {
    /**
     * Given a list of vehicle objects, returns a sorted list of the
     * cheapest available listings by location ID
     * @param {Object[]} vehicles
     * @returns {Object[]}
     */
    async findCheapestLocations({ vehicles }) {
        if (!vehicles?.length) {
            // If no vehicles are provided, a proper error message
            // could be thrown here, but keeping simple for this
            return [];
        }

        // Simulating async call to fetch listings from DB
        const listings = await this.getListings();

        // In a real world scenario you would probably throw in a cache here based on the vehicles+listings.
        // Especially if pulling the listings above took a while or the logic below was very slow

        const listingsByLocationId = _.groupBy(listings, 'location_id');

        const results = [];

        // Loop over all locations
        for (const locationId in listingsByLocationId) {
            const listingsForLocation = listingsByLocationId[locationId];
            let availableListings = [...listingsForLocation];

            // Track which listings we've chosen for this location
            const chosenListings = [];

            // Track the running total price for this location's listings
            let total_price_in_cents = 0;

            // Does this location have enough listings with the required space?
            let meetsVehicleRequirements = true;

            // Loop over all vehicles the user requested
            for (const vehicle of vehicles) {
                // Find all available listings that can actually fit this vehicle
                const listingsWithSpace = availableListings.filter(
                    (listing) => listing.length >= vehicle.length
                );

                // Are there enough available listings?
                if (listingsWithSpace.length < vehicle.quantity) {
                    meetsVehicleRequirements = false;
                    break;
                }

                // Pick the cheapest listings that have the space for the quantity of vehicles we need
                const cheapestListings = _.sortBy(
                    listingsWithSpace,
                    'price_in_cents'
                ).slice(0, vehicle.quantity);

                // Mark chosen listings as used
                for (const listing of cheapestListings) {
                    chosenListings.push(listing);
                    total_price_in_cents += listing.price_in_cents;

                    // Remove from available listings
                    availableListings = availableListings.filter(
                        (al) => al.id !== listing.id
                    );
                }
            }

            if (meetsVehicleRequirements) {
                results.push({
                    location_id: locationId,
                    listing_ids: chosenListings.map((listing) => listing.id),
                    total_price_in_cents,
                });
            }
        }

        return _.sortBy(results, 'total_price_in_cents');
    }

    /**
     * Fetches all listings
     * Note: This is intended to just be an imitation function that queries
     * some form of database. Obviously pulling from a static JSON file doesn't require this.
     * @returns {Object[]}
     */
    async getListings() {
        return require('./listings.json');
    }
};
