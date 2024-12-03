const { Router } = require('express');
const { MockControllers } = require('../../controllers/mock.controllers');

const mocksApiRouter = Router();

// Estos endpoints no se restringen por middleware, ya que son específicos para ambiente de desarrollo/test.

mocksApiRouter.get("/mockingpets", MockControllers.generateFakePets);

mocksApiRouter.get("/mockingusers", MockControllers.generateFakeUsers);

mocksApiRouter.get("/mockingproducts", MockControllers.generateFakeProducts);

mocksApiRouter.post("/generateData", MockControllers.generateData);

mocksApiRouter.post("/generateProducts", MockControllers.generateDataProducts);

module.exports = mocksApiRouter;