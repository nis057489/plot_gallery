const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Disable caching
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});


// Serve static files from 'public' folder
app.use(express.static('public'));

// Endpoint to list PNG images with metadata
app.get('/api/images', (req, res) => {
    const imagePath = path.join(__dirname, 'public/plots');
    fs.readdir(imagePath, async (err, files) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to list images' });
        }
        let images = files.filter(file => file.endsWith('.png'));

        // Fetch file details
        const filesDetails = await Promise.all(images.map(file => new Promise((resolve, reject) => {
            fs.stat(path.join(imagePath, file), (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ name: file, mtime: stats.mtime.getTime() }); // Get last modification time
                }
            });
        })));

        res.json(filesDetails);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
