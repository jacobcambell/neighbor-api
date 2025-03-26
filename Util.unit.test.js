import { describe, it, expect, test } from 'vitest';

describe('findCheapestLocations', () => {
    const Util = new (require('./Util'))();

    test('No vehicles provided, returns empty array', async () => {
        const mockVehicles = [];

        const result = await Util.findCheapestLocations({
            vehicles: mockVehicles,
        });

        expect(result).toStrictEqual([]);
    });

    test('One vehicle provided', async () => {
        const mockVehicles = [
            {
                length: 10,
                quantity: 1,
            },
        ];

        const result = await Util.findCheapestLocations({
            vehicles: mockVehicles,
        });

        // Note: only asserting first 3 results
        expect(result[0]).toStrictEqual({
            location_id: '42b8f068-2d13-4ed1-8eec-c98f1eef0850',
            listing_ids: ['b9bbe25f-5679-4917-bd7b-1e19c464f3a8'],
            total_price_in_cents: 1005,
        });
        expect(result[1]).toStrictEqual({
            location_id: '507628b8-163e-4e22-a6a3-6a16f8188928',
            listing_ids: ['e7d59481-b804-4565-b49b-d5beb7aec350'],
            total_price_in_cents: 1088,
        });
        expect(result[2]).toStrictEqual({
            location_id: '822cff3c-b5bf-4b43-99d1-eda5aadc5e08',
            listing_ids: ['e0b35ea7-96f3-4178-a11f-c14a98656f5b'],
            total_price_in_cents: 1150,
        });
    });

    test('Multiple vehicle example', async () => {
        const mockVehicles = [
            {
                length: 10,
                quantity: 1,
            },
            {
                length: 20,
                quantity: 2,
            },
            {
                length: 25,
                quantity: 1,
            },
        ];

        const result = await Util.findCheapestLocations({
            vehicles: mockVehicles,
        });

        // Note: only asserting first 3 results
        expect(result[0]).toStrictEqual({
            location_id: '3ff9fcdd-8f25-4bc4-8fa2-ec464120e7ef',
            listing_ids: [
                'bca2fd4b-2e16-4128-afee-9bec0f4f7915',
                'b793f4ea-150f-4011-8a62-b2ebe99f4d68',
                '8456e7ee-89cf-42f5-a32e-4f44778b56f1',
                'e13c89eb-1b1d-457a-bf78-dd754ba65a6d',
            ],
            total_price_in_cents: 57350,
        });
        expect(result[1]).toStrictEqual({
            location_id: 'b530fc17-3ba5-4160-9794-d48d53d28fdd',
            listing_ids: [
                '48166ef8-23fb-410e-97ea-5dda3267bdb0',
                '88d5a0ae-8aa7-4a96-8a97-3ed2a0441fb4',
                'be146adb-021e-419b-b3db-1cedc4c57b84',
                '012ff6a5-58f9-436c-a573-483ecd71028c',
            ],
            total_price_in_cents: 94370,
        });
        expect(result[2]).toStrictEqual({
            location_id: 'bea76389-4999-4861-a2ad-66f891dfd36f',
            listing_ids: [
                '2ef1b8e0-823d-4d49-ba85-254bfc01adb1',
                '71ad3d80-a41b-4348-af2c-92855fa280ee',
                '181f43b7-fb40-418e-9088-0f19d89d991f',
                'b3648022-d23b-4fc2-9bad-2df8d889dabb',
            ],
            total_price_in_cents: 98564,
        });
    });

    test('Multiple vehicle example #2', async () => {
        const mockVehicles = [
            {
                length: 50,
                quantity: 2,
            },
            {
                length: 20,
                quantity: 3,
            },
        ];

        const result = await Util.findCheapestLocations({
            vehicles: mockVehicles,
        });

        // Note: only asserting first 3 results
        expect(result[0]).toStrictEqual({
            location_id: 'cd245f42-a311-4a58-a816-d069d421b00c',
            listing_ids: [
                'db5fa62f-3951-459b-931e-1f5ddf01430d',
                'e0b95631-37aa-4b68-8b59-eac4b226d607',
                '53fca8dd-4018-4d5e-a417-4caf33cfbcfe',
                'e7967333-af44-4480-b918-a116b36c386a',
                'b7b649ed-5470-4a47-ac2f-e51266ff0e74',
            ],
            total_price_in_cents: 192271,
        });
        expect(result[1]).toStrictEqual({
            location_id: 'f91f3b9f-3828-47e6-ba2e-c52e91909bb5',
            listing_ids: [
                '68037a3b-c81c-4926-aedb-fffe28470ce5',
                '5e8ffbea-0956-4ce1-a387-5851402d127d',
                '5fe5a36d-9d50-417e-9233-0477e1c1b24d',
                'b2b52ed9-6bff-4a01-87c0-2193655e3bbe',
                '9abce4c2-bbdc-4f62-84f4-d1c6e84d435d',
            ],
            total_price_in_cents: 218650,
        });
        expect(result[2]).toStrictEqual({
            location_id: 'da507528-84ee-470e-9140-b839fb5c49ed',
            listing_ids: [
                '87159dd0-373d-4d8e-b2cf-498de99f67f6',
                'aa7f2c01-3079-41b5-b5a8-bb83056d1220',
                'd8af366e-5e0c-4025-8f35-03fe0e78d0ee',
                'e9eb1889-702e-42d4-9bb7-448657ad8b08',
                'a4b189ef-eb86-4920-9d01-dbe8e9bfdae4',
            ],
            total_price_in_cents: 225431,
        });
    });

    test('Multiple vehicles, no available listings with available space', async () => {
        const mockVehicles = [
            {
                length: 10,
                quantity: 2,
            },
            {
                length: 200,
                quantity: 1,
            },
        ];

        const result = await Util.findCheapestLocations({
            vehicles: mockVehicles,
        });

        expect(result).toStrictEqual([]);
    });
});

describe('getListings', () => {
    const Util = new (require('./Util'))();

    test('Returns an array of objects', async () => {
        const result = await Util.getListings();

        expect(result).toBeInstanceOf(Array);
    });
});
