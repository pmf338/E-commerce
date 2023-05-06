const express = require('express');
const router = express.Router();
const apiArtistsController = require('../../controllers/api/apiArtistsController');


router.get('/api/artists',apiArtistsController.artists);
router.get('/api/artistDetail/:id',apiArtistsController.artistDetail);

module.exports = router;