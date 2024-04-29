const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import the 'path' module

const app = express();
const port = process.env.PORT || 3000;

// Add middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/watchlistDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Define a movie schema
const movieSchema = new mongoose.Schema({
    title: String,
    plot: String,
    releaseDate: Date,
    // Add more properties as needed
});

// Create a Movie model based on the schema
const Movie = mongoose.model('Movie', movieSchema);

// Define routes
app.get('/', (req, res) => {
    // Send the index.html file when a request is made to the root route
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Create a new movie
app.post('/movies', async (req, res) => {
    try {
        const { title, plot, releaseDate } = req.body;
        const movie = await Movie.create({ title, plot, releaseDate });

        // Send the entire movie object in the response
        res.status(201).json(movie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
;


// Read all movies
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Read a single movie by ID
app.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a movie
app.put('/movies/:id', async (req, res) => {
    try {
        const { title, plot, releaseDate } = req.body;
        const movie = await Movie.findByIdAndUpdate(req.params.id, { title, plot, releaseDate }, { new: true });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a movie
app.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
