// Contains the routes on the '/api' path
const express = require('express');
const ShortUrl = require('../models/short-url');
const router = express.Router();
const { inspect } = require('util');

// POST /api/shorturl
// Params: 
//  - url: Should be a valid url
// Response: 
//  - Successful: JSON like "{original_url: 'https://freeCodeCamp.org', short_url : 1}"
//  - Error: JSON like "{error: 'invalid url'}"
router.post("/shorturl", async (req, res) => {
    // Validate urlToShorten
    console.log(" Validating url...")
    const urlToShorten = req.body.url;
    if(!isValidUrl(urlToShorten)) {
        console.log("  url is invalid")
        console.log(" return -> {error: invalid url}")
        return res.json({error: 'invalid url'});
    }
    console.log("  url is valid")

    // Check if urlToShorten is already present in the database
    console.log(" Checking if url is already in database...")
    try {
        const dbShortUrl = await ShortUrl.findOne({original_url: urlToShorten})
        if (dbShortUrl != null) {
            console.log("  url is already in database")
            console.log(" return -> " + `${inspect({original_url: dbShortUrl.original_url, short_url: dbShortUrl.short_url})}`)
            return res.json({original_url: dbShortUrl.original_url, short_url: dbShortUrl.short_url})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({error: 'server error'})
    }

    // Add new ShortUrl to database
    console.log("  Adding new ShortUrl to database...")
    try {
        const urlCount = await ShortUrl.countDocuments();
        const shortUrl = new ShortUrl({original_url: urlToShorten, short_url: urlCount+1});
        
        const dbShortUrl = await shortUrl.save();

        console.log("  added to database")
        console.log(" return -> " + `${inspect({original_url: dbShortUrl.original_url, short_url: dbShortUrl.short_url})}`)
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

    console.log(" Looking for short_url in database...")
    try {
        const dbShortUrl = await ShortUrl.findOne({short_url: shortUrl})
        if (dbShortUrl == null) {
            console.log("  short_url not found in database")
            console.log(" return -> {error: 'invalid url'}")
            return res.json({error: 'invalid url'})
        }
        console.log("  short_url found in database")
        console.log(" return -> redirect to dbShortUrl.original_url")
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