const { Router } = require('express');
const { MocksController } = require('../../controllers/api/mocks.api.controller');

const mocksApiRouter = Router();

// Estos endpoints no se restringen por middleware, ya que son específicos para ambiente de desarrollo/test.

mocksApiRouter.get("/mockingpets", MocksController.generateFakePets);

mocksApiRouter.get("/mockingusers", MocksController.generateFakeUsers);

mocksApiRouter.get("/mockingproducts", MocksController.generateFakeProducts);

mocksApiRouter.post("/generateData", MocksController.generateData);

mocksApiRouter.post("/generateProducts", MocksController.generateDataProducts);

module.exports = mocksApiRouter;