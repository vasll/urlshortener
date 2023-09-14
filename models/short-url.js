const mongoose = require('mongoose')

const shortUrlSchema = new mongoose.Schema({
    original_url: String, short_url: Number
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl