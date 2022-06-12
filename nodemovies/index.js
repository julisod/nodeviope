const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

let movies = [
    {id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams'},
    {id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese'},
    {id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus'}
];

let customers = [
    {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
  ]

// Fetch all movies
app.get("/api/movies", (req, res) => {
    res.json(movies);
})

//get movie by id
app.get("/api/movies/:id", (req, res) => {
    const movieId = req.params.id;
  
    const movie = movies.filter(movie => movie.id === movieId);
    if (movie.length > 0)
        res.json(movie);
    else
        res.status(404).end();
})

// Add new movie
app.post("/api/movies", (req, res) => {
    // Extract movie from the request body and generate id
    const newMovie = {'id': Date.now(), ...req.body};

    // Add new movie at the end of the movies array
    movies = [...movies, newMovie];

    res.json(newMovie);
});

//Delete movie
app.delete("/api/movies/:id", (req, res) => { 
    const id = req.params.id;

    movies = movies.filter(movie => movie.id !== id);
    res.status(204).end();
})

//Update movie
app.put("/api/movies/:id", (req, res) => { 
    const id = req.params.id;
    const updatedMovie = {'id': id, ...req.body};
  
    //Get the index of updated movie
    const index = movies.findIndex(movie => movie.id === id);
    //Replace updated movie in the array
    movies.splice(index, 1, updatedMovie); 
  
    res.json(updatedMovie);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});