// Contains the routes on the '/api' path
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.json({});
})

module.exports = router;