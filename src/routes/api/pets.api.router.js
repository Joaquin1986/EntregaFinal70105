const { Router } = require('express');
const { PetsController } = require('../../controllers/api/pets.api.controller');
const { passportCallBack } = require('../../passport/passportCallBack');

const petsApiRouter = Router();

petsApiRouter.get("/pets/:pid", passportCallBack('current', 'api'), PetsController.getPetById);

module.exports = petsApiRouter;