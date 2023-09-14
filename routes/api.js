// Contains the routes on the '/api' path
const express = require('express');
const ShortUrl = require('../models/short-url');
const router = express.Router();

// POST /api/shorturl
// Params: 
//  - url_input: Should be a valid url
// Response: 
//  - Successful: JSON like "{original_url: 'https://freeCodeCamp.org', short_url : 1}"
//  - Error: JSON like "{error: 'invalid url'}"
router.post("/shorturl", async (req, res) => {
    // Validate urlToShorten
    const urlToShorten = req.body.url_input;
    if(!isValidUrl(urlToShorten)) {
        return res.json({error: 'invalid url'});
    }

    // Check if urlToShorten is already present in the database
    try {
        const dbShortUrl = await ShortUrl.findOne({original_url: urlToShorten})
        if (dbShortUrl != null) {
            return res.json({original_url: dbShortUrl.original_url, short_url: dbShortUrl.short_url})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({error: 'server error'})
    }

    // Add new ShortUrl to database
    try {
        const urlCount = await ShortUrl.countDocuments();
        const shortUrl = new ShortUrl({original_url: urlToShorten, short_url: urlCount+1});
        
        const dbShortUrl = await shortUrl.save();
        return res.json({original_url: dbShortUrl.original_url, short_url: dbShortUrl.short_url})
    } catch (err) {
        console.error(err)
        return res.status(500).json({error: 'server error'})
    }
})

// GET /api/shorturl/:short_url
// Params: 
//  - short_url: Should be a valid short url id that points to a unshortened url
// Response: 
//  - Successful: Redirection to the unshortened url
//  - Error: JSON like "{error: 'invalid url'}"
router.get("/shorturl/:short_url", async (req, res) => {
    const shortUrl = req.params.short_url

    try {
        const dbShortUrl = await ShortUrl.findOne({short_url: shortUrl})
        if (dbShortUrl == null) {
            return res.json({error: 'invalid url'})
        }
        return res.redirect(dbShortUrl.original_url)
    } catch (err) {
        console.error(err)
        return res.status(500).json({error: 'server error'})
    }
})

// Functions
function isValidUrl(inputValue) {
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return urlPattern.test(inputValue);
}

module.exports = router;