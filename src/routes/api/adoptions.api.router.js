const { Router } = require('express');
const { AdoptionsController } = require('../../controllers/api/adoptions.api.controllers');

const adoptionsApiRouter = Router();

adoptionsApiRouter.get('/adoptions', AdoptionsController.getAdoptions);

adoptionsApiRouter.get('/adoptions/:aid', AdoptionsController.getAdoptionById);

adoptionsApiRouter.post('/adoptions/:oid/:pid', AdoptionsController.createAdoption);

module.exports = adoptionsApiRouter;