const { PetRepository } = require("../../repository/pet.repository");
const { PetServices } = require('../../services/pet.services');
const { createUserResponse, buildResponse } = require('../../utils/utils');

class PetsController {

    static async getPetById(req, res) {
        const { pid } = req.params;
        if (pid) {
            try {
                const pet = await PetRepository.getPet(pid);
                if (pet) return res.status(200).json(createUserResponse(200, "Mascota encontrada", req, { "pet": pet }));
                return res.status(404).json(createUserResponse(404, "Mascota no encontrada", req, { "⛔Error": `Mascota #${pid} no encontrada` }));
            } catch (error) {
                return res.status(500).json(createUserResponse(500, "Error interno", req, { "⛔Error interno:": error.message }));
            }
        } else {
            return res.status(400).json(createUserResponse(400, 'Petición incorrecta', req, {
                'Error':
                    'Petición incorrecta (faltan valores para crear el usuario)'
            }));
        }
    }

    static async getPets(req, res) {
        let { limit, page, sort, specie } = req.query;
        limit = parseInt(limit);
        page = parseInt(page);
        let response = null;
        let criteria = { "adopted": false, "deleted": false };
        let options = {};
        if (!limit || limit < 1) limit = 10;
        if (!page || page < 1) page = 1;
        if (specie)
            criteria = { ...criteria, "specie": { '$regex': specie, $options: 'i' } };
        if (sort && (sort.toLowerCase() !== 'asc' && sort.toLowerCase() !== 'desc')) sort = false;
        sort ? options = { "limit": limit, "page": page, sort: { "name": sort } }
            : options = { "limit": limit, "page": page };
        try {
            const pets = await PetServices.getPaginatedPets(criteria, options);
            response = buildResponse(pets, 'api', 'pets', sort, specie);
            return res.status(200).json(response);
        } catch (error) {
            response = {
                status: "error",
                payload: [],
                totalPages: 0,
                prevPage: null,
                nextPage: null,
                page: 0,
                hasPrevPage: false,
                hasNextPage: false,
                prevLink: null,
                nextLink: null,
            };
            return res.status(500).json(response);
        }
    }

    static async createPet(req, res) {
        const { body } = req;
        const { name, specie, birthDate } = body;
        if (!name || !specie || !birthDate) {
            return res.status(400).json({
                "Error":
                    "Petición incorrecta (los valores proporcionados no son los esperados)"
            });
        }
        let parsedBirthDate = new Date(Date.parse(birthDate));
        parsedBirthDate.setUTCHours(0, 0, 0, 0);
        try {
            const result = await PetServices.createPet(name, specie, parsedBirthDate, req);
            if (!result.error) {
                return res.status(201).json(createUserResponse(201, "Mascota Creada", req, { "newPet": result._id }));
            }
            return res.status(400).json(createUserResponse(400, "Request no válido", req, { "Error": result.reason }));
        } catch (error) {
            return res.status(500).json(createUserResponse(500, "Error Interno", req, { "Error interno": error.message }));
        }

    }

}

module.exports = { PetsController };