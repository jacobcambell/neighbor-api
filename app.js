const express = require('express');
const Util = new (require('./Util'))();
const port = 80;

const app = express();
app.use(express.json());

// Just keeping this simple for project, but something like file-based routing would be better here
app.post('/', async (req, res) => {
    const vehicles = req?.body;

    if (!Array.isArray(vehicles)) {
        return res.json({
            success: false,
            message:
                'Invalid data type provided for vehicles. Please send an array',
        });
    }

    if (!vehicles?.length) {
        return res.json({
            success: false,
            message:
                'No vehicles provided. Please send your request with at least 1',
        });
    }

    const result = await Util.findCheapestLocations({ vehicles });

    return res.json(result);
});

app.use((req, res, next) => {
    res.status(404).send('Invalid route requested');
});

app.use(function (err, req, res, next) {
    // Just using console.error for the sake of simplicity in this project :)
    // Ideally you'd have an actual error logging service here
    console.error(err);

    res.status(500).json({
        error: 'Uh oh! We have ran into a snag!',
    });
});

app.listen(port, () => {
    console.log(`running Neighbor API project on port ${port}`);
});
