const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const path = require('path');

// Empty array to store favourited content
let favourites = [];


// Search API
router.get(`/search`, (req, res) => {
    // Get the search term from the query string in the url
    const searchTerm = req.query.searchTerm;
    // Get the media type from the query string in the url
    const mediaType = req.query.mediaType;
    // Construct query string
    const queryString = `?term=${searchTerm}&media=${mediaType}&limit=20`

    // Run a fetch request to the iTunes API using the term and media type specified in the front end
    fetch(`https://itunes.apple.com/search${queryString}`)
        .then(result => result.json()) //Format the result into json
        .then(response => {
            // Create unique id using timestamp
            response['results'].forEach((item, index) => {
                item['id'] = (new Date()).getTime().toString(36) + index++;
            })
            res.send({
                message: 'Results retrieved successfully!',
                response
            })
        })
        .catch(err => {
            // If there is an error then catch the error and send the error message
            res.send({
                message: 'An error occurred during the search!'
            })
        })
})

// Function with hardcoded values used to test the functionality of the server and/or API, can be referenced as the above function for comments
router.get(`/searchTest`, (req, res) => {
    const searchTerm = 'Drake';
    const mediaType = 'all';
    const queryString = `?term=${searchTerm}&media=${mediaType}&limit=20`

    fetch(`https://itunes.apple.com/search${queryString}`)
        .then(result => result.json())
        .then(response => {
            res.send({
                message: 'Search works!',
                response
            })
        })
        .catch(error => {
            res.send({
                message: 'An error occurred during the search!'
            })
        })
})

// Function to get favourites set in the frontend
router.get('/getFavourites', async (req, res) => {
    try {
        // Check if we have no favourites and send message
        if (!favourites.length) {
            res.send({
                message: "You have no favourites to show"
            })
        }
        // Send to the frontend favourites and message
        else {
            res.send({
                favourites
            })
        }
    } catch (err) {
        // In case of error, catch it and send it 
        res.send({
            err: 'An error occurred during fetching favourites!'
        })
    }
})

router.post('/addToFavourites', (req, res) => {
    let newFavourite = req.body;
    // Check if item does not already exist in favourites array
    let found = favourites.find(fav => fav.id === newFavourite.id);
    if (!found) {
        // Add item if not found in the array
        favourites.push(newFavourite);
    }

    // Send response with message and all the items in the favourites array
    return res.send({
        message: 'Item added to favourites!',
        favourites
    });
});

// DELETE - removes a specific item from favourites array using a unique id
router.delete('/removeFavourite/:itemId', (req, res) => {
    const id = req.params.itemId;
    // Loop through the favourites array and remove the matching item
    favourites.forEach((fav, index) => {
        if (fav.id === id) {
            favourites.splice(index, 1);
        }
    })
    // Send response with message and all the remaining items in the favourites array
    res.send({
        message: `Item with id ${id} has been deleted from favourites`,
        favourites
    });
})
module.exports = router;