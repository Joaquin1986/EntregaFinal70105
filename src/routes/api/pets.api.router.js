const { Router } = require('express');
const { PetsController } = require('../../controllers/api/pets.api.controller');
const { uploadPetsMulter } = require('../../utils/utils');

const petsApiRouter = Router();

petsApiRouter.get("/pets/:pid", PetsController.getPetById);

petsApiRouter.get("/pets/", PetsController.getPets);

petsApiRouter.post("/pets/", uploadPetsMulter.single('image'), PetsController.createPet);

module.exports = petsApiRouter; 