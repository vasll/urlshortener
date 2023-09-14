// Contains the routes on the '/' path
const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
})

module.exports = router;