const { MockServices } = require('../services/mock.services');
const dotenv = require('dotenv').config();

const USERS_LIMIT = process.env.USERS_LIMIT || 1000;
const PETS_LIMIT = process.env.PETS_LIMIT || 2000;
const PRODUCTS_LIMIT = process.env.PRODUCTS_LIMIT || 2000;

class MockControllers {

    // Genera 100 mascotas falsas (mocks) de acuerdo a premisa de la Actividad Práctica
    static async generateFakePets(req, res) {
        try {
            let { pets = 100 } = req.query;
            pets = parseInt(pets);
            if (isNaN(pets))
                return res.status(400).json({ "⛔Error:": "parámetro no válido, debe ser numérico" });
            if (pets < 1)
                return res.status(400).json({ "⛔Error:": "cantidad no válida, debe ser mayor a cero" });
            if (pets > PETS_LIMIT)
                return res.status(400).json({ "⛔Error:": `se superó el límite de ${PETS_LIMIT} mascotas` });
            const mockingPets = MockServices.generateFakePets(pets);
            res.status(201).json({ "pets": mockingPets })
        } catch (error) {
            res.status(500).json({ "⛔Error interno:": error.message });
        }
    }

    // Genera usuarios falsos (mocks)
    static async generateFakeUsers(req, res) {
        try {
            let { users = 50 } = req.query;
            users = parseInt(users);
            if (isNaN(users))
                return res.status(400).json({ "⛔Error:": "parámetro no válido, debe ser numérico" });
            if (users < 1)
                return res.status(400).json({ "⛔Error:": "cantidad no válida, debe ser mayor a cero" });
            if (users > USERS_LIMIT)
                return res.status(400).json({ "⛔Error:": `se superó el límite de ${USERS_LIMIT} usuarios` });
            const mockingUsers = await MockServices.generateFakeUsers(users, true);
            res.status(201).json({ "users": mockingUsers })
        } catch (error) {
            res.status(500).json({ "⛔Error interno:": error.message });
        }
    }

    // Genera productos falsos (mocks)
    static async generateFakeProducts(req, res) {
        try {
            let { products = 100 } = req.query;
            products = parseInt(products);
            if (isNaN(products))
                return res.status(400).json({ "⛔Error:": "parámetro no válido, debe ser numérico" });
            if (products < 1)
                return res.status(400).json({ "⛔Error:": "cantidad no válida, debe ser mayor a cero" });
            if (products > PRODUCTS_LIMIT)
                return res.status(400).json({ "⛔Error:": `se superó el límite de ${PRODUCTS_LIMIT} usuarios` });
            const mockingProducts = MockServices.generateFakeProducts(products);
            res.status(201).json({ "products": mockingProducts })
        } catch (error) {
            res.status(500).json({ "⛔Error interno:": error.message });
        }
    }

    // Genera usuarios y mascotas falsas para luego insertarlos en la BD
    static async generateData(req, res) {
        try {
            let { users, pets } = req.query;
            users = parseInt(users);
            pets = parseInt(pets);
            if (isNaN(users) || isNaN(pets))
                return res.status(400).json({ "⛔Error:": "parámetros no válidos, deben ser numéricos" });
            if (users < 1 || pets < 1)
                return res.status(400).json({ "⛔Error:": "cantidades no válidas, deben ser mayores a cero" });
            if (users > USERS_LIMIT)
                return res.status(400).json({ "⛔Error:": `se superó el límite de ${USERS_LIMIT} usuarios` });
            if (pets > PETS_LIMIT)
                return res.status(400).json({ "⛔Error:": `se superó el límite de ${PETS_LIMIT} mascotas` });
            const result = await MockServices.generateData(users, pets);
            res.status(201).json({ result });
        } catch (error) {
            res.status(500).json({ "⛔Error interno:": error.message });
        }
    }

    // Genera usuarios y mascotas falsas para luego insertarlos en la BD
    static async generateDataProducts(req, res) {
        try {
            let { products } = req.query;
            products = parseInt(products);
            if (isNaN(products))
                return res.status(400).json({ "⛔Error:": "parámetro no válido, debe ser numérico" });
            if (products < 1)
                return res.status(400).json({ "⛔Error:": "cantidad no válida, debe ser mayor a cero" });
            if (products > PRODUCTS_LIMIT)
                return res.status(400).json({ "⛔Error:": `se superó el límite de ${PRODUCTS_LIMIT} productos` });
            const result = await MockServices.generateDataProducts(products);
            res.status(201).json({ result });
        } catch (error) {
            res.status(500).json({ "⛔Error interno:": error.message });
        }
    }

}

module.exports = { MockControllers };