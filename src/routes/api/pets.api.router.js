const { Router } = require('express');
const { PetsControllers } = require('../../controllers/pets.controllers');
const { passportCallBack } = require('../../passport/passportCallBack');

const petsApiRouter = Router();

petsApiRouter.get("/pets/:pid", passportCallBack('current'), PetsControllers.getPetById);

module.exports = petsApiRouter;