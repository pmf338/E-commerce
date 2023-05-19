const express = require('express');
const artistsRouter = express.Router();
const apiArtistsController = require('../../controllers/api/apiArtistsController');

//Listado artistas
artistsRouter.get('/api/dashboardArtists',apiArtistsController.dashboardArtists);


module.exports = artistsRouter;