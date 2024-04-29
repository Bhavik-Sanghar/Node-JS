const express = require("express");
const axios = require("axios");
const hbs = require("hbs");

const app = express();
const port = 3000;

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Serve the HTML file with the form
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/getMovieInfo", async (req, res) => {
    const { movieName } = req.body;

    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=8ad3803b&t=${movieName}`);
        const movieData = response.data;
        console.log(movieData);

        // Render the movie information using Handlebars template
        res.render("index", { movieData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving movie information");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
